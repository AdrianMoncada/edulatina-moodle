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
 * Get course stats service
 *
 * @package   theme_remui
 * @copyright (c) 2023 WisdmLabs (https://wisdmlabs.com/) <support@wisdmlabs.com>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
namespace theme_remui\external;

defined('MOODLE_INTERNAL') || die;

use external_function_parameters;
use external_value;
use external_single_structure;
use external_multiple_structure;

require_once($CFG->libdir . '/completionlib.php');

/**
 * Get course stats trait
 * @copyright (c) 2022 WisdmLabs (https://wisdmlabs.com/) <support@wisdmlabs.com>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
trait enrol_get_course_instructors {
    /**
     * Describes the parameters for enrol_get_course_instructors
     * @return external_function_parameters
     */
    public static function enrol_get_course_instructors_parameters() {
        return new external_function_parameters(
            array (
                'courseid' => new external_value(PARAM_INT, 'Course Id'),
            )
        );
    }

    /**
     * Save order of sections in array of configuration format
     * @param  int $courseid Course id
     * @return boolean       true
     */
    public static function enrol_get_course_instructors($courseid) {
        global $PAGE, $OUTPUT,$CFG, $USER;
        // Validation for context is needed.
        $systemcontext = \context_system::instance();
        self::validate_context($systemcontext);

        $context = \context_course::instance($courseid);
        $course = get_course($courseid);
        $teachers = get_enrolled_users($context, 'mod/folder:managefiles', 0, '*', 'firstname');

        $instructors = [];

        $systemcontext = \context_system::instance();

        $temparray = explode(',', $CFG->hiddenuserfields);
        $hiddenfields = [];
        foreach ($temparray as $value) {
            $hiddenfields[$value] = $value;
        }

        foreach ($teachers as $key => $teacher) {
            $usercourses = enrol_get_users_courses($teacher->id, $onlyactive = false, $fields = null, $sort = null);
            $totalstudents = 0;
            $totalcourses = 0;
            foreach ($usercourses as $key => $usercourse) {
                $tempcontext = \context_course::instance($usercourse->id);
                if (is_enrolled($tempcontext, $teacher->id, 'mod/folder:managefiles', false)) {
                    $totalstudents += count_enrolled_users($tempcontext, 'mod/quiz:attempt');
                    $totalcourses++;
                }
            }
            $instructor = [];
            $instructor['id'] = $teacher->id;
            $instructor['fullname'] = fullname($teacher, true);
            $instructor['avatar'] = $OUTPUT->user_picture($teacher,array('size' => 116));
            $instructor['totalstudents'] = $totalstudents;
            $instructor['totalcourses'] = $totalcourses;
            $instructor['profileurl'] = $CFG->wwwroot.'/user/profile.php?id='.$teacher->id;
            $instructor['email'] =  $teacher->email;
            $instructor['description'] =  format_text(file_rewrite_pluginfile_urls($teacher->description, 'pluginfile.php', $context->id, 'user', 'profile', $teacher->id),FORMAT_HTML);
            if (isset($hiddenfields['email']) || $teacher->maildisplay == 0) {
                $instructor['email'] = false;
            }

            if (isset($hiddenfields['description'])) {
                $instructor['description'] = false;
            }

            $instructor['allowedmessaging'] =  false;
            // if(isloggedin()){
            //     $instructor['allowedmessaging'] = false;
            //     if (user_can_view_profile($USER, $course)) {
            //         if (!empty($CFG->messaging) && has_capability('moodle/site:sendmessage', $context)) {
            //             $instructor['allowedmessaging'] = true;
            //         }
            //     }
            // }

            $instructors[] = $instructor;
        }

        return json_encode(array("instructors" => $instructors));
    }

    /**
     * Describes the enrol_get_course_instructors return value
     * @return external_value
     */
    public static function enrol_get_course_instructors_returns() {
        return new external_value(PARAM_RAW, 'course instructors data');
    }
}
