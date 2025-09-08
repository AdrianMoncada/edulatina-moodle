/* eslint-disable no-unused-vars */
/* eslint-disable no-console*/
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
 * Selectors list.
 */
var SELECTORS = {
    DNONE: 'd-none',
    SETTINGITEM: '.setting-item',
    // Header design settings -> header.
    NAVBARINVERSE: '[name="navbarinverse"]',
    BGCOLOR: '[name="header-menu-background-color"]',
    ELEMENTBGCOLOR: '[name="header-menu-element-bg-color"]',
    ELEMENTDIVIDERCOLOR: '[name="header-menu-divider-bg-color"]',

    // Header design settings -> Icon colors.
    ICONCOLOR: '[name="hds-icon-color"]',
    ICONHOVERCOLOR: '[name="hds-icon-hover-color"]',
    ICONACTIVECOLOR: '[name="hds-icon-active-color"]',

    // Header design settings -> box shadow.
    ENABLEBOXSHADOW: '[name="hds-boxshadow-enable"]',
    BORDERBOTTOMCOLOR: '[name="header-primary-border-bottom-color"]',
    BORDERBOTTOMSIZE: '[name="header-primary-border-bottom-size"]',
    BORDERBOTTOMBLUR: '[name="header-primary-border-bottom-blur"]',

    // Header design settings -> menu item.
    MENUFONTFAMILY: '[name="hds-menu-font-family"]',
    MENUFONTSIZE: '[name="hds-menu-fontsize"]',
    MENUFONTWEIGHT: '[name="hds-menu-fontweight"]',
    MENUTEXTTRANSFORM: '[name="hds-menu-text-transform"]',
    MENULETTERSPACING: '[name="hds-menu-letter-spacing"]',
    MENUCOLOR: '[name="header-menu-text-color"]',
    MENUHOVERCOLOR: '[name="header-menu-text-hover-color"]',
    MENUACTIVECOLOR: '[name="header-menu-text-active-color"]',

    // Header design logo position.
    MENULOGOLAYOUT: '[name="header-primary-layout-desktop"]',

    // Logo background.
    LOGOBGCOLOR: '[name="logo-bg-color"]',

    // Hide show menu item.
    CHECKS: [
        '[name="hide-dashboard"]',
        '[name="hide-home"]',
        '[name="hide-my-courses"]',
        '[name="hide-site-admin"]'
    ],

    ENABLERECENTCOURSES: '[name="enablerecentcourses"]',
    ENABLECOURSECATEGORYMENU: '[name="enabledisablecoursecategorymenu"]',
    COURSECATEGORIESTEXT: '[name="coursecategoriestext"]'
};

var headerBgColor = SELECTORS.BGCOLOR;

/**
 * Header background handler.
 */
function switchBgHandler() {
    let checked = $(SELECTORS.NAVBARINVERSE).is(':checked');
    $(SELECTORS.BGCOLOR).closest('.fitem').toggleClass('d-none', checked);
    headerBgColor = checked ? SELECTORS.LOGOBGCOLOR : SELECTORS.BGCOLOR;
    handleHeaderColors();
}

/**
 * Handle header background and element colors.
 */
function handleHeaderColors() {
    let bgColor = $(headerBgColor).spectrum('get').toString();
    let elementBgColor = $(SELECTORS.ELEMENTBGCOLOR).spectrum('get').toString();
    let elementDividerColor = $(SELECTORS.ELEMENTDIVIDERCOLOR).spectrum('get').toString();
    let content = `
    .navbar .custom-control-input + .custom-control-label::before,
    .navbar .custom-control-input + .custom-control-label::after {
        border-color: ${elementDividerColor} !important;
    }
    .navbar .sub-nav .divider {
        background-color: ${elementDividerColor} !important;
    }
    .navbar .sub-nav .dropdownmoremenu .dropdown-toggle.nav-link,
    .navbar .sub-nav .dropdown-toggle.nav-link.catselector-menu,
    .navbar #usernavigation .simplesearchform .input-group,
    .navbar .custom-control-input:not(:checked) + .custom-control-label::before {
        background-color: ${elementBgColor} !important;
    }
    .navbar .sub-nav {
        background-color: ${bgColor} !important;
    }
    `;
    Utils.putStyle('header-design-header-colors', content);
}

/**
 * Handle icon default, hover and active colors.
 */
