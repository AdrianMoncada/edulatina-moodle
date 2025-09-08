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
 * @package   local_edwiserpagebuilder
 * @copyright (c) 2023 WisdmLabs (https://wisdmlabs.com/) <support@wisdmlabs.com>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 * @author    Gourav Govande
 */

// @codingStandardsIgnoreLine
require_once('../../config.php');

global $OUTPUT, $PAGE;

require_login();

$systemcontext = \context_system::instance();

require_capability('local/edwiserpagebuilder:epb_can_manage_page', $systemcontext);

// Set page context.
$PAGE->set_context($systemcontext);

// Set page URL.
$PAGE->set_url(new moodle_url('/local/edwiserpagebuilder/managepages.php', array()));

// Set page title.
$PAGE->set_title(get_string('managepages', 'local_edwiserpagebuilder'));

// Set page heading.
$PAGE->set_heading(get_string('managepages', 'local_edwiserpagebuilder'));


// Set pagelayout dynamically which is set in every pageobject.
$PAGE->set_pagelayout('admin');

echo $OUTPUT->header();

// Render page here.
echo "<div id='managepage-wrapper'></div>";


$PAGE->requires->js_call_amd('local_edwiserpagebuilder/pageslistsettings', 'init');
// Now output the footer.
echo $OUTPUT->footer();
