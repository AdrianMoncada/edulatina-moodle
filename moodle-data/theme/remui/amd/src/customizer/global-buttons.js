/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
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
 * Theme customizer global-buttons js
 * @copyright (c) 2023 WisdmLabs (https://wisdmlabs.com/) <support@wisdmlabs.com>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 * @author    Yogesh Shirsath
 */

import $ from 'jquery';
import Utils from 'theme_remui/customizer/utils';
import ColorUtils from 'theme_remui/customizer/color-utils';

/**
 * Primary button selectors
 */
var MDSETTINGS = {
    BASE: 'button-md',
    FONTSIZE: 'button-md-settings-fontsize',
    FONTWEIGHT: '[name="button-md-settings-fontweight"]',
    LINEHEIGHT: '[name="button-md-settings-lineheight"]',
    LETTERSPACING: '[name="button-md-settings-letterspacing"]',
    BORDERWIDTH: '[name="button-md-settings-border-width"]',
    BORDERRAD: '[name="button-md-settings-border-radius"]',
    PADDINGTOP: 'button-md-settings-padingtop',
    PADDINGRIGHT: 'button-md-settings-padingright',
    PADDINGBOTTOM: 'button-md-settings-padingbottom',
    PADDINGLEFT: 'button-md-settings-padingleft'
};

/**
 * Sm button selectors
 */
var SMSETTINGS = {
    BASE: 'button-sm',
    FONTSIZE: 'button-sm-settings-fontsize',
    FONTWEIGHT: '[name="button-sm-settings-fontweight"]',
    LINEHEIGHT: '[name="button-sm-settings-lineheight"]',
    LETTERSPACING: '[name="button-sm-settings-letterspacing"]',
    BORDERWIDTH: '[name="button-sm-settings-border-width"]',
    BORDERRAD: '[name="button-sm-settings-border-radius"]',
    PADDINGTOP: 'button-sm-settings-padingtop',
    PADDINGRIGHT: 'button-sm-settings-padingright',
    PADDINGBOTTOM: 'button-sm-settings-padingbottom',
    PADDINGLEFT: 'button-sm-settings-padingleft'
};

/**
 * Primary button selectors
 */
var LGSETTINGS = {
    BASE: 'button-lg',
    FONTSIZE: 'button-lg-settings-fontsize',
    FONTWEIGHT: '[name="button-lg-settings-fontweight"]',
    LINEHEIGHT: '[name="button-lg-settings-lineheight"]',
    LETTERSPACING: '[name="button-lg-settings-letterspacing"]',
    BORDERWIDTH: '[name="button-lg-settings-border-width"]',
    BORDERRAD: '[name="button-lg-settings-border-radius"]',
    PADDINGTOP: 'button-lg-settings-padingtop',
    PADDINGRIGHT: 'button-lg-settings-padingright',
    PADDINGBOTTOM: 'button-lg-settings-padingbottom',
    PADDINGLEFT: 'button-lg-settings-padingleft'
};

/**
 * Secondary button selectors
 */
var PRIMARY = {
    BASE: 'button-primary',
    TYPE: 'primary',
    TEXTCOLOR: '[name="button-primary-color-text"]',
    ICONCOLOR: '[name="button-primary-color-icon"]',
    BACKGROUNDCOLOR: '[name="button-primary-color-background"]',
    BORDERCOLOR: '[name="button-primary-border-color"]',
    TEXTHOVERCOLOR: '[name="button-primary-color-text-hover"]',
    ICONHOVERCOLOR: '[name="button-primary-color-icon-hover"]',
    BACKGROUNDHOVERCOLOR: '[name="button-primary-color-background-hover"]',
    BORDERHOVERCOLOR: '[name="button-primary-border-color-hover"]',
};


/**
 * Secondary button selectors
 */
var SECONDARY = {
    BASE: 'button-secondary',
    TYPE: 'secondary',
    TEXTCOLOR: '[name="button-secondary-color-text"]',
    ICONCOLOR: '[name="button-secondary-color-icon"]',
    BACKGROUNDCOLOR: '[name="button-secondary-color-background"]',
    BORDERCOLOR: '[name="button-secondary-border-color"]',
    TEXTHOVERCOLOR: '[name="button-secondary-color-text-hover"]',
    ICONHOVERCOLOR: '[name="button-secondary-color-icon-hover"]',
    BACKGROUNDHOVERCOLOR: '[name="button-secondary-color-background-hover"]',
    BORDERHOVERCOLOR: '[name="button-secondary-border-color-hover"]',
};

/**
 * Common button selectors
 */

var COMMON = {
    BASE: 'button-common',
    BORDERRADIUS: '[name="button-common-border-radius"]',
    BORDERWIDTH: '[name="button-common-border-width"]',
    FONTFAMILY: '[name="button-common-fontfamily"]',
    TEXTTRANSFORM: '[name="button-common-text-transform"]',
    LETTERSPACING: '[name="button-common-letterspacing"]',
};

/**
 * Process selector specific setting settings.
 * @param {String} type Type of button
 * @param {Object} SELECTOR Selector object
 * @return {String}
 */
function processSelectorSpecificSettings(type, SELECTOR) {
    let content = '';
    // Font family.
    // Font size.
    let fontSize = $(`[name='${SELECTOR.FONTSIZE}']`).val();
    if (fontSize != '') {
        content += `\n
        font-size: ${fontSize}rem;
        `;
    }

    // Font weight.
    let fontWeight = $(SELECTOR.FONTWEIGHT).val();
    if (fontWeight != 'default') {
        content += `\n
        font-weight: ${fontWeight};
        `;
    }

    // Line height.
    let letterSpacing = $(SELECTOR.LETTERSPACING).val();
    if (letterSpacing) {
        content += `\n
        letter-spacing: ${letterSpacing}rem;
        `;
    }
    // Line height.
    let borderWidth = $(SELECTOR.BORDERWIDTH).val();
    if (borderWidth) {
        content += `\n
        border-width: ${borderWidth}px;
        `;
    }
    // Line height.
    let borderRadius = $(SELECTOR.BORDERRAD).val();
    if (borderRadius) {
        content += `\n
        border-radius: ${borderRadius}px;
        `;
    }

    // Line height.
    let lineHeight = $(SELECTOR.LINEHEIGHT).val();
    if (lineHeight) {
        content += `\n
        line-height: ${lineHeight};
        `;
    }

    // Padding top.
    let paddingTop = $(`[name='${SELECTOR.PADDINGTOP}']`).val();
    if (paddingTop != '') {
        content += `\n
        padding-top: ${paddingTop}rem;
        `;
    }

    // Padding right.
    let paddingRight = $(`[name='${SELECTOR.PADDINGRIGHT}']`).val();
    if (paddingRight != '') {
        content += `\n
        padding-right: ${paddingRight}rem;
        `;
    }

    // Padding bottom.
    let paddingBottom = $(`[name='${SELECTOR.PADDINGBOTTOM}']`).val();
    if (paddingBottom != '') {
        content += `\n
        padding-bottom: ${paddingBottom}rem;
        `;
    }

    // Padding left.
    let paddingLeft = $(`[name='${SELECTOR.PADDINGLEFT}']`).val();
    if (paddingLeft != '') {
        content += `\n
            padding-left: ${paddingLeft}rem;
        `;
    }


    content += `\n`;
    if (type == 'medium') {
        return `.btn{
            ${content}
        }`;
    }
    return `.btn-${type}{
        ${content}
    }`;
}

/**
 * Process common settings.
 * @param {String} type Type of button
 * @param {Object} SELECTOR Selector object
 * @return {String}
 */
function processCommonSettings(type, SELECTOR) {
    let borderWidth = $(SELECTOR.BORDERWIDTH).val();
    let borderRadius = $(SELECTOR.BORDERRADIUS).val();
    let textTransform = $(SELECTOR.TEXTTRANSFORM).val();
    let letterSpacing = $(SELECTOR.LETTERSPACING).val();
    let fontFamily = $(SELECTOR.FONTFAMILY).val();
    let content = '';

    // Font family.
    if (fontFamily != 'default') {
        if (fontFamily.toLowerCase() == 'standard') {
            fontFamily = 'Inter';
        }
        if (fontFamily.toLowerCase() != 'inherit') {
            Utils.loadFont(fontFamily);
        }
    }
    content += `
        .btn{
            border-width: ${borderWidth}px;
            border-radius: ${borderRadius}px;
            text-transform: ${textTransform};
            letter-spacing: ${letterSpacing}rem;
    `;

    // Font family.
    if (fontFamily != 'default') {
        content += `\n
        font-family: ${fontFamily}, sans-serif;
        `;
    }
    content += `\n
    }`;

    return content;
}

/**
 * Process primary button settings.
 */
function processMd() {

    let content = '';

    // Process common settings.
    content += processCommonSettings('common', COMMON);
    // Process common settings for desktop
    content += processSelectorSpecificSettings('medium', MDSETTINGS);
    // Process common settings for desktop
    content += processSelectorSpecificSettings('lg', LGSETTINGS);
    content += processSelectorSpecificSettings('sm', SMSETTINGS);

    Utils.putStyle(MDSETTINGS.BASE, content);
}
/**
 * Process sm button settings.
 */
function processSm() {
    let content = '';
    // Process common settings.
    content += processCommonSettings('common', COMMON);
    content += processSelectorSpecificSettings('medium', MDSETTINGS);
    // Process common settings for desktop
    content += processSelectorSpecificSettings('sm', SMSETTINGS);
    content += processSelectorSpecificSettings('lg', LGSETTINGS);
    Utils.putStyle(MDSETTINGS.BASE, content);
}

/**
* Process lg button settings.
*/
function processlg() {
    let content = '';
    // Process common settings.
    content += processCommonSettings('common', COMMON);
    content += processSelectorSpecificSettings('medium', MDSETTINGS);
    // Process common settings for desktop
    content += processSelectorSpecificSettings('lg', LGSETTINGS);
    content += processSelectorSpecificSettings('sm', SMSETTINGS);
    Utils.putStyle(MDSETTINGS.BASE, content);
}

/**
 * Process secondary button settings.
 */
function processSecondary() {
    var SELECTOR = SECONDARY;
    processColors(SELECTOR);

}

/**
 * Process primary button settings.
 */
function processPrimary() {
    var SELECTOR = PRIMARY;
    processColors(SELECTOR);

}

/**
 * Process secondary button settings.
 * @param {Object} SELECTOR  selector on which setting will be applied
 */
function processColors(SELECTOR) {
    let textColor = $(SELECTOR.TEXTCOLOR).spectrum('get').toString();
    let textHoverColor = $(SELECTOR.TEXTHOVERCOLOR).spectrum('get').toString();
    let textActiveColor = ColorUtils.shade(textColor, 41);
    let iconColor = $(SELECTOR.ICONCOLOR).spectrum('get').toString();
    let iconHoverColor = $(SELECTOR.ICONHOVERCOLOR).spectrum('get').toString();
    let iconActiveColor = ColorUtils.shade(iconColor, 41);
    let backgroundColor = $(SELECTOR.BACKGROUNDCOLOR).spectrum('get').toString();
    let backgroundHoverColor = $(SELECTOR.BACKGROUNDHOVERCOLOR).spectrum('get').toString();
    let backgroundActiveColor = ColorUtils.shade(backgroundColor, 41);
    let borderColor = $(SELECTOR.BORDERCOLOR).spectrum('get').toString();
    let borderHoverColor = $(SELECTOR.BORDERHOVERCOLOR).spectrum('get').toString();
    let borderActiveColor = ColorUtils.shade(borderColor, 41);
    let type = SELECTOR.TYPE;

    let content = '';
    content += `
        .btn-${type} {
            color: ${textColor} !important;
            background: ${backgroundColor} !important;
            border-color: ${borderColor} !important;
        }
        .btn-${type} .fa,.btn-${type} .edw-icon {
            color: ${iconColor};
        }
        .btn-${type}:hover {
            color: ${textHoverColor} !important;
            background: ${backgroundHoverColor} !important;
            border-color: ${borderHoverColor} !important;
        }
        .btn-${type}:hover .fa:not(.footer-popover-section-links .fa),.btn-${type}:hover .edw-icon:not(.footer-popover-section-links .edw-icon) {
            color: ${iconHoverColor} !important;
        }
        .btn-${type}:active {
            color: ${textActiveColor};
            border-color: ${borderActiveColor} !important;
        }
        .btn-${type}:active .fa,.btn-${type}:active .edw-icon {
            color: ${iconActiveColor} !important;
        }
    `;
    Utils.putStyle(SELECTOR.BASE, content);
}

/**
 * Apply settings.
 */
function apply() {
    initLg();
    initSm();
    processMd();
    processPrimary();
    processSecondary();
}

/**
 * Initialize common settings.
 * @param {Function} callBack Callback function
 * @param {Object}   SELECTOR Selector object
 * @param {Object}   COMMON Selector object
 */
function initCommonSettings(callBack, SELECTOR, COMMON) {
    $(`
        ${SELECTOR.BORDERWIDTH},
        ${SELECTOR.BORDERRAD},
        ${COMMON.FONTFAMILY},
        ${SELECTOR.LETTERSPACING},
        ${COMMON.TEXTTRANSFORM},
        [name='${SELECTOR.FONTSIZE}'],
        ${SELECTOR.FONTWEIGHT},
        ${SELECTOR.LINEHEIGHT},
        [name='${SELECTOR.PADDINGTOP}'],
        [name='${SELECTOR.PADDINGRIGHT}'],
        [name='${SELECTOR.PADDINGBOTTOM}'],
        [name='${SELECTOR.PADDINGLEFT}']
    `).on('input', function () {
        callBack();
    });
}

/**
 * Initialize primary button's settings events.
 */
function initMd() {
    initCommonSettings(processMd, MDSETTINGS, COMMON);
}

/**
 * Initialize primary sm button's settings events.
 */
function initSm() {
    initCommonSettings(processSm, SMSETTINGS, COMMON);
}

/**
 * Initialize lg button's settings events.
 */
function initLg() {
    initCommonSettings(processlg, LGSETTINGS, COMMON);
}

/**
 * Initialize secondary button's settings events.
 */
function initPrimary() {
    initCommonSettings(processPrimary, PRIMARY, COMMON);
    $(`
        ${PRIMARY.TEXTCOLOR},
        ${PRIMARY.ICONCOLOR},
        ${PRIMARY.BACKGROUNDCOLOR},
        ${PRIMARY.BORDERCOLOR},
        ${PRIMARY.TEXTHOVERCOLOR},
        ${PRIMARY.ICONHOVERCOLOR},
        ${PRIMARY.BACKGROUNDHOVERCOLOR},
        ${PRIMARY.BORDERHOVERCOLOR}
    `).on('color.changed', function () {
        processPrimary();
    });
}

/**
 * Initialize secondary button's settings events.
 */
function initSecondary() {
    initCommonSettings(processSecondary, SECONDARY, COMMON);
    $(`
        ${SECONDARY.TEXTCOLOR},
        ${SECONDARY.ICONCOLOR},
        ${SECONDARY.BACKGROUNDCOLOR},
        ${SECONDARY.BORDERCOLOR},
        ${SECONDARY.TEXTHOVERCOLOR},
        ${SECONDARY.ICONHOVERCOLOR},
        ${SECONDARY.BACKGROUNDHOVERCOLOR},
        ${SECONDARY.BORDERHOVERCOLOR}
    `).on('color.changed', function () {
        processSecondary();
    });
}

/**
 * Initialize events.
 */
function init() {
    initSm();
    initLg();
    initMd();
    initPrimary();
    initSecondary();
}
export default {
    init,
    apply
};
