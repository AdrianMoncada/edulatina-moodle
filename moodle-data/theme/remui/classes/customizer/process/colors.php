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
 * Theme customizer colors process trait
 *
 * @package   theme_remui
 * @copyright (c) 2023 WisdmLabs (https://wisdmlabs.com/) <support@wisdmlabs.com>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 * @author    Yogesh Shirsath
 */

namespace theme_remui\customizer\process;

use theme_remui\customizer\color;

trait colors {
    /**
     * Process global colors
     *
     * @param array variables Varibles array
     */
    private function process_global_colors(&$variables) {
        $variables['brand-primary'] = $this->get_site_primary_color();
        $variables['brand-secondary'] = $this->get_config('secondarycolor');
        $variables['body-color'] = $this->get_config('themecolors-textcolor');
        $variables['smallinfo-text-color'] = Color::tint($variables['body-color'], 14);
        $variables['paragraph-color'] = $variables['body-color'];
        $attachment = 'null';

        switch ($this->get_config('global-colors-pagebackground')) {
            case 'color':
                $bodybg = $this->get_config('global-colors-pagebackgroundcolor');
                break;
            case 'gradient':
                $color1 = $this->get_config('global-colors-pagebackgroundgradient1');
                $color2 = $this->get_config('global-colors-pagebackgroundgradient2');
                $angle = $this->get_config('global-colors-gradient-angle');
                $bodybg = "linear-gradient(" . $angle . "deg, $color1, $color2)";
                break;
            case 'image':
                $image = $this->get_config('global-colors-pagebackgroundimage');
                $attachment = $this->get_config('global-colors-pagebackgroundimageattachment');
                $bodybg = "url('$image')";
                break;
            default:
                $bodybg = $this->get_default_color('bg');
                break;
        }

        $variables['body-background'] = $bodybg;
        $variables['body-bg-attachment'] = $attachment;

        // Ascent bg.
        $variables['ascent-bg-color'] = $this->get_config('global-colors-ascentbackgroundcolor');
        // Small UI Element bg.
        $variables['bg-small-ui'] = $this->get_config('global-colors-elementbackgroundcolor');

        // Link color.
        $color = $this->get_config('global-typography-body-linkcolor');
        $variables['link-color'] = $color;

        // Link hover color.
        $hovercolor = $this->get_config('global-typography-body-linkhovercolor');
        $variables['link-hover-color'] = $hovercolor;

        // Light Border color.
        $lightborder = $this->get_config('themecolors-lightbordercolor');
        $variables['light-border'] = $lightborder;

        // Medium Border color.
        $lightborder = $this->get_config('themecolors-mediumbordercolor');
        $variables['medium-border'] = $lightborder;
    }
}
