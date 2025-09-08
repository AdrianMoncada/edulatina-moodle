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
 * Trait for edwiser_fetch_layout_list service
 * @package   local_edwiserpagebuilder
 * @copyright (c) 2022 WisdmLabs (https://wisdmlabs.com/) <support@wisdmlabs.com>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 * @author    Gourav Govande
 */

namespace local_edwiserpagebuilder\external;

defined('MOODLE_INTERNAL') || die();

use external_single_structure;
use external_function_parameters;
use external_value;
use context_system;
use context_course;
use context_module;
use stdClass;

/**
 * Service definition for create new form
 * @copyright (c) 2022 WisdmLabs (https://wisdmlabs.com/) <support@wisdmlabs.com>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
trait edwiser_add_adv_block_layout {
    public static function edwiser_add_adv_block_layout_parameters() {
        return new external_function_parameters(
            array(
                'layout' => new external_value( PARAM_RAW, 'Current page url' ),
                'pagetype' => new external_value( PARAM_RAW, 'current page context'),
                'region' => new external_value( PARAM_RAW, 'blockpagetype'),
                'subpagetypepattern' => new external_value( PARAM_RAW, 'subpagetypepattern'),
                'courseid' => new external_value( PARAM_RAW, 'courseid'),
                'contextinstanceid' => new external_value( PARAM_RAW, 'contextInstanceId')
            )
        );
    }

    public static function edwiser_add_adv_block_layout($layout, $pagetype, $region, $subpagetypepattern, $courseid, $contextinstanceid) {
        global $DB, $CFG;
        $blockname = 'edwiseradvancedblock';
        $blockinstancetable = 'block_instances';
        require_once($CFG->dirroot . "/local/edwiserpagebuilder/lib.php");
        $responsemsg = "something went wrong please try again";
        $responsestatus = false;
        $bm = new \local_edwiserpagebuilder\block_handler();
        $blocks = $bm->fetch_blocks_list(array("title" => $layout, "type" => "blocklayout"));
        $iscoursepage = false;
        if (!empty($blocks) && $pagetype != '' && $region != '') {
            $page = new \moodle_page();
            $page->set_context(context_system::instance());
            $pagetypepattern = $pagetype;
            if (strpos($pagetypepattern, 'course-view') === 0) {
                $page->set_context(context_course::instance($courseid));
                $pagetypepattern = 'course-view-*';
                $iscoursepage = true;
            }
            if (preg_match('/^mod-.*-/', $pagetypepattern)) {
                $page->set_context(context_module::instance($contextinstanceid));
                $pagetypelist = generate_page_type_patterns($pagetype, null, $page->context);
                // Only go for the first if the pagetype is not a valid option
                if (is_array($pagetypelist) && !array_key_exists($pagetypepattern, $pagetypelist)) {
                    $pagetypepattern = key($pagetypelist);
                }
                $iscoursepage = true;
            }
            $pagetype = $pagetypepattern;
            if ($iscoursepage) {
                $DB->delete_records($blockinstancetable, array("parentcontextid" => $page->context->id, "pagetypepattern" => $pagetype, "defaultregion" => $region));
            } elseif ($pagetype == 'site-index'){
                $DB->delete_records($blockinstancetable, array("pagetypepattern" => $pagetype, "defaultregion" => $region));
            } else {
                $DB->delete_records($blockinstancetable, array("pagetypepattern" => $pagetype,"subpagepattern" => $subpagetypepattern, "defaultregion" => $region));
            }
            $count = 0;
            foreach ($blocks as $block) {
                $blockcontent = json_decode($block->content);
                foreach ($blockcontent as $content) {
                    $count  = $count + 1;
                    $page->blocks->add_region($region);
                    if (property_exists($content, 'contenttype')) {
                        if ($content->contenttype == 'moodleblock' && property_exists($content, 'blockname')) {
                            $page->blocks->add_block($content->blockname, $region, $count, false, $pagetype, $subpagetypepattern);
                            $responsemsg = "blocks added sucessfully";
                            $responsestatus = true;
                        }
                        if ($content->contenttype == 'advancedblock') {
                            $page->blocks->add_block($blockname, $region, $count, false, $pagetype, $subpagetypepattern);
                            $blockrecord = $DB->get_record($blockinstancetable, array("blockname" => $blockname, "parentcontextid" => $page->context->id, "pagetypepattern" => $pagetype, "subpagepattern" => $subpagetypepattern, "defaultregion" => $region, "defaultweight" => $count), '*');
                            $advancedblockcontent = $DB->get_record("edw_page_blocks", array("title" => $content->blockname), '*');
                            $advancedblockcontent = json_decode($advancedblockcontent->content);
                            $dataobj = new stdClass();
                            $dataobj->html = [
                            "text" => $advancedblockcontent->html,
                            "format" => 1
                            ];

                            $dataobj->css = [
                            "text" => $advancedblockcontent->css,
                            "format" => 1
                            ];

                            $dataobj->js = [
                            "text" => $advancedblockcontent->js,
                            "format" => 1
                            ];
                            try {
                                $instance = block_instance($blockrecord->blockname, $blockrecord);
                                $instance->instance_config_save($dataobj, false);
                            } catch (\Exception $e) {
                                echo("something went wrong try again");
                            }
                            $responsemsg = "blocks added sucessfully";
                            $responsestatus = true;

                        }
                    } else {
                        $page->blocks->add_block($blockname, $region, $count, false, $pagetype, $subpagetypepattern);
                        $blockrecord = $DB->get_record($blockinstancetable, array("blockname" => $blockname, "parentcontextid" => $page->context->id, "pagetypepattern" => $pagetype, "subpagepattern" => $subpagetypepattern, "defaultregion" => $region, "defaultweight" => $count), '*');
                        $content->html = preg_replace('/\sonload\s*=\s*["\'][^"\']*["\']/', '', $content->html);
                        $dataobj = new stdClass();
                        $dataobj->html = [
                        "text" => $content->html,
                        "format" => 1
                        ];

                        $dataobj->css = [
                        "text" => $content->css,
                        "format" => 1
                        ];

                        $dataobj->js = [
                        "text" => $content->js,
                        "format" => 1
                        ];
                        try {
                            $instance = block_instance($blockrecord->blockname, $blockrecord);
                            $instance->instance_config_save($dataobj, false);
                        } catch (\Exception $e) {
                            echo("something went wrong try again");
                        }
                        $responsemsg = "blocks added sucessfully";
                        $responsestatus = true;
                    }
                }
            }
        }

        return array(
            'status' => $responsestatus,
            'msg' => $responsemsg

        );
    }
    public static function edwiser_add_adv_block_layout_returns() {
        return new \external_single_structure(
            array(
                'status' => new external_value( PARAM_BOOL, 'Boolean success or fails.' ),
                'msg'    => new external_value( PARAM_TEXT, 'Error or success message.' ),
            )
        );
    }
}
