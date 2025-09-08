/* eslint-disable no-unused-vars */
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
 * Theme customizer global-heading js
 * @copyright (c) 2023 WisdmLabs (https://wisdmlabs.com/) <support@wisdmlabs.com>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 * @author    Yogesh Shirsath
 */

import $ from 'jquery';
import Utils from 'theme_remui/customizer/utils';

/**
 * Headings list
 */
var headings = ['all', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

/**
 * Selectors
 */
var SELECTOR = {
    HEADING: 'typography-heading',
    HEADINGADVSETTINGS: '[name=heading-adv-setting]',
    WEIGHTEREGULAR: '[name=heading-regular-fontweight]',
    WEIGHTESEMIBOLD: '[name=heading-semibold-fontweight]',
    WEIGHTEBOLD: '[name=heading-bold-fontweight]',
    WEIGHTEEXBOLD: '[name=heading-exbold-fontweight]',
    WEIGHTDIVIDER: '.heading-weight-divider',
    SETTINGITEM: ".setting-item",
    DNONE: "d-none",

};

let iframeDocument = Utils.getDocument();

// Add heading in selector.
headings.forEach(function(heading) {
    SELECTOR['FONTFAMILY' + heading] = `[name="typography-heading-${heading}-fontfamily"]`;
    SELECTOR['FONTSIZE' + heading] = `typography-heading-${heading}-fontsize`;
    // SELECTOR['FONTWEIGHT' + heading] = `[name="typography-heading-${heading}-fontweight"]`;
    SELECTOR['TEXTTRANSFORM' + heading] = `[name="typography-heading-${heading}-text-transform"]`;
    SELECTOR['LINEHEIGHT' + heading] = `[name="typography-heading-${heading}-lineheight"]`;
    SELECTOR['CUSTOMCOLOR' + heading] = `[name="typography-heading-${heading}-custom-color"]`;
    SELECTOR['TEXTCOLOR' + heading] = `[name="typography-heading-${heading}-textcolor"]`;
});

/**
 * Get site heading content.
 * @param {string} heading Heading tag
 * @return {string} site color content
 */
function getContent(heading) {
    let fontSize;
    let fontFamily = $(SELECTOR['FONTFAMILY' + heading]).val();
    if (fontFamily.toLowerCase() == 'inherit') {
        fontFamily = $(SELECTOR.FONTFAMILYall).val();
    }

    let tags = [heading, '.' + heading];

    let num = heading.replace('h', '');
    ['regular', 'semibold', 'bold', 'exbold']
    .forEach(type => {
        tags.push(`.h-${type}-${num}`);
    });

    let tag = tags.join(', ');
    let content = '';

    let advsettings = $(SELECTOR.HEADINGADVSETTINGS);
    let weightregular = $(SELECTOR.WEIGHTEREGULAR).val();
    let weightsemibold = $(SELECTOR.WEIGHTESEMIBOLD).val();
    let weightbold = $(SELECTOR.WEIGHTEBOLD).val();
    let weightexbold = $(SELECTOR.WEIGHTEEXBOLD).val();

    if (fontFamily.toLowerCase() != 'inherit') {
        Utils.loadFont(fontFamily);
    }

    content += `\n
        ${tag} {
    `;

    if (fontFamily.toLowerCase() != 'inherit') {
        content += `\nfont-family: "${fontFamily}",sans-serif !important;`;
    }

    fontSize = $(`[name="${SELECTOR['FONTSIZE' + heading]}"]`).val();
    content += `\nfont-size: ${fontSize}rem;`;

    // let fontWeight = $(SELECTOR['FONTWEIGHT' + heading]).val();
    // if (fontWeight.toLowerCase() != 'inherit') {
    //     content += `\nfont-weight: ${fontWeight};`;
    // }

    let textTransform = $(SELECTOR['TEXTTRANSFORM' + heading]).val();
    if (textTransform.toLowerCase() == 'inherit') {
        textTransform = $(SELECTOR.TEXTTRANSFORMall).val();
    }
    if (textTransform.toLowerCase() != 'inherit') {
        content += `\ntext-transform: ${textTransform};`;
    }

    let lineHeight = $(SELECTOR['LINEHEIGHT' + heading]).val();
    if (lineHeight != '') {
        content += `\nline-height: ${lineHeight};`;
    }

    let customcolor = $(SELECTOR['CUSTOMCOLOR' + heading]).is(':checked');
    if (customcolor == true) {
        $(SELECTOR['TEXTCOLOR' + heading]).closest('.setting-item').slideDown(100);
    } else {
        $(SELECTOR['TEXTCOLOR' + heading]).closest('.setting-item').slideUp(100);
    }

    let textColor = $(SELECTOR.TEXTCOLORall).val();
    if (customcolor == true) {
        textColor = $(SELECTOR['TEXTCOLOR' + heading]).val();
    }

    content += `\ncolor: ${textColor} !important;
    }`;
    content += `#page-admin-roles-permissions table.rolecap thead,
                #page-admin-roles-check .rolecap thead,
                .rolecap .cap-desc a,
                .rolecap  .allowedroles span,.userselector #reportuser optgroup,
                #userselector_options_sizer #userselector_options_caption a,
                .edw-card-design-hd .categoryname{
        color: ${textColor} !important
    }`;
    // course page header content

    content += `.header-heading.coursepage.design-1,
    .instructor-info.stat-container .h-semibold-6{
        color: white !important
    }`;

    if (advsettings.is(':checked')) {
        content += `.h-regular-1,.h-regular-2,.h-regular-3,.h-regular-4,.h-regular-5,.h-regular-6{
            font-weight: ${weightregular} !important;
        }
        .h-semibold-1,.h-semibold-2,.h-semibold-3,.h-semibold-4,.h-semibold-5,.h-semibold-6{
            font-weight: ${weightsemibold} !important;
        }
        .h-bold-1,.h-bold-2,.h-bold-3,.h-bold-4,.h-bold-5,.h-bold-6{
            font-weight: ${weightbold} !important;
        }
        .h-exbold-1,.h-exbold-2,.h-exbold-3,.h-exbold-4,.h-exbold-5,.h-exbold-6{
            font-weight: ${weightexbold} !important;
        }
        `;
    }else{
        content += `.h-regular-1,.h-regular-2,.h-regular-3,.h-regular-4,.h-regular-5,.h-regular-6{
            font-weight: 400 !important;
        }
        .h-semibold-1,.h-semibold-2,.h-semibold-3,.h-semibold-4,.h-semibold-5,.h-semibold-6{
            font-weight: 600 !important;
        }
        .h-bold-1,.h-bold-2,.h-bold-3,.h-bold-4,.h-bold-5,.h-bold-6{
            font-weight: 700 !important;
        }
        .h-exbold-1,.h-exbold-2,.h-exbold-3,.h-exbold-4,.h-exbold-5,.h-exbold-6{
            font-weight: 800 !important;
        }
        `;
    }
    // Tablet.
    fontSize = $(`[name='${SELECTOR['FONTSIZE' + heading]}-tablet']`).val();
    if (fontSize != '') {
        content += `\n
            @media screen and (min-width: ${Utils.deviceWidth.sm + 1}px)
            and (max-width: ${Utils.deviceWidth.md}px) {
                ${tag} {
                    font-size: ${fontSize}rem;
                }
            }
        `;
    }
    return content;
}

/**
 * Hide or unhide weight settings.
 */

function weightsettingsvisibility() {
    let show = $(SELECTOR.HEADINGADVSETTINGS).is(":checked");

    $(SELECTOR.WEIGHTEREGULAR)
        .closest(SELECTOR.SETTINGITEM)
        .toggleClass(SELECTOR.DNONE, !show);

    $(SELECTOR.WEIGHTESEMIBOLD)
        .closest(SELECTOR.SETTINGITEM)
        .toggleClass(SELECTOR.DNONE, !show);

    $(SELECTOR.WEIGHTEBOLD)
        .closest(SELECTOR.SETTINGITEM)
        .toggleClass(SELECTOR.DNONE, !show);

    $(SELECTOR.WEIGHTEEXBOLD)
        .closest(SELECTOR.SETTINGITEM)
        .toggleClass(SELECTOR.DNONE, !show);

    $(SELECTOR.WEIGHTDIVIDER)
        .closest(SELECTOR.SETTINGITEM)
        .toggleClass(SELECTOR.DNONE, !show);
}


/**
 * Apply settings.
 */
function apply() {
    headings.forEach(function (heading) {
        weightsettingsvisibility();
        if (heading == 'all') {
            return;
        }
        Utils.putStyle(SELECTOR.HEADING + heading, getContent(heading));
    });
}



/**
 * Initialize events.
 */
function init() {
    var select = [];
    var color = [];
    headings.forEach(function(heading) {
        select.push(`
            ${SELECTOR['FONTFAMILY' + heading]},
            [name='${SELECTOR['FONTSIZE' + heading]}'],
            [name='${SELECTOR['FONTSIZE' + heading]}-tablet'],
            [name='${SELECTOR['FONTSIZE' + heading]}-mobile'],
            ${SELECTOR['TEXTTRANSFORM' + heading]},
            ${SELECTOR['LINEHEIGHT' + heading]},
            ${SELECTOR['CUSTOMCOLOR' + heading]}
        `);
        color.push(SELECTOR['TEXTCOLOR' + heading]);
    });

    $(select.join(', ')).on('input', function() {
        let heading = $(this).attr('name').split('-').splice(2, 1)[0];
        if (heading == 'all') {
            apply();
            return;
        }
        Utils.putStyle(SELECTOR.HEADING + heading, getContent(heading));
    });

    $(color.join(', ')).on('color.changed', function() {
        let heading = $(this).attr('name').split('-').splice(2, 1)[0];
        if (heading == 'all') {
            apply();
            return;
        }
        Utils.putStyle(SELECTOR.HEADING + heading, getContent(heading));
    });
    $(SELECTOR.HEADINGADVSETTINGS).on('change', function () {
        weightsettingsvisibility();
        apply();
    });

    $(SELECTOR.WEIGHTEREGULAR).on('change', function () {
        apply();
    });

    $(SELECTOR.WEIGHTESEMIBOLD).on('change', function () {
        apply();
    });

    $(SELECTOR.WEIGHTEBOLD).on('change', function () {
        apply();
    });

    $(SELECTOR.WEIGHTEEXBOLD).on('change', function () {
        apply();
    });
}

export default {
    init,
    apply
};
