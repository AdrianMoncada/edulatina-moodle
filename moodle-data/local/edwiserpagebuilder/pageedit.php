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

require_once($CFG->libdir.'/formslib.php');

class page_edit_form extends moodleform {
    // Add elements to form.
    public function definition() {
        $mform = $this->_form;

        // GROUP - GENERAL.
        $mform->addElement(
            'header',
            'generalinfo',
            get_string('formgeneralheading', 'local_edwiserpagebuilder')
        );

        // PAGENAME.
        $mform->addElement('text', 'pagename', get_string('pagename', 'local_edwiserpagebuilder'));
        $mform->setType('pagename', PARAM_TEXT);
        $mform->addRule(
            'pagename',
            get_string('pagename_error', 'local_edwiserpagebuilder'),
            'required',
            null,
            'client'
        );

        // PAGEDESC.
        $mform->addElement(
            'textarea',
            'pagedesc',
            get_string("pagedesc", "local_edwiserpagebuilder"),
            'wrap="virtual" rows="8" cols="10"'
        );
        $mform->setType('pagecontent', PARAM_RAW);

        // GROUP - DISPLAY.
        $mform->addElement(
            'header',
            'displayinfo',
            get_string('formdisplayheading', 'local_edwiserpagebuilder')
        );

        // PAGECONTENT.
        $mform->addElement(
            'editor',
            'pagecontent',
            get_string("pagecontent", "local_edwiserpagebuilder"),
        );
        $mform->setType('pagecontent', PARAM_RAW);

        // START DATE.
        $mform->addElement(
            'date_selector',
            'startdate',
            get_string('startdate', 'local_edwiserpagebuilder'),
            array('optional' => true)
        );
        $mform->setType('startdate', PARAM_TEXT);

        // END DATE.
        $mform->addElement(
            'date_selector',
            'enddate',
            get_string('enddate', 'local_edwiserpagebuilder'),
            array('optional' => true)
        );
        $mform->setType('enddate', PARAM_TEXT);

        // CAPABILITIES.
        $options = array(
            'multiple' => true,
            'placeholder' => get_string('capabilities_placeholder', 'local_edwiserpagebuilder')
        );
        $mform->addElement(
            'autocomplete',
            'capabilities',
            get_string('capabilities', 'local_edwiserpagebuilder'),
            $this->get_available_role_capabilities(),
            $options
        );
        $mform->setType('capabilities', PARAM_TEXT);

        // ALLOW LOGIN ONLY.
        $mform->addElement(
            'selectyesno',
            'allowloginonly',
            get_string('allowloginonly', 'local_edwiserpagebuilder')
        );
        $mform->setType('allowloginonly', PARAM_INT);
        $mform->setDefault('allowloginonly', 1);

        // VISIBLE.
        $mform->addElement(
            'select',
            'visible',
            get_string('visible', 'local_edwiserpagebuilder'),
            array(
                get_string('hide', 'local_edwiserpagebuilder'),
                get_string('show', 'local_edwiserpagebuilder')
            )
        );
        $mform->setType('visible', PARAM_INT);
        $mform->setDefault('visible', 1);

        // GROUP - SEO.
        $mform->addElement(
            'header',
            'seoinfo',
            get_string('seoinfo', 'local_edwiserpagebuilder')
        );
        $mform->closeHeaderBefore('buttonar');

        // TAG.
        $mform->addElement('text', 'seotag', get_string('seotag', 'local_edwiserpagebuilder'));
        $mform->setType('seotag', PARAM_TEXT);

        // SEO - DESC.
        $mform->addElement(
            'textarea',
            'seodesc',
            get_string("seodesc", "local_edwiserpagebuilder"),
            'wrap="virtual" rows="8" cols="10"'
        );
        $mform->setType('seodesc', PARAM_TEXT);

        // ALLOW INDEXING.
        $mform->addElement(
            'selectyesno',
            'allowindex',
            get_string('allowindex', 'local_edwiserpagebuilder')
        );
        $mform->setType('allowindex', PARAM_INT);

        // PAGE ID.
        $mform->addElement('hidden', 'id', '0');
        $mform->setType('id', PARAM_INT);

        // BUTTONS GROUP.
        $btngroup = array();

        // SAVE AND PUBLISH.
        $btngroup[] = $mform->createElement(
            'submit',
            'submitpublish',
            get_string('submitpublish', 'local_edwiserpagebuilder')
        );

        // SAVE TO DRAFT.
        $btngroup[] = $mform->createElement(
            'submit',
            'submitdraft',
            get_string('submitdraft', 'local_edwiserpagebuilder')
        );

        $btngroup[] = $mform->createElement('cancel');
        $mform->addGroup($btngroup, 'buttonar', '', ' ', false);

    }

