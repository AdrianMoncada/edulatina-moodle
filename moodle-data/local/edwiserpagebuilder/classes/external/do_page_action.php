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
trait do_page_action {
    /**
     * Describes the parameters for add_new_page
     * @return external_function_parameters
     */
    public static function do_page_action_parameters() {
        return new external_function_parameters(
            array(
                'action' => new external_value(PARAM_TEXT, 'Action Type'),
                'config' => new external_value(PARAM_RAW, 'Page data')
            )
        );
    }

    /**
     * Add new custome page
     * @param string page action which shoudl
     * @param  array page configuration data
     */
    public static function do_page_action($action, $config) {
        global $PAGE;
        $PAGE->set_context(context_system::instance());
        $pagehandler = new \local_edwiserpagebuilder\custom_page_handler();

        $return = $pagehandler->perform_action($action, $config);

        return json_encode($return);
    }

    /**
     * Describes the  do_page_action_returns  value
     * @return external_value
     */
    public static function do_page_action_returns() {
        return new external_value(PARAM_RAW, 'Page');
    }
}

