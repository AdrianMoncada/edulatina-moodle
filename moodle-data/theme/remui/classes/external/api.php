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
 * Theme external services
 *
 * @package   theme_remui
 * @copyright (c) 2023 WisdmLabs (https://wisdmlabs.com/) <support@wisdmlabs.com>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
namespace theme_remui\external;

defined('MOODLE_INTERNAL') || die;

require_once($CFG->libdir . "/externallib.php");
require_once($CFG->libdir . "/filelib.php");
require_once($CFG->dirroot . "/theme/remui/lib.php");

use external_api;

/**
 * Uses all moodle webservices trait defined in external folder
 * @copyright (c) 2022 WisdmLabs (https://wisdmlabs.com/) <support@wisdmlabs.com>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class api extends external_api {
    use handle_bug_feedback_report;
    use get_msg_contact_list_count;
    use get_login_user_detail;
    use get_course_stats;
    use get_myoverviewcourses;
    use enrol_get_course_content;
    use enrol_get_course_instructors;
    use get_courses;
    use get_tags;
    use save_user_profile_settings;
    use get_dashboard_stats;
    use set_block_pos;
    use enroll_page_action;
    use change_frontpagechooser;
    use do_setup_action;
    use do_feedbackcollection_action;
}
