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
 * Class User Handler.
 *
 * @package local_edwiserpagebuilder
 * @author  2022 WisdmLabs
 * @license http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
namespace local_edwiserpagebuilder\remuiblck;

defined('MOODLE_INTERNAL') || die();

use context_system;
use context_course;
use core_enrol_external;
// This class will handle every operations related to notes

class addnotes{

    public function get_block_context(){
        global $OUTPUT, $CFG;

        $context = $this->get_notes_content();

        return $context;
    }

    public function get_notes_content() {
        global $OUTPUT, $PAGE;
        $context = new \stdClass();
        $obj = \local_edwiserpagebuilder\remuiblck\coursehandler::get_instance();

        $courses = $obj->get_notes_data();
        if ($courses) {
            foreach($courses as $i => $course) {
                $course->shortname = format_text($course->shortname, FORMAT_HTML);
                $course->fullname = format_text($course->fullname, FORMAT_HTML);
            }
            $context->has_courses = true;
            $context->courses = array_values($courses);
        }
        $context->canview = $this->can_view();
        $context->warningicon = $OUTPUT->image_url("warninig_icon", "local_edwiserpagebuilder");
        $context->editing = $PAGE->user_is_editing();

        return $context;
    }

    public function can_view() {

        if(is_siteadmin()){
            return true;
        }

        $userobj = \local_edwiserpagebuilder\remuiblck\userhandler::get_instance();

        $options["roles"] = $userobj->get_user_roles_system_wide();
        if (in_array("manager", $options['roles']) ||
            in_array("teacher", $options['roles']) ||
            in_array("editingteacher", $options['roles'])) {
            return true;
        }

        return false;
    }

    public function get_enrolled_users_by_course($config) {
        $context = context_course::instance($config->courseid);
        
        if (has_capability('moodle/notes:manage', $context)) {
            return core_enrol_external::get_enrolled_users($config->courseid, $options = array());
        }
        return array();
    }

    public function generate_block_content($context=[]) {

        global $OUTPUT, $CFG;

        return $OUTPUT->render_from_template("local_edwiserpagebuilder/remuiblck/addnotes", $context);
    }
}
