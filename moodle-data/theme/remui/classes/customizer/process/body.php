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
 * Theme customizer body process trait
 *
 * @package   theme_remui
 * @copyright (c) 2023 WisdmLabs (https://wisdmlabs.com/) <support@wisdmlabs.com>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 * @author    Yogesh Shirsath
 */

namespace theme_remui\customizer\process;

trait body {

    /**
     * Get global font name.
     * @param array fonts Fonts list.
     */
    public function get_global_font(&$fonts) {
        $fonts[$this->get_body_font()] = true;
        if ($this->get_config('enablebodysettingslinking')) {
            return;
        }
        $fontfamily = $this->get_config('global-typography-smallpara-fontfamily');
        $fontfamily = $fontfamily == 'Standard' ? 'Inter' : $fontfamily;
        $fonts[$fontfamily] = true;
        $fontfamily = $this->get_config('global-typography-smallinfo-fontfamily');
        $fontfamily = $fontfamily == 'Standard' ? 'Inter' : $fontfamily;
        $fonts[$fontfamily] = true;
    }

    /**
     * Get body font based on customizer and remui settings.
     *
     * @return string font name.
     */
    public function get_body_font() {
        $fontfamily = $this->get_config('global-typography-body-fontfamily');
        $fontselect = get_config('theme_remui', 'fontselect');
        $fontname = get_config('theme_remui', 'fontname');
        if (strtolower($fontfamily ?? '') == 'inherit' || strtolower($fontfamily ?? '') == 'standard') {
            if ($fontselect == 1) {
                return 'Inter';
            }
            if ($fontname == '') {
                return 'Inter';
            }
            return $fontname;
        }
        return $fontfamily;
    }

    /**
     * Get global body settings.
     *
     * @return array
     */
    private function get_global_body_settings() {
        $fontfamily = $this->get_body_font();
        if ($fontfamily != '') {
            $fontfamily .= ', ';
        }
        $fontfamily .= $this->get_font_fallback();
        $fontsize = $this->get_config('global-typography-body-fontsize', true);
        if (!isset($fontsize['default']) || $fontsize['default'] == '' || $fontsize['default'] <= 0) {
            $fontsize['default'] = 16;
        }
        if (!isset($fontsize['tablet']) || $fontsize['tablet'] == '' || $fontsize['tablet'] <= 0) {
            $fontsize['tablet'] = $fontsize['default'];
        }
        if (!isset($fontsize['mobile']) || $fontsize['mobile'] == '' || $fontsize['mobile'] <= 0) {
            $fontsize['mobile'] = $fontsize['default'];
        }
        $letterspacing = $this->get_config('global-typography-body-letterspacing');
        if ($letterspacing == '') {
            $letterspacing = 0;
        }
        return [
            'fontfamily' => $fontfamily,
            'fontsize' => $this->get_config('global-typography-body-fontsize', true),
            'fontweight' => $this->get_config('global-typography-body-fontweight'),
            'lineheight' => $this->get_config('global-typography-body-lineheight'),
            'texttransform' => $this->get_config('global-typography-body-text-transform'),
            'letterspacing' => $letterspacing
        ];
    }

    /**
     * Process body styling.
     *
     * @param array $variables Variables array
     */
    private function process_global_body(&$variables) {
        $settings = $this->get_global_body_settings();

        // Font family.
        $variables['font-family-base'] = $settings['fontfamily'];

        // Font size.
        $defaultfontsize = 16;
        $fontsize = $settings['fontsize'];
        $variables['font-size-base'] = $fontsize['default'] / $defaultfontsize . 'rem';

        // Font size tablet.
        $variables['font-size-tablet-base'] = $fontsize['tablet'] / $defaultfontsize . 'rem';

        // Font size mobile.
        $variables['font-size-mobile-base'] = $fontsize['mobile'] / $defaultfontsize . 'rem';

        // Font weight.
        $variables['font-weight-base'] = $settings['fontweight'];

        // Line height.
        $variables['line-height-base'] = $settings['lineheight'];

        // Text transform.
        $variables['body-text-transform'] = $settings['texttransform'];

        // Letter spacing.
        $variables['body-letterspacing'] = $settings['letterspacing'] . 'rem';
    }

    /**
     * Process small paragraph styling.
     *
     * @param array $variables Variables array
     */
    private function process_global_small_para(&$variables) {
        $global = $this->get_global_body_settings();
        $difference = 2;
        $defaultfontsize = 16;
        $semibolddiffernece = 200;
        $settings = [];
        if ($this->get_config('enablebodysettingslinking')) {
            $semiboldfontweight = $global['fontweight'] + $semibolddiffernece;
            if ($global['fontweight'] >= 800) {
                $semiboldfontweight = 900;
            }
            $settings = [
                'fontsize' => [
                    'default' => $global['fontsize']['default'] - $difference,
                    'tablet' => $global['fontsize']['tablet'] - $difference,
                    'mobile' => $global['fontsize']['mobile'] - $difference
                ],
                'fontfamily' => 'Inherit',
                'lineheight' => $global['lineheight'],
                'texttransform' => 'Inherit',
                'letterspacing' => $global['letterspacing'],
                'regularweight' => $global['fontweight'],
                'semiboldweight' => $semiboldfontweight,

            ];
        } else {
            // Font family.
            $fontfamily = $this->get_config('global-typography-smallpara-fontfamily');
            if (strtolower($fontfamily) == 'standard') {
                $fontfamily = 'Inter';
            }
            $fontsize = $this->get_config('global-typography-smallpara-fontsize', true);
            if (!isset($fontsize['default']) || $fontsize['default'] == '' || $fontsize['default'] <= 0) {
                $fontsize['default'] = 14;
            }
            if (!isset($fontsize['tablet']) || $fontsize['tablet'] == '' || $fontsize['tablet'] <= 0) {
                $fontsize['tablet'] = $fontsize['default'];
            }
            if (!isset($fontsize['mobile']) || $fontsize['mobile'] == '' || $fontsize['mobile'] <= 0) {
                $fontsize['mobile'] = $fontsize['default'];
            }

            $letterspacing = $this->get_config('global-typography-smallpara-letterspacing');
            if ($letterspacing == '') {
                $letterspacing = 0;
            }
            $settings = [
                'fontsize' => $fontsize,
                'fontfamily' => $fontfamily,
                'lineheight' => $this->get_config('global-typography-smallpara-lineheight'),
                'texttransform' => $this->get_config('global-typography-smallpara-text-transform'),
                'letterspacing' => $letterspacing,
                'regularweight' => $this->get_config('smallpara-regular-fontweight'),
                'semiboldweight' => $this->get_config('smallpara-semibold-fontweight'),
            ];
        }
        // Font family.
        $variables['smallpara-family'] = $settings['fontfamily'];

        // Font size.
        $variables['smallpara-font-size'] = $settings['fontsize']['default'] / $defaultfontsize . 'rem';

        // Font size tablet.
        $variables['smallpara-font-size-tablet'] = $settings['fontsize']['tablet'] / $defaultfontsize . 'rem';

        // Font size mobile.
        $variables['smallpara-font-size-mobile'] = $settings['fontsize']['mobile'] / $defaultfontsize . 'rem';

        // Line height.
        $variables['smallpara-line-height'] = $settings['lineheight'];

        // Text transform.
        $variables['smallpara-text-transform'] = $settings['texttransform'];

        // Letter spacing.
        $variables['smallpara-letterspacing'] = $settings['letterspacing'] . 'rem';

        if ($this->get_config("smallpara-adv-setting")) {
            // Para-regular-1
            $variables['smallpara-regular-weight'] = $settings['regularweight'];

            // Para-semibold-1
            $variables['smallpara-semibold-weight'] = $settings['semiboldweight'];
        } else {
            $variables['smallpara-regular-weight'] = 400;

            // Para-semibold-1
            $variables['smallpara-semibold-weight'] = 600;
        }

    }

    /**
     * Process small paragraph styling.
     *
     * @param array $variables Variables array
     */
    private function process_global_small_info(&$variables) {
        $global = $this->get_global_body_settings();
        $difference = 4;
        $defaultfontsize = 16;
        $semibolddiffernece = 200;
        $settings = [];
        if ($this->get_config('enablebodysettingslinking')) {
            $semiboldfontweight = $global['fontweight'] + $semibolddiffernece;
            if ($global['fontweight'] >= 800) {
                $semiboldfontweight = 900;
            }
            $settings = [
                'fontsize' => [
                    'default' => $global['fontsize']['default'] - $difference,
                    'tablet' => $global['fontsize']['tablet'] - $difference,
                    'mobile' => $global['fontsize']['mobile'] - $difference
                ],
                'fontfamily' => 'Inherit',
                'lineheight' => $global['lineheight'],
                'texttransform' => 'Inherit',
                'letterspacing' => $global['letterspacing'],
                'regularweight' => $global['fontweight'],
                'semiboldweight' => $semiboldfontweight ,

            ];
        } else {
            // Font family.
            $fontfamily = $this->get_config('global-typography-smallinfo-fontfamily');
            if (strtolower($fontfamily) == 'standard') {
                $fontfamily = 'Inter';
            }
            $fontsize = $this->get_config('global-typography-smallinfo-fontsize', true);
            if (!isset($fontsize['default']) || $fontsize['default'] == '' || $fontsize['default'] <= 0) {
                $fontsize['default'] = 12;
            }
            if (!isset($fontsize['tablet']) || $fontsize['tablet'] == '' || $fontsize['tablet'] <= 0) {
                $fontsize['tablet'] = $fontsize['default'];
            }
            if (!isset($fontsize['mobile']) || $fontsize['mobile'] == '' || $fontsize['mobile'] <= 0) {
                $fontsize['mobile'] = $fontsize['default'];
            }
            $letterspacing = $this->get_config('global-typography-smallpara-letterspacing');
            if ($letterspacing == '') {
                $letterspacing = 0;
            }

            $settings = [
                'fontsize' => $fontsize,
                'fontfamily' => $fontfamily,
                'lineheight' => $this->get_config('global-typography-smallinfo-lineheight'),
                'texttransform' => $this->get_config('global-typography-smallinfo-text-transform'),
                'letterspacing' => $this->get_config('global-typography-smallinfo-letterspacing'),
                'regularweight' => $this->get_config('smallinfo-regular-fontweight'),
                'semiboldweight' => $this->get_config('smallinfo-semibold-fontweight'),
            ];
        }
        // Font family.
        $variables['smallinfo-family'] = $settings['fontfamily'];

        // Font size.
        $variables['smallinfo-font-size'] = $settings['fontsize']['default'] / $defaultfontsize . 'rem';

        // Font size tablet.
        $variables['smallinfo-font-size-tablet'] = $settings['fontsize']['tablet'] / $defaultfontsize . 'rem';

        // Font size mobile.
        $variables['smallinfo-font-size-mobile'] = $settings['fontsize']['mobile'] / $defaultfontsize . 'rem';

        // Line height.
        $variables['smallinfo-line-height'] = $settings['lineheight'];

        // Text transform.
        $variables['smallinfo-text-transform'] = $settings['texttransform'];

        // Letter spacing.
        $variables['smallinfo-letterspacing'] = $settings['letterspacing'] . 'rem';

        if ($this->get_config("smallinfo-adv-setting")) {
            // Para-regular-1
            $variables['smallinfo-regular-weight'] = $settings['regularweight'];

            // Para-semibold-1
            $variables['smallinfo-semibold-weight'] = $settings['semiboldweight'];
        } else {
            // Para-regular-1
            $variables['smallinfo-regular-weight'] = $settings['regularweight'];

            // Para-semibold-1
            $variables['smallinfo-semibold-weight'] = $settings['semiboldweight'];
        }

    }

    /**
     * Process global base
     *
     * @param array variables Varibles array
     */
    private function process_global_base(&$variables) {
        $this->process_global_body($variables);
        $this->process_global_small_para($variables);
        $this->process_global_small_info($variables);
    }
}