function handleIconColors() {
    let color = $(SELECTORS.ICONCOLOR).spectrum('get').toString();
    let hoverColor = $(SELECTORS.ICONHOVERCOLOR).spectrum('get').toString();
    let activeColor = $(SELECTORS.ICONACTIVECOLOR).spectrum('get').toString();
    let content = `
        .navbar .sub-nav .edw-icon {
            color: ${color} !important;
        }
        .navbar .sub-nav .edw-icon:hover {
            color: ${hoverColor} !important;
        }
        .popover-region:not(.collapsed) .popover-region-toggle .edw-icon {
            color: ${activeColor} !important;
        }
    `;
    Utils.putStyle('header-design-icon-colors', content);
}

/**
 * Handle box shadow/ header border bottom size.
 */
function handleBoxShadow() {
    let enableBoxShadow = $(SELECTORS.ENABLEBOXSHADOW).is(':checked');
    if (!enableBoxShadow) {
        Utils.putStyle('header-box-shadow', `
            nav.navbar {
                box-shadow: none;
            }
        `);
        return;
    }
    let bottomSize = $(SELECTORS.BORDERBOTTOMSIZE).val();
    let bottomBlur = $(SELECTORS.BORDERBOTTOMBLUR).val();
    let background = $(SELECTORS.BORDERBOTTOMCOLOR).spectrum('get').toString();
    let content = `
        nav.navbar {
            box-shadow: 0 ${bottomSize}rem ${bottomBlur}rem ${background};
        }
    `;
    Utils.putStyle('header-box-shadow', content);
}

/**
 * Handle menu item text stlying.
 */
function handleMenuItemTextStyling() {
    let fontFamily = $(SELECTORS.MENUFONTFAMILY).val();
    let fontSize = $(SELECTORS.MENUFONTSIZE).val();
    let textTransform = $(SELECTORS.MENUTEXTTRANSFORM).val();
    let fontWeight = $(SELECTORS.MENUFONTWEIGHT).val();
    let letterSpacing = $(SELECTORS.MENULETTERSPACING).val();
    let content = `
    .navbar .sub-nav .primary-navigation,
    .navbar .sub-nav #usernavigation .edwiser-navigation,
    .navbar .sub-nav #user-action-menu,
    .navbar .sub-nav .popover-region-container,
    .navbar .sub-nav .simplesearchform input,
    .navbar .sub-nav .simplesearchform input::placeholder {
        font-size: ${fontSize}px !important;
        font-family: ${fontFamily} !important;
        text-transform: ${textTransform} !important;
        letter-spacing: ${letterSpacing}rem !important;
        font-weight: ${fontWeight} !important;
    }
    `;
    if (fontFamily.toLowerCase() != 'inherit') {
        Utils.loadFont(fontFamily);
    }
    Utils.putStyle('header-menu-item-text', content);
    Utils.triggerResize();
}

/**
 * Handle menu item text colors.
 */
function handleMenuItemColors() {
    let color = $(SELECTORS.MENUCOLOR).spectrum('get').toString();
    let hoverColor = $(SELECTORS.MENUHOVERCOLOR).spectrum('get').toString();
    let activeColor = $(SELECTORS.MENUACTIVECOLOR).spectrum('get').toString();
    let content = `
    .navbar .primary-navigation .nav-link,
    .navbar #usernavigation .nav-link,
    .navbar .usermenu-wrapper .usermenu-container .usermenu #user-menu-toggle {
        color: ${color} !important;
    }
    .navbar .primary-navigation .nav-link:hover,
    .navbar #usernavigation .nav-link:hover,
    .navbar .usermenu-wrapper .usermenu-container .usermenu #user-menu-toggle:hover {
        color: ${hoverColor} !important;
    }
    .navbar .primary-navigation .nav-link.active {
        color: ${activeColor} !important;
    }
    .navbar .primary-navigation .nav-link.active::before {
        border-bottom-color: ${activeColor} !important;
    }
    `;
    Utils.putStyle('header-menu-item', content);
}

/**
 * Handle nodes.
 */
function handleNodes() {
    let content = `
    `;
    SELECTORS.CHECKS.forEach(function(checkbox) {
        checkbox = $(checkbox);
        content += `
            .navbar [data-key="${checkbox.data('target')}"],
            .drawer.drawer-left .drawercontent .list-group-item.${checkbox.data('target')} {
                display: ${checkbox.is(':checked') ? 'none' : 'block'};
            }
        `;
    });

    Utils.putStyle('header-handle-nodes', content);
    Utils.triggerResize();
}
/**
 * Enable Recent Courses Menu in header
 */
function enableRecentCourses() {
    let val = $(SELECTORS.ENABLERECENTCOURSES).is(':checked') ? 'block' : 'none';
    let val2 = $(SELECTORS.ENABLERECENTCOURSES).is(':checked') ? 'flex' : 'none';
    let content = `
        .navbar [data-key="recentcourses"]{
            display: ${val} !important;
        }
        .drawer.drawer-left .list-group a.recentcourses{
            display: ${val2} !important;
        }
    `;

    Utils.putStyle('header-recent-courses', content);
    Utils.triggerResize();
}
/**
 * Enable Course Category menu in header.
 */
