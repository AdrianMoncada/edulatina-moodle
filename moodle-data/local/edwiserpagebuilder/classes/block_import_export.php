<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * @package   local_edwiserpagebuilder
 * @copyright (c) 2023 WisdmLabs (https://wisdmlabs.com/) <support@wisdmlabs.com>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 * @author    Gourav Govande
 */

namespace local_edwiserpagebuilder;

// @codingStandardsIgnoreLine
require_once($CFG->dirroot. '/config.php');

class block_import_export {


    public function perform_action($action, $config) {
        $functionname = "action_".$action;

        // Check if the function exists before calling it.
        if (method_exists($this, $functionname)) {
            // Call the function dynamically.
            return call_user_func(array($this, $functionname), $config);
        } else {
            // Handle the case when the function doesn't exist.
            return "Function $functionname does not exist.";
        }
    }

    public function action_export_blocks_data($config) {

        $config = json_decode($config, true);

        $blockid = $config['blockid'];

        return $this->export_block_data($blockid);
    }

    public function action_import_blocks_data($config) {
        $config = json_decode($config, true);

        $blockid = $config['blockid'];

        $blockdata  = $config['blockdata'];


        return $this->import_block_data($blockid, $blockdata);
    }

    public function export_block_data($blockid) {
        global $DB;

        // Fetch block data from the database
        $block = $DB->get_record('block_instances', ['id' => $blockid], 'id, configdata');
        if (!$block) {
            throw new Exception('Block not found.');
        }

        // Decode the config data
        $config = unserialize(base64_decode($block->configdata));


        $mediadetails = $this->extract_media_details ($config);

        $allassets = [];

        // Retrieve associated files
        $context = \context_system::instance();

        $fs = get_file_storage();

        foreach ($mediadetails as $media) {

            $tempfile = [];

            $files = $fs->get_area_files($context->id, 'local_edwiserpagebuilder', 'media', $media['itemid'], 'itemid', false);

            foreach ($files as $file) {

                if ($file->get_filename() != '.') {

                    $tempfile = [
                        'component' => $file->get_component(),
                        'filearea' => $file->get_filearea(),
                        'itemid' => $file->get_itemid(),
                        'filename' => $file->get_filename(),
                        'filepath' => $file->get_filepath(),
                        // 'filecontent' => base64_encode($file->get_content()),
                        'fullfilepath' => \moodle_url::make_pluginfile_url( $context->id, $file->get_component(),
                         $file->get_filearea(), $file->get_itemid(), $file->get_filepath(), $file->get_filename())->__toString()
                    ];
                    break;
                }

            }
            $allassets[] = $tempfile;
        }

        // Prepare data for export
        $data = [];
        $data['validator'] = true;
        $data['config'] = $config;
        $data['files'] = $allassets;

        $data = json_encode($data, JSON_PRETTY_PRINT);
        $data = base64_encode($data);

        return $data;

        // Convert data to JSON
        // $json = json_encode($data, JSON_PRETTY_PRINT);

        // $path = '/home/abhishek/blockinstancejson/';
        // if (!file_exists($path)) {
        //     mkdir($path, 0777, true); // Create directory if it doesn't exist
        // }
        // $file = $path . 'blockdata_' . $blockid . '.json';

        // file_put_contents($file, $json);

        // return "Block data exported to: $file";
    }


    public function extract_media_details($configdata) {
        // Initialize an empty array to store media details (filename, itemid, type)
        $mediadetails = [];

        // Check if 'html' content is present in the config data
        if (isset($configdata->html['text'])) {
            $htmltext = $configdata->html['text'];

            // Decode the HTML entities to get proper URLs (e.g., &quot; -> ")
            $htmltext = html_entity_decode($htmltext);

            // Regular expression to find URLs containing '/local_edwiserpagebuilder/media'
            preg_match_all('/\/local_edwiserpagebuilder\/media\/(\d+)\/([^\"\/\?;]+)/', $htmltext, $matches);

            // $matches[1] contains item IDs and $matches[2] contains filenames
            if (isset($matches[1]) && isset($matches[2])) {
                foreach ($matches[1] as $index => $itemid) {
                    $filename = $matches[2][$index];

                    // Check if the file is an image or video based on its extension
                    $fileextension = pathinfo($filename, PATHINFO_EXTENSION);
                    $filetype = '';

                    if (in_array(strtolower($fileextension), ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'])) {
                        $filetype = 'image';
                    } else if (in_array(strtolower($fileextension), ['mp4', 'avi', 'mov', 'webm'])) {
                        $filetype = 'video';
                    } else {
                        $filetype = 'other';
                    }

                    // Store the result in the array
                    $mediadetails[] = [
                        'itemid' => $itemid,
                        'filename' => $filename,
                        'type' => $filetype
                    ];
                }
            }
        }

        return $mediadetails;
    }

    public function import_block_data($blockid, $blockdata) {
        global $DB;

        $response = [
            "status" => false,
            "message" => get_string("blockimportexportwarning", "local_edwiserpagebuilder")
        ];


        // Fetch block data from the database
        $block = $DB->get_record('block_instances', ['id' => $blockid]);
        if (!$block) {
            return $response;
        }

        try {

            if (!is_string($blockdata)) {
                return $response;
            }
            $blockdata = base64_decode($blockdata);
            $blockdata = json_decode($blockdata, true);

            if (!$blockdata) {
                return $response;
            }

            $data = $blockdata;

            if (!isset($data['config']) || !isset($data['files'])) {
                return $response;
            }

        } catch (TypeError $e) {
            return $response;
        }

        $config = $data['config'];
        $files = $data['files'];


        // Add files to file storage and update the config HTML
        $context = \context_system::instance();
        $fs = get_file_storage();

        // Loop through each file in the JSON data and store them in the Moodle file storage
        foreach ($files as $filedata) {

            $filerecord = new \stdClass();

            $filerecord->contextid = $context->id;
            $filerecord->component = $filedata['component'];
            $filerecord->filearea = $filedata['filearea'];
            $filerecord->itemid = $filedata['itemid'];
            $filerecord->filepath = $filedata['filepath'];
            $filerecord->filename = $filedata['filename'];
            // $filecontent = base64_decode($filedata['filecontent']);

            $filecontent = download_file_content($filedata['fullfilepath']);

            // Check if the file already exists in the file storage
            $existingfile = $fs->file_exists($filerecord->contextid, $filerecord->component, $filerecord->filearea, $filerecord->itemid,
                            $filerecord->filepath, $filerecord->filename);

            if ($existingfile) {
                // If the file exists, skip the file creation and use the existing file's full URL
                $fullfilepath = \moodle_url::make_pluginfile_url(
                    $context->id, $filerecord->component, $filerecord->filearea, $filerecord->itemid, $filerecord->filepath, $filerecord->filename
                )->__toString();
            } else {

                $fs->create_file_from_string($filerecord, $filecontent);

                // Generate the full file URL
                $fullfilepath = \moodle_url::make_pluginfile_url(
                    $context->id, $filerecord->component, $filerecord->filearea, $filerecord->itemid, $filerecord->filepath, $filerecord->filename
                )->__toString();
            }

            $config['html']['text'] = str_replace(
                $filedata['fullfilepath'],
                $fullfilepath,
                $config['html']['text']
            );
        }

        // Replace the URL in the config HTML with the new full filepath URL
        $dataobj = new \stdClass();

        $dataobj->html = $config['html'];

        $dataobj->css = $config['css'];

        $dataobj->js = $config['js'];

        $instance = block_instance($block->blockname, $block);
        $instance->instance_config_save($dataobj, false);

        $response = [
            "status" => "success",
            "message" => "Block data imported successfully"
        ];

        return $response;
    }
}
