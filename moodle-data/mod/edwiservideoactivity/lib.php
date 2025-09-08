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
 * Library of functions and constants for module edwiservideoactivity
 *
 * @package   mod_edwiservideoactivity
 * @copyright 2024 Edwiser
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

use mod_edwiservideoactivity\videoactivity;
use core_course\output\activity_completion;
use core_completion\cm_completion_details;
use core_courseformat\output\local\content\cm\controlmenu;

/**
 * List of features supported in Edwiser Video Activity module
 * @param string $feature FEATURE_xx constant for requested feature
 * @return mixed True if module supports feature, false if not, null if doesn't know
 */
function edwiservideoactivity_supports($feature) {
    switch($feature) {
        case FEATURE_MOD_ARCHETYPE:
            return MOD_ARCHETYPE_OTHER;
        case FEATURE_GROUPS:
            return false;
        case FEATURE_GROUPINGS:
            return false;
        case FEATURE_MOD_INTRO:
            return true;
        case FEATURE_COMPLETION_TRACKS_VIEWS:
            return true;
        case FEATURE_COMPLETION_HAS_RULES:
            return true;
        case FEATURE_GRADE_HAS_GRADE:
            return false;
        case FEATURE_GRADE_OUTCOMES:
            return false;
        case FEATURE_BACKUP_MOODLE2:
            return true;
        case FEATURE_SHOW_DESCRIPTION:
            return true;
        default:
            return null;
    }
}

/**
 * Add edwiservideoactivity instance.
 * @param stdClass $edwiservideoactivity
 * @return int new edwiservideoactivity instance id
 */
function edwiservideoactivity_add_instance($data, $mform)
{
    global $DB;

    $data->timecreated  = time();
    $data->timemodified = $data->timecreated;

    $data = setformData($data);

    // Insert clean data into DB.
    $data->id = $DB->insert_record('edwiservideoactivity', $data);

    edwiservideoactivity_save_files($data, $mform);

    return $data->id;
}

/**
 * Update edwiservideoactivity instance.
 * @param stdClass $edwiservideoactivity
 * @return bool true
 */
function edwiservideoactivity_update_instance($data, $mform)
{
    global $DB;

    $data->timemodified = time();
    $data->id           = $data->instance;

    $data = setformData($data);

    // Update the record.
    $DB->update_record('edwiservideoactivity', $data);

    edwiservideoactivity_save_files($data, $mform);

    return true;
}

/**
 * Delete edwiservideoactivity instance.
 * @param int $id
 * @return bool true
 */
function edwiservideoactivity_delete_instance($id)
{
    global $DB;

    if (! $edwiservideoactivity = $DB->get_record('edwiservideoactivity', ['id' => $id])) {
        return false;
    }

    // Fetch the course module (cm) from the instance.
    $cm      = get_coursemodule_from_instance('edwiservideoactivity', $edwiservideoactivity->id, $edwiservideoactivity->course);
    $context = context_module::instance($cm->id);

    // Delete all file areas associated with this activity.
    $fs = get_file_storage();
    foreach (['mediafile', 'resources', 'transcript', 'intro'] as $area) {
        $fs->delete_area_files($context->id, 'mod_edwiservideoactivity', $area);
    }

    // Delete DB record.
    $DB->delete_records('edwiservideoactivity', ['id' => $edwiservideoactivity->id]);

    return true;
}

/**
 * Return a small object with summary information about what a
 * user has done with a given particular instance of this module
 * Used for user activity reports.
 * @param stdClass $course
 * @param stdClass $user
 * @param stdClass $mod
 * @param stdClass $edwiservideoactivity
 * @return stdClass|null
 */
