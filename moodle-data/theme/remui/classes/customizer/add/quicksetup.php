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

define('EDW_STATIC_CDN', 'https://staticcdn.edwiser.org');
use theme_remui\customizer\Color;

trait quicksetup {

    /**
     * Quick setup settings for customizer panel.
     *
     * @return void
     */
    private function quicksetup_settings() {
        $panel = 'quicksetup';
        $this->add_panel($panel, get_string('quicksetup', 'theme_remui'), 'root');

        $this->add_color_schemes();

        $this->add_fonts_selector();


        // Apply button to apply pallet on click.
        // $this->add_setting(
        //     'button',
        //     'pallet-apply',
        //     get_string('apply', 'theme_remui'),
        //     $panel,
        //     [
        //         'options' => [
        //             'class' => 'btn btn-primary btn-sm d-none'
        //         ]
        //     ]
        // );

    }

    private function add_color_schemes() {

        // Color Preset settings.
        $pallets = [[
            'label' => get_string('default', 'theme_remui'),
            'preset' => [
                'primary' => "#0051f9",
                'secondary' => '#37be71',
                'text' => '#4C5A73',
                'border' => '#D5DDEA',

                // Background colors.
                'ascentbg' => '#1C376F',
                'bg' => '#F5F9FD',
                'elementbg' => '#EBF0F9',
                'blockbg' => '#FFFFFF',
                'headerbg' => '#FFFFFF',
                'headerelementbg' => '#F0F6FC',
                'footerbg' => '#000819',

                // Border colors.
                'lightborder' => '#EBF0F9',
                'mediumborder' => '#D5DDEA',
                // Divider colors.
                'headerdividercolordark' => '#7590C2',
                'footerdivider' => '#00184B',

                // Button - Primary.
                'primarybuttonbg' => '#0051f9',
                'primarybuttonbghover' => Color::shade('#0051f9', 20),
                'primarybuttonborder' => '#0051f9',
                'primarybuttonborderhover' => Color::shade('#0051f9', 20),
                'primarybuttontext' => '#FFFFFF',
                'primarybuttonicon' => '#FFFFFF',

                // Button - Secondary.
                'secondarybuttontext' => '#0051f9',
                'secondarybuttontexthover' => Color::shade('#0051f9', 20),
                'secondarybuttonborder' => '#0051f9',
                'secondarybuttonborderhover' => Color::shade('#0051f9', 20),
                'secondarybuttonicon' => '#0051f9',
                'secondarybuttoniconhover' => Color::shade('#0051f9', 20),
                'secondarybuttonbg' => '#FFFFFF',

                // Text (Font).
                'headingstext' => '#313848',
                'osinfotext' => '#647390',
                'link' => '#0051f9',
                'linkhover' => '#0041C7',
                'headertext' => '#63718C',
                'headertexthover' => '#0051F9',
                'headertextactive' => '#0051F9',
                'footertext' => '#FFFFFF',
                'footerlinktext' => '#D0D4DD',

                // Icon - Single Color.
                'singlecoloricon' => '#5B6880',
                'singlecoloriconhover' => '#465062',
                'singlecoloriconactive' => '#003094',
                'headericons' => '#5B6880',
                'headericonshover' => '#465062',
                'headericonsactive' => '#0051F9',
                'footericons' => '#909BB1',
                'footericonshover' => '#FFFFFF',
            ]
        ], [
            'label' => get_string('preset1', 'theme_remui'),
            'preset' => [
                'primary' => "#FF7272",
                'secondary' => '#472A52',
                'text' => '#460061',
                'border' => '#D8CACA',

                // Background colors.
                'ascentbg' => '#724242',
                'bg' => '#FFFAFA',
                'elementbg' => '#EFE9E9',
                'blockbg' => '#FFFFFF',
                'headerbg' => '#FFFFFF',
                'headerelementbg' => '#FFF7F7',
                'footerbg' => '#1A0B0B',

                // Border colors.
                'lightborder' => '#EFE9E9',
                'mediumborder' => '#D8CACA',

                // Divider colors.
                'headerdividercolordark' => '#B8ACAC',
                'footerdivider' => '#4D2222',

                // Button - Primary.
                'primarybuttonbg' => '#FF7272',
                'primarybuttonbghover' => Color::shade('#FF7272', 20),
                'primarybuttonborder' => '#FF7272',
                'primarybuttonborderhover' => Color::shade('#FF7272', 20),
                'primarybuttontext' => '#FFFFFF',
                'primarybuttonicon' => '#FFFFFF',

                // Button - Secondary.
                'secondarybuttontext' => '#FF7272',
                'secondarybuttontexthover' => Color::shade('#FF7272', 20),
                'secondarybuttonborder' => '#FF7272',
                'secondarybuttonborderhover' => Color::shade('#FF7272', 20),
                'secondarybuttonicon' => '#FF7272',
                'secondarybuttoniconhover' => Color::shade('#FF7272', 20),
                'secondarybuttonbg' => '#FFFFFF',

                // Text (Font).
                'headingstext' => '#2B003C',
                'osinfotext' => '#622679',
                'link' => '#FF7272',
                'linkhover' => '#CC5B5B',
                'headertext' => '#5C1F74',
                'headertexthover' => '#FF7272',
                'headertextactive' => '#FF7272',
                'footertext' => '#FFFFFF',
                'footerlinktext' => '#C7B2D0',

                // Icon - Single Color.
                // 'singlecoloricon' => '#57176F',
                // 'singlecoloriconhover' => '#3B0052',
                // 'singlecoloriconactive' => '#FF7272',
                'headericons' => '#57176F',
                'headericonshover' => '#3E0056',
                'headericonsactive' => '#FF7272',
                'footericons' => '#9066A0',
                'footericonshover' => '#FFFFFF',
            ]
        ], [
            'label' => get_string('preset2', 'theme_remui'),
            'preset' => [
                'primary' => "#0FC8BC",
                'secondary' => '#1C232C',
                'text' => '#1C006D',
                'border' => '#B9D4D2',

                // Background colors.
                'ascentbg' => '#21605B',
                'bg' => '#F6FDFC',
                'elementbg' => '#E2EDEC',
                'blockbg' => '#FFFFFF',
                'headerbg' => '#FFFFFF',
                'headerelementbg' => '#F1FCFB',
                'footerbg' => '#011413',

                // Border colors.
                'lightborder' => '#E2EDEC',
                'mediumborder' => '#B9D4D2',

                // Divider colors.
                'headerdividercolordark' => '#9DB4B3',
                'footerdivider' => '#043C38',

                // Button - Primary.
                'primarybuttonbg' => '#0FC8BC',
                'primarybuttonbghover' => Color::shade('#0FC8BC', 20),
                'primarybuttonborder' => '#0FC8BC',
                'primarybuttonborderhover' => Color::shade('#0FC8BC', 20),
                'primarybuttontext' => '#FFFFFF',
                'primarybuttonicon' => '#FFFFFF',

                // Button - Secondary.
                'secondarybuttontext' => '#0FC8BC',
                'secondarybuttontexthover' => Color::shade('#0FC8BC', 20),
                'secondarybuttonborder' => '#0FC8BC',
                'secondarybuttonborderhover' => Color::shade('#0FC8BC', 20),
                'secondarybuttonicon' => '#0FC8BC',
                'secondarybuttoniconhover' => Color::shade('#0FC8BC', 20),
                'secondarybuttonbg' => '#FFFFFF',

                // Text (Font).
                'headingstext' => '#110044',
                'osinfotext' => '#3E2683',
                'link' => '#0FC8BC',
                'linkhover' => '#0CA096',
                'headertext' => '#371F7F',
                'headertexthover' => '#0FC8BC',
                'headertextactive' => '#0FC8BC',
                'footertext' => '#FFFFFF',
                'footerlinktext' => '#BBB2D3',

                // Icon - Single Color.
                // 'singlecoloricon' => '#30177A',
                // 'singlecoloriconhover' => '#18005D',
                // 'singlecoloriconactive' => '#0FC8BC',
                'headericons' => '#30177A',
                'headericonshover' => '#190061',
                'headericonsactive' => '#0FC8BC',
                'footericons' => '#7766A7',
                'footericonshover' => '#FFFFFF',
            ]
        ], [
            'label' => get_string('preset3', 'theme_remui'),
            'preset' => [
                'primary' => "#F26440",
                'secondary' => '#0D2F3F',
                'text' => '#3B3B3B',
                'border' => '#EAC2B8',

                // Background colors.
                'ascentbg' => '#6E3E32',
                'bg' => '#FEF9F8',
                'elementbg' => '#F6E5E1',
                'blockbg' => '#FFFFFF',
                'headerbg' => '#FFFFFF',
                'headerelementbg' => '#FEF6F4',
                'footerbg' => '#180A06',

                // Border colors.
                'lightborder' => '#F6E5E1',
                'mediumborder' => '#EAC2B8',

                // Divider colors.
                'headerdividercolordark' => '#C7A59C',
                'footerdivider' => '#491E13',

                // Button - Primary.
                'primarybuttonbg' => '#F26440',
                'primarybuttonbghover' => Color::shade('#F26440', 20),
                'primarybuttonborder' => '#F26440',
                'primarybuttonborderhover' => Color::shade('#F26440', 20),
                'primarybuttontext' => '#FFFFFF',
                'primarybuttonicon' => '#FFFFFF',

                // Button - Secondary.
                'secondarybuttontext' => '#F26440',
                'secondarybuttontexthover' => Color::shade('#F26440', 20),
                'secondarybuttonborder' => '#F26440',
                'secondarybuttonborderhover' => Color::shade('#F26440', 20),
                'secondarybuttonicon' => '#F26440',
                'secondarybuttoniconhover' => Color::shade('#F26440', 20),
                'secondarybuttonbg' => '#FFFFFF',

                // Text (Font).
                'headingstext' => '#1D1D1D',
                'osinfotext' => '#4F4F4F',
                'link' => '#F26440',
                'linkhover' => '#C25033',
                'headertext' => '#353535',
                'headertexthover' => '#F26440',
                'headertextactive' => '#F26440',
                'footertext' => '#FFFFFF',
                'footerlinktext' => '#C4C4C4',

                // Icon - Single Color.
                // 'singlecoloricon' => '#454545',
                // 'singlecoloriconhover' => '#1D1D1D',
                // 'singlecoloriconactive' => '#F26440',
                'headericons' => '#353535',
                'headericonshover' => '#1D1D1D',
                'headericonsactive' => '#F26440',
                'footericons' => '#C4C4C4',
                'footericonshover' => '#FFFFFF',
            ]
        ]];

        $panel = 'quicksetup';

        $this->add_setting(
            'html',
            'current-pallet-heading',
            get_string('currentpallet', 'theme_remui'),
            $panel,
            [
                'content' => '
                    <div class="d-flex justify-content-between align-items-center">
                        <label class="col-form-label" for="id_current-pallet">
                        ' . get_string('colorpalletes', 'theme_remui') . '
                        </label>
                    </div>
                '
            ]
        );

        // Show current color.
        $this->add_setting(
            'html',
            'current-pallet',
            get_string('currentpallet', 'theme_remui'),
            $panel,
            [
                'content' => '
                <div class="current-pallete color-pallet" title="' . get_string('currentpallet', 'theme_remui') . '">
                    <label class="option-label mb-0 ">' . get_string('currentpallet', 'theme_remui') .'</label>
                    <div class="pallet-color">
                        <span style="background-color: #FF7272;"></span>
                        <span style="background-color: #472A52;"></span>
                        <span style="background-color: #460061;"></span>
                        <span style="background-color: #D8CACA;"></span>
                    </div>
                </div>
                '
            ]
        );

        $this->add_setting(
            'html',
            'current-pallet',
            get_string('selectpallete', 'theme_remui'),
            $panel,
            [
                'content' => '
                    <div class="d-flex justify-content-between align-items-center">
                        <label class="col-form-label v2" for="id_current-pallet">
                        ' . get_string('selectpallete', 'theme_remui') . '
                        </label>
                        <button type="button" name="pallet-apply" id="id_pallet-apply" class="btn btn-secondary btn-sm" disabled> '. get_string('apply', 'theme_remui') . '</button>
                    </div>
                '
            ]
        );

        $options = [];

        foreach ($pallets as $index => $pallet) {
            $num = $index + 1;
            $option = [
                'name' => 'pallet-' . $num,
                'class' => 'color-pallet',
                'label' => $pallet['label'],
                'content' => "",
                'data' => [[
                    'key' => 'colors',
                    'value' => json_encode($pallet['preset'])
                ]]
            ];
            $content = "<div class='pallet-color'>";
            $content .= "<span style=\"background-color: " . $pallet['preset']['primary'] . ";\"></span>";
            $content .= "<span style=\"background-color: " . $pallet['preset']['secondary'] . ";\"></span>";
            $content .= "<span style=\"background-color: " . $pallet['preset']['text'] . ";\"></span>";
            $content .= "<span style=\"background-color: " . $pallet['preset']['border'] . ";\"></span>";
            $content .= "</div>";
            $option['content'] = $content;
            $options[] = $option;
        }
        $name = 'colorpallet';
        $label = get_string('selectpallete', 'theme_remui');
        $this->add_setting(
            'radio',
            $name,
            $label,
            $panel,
            [
                'help' => get_string('colorpalletdesc', 'theme_remui'),
                'default' => false,
                'options' => $options
            ]
        );
    }