    // Custom validation should be added here.
    public function validation($data, $files) {
        return [];
    }

    /**
     * Return all available role capabilities to be listed.
     */
    public function get_available_role_capabilities () {
        $capabilities = [];
        foreach (get_all_capabilities() as $key => $capability) {
            $capabilities[$key] = $capability['name'];
        }
        return $capabilities;
    }

    /**
     * Reset DB data in the form.
     */
    public function restore_db_data($draftid) {
        $ph = new local_edwiserpagebuilder\custom_page_handler('draft', $draftid);

        $pageconfig = $ph->page->generate_addable_object();

        $pageconfig->capabilities = json_decode($pageconfig->capabilities);
        $pageconfig->pagecontent = json_decode($pageconfig->pagecontent);
        $this->set_data($pageconfig);
    }
}

// Check login first.
require_login();

$systemcontext = \context_system::instance();

require_capability('local/edwiserpagebuilder:epb_can_manage_page', $systemcontext);

global $PAGE;

// Page Setup.
$PAGE->set_context($systemcontext);

$PAGE->set_pagelayout('admin');

// Check for particular page id.
$draftid = optional_param('id', 0, PARAM_INT);

// Setting up page url.
$PAGE->set_url(new moodle_url('/local/edwiserpagebuilder/pageedit.php', array("id" => $draftid)));

// Instantiate the page_edit_form.
$mform = new page_edit_form();
$pagetitle = get_string("addnewpage", "local_edwiserpagebuilder");
// Set up existing data from DB.
if ($draftid) {
    $pagetitle = get_string("editpage", "local_edwiserpagebuilder");
    $mform->restore_db_data($draftid);
}

// Set page title.
$PAGE->set_title($pagetitle);
$PAGE->set_heading($pagetitle);

// Form processing and displaying is done here.
if ($mform->is_cancelled()) {
    if ($draftid) {
        $returnurl = new moodle_url('/local/edwiserpagebuilder/pagedraft.php', array("id" => $draftid));
    } else {
        $returnurl = new moodle_url('/my', array());
    }
    redirect($returnurl);
    die();

} else if ($formdata = $mform->get_data()) {
    $formdata->pagelayout = "mydashboard";

    $formdata->capabilities = json_encode($formdata->capabilities);
    $formdata->pagecontent = json_encode($formdata->pagecontent);

    $ph = new local_edwiserpagebuilder\custom_page_handler();

    if ($draftid) {

        if (isset($formdata->submitdraft)) {
            // We do not require button data in insertion object.
            unset($formdata->submitdraft);

            // Create a record.
            $pageid = $ph->action_update_page(json_encode($formdata));
        }

        if (isset($formdata->submitpublish)) {
            // We do not require button data in insertion object.
            unset($formdata->submitpublish);

            // Create a record.
            $pageid = $ph->action_update_n_publish_page(json_encode($formdata));
        }

        $returnurl = new moodle_url('/local/edwiserpagebuilder/pagedraft.php', array("id" => $draftid));
    }

    if ($draftid == 0) {
        if (isset($formdata->submitdraft)) {
            // We do not require button data in insertion object.
            unset($formdata->submitdraft);

            // Create a record.
            $pageid = $ph->action_add_new_page(json_encode($formdata));
        }

        if (isset($formdata->submitpublish)) {
            // We do not require button data in insertion object.
            unset($formdata->submitpublish);

            // Create a record.
            $pageid = $ph->action_add_n_publish_page(json_encode($formdata));
        }

        $returnurl = new moodle_url('/local/edwiserpagebuilder/pagedraft.php', array("id" => $pageid));
    }

    redirect($returnurl);
    die();

} else {
    // This branch is executed if the form is submitted but the data doesn't
    // validate and the form should be redisplayed or on the first display of the form.
    echo $OUTPUT->header();

    $toform['id'] = $draftid;
    // Set anydefault data (if any).
    $mform->set_data($toform);

    // Display the form.
    $mform->display();

    echo $OUTPUT->footer();
}