function edwiservideoactivity_user_outline($course, $user, $mod, $edwiservideoactivity) {
    global $DB;

    if ($logs = $DB->get_records('log', array('userid' => $user->id, 'module' => 'edwiservideoactivity',
            'action' => 'view', 'info' => $edwiservideoactivity->id), 'time ASC')) {

        $numviews = count($logs);
        $lastlog = array_pop($logs);

        $result = new stdClass();
        $result->info = get_string('numviews', '', $numviews);
        $result->time = $lastlog->time;

        return $result;
    }
    return null;
}

/**
 * Print a detailed representation of what a user has done with
 * a given particular instance of this module, for user activity reports.
 * @param stdClass $course
 * @param stdClass $user
 * @param stdClass $mod
 * @param stdClass $edwiservideoactivity
 * @return bool
 */
function edwiservideoactivity_user_complete($course, $user, $mod, $edwiservideoactivity) {
    global $DB;

    if ($logs = $DB->get_records('log', array('userid' => $user->id, 'module' => 'edwiservideoactivity',
            'action' => 'view', 'info' => $edwiservideoactivity->id), 'time ASC')) {
        $numviews = count($logs);
        $lastlog = array_pop($logs);

        $strmostrecently = get_string('mostrecently');
        $strnumviews = get_string('numviews', '', $numviews);

        echo "$strnumviews - $strmostrecently ".userdate($lastlog->time);

    } else {
        print_string('neverseen', 'edwiservideoactivity');
    }
}

function edwiservideoactivity_save_files($data, $mform)
{
    global $DB;

    $context = context_module::instance($data->coursemodule);

    // Handle media source logic.
    if (! empty($data->mediasource) && $data->mediasource === 'upload') {
        // Save media file (if uploaded).
        if (! empty($data->mediafile)) {
            file_save_draft_area_files(
                $data->mediafile,
                $context->id,
                'mod_edwiservideoactivity',
                'mediafile',
                0,
                ['subdirs' => 0]
            );

            // Save file path for uploaded file.
            $fs    = get_file_storage();
            $files = $fs->get_area_files($context->id, 'mod_edwiservideoactivity', 'mediafile', 0, 'itemid, filepath, filename', false);
            if ($files) {
                $file      = reset($files);
                $sourceurl = moodle_url::make_pluginfile_url(
                    $context->id,
                    'mod_edwiservideoactivity',
                    'mediafile',
                    0,
                    $file->get_filepath(),
                    $file->get_filename()
                );
                $data->sourcepath = $sourceurl->out(false);

                $DB->set_field('edwiservideoactivity', 'sourcepath', $data->sourcepath, ['id' => $data->id]);
            }
        }
    }

    // Save intro editor files.
    if (! empty($data->introeditor['itemid']) && is_numeric($data->introeditor['itemid'])) {
        file_save_draft_area_files(
            $data->introeditor['itemid'],
            $context->id,
            'mod_edwiservideoactivity',
            'intro',
            0,
            ['subdirs' => 0]
        );
    }

    // Save resources.
    if (! empty($data->resources)) {
        file_save_draft_area_files(
            $data->resources,
            $context->id,
            'mod_edwiservideoactivity',
            'resources',
            0,
            ['subdirs' => 0]
        );
    }

    // Save transcript.
    if (! empty($data->transcript)) {
        file_save_draft_area_files(
            $data->transcript,
            $context->id,
            'mod_edwiservideoactivity',
            'transcript',
            0,
            ['subdirs' => 0]
        );
    }

    // data availablility flags
    $draftinfo = file_get_draft_area_info($data->resources);
    if ($draftinfo['filecount'] == 0) {
       $DB->set_field('edwiservideoactivity', 'hasresources', 0, ['id' => $data->id]);
    }

    $draftinfo = file_get_draft_area_info($data->transcript);
    if ($draftinfo['filecount'] == 0) {
       $DB->set_field('edwiservideoactivity', 'hastranscript', 0, ['id' => $data->id]);
    }
}

