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
 * Theme customizer header-site-identity js
 * @copyright (c) 2023 WisdmLabs (https://wisdmlabs.com/) <support@wisdmlabs.com>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 * @author    Yogesh Shirsath
 */

import $ from 'jquery';
import Utils from 'theme_remui/customizer/utils';

/**
 * Selectors
 */
var SELECTOR = {
    BASE: 'header-site-identy',
    COLORCSS: 'header-icon-color',
    IDENTITYPREFIX: 'header-site-identity',
    LOGOORSITENAME: '[name="logoorsitename"]',
    ICON: '[name="siteicon"]',
    FONTSIZE: '[name="header-site-identity-fontsize"]',
    FONTSIZETABLET: '[name="header-site-identity-fontsize-tablet"]',
    LOGO: '[name="logo"]',
    LOGOMINI: '[name="logomini"]',
    BACKGROUNDCOLOR: '[name="header-background-color"]',
    SITENAMECOLOR: '[name="sitenamecolor"]',
    LOGOBGCOLOR: '[name="logo-bg-color"]',
    DARKMODELOGO: '[name="darkmodelogo"]',
    DARKMODELOGOMINI: '[name="darkmodelogomini"]',
    FOOTER: {
        SHOWLOGO: '[name="footershowlogo"]',
        USEHEADER: '[name="useheaderlogo"]'
    }
};

var CONSTANTS = {
    NIGHTEYESTATE: 'nighteyewState',
    CURRNIGHTEYESTATE: 'currnighteyewState'
};
/**
 * True if footer logo is on and use header checked.
 * @returns {boolean}
 */
var useForFooter = () => $(SELECTOR.FOOTER.SHOWLOGO).is(':checked') && $(SELECTOR.FOOTER.USEHEADER).is(':checked');

/**
 * Handle site logo selector.
 */
function logoSelectorHandler() {
    let itemid, siteicon, content, sitename;
    let iframeDocument = Utils.getDocument();
    $(`
        ${SELECTOR.ICON},
        ${SELECTOR.FONTSIZE},
        ${SELECTOR.LOGO},
        ${SELECTOR.LOGOMINI},
        ${SELECTOR.BACKGROUNDCOLOR},
        ${SELECTOR.SITENAMECOLOR},
        ${SELECTOR.DARKMODELOGO},
        ${SELECTOR.DARKMODELOGOMINI}
    `).closest('.setting-item').addClass('d-none');
    switch ($(SELECTOR.LOGOORSITENAME).val()) {
        case 'logo':
            $(`${SELECTOR.LOGO}`).closest('.setting-item').removeClass('d-none');
            $(`${SELECTOR.DARKMODELOGO}`).closest('.setting-item').removeClass('d-none');

            itemid = $(SELECTOR.LOGO).val();
            if(localStorage.getItem(CONSTANTS.NIGHTEYESTATE) == 1) {
                itemid = $(SELECTOR.DARKMODELOGO).val();
            }
            Utils.getFileURL(itemid).done(function(response) {
                if (response == '') {
                    response = M.cfg.wwwroot + '/theme/remui/pix/logo.png';
                }
                var content = `<img src="${response}" class="navbar-brand-logo logo">`;
                $(iframeDocument).find('nav.navbar .navbar-brand').empty().append(content);
                $(iframeDocument).find('.drawer-left .drawerheader .navbar-brand').empty().append(content);
                if (useForFooter()) {
                    $(iframeDocument)
                            .find("#page-footer .navbar-logo-footer-wrapper .navbar-brand")
                            .html(content);
                }
            });
            break;
        case 'logomini':
            $(`${SELECTOR.LOGOMINI}`).closest('.setting-item').removeClass('d-none');
            $(`${SELECTOR.DARKMODELOGOMINI}`).closest('.setting-item').removeClass('d-none');

            itemid = $(SELECTOR.LOGOMINI).val();
            if(localStorage.getItem(CONSTANTS.NIGHTEYESTATE) == 1) {
                itemid = $(SELECTOR.DARKMODELOGOMINI).val();
            }

            Utils.getFileURL(itemid).done(function(response) {
                if (response == '') {
                    response = M.cfg.wwwroot + '/theme/remui/pix/logomini.png';
                }
                var content = `<img src="${response}" class="navbar-brand-logo logomini">`;
                $(iframeDocument).find('nav.navbar .navbar-brand').empty().append(content);
                $(iframeDocument).find('.drawer-left .drawerheader .navbar-brand').empty().append(content);
                if (useForFooter()) {
                    $(iframeDocument)
                            .find("#page-footer .navbar-logo-footer-wrapper .navbar-brand")
                            .html(content);
                }
            });
            break;
        case 'icononly':
            $(`${SELECTOR.ICON}, ${SELECTOR.FONTSIZE}, ${SELECTOR.SITENAMECOLOR}`).closest('.setting-item').removeClass('d-none');

            siteicon = $(SELECTOR.ICON).val();
            content = `<span class="navbar-brand-logo icononly"><i class="fa fa-${siteicon}"></i></span>`;
            $(iframeDocument).find('nav.navbar .navbar-brand').empty().append(content);
            $(iframeDocument).find('.drawer-left .drawerheader .navbar-brand').empty().append(content);
            if (useForFooter()) {
                $(iframeDocument)
                        .find("#page-footer .navbar-logo-footer-wrapper .navbar-brand")
                        .html(content);
            }
            break;
        case 'iconsitename':
            $(`${SELECTOR.ICON}, ${SELECTOR.FONTSIZE}, ${SELECTOR.SITENAMECOLOR}`).closest('.setting-item').removeClass('d-none');
            siteicon = $(SELECTOR.ICON).val();
            sitename = $("#customizer").attr("data-sitename");
            content = `<span class="navbar-brand-logo iconsitename" ><i class="fa fa-${siteicon}"></i>&nbsp;${sitename}
            </span>`;
            $(iframeDocument).find('nav.navbar .navbar-brand').empty().append(content);
            $(iframeDocument).find('.drawer-left .drawerheader .navbar-brand').empty().append(content);
            if (useForFooter()) {
                $(iframeDocument)
                        .find("#page-footer .navbar-logo-footer-wrapper .navbar-brand")
                        .html(content);
            }
            break;
    }

    let body = $(iframeDocument).find('body');
    body.removeClass(`
        ${SELECTOR.IDENTITYPREFIX}-logo
        ${SELECTOR.IDENTITYPREFIX}-logomini
        ${SELECTOR.IDENTITYPREFIX}-icononly
        ${SELECTOR.IDENTITYPREFIX}-iconsitename
    `)
    .addClass(SELECTOR.IDENTITYPREFIX + '-' + $(SELECTOR.LOGOORSITENAME).val());
    Utils.triggerResize();
}

/**
 * Site logo size handler.
 */
function iconHandler() {
    let content = '';
    let body = $(Utils.getDocument()).find('body');
    let icon = $(SELECTOR.ICON).val();
    $(body).find('.navbar-brand-logo i').removeClass().addClass("fa fa-" + icon);

    // Tablet.
    let fontSizeTab = $(SELECTOR.FONTSIZETABLET).val();
    let fontSize = $(SELECTOR.FONTSIZE).val();
    content += `\n
        .navbar .navbar-brand-logo {
            font-size: ${fontSize}rem !important;
        }
    `;

    if (fontSizeTab != '') {
        content += `\n
            @media screen and (max-width: ${Utils.deviceWidth.md}px) {
                .navbar .navbar-brand-logo {
                    font-size: ${fontSizeTab}rem !important;
                }
            }
        `;
    }
    Utils.putStyle(SELECTOR.BASE, content);
    Utils.triggerResize();
}

/**
 * Handle header icon color settings.
 */
function iconColorHandler() {
    let color = $(SELECTOR.SITENAMECOLOR).spectrum('get').toString();
    let bgColor = $(SELECTOR.LOGOBGCOLOR).spectrum('get').toString();
    let content = `.navbar .navbar-brand-logo,
                   .drawer.drawer-left#theme_remui-drawers-primary .drawerheader .navbar-brand .navbar-brand-logo{
        color: ${color};
        background-color: ${bgColor};
    }
    .navbar .navbar-brand,
    .drawer.drawer-left#theme_remui-drawers-primary .drawerheader .navbar-brand{
        background-color: ${bgColor};
    }`;
    Utils.putStyle(SELECTOR.COLORCSS, content);
}

/**
 * Apply settings.
 */
function apply() {
    logoSelectorHandler();
    iconHandler();
    iconColorHandler();
}

/**
 * Initialize evetns.
 */
function init() {
    // Logo mini listener.
    Utils.fileObserver($(SELECTOR.LOGO).siblings('.filemanager')[0], logoSelectorHandler);

    // Logo listener.
    Utils.fileObserver($(SELECTOR.LOGOMINI).siblings('.filemanager')[0], logoSelectorHandler);

    // Logo or sitename chooser listener.
    $(SELECTOR.LOGOORSITENAME).on('change', logoSelectorHandler);

    // Site icon listener.
    // Font size listener.
    $(`
        ${SELECTOR.ICON},
        ${SELECTOR.FONTSIZE},
        ${SELECTOR.FONTSIZETABLET}
    `).on('input', iconHandler);

    // Handle icon color.
    $(`${SELECTOR.SITENAMECOLOR}, ${SELECTOR.LOGOBGCOLOR}`).on('color.changed', iconColorHandler);
}

export default {
    init,
    apply
};
