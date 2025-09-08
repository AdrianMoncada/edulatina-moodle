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
 * Contains the default content output class.
 *
 * @package   format_edwiservideoformat
 * @copyright 2024 Edwiser
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

namespace format_edwiservideoformat\output\courseformat;

use core_courseformat\output\local\content as content_base;
use format_edwiservideoformat\utility;
use renderer_base;
use stdClass;

/**
 * Base class to render a course content.
 *
 * @package   format_edwiservideoformat
 * @copyright 2024 Edwiser
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class content extends content_base {

    /**
     * @var bool Edwiser Video format has also add section after each topic.
     */
    protected $hasaddsection = true;

    /**
     * @var int|null The section number to display (null for all sections).
     */
    protected $singlesection = null;

    /**
     * Set the single section to display.
     *
     * @param int $sectionnum The section number to display.
     */
    public function set_single_section(int $sectionnum): void {
        $this->singlesection = $sectionnum;
    }

    /**
     * Get the template name for this output class.
     *
     * @param renderer_base $renderer
     * @return string
     */
    public function get_template_name(\renderer_base $renderer): string {
        // Check if activitytype is set and return appropriate template
        $activitytype = optional_param('modtype', '', PARAM_ALPHA);
        $modid = optional_param('modid', '', PARAM_INT);

        if (!empty($activitytype) && !empty($modid)) {
            return 'format_edwiservideoformat/video_view';
        }
        return 'format_edwiservideoformat/local/content';
    }

    /**
     * Export this data so it can be used as the context for a mustache template (core/inplace_editable).
     *
     * @param renderer_base $output typically, the renderer that's calling this function
     * @return stdClass data context for a mustache template
     */
    public function export_for_template(renderer_base $output) {
        global $PAGE, $CFG;
        // $PAGE->requires->js_call_amd('format_edwiservideoformat/mutations', 'init');
        // $PAGE->requires->js_call_amd('format_edwiservideoformat/section', 'init');

        // Set the section ID for single section display if requested
        if ($this->singlesection !== null) {
            $format = $this->format;
            $modinfo = $format->get_modinfo();
            $sectioninfo = $modinfo->get_section_info($this->singlesection);
            if ($sectioninfo) {
                $format->set_sectionid($sectioninfo->id);
            }
        }

        $activitytype = optional_param('modtype', '', PARAM_ALPHA);
        $modid = optional_param('modid', '', PARAM_INT);
        if (!empty($activitytype) && !empty($modid)) {
            require_once($CFG->dirroot . '/mod/edwiservideoactivity/lib.php');
            $templatecontext = get_edwiservideoactivity_context($modid, $activitytype);
            $templatecontext['showtypeform'] = utility::show_typeform();
            return $templatecontext;
        }

        $data = parent::export_for_template($output);

        // Check if edwiservideoactivity module is installed.
        $data->mod_edwVAct = evf_is_plugin_available("mod_edwiservideoactivity");


        // Get course description
        $course = $this->format->get_course();
        $data->course = utility::get_course_description_data($course);

        // Get secondary navigation
        $navdata = utility::get_secondary_navigation_data($output);
        if ($navdata) {
            $data->moremenu = $navdata->secondarynavigation;
            $data->hasmoremenu = !empty($navdata->secondarynavigation);
        }

        // showcoursedescription setting
        $formatoptions = $this->format->get_format_options();
        $data->showcoursedescription = !empty($formatoptions['showcoursedescription']);

        if (strpos($PAGE->url->get_path(), 'course/section.php')) {
            $data->showcoursedescription = false;
        }
        // Get header context with format object
        $headerdata = utility::get_extra_header_context($course, null, $this->format);
        $data->header = (object) $headerdata;
        $data->turneditingonswitch = $output->page_heading_button();

        if ($CFG->branch > 405) {
            $data->islatest = true;
        }

        $data->licensenotice = utility::show_license_notice();
        $data->showtypeform = utility::show_typeform();

        return $data;
    }

}
