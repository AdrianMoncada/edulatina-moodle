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
 * @package   filter_edwiserpbf
 * @copyright (c) 2022 WisdmLabs (https://wisdmlabs.com/) <support@wisdmlabs.com>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 * @author    Gourav Govande
 */
defined('MOODLE_INTERNAL') || die();

/**
 * Get user picture from user object
 * @param  object  $userobject User object
 * @param  integer $imgsize    Size of image in pixel
 * @return String              User picture link
 */
function get_course_teacher($course) {
    global $CFG, $DB;
    $corecourselistelement = new \core_course_list_element($course);
    // Course instructors.
    $instructors = $corecourselistelement->get_course_contacts();
    foreach ($instructors as $key => $instructor) {
        return array(
            'name' => $instructor['username'],
            'url'  => $CFG->wwwroot.'/user/profile.php?id='.$key,
            'picture' => get_user_picture($DB->get_record('user', array('id' => $key)))
        );
    }
    return null;
}

/**
 * Get user picture from user object
 * @param  object  $userobject User object
 * @param  integer $imgsize    Size of image in pixel
 * @return String              User picture link
 */
function get_user_picture($userobject = null, $imgsize = 100) {
    global $USER, $PAGE;
    if (!$userobject) {
        $userobject = $USER;
    }

    $userimg = new \user_picture($userobject);
    $userimg->size = $imgsize;
    return  $userimg->get_url($PAGE);
}

function epbf_is_plugin_available($component) {
    list($type, $name) = core_component::normalize_component($component);

    $dir = \core_component::get_plugin_directory($type, $name);
    if (!file_exists($dir)) {
        return false;
    }
    return true;
}
