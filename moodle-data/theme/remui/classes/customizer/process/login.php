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
 * Theme customizer login process trait
 *
 * @package   theme_remui
 * @copyright (c) 2023 WisdmLabs (https://wisdmlabs.com/) <support@wisdmlabs.com>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 * @author    Yogesh Shirsath
 */

namespace theme_remui\customizer\process;

trait login {
    /**
     * Process login settings
     *
     * @param string $css css content
     * @return string processed css conent
     */
    private function process_login(&$variables) {

        // Login page background opacity.
        // $opacity = $this->get_config('loginbackgroundopacity');
        // $css = str_replace('"[[setting:loginbackgroundopacity]]"', "rgba(0, 0, 0, {$opacity})", $css);

        // // Login panel background color.
        // $color = $this->get_config('loginpanelbackgroundcolor');
        // $css = str_replace('"[[setting:loginpanelbackgroundcolor]]"', $color, $css);

        // Set login background.
        $loginbgsetting = $this->get_config('login-page-setting');
        $variables['login-page-opacity'] = 'null';
        switch ($loginbgsetting){
            case 'image':
                $loginbg = \theme_remui\toolbox::setting_file_url('loginsettingpic', 'loginsettingpic');
                $loginopacity = $this->get_config('loginbackgroundopacity');
                $variables['login-page-opacity'] = $loginopacity;
                if (empty($loginbg)) {
                    $loginbg = \theme_remui\toolbox::image_url('login_bg', 'theme');
                }
                $loginbg = "url('$loginbg')";
                break;
            case 'gradient':
                $color1 = $this->get_config('login-page-backgroundgradient1');
                $color2 = $this->get_config('login-page-backgroundgradient2');
                $loginbg = "linear-gradient($color1, $color2)";
                break;
            // Case 'color' by default.
            default:
                $loginbg = $this->get_config('loginpagebackgroundcolor');
        }
        $variables['login-page-background'] = $loginbg;

        // login form background color
        $variables['login-container-bg'] = $this->get_config('loginpanelbackgroundcolor');

        // Login panel text color.
        $variables['loginpaneltextcolor'] = $this->get_config('loginpaneltextcolor');

        // Login panel content color.
        $variables['loginpanelcontentcolor']  = $this->get_config('loginpanelcontentcolor');

        // Login panel link color.
        $variables['loginpanellinkcolor'] = $this->get_config('loginpanellinkcolor');

        // Login panel link hover color.
        $variables['loginpanellinkhovercolor']  = $this->get_config('loginpanellinkhovercolor');

    }
}