function edwiservideoactivity_pluginfile($course, $cm, $context, $filearea, $args, $forcedownload, array $options = [])
{
    global $DB;

    // Ensure the context is at the module level.
    if ($context->contextlevel !== CONTEXT_MODULE) {
        return false;
    }

    // Require course login and check capabilities.
    require_course_login($course, true, $cm);

    if (! has_capability('mod/edwiservideoactivity:view', $context)) {
        return false;
    }

    // Handle intro separately — Moodle will take care of it.
    $validfileareas = ['mediafile', 'resources', 'transcript'];
    if (! in_array($filearea, $validfileareas)) {
        return false;
    }

    // Remove the "revision" parameter to avoid caching issues.
    array_shift($args);

    // Reconstruct the file path.
    $relativepath = implode('/', $args);
    $fullpath     = "/$context->id/mod_edwiservideoactivity/$filearea/0/$relativepath";

    $fs   = get_file_storage();
    $file = $fs->get_file_by_hash(sha1($fullpath));

    if (! $file || $file->is_directory()) {
        return false;
    }

    // Set security headers for inline preview if needed.
    if (! $forcedownload) {
        header("Content-Security-Policy: default-src 'none'; img-src 'self'; media-src 'self'");
    }

    // Serve the file.
    send_stored_file($file, 0, 0, $forcedownload, $options);
}

function setformData($data) {
    // Set media source.
    if($data->mediasource === 'upload') {
        $data->sourcetype = 1;
        $data->sourcepath = '';
    }
    else if($data->mediasource === 'url') {
        $data->sourcetype = 2;
        $data->sourcepath = $data->mediaurl;
    }
    else {
        $data->sourcetype = 3;
        preg_match('/src="([^"]+)"/', $data->embedcode, $matches);
        if (! empty($matches[1])) {
            $srcUrl           = $matches[1];
            $data->sourcepath = $srcUrl;
        }
    }

    // Set flags.
    $data->hasresources  = ! empty($data->resources) ? 1 : 0;
    $data->hastranscript = ! empty($data->transcript) ? 1 : 0;

    return $data;
}

/**
 * Check if a video URL is embedded using pattern matching
 *
 * @param string $url The video URL to check
 * @return bool True if the URL is embedded, false if it's a direct video file
 */
function is_embedded_video_url($url) {
    if (empty($url)) {
        return false;
    }

    // Check for direct video file extensions
    $videoExtensions = ['mp4', 'avi', 'mov', 'wmv', 'flv', 'webm', 'mkv', 'm4v', '3gp', 'ogv','ts'];
    $isDirectVideo = preg_match('/\.(' . implode('|', $videoExtensions) . ')(\?|$)/i', $url);

    // If URL has video extension, it's not embedded; otherwise, it's embedded
    return !$isDirectVideo;
}

/**
 * Get availability information for a course module
 *
 * @param stdClass $course Course object
 * @param cm_info $cm Course module info
 * @param \renderer_base $output Renderer object
 * @return array Availability information array
 */
function get_edwiservideoactivity_availability_info($course, $cm, $output) {
    global $CFG;

    if (empty($CFG->enableavailability)) {
        return ['hasavailability' => false];
    }

    $availabilityinfo = [];
    $hasavailability = false;

    // Check if user can view hidden activities
    $canviewhidden = has_capability('moodle/course:viewhiddenactivities', $cm->context);

    if (!$cm->uservisible) {
        // User cannot see the module but might be allowed to see availability info
        if (!empty($cm->availableinfo)) {
            $hasavailability = true;
            $availabilityinfo[] = (object) [
                'text' => \core_availability\info::format_info($cm->availableinfo, $course),
                'isrestricted' => 1,
                'isfullinfo' => 0,
                'classes' => 'isrestricted'
            ];
        }
    } else if ($canviewhidden) {
        // Teacher/editor can see all restrictions
        $ci = new \core_availability\info_module($cm);
        $fullinfo = $ci->get_full_information();
        if ($fullinfo) {
            $hasavailability = true;
            $classes = 'isrestricted isfullinfo';
            if (!$cm->visible) {
                $classes .= ' hide';
            }
            $availabilityinfo[] = (object) [
                'text' => \core_availability\info::format_info($fullinfo, $course),
                'isrestricted' => 1,
                'isfullinfo' => 1,
                'classes' => $classes
            ];
        }
    }

    return [
        'hasavailability' => $hasavailability,
        'info' => $availabilityinfo
    ];
}

