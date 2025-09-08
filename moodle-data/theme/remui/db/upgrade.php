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
 * Theme remui upgrade hook
 *
 * @package   theme_remui
 * @copyright (c) 2023 WisdmLabs (https://wisdmlabs.com/) <support@wisdmlabs.com>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 * @author    Yogesh Shirsath, Gourav Govande
 */

defined('MOODLE_INTERNAL') || die();
require_once($CFG->dirroot .'/theme/remui/lib.php');
/**
 * upgrade this edwiserform plugin database
 * @param int $oldversion The old version of the edwiserform local plugin
 * @return bool
 */
function xmldb_theme_remui_upgrade($oldversion) {
    theme_remui_course_custom_fields("update");
    new_colors_compatibility();
    import_user_tour();
    footer_migration_compatibility();
    theme_remui_handle_orphan_settings();
    buttons_compatibility();
    login_compatibility($oldversion);
    focus_mode_migration_compatibility($oldversion);

    if (get_config('theme_remui', 'header-primary-border-bottom-size') != 0) {
        set_config('hds-boxshadow-enable', 'enabled', 'theme_remui');
    }

    return true;
}

/**
 * Handling compatibility of new colors.
 */
function new_colors_compatibility() {
    $customizer = \theme_remui\customizer\customizer::instance();
    $sitecolor = $customizer->get_config('sitecolorhex');
    if (empty(get_config('theme_remui', 'logo-bg-color'))) {
        set_config('logo-bg-color', $sitecolor, 'theme_remui');
        set_config('sitenamecolor', '#FFFFFF', 'theme_remui');
    }
    if (!empty(get_config('theme_remui', 'navbarinverse'))) {
        set_config(
            'header-menu-text-active-color',
            get_config('theme_remui', 'header-menu-text-hover-color'),
            'theme_remui'
        );
        set_config('header-menu-element-bg-color', '#C8C8C8', 'theme_remui');
        set_config('header-menu-divider-bg-color', '#FFFFFF', 'theme_remui');
        set_config('hds-icon-color', '#FFFFFF', 'theme_remui');
        set_config('hds-icon-hover-color', '#FFFFFF', 'theme_remui');
        set_config('hds-icon-active-color', '#FFFFFF', 'theme_remui');
    }
    $textcolor = \theme_remui\toolbox::get_setting('global-typography-body-textcolor');
    set_config('themecolors-textcolor', $textcolor , 'theme_remui');
}

/**
 * Handling compatibility of  buttons.
 */
function buttons_compatibility() {
    $customizer = \theme_remui\customizer\customizer::instance();
    // $base = $customizer->get_config('global-typography-body-fontsize');
    // $borderwidth = $customizer->get_config('button-primary-border-width');
    // $borderradius = $customizer->get_config('button-primary-border-radius');
    // $fontfamily = $customizer->get_config('button-primary-fontfamily');
    // $fontsize = $customizer->get_config('button-primary-fontsize');
    // $fontweight = $customizer->get_config('button-primary-fontweight');
    // $texttransform = $customizer->get_config('button-primary-text-transform');
    // $lineheight = $customizer->get_config('button-primary-lineheight');
    // $letterspacing = $customizer->get_config('button-primary-letterspacing');
    // $paddingtop = $customizer->get_config('button-primary-padingtop');
    // $paddingleft = $customizer->get_config('button-primary-padingleft');
    // $paddingright = $customizer->get_config('button-primary-padingright');
    // $paddingbottom = $customizer->get_config('button-primary-padingbottom');

    $base = \theme_remui\toolbox::get_setting('global-typography-body-fontsize');
    $borderwidth = \theme_remui\toolbox::get_setting('button-primary-border-width');
    $borderradius = \theme_remui\toolbox::get_setting('button-primary-border-radius');
    $fontfamily = \theme_remui\toolbox::get_setting('button-primary-fontfamily');
    $fontsize = \theme_remui\toolbox::get_setting('button-primary-fontsize');
    $fontweight = \theme_remui\toolbox::get_setting('button-primary-fontweight');
    $texttransform = \theme_remui\toolbox::get_setting('button-primary-text-transform');
    $lineheight = \theme_remui\toolbox::get_setting('button-primary-lineheight');
    $letterspacing = \theme_remui\toolbox::get_setting('button-primary-letterspacing');
    $paddingtop = \theme_remui\toolbox::get_setting('button-primary-padingtop');
    $paddingleft = \theme_remui\toolbox::get_setting('button-primary-padingleft');
    $paddingright = \theme_remui\toolbox::get_setting('button-primary-padingright');
    $paddingbottom = \theme_remui\toolbox::get_setting('button-primary-padingbottom');

    if (!empty($borderwidth)) {
        $borderwidth *= $base;
        set_config('button-common-border-width', $borderwidth, 'theme_remui');
    }

    if (!empty($borderradius)) {
        $borderradius *= $base;
        set_config('button-common-border-radius', $borderradius, 'theme_remui');
    }
    if (!empty($fontfamily)) {
        set_config('button-common-fontfamily', $fontfamily, 'theme_remui');
    }
    if (!empty($texttransform)) {
        set_config('button-common-text-transform', $texttransform, 'theme_remui');
    }
    if (!empty($letterspacing)) {
        set_config('button-common-letterspacing', $letterspacing, 'theme_remui');
    }

    if (!empty($fontsize)) {
        set_config('button-md-settings-fontsize', $fontsize, 'theme_remui');
    }
    if (!empty($fontweight)) {
        set_config('button-md-settings-fontweight', $fontweight, 'theme_remui');
    }
    if (!empty($lineheight)) {
        set_config('button-md-settings-lineheight', $lineheight, 'theme_remui');
    }
    if (!empty($paddingtop)) {
        set_config('button-md-settings-padingtop', $paddingtop, 'theme_remui');
    }
    if (!empty($paddingleft)) {
        set_config('button-md-settings-padingleft', $paddingleft, 'theme_remui');
    }
    if (!empty($paddingright)) {
        set_config('button-md-settings-padingright', $paddingright, 'theme_remui');
    }
    if (!empty($paddingbottom)) {
        set_config('button-md-settings-padingbottom', $paddingbottom, 'theme_remui');
    }

}

/**
 * This function handle footer migration.
 *
 * @return void
 */

function footer_migration_compatibility() {
    for ($i = 1; $i <= 4; $i++) {
        if (get_config('theme_remui', 'footercolumn'.$i.'type') == 'social') {
            set_config('footercolumn'.$i.'type', 'customhtml', 'theme_remui');
            set_config('socialmediaiconcol'.$i, 'true', 'theme_remui');
            set_config('footercolumn'.$i.'title', get_string('followus', 'theme_remui'), 'theme_remui');
        }
    }

    set_config('footer-columntitle-fontsize', '1.275', 'theme_remui');
    set_config('footer-columntitle-fontweight', '400', 'theme_remui');

    $textcolor = \theme_remui\toolbox::get_setting('footer-text-color');
    set_config('footer-columntitle-color', $textcolor, 'theme_remui');

    $headertextcolor = \theme_remui\toolbox::get_setting('header-menu-text-color');
    set_config('footer-logo-color', $textcolor, 'theme_remui');

    if (\theme_remui\toolbox::get_setting('footershowlogo') == 'show') {
        set_config('useheaderlogo', "show", 'theme_remui');
    }

    if (get_config('theme_remui', 'poweredbyedwiser') == true) {
        set_config('poweredbyedwiser', "show", 'theme_remui');
    }

}

/**
 * Handling compatibility of login.
 */
function login_compatibility($oldversion) {
    $textcolor = \theme_remui\toolbox::get_setting('loginpaneltextcolor');
     $customizer = \theme_remui\customizer\customizer::instance();
     $loginpanelcontentcolor = $customizer->get_config('loginpanelcontentcolor');
    if ($oldversion == '2022081706' || empty($loginpanelcontentcolor)) {
        set_config('loginpanelcontentcolor', $textcolor, 'theme_remui');
    }
}
/**
 * Delete orphan customizer settings.
 */
function theme_remui_handle_orphan_settings() {
    $settings = [
        'button-default-color-text',
        'button-default-color-texthover',
        'button-default-color-background',
        'button-default-color-backgroundhover',
        'button-default-border-width',
        'button-default-border-color',
        'button-default-border-hovercolor',
        'button-default-border-radius',
        'button-default-fontfamily',
        'button-default-fontsize',
        'button-default-fontweight',
        'button-default-lineheight',
        'button-default-letterspacing',
        'button-default-padingtop',
        'button-default-padingright',
        'button-default-padingbottom',
        'button-default-padingleft',
        'button-secondary-color-texthover',
        'button-secondary-color-backgroundhover',
        'button-secondary-border-hovercolor',
        'formselementdesign',
        'icondesign',
        'hide-calendar',
        'hide-private-files',
        'hide-content-bank',
        'left-sidebar-main-link-text',
        'left-sidebar-main-background-color',
        'left-sidebar-main-link-hover-text',
        'left-sidebar-main-link-hover-background',
        'left-sidebar-main-active-link-color',
        'left-sidebar-main-active-link-background',
        'left-sidebar-secondary-background-color',
        'left-sidebar-secondary-link-icon',
        'left-sidebar-secondary-link-hover-background',
        'left-sidebar-secondary-font-size',
        'header-menu-background-hover-color',
    ];

    // Remove orphan settings.
    foreach ($settings as $setting) {
        unset_config($setting, 'theme_remui');
    }
}
/**
 * Process course custom field required for enrolment page layout .
 */
function theme_remui_course_custom_fields($checkupdateorinstall= "update") {
    global $DB;
    // Create Custom Fields Required for enrollment page.
    $customfieldid = get_config('theme_remui', 'remui_customfield_catid');

    if ($checkupdateorinstall == "install") {

        if (!$DB->record_exists('customfield_category', array('name' => "RemUI Custom Fields"))) {
            $customfieldid = theme_remui_create_customfield_category('RemUI Custom Fields');
            set_config('remui_customfield_catid', $customfieldid, 'theme_remui');
        }

    } else {
        if ($DB->record_exists('customfield_category', array('name' => "RemUI Custom Fields"))) {
            $customfieldcat = $DB->get_record('customfield_category', array('name' => "RemUI Custom Fields"));
            set_config('remui_customfield_catid', $customfieldcat->id, 'theme_remui');
        }



    }
    // Create Custom Fields Required for enrollment page.
    $customfieldid = get_config('theme_remui', 'remui_customfield_catid');

    theme_remui_delete_old_custom_fields($customfieldid);

    // Changing the text from "Course Duration in Hours" to "Course Duration"
    if ($DB->record_exists('customfield_field', array('shortname' => 'edwcoursedurationinhours'))) {
        $existing_fields = $DB->get_records('customfield_field', array('shortname' => 'edwcoursedurationinhours'));

        foreach ($existing_fields as $field) {
            if($field->name == "Course Duration in Hours") {
                $field->name = 'Course Duration';
            }

            $replacefor = [' ', '(', ')'];
            $replacewith = ['', '', ''];
            $filteredname = str_replace($replacefor, $replacewith, 'Course Duration');
            $shortname = "edw" . strtolower($filteredname);

            $field->shortname = $shortname;

            $DB->update_record('customfield_field', $field);
        }
    }

    $customfields = [
        [
            'fieldname' => 'Course Duration',
            'type' => 'text',
            'description' => "",
        ],
        [
            'fieldname' => 'Course Intro Video Url (Embedded)',
            'type' => 'text',
            'description' => "",
        ],
        [
            'fieldname' => 'Skill Level',
            'type' => 'select',
            'options' => [
                'options' => "Beginner\n Intermediate\n Advanced",
                'defaultvalue' => 'Beginner',
            ],
            'description' => "",
        ],
        [
            'fieldname' => 'Focus Mode',
            'type' => 'select',
            'options' => [
                // 1st option Default will be added using JS because moodle add default blank option with value 0
                'options' => "Force Focus Mode with learner control",
                'defaultvalue' => 'Default',
            ],
            'description' => "<div class='overflow-hidden' style='padding: 12px; border-radius: 6px; border: 1px solid #FFC107; background: #FFF9E5;'>
                    <p class='m-0' style='font-size: 14px;'>
                        <strong>Default:</strong> Uses the Focus Mode setting defined by the site admin.
                    </p>
                    <p class='m-0 mt-2' style='font-size: 14px;'>
                        <strong>Force Focus Mode (with learner control): </strong> This option lets you keep Focus Mode active for your course. Learners will see the course in Focus Mode by default, but they can choose to turn it off anytime. This applies only to learners.
                    </p>
                    <p class='m-0 mt-2' style='font-size: 14px;'>
                        <strong>Note:</strong> If the site admin has either <strong>disabled</strong> or <strong>enforced</strong> Focus Mode across the site, the settings here won’t apply.
                    </p>
                </div>",
        ],
    ];

    foreach ($customfields as $customfield) {

        $replacefor = [' ', '(', ')'];
        $replacewith = ['', '', ''];
        $filteredname = str_replace($replacefor, $replacewith, $customfield['fieldname']);
        $shortname = "edw" . strtolower($filteredname);

        $options = [];
        if (isset($customfield['options'])) {
            $options = $customfield['options'];
        }

        // Make sure not to repeat the fields.
        if (!$DB->record_exists('customfield_field', array(
            'shortname' => $shortname,
            // 'name' => $customfield['fieldname'],
            'categoryid' => $customfieldid,
            ))) {
                theme_remui_create_custom_field(
                    $customfieldid,
                    $customfield['fieldname'],
                    $customfield['type'],
                    $options,
                    $customfield['description']
                );
        }
    }
}
/**
 * Fix wrongly names video field options
 *
 * @param int $customfieldid Custom field category id.
 */
function theme_remui_delete_old_custom_fields($customfieldid) {
    global $DB;
    $wrongnames = ['Course Intro Video Url', 'Course Intro Video Url (Embeded)', 'Course Intro Video Url (Embedded)'];

    foreach ($wrongnames as $wrongname) {
        $shortname = "edw" . strtolower(str_replace(' ', '', $wrongname));

        $record = array(
            'shortname' => $shortname,
            'name' => $wrongname,
            'categoryid' => $customfieldid
        );
        if ($DB->record_exists('customfield_field', $record)) {
            $DB->delete_records('customfield_field', $record);
        }
    }
}


/**
 * Handles the migration from enablefocusmode (checkbox) to focusmode (dropdown)
 */
function focus_mode_migration_compatibility($oldversion) {
    // Get the old setting value
    if ($oldversion > "2025031100") {
        $oldsetting = get_config('theme_remui', 'enablefocusmode');

        // If old setting exists, migrate it to the new format
        if ($oldsetting !== false) {
            // If checkbox was checked (true), set dropdown to "Focus mode on" (1)
            // If checkbox was unchecked (false), set dropdown to "Focus mode off" (0)
            $newvalue = $oldsetting ? 1 : 0;

            // Set the new config value
            set_config('focusmode', $newvalue, 'theme_remui');

            // Unset the old config value
            // unset_config('enablefocusmode', 'theme_remui');
        }
    }
}
