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
 * Overriding Core Fonts system.
 *
 * @package   theme_remui
 * @copyright (c) 2023 WisdmLabs (https://wisdmlabs.com/) <support@wisdmlabs.com>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

namespace theme_remui\output;

class icon_system_fontawesome extends \core\output\icon_system_fontawesome {
    public function get_core_icon_map() {

        $iconmap = parent::get_core_icon_map();

        global $PAGE;
        $settings = $PAGE->theme->settings;

        $overrides = array(
            'core:t/message' => 'edw-icon edw-icon-Comment-03',
            'core:message' => 'edw-icon edw-icon-Comment-03',
            'core:i/notifications' => 'edw-icon edw-icon-Notification',
            'core:t/markasread' => 'edw-icon edw-icon-Checkbox_Active',
            'core:i/settings' => 'edw-icon edw-icon-Setting',
            'core:i/move_2d' => 'edw-icon edw-icon-Move',
            'core:t/edit' => 'edw-icon edw-icon-Setting',
            'core:t/hide' => 'edw-icon edw-icon-Show',
            'core:t/show' => 'edw-icon edw-icon-Hide',
            'core:i/permissions' => 'edw-icon edw-icon-Permission-1',
            'core:i/checkpermissions' => 'edw-icon edw-icon-Permission-2-Ok',
            'core:t/edit_menu' => 'edw-icon edw-icon-Setting',
            'core:req' => 'edw-icon edw-icon-Info text-danger',
            'core:a/help' => 'edw-icon edw-icon-Help text-info',
            'core:help' => 'edw-icon edw-icon-Help text-info',
            'core:e/help' => 'edw-icon edw-icon-Help text-info',
            'core:i/calendar' => 'edw-icon edw-icon-Calendar',
            'gradingform_guide:info' => 'edw-icon edw-icon-Info',
            'core:docs' => 'edw-icon edw-icon-Info',
            'tool_recyclebin:trash' => 'edw-icon edw-icon-Delete-Course',
            'core:b/edit-delete' => 'edw-icon edw-icon-Delete-Course',
            'core:i/delete' => 'edw-icon edw-icon-Delete-Course',
            'core:i/trash' => 'edw-icon edw-icon-Delete-Course',
            'core:t/delete' => 'edw-icon edw-icon-Delete-Course',
            'block_accessreview:f/form' => 'edw-icon edw-icon-Delete-Course',
            'enrol_lti:platformdetails' => 'edw-icon edw-icon-Delete-Course',
            'core:e/special_character' => 'edw-icon edw-icon-Delete-Course',
            'core:i/permissions' => 'edw-icon edw-icon-Permission-1',
            'mod_scorm:incomplete' => 'edw-icon edw-icon-Delete-Course',
            'theme:fp/view_icon_active' => 'edw-icon edw-icon-Card-View',
            'theme:fp/view_list_active' => 'edw-icon edw-icon-List-View-08',
            'theme:fp/view_tree_active' => 'edw-icon edw-icon-Folder',
            'core:a/refresh' => 'edw-icon edw-icon-Refresh',
            'core:a/logout' => 'edw-icon edw-icon-Logout',
            'core:a/setting' => 'edw-icon edw-icon-Setting',
            'core:a/help' => 'edw-icon edw-icon-Help',
            'core:t/index_drawer' => 'edw-icon edw-icon-List-View-08',
            'core:t/expandedchevron' => 'edw-icon edw-icon-Down-Arrow',
            'core:t/collapsedchevron' => 'edw-icon edw-icon-Right-Arrow',
            'core:t/collapsedchevron_up' => 'edw-icon edw-icon-UpArrow',
            'core:t/collapsedchevron_rtl' => 'edw-icon edw-icon-Left-Arrow',
            'core:t/email' => 'edw-icon edw-icon-Email',
            'core:i/enrolusers' => 'edw-icon edw-icon-Adduser',
            'core:t/enrolusers' => 'edw-icon edw-icon-Adduser',
            'core:t/addcontact' => 'edw-icon edw-icon-User-Event',
            'core:addcontact' => 'edw-icon edw-icon-User-Event',
            'core:t/removecontact' => 'fa fa-user-times fa-fw',
            'core:removecontact' => 'fa fa-user-times fa-fw',
        );

        $merged = array_merge($iconmap, $overrides);

        return $merged;
    }
}
