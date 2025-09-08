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
 * Backup steps for the Edwiser Video Activity module.
 *
 * @package    mod_edwiservideoactivity
 * @copyright  2024 Edwiser
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
defined('MOODLE_INTERNAL') || die();

class backup_edwiservideoactivity_activity_structure_step extends backup_activity_structure_step {

    protected function define_structure() {
        // Define the structure for the activity
        $edwiservideoactivity = new backup_nested_element('edwiservideoactivity', array('id'), array(
            'course', 'name', 'intro', 'introformat', 'sourcetype', 'sourcepath',
            'hasresources', 'hastranscript', 'timecreated', 'timemodified'
        ));

        // Define sources
        $edwiservideoactivity->set_source_table('edwiservideoactivity', array('id' => backup::VAR_ACTIVITYID));

        // Define file annotations
        $edwiservideoactivity->annotate_files('mod_edwiservideoactivity', 'intro', null);
        $edwiservideoactivity->annotate_files('mod_edwiservideoactivity', 'mediafile', null);
        $edwiservideoactivity->annotate_files('mod_edwiservideoactivity', 'resources', null);
        $edwiservideoactivity->annotate_files('mod_edwiservideoactivity', 'transcript', null);

        return $this->prepare_activity_structure($edwiservideoactivity);
    }
}