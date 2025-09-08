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
 * View page for Edwiser Video Activity
 *
 * @package   mod_edwiservideoactivity
 * @copyright 2024 Edwiser
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

require(__DIR__ . '/../../config.php');
require_once($CFG->libdir . '/completionlib.php');
require_once(__DIR__ . '/lib.php');

$id = required_param('id', PARAM_INT);

// Get the course module
$cm = get_coursemodule_from_id('edwiservideoactivity', $id, 0, false, MUST_EXIST);
$course = $DB->get_record('course', ['id' => $cm->course], '*', MUST_EXIST);

// Require login and course access
require_login($course, true, $cm);

// Mark activity as viewed (completion tracking).
$completion = new completion_info($course);
$completion->set_module_viewed($cm);

// Check if course format is edwiservideoformat and redirect accordingly
// This ensures that video activities are displayed within the edwiservideoformat
// course layout instead of the standard activity view
if ($course->format === 'edwiservideoformat') {
    // Redirect to course page with modtype and modid parameters
    $redirecturl = new moodle_url('/course/view.php', [
        'id' => $course->id,
        'modtype' => 'edwiservideoactivity',
        'modid' => $cm->id
    ]);
    redirect($redirecturl);
}

$templatecontext = get_edwiservideoactivity_context($id);

// Render page using Mustache.
echo $OUTPUT->header();
echo $OUTPUT->render_from_template('mod_edwiservideoactivity/activity', $templatecontext);
echo $OUTPUT->footer();
