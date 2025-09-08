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
 * Edwiser RemUI
 *
 * @package   theme_remui
 * @copyright (c) 2023 WisdmLabs (https://wisdmlabs.com/) <support@wisdmlabs.com>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
namespace theme_remui\controller;

/**
 * Class EventsController will handle the events triggered by Moodle.
 */
class EventsController {

    public static function remui_stats_common($userid, $courseid, $deleteActivity = false, $coursedeleted=false) {

        $coursehandler = new \theme_remui_coursehandler();

        if ($userid) {
            if (get_config( "theme_remui", "enabledashboardcoursestats")) {
                $coursehandler->set_dashboard_stats($userid);
            } else {
                set_config("edwdashboardstats", "", "theme_remui");
            }
        }
        if ($courseid) {
            if (get_config( "theme_remui", "enablecoursestats")) {
                if (!$coursedeleted) {
                    $course = get_course($courseid);
                    $coursehandler->set_course_stats($course, true);
                }

                if ($deleteActivity) {
                    if (get_config( "theme_remui", "enabledashboardcoursestats")) {
                        $coursehandler->reset_dashboard_stats_for_users_incourse($course);
                    } else {
                        set_config("edwdashboardstats", "", "theme_remui");
                    }
                }
            } else {
                set_config("edwcoursestats", "", "theme_remui");
            }
        }
    }
    public static function user_enrollment_event($eventdata) {

        $data = $eventdata->get_data();

        $userid = $data['relateduserid'];

        EventsController::remui_stats_common($userid, $eventdata->courseid);

        set_user_preference('course_cache_reset', true, $userid);

        // Update Enrollment History Data.
        $pnotification = new \theme_remui\productnotifications();
        $pnotification->update_enrollment_history();
    }

    public static function course_updation_event($eventdata) {
        // Set Global Config to acknowledge to reset the cache.
        // Can reset order is not just for enrolled students.
        // Need to reset the cache of all users as that course get displayed in All Courses Tab.

        $data = $eventdata->get_data();

        EventsController::remui_stats_common($data['relateduserid'], $eventdata->courseid);

        set_config('cache_reset_time', time(), 'theme_remui');
    }

    public static function course_deletion_event($eventdata) {
        // Set Global Config to acknowledge to reset the cache.
        // Can reset order is not just for enrolled students.
        // Need to reset the cache of all users as that course get displayed in All Courses Tab.

        $data = $eventdata->get_data();

        EventsController::remui_stats_common($data['relateduserid'], $eventdata->courseid, false, true);

        set_config('cache_reset_time', time(), 'theme_remui');
    }

    public static function updation_on_create_delete_activity($eventdata) {
        // Set Global Config to acknowledge to reset the cache.
        // Can reset order is not just for enrolled students.
        // Need to reset the cache of all users as that course get displayed in All Courses Tab.

        EventsController::remui_stats_common("", $eventdata->courseid, true);

        set_config('cache_reset_time', time(), 'theme_remui');
    }


    public static function user_loggedin_event($eventdata) {
        global $USER;
        set_user_preference('enable_focus_mode', null, $USER->id);

        set_user_preference('animate_dm_icon', true, $USER->id);

    }
}
