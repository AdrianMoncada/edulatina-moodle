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

use core_courseformat\output\section_renderer;
use moodle_page;

/**
 * Basic renderer for Edwiser Video format.
 *
 * @package    format_edwiservideoformat
 * @copyright  2024 Edwiser
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class renderer extends section_renderer {

    /**
     * Constructor method, calls the parent constructor.
     *
     * @param moodle_page $page
     * @param string $target one of rendering target constants
     */
    public function __construct(moodle_page $page, $target) {
        parent::__construct($page, $target);

        // Since format_edwiservideoformat_renderer::section_edit_control_items() only displays the 'Highlight' control
        // when editing mode is on we need to be sure that the link 'Turn editing mode on' is available for a user
        // who does not have any other managing capability.
        $page->set_other_editing_capability('moodle/course:setcurrentsection');
    }

    /**
     * Generate the section title, wraps it in a link to the section page if page is to be displayed on a separate page.
     *
     * @param section_info|stdClass $section The course_section entry from DB
     * @param stdClass $course The course entry from DB
     * @return string HTML to output.
     */
    public function section_title($section, $course) {
        return $this->render(course_get_format($course)->inplace_editable_render_section_name($section));
    }

    /**
     * Generate the section title to be displayed on the section page, without a link.
     *
     * @param section_info|stdClass $section The course_section entry from DB
     * @param int|stdClass $course The course entry from DB
     * @return string HTML to output.
     */
    public function section_title_without_link($section, $course) {
        return $this->render(course_get_format($course)->inplace_editable_render_section_name($section, false));
    }

    /**
     * Render single section display.
     *
     * @param \format_edwiservideoformat\output\courseformat\content $content The content object
     * @return string HTML to output.
     */
    public function render_single_section(\format_edwiservideoformat\output\courseformat\content $content) {
        $templatecontext = $content->export_for_template($this);
        return $this->render_from_template('format_edwiservideoformat/local/content_single_section', $templatecontext);
    }
    /**
     * Renders HTML to display a control to add a new activity or resource.
     *
     * @param stdClass $course Course object
     * @param int $section Section number
     * @param int|null $sectionreturn The section to return to
     * @param array $displayoptions Additional display options
     * @return string HTML to output.
     */
    public function course_section_add_cm_control($course, $section, $sectionreturn = null, $displayoptions = array()) {
        // Check to see if user can add menus.
        if (!has_capability('moodle/course:manageactivities', \context_course::instance($course->id))
                || !$this->page->user_is_editing()) {
            return '';
        }

        $sectioninfo = get_fast_modinfo($course)->get_section_info($section);

        // Use our custom activity chooser button instead of the core one
        // To use default activity chooser, replace the line below with:
        // $activitychooserbutton = new \core_course\output\activitychooserbutton($sectioninfo, null, $sectionreturn);
        $activitychooserbutton = new \format_edwiservideoformat\output\activitychooserbutton($sectioninfo, null, $sectionreturn);

        return $this->render_from_template(
            'core_courseformat/local/content/divider',
            [
                'content' => $this->render($activitychooserbutton),
                'extraclasses' => 'always-visible my-3',
            ]
        );
    }
}
