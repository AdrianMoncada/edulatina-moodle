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

$pageid = optional_param('id', 0, PARAM_INT);

// Print error if ID not set.
if (empty($pageid)) {
    print_error('epb_acessnotallowed: '. get_string('accesserror', "local_edwiserpagebuilder"), 'error');
}

// Initialize the page.
$ph = new \local_edwiserpagebuilder\custom_page_handler("publish", $pageid);

$classes = "epb-publish-" . $pageid;

if ($ph->page->get_pagecontent() != null &&
$ph->page->get_pagecontent() != "" &&
json_decode($ph->page->get_pagecontent())->text != "") {
    $classes = "main-area-bg " . $classes;
}

$PAGE->add_body_class($classes);

$systemcontext = \context_system::instance();

// Set page context.
$PAGE->set_context($systemcontext);

// If user is editing & has capability to manage the page,
// Redirect user to draft page.
if ($PAGE->user_is_editing()) {
    if (has_capability('local/edwiserpagebuilder:epb_can_manage_page', $systemcontext)) {
        $editurl = new moodle_url(
            '/local/edwiserpagebuilder/pagedraft.php',
            array('id' => $ph->page->get_refid())
        );
        redirect($editurl);
        die();
    }
}

// Check if user can view the page.
if (!$ph->page->can_view_page()) {
    print_error('epb_acessnotallowed: '. get_string('accesserror', "local_edwiserpagebuilder"), 'error');
}

// Set page URL.
$PAGE->set_url(new moodle_url('/local/edwiserpagebuilder/page.php', array('id' => $ph->page->get_id())));

// Set page title.
$PAGE->set_title($ph->page->get_pagename());

// Set page heading.
$PAGE->set_heading($ph->page->get_pagename());

// Setting page type and subpage type.
$PAGE->set_pagetype('epb-page-publish');

$PAGE->set_subpage($ph->page->get_id());

// Set pagelayout dynamically which is set in every pageobject.
$PAGE->set_pagelayout($ph->page->get_pagelayout());

$PAGE->blocks->add_region('content');

echo $OUTPUT->header();

echo $OUTPUT->custom_block_region('content');

// Render page here.
if ($ph->page->get_pagecontent()) {
    echo format_text(json_decode($ph->page->get_pagecontent())->text);
}

// Now output the footer.
echo $OUTPUT->footer();
