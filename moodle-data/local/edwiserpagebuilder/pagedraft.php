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

global $OUTPUT, $PAGE, $USER;

$pageid = optional_param('id', 0, PARAM_INT);

// Print error if ID not set.
if (empty($pageid)) {
    print_error('epb_acessnotallowed: '. get_string('accesserror', "local_edwiserpagebuilder"), 'error');
}

$pagepreview = optional_param('preview', 0, PARAM_INT);

// Initialize the page.
$ph = new \local_edwiserpagebuilder\custom_page_handler("draft", $pageid);

$classes = "epb-draft-" . $pageid;

if ($ph->page->get_pagecontent() != null &&
$ph->page->get_pagecontent() != "" &&
json_decode($ph->page->get_pagecontent())->text != "") {
    $classes = "main-area-bg " . $classes;
}
$PAGE->add_body_class($classes);

$systemcontext = \context_system::instance();

// Set page context.
$PAGE->set_context($systemcontext);

$preview = "&preview=1"; // Setting value for preview url.

if ($pagepreview == 1) {
    $editingvalue = $PAGE->user_is_editing();
    $preview = "&preview=2"; // Setting value for preview url.
    set_user_preference("userisediting", $editingvalue, $USER);
    $USER->editing = false;
}

if ($pagepreview == 2) {
    $editingvalue = get_user_preferences("userisediting");
    unset_user_preference("userisediting", $USER);
    $USER->editing = $editingvalue;
}

if ($pagepreview == 0) {
    unset_user_preference("userisediting", $USER);
    // If user is not editing,
    // Redirect user to publish page.
    if (!$PAGE->user_is_editing() && $ph->page->get_refid() != -1) {
        $pageurl = new moodle_url(
            '/local/edwiserpagebuilder/page.php',
            array('id' => $ph->page->get_refid())
        );
        redirect($pageurl);
        die();
    }
}

// Check if user has capability.
if (!has_capability('local/edwiserpagebuilder:epb_can_manage_page', $systemcontext)) {
    print_error('epb_acessnotallowed: '. get_string('accesserror', "local_edwiserpagebuilder"), 'error');
}

if ($PAGE->user_is_editing() && get_config("local_edwiserpagebuilder", "show-layout-".$pageid)) {
    $PAGE->add_body_class("epb-showlayout-" . $pageid);
    $PAGE->requires->js_call_amd('local_edwiserpagebuilder/custompages', 'initLayoutSelector', array($pageid));

    // Unset config.
    unset_config("show-layout-".$pageid, "local_edwiserpagebuilder");
}

// Check if user can view the page.
if (!$ph->page->can_view_page()) {
    print_error('epb_acessnotallowed: '. get_string('accesserror', "local_edwiserpagebuilder"), 'error');
}
$PAGE->blocks->add_region('content');

// Set page URL.
$PAGE->set_url(
    new moodle_url(
        '/local/edwiserpagebuilder/pagedraft.php',
        array('id' => $ph->page->get_id())
    )
);

// Set page title.
$PAGE->set_title($ph->page->get_pagename());

// Set page heading.
$PAGE->set_heading($ph->page->get_pagename());

// Setting page type and subpage type.
$PAGE->set_pagetype('epb-page-draft');

$PAGE->set_subpage($ph->page->get_id());

// Set pagelayout dynamically which is set in every pageobject.
$PAGE->set_pagelayout($ph->page->get_pagelayout());

$pagedata = $ph->page->generate_addable_object();

$pageurl = new moodle_url('/local/edwiserpagebuilder/page.php', array("id" => $pagedata->refid));
$indraft = false;

if ($pagedata->refid == -1) {
    $indraft = true;
    $pageurl = new moodle_url('/local/edwiserpagebuilder/pagedraft.php', array("id" => $pagedata->id));
}

$pagedata->pagename = format_text($pagedata->pagename, FORMAT_HTML,array('noclean' => true));
$pagecontent = [
    "page" => $pagedata,
    "pageurl" => $pageurl,
    "indraft" => $indraft,
    "preview" => $preview,
    "config" => $CFG,
    "isediting" => $PAGE->user_is_editing(),
    "ispreview" => $pagepreview == 1
];

echo $OUTPUT->header();

echo $OUTPUT->render_from_template('local_edwiserpagebuilder/page_sub_header', $pagecontent );

echo $OUTPUT->addblockbutton('content');

echo $OUTPUT->custom_block_region('content');

// Render page here.
if ($ph->page->get_pagecontent()) {
    echo format_text(json_decode($ph->page->get_pagecontent())->text);
}

// Now output the footer.
echo $OUTPUT->footer();

