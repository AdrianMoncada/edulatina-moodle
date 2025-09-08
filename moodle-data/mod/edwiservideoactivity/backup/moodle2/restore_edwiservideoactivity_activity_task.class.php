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
 * Restore activity task for the Edwiser Video Activity module.
 *
 * @package    mod_edwiservideoactivity
 * @copyright  2024 Edwiser
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
defined('MOODLE_INTERNAL') || die();

require_once($CFG->dirroot . '/mod/edwiservideoactivity/backup/moodle2/restore_edwiservideoactivity_stepslib.php');

class restore_edwiservideoactivity_activity_task extends restore_activity_task {

    protected function define_my_settings() {
        // No particular settings for this activity
    }

    protected function define_my_steps() {
        $this->add_step(new restore_edwiservideoactivity_activity_structure_step('edwiservideoactivity_structure', 'edwiservideoactivity.xml'));
    }

    /**
     * Define the contents in the activity that must be
     * processed by the link decoder
     */
    public static function define_decode_contents() {
        $contents = array();
        $contents[] = new restore_decode_content('edwiservideoactivity', array('intro', 'sourcepath'), 'edwiservideoactivity');
        return $contents;
    }

    /**
     * Define the decoding rules for links belonging
     * to the activity to be executed by the link decoder
     */
    public static function define_decode_rules() {
        $rules = array();
        $rules[] = new restore_decode_rule('EDWISERVIDEOACTIVITYVIEWBYID', '/mod/edwiservideoactivity/view.php?id=$1', 'course_module');
        $rules[] = new restore_decode_rule('EDWISERVIDEOACTIVITYINDEX', '/mod/edwiservideoactivity/index.php?id=$1', 'course');
        return $rules;
    }
}