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
 * Theme customizer footer process trait
 *
 * @package   theme_remui
 * @copyright (c) 2023 WisdmLabs (https://wisdmlabs.com/) <support@wisdmlabs.com>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 * @author    Yogesh Shirsath
 */

namespace theme_remui\customizer\process;

trait footer {
    /**
     * Process footer settings
     * @param  String $css Theme css
     * @return String      Processed css
     */
    private function process_footer(&$variables) {
        $panel = get_string('footer', 'theme_remui');
        $this->add_panel('footer', $panel, 'root');

        // Background color.
        $variables['footer-background-color'] = $this->get_config('footer-background-color');

        // Text color.
        $variables['footer-text-color'] = $this->get_config('footer-text-color');

        // Link color.
        $variables['footer-link-text'] = $this->get_config('footer-link-text');

        // Link hover color.
        $variables['footer-link-hover-text'] = $this->get_config('footer-link-hover-text');

        // Footer divider color.
        $variables['footer-divider-color'] = $this->get_config('footer-divider-color');

        // Footer icon default color.
        $variables['footer-icon-color'] = $this->get_config('footer-icon-color');

        // Footer icon hover color.
        $variables['footer-icon-hover-color'] = $this->get_config('footer-icon-hover-color');

        // Footer logo color.
        $variables['footerlogocolor'] = $this->get_config('footer-logo-color');

        // Footer font settings.
        $footerfontfamily = $this->get_config('footerfontfamily');
        $footerfontsize = $this->get_config('footerfontsize');
        $footerfontweight = $this->get_config('footerfontweight');
        $footerfonttexttransform = $this->get_config('footerfonttext-transform');
        $footerfontlineheight = $this->get_config('footerfontlineheight');
        $footerfontltrspace = $this->get_config('footerfontltrspace');

        // Footer font settings.
        $footerfontfamily = $this->get_config('footerfontfamily');
        if (strtolower($footerfontfamily) != 'inherit') {
            if (strtolower($footerfontfamily) == 'standard') {
                $footerfontfamily = 'Inter';
            }
        }
        $variables['footerfontfamily'] = $footerfontfamily;
        $footerfontsize = $this->get_config('footerfontsize').'rem';
        if ($footerfontsize == '' || $footerfontsize == null) {
            $footerfontsize == 'null';
        }
        $variables['footerfontsize'] = $footerfontsize;

        $footerfontweight = $this->get_config('footerfontweight');
        $variables['footerfontweight'] = $footerfontweight;

        $footerfonttextransform = $this->get_config('footerfonttext-transform');
        $variables['footerfonttextransform'] = $footerfonttextransform;

        $footerfontlineheight = $this->get_config('footerfontlineheight').'rem';
        if ($footerfontlineheight == '') {
            $footerfontlineheight = 'null';
        }
        $variables['footerfontlineheight'] = $footerfontlineheight;

        $footerfontltrspace = $this->get_config('footerfontltrspace');
        if ($footerfontltrspace == '') {
            $footerfontltrspace = 'null';
        } else if (strtolower($footerfontltrspace) != 'inherit') {
            $footerfontltrspace .= 'px';
        }
        $variables['footerfontltrspace'] = $footerfontltrspace;

        // Columntitlesettings
        // footer columtitile color.
        $variables['footercolumntitlecolor'] = $this->get_config('footer-columntitle-color');
        $footercolumntitlefontfamily = $this->get_config('footer-columntitle-fontfamily');
        if (strtolower($footercolumntitlefontfamily) != 'inherit') {
            if (strtolower($footercolumntitlefontfamily) == 'standard') {
                $footercolumntitlefontfamily = 'Inter';
            }
        }
        $variables['footercolumntitlefontfamily'] = $footercolumntitlefontfamily;

        $footercolumntitlefontsize = $this->get_config('footer-columntitle-fontsize');
        if ($footercolumntitlefontsize != '') {
            $footercolumntitlefontsize .= 'rem';
        }
        $variables['footercolumntitlefontsize'] = $footercolumntitlefontsize;

        $footercolumntitlefontweight = $this->get_config('footer-columntitle-fontweight');
        $variables['footercolumntitlefontweight'] = $footercolumntitlefontweight;

        $footercolumntitletextransform = $this->get_config('footer-columntitle-textransform');
        $variables['footercolumntitletextransform'] = $footercolumntitletextransform;

        $footercolumntitlelineheight = $this->get_config('footer-columntitle-lineheight');
        $variables['footercolumntitlelineheight'] = $footercolumntitlelineheight;

        $footercolumntitleltrspace = $this->get_config('footer-columntitle-ltrspace');
        if ($footercolumntitleltrspace == '') {
            $footercolumntitleltrspace = 'null';
        } else if (strtolower($footercolumntitleltrspace) != 'inherit') {
            $footercolumntitleltrspace .= 'px';
        }
        $variables['footercolumntitleltrspace'] = $footercolumntitleltrspace;

        $footercolumnsize = $this->get_config('footercolumnsize');
        $footercolumnsize = explode(',', $footercolumnsize);
        foreach ($footercolumnsize as $key => $value) {
            if (!empty($value)) {
                $value .= '%';
                $footercolumnsize[$key] = $value;
            }
        }
        $variables['footer-section-1-width'] = $footercolumnsize[0];
        $variables['footer-section-2-width'] = $footercolumnsize[1];
        $variables['footer-section-3-width'] = $footercolumnsize[2];
        $variables['footer-section-4-width'] = $footercolumnsize[3];
    }

    /**
     * Course purchase details.
     * @param fonts
     * @return void
     */

    private function get_footer_fonts(&$fonts) {
        $footercolumntitlefontfamily = $this->get_config('footer-columntitle-fontfamily');
        if (strtolower($footercolumntitlefontfamily) != 'inherit') {
            if (strtolower($footercolumntitlefontfamily) == 'standard') {
                $footercolumntitlefontfamily = 'Inter';
            }
        }
        $fonts[$footercolumntitlefontfamily] = true;
        $footerfontfamily = $this->get_config('footerfontfamily');
        if (strtolower($footerfontfamily) != 'inherit') {
            if (strtolower($footerfontfamily) == 'standard') {
                $footerfontfamily = 'Inter';
            }
        }
        $fonts[$footerfontfamily] = true;
    }
}
