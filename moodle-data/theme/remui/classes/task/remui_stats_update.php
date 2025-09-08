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
 * Sets the preferences for all admins.
 *
 * @package   theme_remui
 * @copyright (c) 2023 WisdmLabs (https://wisdmlabs.com/) <support@wisdmlabs.com>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

namespace theme_remui\task;

class remui_stats_update extends \core\task\scheduled_task {

    /**
     * Return the task's name as shown in admin screens.
     *
     * @return string
     */
    public function get_name() {
        return get_string('dashboardstatsupdate', 'theme_remui');
    }

    /**
     * Executes the task of updating the dashboard and course statistics for the Remui theme.
     *
     * This task is responsible for updating the dashboard and course statistics for the Remui theme.
     * It retrieves the user IDs and course IDs, and then updates the statistics for each user and course.
     * The task also sets the cache reset time to ensure the statistics are updated correctly.
     */
    public function execute() {
        set_time_limit(0);
        $coursehandler = new \theme_remui_coursehandler();

        if (get_config("theme_remui", "enabledashboardcoursestats")) {
            $userids = $this->get_user_ids();
            foreach ($userids as $userid) {
                $coursehandler->set_dashboard_stats($userid);
                // Free up memory
                \core_php_time_limit::raise(30);
                gc_collect_cycles();
            }
            set_config('cache_reset_time', time(), 'theme_remui');
        } else {
            set_config("edwdashboardstats", "", "theme_remui");
        }

        if (get_config("theme_remui", "enablecoursestats")) {
            $courseids = $this->get_course_ids();
            foreach ($courseids as $courseid) {
                $course = get_course($courseid);
                $coursehandler->set_course_stats($course, true);
                // Free up memory
                \core_php_time_limit::raise(30);
                gc_collect_cycles();
            }
            set_config('cache_reset_time', time(), 'theme_remui');
        } else {
            set_config("edwcoursestats", "", "theme_remui");
        }
    }

    /**
     * Retrieves a list of user IDs for all non-deleted users.
     *
     * @return array An array of user IDs.
     */
    private function get_user_ids() {
        global $DB;
        return $DB->get_fieldset_select('user', 'id', 'deleted = 0');
    }

    /**
     * Retrieves a list of course IDs for all courses except the site course (with ID 1).
     *
     * @return array An array of course IDs.
     */
    private function get_course_ids() {
        global $DB;
        return $DB->get_fieldset_select('course', 'id', 'id <> :siteid', ['siteid' => SITEID]);
    }
}
