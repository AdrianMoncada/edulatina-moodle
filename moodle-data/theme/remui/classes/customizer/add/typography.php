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
 * Theme customizer typography trait
 *
 * @package   theme_remui
 * @copyright (c) 2023 WisdmLabs (https://wisdmlabs.com/) <support@wisdmlabs.com>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 * @author    Yogesh Shirsath
 */

namespace theme_remui\customizer\add;

trait typography {
    /**
     * Add typography body setting.
     * @return void
     */
    private function add_global_typography_body() {
        global $PAGE;

        // Pass fontselect and fontname setting to js for font validation.
        $PAGE->requires->data_for_js('remuiFontSelect', get_config('theme_remui', 'fontselect'));
        $PAGE->requires->data_for_js('remuiFontName', get_config('theme_remui', 'fontname'));

        $panel = 'typography-body';

        $this->add_root_typography_settings($panel);

        // Show advanced settings text.
        $label = get_string('bodysettingslinking', 'theme_remui');
        $this->add_setting(
            'checkbox',
            'enablebodysettingslinking',
            $label,
            $panel,
            [
                'help' => get_string('bodysettingslinking_help', 'theme_remui'),
                'default' => true
            ]
        );

        $this->add_small_para_font_settings($panel);

        $this->add_small_info_font_settings($panel);

    }

    /**
     * Add global typography settings
     * @return void
     */

    private function add_global_typography_textlink() {

        // Link color.
        $label = get_string('link-color', 'theme_remui');
        $this->add_setting(
            'color',
            'global-typography-body-linkcolor',
            $label,
            'text-link-panel',
            [
                'help' => get_string('link-color_help', 'theme_remui', get_string('site')),
                'default' => $this->get_default_color('link')
            ]
        );

        // Link hover color.
        $label = get_string('link-hover-color', 'theme_remui');
        $this->add_setting(
            'color',
            'global-typography-body-linkhovercolor',
            $label,
            'text-link-panel',
            [
                'help' => get_string('link-hover-color_help', 'theme_remui', get_string('site')),
                'default' => $this->get_default_color('linkhover')
            ]
        );
    }

    /**
     * Add typography small info settings.
     * @param string $panel Panel name.
     * @return void
     */
    private function add_small_info_font_settings($panel) {
        $this->add_setting(
            'heading_start',
            'smallinfo-font',
            get_string('smallinfo-font', 'theme_remui'),
            $panel,
            [
                'collapsed' => true
            ]
        );
        $fonts = $this->get_fonts([
            'inherit' => get_string('inherit', 'theme_remui'),
            'Standard' => 'Standard'
        ]);
        // Font family.
        $label = get_string('font-family', 'theme_remui');
        $this->add_setting(
            'select',
            'global-typography-smallinfo-fontfamily',
            $label,
            $panel,
            [
                'help' => get_string('body-font-family_desc', 'theme_remui'),
                'default' => 'inherit',
                'options' => $fonts
            ]
        );

        // Font size.
        $label = get_string('font-size', 'theme_remui');
        $this->add_setting(
            'number',
            'global-typography-smallinfo-fontsize',
            $label . '(px)',
            $panel,
            [
                'help' => get_string('body-font-size_desc', 'theme_remui'),
                'default' => '12',
                "responsive" => true
            ]
        );

        $weightkeys = ['regular', 'semibold'];
        $weightarr = ['regular' => 400, 'semibold' => 600];
        $label = get_string('heading-adv-setting', 'theme_remui');
        $this->add_setting(
            'checkbox',
            'smallinfo-adv-setting',
            $label,
            $panel,
            [

                'default' => false
            ]
        );
            // Font weight.
        foreach ($weightkeys as $weight) {
            $weightstring = 'heading-'.$weight.'-fontweight';
            $label = get_string($weightstring, 'theme_remui');
            $this->add_setting(
                'select',
                'smallinfo-'.$weight.'-fontweight',
                $label,
                $panel,
                [
                    'help' => get_string('small-info-fontweight_desc', 'theme_remui'),
                    'default' => $weightarr[$weight],
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
        }

        $this->add_setting(
            'html',
            'dividerforsmallinfoweight',
            get_string('other-bg-color', 'theme_remui'),
            $panel,
            [
                'content' => '
                    <hr class="w-50 smallinfo-weight-divider">
                '
            ]
        );

        // Line height.
        $label = get_string('line-height', 'theme_remui');
        $this->add_setting(
            'number',
            'global-typography-smallinfo-lineheight',
            $label,
            $panel,
            [
                'help' => get_string('body-lineheight_desc', 'theme_remui'),
                'default' => '1.571',
                'options' => [
                    'min' => 1,
                    'max' => 5,
                    'step' => 0.01
                ]
            ]
        );

        // Text transform.
        $label = get_string('text-transform', 'theme_remui');
        $this->add_setting(
            'select',
            'global-typography-smallinfo-text-transform',
            $label,
            $panel,
            [
                'help' => get_string('body-text-transform_desc', 'theme_remui'),
                'default' => 'inherit',
                'options' => $this->texttransform
            ]
        );

        // Letter spacing.
        $label = get_string('letter-spacing', 'theme_remui');
        $this->add_setting(
            'number',
            'global-typography-smallinfo-letterspacing',
            $label . ' (rem)',
            $panel,
            [
                'help' => get_string('letter-spacing_help', 'theme_remui', get_string('smallinfo-font', 'theme_remui')),
                'default' => 0,
                'options' => [
                    'min' => 0,
                    'step' => 0.01
                ]
            ]
        );

        $this->add_setting(
            'heading_end',
            'smallinfo-font',
            '',
            $panel
        );
    }

    /**
     * Add typography small para settings.
     *
     * @param string $panel Panel name
     */
    private function add_small_para_font_settings($panel) {
        $this->add_setting(
            'heading_start',
            'smallpara-font',
            get_string('smallpara-font', 'theme_remui'),
            $panel,
            [
                'collapsed' => true
            ]
        );

        // Font family.
        $fonts = $this->get_fonts([
            'inherit' => get_string('inherit', 'theme_remui'),
            'Standard' => 'Standard'
        ]);
        $label = get_string('font-family', 'theme_remui');
        $this->add_setting(
            'select',
            'global-typography-smallpara-fontfamily',
            $label,
            $panel,
            [
                'help' => get_string('body-font-family_desc', 'theme_remui'),
                'default' => 'inherit',
                'options' => $fonts
            ]
        );

        // Font size.
        $label = get_string('font-size', 'theme_remui');
        $this->add_setting(
            'number',
            'global-typography-smallpara-fontsize',
            $label . '(px)',
            $panel,
            [
                'help' => get_string('body-font-size_desc', 'theme_remui'),
                'default' => '14',
                "responsive" => true
            ]
        );

        $weightkeys = ['regular', 'semibold'];
        $weightarr = ['regular' => 400, 'semibold' => 600];
        $label = get_string('heading-adv-setting', 'theme_remui');
        $this->add_setting(
            'checkbox',
            'smallpara-adv-setting',
            $label,
            $panel,
            [

                'default' => false
            ]
        );
            // Font weight.
        foreach ($weightkeys as $weight) {
            $weightstring = 'heading-'.$weight.'-fontweight';
            $label = get_string($weightstring, 'theme_remui');
            $this->add_setting(
                'select',
                'smallpara-'.$weight.'-fontweight',
                $label,
                $panel,
                [
                    'help' => get_string('small-para-fontweight_desc', 'theme_remui'),
                    'default' => $weightarr[$weight],
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
        }

        $this->add_setting(
            'html',
            'dividerforsmallparaweight',
            get_string('other-bg-color', 'theme_remui'),
            $panel,
            [
                'content' => '
                    <hr class="w-50 smallpara-weight-divider">
                '
            ]
        );

        // Line height.
        $label = get_string('line-height', 'theme_remui');
        $this->add_setting(
            'number',
            'global-typography-smallpara-lineheight',
            $label,
            $panel,
            [
                'help' => get_string('body-lineheight_desc', 'theme_remui'),
                'default' => '1.571',
                'options' => [
                    'min' => 1,
                    'max' => 5,
                    'step' => 0.01
                ]
            ]
        );

        // Text transform.
        $label = get_string('text-transform', 'theme_remui');
        $this->add_setting(
            'select',
            'global-typography-smallpara-text-transform',
            $label,
            $panel,
            [
                'help' => get_string('body-text-transform_desc', 'theme_remui'),
                'default' => 'inherit',
                'options' => $this->texttransform
            ]
        );

        // Letter spacing.
        $label = get_string('letter-spacing', 'theme_remui');
        $this->add_setting(
            'number',
            'global-typography-smallpara-letterspacing',
            $label . ' (rem)',
            $panel,
            [
                'help' => get_string('letter-spacing_help', 'theme_remui', get_string('smallpara-font', 'theme_remui')),
                'default' => 0,
                'options' => [
                    'min' => 0,
                    'step' => 0.01
                ]
            ]
        );

        $this->add_setting(
            'heading_end',
            'smallpara-font',
            '',
            $panel
        );
    }

    /**
     * Add typography normal para settings.
     * @param string $panel Panel name
     * @return void
     */
    private function add_root_typography_settings($panel) {
        $fonts = $this->get_fonts([
            'inherit' => get_string('inherit', 'theme_remui'),
            'Standard' => 'Standard'
        ]);

        // Font family.
        $label = get_string('font-family', 'theme_remui');
        $this->add_setting(
            'select',
            'global-typography-body-fontfamily',
            $label,
            $panel,
            [
                'help' => get_string('body-font-family_desc', 'theme_remui'),
                'default' => 'Standard',
                'options' => $fonts
            ]
        );

        // Font size.
        $label = get_string('font-size', 'theme_remui');
        $this->add_setting(
            'number',
            'global-typography-body-fontsize',
            $label . '(px)',
            $panel,
            [
                'help' => get_string('body-font-size_desc', 'theme_remui'),
                'default' => '16',
                "responsive" => true
            ]
        );

        // Font weight.
        $label = get_string('font-weight', 'theme_remui');
        $this->add_setting(
            'select',
            'global-typography-body-fontweight',
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

        // Text transform.
        $label = get_string('text-transform', 'theme_remui');
        $this->add_setting(
            'select',
            'global-typography-body-text-transform',
            $label,
            $panel,
            [
                'help' => get_string('body-text-transform_desc', 'theme_remui'),
                'default' => 'inherit',
                'options' => $this->texttransform
            ]
        );

        // Line height.
        $label = get_string('line-height', 'theme_remui');
        $this->add_setting(
            'number',
            'global-typography-body-lineheight',
            $label,
            $panel,
            [
                'help' => get_string('body-lineheight_desc', 'theme_remui'),
                'default' => '1.571',
                'options' => [
                    'min' => 1,
                    'max' => 5,
                    'step' => 0.01
                ]
            ]
        );

        // Letter spacing.
        $label = get_string('letter-spacing', 'theme_remui');
        $this->add_setting(
            'number',
            'global-typography-body-letterspacing',
            $label . ' (rem)',
            $panel,
            [
                'help' => get_string('letter-spacing_help', 'theme_remui', get_string('body', 'theme_remui')),
                'default' => 0,
                'options' => [
                    'min' => 0,
                    'step' => 0.01
                ]
            ]
        );
    }

    /**
     * Add typography heading settings.
     *
     * @param string $name   Heading name
     * @param string $parent Parent panel name
     * @param array  $config Config for heading
     */
    private function add_global_typography_heading($name, $parent, $config) {

        // Heading.
        $this->add_setting(
            'heading_start',
            $name . '-heading',
            get_string($name . '-heading', 'theme_remui'),
            $parent,
            [
                'collapsed' => $name != 'typography-heading-all'
            ]
        );
        $heading = get_string($name . '-heading', 'theme_remui');

        // Font family.
        $fonts = $this->get_fonts(['inherit' => get_string('inherit', 'theme_remui')]);
        $label = get_string('font-family', 'theme_remui');
        $this->add_setting(
            'select',
            $name . '-fontfamily',
            $label,
            $parent,
            [
                'help' => get_string('font-family_help', 'theme_remui', $heading),
                'default' => 'inherit',
                'options' => $fonts
            ]
        );

        if ($name == 'typography-heading-all') {
            $weightkeys = ['regular', 'semibold', 'bold', 'exbold'];
            $weightarr = ['regular' => 400, 'semibold' => 600, 'bold' => 700, 'exbold' => 800];
            $label = get_string('heading-adv-setting', 'theme_remui');
            $this->add_setting(
                'checkbox',
                'heading-adv-setting',
                $label,
                $parent,
                [

                    'default' => false
                ]
            );
                // Font weight.
            foreach ($weightkeys as $weight) {
                $weightstring = 'heading-'.$weight.'-fontweight';
                $label = get_string($weightstring, 'theme_remui');
                $this->add_setting(
                    'select',
                    'heading-'.$weight.'-fontweight',
                    $label,
                    $parent,
                    [
                        'help' => get_string('heading-fontweight_desc', 'theme_remui'),
                        'default' => $weightarr[$weight],
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
            }
            $this->add_setting(
                'html',
                'dividerforheadingweight',
                get_string('other-bg-color', 'theme_remui'),
                $parent,
                [
                    'content' => '
                        <hr class="w-50 heading-weight-divider">
                    '
                ]
            );
        }
        if ($name != 'typography-heading-all') {
            // Font size.
            $label = get_string('font-size', 'theme_remui');
            $this->add_setting(
                'number',
                $name . '-fontsize',
                $label . ' (rem)',
                $parent,
                [
                    'help' => get_string('font-size_help', 'theme_remui', $heading),
                    'default' => $config['font-size'] / 16,
                    'responsive' => ['tablet' => $config['font-size-tablet'] / 16],
                    'options' => [
                        'min' => 0,
                        'step' => 0.01
                    ]
                ]
            );
        }

        // Text transform.
        $label = get_string('text-transform', 'theme_remui');
        $this->add_setting(
            'select',
            $name . '-text-transform',
            $label,
            $parent,
            [
                'help' => get_string('text-transform_help', 'theme_remui', $heading),
                'default' => 'inherit',
                'options' => $this->texttransform
            ]
        );

        if (!isset($config['disable-lineheight']) || $config['disable-lineheight'] == false) {
            // Line height.
            $label = get_string('line-height', 'theme_remui');
            $this->add_setting(
                'number',
                $name . '-lineheight',
                $label,
                $parent,
                [
                    'help' => get_string('line-height_help', 'theme_remui', $heading),
                    'default' => '',
                    'options' => [
                        'min' => 1,
                        'max' => 5,
                        'step' => 0.01
                    ]
                ]
            );
        }

        if ($name != 'typography-heading-all') {
            // Custom text color.
            $label = get_string('use-custom-color', 'theme_remui');
            $this->add_setting(
                'checkbox',
                $name . '-custom-color',
                $label,
                $parent,
                [
                    'help' => get_string('use-custom-color_help', 'theme_remui', $heading)
                ]
            );
        }

        // Text color.
        $label = get_string('text-color', 'theme_remui');
        $this->add_setting(
            'color',
            $name . '-textcolor',
            $label,
            $parent,
            [
                'help' => get_string('text-color_help', 'theme_remui', $heading),
                'default' => $this->get_default_color('headingstext')
            ]
        );

        // Heading end.
        $this->add_setting(
            'heading_end',
            $name . '-heading-end',
            '',
            $parent
        );
    }

    /**
     * Add global typography settings.
     *
     * @return void
     */
    private function add_global_typography() {
        $this->add_panel('typography', get_string('typography', 'theme_remui'), 'global');

        $this->add_panel('typography-body', get_string('body', 'theme_remui'), 'typography');
        $this->add_global_typography_body();

        $this->add_panel('text-link-panel', get_string('text-link-panel', 'theme_remui'), 'typography');
        $this->add_global_typography_textlink();

        $this->add_panel('typography-heading', get_string('heading', 'theme_remui'), 'typography');
        $headings = [
            'all' => ['disable-lineheight' => true],
            'h1' => ['font-size' => 48, 'font-size-tablet' => 34],
            'h2' => ['font-size' => 34, 'font-size-tablet' => 24],
            'h3' => ['font-size' => 24, 'font-size-tablet' => 20],
            'h4' => ['font-size' => 20, 'font-size-tablet' => 16],
            'h5' => ['font-size' => 16, 'font-size-tablet' => 14],
            'h6' => ['font-size' => 14, 'font-size-tablet' => 12]
        ];
        foreach ($headings as $heading => $config) {
            $this->add_global_typography_heading(
                'typography-heading-' . $heading,
                'typography-heading',
                $config
            );
        }
    }
}
