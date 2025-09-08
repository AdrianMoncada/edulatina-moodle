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
 * @copyright (c) 2022 WisdmLabs (https://wisdmlabs.com/) <support@wisdmlabs.com>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 * @author Abhishek Kushwah
 */
namespace local_edwiserpagebuilder\external;


use external_function_parameters;
use external_value;
use context_system;
use context_user;
trait get_courselist {
    /**
     * Describes the parameters for get_frontpage_section_courses_in_category
     * @return external_function_parameters
     */
    public static function get_courselist_parameters() {
        return new external_function_parameters(
            array(
                'config' => new external_value(PARAM_RAW, 'courseids')
            )
        );
    }

    /**
     * Get frontpage section courses in category
     * @param  int   $instanceid Instance id of course section
     * @param  int   $categoryid Category id
     * @return array             Courses list
     */
    public static function get_courselist($config) {
        global $PAGE, $DB;

        // Validation for context is needed.
        $context = \context_system::instance();

        $PAGE->set_context($context);

        // $courselistdata = $DB->get_records('course',null,'','id,fullname');
        $courselistdata = $DB->get_records_select('course', 'id != :siteid', ['siteid' => SITEID], 'fullname', 'id, fullname');

        // if (!empty($courselistdata)) {
        //     array_shift($courselistdata);
        // }
        foreach ($courselistdata as &$course) {
                $course->fullname = format_text($course->fullname,FORMAT_HTML);
        }
        $courselistdata = json_encode($courselistdata);

        return $courselistdata;
    }

    /**
     * Describes the  get_courselist_returns  value
     * @return external_value
     */
    public static function get_courselist_returns() {
        return new external_value(PARAM_RAW, 'Courses list');
    }
}
