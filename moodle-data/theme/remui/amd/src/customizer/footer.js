/* eslint-disable no-console, no-unused-vars */
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
 * Theme customizer footer js
 * @copyright (c) 2023 WisdmLabs (https://wisdmlabs.com/) <support@wisdmlabs.com>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 * @author    Yogesh Shirsath
 */

import $ from "jquery";
import Templates from "core/templates";
import Utils from "theme_remui/customizer/utils";

/**
 * Selectors
 */
var SELECTOR = {
    BASE: "customizer-footer",
    BACKGROUNDCOLOR: '[name="footer-background-color"]',
    TEXTCOLOR: '[name="footer-text-color"]',
    LINKTEXT: '[name="footer-link-text"]',
    LINKHOVERTEXT: '[name="footer-link-hover-text"]',
    COLUMN: "footercolumn",
    COLUMNSIZE: "footercolumnsize",
    COLUMNSHEADING: "#heading_footer-advance-column",
    MENULIST: ".footer-menu-list",
    SHOWLOGO: '[name="footershowlogo"]',
    TERMSANDCONDITIONSSHOW: '[name="footertermsandconditionsshow"]',
    TERMSANDCONDITIONS: '[name="footertermsandconditions"]',
    PRIVACYPOLICYSHOW: '[name="footerprivacypolicyshow"]',
    PRIVACYPOLICY: '[name="footerprivacypolicy"]',
    COPYRIGHTSHOW: '[name="footercopyrightsshow"]',
    COPYRIGHT: '[name="footercopyrights"]',
    SETTINGITEM: ".setting-item",
    DNONE: "d-none",
    DIVIDERCOLOR: '[name="footer-divider-color"]',
    ICONDEFAULTCOLOR: '[name="footer-icon-color"]',
    ICONHOVERCOLOR: '[name="footer-icon-hover-color"]',
    FOOTERFONTFAMILY: '[name="footerfontfamily"]',
    FOOTERFONTWEIGHT: '[name="footerfontweight"]',
    FOOTERTEXTTRANSFORM: '[name="footerfonttext-transform"]',
    FOOTERFONTSIZE: '[name="footerfontsize"]',
    FOOTERFONTLINEHEIGHT: '[name="footerfontlineheight"]',
    FOOTERFONTLTRSPACE: '[name="footerfontltrspace"]',
    FOOTERCOLUMNTITLEFONTFAMILY: '[name="footer-columntitle-fontfamily"]',
    FOOTERCOLUMMTITLEFONTSIZE: '[name="footer-columntitle-fontsize"]',
    FOOTERCOLUMNTITLEFONTWEIGHT: '[name="footer-columntitle-fontweight"]',
    FOOTERCOLUMMTITLETEXTTRANSFORM: '[name="footer-columntitle-textransform"]',
    FOOTERCOLUMMTITLELINEHEIGHT: '[name="footer-columntitle-lineheight"]',
    FOOTERCOLUMMTITLELTRSPACE: '[name="footer-columntitle-ltrspace"]',
    FOOTERCOLUMMTITLECOLOR: '[name="footer-columntitle-color"]',
    USEHEADERLOGO: '[name="useheaderlogo"]',
    SECONDARYFOOTERLOGO: '[name="secondaryfooterlogo"]',
    SECONDARYFOOTERLOGODARKMODE: '[name="secondaryfooterlogodarkmode"]',
    FOOTERLOGOCOLOR: '[name="footer-logo-color"]',
    FOOTERMAINSECTIONWRAPPER: '.footer-mainsection-wrapper',
    POWEREDBY: '[name="poweredbyedwiser"]',
    PRIVACYPOLICYNEWTAB: '[name=privacypolicynewtab]',
    TERMSANDCONDITIONSNEWTAB: '[name=termsandconditionewtab]',

    SOCIALICONS: `
        [name="facebooksetting"],
        [name="twittersetting"],
        [name="linkedinsetting"],
        [name="youtubesetting"],
        [name="gplussetting"],
        [name="instagramsetting"],
        [name="pinterestsetting"],
        [name="quorasetting"],
        [name="whatsappsetting"],
        [name="telegramsetting"]
    `,
    // Header selectors.
    HEADER: {
        LOGOORSITENAME: '[name="logoorsitename"]',
        LOGO: '[name="logo"]',
        LOGOMINI: '[name="logomini"]',
        ICON: '[name="siteicon"]',
        DARKMODELOGO: '[name="darkmodelogo"]',
        DARKMODELOGOMINI: '[name="darkmodelogomini"]',
    }
};

var CONSTANTS = {
    NIGHTEYESTATE: 'nighteyewState',
    CURRNIGHTEYESTATE: 'currnighteyewState'
};
/**
 * Social icon details.
 */
let socialList = {
    'facebook': {
        'class': "social-facebook",
        'icon': "icon edw-icon edw-icon-Facebook",
        'title': M.util.get_string('follometext', 'theme_remui', 'facebook')
    },
    'twitter': {
        'class': "social-twitter",
        'icon': "icon edw-icon edw-icon-Twitter",
        'title': M.util.get_string('follometext', 'theme_remui', 'twitter')

    },
    'linkedin': {
        'class': "social-linkedin",
        'icon': "icon edw-icon edw-icon-Linkedin",
        'title': M.util.get_string('follometext', 'theme_remui', 'linkedin')
    },
    'gplus': {
        'class': "social-google-plus",
        'icon': "icon edw-icon edw-icon-Gplus",
        'title': M.util.get_string('follometext', 'theme_remui', 'gplus')
    },
    'youtube': {
        'class': "social-youtube",
        'icon': "icon fa fa-youtube",
        'title': M.util.get_string('follometext', 'theme_remui', 'youtube')
    },
    'instagram': {
        'class': "social-instagram",
        'icon': "icon fa fa-instagram",
        'title': M.util.get_string('follometext', 'theme_remui', 'instagram')
    },
    'pinterest': {
        'class': "social-pinterest",
        'icon': "icon fa fa-pinterest",
        'title': M.util.get_string('follometext', 'theme_remui', 'pinterest')
    },
    'quora': {
        'class': "social-quora",
        'icon': "icon fa fa-quora",
        'title': M.util.get_string('follometext', 'theme_remui', 'quore')
    },
    'whatsapp': {
        'class': "social-whatsapp",
        'icon': "icon fa fa-whatsapp",
        'title': M.util.get_string('follometext', 'theme_remui', 'whatsapp')
    },
    'telegram': {
        'class': "social-telegram",
        'icon': "icon fa fa-telegram",
        'title': M.util.get_string('follometext', 'theme_remui', 'telegram')
    }
};

/**
 * Resize class for widget width.
 * @param {Event}    event    Resize start event
 */
function resize(event) {
    let drag = {};
    drag.iframeDocument = Utils.getDocument();
    drag.column = $(event.target.parentElement);
    drag.index = $(drag.column).index();
    drag.sibling = $(drag.column).next();
    drag.parent = $(drag.column).closest(`.resizer`);
    drag.widths = $(`[name="${SELECTOR.COLUMNSIZE}"]`).val().split(",");
    $(drag.column).closest(".resizer").addClass("resizing");

    if (event.type === "touchstart") {
        drag.startX = event.touches[0].clientX;
    } else {
        drag.startX = event.clientX;
    }

    drag.colStartWidth = $(drag.column).outerWidth();
    drag.sibStartWidth = $(drag.sibling).outerWidth();
    drag.parentWidth = $(drag.parent).outerWidth();

    drag.move = (evt) => {
        let clientX;
        if (evt.type === "touchmove") {
            clientX = evt.touches[0].clientX;
        } else {
            clientX = evt.clientX;
        }
        let newColWidth = drag.colStartWidth + clientX - drag.startX;
        let newSibWidth = drag.sibStartWidth - clientX + drag.startX;

        let percent = function(val, total) {
            return (val / total) * 100;
        };
        let colWidthPercent = parseFloat(
            percent(newColWidth, drag.parentWidth)
        ).toFixed(1);
        if (colWidthPercent < 15) {
            return;
        }
        let sibWidthPercent = parseFloat(
            percent(newSibWidth, drag.parentWidth)
        ).toFixed(1);
        if (sibWidthPercent < 15) {
            return;
        }

        // Main div width.
        $(drag.column)
            .css("width", `${colWidthPercent}%`)
            .find("label")
            .text(`${colWidthPercent}%`);
        $(drag.iframeDocument)
            .find(`#footer-column-${drag.index + 1}`)
            .css("flex", `0 0 ${colWidthPercent}%`);
        drag.widths[drag.index] = colWidthPercent;

        // Sibling div width.
        $(drag.sibling)
            .css("width", `${sibWidthPercent}%`)
            .find("label")
            .text(`${sibWidthPercent}%`);
        $(drag.iframeDocument)
            .find(`#footer-column-${drag.index + 2}`)
            .css("flex", `0 0 ${sibWidthPercent}%`);
        drag.widths[drag.index + 1] = sibWidthPercent;
    };

    drag.stop = () => {
        window.removeEventListener("mouseup", drag.stop);
        window.removeEventListener("touchend", drag.stop);
        window.removeEventListener("mousemove", drag.move);
        window.removeEventListener("touchmove", drag.move);
        $(`[name="${SELECTOR.COLUMNSIZE}"]`).val(drag.widths.join(","));
        $(drag.column).closest(".resizer").removeClass("resizing");
    };

    window.addEventListener("mouseup", drag.stop);
    window.addEventListener("touchend", drag.stop);
    window.addEventListener("mousemove", drag.move);
    window.addEventListener("touchmove", drag.move);
}

/**
 * Toggle footer primary is empty.
 */
function isFooterPrimaryVisible() {
    let type;
    let content;
    let hasSocial;
    let hasContent;
    let hasMenu;
    let widgetSocials;
    let visible = false;
    let emptySocial = true;
    let stripHtml = (html) => $(`<div>${html}</div>`).text().trim();
    let columns = $(`[name="${SELECTOR.COLUMN}"]`).val();
    let iframeDocument = Utils.getDocument();
    let socials = [];

    // Check if any social media link is visible.
    $(SELECTOR.SOCIALICONS).each(function() {
        if ($(this).val() != "") {
            emptySocial = false;
        }
        socials[$(this).attr("name").replace("setting", "")] = $(this).val();
    });
    for (let i = 1; i <= columns; i++) {
        type = $(`[name="${SELECTOR.COLUMN + i}type"]`).val();
        hasSocial = hasContent = hasMenu = false;
        switch (type) {
            case "social":
                if (emptySocial) {
                    break;
                }
                widgetSocials = $(`[name="${SELECTOR.COLUMN + i}social"]`).val();
                if (widgetSocials.length == 0) {
                    break;
                }
                // eslint-disable-next-line no-loop-func
                widgetSocials.forEach((social) => {
                    if (socials[social] != "") {
                        hasSocial = visible = true;
                    }
                });
                break;
            case "customhtml":
                content = $(`[name="${SELECTOR.COLUMN + i}customhtml"]`).val();
                if (stripHtml(content) !== "" || content.indexOf("img") !== -1) {
                    hasContent = visible = true;
                }
                break;
            case "menu":
                if ($(`[name="${SELECTOR.COLUMN + i}menu"]`).val() != "[]") {
                    hasMenu = visible = true;
                }
                break;
        }
        // $(iframeDocument).find(`#page-footer #footer-column-${i} .custom-html`).toggleClass('invisible', !hasContent);
        // $(iframeDocument).find(`#page-footer #footer-column-${i} .social-links`).toggleClass('invisible', !hasSocial);
        // $(iframeDocument).find(`#page-footer #footer-column-${i} .footer-menu`).toggleClass('invisible', !hasMenu);
    }
    $(iframeDocument)
        .find(`#page-footer .footer-primary`)
        .toggleClass("d-none", !visible);
}

/**
 * Toggle number of columns
 */
function toggleColumns() {
    let columns = $(`[name="${SELECTOR.COLUMN}"]`).val();
    let iframeDocument = Utils.getDocument();
    let i = 1;
    for (; i <= columns; i++) {
        $(SELECTOR.COLUMNSHEADING + i).show();
        $(iframeDocument).find(`#footer-column-${i}`).removeClass(SELECTOR.DNONE);
    }
    for (; i <= 4; i++) {
        $(SELECTOR.COLUMNSHEADING + i).hide();
        $(iframeDocument).find(`#footer-column-${i}`).addClass(SELECTOR.DNONE);
    }
}

/**
 * Toggle column type.
 * @param {Integer} index Footer column index
 */
function toggleType(index) {
    let type = $(`[name="${SELECTOR.COLUMN + index}type"]`).val();
    let showSocial = $(`[name="socialmediaiconcol${index}"]`).is(":checked");
    let iframeDocument = Utils.getDocument();

    // Toggle custom html.
    $(`[name="footercolumn${index}customhtml"]`)
        .closest(SELECTOR.SETTINGITEM)
        .toggleClass(SELECTOR.DNONE, type != "customhtml");

    // Toggle menu.
    $(`[name="footercolumn${index}menu"]`)
        .closest(SELECTOR.SETTINGITEM)
        .toggleClass(SELECTOR.DNONE, type == 'customhtml');

    // Toggle Social menu toggler.
    $(`[name="socialmediaiconcol${index}"]`)
        .closest(SELECTOR.SETTINGITEM)
        .toggleClass(SELECTOR.DNONE, type == 'menu');

    // Toggle social icons.
    $('[name="footercolumn' + index + 'social"]')
        .closest(SELECTOR.SETTINGITEM)
        .toggleClass(SELECTOR.DNONE, type == "menu" || !showSocial);
    $('.footercolumn' + index + 'social-note')
        .closest(SELECTOR.SETTINGITEM)
        .toggleClass(SELECTOR.DNONE, type == "menu" || !showSocial);

    // Show social icon selection when type is customhtml.
    $(iframeDocument)
        .find(`#footer-column-${index} .custom-html`)
        .toggleClass(SELECTOR.DNONE, type != "customhtml");

    // Toggle Menu.
    $(iframeDocument)
        .find(`#footer-column-${index} .footer-menu`)
        .toggleClass(SELECTOR.DNONE, type != "menu");

    // Toggle column type.
    $(iframeDocument)
        .find(`#footer-column-${index}`)
        .removeClass("column-type-customhtml column-type-social column-type-menu")
        .addClass("column-type-" + type);
}

/**
 * Update title in iframe.
 * @param {Integer} index Footer column index
 */
function titleChange(index) {
    let title = $(`[name="${SELECTOR.COLUMN}${index}title"]`).val();
    $(Utils.getDocument())
        .find(`#footer-column-${index} .custom-html .ftr-column-title`)
        .text(title);
    $(Utils.getDocument())
        .find(`#footer-column-${index} .footer-menu .ftr-column-title`)
        .text(title);
}

/**
 * Update title in iframe.
 * @param {Integer} index Footer column index
 */
function contentChange(index) {
    let content = $(`[name="${SELECTOR.COLUMN}${index}customhtml"]`).val();
    $(Utils.getDocument())
        .find(`#footer-column-${index} .custom-html .section-html-content`)
        .html(content);
}

/**
 * Apply footer colors.
 */
function footerColors() {
    let backgroundColor = $(SELECTOR.BACKGROUNDCOLOR).spectrum("get").toString();
    let textColor = $(SELECTOR.TEXTCOLOR).spectrum("get").toString();
    let linkText = $(SELECTOR.LINKTEXT).spectrum("get").toString();
    let linkHoverText = $(SELECTOR.LINKHOVERTEXT).spectrum("get").toString();
    let dividerColor = $(SELECTOR.DIVIDERCOLOR).spectrum("get").toString();
    let icondefaultColor = $(SELECTOR.ICONDEFAULTCOLOR).spectrum("get").toString();
    let iconhoverColor = $(SELECTOR.ICONHOVERCOLOR).spectrum("get").toString();
    let footercolumntitlecolor = $(SELECTOR.FOOTERCOLUMMTITLECOLOR).spectrum("get").toString();
    let footerlogocolor = $(SELECTOR.FOOTERLOGOCOLOR).spectrum("get").toString();
    let content = `
            #page-footer {
                background: ${backgroundColor} !important;
            }
            #page-footer .h1,
            #page-footer .h2,
            #page-footer .h3,
            #page-footer .h4,
            #page-footer .h5,
            #page-footer .h6,
            #page-footer h1,
            #page-footer h2,
            #page-footer h3,
            #page-footer h4,
            #page-footer h5,
            #page-footer h6,
            #page-footer p,
            #page-footer .footer-content-debugging-wrapper,.section-html-content,[id $=reactive-debugpanel] {
                color: ${textColor} !important;
            }
            #page-footer .footer-mainsection-wrapper a,
            #page-footer .footer-secondarysection-wrapper a,
            .purgecaches a {
                color: ${linkText} !important;
            }
            #page-footer .footer-mainsection-wrapper a:hover,
            #page-footer .footer-secondarysection-wrapper a:hover,
            .purgecaches a:hover {
                color: ${linkHoverText} !important;
            }
            #page-footer hr{
                border-color: ${dividerColor} !important;
            }
            #page-footer .footer-mainsection-wrapper .edw-icon,
            #page-footer .footer-mainsection-wrapper i {
                color: ${icondefaultColor} !important;
            }
            #page-footer .footer-mainsection-wrapper .edw-icon:hover,#page-footer .footer-mainsection-wrapper i:hover {
                color: ${iconhoverColor} !important;
            }
            #page-footer .ftr-column-title {
                color: ${footercolumntitlecolor} !important;
            }
            #page-footer .navbar-brand-logo {
                color: ${footerlogocolor} !important;
            }
        `;
    Utils.putStyle("customizer-footer-colors", content);
}

/**
 * Apply footer colors.
 */
function footerFonts() {
    let fontfamily = $(SELECTOR.FOOTERFONTFAMILY).val();
    let fontweight = $(SELECTOR.FOOTERFONTWEIGHT).val();
    let texttransformvalue = $(SELECTOR.FOOTERTEXTTRANSFORM).val();
    let fontsize = $(SELECTOR.FOOTERFONTSIZE).val();
    if (fontsize !== '') {
        fontsize = `font-size: ${fontsize}rem !important;`;
    }
    let footerfontlineheight = $(SELECTOR.FOOTERFONTLINEHEIGHT).val();
    if (footerfontlineheight) {
        footerfontlineheight = `line-height: ${footerfontlineheight}rem !important;`;
    }
    let footerfontltrspace = $(SELECTOR.FOOTERFONTLTRSPACE).val();
    if (footerfontltrspace) {
        footerfontltrspace = `letter-spacing: ${footerfontltrspace}px !important;`;
    }

    let columntitlefontfamily = $(SELECTOR.FOOTERCOLUMNTITLEFONTFAMILY).val();
    let columntitlefontweight = $(SELECTOR.FOOTERCOLUMNTITLEFONTWEIGHT).val();
    let columntitletexttransformvalue = $(SELECTOR.FOOTERCOLUMMTITLETEXTTRANSFORM).val();
    let columntitlefontsize = $(SELECTOR.FOOTERCOLUMMTITLEFONTSIZE).val();
    if (columntitlefontsize) {
        columntitlefontsize = `font-size:${columntitlefontsize}rem !important;`;
    }
    let columntitlefontlineheight = $(SELECTOR.FOOTERCOLUMMTITLELINEHEIGHT).val();
    if (columntitlefontlineheight) {
        columntitlefontlineheight = `line-height: ${columntitlefontlineheight}rem !important;`;
    }
    let columntitlefontltrspace = $(SELECTOR.FOOTERCOLUMMTITLELTRSPACE).val();
    if (columntitlefontltrspace) {
        columntitlefontltrspace = `letter-spacing: ${columntitlefontltrspace}px !important;`;
    }

    var fontcontent = "";
    if (fontfamily.toLowerCase() == "inherit") {
        fontcontent = "inherit";
    } else {
        fontcontent = fontfamily;
        Utils.loadFont(fontcontent);
    }

    var fontTitleContent = "";
    if (columntitlefontfamily.toLowerCase() == "inherit") {
        fontTitleContent = "inherit";
    } else {
        fontTitleContent = columntitlefontfamily;
        Utils.loadFont(fontTitleContent);
    }

    let content = `
            #page-footer,
            #page-footer .h1,
            #page-footer .h2,
            #page-footer .h3,
            #page-footer .h4,
            #page-footer .h5,
            #page-footer .h6,
            #page-footer h1,
            #page-footer h2,
            #page-footer h3,
            #page-footer h4,
            #page-footer h5,
            #page-footer .h-regular-6,
            #page-footer p,
            #page-footer a,
            #page-footer .footer-content-debugging-wrapper {
                ${fontsize}
                font-weight: ${fontweight} !important;
                ${footerfontlineheight}
                ${footerfontltrspace}

            }
            #page-footer {
                font-family: ${fontcontent} !important;
                text-transform:${texttransformvalue} !important;
            }
            .ftr-column-title {
                font-family: ${fontTitleContent} !important;
                ${columntitlefontsize}
                font-weight: ${columntitlefontweight} !important;
                ${columntitlefontlineheight}
                text-transform: ${columntitletexttransformvalue} !important;
                ${columntitlefontltrspace}
            }
        `;
    Utils.putStyle("customizer-footer-fonts", content);
}

/**
 * Observe column size change.
 */
function columnSizeChange() {
    let widths = $(`[name="${SELECTOR.COLUMNSIZE}"]`).val().split(",");
    let iframeDocument = Utils.getDocument();
    widths.forEach((width, index) => {
        $(iframeDocument)
            .find(`#footer-column-${index + 1}`)
            .css("flex", `0 0 ${width}%`);
    });
}

/**
 * Generate column size elements.
 */
function generateColumnSize() {
    let numberOfColumns = $(`[name="${SELECTOR.COLUMN}"]`).val();
    let widths = $(`[name="${SELECTOR.COLUMNSIZE}"]`)
        .val()
        .split(",")
        .slice(0, numberOfColumns);
    let parent = $(`[name="${SELECTOR.COLUMNSIZE}"]`).closest(".felement");
    toggleColumns();
    Templates.render("theme_remui/customizer/footer_widget_size", {
        widget: widths,
    }).done(function(html, js) {
        parent.find(".resizer-wrapper").remove();
        Templates.appendNodeContents(parent, html, js);
    });
}

/**
 * Social media link change
 * @param {String} name name of social setting
 * @param {String} link link of social setting
 */
function socialMediaLinks(name, link) {
    name = name.replace("setting", "");
    name = name == "gplus" ? "social-google-plus" : "social-" + name;
    let iframeDocument = Utils.getDocument();
    $(iframeDocument)
        .find(`#page-footer .social-links .${name}`)
        .attr("href", link)
        .toggleClass(SELECTOR.DNONE, link == "");
}

/**
 * Toggle social icons based on selections.
 * @param {Integer} index Footer column index
 */
function socialSelectionChanges(index) {
    let selection = $(`[name="${SELECTOR.COLUMN}${index}social"]`).val();
    let iframeDocument = Utils.getDocument();
    let link, additionalClass;
    $(iframeDocument)
        .find(`#footer-column-${index} .social-links a`).remove();
    selection.forEach((name) => {
        link = $(`[name="${name}setting"]`).val();
        additionalClass = link == '' ? SELECTOR.DNONE : '';
        $(iframeDocument)
            .find(`#footer-column-${index} .social-links`)
            .append(`<a href="${link}" class="${socialList[name].class} ${additionalClass}" text-decoration-none" title="${socialList[name].title}"><i class="${socialList[name].icon}"></i></a>`);
    });
}

/**
 * Update changed menu to column
 * @param {Integer} index Footer column index
 */
function menuChange(index) {
    let menu = $(`[name="${SELECTOR.COLUMN}${index}menu"]`).val();
    let iframeDocument = Utils.getDocument();
    try {
        menu = JSON.parse(menu);
    } catch (exception) {
        menu = [];
    }
    $(iframeDocument)
        .find(`#footer-column-${index} ${SELECTOR.MENULIST}`)
        .html("");
    menu.forEach((menuitem) => {
        $(iframeDocument)
            .find(`#footer-column-${index} ${SELECTOR.MENULIST}`)
            .append(
                `<a target="_blank" href="${menuitem.address}">${menuitem.text}</a>`
            );
    });
}

/**
 * Update menu orientation.
 * @param {Integer} index Footer column index
 */
function menuOrientationChange(index) {
    let orientation = $(
        `[name="${SELECTOR.COLUMN}${index}menuorientation"]`
    ).val();
    let iframeDocument = Utils.getDocument();
    $(iframeDocument)
        .find(`#footer-column-${index} .footer-menu`)
        .removeClass("menu-vertical menu-horizontal")
        .addClass("menu-" + orientation);
}

/**
 * Use different logo for footer.
 */
function useDifferentLogo() {
    if (!$(SELECTOR.SHOWLOGO).is(":checked")) {
        return;
    }
    let iframeDocument = Utils.getDocument();
    let useHeader = $(SELECTOR.USEHEADERLOGO).is(":checked");
    $(SELECTOR.SECONDARYFOOTERLOGO)
        .closest(SELECTOR.SETTINGITEM)
        .toggleClass(SELECTOR.DNONE, useHeader);
    $(SELECTOR.SECONDARYFOOTERLOGODARKMODE)
        .closest(SELECTOR.SETTINGITEM)
        .toggleClass(SELECTOR.DNONE, useHeader);

    $(SELECTOR.FOOTERLOGOCOLOR)
        .closest(SELECTOR.SETTINGITEM)
        .toggleClass(SELECTOR.DNONE, !useHeader);

    let itemid;
    if (!useHeader) {
        itemid = $(SELECTOR.SECONDARYFOOTERLOGO).val();

        if(localStorage.getItem(CONSTANTS.NIGHTEYESTATE) == 1) {
            itemid = $(SELECTOR.SECONDARYFOOTERLOGODARKMODE).val();
        }

        Utils.getFileURL(itemid).done(function(response) {
            if (response == "") {
                response = M.cfg.wwwroot + "/theme/remui/pix/logo.png";
            }
            $(iframeDocument)
                .find("#page-footer .footer-diff-logo .navbar-brand-logo")
                .attr("src", response);
        });
    } else {
        switch ($(SELECTOR.HEADER.LOGOORSITENAME).val()) {
            case 'logo':
                itemid = $(SELECTOR.HEADER.LOGO).val();
                if(localStorage.getItem(CONSTANTS.NIGHTEYESTATE) == 1) {
                    itemid = $(SELECTOR.HEADER.DARKMODELOGO).val();
                }

                Utils.getFileURL(itemid).done(function(response) {
                    if (response == "") {
                        response = M.cfg.wwwroot + "/theme/remui/pix/logo.png";
                    }
                    $(iframeDocument)
                        .find("#page-footer .navbar-logo-footer-wrapper .navbar-brand")
                        .html(`<img src="${response}" class="navbar-brand-logo logo"></img>`);
                });
                break;
            case 'logomini':
                itemid = $(SELECTOR.HEADER.LOGOMINI).val();
                if(localStorage.getItem(CONSTANTS.NIGHTEYESTATE) == 1) {
                    itemid = $(SELECTOR.HEADER.DARKMODELOGOMINI).val();
                }
                Utils.getFileURL(itemid).done(function(response) {
                    if (response == "") {
                        response = M.cfg.wwwroot + "/theme/remui/pix/logomini.png";
                    }
                    $(iframeDocument)
                        .find("#page-footer .navbar-logo-footer-wrapper .navbar-brand")
                        .html(`<img src="${response}" class="navbar-brand-logo logomini"></img>`);
                });
                break;
            case 'icononly':
                $(iframeDocument)
                .find("#page-footer .navbar-logo-footer-wrapper .navbar-brand")
                .html(`<span class="navbar-brand-logo icononly"><i class="fa fa-${$(SELECTOR.HEADER.ICON).val()}"></i></span>`);
                break;
            case 'iconsitename':
                $(iframeDocument)
                .find("#page-footer .navbar-logo-footer-wrapper .navbar-brand")
                .html(`<span class="navbar-brand-logo font-weight-bolder iconsitename">
                    <i class="fa fa-${$(SELECTOR.HEADER.ICON).val()}"></i>
                    &nbsp;
                    ${$('#customizer').data('sitename')}
                </span>`);
                break;
        }
    }
    $(iframeDocument)
        .find(".footer-diff-logo")
        .toggleClass(SELECTOR.DNONE, useHeader);
    $(iframeDocument)
        .find(".navbar-logo-footer-wrapper")
        .toggleClass(SELECTOR.DNONE, !useHeader);
}

/**
 * Show logo in secondary footer.
 */
function showLogo() {
    let iframeDocument = Utils.getDocument();
    let show = $(SELECTOR.SHOWLOGO).is(":checked");
    $(iframeDocument).find(".secondary-footer-logo").toggleClass(SELECTOR.DNONE, !show);
    $(`${SELECTOR.SECONDARYFOOTERLOGO}, ${SELECTOR.USEHEADERLOGO}, ${SELECTOR.FOOTERLOGOCOLOR}, ${SELECTOR.SECONDARYFOOTERLOGODARKMODE}`)
        .closest(SELECTOR.SETTINGITEM)
        .toggleClass(SELECTOR.DNONE, !show);
    if (show) {
        useDifferentLogo();
        return;
    }
}

/**
 * Show terms and conditions link in the footer.
 */
function termsAndConditionsShow() {
    let iframeDocument = Utils.getDocument();
    let show = $(SELECTOR.TERMSANDCONDITIONSSHOW).is(":checked");
    $(iframeDocument)
        .find(".footer-terms-and-conditions")
        .toggleClass(SELECTOR.DNONE, !show)
        .toggleClass("d-block", show);
    $(SELECTOR.TERMSANDCONDITIONS)
        .closest(SELECTOR.SETTINGITEM)
        .toggleClass(SELECTOR.DNONE, !show);
    $(SELECTOR.TERMSANDCONDITIONSNEWTAB)
        .closest(SELECTOR.SETTINGITEM)
        .toggleClass(SELECTOR.DNONE, !show);


}

/**
 * Handler terms and conditions.
 */
function termsAndConditions() {
    let iframeDocument = Utils.getDocument();
    let termsAndConditions = $(SELECTOR.TERMSANDCONDITIONS).val();
    $(iframeDocument)
        .find(".footer-terms-and-conditions")
        .attr("href", termsAndConditions);
}

/**
 * Show privacy policy link in the footer.
 */
function privacyPolicyShow() {
    let iframeDocument = Utils.getDocument();
    let show = $(SELECTOR.PRIVACYPOLICYSHOW).is(":checked");
    $(iframeDocument)
        .find(".footer-privacy-policy")
        .toggleClass(SELECTOR.DNONE, !show)
        .toggleClass("d-block", show);
    $(SELECTOR.PRIVACYPOLICY)
        .closest(SELECTOR.SETTINGITEM)
        .toggleClass(SELECTOR.DNONE, !show);
    $(SELECTOR.PRIVACYPOLICYNEWTAB)
        .closest(SELECTOR.SETTINGITEM)
        .toggleClass(SELECTOR.DNONE, !show);
}

/**
 * Handle privacy policy link.
 */
function privacyPolicy() {
    let iframeDocument = Utils.getDocument();
    let privacyPolicy = $(SELECTOR.PRIVACYPOLICY).val();
    $(iframeDocument).find(".footer-privacy-policy").attr("href", privacyPolicy);
}

/**
 * Show copyright in the footer.
 */
function copyrightShow() {
    let iframeDocument = Utils.getDocument();
    let show = $(SELECTOR.COPYRIGHTSHOW).is(":checked");
    $(iframeDocument)
        .find(".secondary-footer-copyright")
        .toggleClass(SELECTOR.DNONE, !show);
    $(SELECTOR.COPYRIGHT)
        .closest(SELECTOR.SETTINGITEM)
        .toggleClass(SELECTOR.DNONE, !show);
}
/**
 * Show poweredby in the footer.
 */
function togglePoweredBy() {

    const coreHTML = `
        ${M.util.get_string('poweredby', 'theme_remui')} <a href="https://moodle.com">Moodle</a>
    `;

    const edwHTML = `
        ${M.util.get_string('poweredby', 'theme_remui')}
        <a href="https://edwiser.org/remui/" rel="nofollow" target="_blank">
            Edwiser RemUI
        </a>
    `;

    let iframeDocument = Utils.getDocument();

    if ($(SELECTOR.POWEREDBY).is(":checked")) {
        $(iframeDocument).find(".footer-poweredby").empty().append(edwHTML);
    } else {
        $(iframeDocument).find(".footer-poweredby").empty().append(coreHTML);
    }
}
/**
 * Handler copyright content.
 */
function copyright() {
    let iframeDocument = Utils.getDocument();
    let copyright = $(SELECTOR.COPYRIGHT)
        .val()
        .replaceAll(
            "[site]",
            $(iframeDocument).find(".secondary-footer-copyright").data("site")
        )
        .replaceAll("[year]", new Date().getFullYear());
    $(iframeDocument).find(".secondary-footer-copyright").html('<p class=" mb-0">' + copyright + '</p>');
}

/**
 * Apply settings.
 */
function apply() {
    footerColors();
    footerFonts();
    generateColumnSize();
    showLogo();
    termsAndConditionsShow();
    termsAndConditions();
    privacyPolicyShow();
    privacyPolicy();
    copyrightShow();
    copyright();
    for (let i = 1; i <= 4; i++) {
        titleChange(i);
        contentChange(i);
        toggleType(i);
        menuChange(i);
        socialSelectionChanges(i);
    }
}

/**
 * Initialize
 */
function init() {
    // Advance footer column size observe
    // $(`[name="${SELECTOR.COLUMNSIZE}"]`).closest('.felement')
    //     .append(`<label>${M.util.get_string('footercolumnsizenote', 'theme_remui')}</label>`);
    generateColumnSize();
    showLogo();
    $(`[name="${SELECTOR.COLUMNSIZE}"]`).hide();
    $(`[name="${SELECTOR.COLUMNSIZE}"]`).on("change", function() {
        let widths = $(`[name="${SELECTOR.COLUMNSIZE}"]`).val().split(",");
        let widget = $(`[name="${SELECTOR.COLUMN}"]`).val();

        // Validating wigets count.
        if (widget != widths.length) {
            $(`[name="${SELECTOR.COLUMN}"]`).val(widths.length);
        }
        generateColumnSize();
        columnSizeChange();
    });

    // Observer column size change using on drag and touch.
    $("body").on(
        "mousedown touchstart",
        `#fitem_id_${SELECTOR.COLUMNSIZE} .resizer .resize-x-handle`,
        resize
    );

    // Listen number of columns toggler.
    $(`[name="${SELECTOR.COLUMN}"]`).on("change", function() {
        let width = [];
        for (let i = 1; i <= $(this).val(); i++) {
            width.push((100 / $(this).val()).toFixed(0));
        }
        $(`[name="${SELECTOR.COLUMNSIZE}"]`).val(width.join(","));
        generateColumnSize();
        columnSizeChange();
        isFooterPrimaryVisible();
    });

    // Listen footer colors.
    $(`
            ${SELECTOR.BACKGROUNDCOLOR},
            ${SELECTOR.TEXTCOLOR},
            ${SELECTOR.LINKTEXT},
            ${SELECTOR.LINKHOVERTEXT},
            ${SELECTOR.DIVIDERCOLOR},
            ${SELECTOR.ICONDEFAULTCOLOR},
            ${SELECTOR.ICONHOVERCOLOR},
            ${SELECTOR.FOOTERCOLUMMTITLECOLOR},
            ${SELECTOR.FOOTERLOGOCOLOR}
        `).on("color.changed", footerColors);

    // Listen footer font settings.
    $(`
            ${SELECTOR.FOOTERFONTFAMILY},
            ${SELECTOR.FOOTERFONTWEIGHT},
            ${SELECTOR.FOOTERTEXTTRANSFORM},
            ${SELECTOR.FOOTERCOLUMNTITLEFONTFAMILY},
            ${SELECTOR.FOOTERCOLUMNTITLEFONTWEIGHT},
            ${SELECTOR.FOOTERCOLUMMTITLETEXTTRANSFORM}
        `).on("change", footerFonts);

    // Listen footer font input settings.
    $(`
            ${SELECTOR.FOOTERFONTSIZE},
            ${SELECTOR.FOOTERFONTLTRSPACE},
            ${SELECTOR.FOOTERFONTLINEHEIGHT},
            ${SELECTOR.FOOTERCOLUMMTITLEFONTSIZE},
            ${SELECTOR.FOOTERCOLUMMTITLELINEHEIGHT},
            ${SELECTOR.FOOTERCOLUMMTITLELTRSPACE}
        `).on("input", footerFonts);

    // Observe social media links.
    $(SELECTOR.SOCIALICONS).on("input", function() {
        socialMediaLinks($(this).attr("name"), $(this).val());
        isFooterPrimaryVisible();
    });

    // Listen column type.
    $(`[name*="${SELECTOR.COLUMN}"][name*="type"]`).on("change", function() {
        let index = $(this)
            .attr("name")
            .replace(SELECTOR.COLUMN, "")
            .replace("type", "");
        toggleType(index);
        isFooterPrimaryVisible();
    });

    // Listen title change.
    $(`[name*="${SELECTOR.COLUMN}"][name*="title"]`).on("input", function() {
        let index = $(this)
            .attr("name")
            .replace(SELECTOR.COLUMN, "")
            .replace("title", "");
        titleChange(index);
    });

    // Listen content change.
    $(`[name*="${SELECTOR.COLUMN}"][name*="customhtml"]`).on(
        "change",
        function() {
            let index = $(this)
                .attr("name")
                .replace(SELECTOR.COLUMN, "")
                .replace("customhtml", "");
            contentChange(index);
            isFooterPrimaryVisible();
        }
    );

    // Listen menu change.
    $(`[name*="${SELECTOR.COLUMN}"][name*="menu"]:not([name*="orientation"])`).on(
        "change",
        function() {
            let index = $(this)
                .attr("name")
                .replace(SELECTOR.COLUMN, "")
                .replace("menu", "");
            menuChange(index);
            isFooterPrimaryVisible();
        }
    );

    // Listen menu orientation change.
    $(`[name*="${SELECTOR.COLUMN}"][name*="menuorientation"]`).on(
        "change",
        function() {
            let index = $(this)
                .attr("name")
                .replace(SELECTOR.COLUMN, "")
                .replace("menuorientation", "");
            menuOrientationChange(index);
        }
    );

    // Listen social selection change.
    $(`[name*="${SELECTOR.COLUMN}"][name*="social"]`).on("change", function() {
        let index = $(this)
            .attr("name")
            .replace(SELECTOR.COLUMN, "")
            .replace("social", "");
        socialSelectionChanges(index);
        isFooterPrimaryVisible();
    });

    // Show social media icon.
    $(`[name*="socialmediaiconcol"]`).on("change", function() {
        let index = $(this)
            .attr("name")
            .replace(SELECTOR.COLUMN, "")
            .replace("socialmediaiconcol", "");
        let iframeDocument = Utils.getDocument();
        let show = $(this).is(":checked");
        $(`[name="${SELECTOR.COLUMN}${index}social"]`)
            .closest(SELECTOR.SETTINGITEM)
            .toggleClass(SELECTOR.DNONE, !show);
        $(`.${SELECTOR.COLUMN}${index}social-note`)
            .closest(SELECTOR.SETTINGITEM)
            .toggleClass(SELECTOR.DNONE, !show);
        $(iframeDocument)
            .find(`#footer-column-${index} .contentsocial`)
            .toggleClass(SELECTOR.DNONE, !show);
    });

    // Secondary footer.
    // Show logo in the footer.
    $(SELECTOR.SHOWLOGO).on("change", showLogo);

    // Show terms ans condition link in the footer.
    $(SELECTOR.TERMSANDCONDITIONSSHOW).on("change", termsAndConditionsShow);

    // Handle terms and condition link change.
    $(SELECTOR.TERMSANDCONDITIONS).on("input", termsAndConditions);

    // Show privacy policy link in the footer.
    $(SELECTOR.PRIVACYPOLICYSHOW).on("change", privacyPolicyShow);

    // Handle privacy policy link change.
    $(SELECTOR.PRIVACYPOLICY).on("input", privacyPolicy);

    // Show copyright in the footer.
    $(SELECTOR.COPYRIGHTSHOW).on("change", copyrightShow);

    // Handle copyright content change.
    $(SELECTOR.COPYRIGHT).closest(".felement")
        .append(M.util.get_string("footercopyrightstags", "theme_remui"));
    $(SELECTOR.COPYRIGHT).on("input", copyright);

    // Handle same logo from header toggle.
    $(SELECTOR.USEHEADERLOGO).on("change", useDifferentLogo);

    // Footer icon image observer.
    Utils.fileObserver(
        $(SELECTOR.SECONDARYFOOTERLOGO).siblings(".filemanager")[0],
        useDifferentLogo
    );

    $(SELECTOR.POWEREDBY).on('change', togglePoweredBy);
}
export default {
    init,
    apply,
};
