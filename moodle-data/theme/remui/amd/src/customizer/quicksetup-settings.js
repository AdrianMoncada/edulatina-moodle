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
 * Theme customizer Quick setup
 *
 * @copyright (c) 2023 WisdmLabs (https://wisdmlabs.com/) <support@wisdmlabs.com>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 * @author    Yogesh Shirsath
 */

import $ from 'jquery';

/**
 * MAIN settings list.
 */
var MAIN = {
    PRIMARY: '[name="sitecolorhex"]',
    SECONDARY: '[name="secondarycolor"]',
    TEXT: '[name="themecolors-textcolor"]',
    BORDER: '[name="themecolors-bordercolor"]'
};

/**
 * Secondary colors list.
 */
var SECONDARY = [
    {key: 'bg', target: '[name="global-colors-pagebackgroundcolor"]'},
    {key: 'ascentbg', target: '[name="global-colors-ascentbackgroundcolor"]'},
    {key: 'elementbg', target: '[name="global-colors-elementbackgroundcolor"]'},

    // Border color.
    {key: 'lightborder', target: '[name="themecolors-lightbordercolor"]'},
    {key: 'mediumborder', target: '[name="themecolors-mediumbordercolor"]'},

    // Link colors.
    {key: 'link', target: '[name="global-typography-body-linkcolor"]'},
    {key: 'linkhover', target: '[name="global-typography-body-linkhovercolor"]'},

    // Heading colors.
    {key: 'headingstext', target: '[name="typography-heading-all-textcolor"]'},
    {key: 'headingstext', target: '[name="typography-heading-h1-textcolor"]'},
    {key: 'headingstext', target: '[name="typography-heading-h2-textcolor"]'},
    {key: 'headingstext', target: '[name="typography-heading-h3-textcolor"]'},
    {key: 'headingstext', target: '[name="typography-heading-h4-textcolor"]'},
    {key: 'headingstext', target: '[name="typography-heading-h5-textcolor"]'},
    {key: 'headingstext', target: '[name="typography-heading-h6-textcolor"]'},

    // Primary button colors.
    {key: 'primarybuttonbg', target: '[name="button-primary-color-background"]'},
    {key: 'primarybuttonbghover', target: '[name="button-primary-color-background-hover"]'},
    {key: 'primarybuttonborder', target: '[name="button-primary-border-color"]'},
    {key: 'primarybuttonborderhover', target: '[name="button-primary-border-color-hover"]'},
    {key: 'primarybuttontext', target: '[name="button-primary-color-text"]'},
    {key: 'primarybuttontext', target: '[name="button-primary-color-text-hover"]'},
    {key: 'primarybuttonicon', target: '[name="button-primary-color-icon"]'},
    {key: 'primarybuttonicon', target: '[name="button-primary-color-icon-hover"]'},

    // Secondary button colors.
    {key: 'secondarybuttontext', target: '[name="button-secondary-color-text"]'},
    {key: 'secondarybuttontexthover', target: '[name="button-secondary-color-text-hover"]'},
    {key: 'secondarybuttonborder', target: '[name="button-secondary-border-color"]'},
    {key: 'secondarybuttonborderhover', target: '[name="button-secondary-border-color-hover"]'},
    {key: 'secondarybuttonicon', target: '[name="button-secondary-color-icon"]'},
    {key: 'secondarybuttoniconhover', target: '[name="button-secondary-color-icon-hover"]'},
    {key: 'secondarybuttonbg', target: '[name="button-secondary-color-background"]'},
    {key: 'secondarybuttonbg', target: '[name="button-secondary-color-background-hover"]'},

    // Header colors.
    {key: 'headerbg', target: '[name="logo-bg-color"]'},
    {key: 'headertext', target: '[name="sitenamecolor"]'},
    {key: 'headerbg', target: '[name="header-menu-background-color"]'},
    {key: 'headertext', target: '[name="header-menu-text-color"]'},
    {key: 'headertexthover', target: '[name="header-menu-text-hover-color"]'},
    {key: 'headertextactive', target: '[name="header-menu-text-active-color"]'},
    {key: 'headerelementbg', target: '[name="header-menu-element-bg-color"]'},
    {key: 'headerdividercolordark', target: '[name="header-menu-divider-bg-color"]'},
    {key: 'headericons', target: '[name="hds-icon-color"]'},
    {key: 'headericonshover', target: '[name="hds-icon-hover-color"]'},
    {key: 'headericonsactive', target: '[name="hds-icon-active-color"]'},

    // Footer colors.
    {key: 'footerbg', target: '[name="footer-background-color"]'},
    {key: 'footertext', target: '[name="footer-text-color"]'},
    {key: 'footertext', target: '[name="footer-columntitle-color"]'},
    {key: 'footerlinktext', target: '[name="footer-link-text"]'},
    {key: 'footerlinktext', target: '[name="footer-link-hover-text"]'},
    {key: 'footerdivider', target: '[name="footer-divider-color"]'},
    {key: 'footericons', target: '[name="footer-icon-color"]'},
    {key: 'footericonshover', target: '[name="footer-icon-hover-color"]'},
];

/**
 * Selectors list.
 */
var SELECTOR = {
    BASE: 'quicksetup',
    PALLETAPPLY: '[name="pallet-apply"]',
    FONTSELECTOR: '.font-selector',
    FONTAPPLY: '[name="font-apply"]',
    FONTSETTING: '[name="global-typography-body-fontfamily"]',
    PALLET: '[name="radio_colorpallet"]',
    CURRENTPALLET: '.current-pallete',
    CURRENTFONT: '.current-font',
    NAVBARINVERSE: '[name="navbarinverse"]',
    FONTVIEWER: '.current-pallete.font-pallet'
};

/**
 * Apply settings.
 */
function apply() {
    // Dummy method.
    // This method has settings which will be applied to related settings.
    // So we don't need to apply it on every iframe refresh or link change.
}

function applyColors(colors) {
    $(MAIN.PRIMARY).spectrum('set', colors.primary).trigger('color.changed');
    $(MAIN.SECONDARY).spectrum('set', colors.secondary).trigger('color.changed');
    $(MAIN.TEXT).spectrum('set', colors.text).trigger('color.changed');
    $(MAIN.BORDER).spectrum('set', colors.border).trigger('color.changed');
    SECONDARY.forEach(setting => {
        $(setting.target).spectrum('set', colors[setting.key]).trigger('color.changed');
    });
}

/**
 * Sync color on load.
 */
function syncColor() {
    $($(SELECTOR.CURRENTPALLET).find('span').get(0)).css(
        'background',
        $(MAIN.PRIMARY).spectrum('get').toString()
    );
    $($(SELECTOR.CURRENTPALLET).find('span').get(1)).css(
        'background',
        $(MAIN.SECONDARY).spectrum('get').toString()
    );
    $($(SELECTOR.CURRENTPALLET).find('span').get(2)).css(
        'background',
        $(MAIN.TEXT).spectrum('get').toString()
    );
    $($(SELECTOR.CURRENTPALLET).find('span').get(3)).css(
        'background',
        $(MAIN.BORDER).spectrum('get').toString()
    );
}

/**
 * Sync font selected with current font item.
 */
function syncFont() {
    let font = $(SELECTOR.FONTSETTING).val();
    if (font.toLowerCase() == 'standard') {
        font = 'Inter';
    }
    // let url = "https://staging.edwiser.org/remuifonts/images/";
    // $(SELECTOR.CURRENTFONT).find('img').attr('src', url + font + '.png');

    $(SELECTOR.FONTVIEWER).find('.font-sample .font-name').text(font);
    $(SELECTOR.FONTVIEWER).find('.font-sample').css('font-family', font);
}

/**
 * Load font on quick setup when page is loaded.
 */
function onLoadFont() {
    // First time font sync.
    let font = $(SELECTOR.FONTSETTING).val();
    if (font.toLowerCase() == 'standard') {
        font = 'Inter';
    }
    $('select' + SELECTOR.FONTSELECTOR).val(font).trigger('change');
    $(SELECTOR.FONTAPPLY).attr('disabled', false);
    loadDemoFont(font);
}

/**
 * Initialize events.
 */
function init() {
    syncColor();
    syncFont();
    onLoadFont();
    $(SELECTOR.PALLET).on('change', function() {
        $(SELECTOR.PALLET).each((index, input) => {
            if (input.checked) {
                $(SELECTOR.PALLETAPPLY).attr('disabled', false);
            }
        });
    });
    $(SELECTOR.PALLETAPPLY).on('click', function() {
        $(this).attr('disabled', true);
        $(SELECTOR.PALLET).each((index, input) => {
            if (input.checked) {
                $(input).prop('checked', false).trigger('change');
                applyColors($(input).data('colors'));
            }
        });
    });

    // Handling current pallet colors.
    $(MAIN.PRIMARY).on('color.changed', function() {
        $($(SELECTOR.CURRENTPALLET).find('span').get(0)).css('background', $(this).spectrum('get').toString());
    });
    $(MAIN.SECONDARY).on('color.changed', function() {
        $($(SELECTOR.CURRENTPALLET).find('span').get(1)).css('background', $(this).spectrum('get').toString());
    });
    $(MAIN.TEXT).on('color.changed', function() {
        $($(SELECTOR.CURRENTPALLET).find('span').get(2)).css('background', $(this).spectrum('get').toString());
    });
    $(MAIN.BORDER).on('color.changed', function() {
        $($(SELECTOR.CURRENTPALLET).find('span').get(3)).css('background', $(this).spectrum('get').toString());
    });

    // Observ font settings change.
    $(SELECTOR.FONTSETTING).on('change', syncFont);

    // Observer font.
    $(SELECTOR.FONTSELECTOR).on('change', function() {
        $(SELECTOR.FONTAPPLY).attr('disabled', false);
    });

    // Apply font.
    $(SELECTOR.FONTAPPLY).on('click', function() {
        var selectedfont = $(SELECTOR.FONTSELECTOR).selectpicker('val') + '';
        $(SELECTOR.FONTSETTING).val(selectedfont).trigger('input').trigger('change');
        loadDemoFont(selectedfont);
        // $(SELECTOR.FONTVIEWER).find('.option-label').css('font-family', selectedfont);
        // $(SELECTOR.FONTVIEWER).find('.sample-text').css('font-family', selectedfont);
        syncFont();
        let inheritFont = [
            '[name="global-typography-smallpara-fontfamily"]',
            '[name="global-typography-smallinfo-fontfamily"]',
            '[name="button-common-fontfamily"]',
            '[name="hds-menu-font-family"]',
            '[name="footerfontfamily"]',
            '[name="footer-columntitle-fontfamily"]'
        ];
        ['all', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']
        .forEach(heading => {
            inheritFont.push('[name="typography-heading-' + heading + '-fontfamily"]');
        });
        inheritFont.forEach(id => {
            if ($(id).find('option[value="Inherit"]').length) {
                $(id).val("Inherit").trigger('input').trigger('change');
            } else if ($(id).find('option[value="inherit"]').length) {
                $(id).val("inherit").trigger('input').trigger('change');
            }
        });
        $(this).attr('disabled', true);
    });
}

/**
 * Load font on iframe.
 * @param {string} fontName Font name
 */
function loadDemoFont(fontName) {
    let id = fontName.replace(' ', '');
    id += '_js';
    if ($('body').find('#' + id).length != 0) {
        return;
    }
    let js = document.createElement('script');
    js.type = 'text/javascript';
    js.id = id;
    js.textContent = `require(['theme_remui/webfont'], function(webFont) {
        webFont.load({
            google: {
                families: ['${fontName}:100,200,300,400,500,600,700,800,900']
            }
        });
    });`;
    $('body').append(js);
}

export default {
    init,
    apply
};
