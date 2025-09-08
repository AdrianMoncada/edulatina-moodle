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
 * Section class.
 *
 * @package    format_edwiservideoformat
 * @copyright  2024 Edwiser
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

namespace format_edwiservideoformat\output\courseformat\content;

use core_courseformat\base as course_format;
use core\output\renderer_base;
use core_courseformat\output\local\content\section as section_base;
use stdClass;

/**
 * Base class to render a course section.
 *
 * @package   format_topics
 * @copyright 2020 Ferran Recio <ferran@moodle.com>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class section extends section_base {

    /** @var course_format the course format */
    protected $format;

    /**
     * Add the section header to the data structure.
     *
     * This method overrides the parent to ensure singleheader context is generated
     * for all sections when viewing all sections per page.
     *
     * @param stdClass $data the current cm data reference
     * @param \renderer_base $output typically, the renderer that's calling this function
     * @return bool if the cm has name data
     */
    protected function add_header_data(stdClass &$data, \renderer_base $output): bool {
        // Call parent method first to get the standard header logic
        $result = parent::add_header_data($data, $output);

        // If we're on "all sections per page" view (no specific section requested)
        // and this is not section 0, generate singleheader for each section
        global $PAGE;

        if (strpos($PAGE->url->get_path(), 'course/section.php')) {
            // Generate singleheader for this section
            $header = new $this->headerclass($this->format, $this->section);
            $data->singleheader = $header->export_for_template($output);

            $data->singleheader->headerdisplaymultipage = true;
            $data->singleheader->displayonesection = false;
            // Remove the regular header to avoid duplication
            // Only if singleheader was successfully generated
            if (!empty($data->singleheader)) {
                unset($data->header);
            }
        }

        return $result;
    }

    /**
     * Export this data so it can be used as the context for a mustache template.
     *
     * @param \renderer_base $output
     * @return stdClass
     */
    public function export_for_template(\renderer_base $output): stdClass {
        $data = parent::export_for_template($output);

        // Add format-specific data if needed
        if ($this->format && !$this->format->get_sectionnum() && !$this->section->get_component_instance()) {
            $addsectionclass = $this->format->get_output_classname('content\\addsection');
            if (class_exists($addsectionclass)) {
                $addsection = new $addsectionclass($this->format);
                $data->numsections = $addsection->export_for_template($output);
                $data->insertafter = true;
            }
        }

        // Add progress information for the section
        $course = $this->format->get_course();
        $singlepageurl = $this->format->get_view_url($this->section)->out(true);
        $progressinfo = \format_edwiservideoformat\utility::get_section_progress_info(
            $this->section,
            $course,
            $singlepageurl
        );

        $data->progressinfo = $progressinfo['progressinfo'];
        $data->activityinfo = $progressinfo['activityinfo'];
        // Ensure control menu is available in editing mode only
        if ($data->editing && empty($data->controlmenu) && empty($this->hidecontrols)) {
            $controlmenu = new $this->controlmenuclass($this->format, $this->section);
            $data->controlmenu = $controlmenu->export_for_template($output);
        }

        return $data;
    }
}
