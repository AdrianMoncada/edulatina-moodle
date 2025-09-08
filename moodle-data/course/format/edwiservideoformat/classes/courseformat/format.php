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

namespace format_edwiservideoformat\courseformat;

use core_courseformat\base as format_base;
use core_courseformat\output\section_renderer;
use moodle_page;

/**
 * Main class for the Edwiser Video Format
 *
 * @package    format_edwiservideoformat
 * @copyright  2024 Edwiser
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class format extends format_base {
    /**
     * Returns true if this course format uses sections
     *
     * @return bool
     */
    public function uses_sections() {
        return true;
    }

    /**
     * Returns the display name of the given section that the course prefers.
     *
     * @param int|stdClass $section Section object from database or just field section.section
     * @return string Display name that the course format prefers, e.g. "Topic 2"
     */
    public function get_section_name($section) {
        $section = $this->get_section($section);
        if ((string)$section->name !== '') {
            return format_string($section->name, true,
                    ['context' => \context_course::instance($this->courseid)]);
        } else {
            return $this->get_default_section_name($section);
        }
    }

    /**
     * Returns the default section name for the format
     *
     * @param stdClass $section Section object from database or just field section.section
     * @return string The default value for the section name.
     */
    public function get_default_section_name($section) {
        if ($section->section == 0) {
            // Return the general section.
            return get_string('section0name', 'format_edwiservideoformat');
        } else {
            return get_string('sectionname', 'format_edwiservideoformat') . ' ' . $section->section;
        }
    }

    /**
     * Get the course format options.
     *
     * @param bool $foreditform Whether the options are for the edit form
     * @return array The course format options
     */
    public function get_format_options($foreditform = false) {
        return format_edwiservideoformat_get_course_format_options($this->get_course());
    }

    /**
     * Update the course format options.
     *
     * @param stdClass $data The data to update
     * @param bool $oldformat Whether this is an old format
     * @return bool True if the update was successful
     */
    public function update_format_options($data, $oldformat = false) {
        return format_edwiservideoformat_update_course_format_options($this->get_course(), $data);
    }

    /**
     * Get the default course format options.
     *
     * @return array The default course format options
     */
    public function get_default_format_options() {
        return format_edwiservideoformat_get_default_course_format_options();
    }

    /**
     * Get the course format options for a specific course.
     *
     * @param int $courseid The course ID
     * @return array The course format options
     */
    public function get_course_format_options($courseid) {
        return format_edwiservideoformat_get_course_format_options_for_course($courseid);
    }
}