function enableCourseCategoryMenu() {
    let val = $(SELECTORS.ENABLECOURSECATEGORYMENU).is(':checked');
    $(SELECTORS.COURSECATEGORIESTEXT).closest(SELECTORS.SETTINGITEM).toggleClass(SELECTORS.DNONE, val == false);

    let val1 = val ? 'block' : 'none';
    let val2 = val ? 'flex' : 'none';
    let content = `
        .navbar [data-key="coursecat"] {
            display: ${val1};
        }
        #drop-down-catselector-menu{
            display: ${val2} !important;
        }
    `;

    Utils.putStyle('header-coursecat-menu', content);
    Utils.triggerResize();
}

function updateCourseCatMenuText() {
    let val = $(SELECTORS.COURSECATEGORIESTEXT).val();

    $(Utils.getDocument())
        .find('.navbar [data-key="coursecat"] .catselector-menu')
        .text(val);
        $(Utils.getDocument())
        .find('#drop-down-catselector-menu')
        .text(val);
    Utils.triggerResize();
}

/**
 * Handle Menu Layout Position
 */
function handleheaderlayout() {
    let menuLayout = $(SELECTORS.MENULOGOLAYOUT).val();
    $(Utils.getDocument()).find('nav.navbar').removeClass('left right');
    $(Utils.getDocument()).find('nav.navbar').addClass(menuLayout);
    Utils.triggerResize();
}

/**
 * Apply all header design settings.
 */
function apply() {
    switchBgHandler();
    handleHeaderColors();
    handleIconColors();
    handleBoxShadow();
    handleMenuItemColors();
    handleMenuItemTextStyling();
    handleNodes();
    enableRecentCourses();
    enableCourseCategoryMenu();
    updateCourseCatMenuText();
}

/**
 * Initialize listeners on header design settings.
 */
function init() {
    switchBgHandler();
    $(SELECTORS.BGCOLOR).closest('.fitem').toggleClass('d-none', $(SELECTORS.NAVBARINVERSE).is(':checked'));

    $(SELECTORS.NAVBARINVERSE).on('input', switchBgHandler);
    // Initialize listeners on background color settings.
    $(`
        ${SELECTORS.BGCOLOR},
        ${SELECTORS.LOGOBGCOLOR},
        ${SELECTORS.ELEMENTBGCOLOR},
        ${SELECTORS.ELEMENTDIVIDERCOLOR}
    `).on('color.changed', handleHeaderColors);

    // Initialize listeners on icon color settings.
    $(`
        ${SELECTORS.ICONCOLOR},
        ${SELECTORS.ICONHOVERCOLOR},
        ${SELECTORS.ICONACTIVECOLOR}
    `).on('color.changed', handleIconColors);

    // Initialize listeners on box shadow settings.
    $(SELECTORS.ENABLEBOXSHADOW).on('change', handleBoxShadow);
    $(`
        ${SELECTORS.BORDERBOTTOMSIZE},
        ${SELECTORS.BORDERBOTTOMBLUR}
    `).on('input', handleBoxShadow);
    $(SELECTORS.BORDERBOTTOMCOLOR).on('color.changed', handleBoxShadow);

    // Handle menu item settings.
    $(`
        ${SELECTORS.MENUFONTFAMILY},
        ${SELECTORS.MENUTEXTTRANSFORM},
        ${SELECTORS.MENUFONTWEIGHT}
    `).on('change', handleMenuItemTextStyling);
    $(`
        ${SELECTORS.MENUFONTSIZE},
        ${SELECTORS.MENULETTERSPACING}
    `).on('input', handleMenuItemTextStyling);
    $(`
        ${SELECTORS.MENUCOLOR},
        ${SELECTORS.MENUHOVERCOLOR},
        ${SELECTORS.MENUACTIVECOLOR}
    `).on('color.changed', handleMenuItemColors);

    $(`${SELECTORS.MENULOGOLAYOUT}`).on('change', handleheaderlayout);

    // Handle node visibility.
    let id = [];
    SELECTORS.CHECKS.forEach(function(checkbox) {
        id.push(checkbox);
    });
    $(id.join()).on('change', handleNodes);

    $(SELECTORS.ENABLERECENTCOURSES).on('change', enableRecentCourses);
    $(SELECTORS.ENABLECOURSECATEGORYMENU).on('change', enableCourseCategoryMenu);
    $(SELECTORS.COURSECATEGORIESTEXT).on('input', updateCourseCatMenuText);
}

export default {
    init,
    apply
};
