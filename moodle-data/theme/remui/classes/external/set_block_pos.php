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
 * Save user profile settings service
 *
 * @package   theme_remui
 * @copyright (c) 2023 WisdmLabs (https://wisdmlabs.com/) <support@wisdmlabs.com>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
namespace theme_remui\external;

use external_function_parameters;
use external_value;
use context_system;
use stdClass;
use context;

/**
 * Set_block_position trait
 * @copyright (c) 2022 WisdmLabs (https://wisdmlabs.com/) <support@wisdmlabs.com>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

trait set_block_pos {
    public static function set_block_pos_parameters() {
        return new external_function_parameters(
            array (
                'currentblockid' => new external_value(PARAM_RAW, 'block id 1'),
                'movingblockid' => new external_value(PARAM_RAW, 'block id 2'),
                'region' => new external_value(PARAM_RAW, 'block region'),
                'blockfoundstatus' => new external_value(PARAM_RAW, 'block found or not in the region'),
                'operationtype' => new external_value(PARAM_RAW, 'move operation or swap operaton'),
                'movedirection' => new external_value(PARAM_RAW, 'move block direction moveblockup or moveblockdown'),
                'contextid' => new external_value(PARAM_RAW, 'page context id'),
            )
        );
    }

    public static function set_block_pos($currentblockid, $movingblockid, $region, $blockfoundstatus, $operationtype, $movedirection, $contextid) {
        global $DB, $CFG;

        require_once($CFG->dirroot . '/theme/remui/lib.php');
        $movestatus = false;
        $currentblockinstance = new \stdClass();
        $movingblockinstance  = new \stdClass();
        $blockinstancetable = 'block_instances';

        $currentblockinstance = $DB->get_record($blockinstancetable, array("id" => $currentblockid));
        if ($operationtype == 'up' || $operationtype == 'down') {
            if ($currentblockid != 'na' && $movingblockid != 'na') {

                $movingblockinstance  = $DB->get_record($blockinstancetable, array("id" => $movingblockid));


                $DB->update_record($blockinstancetable, array("id" => $currentblockid, 'defaultweight' => $movingblockinstance->defaultweight));
                $recordexist = $DB->record_exists('block_positions', array('blockinstanceid' => $movingblockinstance->id));
                if ($recordexist) {
                    edw_reposition_block($movingblockinstance, $region, $currentblockinstance->defaultweight, $contextid, $movingblockinstance->pagetypepattern, $movingblockinstance->subpagepattern);
                }


                $recordexist = $DB->record_exists('block_positions', array('blockinstanceid' => $currentblockinstance->id));
                $DB->update_record($blockinstancetable, array("id" => $movingblockid, 'defaultweight' => $currentblockinstance->defaultweight));
                if ($recordexist) {
                    edw_reposition_block($currentblockinstance, $region, $movingblockinstance->defaultweight, $contextid, $currentblockinstance->pagetypepattern, $currentblockinstance->subpagepattern);
                }
                $movestatus = true;
            }
        }
        if ($operationtype == 'move' &&  $movedirection == 'moveblockup') {
            if ($movingblockid == 'na') {
                edw_reposition_block($currentblockinstance, $region, 0, $contextid, $currentblockinstance->pagetypepattern, $currentblockinstance->subpagepattern);
                $movestatus = true;

            } else {
                $movingblockinstance  = $DB->get_record($blockinstancetable, array("id" => $movingblockid));
                edw_reposition_block($currentblockinstance, $region, $movingblockinstance->defaultweight + 1, $contextid, $currentblockinstance->pagetypepattern, $currentblockinstance->subpagepattern);
                $movestatus = true;
            }
        }

        if ($operationtype == 'move' &&  $movedirection == 'moveblockdown') {
            if ($movingblockid == 'na') {
                edw_reposition_block($currentblockinstance, $region, 0, $contextid, $currentblockinstance->pagetypepattern, $currentblockinstance->subpagepattern);
                $movestatus = true;

            } else {
                $movingblockinstance  = $DB->get_record($blockinstancetable, array("id" => $movingblockid));
                edw_reposition_block($currentblockinstance, $region, $movingblockinstance->defaultweight - 1, $contextid, $currentblockinstance->pagetypepattern, $currentblockinstance->subpagepattern);
                $movestatus = true;
            }
        }
        return $movestatus;
    }

    public static function set_block_pos_returns() {
        return  new external_value(PARAM_RAW, 'status of block weight changed or not');
    }
}
