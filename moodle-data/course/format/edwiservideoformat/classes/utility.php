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
 * Utility functions for the Edwiser Video format.
 *
 * @package   format_edwiservideoformat
 * @copyright 2024 Edwiser
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

namespace format_edwiservideoformat;

use stdClass;
use renderer_base;

/**
 * Utility class for Edwiser Video format.
 *
 * @package   format_edwiservideoformat
 * @copyright 2024 Edwiser
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class utility {

    /**
     * Get formatted course description data.
     *
     * @param object $course The course object
     * @return stdClass Course data with formatted description
     */
    public static function get_course_description_data($course): stdClass {
        global $CFG;

        $context = \context_course::instance($course->id);
        $coursedata = new stdClass();

        // Get and format the course description
        $coursedata->description = file_rewrite_pluginfile_urls(
            $course->summary,
            'pluginfile.php',
            $context->id,
            'course',
            'summary',
            null
        );

        $coursedata->description = format_text($coursedata->description, $course->summaryformat, [
            'context' => $context,
            'overflowdiv' => true
        ]);

        return $coursedata;
    }

    /**
     * Get secondary navigation data.
     *
     * @param renderer_base $output The renderer
     * @return stdClass|null Navigation data or null if no secondary navigation
     */
    public static function get_secondary_navigation_data(renderer_base $output): ?stdClass {
        global $PAGE;

        $secondarynavigation = false;
        $overflow = '';

        if ($PAGE->has_secondary_navigation()) {
            $tablistnav = $PAGE->has_tablist_secondary_navigation();
            $moremenu = new \core\navigation\output\more_menu($PAGE->secondarynav, 'nav-tabs', true, $tablistnav);
            $secondarynavigation = $moremenu->export_for_template($output);
            $overflowdata = $PAGE->secondarynav->get_overflow_menu_data();
            if (!is_null($overflowdata)) {
                $overflow = $overflowdata->export_for_template($output);
            }
        }

        $navdata = new stdClass();
        $navdata->secondarynavigation = $secondarynavigation;
        $navdata->overflow = $overflow;

        return $navdata;
    }

    /**
     * Get extra header context for edwiservideoformat
     * @param stdClass $course Course object
     * @param string|null $imgurl Course image URL (optional)
     * @param object|null $format Course format object (optional)
     * @return array Header context array
     */
    public static function get_extra_header_context($course, $imgurl = null, $format = null): array {
        global $DB, $CFG, $OUTPUT, $PAGE;

        $coursedetails = get_course($course->id);

        // Calculate progress percentage internally
        $percentage = self::get_course_progress_percentage($course);

        $categorydetails = $DB->get_record('course_categories', array('id' => $coursedetails->category));
        $categoryname = '';
        if ($categorydetails) {
            $categoryname = format_text($categorydetails->name);
        }

        // Get course image - prioritize custom course image if available
        $customcourseimage = '';
        if ($format) {
            $customcourseimage = self::get_custom_course_image($course, $format);
        }

        if (!empty($customcourseimage)) {
            $imgurl = $customcourseimage;
        } else if (is_null($imgurl) || gettype($imgurl) != "object") {
            $imgurl = self::get_course_image($course);
        }

        // Get teachers data
        $teachers = self::get_enrolled_teachers_context($course, true);
        // Get course format settings for header customization
        $headerbgposition = 'center';
        $headerbgsize = 'cover';
        $headeroverlayopacity = 0.7;

        if ($format) {
            $formatoptions = $format->get_format_options();
            $headerbgposition = $formatoptions['edw_format_hd_bgpos'] ?? 'center';
            $headerbgsize = $formatoptions['edw_format_hd_bgsize'] ?? 'cover';

            $overlayopacity = $formatoptions['headeroverlayopacity'] ?? '100';
            if (is_numeric($overlayopacity) && ($overlayopacity <= 100)) {
                $headeroverlayopacity = $overlayopacity / 100;
            }
        }

        $format = \core_courseformat\base::instance($course);
        $renderer = $format->get_renderer($PAGE);
        $bulkbutton = $renderer->bulk_editing_button($format);
        // rating and review data
        $rnrshortdesign = '';
        if (evf_is_plugin_available("block_edwiserratingreview")) {
            $rnr = new \block_edwiserratingreview\ReviewManager();
            $rnrshortdesign = $rnr->get_short_design_enrolmentpage($course->id);
        }

        $header = array(
            'percentage' => $percentage,
            'coursefullname' => format_text($coursedetails->fullname),
            'coursecategoryname' => $categoryname,
            'headercourseimage' => $imgurl,
            'courseheaderdesign' => true,
            'coursecompletionstatus' => $course->enablecompletion,
            'subsectionjs' => false,
            'sectionreturn' => null,
            'teachers' => $teachers,
            'headerbgposition' => $headerbgposition,
            'headerbgsize' => $headerbgsize,
            'headeroverlayopacity' => $headeroverlayopacity,
            'rnrdesign' => $rnrshortdesign,
            'bulkbutton' => $bulkbutton
        );
        // Add resume activity URL if course is not 100% complete
        if ($percentage != 100) {
            $activitydata = self::get_activity_to_resume_or_start($course);
            if (!empty($activitydata->url)) {
                if ($activitydata->type === 'resume') {
                    $header['resumeactivityurl'] = $activitydata->url;
                } else {
                    $header['startactivityurl'] = $activitydata->url;
                }
                // Add activity type for template logic
                $header['activitytype'] = $activitydata->type;
            }
        }

        if ($CFG->branch >= '405') {
            $header['subsectionjs'] = true;
        }

        return $header;
    }

    /**
     * Get course progress percentage
     * @param stdClass $course Course object
     * @return int Progress percentage (0-100)
     */
    public static function get_course_progress_percentage($course): int {
        if (!$course->enablecompletion) {
            return 0;
        }

        $percentage = \core_completion\progress::get_course_progress_percentage($course);
        if (!is_null($percentage)) {
            return floor($percentage);
        }

        return 0;
    }

    /**
     * Get enrolled teachers context for edwiservideoformat
     * @param stdClass $course Course object
     * @param bool $frontlineteacher Whether to get front line teachers
     * @return array Teachers context array
     */
    public static function get_enrolled_teachers_context($course, $frontlineteacher = false): array {
        global $OUTPUT, $CFG, $USER;

        $courseid = $course->id;

        $usergroups = groups_get_user_groups($courseid, $USER->id);

        $groupids = 0;

        if ($course->groupmode == 1) {
            $groupids = $usergroups[0];
        }
        $coursecontext = \context_course::instance($courseid);
        $teachers = get_enrolled_users($coursecontext, 'mod/folder:managefiles', $groupids, '*', 'firstname', $limitfrom = 0, $limitnum = 0, $onlyactive = true);
        $roles = new stdClass();

        $allroles = get_all_roles();
        foreach ($allroles as $singlerole) {
            if ($singlerole->shortname == 'editingteacher') {
                $roles = $singlerole;
                break;
            }
        }
        if (!isset($roles)) {
            $roles->id = "";
        }

        $context = array();

        if ($teachers) {
            $namescount = 4;
            $profilecount = 0;
            foreach ($teachers as $key => $teacher) {
                if ($frontlineteacher && $profilecount < $namescount) {
                    $instructor = array();
                    $instructor['id'] = $teacher->id;
                    $instructor['name'] = fullname($teacher, true);
                    $instructor['avatars'] = $OUTPUT->user_picture($teacher);
                    $instructor['teacherprofileurl'] = $CFG->wwwroot.'/user/profile.php?id='.$teacher->id;
                    if ($profilecount != 0) {
                        $instructor['hasanother'] = true;
                    }
                    $context['instructors'][] = $instructor;
                }
                $profilecount++;
            }
            if ($profilecount > $namescount) {
                $context['teachercount'] = $profilecount - $namescount;
            }
            $context['participantspageurl'] = $CFG->wwwroot.'/user/index.php?id='.$courseid.'&roleid='.$roles->id;
            $context['hasteachers'] = true;
        }
        return $context;
    }

    /**
     * Get course image for edwiservideoformat
     * @param stdClass $course Course object
     * @return string Course image URL
     */
    public static function get_course_image($course): string {
        global $CFG, $OUTPUT;

        try {
            $corecourselistelement = new \core_course_list_element($course);

            // Course image.
            foreach ($corecourselistelement->get_course_overviewfiles() as $file) {
                $isimage = $file->is_valid_image();
                $courseimage = file_encode_url(
                    "$CFG->wwwroot/pluginfile.php",
                    '/'. $file->get_contextid(). '/'. $file->get_component(). '/'.
                    $file->get_filearea(). $file->get_filepath(). $file->get_filename(),
                    !$isimage
                );
                if ($isimage) {
                    return $courseimage;
                }
            }
        } catch (Exception $e) {
            // If there's an error, fall back to generated image
        }

        // Return generated image if no course image found
        return $OUTPUT->get_generated_image_for_id($course->id);
    }

    /**
     * Get last viewed activity from logstore_standard_log.
     *
     * @param stdClass $course Course object
     * @return object|false False if last viewed activity does not exist else activity object
     */
    public static function get_activity_to_resume_from_log($course) {
        global $USER, $DB;

        $lastviewed = $DB->get_records('logstore_standard_log',
            array('action' => 'viewed',
                'target' => 'course_module',
                'crud' => 'r',
                'userid' => $USER->id,
                'courseid' => $course->id,
                'origin' => 'web'
            ),
            'timecreated desc',
            '*',
            0,
            1
        );

        if (empty($lastviewed)) {
            return false;
        }

        return (object)['cm' => end($lastviewed)->contextinstanceid];
    }

    /**
     * Get the activity URL to resume from or start with.
     *
     * @param stdClass $course Course object
     * @return stdClass Object with 'url' and 'type' properties ('resume' or 'start')
     */
    public static function get_activity_to_resume_or_start($course): stdClass {
        global $USER, $DB, $CFG;
        $result = new stdClass();
        $result->url = '';
        $result->type = '';

        // For edwiservideoformat, we'll use the logstore_standard_log approach
        // since we don't have a custom course_visits table like remuiformat
        $lastviewed = self::get_activity_to_resume_from_log($course);
        if ($lastviewed === false) {
            // If no last viewed activity found, return the first activity URL
            // assuming the course hasn't been started yet
            $result->url = self::get_first_activity_url($course);
            $result->type = 'start';
            return $result;
        }

        // Get all activities
        $modinfo = get_fast_modinfo($course);

        // Check if activity record exists
        if (isset($modinfo->cms[$lastviewed->cm])) {
            $mod = $modinfo->cms[$lastviewed->cm];
        } else {
            return $result;
        }

        // Check if activity url is set
        if (empty($mod->url)) {
            return $result;
        }

        $result->url = $CFG->wwwroot .'/course/view.php?id='.$course->id.'&modtype='. $mod->modname .'&modid='. $mod->id;
        $result->type = 'resume';
        return $result;
    }

    /**
     * Get the activity URL to resume from.
     *
     * @param stdClass $course Course object
     * @return string Activity URL or empty string if not found
     */
    public static function get_activity_to_resume($course): string {
        $activitydata = self::get_activity_to_resume_or_start($course);
        return $activitydata->url;
    }

    /**
     * Get the URL of the first activity in the course.
     *
     * @param stdClass $course Course object
     * @return string First activity URL or empty string if not found
     */
    public static function get_first_activity_url($course): string {
        global $CFG;

        $modinfo = get_fast_modinfo($course);

        // Find the first visible activity in the course
        foreach ($modinfo->sections as $sectionnum => $section) {
            foreach ($section as $cmid) {
                $mod = $modinfo->cms[$cmid];

                // Skip labels and non-visible activities
                if ($mod->modname == 'label' || !$mod->uservisible) {
                    continue;
                }

                // Check if activity has a URL
                if (!empty($mod->url)) {
                    return $CFG->wwwroot .'/course/view.php?id='.$course->id.'&modtype='. $mod->modname .'&modid='. $mod->id;
                }
            }
        }

        return '';
    }

    /**
     * Get custom course image from format settings
     * @param stdClass $course Course object
     * @param object $format Course format object
     * @return string Image URL
     */
    public static function get_custom_course_image($course, $format): string {
        global $CFG;

        $context = \context_course::instance($course->id);
        $formatoptions = $format->get_format_options();

        if (!empty($formatoptions['edwiservideoformat_courseimage_filemanager'])) {
            $fs = get_file_storage();
            $itemid = $formatoptions['edwiservideoformat_courseimage_filemanager'];
            $files = $fs->get_area_files($context->id, 'format_edwiservideoformat', 'edwiservideoformat_courseimage_filearea', $itemid, 'sortorder', false);

            if (!empty($files)) {
                $file = reset($files);
                return \moodle_url::make_pluginfile_url(
                    $file->get_contextid(),
                    $file->get_component(),
                    $file->get_filearea(),
                    $file->get_itemid(),
                    $file->get_filepath(),
                    $file->get_filename()
                )->out();
            }
        }

        return '';
    }

    /**
     * Get section progress information
     * @param stdClass $section Section object
     * @param stdClass $course Course object
     * @param string $singlepageurl URL for the section page
     * @return array Progress information array
     */
    public static function get_section_progress_info($section, $course, $singlepageurl = ''): array {
        global $USER;

        $modinfo = get_fast_modinfo($course);
        $output = array(
            "activityinfo" => array(),
            "progressinfo" => array(),
        );

        if (empty($modinfo->sections[$section->section])) {
            return $output;
        }

        // Generate array with count of activities in this section.
        $sectionmods = array();
        $total = 0;
        $complete = 0;
        $cancomplete = isloggedin() && !isguestuser();
        $completioninfo = new \completion_info($course);

        foreach ($modinfo->sections[$section->section] as $cmid) {
            $thismod = $modinfo->cms[$cmid];
            if ($thismod->modname == 'label') {
                // Labels are special (not interesting for students)!
                continue;
            }

            if ($thismod->uservisible) {
                if (isset($sectionmods[$thismod->modname])) {
                    $sectionmods[$thismod->modname]['name'] = $thismod->modplural;
                    $sectionmods[$thismod->modname]['count']++;
                } else {
                    $sectionmods[$thismod->modname]['name'] = $thismod->modfullname;
                    $sectionmods[$thismod->modname]['count'] = 1;
                }
                if ($cancomplete && $completioninfo->is_enabled($thismod) != COMPLETION_TRACKING_NONE) {
                    $total++;
                    $completiondata = $completioninfo->get_data($thismod, true);
                    if ($completiondata->completionstate == COMPLETION_COMPLETE ||
                            $completiondata->completionstate == COMPLETION_COMPLETE_PASS) {
                        $complete++;
                    }
                }
            }
        }

        $lastactivitydata = end($sectionmods);
        foreach ($sectionmods as $mod) {
            if ($lastactivitydata != $mod) {
                $output['activityinfo'][] = $mod['count'].' '.$mod['name'].',';
            } else {
                $output['activityinfo'][] = $mod['count'].' '.$mod['name'].'.';
            }
        }

        if ($total > 0) {
            $pinfo = new \stdClass();
            $pinfo->percentage = round(($complete / $total) * 100, 0);
            $pinfo->completed = ($complete == $total) ? "completed" : "";

            if ($pinfo->percentage == 0) {
                $pinfo->progress = '<a class="btn btn-primary w-100" href=' . $singlepageurl .'>' .
                get_string('activitystart', 'format_edwiservideoformat') . '</a>';
            } else if ($pinfo->percentage > 0 && $pinfo->percentage < 50) {
                if ($total == 1) {
                    $status = get_string('activitycompleted', 'format_edwiservideoformat');
                } else {
                    $status = get_string('activitiescompleted', 'format_edwiservideoformat');
                }
                $pinfo->progress = '<a href=' . $singlepageurl . '>' . $complete . ' '
                                    . get_string('outof', 'format_edwiservideoformat') . ' '
                                    . $total . ' ' . $status . '</a>';
            } else if ($pinfo->percentage >= 50 && $pinfo->percentage < 100) {
                $remaining = $total - $complete;
                if ($remaining == 1) {
                    $status = get_string('activityremaining', 'format_edwiservideoformat');
                } else {
                    $status = get_string('activitiesremaining', 'format_edwiservideoformat');
                }
                $pinfo->progress = '<a href=' . $singlepageurl . '>' . $remaining . ' ' . $status . '</a>';
            } else if ($pinfo->percentage == 100) {
                $pinfo->progress = get_string('allactivitiescompleted', 'format_edwiservideoformat');
            }

            if ($pinfo->percentage == 0) {
                $pinfo->percentage = false;
            }
            $output['progressinfo'][] = $pinfo;
        }

        return $output;
    }

    /**
     * Check if the plugin license is valid
     * @return bool True if license is valid, false otherwise
     */
    public static function is_license_valid(): bool {
        global $CFG;

        // Include the license controller if not already included
        if (!class_exists('\format_edwiservideoformat\edwiservideoformat_license_controller')) {
            require_once($CFG->dirroot . '/course/format/edwiservideoformat/classes/license_controller.php');
        }

        try {
            $license_controller = new \format_edwiservideoformat\edwiservideoformat_license_controller();
            $license_data = $license_controller->get_data_from_db();

            // License is considered valid if it's 'available' (valid or expired)
            return ($license_data === 'available');
        } catch (\Exception $e) {
            // If there's any error, assume license is invalid
            return false;
        }
    }

    /**
     * Get license status for display purposes
     * @return string License status message
     */
    public static function get_license_status_message(): string {
        if (self::is_license_valid()) {
            return get_string('licensevalid', 'format_edwiservideoformat');
        } else {
            return get_string('licenseinvalid', 'format_edwiservideoformat');
        }
    }

    /**
     * Check if license check should be enforced
     * This can be used to conditionally enable/disable features based on license
     * @return bool True if license check should be enforced
     */
    public static function should_enforce_license(): bool {
        // For development/testing, you might want to disable license enforcement
        // You can add a config setting here if needed
        return true;
    }

        /**
     * Show license notice - only shows when license is not active
     * @return string HTML content for license notice
     */
    public static function show_license_notice(): string {
        global $CFG;

        // Include the license controller if not already included
        if (!class_exists('\format_edwiservideoformat\edwiservideoformat_license_controller')) {
            require_once($CFG->dirroot . '/course/format/edwiservideoformat/classes/license_controller.php');
        }

        try {
            // Get license data from license controller
            $lcontroller = new \format_edwiservideoformat\edwiservideoformat_license_controller();
            $getlidatafromdb = $lcontroller->get_data_from_db();

            // Only show notice if license is not active
            if (isloggedin() && !isguestuser() && 'available' != $getlidatafromdb) {
                $classes = ['alert', 'text-center', 'evf-license-notice', 'alert-dismissible', 'evf-site-announcement', 'mb-0', 'alert-danger'];

                $url = new \moodle_url('/admin/settings.php', array('section' => 'formatsettingedwiservideoformat'));
                $content = get_string('licenseactivationrequired', 'format_edwiservideoformat', $url->out());

                $content .= '<button type="button" id="dismiss_announcement" class="close" data-bs-dismiss="alert" data-dismiss="alert" aria-hidden="true"><span class="fa fa-close large"></span></button>';
                return \html_writer::tag('div', $content, array('class' => implode(' ', $classes)));
            }
        } catch (\Exception $e) {
            // If there's any error, don't show the notice
            return '';
        }

        return '';
    }



    public static function show_typeform(): bool {
        $typeformcollected = get_user_preferences('typeformcollected');

        $issiteadmin = is_siteadmin();
        $showtypeform = false;

        // Check if 48 hours have passed since plugin installation
        $installtime = get_config('format_edwiservideoformat', 'typeform_install_time');
        $currenttime = time();
        $fortyeighthours = 48 * 60 * 60; // 48 hours in seconds
        // $fortyeighthours = 5 * 60 ;
        $timepassed = ($currenttime - $installtime) >= $fortyeighthours;


        if($issiteadmin && !$typeformcollected && $timepassed){
            $showtypeform = true;
        }
        return $showtypeform;
    }
}
