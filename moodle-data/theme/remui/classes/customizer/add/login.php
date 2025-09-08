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
 * Theme customizer login trait
 *
 * @package   theme_remui
 * @copyright (c) 2023 WisdmLabs (https://wisdmlabs.com/) <support@wisdmlabs.com>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 * @author    Yogesh Shirsath
 */

namespace theme_remui\customizer\add;

trait login {

    /**
     * Add login  settings
     * @return void
     */
    public function add_login_settings() {
        $this->add_panel('login', get_string('login', 'theme_remui'), 'root');
        $this->add_setting(
            'html',
            'smart-colors-panel',
            get_string('currentpallet', 'theme_remui'),
            'login',
            [
                'content' => '
                    <div class="login-page-info-panel p-3 mt-4">
                        <div class="notice small-info-regular">
                            '.get_string('login-page-info', 'theme_remui').'
                        </div>
                    </div>
                '
            ]
        );

        $this->add_login_panel_settings();

        $this->add_login_form_settings();

        $this->add_login_page_settings();

        // $this->add_setting(
        //     'info',
        //     'login-panel',
        //     get_string('login-page-info', 'theme_remui'),
        //     'login'
        // );
    }

    /**
     * Add login panel settings
     *
     * @return void
     */
    private function add_login_panel_settings() {
        // Login panel heading.
        $this->add_setting(
            'heading_start',
            'login-panel',
            get_string('logosettings', 'theme_remui'),
            'login',
            [
                'collapsed' => true
            ]
        );
        // Login panel position.
        $label = get_string('brandlogopos', 'theme_remui');
        $this->add_setting(
            'select',
            'brandlogopos',
            $label,
            'login',
            [
                'help' => get_string('brandlogoposdesc', 'theme_remui'),
                'default' => 1,
                'options' => [
                    0 => get_string('hiddenlogo', 'theme_remui'),
                    1 => get_string('sidebarregionlogo', 'theme_remui'),
                    2 => get_string('maincontentregionlogo', 'theme_remui')
                ]
            ]
        );

        // Logo for login page.
        $label = get_string('logo', 'theme_remui');
        $name = 'loginpanellogo';
        $this->add_setting(
            'file',
            $name,
            $label,
            'login',
            [
                'help' => '<div>Default:' . get_string('loginpanellogodesc', 'theme_remui'). '</div>',
                'get_url' => true,
                'options' => [
                    'subdirs' => 0,
                    'maxfiles' => 1,
                    'accepted_types' => array('web_image')
                ]
            ]
        );

        $this->add_setting(
            'heading_end',
            'login-panel',
            '',
            'login'
        );
    }

    /**
     * Add login form settings
     *
     * @return void
     */
    private function add_login_form_settings() {

        // Login form heading.
        $this->add_setting(
            'heading_start',
            'login-form',
            get_string('loginformsettings', 'theme_remui'),
            'login',
            [
                'collapsed' => true
            ]
        );

        // Login panel position.
        $label = get_string('loginpagelayout', 'theme_remui');
        $this->add_setting(
            'select',
            'loginpagelayout',
            $label,
            'login',
            [
                'help' => get_string('loginpagelayoutdesc', 'theme_remui'),
                'default' => 'loginright',
                'options' => [
                    'logincenter' => get_string('logincenter', 'theme_remui'),
                    'loginleft' => get_string('loginleft', 'theme_remui'),
                    'loginright' => get_string('loginright', 'theme_remui')
                ]
            ]
        );

        // Text color.
        $label = get_string('welcome-text-color', 'theme_remui');
        $this->add_setting(
            'color',
            'loginpaneltextcolor',
            $label,
            'login',
            [
                'help' => get_string('loginpaneltextcolor_help', 'theme_remui'),
                'default' => $this->get_default_color('headingstext')
            ]
        );

        // Content color.
        $label = get_string('text-color', 'theme_remui');
        $this->add_setting(
            'color',
            'loginpanelcontentcolor',
            $label,
            'login',
            [
                'help' => get_string('loginpanelcontentcolor_help', 'theme_remui'),
                'default' => $this->get_default_color('text')
            ]
        );

        // Link color.
        $label = get_string('link-color', 'theme_remui');
        $this->add_setting(
            'color',
            'loginpanellinkcolor',
            $label,
            'login',
            [
                'help' => get_string('loginpanellinkcolor_help', 'theme_remui'),
                'default' => $this->get_default_color('link')
            ]
        );

        // Link color.
        $label = get_string('link-hover-color', 'theme_remui');
        $this->add_setting(
            'color',
            'loginpanellinkhovercolor',
            $label,
            'login',
            [
                'help' => get_string('loginpanellinkhovercolor_help', 'theme_remui'),
                'default' => $this->get_default_color('linkhover')
            ]
        );

        // Background color.
        $label = get_string('loginpanelbackgroundcolor', 'theme_remui');
        $this->add_setting(
            'color',
            'loginpanelbackgroundcolor',
            $label,
            'login',
            [
                'help' => get_string('loginpanelbackgroundcolor_help', 'theme_remui'),
                'default' => $this->get_default_color('white')
            ]
        );

        $this->add_setting(
            'heading_end',
            'login-form',
            '',
            'login'
        );
    }

    /**
     * Add login page settings
     * @return void
     */

    private function add_login_page_settings() {

        $this->add_setting(
            'heading_start',
            'login-page',
            get_string('loginpagesettings', 'theme_remui'),
            'login',
            [
                'collapsed' => true
            ]
        );

        // Login page background color.
        $label = get_string('login-page-setting', 'theme_remui');
        $this->add_setting(
            'select',
            'login-page-setting',
            $label,
            'login',
            [
                'help' => get_string('login-page-background_help', 'theme_remui'),
                'default' => 'image',
                'options' => [
                    'image' => get_string('image', 'theme_remui'),
                    'color' => get_string('color', 'theme_remui'),
                    'gradient' => get_string('gradient', 'theme_remui')
                ]
            ]
        );

        // Background color.
        $label = get_string('loginpagebackgroundcolor', 'theme_remui');
        $this->add_setting(
            'color',
            'loginpagebackgroundcolor',
            $label,
            'login',
            [
                'help' => get_string('loginpagebackgroundcolor_help', 'theme_remui'),
                'default' => $this->get_default_color('bg')
            ]
        );

        // Login page image.
        $name = 'loginsettingpic';
        $label = get_string($name, 'theme_remui');
        $this->add_setting(
            'file',
            $name,
            $label,
            'login',
            [
                'help' => get_string('loginsettingpicdesc', 'theme_remui'),
                'description' => get_string('loginsettingpicdesc', 'theme_remui'),
                'options' => [
                    'subdirs' => 0,
                    'maxfiles' => 1,
                    'accepted_types' => array('web_image')
                ]
            ]
        );

        // Backround opacity.
        $name = 'loginbackgroundopacity';
        $label = get_string($name, 'theme_remui');
        $this->add_setting(
            'range',
            $name,
            $label,
            'login',
            [
                'help' => get_string('loginbackgroundopacity_help', 'theme_remui'),
                'default' => 0.5,
                'options' => [
                    'min' => 0,
                    'max' => 1,
                    'step' => 0.01
                ]
            ]
        );

        // Gradient color 1.
        $label = get_string('login-page-backgroundgradient1', 'theme_remui');
        $this->add_setting(
            'color',
            'login-page-backgroundgradient1',
            $label,
            'login',
            [
                'help' => get_string('gradient-color1_help', 'theme_remui'),
                'default' => $this->get_default_color('bg')
            ]
        );

        // Gradient color 1.
        $label = get_string('login-page-backgroundgradient2', 'theme_remui');
        $this->add_setting(
            'color',
            'login-page-backgroundgradient2',
            $label,
            'login',
            [
                'help' => get_string('gradient-color1_help', 'theme_remui'),
                'default' => $this->get_default_color('white')
            ]
        );

        // Left side content.
        $name = 'brandlogotext';
        $label = get_string($name, 'theme_remui');
        $this->add_setting(
            'htmleditor',
            $name,
            $label,
            'login',
            [
                'options' => [
                    'rows' => 10
                ]
            ]
        );

        // Site description color.
        $label = get_string('signuptextcolor', 'theme_remui');
        $this->add_setting(
            'color',
            'signuptextcolor',
            $label,
            'login',
            [
                'help' => get_string('signuptextcolordesc', 'theme_remui'),
                'default' => $this->get_default_color('text')
            ]
        );

        $this->add_setting(
            'heading_end',
            'login-page',
            '',
            'login'
        );
    }
}
