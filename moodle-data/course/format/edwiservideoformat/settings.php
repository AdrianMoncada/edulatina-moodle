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

defined('MOODLE_INTERNAL') || die();

// Add license page to course format admin menu.
if ($hassiteconfig) {
    $settings->visiblename = get_string('general_settings', 'format_edwiservideoformat');
    $ADMIN->add('formatsettings', new admin_category('format_edwiservideoformat', get_string('pluginname', 'format_edwiservideoformat')));

    $ADMIN->add(
        'format_edwiservideoformat',
        new admin_externalpage(
            'format_edwiservideoformat_licensestatus',
            get_string('licensesetting', 'format_edwiservideoformat'),
            new moodle_url('/course/format/edwiservideoformat/classes/license.php'),
            array('moodle/site:config')
        )
    );
}
if ($ADMIN->fulltree) {
    // $settings->add(new admin_setting_configcheckbox(
    //     'format_edwiservideoformat/hiddensections',
    //     get_string('hiddensections', 'format_edwiservideoformat'),
    //     get_string('hiddensections_desc', 'format_edwiservideoformat'),
    //     0
    // ));

    // $settings->add(new admin_setting_configcheckbox(
    //     'format_edwiservideoformat/coursedisplay',
    //     get_string('coursedisplay', 'format_edwiservideoformat'),
    //     get_string('coursedisplay_desc', 'format_edwiservideoformat'),
    //     0
    // ));
}
