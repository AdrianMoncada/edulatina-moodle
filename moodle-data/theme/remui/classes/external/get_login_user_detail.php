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
 * Web service - Send feedback report.
 *
 * @package   theme_remui
 * @copyright (c) 2023 WisdmLabs (https://wisdmlabs.com/) <support@wisdmlabs.com>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
namespace theme_remui\external;

defined('MOODLE_INTERNAL') || die;
require_once($CFG->dirroot . '/user/lib.php');
use external_function_parameters;
use context_system;
use external_value;
use tool_analytics\task\train_models;

trait get_login_user_detail {

    public static function get_login_user_detail_parameters() {
        return new external_function_parameters(
            array ()
        );
    }

    public static function get_login_user_detail() {
        global $USER, $PAGE;
        $PAGE->set_context(context_system::instance());
        $info = user_get_user_navigation_info($USER, $PAGE);
        $data = '
        <div class="messager-img-container" style="flex-shrink: 0">'.$info->metadata['useravatar'].'</div>
        <div class="text-truncate username"> <h6 class="text-truncate m-0 small-info-semibold edw-header-color">'
        .$info->metadata['userfullname'].'</h6></div>';

        return $data;
    }

    public static function get_login_user_detail_returns() {
        return  new external_value(PARAM_RAW, 'details of logged in user');
    }
}