    private function add_fonts_selector() {
        $panel = 'quicksetup';

        $this->add_setting(
            'html',
            'font-family-heading',
            get_string('font-family', 'theme_remui'),
            $panel,
            [
                'content' => '
                    <div class="d-flex justify-content-between align-items-center">
                        <label class="col-form-label" for="id_current-pallet">
                        ' . get_string('font-family', 'theme_remui') . '
                        </label>
                    </div>
                '
            ]
        );

        $currentfont = $this->get_body_font();

        if (!$currentfont) {
            $currentfont = 'Inter';
        }

        // Show current font.
        $this->add_setting(
            'html',
            'current-font',
            get_string('currentfont', 'theme_remui'),
            $panel,
            [
                'content' => '
                <div class="current-pallete font-pallet" title="' . get_string('currentfont', 'theme_remui') . '">
                    <label class="option-label mb-0">' . get_string('currentfont', 'theme_remui') .'</label>
                    <div class="font-sample">
                        <div class="font-name"></div>
                        <div class="sample-text">A quick brown fox jumps over the lazy dog</div>
                    </div>
                </div>
                '
            ]
        );

        $this->add_setting(
            'html',
            'current-pallet',
            get_string('selectfont', 'theme_remui'),
            $panel,
            [
                'content' => '
                    <div class="d-flex justify-content-between align-items-center">
                        <label class="col-form-label v2" for="id_current-font">
                        ' . get_string('selectfont', 'theme_remui') . '
                        </label>
                        <button type="button" name="font-apply" id="id_font-apply" class="btn btn-secondary btn-sm" disabled>
                            ' . get_string('apply', 'theme_remui') . '
                        </button>
                    </div>
                '
            ]
        );

        // $this->add_setting(
        //     'html',
        //     'current-pallet',
        //     get_string('selectpallete', 'theme_remui'),
        //     $panel,
        //     [
        //         'content' => '
        //             <div class="d-flex justify-content-between align-items-center">
        //                 <label class="col-form-label v2" for="id_current-pallet">
        //                 ' . get_string('selectpallete', 'theme_remui') . '
        //                 </label>
        //                 <button type="button" name="pallet-apply" id="id_pallet-apply" class="btn btn-primary btn-sm" disabled>Apply</button>
        //             </div>
        //         '
        //     ]
        // );

        // Font list.
        $options = [];
        $url = EDW_STATIC_CDN."/customizer/remuifonts/";
        $index = 1;

        foreach ($this->get_fonts() as $font) {
            $imageurl = $url . $font . ".png";

            $options[$font] = [
                'name' => $font,
                'label' => "",
                'class' => 'col-12 p-0 quicksetup-font-item',
                'url' => $imageurl,
            ];
        }

        $name = 'quicksetup-font-family';
        $label = get_string('font-family', 'theme_remui');
        $this->add_setting(
            'fontselect',
            $name,
            $label,
            $panel,
            [
                'help' => get_string('font-family_help', 'theme_remui'),
                'default' => 'Inter',
                'save' => false,
                'options' => $options
            ]
        );

        // // Apply button to apply pallet on click.
        // $this->add_setting(
        //     'button',
        //     'font-apply',
        //     get_string('apply', 'theme_remui'),
        //     $panel,
        //     [
        //         'options' => [
        //             'class' => 'btn btn-primary btn-sm d-none'
        //         ]
        //     ]
        // );
    }
}