function get_edwiservideoactivity_context($id, $activitytype='edwiservideoactivity')
{
    global $DB, $PAGE, $OUTPUT, $USER, $CFG;

    // Validate the $id parameter
    if (empty($id) || !is_numeric($id) || $id <= 0) {
        // Return empty context if invalid ID
        return [];
    }

    if ( $activitytype != 'edwiservideoactivity') {

        $cm = get_coursemodule_from_id($activitytype, $id, 0, false, MUST_EXIST);

        // Use the modname to get the instance from the correct table
        $instance = $DB->get_record($cm->modname, ['id' => $cm->instance], '*', MUST_EXIST);
        $course   = $DB->get_record('course', ['id' => $cm->course], '*', MUST_EXIST);
        $category = $DB->get_record('course_categories', ['id' => $course->category], '*', MUST_EXIST);
        require_login($course, true, $cm);
        $context = context_module::instance($cm->id);

        //section name and menu
        $modinfo     = get_fast_modinfo($course);
        $mod = $modinfo->get_cm($cm->id);
        $sectioninfo = $modinfo->get_section_info_by_id($cm->section);
        $sectionname = strtoupper(get_section_name($course, $sectioninfo));

        //next and prev btn
        $navbtn = get_next_prevbtn($course, $cm);

        // Get availability information
        $availabilityinfo = get_edwiservideoactivity_availability_info($course, $mod, $OUTPUT);

        $hasresources = false;
        $hastranscript = false;

         $templatecontext = [
            'title'             => $mod->name,
            'sectionname'       => $sectionname,
            'intro'             => format_text($instance->intro, $instance->introformat, ['context' => $context]),
            'completionbutton'  => get_completion_button($course, $cm),
            'completionpercent' => get_section_completionpercent($course, $cm)['completionpercent'],
            'hasresources'      => $hasresources,
            'hastranscript'     => $hastranscript,
            'hasprogressinfo'   => get_section_completionpercent($course, $cm)['hasprogressinfo'],
            'activitymenu'       => get_cm_activity_menu($course, $sectioninfo, $cm),
            'customprevurl'     => $navbtn['prevurl'],
            'customnexturl'     => $navbtn['nexturl'],
            'isedwiservideoactivity' => false,
            'quizurl' => $mod->url->out(),
            'coursedata' => [
                'coursename' => $course->fullname,
                'courseurl'  => $CFG->wwwroot . '/course/view.php?id=' . $course->id,
            ],
            'categorydata' => [
                'coursecategory' => $category->name,
                'categoryurl'  => $CFG->wwwroot . '/course/index.php?categoryid=' . $category->id,
            ],
            'courseprogress' => get_course_progress_percentage($course),
            'make_transcript_active' => empty($overview['intro']) && !($hasresources),
            'showtabs' => $hasresources || $hastranscript || !empty($instance->intro),
            'iconurl' => $OUTPUT->image_url('icon', 'mod_' . $cm->modname)->out(),
            'isquiz' => ($activitytype == 'quiz'),
            'isedwiservideoformat' => ($course->format === 'edwiservideoformat'),
            'isediting' => $PAGE->user_is_editing(),
        ];

        // Merge availability information
        $templatecontext = array_merge($templatecontext, $availabilityinfo);
    } else {
        // Get course module, course, and activity record.
        $cm                   = get_coursemodule_from_id('edwiservideoactivity', $id, 0, false, MUST_EXIST);
        $course               = $DB->get_record('course', ['id' => $cm->course], '*', MUST_EXIST);
        $category = $DB->get_record('course_categories', ['id' => $course->category], '*', MUST_EXIST);
        $edwiservideoactivity = $DB->get_record('edwiservideoactivity', ['id' => $cm->instance], '*', MUST_EXIST);

        // User login and capability checks.
        require_login($course, true, $cm);
        $context = context_module::instance($cm->id);

        // Trigger module viewed event.
        $event = \mod_edwiservideoactivity\event\course_module_viewed::create([
            'objectid' => $edwiservideoactivity->id,
            'context'  => $context,
        ]);
        $event->add_record_snapshot('course', $course);
        $event->add_record_snapshot('edwiservideoactivity', $edwiservideoactivity);
        $event->trigger();

        // Mark activity as viewed (completion tracking).
        // $completion = new completion_info($course);
        // $completion->set_module_viewed($cm);

        // Setup page.
        $PAGE->set_url('/mod/edwiservideoactivity/view.php', ['id' => $cm->id]);
        $PAGE->set_title(format_string($edwiservideoactivity->name));
        $PAGE->set_heading(format_string($course->fullname));
        $PAGE->set_context($context);
        $PAGE->set_pagelayout('incourse');

        // Instantiate the videoactivity helper class.
        $activity   = new videoactivity($cm->instance);
        $media      = $activity->get_media_data();
        $name       = $activity->get_name();
        $overview   = $activity->get_overview_data();
        $resources  = $activity->get_resource_context();
        $transcript = $activity->get_transcript_context();

        // get section name
        $modinfo     = get_fast_modinfo($course);
        $mod = $modinfo->get_cm($cm->id);
        $sectioninfo = $modinfo->get_section_info_by_id($cm->section);
        $sectionname = strtoupper(get_section_name($course, $sectioninfo));

        // Load transcript text from file.
        $transcripttext = '';
        if (isset($transcript['transcript']) && pathinfo($transcript['transcript']['filename'], PATHINFO_EXTENSION) === 'txt') {
            $transcripttext = nl2br(s($transcript['transcript']['content']));
        }

        //next and prev btn
        $navbtn = get_next_prevbtn($course, $cm);

        // Get availability information
        $availabilityinfo = get_edwiservideoactivity_availability_info($course, $mod, $OUTPUT);

        $hasresources = false;
        $hastranscript = false;

        // Context for Mustache template.
        $templatecontext = [
            'title'             => $name,
            'sectionname'       => $sectionname,
            'sourcepath'        => $media['sourcepath'],
            'isembeded'         => ($media['sourcetype'] == 3 || ($media['sourcetype'] == 2 && isset($media['sourcepath']) && is_embedded_video_url($media['sourcepath']))),
            'intro'             => format_text($overview['intro'], $overview['introformat'], ['context' => $context]),
            'resources'         => $resources['resources'],
            'transcripttext'    => $transcripttext,
            'completionbutton'  => get_completion_button($course, $cm),
            'completionpercent' => get_section_completionpercent($course, $cm)['completionpercent'],
            'hasresources'      => ($activity->has_resources() == 1),
            'hastranscript'     => ($activity->has_transcript() == 1),
            'hasprogressinfo'   => get_section_completionpercent($course, $cm)['hasprogressinfo'],
            'activitymenu'       => get_cm_activity_menu($course, $sectioninfo, $cm),
            'customprevurl'     => $navbtn['prevurl'],
            'customnexturl'     => $navbtn['nexturl'],
            'isedwiservideoactivity' => true,
            'coursedata' => [
                'coursename' => $course->fullname,
                'courseurl'  => $CFG->wwwroot . '/course/view.php?id=' . $course->id,
            ],
            'categorydata' => [
                'coursecategory' => $category->name,
                'categoryurl'  => $CFG->wwwroot . '/course/index.php?categoryid=' . $category->id,
            ],
            'courseprogress'    => get_course_progress_percentage($course),
            'make_transcript_active' => empty($overview['intro']) && !($activity->has_resources() == 1),
            'showtabs' => ($activity->has_resources() == 1) || ($activity->has_transcript() == 1) || !empty($overview['intro']),
            'isedwiservideoformat' => ($course->format === 'edwiservideoformat'),
            'isediting' => $PAGE->user_is_editing(),
        ];

        // Merge availability information
        $templatecontext = array_merge($templatecontext, $availabilityinfo);
    }
    return $templatecontext;
}

