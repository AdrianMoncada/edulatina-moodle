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
use stdClass;

/**
 * Service definition for create new form
 * @copyright (c) 2022 WisdmLabs (https://wisdmlabs.com/) <support@wisdmlabs.com>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
trait epb_fetch_layout_templates {

    /**
     * Returns the functional parameter for fetching the blocks list.
     * @return external_function_parameters  Functional parameters
     */
    public static function epb_fetch_layout_templates_parameters() {
        return new external_function_parameters(
            array('templatename' => new external_value( PARAM_RAW, 'Generated HTML for blocks list' ))
        );
    }

    /**
     * Return the response structure Fetch the blocks list service.
     * @return external_single_structure return structure
     */
    public static function epb_fetch_layout_templates_returns() {
        return new \external_single_structure(
            array(
                'pagelayoutjson' => new external_value( PARAM_RAW, 'Generated HTML for blocks list' )
            )
        );
    }

    /**
     * List down the blocks data.
     * @return array  [limitto, blocks[]]
     */
    public static function epb_fetch_layout_templates($templatename = "") {
        global $CFG, $OUTPUT, $PAGE;

        $PAGE->set_context(\context_system::instance());

        require_once($CFG->dirroot . '/local/edwiserpagebuilder/lib.php');
        local_edwiserpagebuilder_update_block_content();

        $blockslist = [];
        $bm = new \local_edwiserpagebuilder\block_handler();
        $pagelayoutblock = $bm->fetch_blocks_list(array("type" => "blocklayout"));
        foreach ($pagelayoutblock as $key => $block) {
            $obj = new stdClass();
            $obj->id = $block->id;
            $obj->name = "edwiseradvancedblock";
            $obj->additionalclass = "islayout";
            $obj->section = $block->title;
            $obj->title = $block->label;
            $obj->thumbnail = str_replace("{{>cdnurl}}", CDNIMAGES, $block->thumbnail);
            $obj->updateavailable = $block->updateavailable;
            $obj->visible = $block->visible;
            if ($block->updateavailable || !$block->visible) {
                $obj->hasextrabutton = true;
            }
            $blockslist[] = $obj;
        }

        if ($templatename !== "") {
            // Return files_list.
            return array(
                'pagelayoutjson' => $OUTPUT->render_from_template(
                    $templatename,
                    array("blocklist" => $blockslist)
                )
            );
        }

         // Return files_list.
         return array(
            'pagelayoutjson' => json_encode(array_values($blockslist))
        );

    }
}
