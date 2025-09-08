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

use stdClass;
use context_system;
// This class will handle every operations related to users

class latestmembers{

    public function get_block_context(){
        global $OUTPUT, $PAGE;
        $context = new \stdClass();

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
        if (in_array("manager", $options['roles'])) {
            return true;
        }
        return false;
    }

    public function get_latest_members_list() {
        $obj = \local_edwiserpagebuilder\remuiblck\userhandler::get_instance();
        $data = $obj->get_latest_member_data();

        $context                 = new stdClass;
        $context->latest_members = $data['latest_members'];
        $context->profile_url    = $data['profile_url']->out();
        $context->user_profiles  = $data['user_profiles']->out();

        return $context;
    }

    public function generate_block_content($context=[]) {

        global $OUTPUT, $CFG;

        return $OUTPUT->render_from_template("local_edwiserpagebuilder/remuiblck/latestmembers", $context);
    }
}
