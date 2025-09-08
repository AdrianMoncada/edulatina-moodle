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
 * Restore steps for the Edwiser Video Activity module.
 *
 * @package    mod_edwiservideoactivity
 * @copyright  2024 Edwiser
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
defined('MOODLE_INTERNAL') || die();

class restore_edwiservideoactivity_activity_structure_step extends restore_activity_structure_step {

    protected function define_structure() {
        $paths = array();
        $paths[] = new restore_path_element('edwiservideoactivity', '/activity/edwiservideoactivity');
        return $this->prepare_activity_structure($paths);
    }

    protected function process_edwiservideoactivity($data) {
        global $DB;

        $data = (object)$data;
        $oldid = $data->id;
        $data->course = $this->get_courseid();

        // Clean up data - remove old id and set timestamps
        unset($data->id);
        $data->timecreated = time();
        $data->timemodified = time();

        // Insert the edwiservideoactivity record.
        $newitemid = $DB->insert_record('edwiservideoactivity', $data);

        // Apply the activity instance mapping - this is crucial for proper context mapping.
        $this->apply_activity_instance($newitemid);

        // Set the mapping for this item
        $this->set_mapping('edwiservideoactivity', $oldid, $newitemid);
    }

    protected function after_execute() {
        // Add edwiservideoactivity related files - all file areas use itemid = 0
        $this->add_related_files('mod_edwiservideoactivity', 'intro', null);
        $this->add_related_files('mod_edwiservideoactivity', 'mediafile', null);
        $this->add_related_files('mod_edwiservideoactivity', 'resources', null);
        $this->add_related_files('mod_edwiservideoactivity', 'transcript', null);
    }
}