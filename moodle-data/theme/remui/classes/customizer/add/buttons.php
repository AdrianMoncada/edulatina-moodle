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
 * Theme customizer buttons trait
 *
 * @package   theme_remui
 * @copyright (c) 2023 WisdmLabs (https://wisdmlabs.com/) <support@wisdmlabs.com>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 * @author    Yogesh Shirsath
 */

namespace theme_remui\customizer\add;

trait buttons {

    /**
     * Add global buttons
     */
    private function add_global_buttons() {
        $this->add_panel('buttons', get_string('buttons', 'theme_remui'), 'global');
        $text = [
            'font-size' => 1,
            'font-family' => 'Inherit',
            'font-weight' => 600,
            'text-transform' => 'Inherit',
            'line-height' => 1.214,
            'letter-spacing' => 0
        ];
        $padding = [
            'top' => 0.857,
            'right' => 1.143,
            'bottom' => 0.857,
            'left' => 1.143,
        ];

        // Adding Common Settings.
        $this->add_common_button_settings('common', [
            'border' => [
                'width' => 1.136,
                'radius' => 5
            ],
            'text' => $text,
            'padding' => $padding
        ]);
        $this->add_color_settings();
    }
    /**
     * Add global buttons type (primary, secondary, default)
     *
     * @param string $type    Type of button
     * @param array  $options Button options
     * @return void
     */
    private function add_global_buttons_type($type, $options) {
        $name = 'button-' . $type;
        $this->add_panel($name, get_string($type, 'theme_remui'), 'buttoncolorsettings');
        $panel = get_string($type, 'theme_remui') . ' ' . get_string('buttons', 'theme_remui');
        if (isset($options['color'])) {

            // Text color.
            $label = get_string('text-color', 'theme_remui');
            $this->add_setting(
                'color',
                $name . '-color-text',
                $label,
                $name,
                [
                    'help' => get_string('text-color_help', 'theme_remui', $panel),
                    'default' => $options['color']['text']
                ]
            );

            // Text hover color.
            $label = get_string('text-hover-color', 'theme_remui');
            $this->add_setting(
                'color',
                $name . '-color-text-hover',
                $label,
                $name,
                [
                    'help' => get_string('text-color_help', 'theme_remui', $panel),
                    'default' => $options['color']['texthover']
                ]
            );

            // Spacing.
            $this->add_setting(
                'html',
                $name . 'color-text-spacing',
                '',
                $name,
                [
                    'content' => '
                        <div class="p-1">
                        </div>
                    '
                ]
            );

            // Icon color.
            $label = get_string('icon-color', 'theme_remui');
            $this->add_setting(
                'color',
                $name . '-color-icon',
                $label,
                $name,
                [
                    'help' => get_string('icon-color_help', 'theme_remui', $panel),
                    'default' => $options['color']['icon']
                ]
            );

            // Icon hover color.
            $label = get_string('icon-hover-color', 'theme_remui');
            $this->add_setting(
                'color',
                $name . '-color-icon-hover',
                $label,
                $name,
                [
                    'help' => get_string('icon-color_help', 'theme_remui', $panel),
                    'default' => $options['color']['iconhover']
                ]
            );

            // Spacing.
            $this->add_setting(
                'html',
                $name . 'color-icon-spacing',
                '',
                $name,
                [
                    'content' => '
                        <div class="p-1">
                        </div>
                    '
                ]
            );

            // Background color.
            $label = get_string('background-color', 'theme_remui');
            $this->add_setting(
                'color',
                $name . '-color-background',
                $label,
                $name,
                [
                    'help' => get_string('background-color_help', 'theme_remui', $panel),
                    'default' => $options['color']['background']
                ]
            );

            // Background color.
            $label = get_string('background-hover-color', 'theme_remui');
            $this->add_setting(
                'color',
                $name . '-color-background-hover',
                $label,
                $name,
                [
                    'help' => get_string('background-color_help', 'theme_remui', $panel),
                    'default' => $options['color']['backgroundhover']
                ]
            );
        }

        if (isset($options['border'])) {
            // Spacing.
            $this->add_setting(
                'html',
                $name . 'color-border-spacing',
                '',
                $name,
                [
                    'content' => '
                        <div class="p-1">
                        </div>
                    '
                ]
            );
            if (isset($options['border']['color'])) {
                // Border color.
                $label = get_string('border-color', 'theme_remui');
                $this->add_setting(
                    'color',
                    $name . '-border-color',
                    $label,
                    $name,
                    [
                        'help' => get_string('border-color_help', 'theme_remui', $panel),
                        'default' => $options['border']['color']
                    ]
                );

                // Border Hover Color.
                $label = get_string('border-hover-color', 'theme_remui');
                $this->add_setting(
                    'color',
                    $name . '-border-color-hover',
                    $label,
                    $name,
                    [
                        'help' => get_string('border-color_help', 'theme_remui', $panel),
                        'default' => $options['border']['colorhover']
                    ]
                );
            }
        }

        if (isset($options['text'])) {
            // Text heading start.
            $label = get_string('text', 'theme_remui');
            $this->add_setting(
                'heading_start',
                $name . '-text',
                $label,
                $name
            );

            // Font size.
            $label = get_string('font-size', 'theme_remui');
            $this->add_setting(
                'number',
                $name . '-fontsize',
                $label . ' (rem)',
                $name,
                [
                    'help' => get_string('font-size_help', 'theme_remui', $panel),
                    'default' => $options['text']['font-size'],
                    'options' => [
                        'min' => 0,
                        'step' => 0.01
                    ]
                ]
            );

            // Font weight.
            $label = get_string('font-weight', 'theme_remui');
            $this->add_setting(
                'select',
                $name . '-fontweight',
                $label,
                $name,
                [
                    'help' => get_string('font-weight_help', 'theme_remui', $panel),
                    'default' => $options['text']['font-weight'],
                    'options' => [
                        'default' => get_string('default', 'theme_remui'),
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

            // Line height.
            $label = get_string('line-height', 'theme_remui');
            $this->add_setting(
                'number',
                $name . '-lineheight',
                $label,
                $name,
                [
                    'help' => get_string('line-height_help', 'theme_remui', $panel),
                    'default' => $options['text']['line-height'],
                    'options' => [
                        'min' => 1,
                        'max' => 5,
                        'step' => 0.01
                    ]
                ]
            );

            // Text heading end.
            $label = get_string('text', 'theme_remui');
            $this->add_setting(
                'heading_end',
                $name . '-text-end',
                $label,
                $name
            );
        }

        if (isset($options['padding'])) {
            // Padding start.
            $label = get_string('padding', 'theme_remui');
            $this->add_setting(
                'heading_start',
                $name . '-padding',
                $label,
                $name
            );

            // Padding top.
            $label = get_string('padding-top', 'theme_remui');
            $this->add_setting(
                'number',
                $name . '-padingtop',
                $label . ' (rem)',
                $name,
                [
                    'help' => get_string('padding-top_help', 'theme_remui', $panel),
                    'default' => $options['padding']['top'],
                    'options' => [
                        'min' => 0,
                        'step' => 0.01
                    ]
                ]
            );

            // Padding right.
            $label = get_string('padding-right', 'theme_remui');
            $this->add_setting(
                'number',
                $name . '-padingright',
                $label . ' (rem)',
                $name,
                [
                    'help' => get_string('padding-right_help', 'theme_remui', $panel),
                    'default' => $options['padding']['right'],
                    'options' => [
                        'min' => 0,
                        'step' => 0.01
                    ]
                ]
            );

            // Padding bottom.
            $label = get_string('padding-bottom', 'theme_remui');
            $this->add_setting(
                'number',
                $name . '-padingbottom',
                $label . ' (rem)',
                $name,
                [
                    'help' => get_string('padding-bottom_help', 'theme_remui', $panel),
                    'default' => $options['padding']['bottom'],
                    'options' => [
                        'min' => 0,
                        'step' => 0.01
                    ]
                ]
            );

            // Padding left.
            $label = get_string('padding-left', 'theme_remui');
            $this->add_setting(
                'number',
                $name . '-padingleft',
                $label . ' (rem)',
                $name,
                [
                    'help' => get_string('padding-left_help', 'theme_remui', $panel),
                    'default' => $options['padding']['left'],
                    'options' => [
                        'min' => 0,
                        'step' => 0.01
                    ]
                ]
            );

            // Padding end.
            $label = get_string('padding', 'theme_remui');
            $this->add_setting(
                'heading_end',
                $name . '-padding-end',
                $label,
                $name
            );
        }

    }


    /**
     * Add common button settings
     *
     * @param string $type    Type of button
     * @param array  $options Button options
     * @return void
     */
    private function add_common_button_settings($type, $options) {
        $name = 'button-' . $type;
        $panel = 'commonsettings';
        $this->add_panel($panel, get_string('commonbuttonsettings', 'theme_remui'), 'buttons');
        $this->add_common_font_settings($panel, $name, $options);
        $this->add_button_size_settings();

    }



    /**
     * Add color  settings
     *
     * @param string $type    Type of button
     * @param array  $options Button options
     * @return void
     */
    private function add_color_settings() {
        $panel = 'buttoncolorsettings';
        $this->add_panel($panel, get_string('buttoncolorsettings', 'theme_remui'), 'buttons');
        // Primary.
        $this->add_global_buttons_type('primary', [
            'color' => [
                'text' => $this->get_default_color('primarybuttontext'),
                'texthover' => $this->get_default_color('primarybuttontexthover'),
                'icon' => $this->get_default_color('primarybuttonicon'),
                'iconhover' => $this->get_default_color('primarybuttoniconhover'),
                'background' => $this->get_default_color('primarybuttonbg'),
                'backgroundhover' => $this->get_default_color('primarybuttonbghover'),
            ],
            'border' => [
                'width' => 0.071,
                'color' => $this->get_default_color('primarybuttonborder'),
                'colorhover' => $this->get_default_color('primarybuttonborderhover'),
                'radius' => 0.357
            ]
        ]);
        // Secondary.
        $this->add_global_buttons_type('secondary', [
            'color' => [
                'text' => $this->get_default_color('secondarybuttontext'),
                'texthover' => $this->get_default_color('secondarybuttontexthover'),
                'icon' => $this->get_default_color('secondarybuttonicon'),
                'iconhover' => $this->get_default_color('secondarybuttoniconhover'),
                'background' => $this->get_default_color('secondarybuttonbg'),
                'backgroundhover' => $this->get_default_color('secondarybuttonbghover'),
            ],
            'border' => [
                'width' => 0.071,
                'color' => $this->get_default_color('secondarybuttonborder'),
                'colorhover' => $this->get_default_color('secondarybuttonborderhover'),
                'radius' => 0.357
            ]
        ]);
    }

    /**
     * Add Button Font Settings
     *
     * @param string $type    Type of button
     * @param array  $options Button options
     * @return void
     */
    private function add_common_font_settings($panel, $name, $options) {
        $fontsettingspanel = 'commonfontsettings';
        $this->add_panel($fontsettingspanel, get_string('commonfontsettings', 'theme_remui'), $panel);
            // Font family.
            $fonts = $this->get_fonts([
                'default' => get_string('default', 'theme_remui'),
                'Inherit' => get_string('inherit', 'theme_remui')
            ]);
            $label = get_string('button-font-family', 'theme_remui');
            $this->add_setting(
                'select',
                $name . '-fontfamily',
                $label,
                $fontsettingspanel,
                [
                    'help' => get_string('button-font-family_help', 'theme_remui'),
                    'default' => $options['text']['font-family'],
                    'options' => $fonts
                ]
            );

            // Text transform.
            $label = get_string('button-text-transform', 'theme_remui');
            $this->add_setting(
                'select',
                $name . '-text-transform',
                $label,
                $fontsettingspanel,
                [
                    'help' => get_string('button-text-transform_help', 'theme_remui', $panel),
                    'default' => $options['text']['text-transform'],
                    'options' => $this->texttransform
                ]
            );
    }

    /**
     * Add common button size settings
     *
     * @param string $type    Type of button
     * @param array  $options Button options
     * @return void
     */
    private function add_button_size_all_settings($type, $options) {
        $buttonheading = [
            'sm' => 'Small Button',
            'md' => 'Medium Button',
            'lg' => 'Large Button'
        ];
        $name = 'button-'.$type.'-settings';
        $this->add_panel($name, get_string('buttonsizesettingshead', 'theme_remui', $buttonheading[$type]), 'buttonsizes');
        $panel = 'data';
        if (isset($options['text'])) {
            // Text heading start.
            $label = get_string('text', 'theme_remui');
            $this->add_setting(
            'heading_start',
            $name . '-text',
            $label,
            $name
            );

            // Font size.
            $label = get_string('font-size', 'theme_remui');
            $this->add_setting(
                'number',
                $name . '-fontsize',
                $label . ' (rem)',
                $name,
                [
                    'help' => get_string('font-size_help', 'theme_remui', $buttonheading[$type]),
                    'default' => $options['text']['font-size'],
                    'options' => [
                        'min' => 0,
                        'step' => 0.01
                    ]
                ]
            );

            // Font weight.
            $label = get_string('font-weight', 'theme_remui');
            $this->add_setting(
                'select',
                $name . '-fontweight',
                $label,
                $name,
                [
                    'help' => get_string('font-weight_help', 'theme_remui', $buttonheading[$type]),
                    'default' => $options['text']['font-weight'],
                    'options' => [
                        'default' => get_string('default', 'theme_remui'),
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

            // Line height.
            $label = get_string('line-height', 'theme_remui');
            $this->add_setting(
                'number',
                $name . '-lineheight',
                $label,
                $name,
                [
                    'help' => get_string('line-height_help', 'theme_remui', $buttonheading[$type]),
                    'default' => $options['text']['line-height'],
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
                $name . '-letterspacing',
                $label . ' (rem)',
                $name,
                [
                    'help' => get_string('letter-spacing_help', 'theme_remui', $buttonheading[$type]),
                    'default' => $options['text']['letter-spacing'],
                    'options' => [
                        'min' => 0,
                        'step' => 0.01
                    ]
                ]
            );

            // Text heading end.
            $label = get_string('text', 'theme_remui');
            $this->add_setting(
            'heading_end',
            $name . '-text-end',
            $label,
            $name
            );
        }
        if (isset($options['border'])) {

            $label = get_string('border', 'theme_remui');
            $this->add_setting(
            'heading_start',
            $name . '-text',
            $label,
            $name
            );

            // Border width.
            $label = get_string('border-width', 'theme_remui');
            $this->add_setting(
            'number',
            $name . '-border-width',
            $label . '(px)',
            $name,
            [
                'help' => get_string('border-width_help', 'theme_remui', $buttonheading[$type]),
                'default' => $options['border']['width'],
                'options' => [
                    'min' => 0,
                    'step' => 0.01
                ]
            ]
            );

            // Border radius.
            $label = get_string('border-radius', 'theme_remui');
            $this->add_setting(
                'number',
                $name . '-border-radius',
                $label . '(px)',
                $name,
                [
                    'help' => get_string('border-radius_help', 'theme_remui', $buttonheading[$type]),
                    'default' => $options['border']['radius'],
                    'options' => [
                        'min' => 0,
                        'step' => 0.01
                    ]
                ]
            );

            $label = get_string('border', 'theme_remui');
            $this->add_setting(
            'heading_end',
            $name . '-text-end',
            $label,
            $name
            );
        }

        if (isset($options['padding'])) {
            // Padding start.
            $label = get_string('padding', 'theme_remui');
            $this->add_setting(
            'heading_start',
            $name . '-padding',
            $label,
            $name
            );

            // Padding top.
            $label = get_string('padding-top', 'theme_remui');
            $this->add_setting(
                'number',
                $name . '-padingtop',
                $label . ' (rem)',
                $name,
                [
                    'help' => get_string('padding-top_help', 'theme_remui', $buttonheading[$type]),
                    'default' => $options['padding']['top'],
                    'options' => [
                        'min' => 0,
                        'step' => 0.01
                    ]
                ]
            );

            // Padding right.
            $label = get_string('padding-right', 'theme_remui');
            $this->add_setting(
                'number',
                $name . '-padingright',
                $label . ' (rem)',
                $name,
                [
                    'help' => get_string('padding-right_help', 'theme_remui', $buttonheading[$type]),
                    'default' => $options['padding']['right'],
                    'options' => [
                        'min' => 0,
                        'step' => 0.01
                    ]
                ]
            );

            // Padding bottom.
            $label = get_string('padding-bottom', 'theme_remui');
            $this->add_setting(
                'number',
                $name . '-padingbottom',
                $label . ' (rem)',
                $name,
                [
                    'help' => get_string('padding-bottom_help', 'theme_remui', $buttonheading[$type]),
                    'default' => $options['padding']['bottom'],
                    'options' => [
                        'min' => 0,
                        'step' => 0.01
                    ]
                ]
            );

            // Padding left.
            $label = get_string('padding-left', 'theme_remui');
            $this->add_setting(
                'number',
                $name . '-padingleft',
                $label . ' (rem)',
                $name,
                [
                    'help' => get_string('padding-left_help', 'theme_remui', $buttonheading[$type]),
                    'default' => $options['padding']['left'],
                    'options' => [
                        'min' => 0,
                        'step' => 0.01
                    ]
                ]
            );

            // Padding end.
            $label = get_string('padding', 'theme_remui');
            $this->add_setting(
            'heading_end',
            $name . '-padding-end',
            $label,
            $name
            );
        }
    }

    /**
     * Add common button settings
     *
     * @param string $type    Type of button
     * @param array  $options Button options
     * @return void
     */
    private function add_button_size_settings() {
        $panel = 'buttonsizes';
        $this->add_panel($panel, get_string('buttonsizesettings', 'theme_remui'), 'commonsettings');
        $text = [
            'font-size' => 0.75,
            'font-family' => 'Inherit',
            'font-weight' => 600,
            'text-transform' => 'Inherit',
            'line-height' => 0.938,
            'letter-spacing' => 0
        ];
        $padding = [
            'top' => 0.531,
            'right' => 0.75,
            'bottom' => 0.531,
            'left' => 0.75,
        ];
        $this->add_button_size_all_settings('sm', [
            'border' => [
                'width' => 1.136,
                'radius' => 5
            ],
            'text' => $text,
            'padding' => $padding
        ]);
        $text = [
            'font-size' => 0.875,
            'font-family' => 'Inherit',
            'font-weight' => 600,
            'text-transform' => 'Inherit',
            'line-height' => 1.063,
            'letter-spacing' => 0
        ];
        $padding = [
            'top' => 0.719,
            'right' => 1,
            'bottom' => 0.719,
            'left' => 1,
        ];
        $this->add_button_size_all_settings('md', [
            'border' => [
                'width' => 1.136,
                'radius' => 5
            ],
            'text' => $text,
            'padding' => $padding
        ]);
        $padding = [
            'top' => 0.906,
            'right' => 1,
            'bottom' => 0.906,
            'left' => 1,
        ];
        $this->add_button_size_all_settings('lg', [
            'border' => [
                'width' => 1.136,
                'radius' => 5
            ],
            'text' => $text,
            'padding' => $padding
        ]);
    }
}
