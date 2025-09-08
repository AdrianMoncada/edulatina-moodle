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
 * Theme customizer header trait
 *
 * @package   theme_remui
 * @copyright (c) 2023 WisdmLabs (https://wisdmlabs.com/) <support@wisdmlabs.com>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 * @author    Yogesh Shirsath
 */

namespace theme_remui\customizer\add;

trait header {
    /**
     * Add header settings
     * @return void
     */
    private function header_settings() {

        $this->add_panel('header', get_string('header', 'theme_remui'), 'root');

        $this->add_header_logo_settings();

        $this->add_header_design_settings();

        $this->add_header_hide_show_settings();
    }

    /**
     * Add heder design settings
     * @return void
     */
    private function add_header_design_settings() {
        $panel = 'header-design-settings';
        $this->add_panel($panel, get_string($panel, 'theme_remui'), 'header');

        // Header desktop layout.
        $label = get_string('layout-desktop', 'theme_remui');
        $backgroundselector = 'header-primary-layout-desktop';
        $this->add_setting(
            'select',
            $backgroundselector,
            $label,
            $panel,
            [
                'help' => get_string('layout-desktop_help', 'theme_remui'),
                'default' => 'left',
                'options' => [
                    'left' => get_string('header-left', 'theme_remui'),
                    'right' => get_string('header-right', 'theme_remui')
                ]
            ]
        );

        // Main header design settings.
        $this->add_setting(
            'heading_start',
            'hds-header',
            get_string('headercolors', 'theme_remui'),
            $panel,
            [
                'collapsed' => true
            ]
        );

        // Apply site color to navbar.
        $label = get_string('applynavbarcolor', 'theme_remui');
        $this->add_setting(
            'checkbox',
            'navbarinverse',
            $label,
            $panel,
            [
                'help' => get_string('applynavbarcolor_help', 'theme_remui')
            ]
        );

        // Background color.
        $label = get_string('background-color', 'theme_remui');
        $name = 'header-menu-background-color';
        $this->add_setting(
            'color',
            $name,
            $label,
            $panel,
            [
                'help' => get_string('header-background-color_help', 'theme_remui'),
                'default' => $this->get_default_color('headerbg'),
                'options' => [
                    ['key' => 'showAlpha', 'value' => 'true']
                ]
            ]
        );
        // Header menu color.
        $this->add_setting(
            'color',
            'header-menu-text-color',
            get_string('hds-menu-color', 'theme_remui'),
            $panel,
            [
                'help' => get_string('hds-menu-color_desc', 'theme_remui'),
                'default' => $this->get_default_color('headertext')
            ]
        );

        // Header menu hover color.
        $this->add_setting(
            'color',
            'header-menu-text-hover-color',
            get_string('hds-menu-hover-color', 'theme_remui'),
            $panel,
            [
                'help' => get_string('hds-menu-hover-color_desc', 'theme_remui'),
                'default' => $this->get_default_color('headertexthover')
            ]
        );

        // Header menu active color.
        $this->add_setting(
            'color',
            'header-menu-text-active-color',
            get_string('hds-menu-active-color', 'theme_remui'),
            $panel,
            [
                'help' => get_string('hds-menu-active-color_desc', 'theme_remui'),
                'default' => $this->get_default_color('headertextactive')
            ]
        );
        // Element Background color.
        $label = get_string('header-menu-element-bg-color', 'theme_remui');
        $name = 'header-menu-element-bg-color';
        $this->add_setting(
            'color',
            $name,
            $label,
            $panel,
            [
                'help' => get_string('header-menu-element-bg-color_help', 'theme_remui', $panel),
                'default' => $this->get_default_color('elementbg'),
                'options' => [
                    ['key' => 'showAlpha', 'value' => 'true']
                ]
            ]
        );

        // Element Background color.
        $label = get_string('header-menu-divider-bg-color', 'theme_remui');
        $name = 'header-menu-divider-bg-color';
        $this->add_setting(
            'color',
            $name,
            $label,
            $panel,
            [
                'help' => get_string('header-menu-divider-bg-color_help', 'theme_remui', $panel),
                'default' => $this->get_default_color('headerdividercolordark'),
                'options' => [
                    ['key' => 'showAlpha', 'value' => 'true']
                ]
            ]
        );

        $this->add_setting(
            'heading_end',
            'hds-header',
            '',
            $panel
        );

        // Header icon color settings.
        $this->add_setting(
            'heading_start',
            'hds-iconcolor',
            get_string('hds-iconcolor', 'theme_remui'),
            $panel,
            [
                'collapsed' => true
            ]
        );

        // Icon color.
        $label = get_string('hds-icon-color', 'theme_remui');
        $this->add_setting(
            'color',
            'hds-icon-color',
            $label,
            $panel,
            [
                'help' => get_string('hds-icon-color_help', 'theme_remui', $panel),
                'default' => $this->get_default_color('headericons')
            ]
        );

        // Icon hover color.
        $label = get_string('hds-icon-hover-color', 'theme_remui');
        $this->add_setting(
            'color',
            'hds-icon-hover-color',
            $label,
            $panel,
            [
                'help' => get_string('hds-icon-hover-color_help', 'theme_remui', $panel),
                'default' => $this->get_default_color('headericonshover')
            ]
        );

        // Icon active color.
        $label = get_string('hds-icon-active-color', 'theme_remui');
        $this->add_setting(
            'color',
            'hds-icon-active-color',
            $label,
            $panel,
            [
                'help' => get_string('hds-icon-active-color_help', 'theme_remui', $panel),
                'default' => $this->get_default_color('headericonsactive')
            ]
        );

        $this->add_setting(
            'heading_end',
            'hds-iconcolor',
            '',
            $panel
        );

        // Header box shadow settings.
        $this->add_setting(
            'heading_start',
            'hds-boxshadow',
            get_string('hds-boxshadow', 'theme_remui'),
            $panel,
            [
                'collapsed' => true
            ]
        );

        // Enable header box shadow.
        $label = get_string('hds-boxshadow', 'theme_remui');
        $this->add_setting(
            'checkbox',
            'hds-boxshadow-enable',
            $label,
            $panel,
            [
                'default' => true
            ]
        );

        // Border bottom size.
        $label = get_string('box-shadow-size', 'theme_remui');
        $this->add_setting(
            'number',
            'header-primary-border-bottom-size',
            $label,
            $panel,
            [
                'help' => get_string('box-shadow-size_help', 'theme_remui'),
                'default' => '0.563',
                'options' => [
                    'step' => 0.01
                ]
            ]
        );

        // Border bottom size.
        $label = get_string('box-shadow-blur', 'theme_remui');
        $this->add_setting(
            'number',
            'header-primary-border-bottom-blur',
            $label,
            $panel,
            [
                'help' => get_string('box-shadow-blur_help', 'theme_remui'),
                'default' => '1.125',
                'options' => [
                    'min' => 0,
                    'step' => 0.01
                ]
            ]
        );

        // Border bottom color.
        $label = get_string('box-shadow-color', 'theme_remui');
        $name = 'header-primary-border-bottom-color';
        $this->add_setting(
            'color',
            $name,
            $label,
            $panel,
            [
                'help' => get_string('box-shadow-color_help', 'theme_remui'),
                'default' => 'rgba(92, 107, 121, 0.1)',
                'options' => [
                    ['key' => 'preferredFormat', 'value' => '\'rgb\''],
                    ['key' => 'showAlpha', 'value' => 'true']
                ]
            ]
        );

        $this->add_setting(
            'heading_end',
            'hds-boxshadow',
            '',
            $panel
        );

        // Header menu items settings.
        $this->add_setting(
            'heading_start',
            'hds-menuitems',
            get_string('headertypography', 'theme_remui'),
            $panel,
            [
                'collapsed' => true
            ]
        );

        // Header menu font family.
        $fonts = $this->get_fonts(['Inherit' => get_string('inherit', 'theme_remui')]);
        $label = get_string('font-family', 'theme_remui');
        $this->add_setting(
            'select',
            'hds-menu-font-family',
            $label,
            $panel,
            [
                'help' => get_string('font-family_help', 'theme_remui', get_string('hds-menuitems', 'theme_remui')),
                'default' => 'Inherit',
                'options' => $fonts
            ]
        );

        // Header menu font size.
        $label = get_string('font-size', 'theme_remui');
        $this->add_setting(
            'number',
            'hds-menu-fontsize',
            $label . '(px)',
            $panel,
            [
                'help' => get_string('hds-menu-fontsize_desc', 'theme_remui'),
                'default' => '14'
            ]
        );

        // Font weight.
        $label = get_string('font-weight', 'theme_remui');
        $this->add_setting(
            'select',
            'hds-menu-fontweight',
            $label,
            $panel,
            [
                'help' => get_string('body-fontweight_desc', 'theme_remui'),
                'default' => '400',
                'options' => [
                    'inherit' => get_string('inherit', 'theme_remui'),
                    '100' => get_string('weight-100', 'theme_remui'),
                    '200' => get_string('weight-200', 'theme_remui'),
                    '300' => get_string('weight-300', 'theme_remui'),
                    '400' => get_string('weight-400', 'theme_remui'),
                    '500' => get_string('weight-500', 'theme_remui'),
                    '600' => get_string('weight-600', 'theme_remui'),
                    '700' => get_string('weight-700', 'theme_remui'),
                    '800' => get_string('weight-800', 'theme_remui'),
                    '900' => get_string('weight-900', 'theme_remui')
                ]
            ]
        );

        // Header menu text transform.
        $label = get_string('text-transform', 'theme_remui');
        $this->add_setting(
            'select',
            'hds-menu-text-transform',
            $label,
            $panel,
            [
                'help' => get_string('text-transform_help', 'theme_remui', get_string('hds-menuitems', 'theme_remui')),
                'default' => 'inherit',
                'options' => $this->texttransform
            ]
        );

        // Header menu letter spacing.
        $label = get_string('letter-spacing', 'theme_remui');
        $this->add_setting(
            'number',
            'hds-menu-letter-spacing',
            $label . ' (rem)',
            $panel,
            [
                'help' => get_string('letter-spacing_help', 'theme_remui', get_string('hds-menuitems', 'theme_remui')),
                'default' => 0,
                'options' => [
                    'min' => 0,
                    'step' => 0.01
                ]
            ]
        );

        $this->add_setting(
            'heading_end',
            'hds-menuitems',
            '',
            $panel
        );
    }

    /**
     * Header Logo Settings
     * @return void
     */
    private function add_header_logo_settings() {
        global $CFG;

        $panel = 'header-logo-setting';
        $this->add_panel($panel, get_string($panel, 'theme_remui'), 'header');

        // Logo bg color.
        $label = get_string('logo-bg-color', 'theme_remui');
        $this->add_setting(
            'color',
            'logo-bg-color',
            $label,
            $panel,
            [
                'help' => get_string('logo-bg-color_help', 'theme_remui'),
                'default' => $this->get_default_color('headerbg')
            ]
        );

        // Header desktop layout.
        $label = get_string('logoorsitename', 'theme_remui');
        $name = 'logoorsitename';
        $this->add_setting(
            'select',
            $name,
            $label,
            $panel,
            [
                'help' => get_string('logoorsitenamedesc', 'theme_remui'),
                'default' => 'iconsitename',
                'options' => [
                    'logo' => get_string('onlylogo', 'theme_remui'),
                    'logomini' => get_string('logomini', 'theme_remui'),
                    'icononly' => get_string('icononly', 'theme_remui'),
                    'iconsitename' => get_string('iconsitename', 'theme_remui')
                ]
            ]
        );

        // Site logo.
        $defaultlogo = $CFG->wwwroot . '/theme/remui/pix/logo.png';
        $label = get_string('logo', 'theme_remui');
        $name = 'logo';
        $this->add_setting(
            'file',
            $name,
            $label,
            $panel,
            [
                'help' => '<div>Default:<img style="height: 66px;" src="' . $defaultlogo
                . '"/></div>' . get_string('logodesc', 'theme_remui'),
                'description' => get_string('logosize', 'theme_remui'),
                'options' => [
                    'subdirs' => 0,
                    'maxfiles' => 1,
                    'accepted_types' => array('web_image')
                ]
            ]
        );

        // Site log mini.
        $label = get_string('logomini', 'theme_remui');
        $defaultlogomini = $CFG->wwwroot . '/theme/remui/pix/logomini.png';
        $name = 'logomini';
        $this->add_setting(
            'file',
            $name,
            $label,
            $panel,
            [
                'help' => '<div>Default:<img style="height: 66px;" src="' . $defaultlogomini . '"/></div>'
                . get_string('logominidesc', 'theme_remui'),
                'description' => get_string('logominisize', 'theme_remui'),
                'options' => [
                    'subdirs' => 0,
                    'maxfiles' => 1,
                    'accepted_types' => array('web_image')
                ]
            ]
        );

        //dark mode logo 
        $label = get_string('darkmodelogo', 'theme_remui');
        $name = 'darkmodelogo';
        $this->add_setting(
            'file',
            $name,
            $label,
            $panel,
            [
                'help' => get_string('darkmodelogodesc', 'theme_remui'),
                'description' => get_string('darkmodelogosize', 'theme_remui'),
                'default' => '',
                'options' => [
                    'subdirs' => 0,
                    'maxfiles' => 1,
                    'accepted_types' => array('web_image')
                ]
            ]
        );

        //dark mode logo Mini
        $label = get_string('darkmodelogomini', 'theme_remui');
        $name = 'darkmodelogomini';
        $this->add_setting(
            'file',
            $name,
            $label,
            $panel,
            [
                'help' => get_string('darkmodelogominidesc', 'theme_remui'),
                'description' => get_string('darkmodelogominisize', 'theme_remui'),
                'default' => '',
                'options' => [
                    'subdirs' => 0,
                    'maxfiles' => 1,
                    'accepted_types' => array('web_image')
                ]
            ]
        );


        // Icon.
        $label = get_string('siteicon', 'theme_remui');
        $this->add_setting(
            'text',
            'siteicon',
            $label,
            $panel,
            [
                'help' => get_string('siteicondesc', 'theme_remui'),
                'default' => 'graduation-cap'
            ]
        );

        // Font size.
        $label = get_string('font-size', 'theme_remui');
        $this->add_setting(
            'number',
            'header-site-identity-fontsize',
            $label . ' (rem)',
            $panel,
            [
                'help' => get_string('font-size_help', 'theme_remui', get_string('header', 'theme_remui')),
                'default' => 1.171,
                "responsive" => [
                    'tablet' => 1.171
                ],
                'options' => [
                    'min' => 0,
                    'step' => 0.01
                ]
            ]
        );

        // Brand name color.
        $label = get_string('sitenamecolor', 'theme_remui');
        $this->add_setting(
            'color',
            'sitenamecolor',
            $label,
            $panel,
            [
                'help' => get_string('sitenamecolordesc', 'theme_remui'),
                'default' => "#0051F9"
            ]
        );

    }

    private function add_header_hide_show_settings() {
        global $CFG;
        $panel = 'hide-show-menu-item';
        $this->add_panel($panel, get_string($panel, 'theme_remui'), 'header');
        // Hide settings list.
        $settings = [
            'hide-dashboard' => 'myhome',
            'hide-home' => 'home',
            'hide-my-courses' => 'mycourses',
            'hide-site-admin' => 'siteadminnode'
        ];

        foreach ($settings as $name => $target) {
            $label = get_string($name, 'theme_remui');
            $this->add_setting(
                'checkbox',
                $name,
                $label,
                $panel,
                [
                    'help' => get_string($name . '_help', 'theme_remui'),
                    'options' => [
                        'data-target' => $target
                    ]
                ]
            );
        }

        $label = get_string('enablerecentcourses', 'theme_remui');
        $this->add_setting(
            'checkbox',
            'enablerecentcourses',
            $label,
            $panel,
            [
                'help' => get_string('enablerecentcoursesdesc', 'theme_remui'),
                'default' => true
            ]
        );

        $label = get_string('enablecoursecategorymenu', 'theme_remui');
        $this->add_setting(
            'checkbox',
            'enabledisablecoursecategorymenu',
            $label,
            $panel,
            [
                'help' => get_string('enablecoursecategorymenudesc', 'theme_remui'),
                'default' => true
            ]
        );

        $label = get_string("coursecategoriestext", 'theme_remui');
        $name = "coursecategoriestext";
        $this->add_setting(
            'text',
            $name,
            $label,
            $panel,
            [
                'help' => get_string("coursecategoriestextdesc", 'theme_remui'),
                'default' => get_string('coursecategories', 'theme_remui')
            ]
        );

        $this->add_setting(
            'html',
            $name,
            get_string('custommenulinktext', 'theme_remui'),
            $panel,
            [
                'content' => '
                    <div class="apply-smart-color-panel p-3">
                        <div class="notice small-info-regular">
                            '.get_string('custommenulink', 'theme_remui', $CFG->wwwroot).'
                        </div>
                    </div>
                '
            ]
        );

    }
}
