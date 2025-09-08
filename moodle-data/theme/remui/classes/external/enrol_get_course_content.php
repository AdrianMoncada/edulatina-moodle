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
 * Get course stats service
 *
 * @package   theme_remui
 * @copyright (c) 2023 WisdmLabs (https://wisdmlabs.com/) <support@wisdmlabs.com>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
namespace theme_remui\external;

defined('MOODLE_INTERNAL') || die;

use external_function_parameters;
use external_value;
use external_single_structure;
use external_multiple_structure;

require_once($CFG->libdir . '/completionlib.php');

/**
 * Get course stats trait
 * @copyright (c) 2022 WisdmLabs (https://wisdmlabs.com/) <support@wisdmlabs.com>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
trait enrol_get_course_content {
    /**
     * Describes the parameters for enrol_get_course_content
     * @return external_function_parameters
     */
    public static function enrol_get_course_content_parameters() {
        return new external_function_parameters(
            array (
                'courseid' => new external_value(PARAM_INT, 'Course Id'),
            )
        );
    }

    /**
     * Save order of sections in array of configuration format
     * @param  int $courseid Course id
     * @return boolean       true
     */
    public static function enrol_get_course_content($courseid) {
        global $PAGE;
        // Validation for context is needed.
        $systemcontext = \context_system::instance();
        self::validate_context($systemcontext);

        $context = \context_course::instance($courseid);
        $course = get_course($courseid);

        // Get sections information.
        $modinfo = get_fast_modinfo($course);
        $sections = $modinfo->get_section_info_all();

        $sectioncount = 0;
        $contentdata = array();
        foreach ($sections as $sectionnum => $section) {
            // Display Sections/Topics even if they are hidden and restricted.

            if ($section->__get('uservisible')) {
                if ($section->__get('availableinfo') || $section->__get('available')) {
                    if ($sectioncount == 0) {
                        $contentdata['sections'][$sectionnum]['sectionactive'] = true;
                    }
                    $contentdata['sections'][$sectionnum]['id'] = $section->__get('id');
                    $contentdata['sections'][$sectionnum]['index'] = $sectioncount;
                    $contentdata['sections'][$sectionnum]['name'] = get_section_name($courseid, $sectionnum);
                    $sectioncount += 1;
                }
            }
        }

        $cms = $modinfo->get_cms();
        foreach ($cms as $key => $cm) {
            if ($cm->__get('deletioninprogress')) {
                continue;
            }
            if (isset($contentdata['sections'][$cm->__get('sectionnum')])) {
                if ($cm->__get('uservisible') || $cm->__get('availableinfo') || $cm->__get('available')) {
                    $activity = [];
                    $activity['name'] = $cm->get_formatted_name();
                    $activity['icon'] = $cm->get_icon_url()->__toString();
                    $activity['modtype'] = $cm->__get('modname');
                    if($cm->__get('modname') == 'subsection'){
                        $activity['delegatesectionid'] = $cm->__get('customdata')['sectionid'];
                    }
                    $contentdata['sections'][$cm->__get('sectionnum')]['activities'][] = $activity;

                    $contentdata['sections'][$cm->__get('sectionnum')]['hasactivity'] = false;
                    if (count($contentdata['sections'][$cm->__get('sectionnum')]['activities']) >= 1) {
                        $contentdata['sections'][$cm->__get('sectionnum')]['hasactivity'] = true;
                    }
                }
            }
        }
        $contentarraymap = [];
        foreach($contentdata['sections'] as $key => $section){

            $contentarraymap[$section['id']] = $key;
        }

        foreach($contentdata['sections'] as &$section ){
            if(isset($section['activities'])){
                foreach($section['activities'] as &$activity){
                    if(isset($activity['delegatesectionid'])){
                        $delegatesection = $contentdata['sections'][$contentarraymap[$activity['delegatesectionid']]];
                        if(isset($delegatesection['activities'])){
                            $delegatesection['inneractivities'] = $delegatesection['activities'];
                            unset($delegatesection['activities']);
                        }
                        $activity['delegatesection'] = $delegatesection;
                        unset($contentdata['sections'][$contentarraymap[$activity['delegatesectionid']]]);
                    }
                }
            }
        }

        return json_encode($contentdata);
    }

    /**
     * Describes the enrol_get_course_content return value
     * @return external_value
     */
    public static function enrol_get_course_content_returns() {
        return new external_value(PARAM_RAW, 'course content data');
    }
}
