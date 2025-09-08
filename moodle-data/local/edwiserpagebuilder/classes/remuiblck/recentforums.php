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

// This class will handle every operations related to users

class recentforums{

    public function get_block_context(){
        return [];
    }

    public function get_recent_active_forum() {
        global $OUTPUT;

        session_write_close();

        $obj = \local_edwiserpagebuilder\remuiblck\coursehandler::get_instance();
        // Forum Data
        $data = $obj->get_recent_active_forums();
        $response = [];
        if (!empty($data)) {
            $response = $data;
        }
        $response["nodataimg"]  = $OUTPUT->image_url("No_Event_24", "local_edwiserpagebuilder")->__toString();
        return $response;
    }

    public function generate_block_content($context=[]) {

        global $OUTPUT, $CFG;

        return $OUTPUT->render_from_template("local_edwiserpagebuilder/remuiblck/recent_active_forum", $context);
    }
}
