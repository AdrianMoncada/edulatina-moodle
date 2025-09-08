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
 * Theme customizer header process trait
 *
 * @package   theme_remui
 * @copyright (c) 2023 WisdmLabs (https://wisdmlabs.com/) <support@wisdmlabs.com>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 * @author    Yogesh Shirsath
 */

namespace theme_remui\customizer\process;

trait header {

    /**
     * Get nav header fonts.
     *
     * @param array $fonts Fonts list
     *
     * @return void
     */
    private function get_header_fonts(&$fonts) {
        $fonts[$this->get_config('hds-menu-font-family')] = true;
    }
    /**
     * Process header
     *
     * @param array variables Varibles array
     */
    private function process_header(&$variables) {

        // Navbar shadow.
        $navbarshadow = $this->get_config('hds-boxshadow-enable');
        $variables['navbar-shadow'] = $navbarshadow ? 'true' : 'false';
        if ($navbarshadow) {
            $variables['navbar-shadow-size'] = $this->get_config('header-primary-border-bottom-size').'rem';
            $variables['navbar-shadow-blur'] = $this->get_config('header-primary-border-bottom-blur').'rem';
            $variables['navbar-shadow-color'] = $this->get_config('header-primary-border-bottom-color');
        }

        $fontsize = $this->get_config('header-site-identity-fontsize', true);
        $variables['navbar-logo-text-size'] = $fontsize['default']."rem";
        $variables['navbar-logo-text-size-tablet'] = $fontsize['tablet']."rem";

        $variables['navbar-logo-bg-color'] = $this->get_config('logo-bg-color');

        $variables['hide-dashboard'] = $this->get_config('hide-dashboard') ? 'none' : 'block';
        $variables['hide-home'] = $this->get_config('hide-home') ? 'none' : 'block';
        $variables['hide-my-courses'] = $this->get_config('hide-my-courses') ? 'none' : 'block';
        $variables['hide-site-admin'] = $this->get_config('hide-site-admin') ? 'none' : 'block';
        $variables['show-recentcourses'] = $this->get_config('enablerecentcourses') ? 'block' : 'none';
        $variables['show-coursecat'] = $this->get_config('enabledisablecoursecategorymenu') ? 'block' : 'none';
        $bgcolor = $this->get_config('header-menu-background-color');
        // Had no option but to use core get_config function here.
        if ($this->get_config('navbarinverse')) {
            $bgcolor = $this->get_config('logo-bg-color');
        }

        $variables['navbar-background-color'] = $bgcolor;
        $variables['header-menu-element-bg-color'] = $this->get_config('header-menu-element-bg-color');
        $variables['header-menu-divider-bg-color'] = $this->get_config('header-menu-divider-bg-color');
        $variables['hds-icon-color'] = $this->get_config('hds-icon-color');
        $variables['hds-icon-hover-color'] = $this->get_config('hds-icon-hover-color');
        $variables['hds-icon-active-color'] = $this->get_config('hds-icon-active-color');
        $variables['hds-menu-font-family'] = $this->get_config('hds-menu-font-family');
        $variables['hds-menu-fontsize'] = $this->get_config('hds-menu-fontsize');
        $variables['hds-menu-text-transform'] = $this->get_config('hds-menu-text-transform');
        $variables['hds-menu-letter-spacing'] = $this->get_config('hds-menu-letter-spacing');
        $variables['hds-menu-letter-spacing'] .= $variables['hds-menu-letter-spacing'] == 0 ? '' : 'rem';
        $variables['hds-menu-fontweight'] = $this->get_config('hds-menu-fontweight');
        $variables['header-menu-text-color'] = $this->get_config('header-menu-text-color');
        $variables['header-menu-text-hover-color'] = $this->get_config('header-menu-text-hover-color');
        $variables['header-menu-text-active-color'] = $this->get_config('header-menu-text-active-color');
    }
}
