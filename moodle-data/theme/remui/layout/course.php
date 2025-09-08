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
 * A drawer based layout for the remui theme.
 *
 * @package   theme_remui
 * @copyright (c) 2023 WisdmLabs (https://wisdmlabs.com/) <support@wisdmlabs.com>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

global $CFG, $COURSE;


require_once($CFG->dirroot . '/theme/remui/layout/common.php');

if (isset($templatecontext['focusdata']['enabled']) && $templatecontext['focusdata']['enabled']) {
    list(
        $templatecontext['focusdata']['sections'],
        $templatecontext['focusdata']['active']
    ) = \theme_remui\utility::get_focus_mode_sections($COURSE);
}
$coursecontext = context_course::instance($COURSE->id);
if (!is_guest($coursecontext, $USER) && \theme_remui\toolbox::get_setting('enablecoursestats')) {
    $templatecontext['iscoursestatsshow'] = true;
}

$completion = new \completion_info($COURSE);
$templatecontext['completion'] = $completion->is_enabled();

$roles = get_user_roles(context_course::instance($COURSE->id), $USER->id);
$key = array_search('student', array_column($roles, 'shortname'));
if ($key === false || is_siteadmin()) {
    $templatecontext['notstudent'] = true;
}

$templatecontext['courseid'] = $COURSE->id;

// Must be called before rendering the template.
// This will ease us to add body classes directly to the array.
require_once($CFG->dirroot . '/theme/remui/layout/common_end.php');

echo $OUTPUT->render_from_template('theme_remui/course', $templatecontext);
