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
 * @author Gourav Govande
 */
namespace local_edwiserpagebuilder\external;

// defined('MOODLE_INTERNAL') || die;

use external_function_parameters;
use external_value;
use context_system;
use context_user;
trait get_frontpage_section_courses_in_category {
    /**
     * Describes the parameters for get_frontpage_section_courses_in_category
     * @return external_function_parameters
     */
    public static function get_frontpage_section_courses_in_category_parameters() {
        return new external_function_parameters(
            array(
                'instanceid' => new external_value(PARAM_INT, 'Section instance id'),
                'categoryid' => new external_value(PARAM_INT, 'Category id', VALUE_DEFAULT, 0),
                'start'      => new external_value(PARAM_INT, 'Start index', VALUE_DEFAULT, 0)
            )
        );
    }

    /**
     * Get frontpage section courses in category
     * @param  int   $instanceid Instance id of course section
     * @param  int   $categoryid Category id
     * @return array             Courses list
     */
    public static function get_frontpage_section_courses_in_category($instanceid, $categoryid = 0, $start = 0) {
        global $PAGE, $OUTPUT, $USER, $CFG;
        require_once($CFG->dirroot . '/local/edwiserpagebuilder/lib.php');
        $PAGE->set_context(context_system::instance());
        $userisediting = false;
        if (isloggedin()) {
            $usercontext = context_user::instance($USER->id);
            $userisediting = $PAGE->user_is_editing();
        }
        $instance = get_config_by_instanceid($instanceid);
        $configdata = json_decode($instance->configdata, true);
        if ($categoryid != 0) {
            $categories = get_homepaegcourses_categories([$categoryid]);
        } else {
            $categories = get_homepaegcourses_categories(isset($configdata['categories']) ? $configdata['categories'] : []);
        }
        $date = isset($configdata['date']) ? $configdata['date'] : 'all';

        list($configdata['totalcourse'], $configdata['courses']) = get_courses_from_category($categories, $date, $start);
        if (empty($configdata['courses'])) {
            $configdata['coursesplaceholder'] = $OUTPUT->image_url('courses', 'block_myoverview')->out();
        }
        return json_encode($configdata);
    }

    /**
     * Describes the get_frontpage_section_courses_in_category return value
     * @return external_value
     */
    public static function get_frontpage_section_courses_in_category_returns() {
        return new external_value(PARAM_RAW, 'Courses Data Json');
    }
}
