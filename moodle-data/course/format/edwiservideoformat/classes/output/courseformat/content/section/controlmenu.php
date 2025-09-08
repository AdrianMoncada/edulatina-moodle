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
 * Section control menu class - Version aware implementation.
 *
 * @package    format_edwiservideoformat
 * @copyright  2024 Edwiser
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

namespace format_edwiservideoformat\output\courseformat\content\section;

use core_courseformat\output\local\content\section\controlmenu as controlmenu_base;
use core\output\action_menu\link_secondary;
use core\output\pix_icon;
use moodle_url;

/**
 * Version-aware control menu class.
 * Uses controlmenuold.php for Moodle 4.5 and below,
 * and modern implementation for Moodle 5.0+.
 *
 * @package    format_edwiservideoformat
 * @copyright  2024 Edwiser
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class controlmenu extends controlmenu_base {

    /** @var \core_courseformat\base the course format class */
    protected $format;

    /** @var \section_info the course section class */
    protected $section;

    /**
     * Constructor - determines which implementation to use based on Moodle version.
     */
    public function __construct($format, $section) {
        global $CFG;

        $this->format = $format;
        $this->section = $section;

        // For Moodle 4.5 and below, use the old implementation
        if ((int)$CFG->branch < 500) {
            // Load the old implementation
            require_once(__DIR__ . '/controlmenuold.php');
            $oldclass = '\\format_edwiservideoformat\\output\\courseformat\\content\\section\\controlmenuold';
            return new $oldclass($format, $section);
        }

        // For Moodle 5.0+, use the modern implementation
        parent::__construct($format, $section);
    }

    /**
     * Generate the edit control items of a section.
     *
     * @return array of edit control items
     */
    public function section_control_items() {
        global $CFG;

        // For Moodle 4.5 and below, delegate to old implementation
        if ((int)$CFG->branch < 500) {
            $oldclass = '\\format_edwiservideoformat\\output\\courseformat\\content\\section\\controlmenuold';
            $oldinstance = new $oldclass($this->format, $this->section);
            return $oldinstance->section_control_items();
        }

        // For Moodle 5.0+, use parent implementation and add highlight functionality
        $parentcontrols = parent::section_control_items();

        if ($this->section->is_orphan() || !$this->section->section) {
            return $parentcontrols;
        }

        $controls = [];
        if (has_capability('moodle/course:setcurrentsection', $this->coursecontext)) {
            $controls['highlight'] = $this->get_highlight_control();
        }

        // If the edit key exists, we are going to insert our controls after it.
        if (array_key_exists("edit", $parentcontrols)) {
            $merged = [];
            // We can't use splice because we are using associative arrays.
            // Step through the array and merge the arrays.
            foreach ($parentcontrols as $key => $action) {
                $merged[$key] = $action;
                if ($key == "edit") {
                    // If we have come to the edit key, merge these controls here.
                    $merged = array_merge($merged, $controls);
                }
            }

            return $merged;
        } else {
            return array_merge($controls, $parentcontrols);
        }
    }

    /**
     * Return the specific section highlight action.
     *
     * @return link_secondary the action element.
     */
    protected function get_highlight_control(): link_secondary {
        $format = $this->format;
        $section = $this->section;
        $course = $format->get_course();
        $sectionreturn = $format->get_sectionnum();

        $highlightoff = get_string('highlightoff');
        $highlightofficon = 'i/marked';

        $highlighton = get_string('highlight');
        $highlightonicon = 'i/marker';

        if ($course->marker == $section->section) {  // Show the "light globe" on/off.
            $action = 'section_unhighlight';
            $icon = $highlightofficon;
            $name = $highlightoff;
            $attributes = [
                'class' => 'editing_highlight',
                'data-action' => 'sectionUnhighlight',
                'data-sectionreturn' => $sectionreturn,
                'data-id' => $section->id,
                'data-icon' => $highlightofficon,
                'data-swapname' => $highlighton,
                'data-swapicon' => $highlightonicon,
            ];
        } else {
            $action = 'section_highlight';
            $icon = $highlightonicon;
            $name = $highlighton;
            $attributes = [
                'class' => 'editing_highlight',
                'data-action' => 'sectionHighlight',
                'data-sectionreturn' => $sectionreturn,
                'data-id' => $section->id,
                'data-icon' => $highlightonicon,
                'data-swapname' => $highlightoff,
                'data-swapicon' => $highlightofficon,
            ];
        }

        $url = $this->format->get_update_url(
            action: $action,
            ids: [$section->id],
            returnurl: $this->baseurl,
        );

        return new link_secondary(
            url: $url,
            icon: new pix_icon($icon, ''),
            text: $name,
            attributes: $attributes,
        );
    }
}