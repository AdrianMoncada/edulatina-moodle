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
 * Theme customizer footer trait
 *
 * @package   theme_remui
 * @copyright (c) 2023 WisdmLabs (https://wisdmlabs.com/) <support@wisdmlabs.com>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 * @author    Yogesh Shirsath
 */

namespace theme_remui\customizer\add;

trait footer {
    /**
     * Add footer settings
     * @return void
     */
    private function footer_settings() {
        $panel = get_string('footer', 'theme_remui');
        $this->add_panel('footer', $panel, 'root');

        // Footer design.
        $this->add_footer_basic_settings();

        // Social Media links.
        $this->add_footer_socialall_settings();

        // Advance.
        $this->add_footer_advance_settings();

        // Secondary.
        $this->add_footer_secondary_settings();
    }

    /**
     * Add footer design or settings
     *
     * @return void
     */
    private function add_footer_basic_settings() {
        $panel = 'footer-basic';
        $panellabel = get_string('basic', 'theme_remui');
        $this->add_panel($panel, $panellabel, 'footer');

        // Add footer colors settings.
        $this->add_footer_colors_settings($panel);

        // Add footer font settings.
        $this->add_footer_font_settings($panel);

        // Add footer column title settings.
        $this->add_footer_columntitle_settings($panel);
    }

    /**
     * Add footer social media settings
     *
     * @return void
     */
    private function add_footer_socialall_settings() {
        $panel = 'footer-social';
        $panellabel = get_string('socialall', 'theme_remui');

        // Add footer social settigs.
        $this->add_panel($panel, $panellabel, 'footer');

        $this->add_setting(
            'html',
            'social-icons-panel',
            get_string('socialiconspanel', 'theme_remui'),
            $panel,
            [
                'content' => '
                    <div class="social-icons-panel p-3">
                        <h6 class="h-bold-6 mb-2">' . get_string('social-icons-heading', 'theme_remui') . '</h6>
                        <div class="notice small-info-regular">
                            ' . get_string('social-icons-info', 'theme_remui') . '
                        </div>
                    </div>
                '
            ]
        );

        $socials = ['facebook', 'twitter', 'linkedin', 'gplus', 'youtube', 'instagram', 'pinterest', 'quora', 'whatsapp', 'telegram'];

        // Footer social settings.
        foreach ($socials as $social) {
            $label = get_string("{$social}setting", 'theme_remui');
            $name = "{$social}setting";
            $this->add_setting(
                'text',
                $name,
                $label,
                $panel,
                [
                    'help' => get_string("{$social}settingdesc", 'theme_remui')
                ]
            );
        }
    }

    /**
     * Add color settings in footer.
     *
     * @param string $panel
     * @return void
     */
    private function add_footer_colors_settings($panel) {
        $panel = "footer-basic-color";
        $footerlabel = get_string('footer', 'theme_remui');
        $panellabel = get_string('colors', 'theme_remui');
        $this->add_panel($panel, $panellabel, 'footer-basic');

        // Heading 1.
        $this->add_setting(
            'heading_start',
            'footer-color-heading1',
            get_string('footer-color-heading1', 'theme_remui'),
            $panel,
            [
                'collapsed' => true
            ]
        );

        // Background color.
        $label = get_string('background-color', 'theme_remui');
        $name = 'footer-background-color';
        $this->add_setting(
            'color',
            $name,
            $label,
            $panel,
            [
                'help' => get_string('background-color_help', 'theme_remui', $footerlabel),
                'default' => $this->get_default_color('footerbg')
            ]
        );

        // Text color.
        $label = get_string('text-color', 'theme_remui');
        $name = 'footer-text-color';
        $this->add_setting(
            'color',
            $name,
            $label,
            $panel,
            [
                'help' => get_string('text-color_help', 'theme_remui', $footerlabel),
                'default' => $this->get_default_color('white')
            ]
        );

        // Divider color.
        $label = get_string('divider-color', 'theme_remui');
        $name = 'footer-divider-color';
        $this->add_setting(
            'color',
            $name,
            $label,
            $panel,
            [
                'help' => get_string('divider-color_help', 'theme_remui', $footerlabel),
                'default' => $this->get_default_color('footerdivider')
            ]
        );

        // Heading end.
        $this->add_setting(
            'heading_end',
            'footer-color-heading1',
            '',
            $panel
        );

        // Heading 2.
        $this->add_setting(
            'heading_start',
            'footer-color-heading2',
            get_string('footer-color-heading2', 'theme_remui'),
            $panel,
            [
                'collapsed' => true
            ]
        );

        // Link color.
        $label = get_string('link-text', 'theme_remui');
        $name = 'footer-link-text';
        $this->add_setting(
            'color',
            $name,
            $label,
            $panel,
            [
                'help' => get_string('link-text_help', 'theme_remui', $footerlabel),
                'default' => $this->get_default_color('bg')
            ]
        );

        // Link hover color.
        $label = get_string('link-hover-text', 'theme_remui');
        $name = 'footer-link-hover-text';
        $this->add_setting(
            'color',
            $name,
            $label,
            $panel,
            [
                'help' => get_string('link-hover-text_help', 'theme_remui', $footerlabel),
                'default' => $this->get_default_color('bg')
            ]
        );

        // Heading end.
        $this->add_setting(
            'heading_end',
            'footer-color-heading2',
            '',
            $panel
        );

        // Heading 3.
        $this->add_setting(
            'heading_start',
            'footer-color-heading3',
            get_string('footer-color-heading3', 'theme_remui'),
            $panel,
            [
                'collapsed' => true
            ]
        );

        // Icon default color.
        $label = get_string('icon-default-color', 'theme_remui');
        $name = 'footer-icon-color';
        $this->add_setting(
            'color',
            $name,
            $label,
            $panel,
            [
                'help' => get_string('icon-default-color_help', 'theme_remui', $footerlabel),
                'default' => $this->get_default_color('footericons')
            ]
        );

        // Icon default color.
        $label = get_string('icon-hover-color', 'theme_remui');
        $name = 'footer-icon-hover-color';
        $this->add_setting(
            'color',
            $name,
            $label,
            $panel,
            [
                'help' => get_string('icon-hover-color_help', 'theme_remui', $footerlabel),
                'default' => $this->get_default_color('footericonshover')
            ]
        );
        // Heading end.
        $this->add_setting(
            'heading_end',
            'footer-color-heading1',
            '',
            $panel
        );
    }

    /**
     * Add font settings in footer.
     *
     * @param string $panel
     * @return void
     */
    private function add_footer_font_settings($panel) {
        $panel = "footer-basic-font";
        $footerlabel = get_string('footerfont', 'theme_remui');
        $this->add_panel($panel, $footerlabel, 'footer-basic');

        $fonts = $this->get_fonts(['Inherit' => get_string('inherit', 'theme_remui')]);
        // Font family.
        $label = get_string('footerfontfamily', 'theme_remui');
        $this->add_setting(
            'select',
            'footerfontfamily',
            $label,
            $panel,
            [
                'help' => get_string('font-family_help', 'theme_remui', get_string('footer', 'theme_remui')),
                'default' => 'Inherit',
                'options' => $fonts
            ]
        );

        // Font size.
        $label = get_string('footerfontsize', 'theme_remui');
        $this->add_setting(
            'number',
            'footerfontsize',
            $label,
            $panel,
            [
                'help' => get_string('font-size_help', 'theme_remui', get_string('footer', 'theme_remui')),
                'default' => '0.875',
                'options' => [
                    'min' => 1,
                    'max' => 5,
                    'step' => 0.01
                ]
            ]
        );
        // Font weight.
        $label = get_string('footerfontweight', 'theme_remui');
        $this->add_setting(
            'select',
            'footerfontweight',
            $label,
            $panel,
            [
                'help' => get_string('font-weight_help', 'theme_remui', get_string('footer', 'theme_remui')),
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
        $label = get_string('footerfonttext-transform', 'theme_remui');
        $this->add_setting(
            'select',
            'footerfonttext-transform',
            $label,
            $panel,
            [
                'help' => get_string('text-transform_help', 'theme_remui', get_string('footer', 'theme_remui')),
                'default' => 'inherit',
                'options' => $this->texttransform
            ]
        );

        // Line height.
        $label = get_string('footerfontlineheight', 'theme_remui');
        $this->add_setting(
            'number',
            'footerfontlineheight',
            $label,
            $panel,
            [
                'help' => get_string('line-height_help', 'theme_remui', get_string('footer', 'theme_remui')),
                'default' => '1.375',
                'options' => [
                    'min' => 1,
                    'max' => 5,
                    'step' => 0.01
                ]
            ]
        );

        // Letter space.
        $label = get_string('footerfontltrspace', 'theme_remui');
        $this->add_setting(
            'number',
            'footerfontltrspace',
            $label,
            $panel,
            [
                'help' => get_string('footerfontltrspace_help', 'theme_remui', get_string('footer', 'theme_remui')),
                'default' => 'inherit',
                'options' => [
                    'min' => 1,
                    'max' => 5,
                    'step' => 0.01
                ]
            ]
        );
    }


    /**
     * Add font columntitle in footer.
     *
     * @param string $panel
     * @return void
     */
    private function add_footer_columntitle_settings($panel) {
        $panel = "footer-basic-footerbasiccolumntitle";
        $footerlabel = get_string('footerbasiccolumntitle', 'theme_remui');
        $this->add_panel($panel, $footerlabel, 'footer-basic');

        $fonts = $this->get_fonts(['Inherit' => get_string('inherit', 'theme_remui')]);
        // Font family.
        $label = get_string('footer-columntitle-fontfamily', 'theme_remui');
        $this->add_setting(
            'select',
            'footer-columntitle-fontfamily',
            $label,
            $panel,
            [
                'help' => get_string('font-family_help', 'theme_remui', get_string('footer-columns', 'theme_remui')),
                'default' => 'Inherit',
                'options' => $fonts
            ]
        );

        // Font size.
        $label = get_string('footer-columntitle-fontsize', 'theme_remui');
        $this->add_setting(
            'number',
            'footer-columntitle-fontsize',
            $label,
            $panel,
            [
                'help' => get_string('font-size_help', 'theme_remui', get_string('footer-columns', 'theme_remui')),
                'default' => '0.875',
                'options' => [
                    'min' => 1,
                    'max' => 5,
                    'step' => 0.01
                ]
            ]
        );
        // Font weight.
        $label = get_string('footer-columntitle-fontweight', 'theme_remui');
        $this->add_setting(
            'select',
            'footer-columntitle-fontweight',
            $label,
            $panel,
            [
                'help' => get_string('font-weight_help', 'theme_remui', get_string('footer-columns', 'theme_remui')),
                'default' => '600',
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
        $label = get_string('footer-columntitle-textransform', 'theme_remui');
        $this->add_setting(
            'select',
            'footer-columntitle-textransform',
            $label,
            $panel,
            [
                'help' => get_string('text-transform_help', 'theme_remui', get_string('footer-columns', 'theme_remui')),
                'default' => 'inherit',
                'options' => $this->texttransform
            ]
        );

        // Line height.
        $label = get_string('footer-columntitle-lineheight', 'theme_remui');
        $this->add_setting(
            'number',
            'footer-columntitle-lineheight',
            $label,
            $panel,
            [
                'help' => get_string('line-height_help', 'theme_remui', get_string('footer-columns', 'theme_remui')),
                'default' => '1.375',
                'options' => [
                    'min' => 1,
                    'max' => 5,
                    'step' => 0.01
                ]
            ]
        );

        // Letter space .
        $label = get_string('footer-columntitle-ltrspace', 'theme_remui');
        $this->add_setting(
            'number',
            'footer-columntitle-ltrspace',
            $label,
            $panel,
            [
                'help' => get_string('footerfontltrspace_help', 'theme_remui', get_string('footer-columns', 'theme_remui')),
                'default' => 'inherit',
                'options' => [
                    'min' => 1,
                    'max' => 5,
                    'step' => 0.01
                ]
            ]
        );

        // Text color.
        $label = get_string('footer-columntitle-color', 'theme_remui');
        $name = 'footer-columntitle-color';
        $this->add_setting(
            'color',
            $name,
            $label,
            $panel,
            [
                'help' => get_string('footer-columntitle-color_help', 'theme_remui', get_string('footer-columns', 'theme_remui')),
                'default' => $this->get_default_color('bg')
            ]
        );
    }

    /**
     * Add footer advance settings
     *
     * @return void
     */
    private function add_footer_advance_settings() {

        $panellabel = get_string('advance', 'theme_remui');
        $panel = 'footer-advance';
        $this->add_panel($panel, $panellabel, 'footer');

        // Footer column type.
        $this->add_setting(
            'range',
            'footercolumn',
            get_string('footercolumnwidgetno', 'theme_remui'),
            $panel,
            [
                'help' => get_string('footercolumndesc', 'theme_remui'),
                'default' => 4,
                'options' => [
                    'min' => 1,
                    'max' => 4
                ]
            ]
        );

        // Footer column.
        $this->add_setting(
            'text',
            'footercolumnsize',
            get_string('footercolumnsize', 'theme_remui'),
            $panel,
            [
                'help' => get_string('footercolumnsizedesc', 'theme_remui'),
                'withdefault' => false,
                'default' => '25,25,25,25'
            ]
        );

        // Default types for column.
        $defaulttypes = ['customhtml', 'customhtml', 'customhtml', 'customhtml'];

        // Default social link selection.
        $socials = ['facebook', 'twitter', 'linkedin', 'gplus', 'youtube', 'instagram', 'pinterest', 'quora', 'whatsapp', 'telegram'];

        // Generating select input options for social link selection.
        $socialoptions = [];
        foreach ($socials as $social) {
            $socialoptions[$social] = get_string('footer' . $social, 'theme_remui');
        }

        for ($i = 1; $i <= 4; $i++) {
            // Footer column heading.
            $this->add_setting(
                'heading_start',
                'footer-advance-column' . $i,
                get_string('footercolumn', 'theme_remui') . ' ' . $i,
                'footer-advance',
                [
                    'collapsed' => true
                ]
            );

            // Footer column type.
            $this->add_setting(
                'select',
                'footercolumn' . $i . 'type',
                get_string('footercolumntype', 'theme_remui'),
                $panel,
                [
                    'help' => get_string('footercolumntypedesc', 'theme_remui'),
                    'options' => [
                        'customhtml' => get_string('footercolumncustomhtml', 'theme_remui'),
                        'menu' => get_string('footermenu', 'theme_remui')
                    ],
                    'default' => $defaulttypes[$i - 1]
                ]
            );

            // Footer column.
            $this->add_setting(
                'text',
                'footercolumn' . $i . 'title',
                get_string('footercolumntitle', 'theme_remui'),
                $panel,
                [
                    'help' => get_string('footercolumntitledesc', 'theme_remui')
                ]
            );

            // Footer content.
            $this->add_setting(
                'htmleditor',
                'footercolumn' . $i . 'customhtml',
                get_string('footercolumncustomhtml', 'theme_remui'),
                'footer-advance',
                [
                    'options' => [
                        'rows' => 10
                    ],
                    'help' => get_string('footercolumncustomhtmldesc', 'theme_remui')
                ]
            );

            // Show site logo in the footer.
            $label = get_string('showsocialmediaicon', 'theme_remui');
            $this->add_setting(
                'checkbox',
                'socialmediaiconcol' . $i,
                $label,
                $panel,
                [
                    'help' => get_string('socialmediaicondesc', 'theme_remui')
                ]
            );

            // Footer social links selection.
            $this->add_setting(
                'select',
                'footercolumn' . $i . 'social',
                get_string('footercolumnsocial', 'theme_remui'),
                'footer-advance',
                [
                    'help' => get_string('footercolumnsocialdesc', 'theme_remui'),
                    'options' => $socialoptions,
                    'multiple' => true,
                    'default' => json_encode($socials)
                ]
            );

            $this->add_setting(
                'html',
                'social-media-selection-note',
                '',
                $panel,
                [
                    'content' => '
                        <div class="footercolumn' . $i . 'social-note">
                            <p class="notice small-info-regular p-0 m-0">
                                <span class="h-bold-6 mb-2">' . get_string('note', 'theme_remui') . ':</span>
                                ' . get_string('social-media-selection-note', 'theme_remui') . '
                            </p>
                        </div>
                    '
                ]
            );

            // Footer menu.
            $this->add_setting(
                'menu',
                'footercolumn' . $i . 'menu',
                get_string('footermenu', 'theme_remui'),
                'footer-advance',
                [
                    'default' => '[]',
                    'help' => get_string('footermenudesc', 'theme_remui')
                ]
            );

            // Footer column heading end.
            $this->add_setting(
                'heading_end',
                'footer-advance-column' . $i,
                '',
                'footer-advance'
            );
        }
    }

    /**
     * Add settings for secondary footer.
     *
     * @return void
     */
    private function add_footer_secondary_settings() {
        $panel = 'footer-secondary';
        $panellabel = get_string('footersecondary', 'theme_remui');
        $this->add_panel($panel, $panellabel, 'footer');

        // Show site logo in the footer.
        $label = get_string('footershowlogo', 'theme_remui');
        $this->add_setting(
            'checkbox',
            'footershowlogo',
            $label,
            $panel,
            [
                'help' => get_string('footershowlogodesc', 'theme_remui')
            ]
        );

        // Show privacy policy the footer.
        $label = get_string('useheaderlogo', 'theme_remui');
        $this->add_setting(
            'checkbox',
            'useheaderlogo',
            $label,
            $panel
        );

        // Text color.
        $label = get_string('footer-logo-color', 'theme_remui');
        $name = 'footer-logo-color';
        $this->add_setting(
            'color',
            $name,
            $label,
            $panel,
            [
                'help' => get_string('text-color_help', 'theme_remui'),
                'default' => $this->get_default_color('white')
            ]
        );

        // Favicon.
        $label = get_string('secondaryfooterlogo', 'theme_remui');
        $name = 'secondaryfooterlogo';
        $this->add_setting(
            'file',
            $name,
            $label,
            $panel,
            [
                'help' => get_string('secondaryfooterlogo', 'theme_remui'),
                'description' => get_string('favicosize', 'theme_remui'),
                'options' => [
                    'subdirs' => 0,
                    'maxfiles' => 1,
                    'accepted_types' => array('web_image')
                ]
            ]
        );

        // secondaryfooterlogodarkmode.
        $label = get_string('secondaryfooterlogodarkmode', 'theme_remui');
        $name = 'secondaryfooterlogodarkmode';
        $this->add_setting(
            'file',
            $name,
            $label,
            $panel,
            [
                'help' => get_string('secondaryfooterlogodarkmode', 'theme_remui'),
                'description' => get_string('favicosize', 'theme_remui'),
                'options' => [
                    'subdirs' => 0,
                    'maxfiles' => 1,
                    'accepted_types' => array('web_image')
                ]
            ]
        );
        // Show privacy policy the footer.
        $label = get_string('footerprivacypolicyshow', 'theme_remui');
        $this->add_setting(
            'checkbox',
            'footerprivacypolicyshow',
            $label,
            $panel,
            [
                'default' => true
            ]
        );

        // Privacy Policy.
        $this->add_setting(
            'text',
            'footerprivacypolicy',
            get_string('footerprivacypolicy', 'theme_remui'),
            $panel,
            [
                'help' => get_string('footerprivacypolicydesc', 'theme_remui')
            ]
        );

        // Open privacy policy in new tab.
        $label = get_string('openinnewtab', 'theme_remui');
        $this->add_setting(
            'checkbox',
            'privacypolicynewtab',
            $label,
            $panel
        );

        // Show terms and conditions the footer.
        $label = get_string('footertermsandconditionsshow', 'theme_remui');
        $this->add_setting(
            'checkbox',
            'footertermsandconditionsshow',
            $label,
            $panel,
        );

        // Terms & Condition.
        $this->add_setting(
            'text',
            'footertermsandconditions',
            get_string('footertermsandconditions', 'theme_remui'),
            $panel,
            [
                'help' => get_string('footertermsandconditionsdesc', 'theme_remui')
            ]
        );
        // Terms and conditon open in new tab.
        $label = get_string('openinnewtab', 'theme_remui');
        $this->add_setting(
            'checkbox',
            'termsandconditionewtab',
            $label,
            $panel
        );

        // Show copyright in the footer.
        $label = get_string('footercopyrightsshow', 'theme_remui');
        $this->add_setting(
            'checkbox',
            'footercopyrightsshow',
            $label,
            $panel
        );
        $this->add_setting(
            'textarea',
            'footercopyrights',
            get_string('footercopyrights', 'theme_remui'),
            $panel,
            [
                'help' => get_string('footercopyrightsdesc', 'theme_remui'),
                'default' => '[site] © [year]. All rights reserved.'
            ]
        );

        $label = get_string('poweredbyedwiser', 'theme_remui');
        $this->add_setting(
            'checkbox',
            'poweredbyedwiser',
            $label,
            $panel,
            [

                'default' => true
            ]
        );
    }
}
