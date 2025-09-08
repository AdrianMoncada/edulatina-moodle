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

namespace format_edwiservideoformat\output;

use action_link;
use cm_info;
use core_course\output\activitychooserbutton as core_activitychooserbutton;
use moodle_url;
use renderer_base;
use section_info;
use stdClass;

/**
 * Custom activity chooser button for Edwiser Video Format.
 *
 * @package    format_edwiservideoformat
 * @copyright  2024 Edwiser
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class activitychooserbutton extends core_activitychooserbutton {

    /**
     * Export this data so it can be used as the context for a mustache template.
     *
     * @param renderer_base $output typically, the renderer that's calling this function
     * @return stdClass data context for a mustache template
     */
    public function export_for_template(renderer_base $output): stdClass {
        // Get the base data from parent
        $data = parent::export_for_template($output);

        // Check if custom dropdown is enabled (you can change this to false to disable)
        $enableCustomDropdown = true;

        if ($enableCustomDropdown) {
            // Add custom dropdown options
            $data->customdropdown = true;
            $data->dropdownoptions = $this->get_custom_dropdown_options($output);
        } else {
            // Use default behavior
            $data->customdropdown = false;
        }

        return $data;
    }

    /**
     * Get custom dropdown options for Quiz and Edwiser Video Activity.
     *
     * @param renderer_base $output the renderer
     * @return array the dropdown options
     */
    protected function get_custom_dropdown_options(renderer_base $output): array {
        $courseid = $this->section->course;
        $sectionnum = $this->section->section;
        $sectionreturn = $this->sectionreturn;
        $modid = $this->mod ? $this->mod->id : null;

        $options = [];

        // Edwiser Video Activity option
        $videoactivityurl = new moodle_url('/course/modedit.php', [
            'add' => 'edwiservideoactivity',
            'type' => '',
            'course' => $courseid,
            'section' => $sectionnum,
            'return' => 0,
            'sr' => $sectionreturn
        ]);
        if ($modid) {
            $videoactivityurl->param('beforemod', $modid);
        }

        $options[] = [
            'name' => get_string('pluginname', 'mod_edwiservideoactivity'),
            'url' => $videoactivityurl->out(false),
            'iconkey' => 'icon',
            'iconcomponent' => 'mod_edwiservideoactivity',
            'classes' => '',
            'description' => 'Create a new Edwiser Video Activity.'
        ];

        // Quiz option
        $quizurl = new moodle_url('/course/modedit.php', [
            'add' => 'quiz',
            'type' => '',
            'course' => $courseid,
            'section' => $sectionnum,
            'return' => 0,
            'sr' => $sectionreturn
        ]);
        if ($modid) {
            $quizurl->param('beforemod', $modid);
        }

        $options[] = [
            'name' => get_string('pluginname', 'mod_quiz'),
            'url' => $quizurl->out(false),
            'iconkey' => 'icon',
            'iconcomponent' => 'mod_quiz',
            'description' => 'Create a new Quiz activity.',
            'classes' => ''
        ];

        return $options;
    }
}