function get_next_prevbtn($course, $cm) {
    global $CFG;
    $modinfo = get_fast_modinfo($course);
    $cms     = $modinfo->cms;
    $cmsList = array_values(array_filter($cms, function ($cm) {
        return $cm->uservisible && $cm->has_view();
    }));
    $index   = array_search($cm->id, array_column($cmsList, 'id'));
    $prevurl = $nexturl = null;
    if ($index !== false) {
        if (! empty($cmsList[$index - 1])) {
            $prevcm  = $cmsList[$index - 1];
            $prevurl = $CFG->wwwroot . '/course/view.php?id=' . $course->id .
            '&modtype=' . $prevcm->modname .
            '&modid=' . $prevcm->id;
        }
        if (! empty($cmsList[$index + 1])) {
            $nextcm  = $cmsList[$index + 1];
            $nexturl = $CFG->wwwroot . '/course/view.php?id=' . $course->id .
            '&modtype=' . $nextcm->modname .
            '&modid=' . $nextcm->id;
        }
    }
    return [
        'prevurl' => $prevurl,
        'nexturl' => $nexturl,
    ];
}

function get_completion_button($course, $cm) {
    global $USER, $PAGE, $OUTPUT;
    $modinfo              = get_fast_modinfo($course);
    $mod                  = $modinfo->get_cm($cm->id);
    $cmcompletion         = cm_completion_details::get_instance($mod, $USER->id);
    $completion           = new activity_completion($mod, $cmcompletion);
    $renderer             = $PAGE->get_renderer('core_course');
    $completiondata       = $completion->export_for_template($renderer);
    $completionbuttonhtml = $OUTPUT->render_from_template('mod_edwiservideoactivity/core_course/activity_info', $completiondata);
    return $completionbuttonhtml;
}

