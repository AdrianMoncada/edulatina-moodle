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
 * @package local_edwiserpagebuilder
 * @author  2022 WisdmLabs
 * @license http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

require_once($CFG->libdir . '/formslib.php');

class local_edwiserpagebuilder_task_popup_form extends moodleform {

    public function __construct($taskid) {
        $this->taskid = $taskid;
        parent::__construct();
    }
    /**
     * Define this form - called from the parent constructor.
     */
    public function definition() {
        $taskhandler = new local_edwiserpagebuilder\remuiblck\taskhandler($this->taskid);
        $mform = $this->_form;

        $mform->addElement('text', 'subject', get_string('subject', 'local_edwiserpagebuilder'), array('maxlength' => 500));
        $mform->addRule('subject', get_string('missingsubject', 'local_edwiserpagebuilder'), 'required', null, 'client');
        $mform->setType('subject', PARAM_TEXT);

        $mform->addElement(
            'textarea',
            'summary',
            get_string('summary', 'local_edwiserpagebuilder'),
            array('wrap' => 'virtual', 'rows' => 5, 'cols' => 50, 'maxlength' => 1000)
        );

        $mform->addElement('date_selector', 'timedue', get_string('duedate', 'local_edwiserpagebuilder'));

        $users = $taskhandler->get_users();

        $options = array(
            'multiple' => true
        );
        $mform->addElement('autocomplete', 'userlist', get_string('selectusers', 'enrol_manual'), $users, $options);

        $mform->addElement('checkbox', 'visible', get_string('visible'));
        $mform->setDefault('visible', true);

        $mform->addElement('checkbox', 'notify', get_string('notify', 'local_edwiserpagebuilder'));
    }
}
