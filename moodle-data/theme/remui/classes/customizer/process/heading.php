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
 * Theme customizer heading process trait
 *
 * @package   theme_remui
 * @copyright (c) 2023 WisdmLabs (https://wisdmlabs.com/) <support@wisdmlabs.com>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 * @author    Yogesh Shirsath
 */

namespace theme_remui\customizer\process;

trait heading {

    /**
     * Get heading font to load on page.
     *
     * @param array $fonts Font list.
     *
     * @return void
     */
    private function get_heading_fonts(&$fonts) {
        $headings = ['all', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
        foreach ($headings as $heading) {
            $fontfamily = $this->get_config("typography-heading-{$heading}-fontfamily");
            if (strtolower($fontfamily) == 'standard') {
                $fontfamily = 'Inter';
            }
            if (strtolower($fontfamily) != 'inherit') {
                $fonts[$fontfamily] = true;
            }
        }
    }

    /**
     * Process heading tag
     *
     * @param string heading   Heading type
     * @param array  variables Varibles array
     */
    private function process_heading($heading, &$variables) {

        // Font family.
        $fontfamily = $this->get_config("typography-heading-{$heading}-fontfamily");
        if (strtolower($fontfamily) == 'inherit') {
            $fontfamily = $this->get_config("typography-heading-all-fontfamily");
        }
        if (strtolower($fontfamily) == 'standard') {
            $fontfamily = 'Inter';
        }
        $variables['heading-' . $heading . '-font'] = $fontfamily;

        // Font size.
        $fontsize = $this->get_config("typography-heading-{$heading}-fontsize", true);
        [$fontsize] = $this->validate_responsive_sizes([$fontsize]);
        $variables["heading-{$heading}-fontsize"] = $fontsize['default'];
        // Font size tablet.
        $variables["heading-{$heading}-fontsize-tablet"] = $fontsize['tablet'];

        // Font weight.
        // $fontweight = $this->get_config("typography-heading-{$heading}-fontweight");
        // if (strtolower($fontweight) == 'inherit') {
        // $fontweight = $this->get_config("typography-heading-all-fontweight");
        // }
        // $variables["heading-{$heading}-fontweight"] = $fontweight;

        // Line height.
        $lineheight = $this->get_config("typography-heading-{$heading}-lineheight");
        if ($lineheight == '') {
            $lineheight = 'null';
        }
        $variables["heading-{$heading}-lineheight"] = $lineheight;

        // Text transform.
        $texttransform = $this->get_config("typography-heading-{$heading}-text-transform");
        if (strtolower($texttransform) == 'inherit') {
            $texttransform = $this->get_config("typography-heading-all-text-transform");
        }
        $variables["heading-{$heading}-texttransform"] = $texttransform;

        // Color.
        $color = $this->get_config("typography-heading-{$heading}-custom-color") ? $heading : 'all';
        $variables["heading-{$heading}-color"] = $this->get_config("typography-heading-{$color}-textcolor");

        $variables['heading-regular-fontweight'] = 400;
        $variables['heading-semibold-fontweight'] = 600;
        $variables['heading-bold-fontweight'] = 700;
        $variables['heading-exbold-fontweight'] = 800;

        if ($this->get_config("heading-adv-setting")) {
            $variables['heading-regular-fontweight'] = $this->get_config("heading-regular-fontweight");
            $variables['heading-semibold-fontweight'] = $this->get_config("heading-semibold-fontweight");
            $variables['heading-bold-fontweight'] = $this->get_config("heading-bold-fontweight");
            $variables['heading-exbold-fontweight'] = $this->get_config("heading-exbold-fontweight");
        }
    }

    /**
     * Process global heading
     *
     * @param array variables Varibles array
     */
    private function process_global_heading(&$variables) {
        // Headings list.
        $headings = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

        // Process each tag.
        foreach ($headings as $heading) {
            $this->process_heading($heading, $variables);
        }

        $variables["heading-color"] = $this->get_config("typography-heading-all-textcolor");
        unset($variables['typography-heading-all-font']);
    }
}
