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
 * Theme customizer buttons process trait
 *
 * @package   theme_remui
 * @copyright (c) 2023 WisdmLabs (https://wisdmlabs.com/) <support@wisdmlabs.com>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 * @author    Yogesh Shirsath
 */

namespace theme_remui\customizer\process;

use theme_remui\customizer\color;

trait buttons {
    /**
     * Get heading font to load on page.
     *
     * @param array $fonts Font list.
     *
     * @return void
     */
    private function get_button_fonts(&$fonts) {
        // Primary Font family.
        $font = $this->get_config('button-common-fontfamily');
        $font = strtolower($font) == 'default' ? 'Inter' : $font;
        $fonts[$font] = true;

        // // Secondary Font family.
        // $font = $this->get_config('button-secondary-fontfamily');
        // $font = strtolower($font) == 'default' ? 'Inter' : $font;
        // $fonts[$font] = true;
    }

    /**
     * Process primary buttons
     *
     * @param array $variables Variables list
     */
    private function process_global_buttons_primary(&$variables) {
        $variables['button-primary-color-text'] = $this->get_config('button-primary-color-text');
        $variables['button-primary-color-texthover'] = $this->get_config('button-primary-color-text-hover');
        $variables['button-primary-color-textactive'] = Color::shade($variables['button-primary-color-text'], 41);
        $variables['button-primary-color-icon'] = $this->get_config('button-primary-color-icon');
        $variables['button-primary-color-iconhover'] = $this->get_config('button-primary-color-icon-hover');
        $variables['button-primary-color-iconactive'] = Color::shade($variables['button-primary-color-icon'], 41);
        $variables['button-primary-color-background'] = $this->get_config('button-primary-color-background');
        $variables['button-primary-color-backgroundhover'] = $this->get_config('button-primary-color-background-hover');
        $variables['button-primary-color-backgroundactive'] = Color::shade($variables['button-primary-color-background'], 41);
        $variables['button-primary-border-color'] = $this->get_config('button-primary-border-color');
        $variables['button-primary-border-colorhover'] = $this->get_config('button-primary-border-color-hover');
        $variables['button-primary-border-coloractive'] = Color::shade($variables['button-primary-border-color'], 41);
    }

    /**
     * Process secondary buttons
     *
     * @return array $variables Variables array
     */
    private function process_global_buttons_secondary(&$variables) {
        $variables['button-secondary-color-text'] = $this->get_config('button-secondary-color-text');
        $variables['button-secondary-color-texthover'] = $this->get_config('button-secondary-color-text-hover');
        $variables['button-secondary-color-textactive'] = Color::shade($variables['button-secondary-color-text'], 41);
        $variables['button-secondary-color-icon'] = $this->get_config('button-secondary-color-icon');
        $variables['button-secondary-color-iconhover'] = $this->get_config('button-secondary-color-icon-hover');
        $variables['button-secondary-color-iconactive'] = Color::shade($variables['button-secondary-color-icon'], 41);
        $variables['button-secondary-color-background'] = $this->get_config('button-secondary-color-background');
        $variables['button-secondary-color-backgroundhover'] = $this->get_config('button-secondary-color-background-hover');
        $variables['button-secondary-color-backgroundactive'] = $variables['button-secondary-color-background'];
        $variables['button-secondary-border-color'] = $this->get_config('button-secondary-border-color');
        $variables['button-secondary-border-colorhover'] = $this->get_config('button-secondary-border-color-hover');
        $variables['button-secondary-border-coloractive'] = Color::shade($variables['button-secondary-border-color'], 41);

    }

    /**
     * Process common button properties
     *
     * @return array $variables Variables array
     */
    private function process_common_button_properties(&$variables) {
        // $variables['button-common-border-width'] = $this->get_config('button-common-border-width');
        // $variables['button-common-border-radius'] = $this->get_config('button-common-border-radius');
        $variables['button-common-fontfamily'] = $this->get_config('button-common-fontfamily');
        $variables['button-common-text-transform'] = $this->get_config('button-common-text-transform');
        // $variables['button-common-letterspacing'] = $this->get_config('button-common-letterspacing');
        // $variables['button-common-letterspacing'] = $variables['button-common-letterspacing'] == '' ?
        // 'normal' : $variables['button-common-letterspacing'] . 'rem';
        // Font family.
        if (strtolower($variables['button-common-fontfamily']) == 'default') {
            $variables['button-common-fontfamily'] = 'Inter';
        }
    }

    /**
     * Process sm button properties
     *
     * @return array $variables Variables array
     */
    private function process_sm_properties(&$variables) {
        $variables['button-sm-fontweight'] = $this->get_config('button-sm-settings-fontweight');
        $variables['button-sm-lineheight'] = $this->get_config('button-sm-settings-lineheight');

        // Font size.
        $variables['button-sm-fontsize'] = $this->get_config('button-sm-settings-fontsize');

        // Padding top.
        $variables['button-sm-padingtop'] = $this->get_config('button-sm-settings-padingtop');

        // Padding right.
        $variables['button-sm-padingright'] = $this->get_config('button-sm-settings-padingright');

        // Padding bottom.
        $variables['button-sm-padingbottom'] = $this->get_config('button-sm-settings-padingbottom');

        // Padding left.
        $variables['button-sm-padingleft'] = $this->get_config('button-sm-settings-padingleft');

        $variables['button-sm-border-width'] = $this->get_config('button-sm-settings-border-width');
        $variables['button-sm-border-radius'] = $this->get_config('button-sm-settings-border-radius');
        $variables['button-sm-letterspacing'] = $this->get_config('button-sm-settings-letterspacing');
        $variables['button-sm-letterspacing'] = $variables['button-sm-letterspacing'] == '' ?
        'normal' : $variables['button-sm-letterspacing'] . 'rem';
    }

        /**
         * Process md button properties
         *
         * @return array $variables Variables array
         */
    private function process_md_properties(&$variables) {
        $variables['button-md-fontweight'] = $this->get_config('button-md-settings-fontweight');
        $variables['button-md-lineheight'] = $this->get_config('button-md-settings-lineheight');

        // Font size.
        $variables['button-md-fontsize'] = $this->get_config('button-md-settings-fontsize');

        // Padding top.
        $variables['button-md-padingtop'] = $this->get_config('button-md-settings-padingtop');

        // Padding right.
        $variables['button-md-padingright'] = $this->get_config('button-md-settings-padingright');

        // Padding bottom.
        $variables['button-md-padingbottom'] = $this->get_config('button-md-settings-padingbottom');

        // Padding left.
        $variables['button-md-padingleft'] = $this->get_config('button-md-settings-padingleft');

        $variables['button-md-border-width'] = $this->get_config('button-md-settings-border-width');
        $variables['button-md-border-radius'] = $this->get_config('button-md-settings-border-radius');
        $variables['button-md-letterspacing'] = $this->get_config('button-md-settings-letterspacing');
        $variables['button-md-letterspacing'] = $variables['button-md-letterspacing'] == '' ?
        'normal' : $variables['button-md-letterspacing'] . 'rem';
    }


    /**
     * Process lg button properties
     *
     * @return array $variables Variables array
     */
    private function process_lg_properties(&$variables) {
        $variables['button-lg-fontweight'] = $this->get_config('button-lg-settings-fontweight');
        $variables['button-lg-lineheight'] = $this->get_config('button-lg-settings-lineheight');

        // Font size.
        $variables['button-lg-fontsize'] = $this->get_config('button-lg-settings-fontsize', true);

        // Padding top.
        $variables['button-lg-padingtop'] = $this->get_config('button-lg-settings-padingtop', true);

        // Padding right.
        $variables['button-lg-padingright'] = $this->get_config('button-lg-settings-padingright', true);

        // Padding bottom.
        $variables['button-lg-padingbottom'] = $this->get_config('button-lg-settings-padingbottom', true);

        // Padding left.
        $variables['button-lg-padingleft'] = $this->get_config('button-lg-settings-padingleft', true);

        $variables['button-lg-border-width'] = $this->get_config('button-lg-settings-border-width');
        $variables['button-lg-border-radius'] = $this->get_config('button-lg-settings-border-radius');
        $variables['button-lg-letterspacing'] = $this->get_config('button-lg-settings-letterspacing');
        $variables['button-lg-letterspacing'] = $variables['button-lg-letterspacing'] == '' ?
        'normal' : $variables['button-lg-letterspacing'] . 'rem';

    }

    /**
     * Process global buttons
     *
     * @param array variables Varialbes array
     */
    private function process_global_buttons(&$variables) {
        $this->process_common_button_properties($variables);
        // default styling on buttons
        $this->process_sm_properties($variables);
        $this->process_md_properties($variables);
        $this->process_lg_properties($variables);
        $this->process_global_buttons_primary($variables);
        $this->process_global_buttons_secondary($variables);

    }
}
