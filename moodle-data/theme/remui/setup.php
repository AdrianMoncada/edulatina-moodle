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
require_once("../../config.php");

require_login();

if (!is_siteadmin()) {
    throw new moodle_exception(get_string('noaccessright', 'theme_remui'));
}

$setupstatus = get_config('theme_remui', 'setupstatus');
if ( $setupstatus === 'finished' || !get_config('theme_remui', 'setupinstallcheck') ) {
    throw new moodle_exception(get_string('onlyfornewsites', 'theme_remui'));
}

$PAGE->set_pagelayout('popup');
$PAGE->set_context(context_system::instance());
$PAGE->set_url($CFG->wwwroot . '/theme/remui/setup.php');
$PAGE->set_title(get_string('setuppagetitle', 'theme_remui'));

$isremui = $CFG->theme == 'remui';

$PAGE->requires->js_call_amd('theme_remui/setupwizard', 'init', [ "isremui" => $isremui]);
$PAGE->requires->css('/theme/remui/style/setupwizard.css');

$context = [
    "loader" => $OUTPUT->image_url('siteinnerloader', 'theme'),
    "isremui" => $isremui,
];

echo $OUTPUT->header();
echo $OUTPUT->render_from_template('theme_remui/setupwizard/setupmain', $context);
echo $OUTPUT->footer();