function get_section_completionpercent($course, $cm) {
    global $USER;
    $modinfo = get_fast_modinfo($course);
    $mod = $modinfo->get_cm($cm->id);
    $sectionnumber = $mod->sectionnum;
    $completioninfo = new completion_info($course);
    $sectionmods    = $modinfo->get_sections()[$sectionnumber] ?? [];
    $total     = 0;
    $completed = 0;
    foreach ($sectionmods as $modid) {
        $modcm = $modinfo->get_cm($modid);
        if (! $modcm->uservisible || ! $modcm->completion) {
            continue;
        }
        $total++;
        $cdata = $completioninfo->get_data($modcm, false, $USER->id);
        if (! empty($cdata->completionstate)) {
            $completed++;
        }
    }
    $hasprogressinfo   = $total > 0;
    $completionpercent = $total > 0 ? round(($completed / $total) * 100) : 0;
    return [
        'hasprogressinfo' => $hasprogressinfo,
        'completionpercent' => $completionpercent,
    ];
}

function get_course_progress_percentage($course) {
    if (!$course->enablecompletion) {
        return 0;
    }
    $percentage = \core_completion\progress::get_course_progress_percentage($course);
    if (!is_null($percentage)) {
        return floor($percentage);
    }
    return 0;
}

function get_cm_activity_menu($course, $sectioninfo, $cm) {
    global $PAGE;
    $modinfo = get_fast_modinfo($course);
    $mod = $modinfo->get_cm($cm->id);
    $format = course_get_format($course);
    $renderer = $format->get_renderer($PAGE);
    $controlmenu = new controlmenu($format, $sectioninfo, $mod);
    $menuhtml = $renderer->render($controlmenu);
    return $menuhtml;
}
