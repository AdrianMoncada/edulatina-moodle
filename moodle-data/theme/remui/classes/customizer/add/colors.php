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
 * Theme customizer colors trait
 *
 * @package   theme_remui
 * @copyright (c) 2023 WisdmLabs (https://wisdmlabs.com/) <support@wisdmlabs.com>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 * @author    Yogesh Shirsath
 */

namespace theme_remui\customizer\add;

trait colors {

    /**
     * Add global color settings.
     *
     * @return void
     */
    private function add_theme_colors() {
        $panel = 'themecolors';
        $this->add_panel('themecolors', get_string('themecolors', 'theme_remui'), 'global');

        $this->add_brand_colors_settings($panel);

        $this->add_background_settings($panel);

        $this->add_borders_settings($panel);

    }

    /**
     * Add borders settings.
     * @param string $panel Panel id
     * @return void
     */
    private function add_borders_settings($panel) {
        $this->add_setting(
            'heading_start',
            'borders-heading',
            get_string('borderssettings', 'theme_remui'),
            $panel,
            [
                'collapsed' => true
            ]
        );

        // Light border color.
        $label = get_string('light-border-color', 'theme_remui');
        $name = 'themecolors-lightbordercolor';
        $this->add_setting(
            'color',
            $name,
            $label,
            $panel,
            [
                'help' => get_string('themecolors-lightbordercolor_help', 'theme_remui'),
                'default' => $this->get_default_color('lightborder')
            ]
        );

        // Medium border color.
        $label = get_string('medium-border-color', 'theme_remui');
        $name = 'themecolors-mediumbordercolor';
        $this->add_setting(
            'color',
            $name,
            $label,
            $panel,
            [
                'help' => get_string('themecolors-mediumbordercolor_help', 'theme_remui'),
                'default' => $this->get_default_color('border')
            ]
        );

        $this->add_setting(
            'heading_end',
            'borders-heading',
            '',
            $panel
        );
    }

    /**
     * Add background settings.
     * @param string $panel Panel id
     * @return void
     */
    private function add_background_settings($panel) {
        $this->add_setting(
            'heading_start',
            'background-heading',
            get_string('backgroundsettings', 'theme_remui'),
            $panel,
            [
                'collapsed' => true
            ]
        );

        // Page background color.
        $label = get_string('page-background', 'theme_remui');
        $backgroundselector = 'global-colors-pagebackground';
        $this->add_setting(
            'select',
            $backgroundselector,
            $label,
            $panel,
            [
                'help' => get_string('page-background_help', 'theme_remui'),
                'default' => 'color',
                'options' => [
                    'color' => get_string('color', 'theme_remui'),
                    'gradient' => get_string('gradient', 'theme_remui'),
                    'image' => get_string('image', 'theme_remui')
                ]
            ]
        );

        // Background color.
        $label = get_string('page-background-color', 'theme_remui');
        $name = 'global-colors-pagebackgroundcolor';
        $this->add_setting(
            'color',
            $name,
            $label,
            $panel,
            [
                'help' => get_string('page-background-color_help', 'theme_remui'),
                'default' => $this->get_default_color('bg')
            ]
        );

        // Gradient color 1.
        $label = get_string('gradient-color1', 'theme_remui');
        $name = 'global-colors-pagebackgroundgradient1';
        $this->add_setting(
            'color',
            'global-colors-pagebackgroundgradient1',
            $label,
            $panel,
            [
                'help' => get_string('gradient-color1_help', 'theme_remui'),
                'default' => $this->get_default_color('bg')
            ]
        );

        // Gradient color 2.
        $label = get_string('gradient-color2', 'theme_remui');
        $name = 'global-colors-pagebackgroundgradient2';
        $this->add_setting(
            'color',
            'global-colors-pagebackgroundgradient2',
            $label,
            $panel,
            [
                'help' => get_string('gradient-color2_help', 'theme_remui'),
                'default' => $this->get_default_color('bg')
            ]
        );

        // Gradient angle.
        // line height.
        $label = get_string('gradient-color-angle', 'theme_remui');
        $this->add_setting(
            'number',
            'global-colors-gradient-angle',
            $label,
            $panel,
            [
                'help' => get_string('gradient-color-angle_help', 'theme_remui'),
                'default' => 100,
                'options' => [
                    'min' => 0,
                    'max' => 360,
                    'step' => 5
                ]
            ]
        );

        // Background image.
        $label = get_string('page-background-image', 'theme_remui');
        $name = 'global-colors-pagebackgroundimage';
        $this->add_setting(
            'file',
            $name,
            $label,
            $panel,
            [
                'help' => get_string('page-background-image_help', 'theme_remui'),
                'get_url' => true,
                'options' => [
                    'subdirs' => 0,
                    'maxfiles' => 1,
                    'accepted_types' => array('web_image')
                ]
            ]
        );

        // Background image attachment.
        $label = get_string('page-background-imageattachment', 'theme_remui');
        $name = 'global-colors-pagebackgroundimageattachment';
        $this->add_setting(
            'select',
            $name,
            $label,
            $panel,
            [
                'help' => get_string('page-background-imageattachment_help', 'theme_remui'),
                'default' => 'scroll',
                'options' => [
                    'scroll' => 'Scroll',
                    'fixed' => 'Fixed',
                ]
            ]
        );

        $this->add_setting(
            'html',
            'other-bg-color',
            get_string('other-bg-color', 'theme_remui'),
            $panel,
            [
                'content' => '
                    <h6 class="h-semibold-6">'.get_string('other-bg-color', 'theme_remui').'</h6>
                '
            ]
        );

        // Ascent background color.
        $label = get_string('ascent-background-color', 'theme_remui');
        $name = 'global-colors-ascentbackgroundcolor';
        $this->add_setting(
            'color',
            $name,
            $label,
            $panel,
            [
                'help' => get_string('ascent-background-color_help', 'theme_remui'),
                'default' => $this->get_default_color('ascentbg')
            ]
        );

        // Element background color.
        $label = get_string('element-background-color', 'theme_remui');
        $name = 'global-colors-elementbackgroundcolor';
        $this->add_setting(
            'color',
            $name,
            $label,
            $panel,
            [
                'help' => get_string('element-background-color_help', 'theme_remui'),
                'default' => $this->get_default_color('elementbg')
            ]
        );

        $this->add_setting(
            'heading_end',
            'background-heading',
            '',
            $panel
        );
    }

    /**
     * Add brand color settings.
     * @param string $panel Panel id
     * @return void
     */
    private function add_brand_colors_settings($panel) {
        $this->add_setting(
            'heading_start',
            'brandcolors-heading',
            get_string('brandcolors-heading', 'theme_remui'),
            $panel,
            [
                'collapsed' => false
            ]
        );

        // Primary color.
        $label = get_string('primary-color', 'theme_remui');
        $this->add_setting(
            'color',
            'sitecolorhex',
            $label,
            $panel,
            [
                'help' => get_string('primary-color_help', 'theme_remui'),
                'default' => $this->get_default_color('primary')
            ]
        );

        // Secondary color.
        $label = get_string('secondary-color', 'theme_remui');
        $this->add_setting(
            'color',
            'secondarycolor',
            $label,
            $panel,
            [
                'help' => get_string('secondary-color_help', 'theme_remui'),
                'default' => $this->get_default_color('secondary')
            ]
        );

        // Text color.
        $label = get_string('text-color', 'theme_remui');
        $this->add_setting(
            'color',
            'themecolors-textcolor',
            $label,
            $panel,
            [
                'help' => get_string('text-color_help', 'theme_remui', get_string('site')),
                'default' => $this->get_default_color('text')
            ]
        );

        // Border color.
        $label = get_string('border-color', 'theme_remui');
        $this->add_setting(
            'color',
            'themecolors-bordercolor',
            $label,
            $panel,
            [
                'help' => get_string('border-color_help', 'theme_remui', get_string('site')),
                'default' => $this->get_default_color('border')
            ]
        );

        $this->add_setting(
            'html',
            'smart-colors-panel',
            get_string('currentpallet', 'theme_remui'),
            $panel,
            [
                'content' => '
                    <div class="apply-smart-color-panel p-3">
                        <h6 class="h-bold-6 mb-2">'.get_string('smart-colors-heading', 'theme_remui').'</h6>
                        <div class="notice small-info-regular">
                            '.get_string('smart-colors-info', 'theme_remui').'
                        </div>
                        <button type="button" name="smart-colors-button" id="id_smart-colors-button" class="btn btn-primary btn-sm">'.get_string('apply', 'theme_remui').'</button>
                    </div>
                '
            ]
        );


        // $this->add_setting(
        //     'heading',
        //     'smart-colors-heading',
        //     get_string('smart-colors-heading', 'theme_remui'),
        //     $panel
        // );

        // $this->add_setting(
        //     'info',
        //     'smart-colors-info',
        //     get_string('smart-colors-info', 'theme_remui'),
        //     $panel
        // );

        // $this->add_setting(
        //     'button',
        //     'smart-colors-button',
        //     get_string('apply', 'theme_remui'),
        //     $panel,
        //     [
        //         'options' => [
        //             'class' => 'btn btn-primary btn-sm'
        //         ]
        //     ]
        // );

        $this->add_setting(
            'heading_end',
            'brandcolors-heading',
            '',
            $panel
        );
    }
}
