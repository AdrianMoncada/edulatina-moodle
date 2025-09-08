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
 * Theme customizer login js
 *
 * @copyright (c) 2023 WisdmLabs (https://wisdmlabs.com/) <support@wisdmlabs.com>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 * @author    Yogesh Shirsath
 */

define('theme_remui/customizer/login', ['jquery', './utils'], function($, Utils) {
    /**
     * Selectors
     */
    var SELECTOR = {
        DNONE: 'd-none',
        LOGINPAGEBACKGROUND: 'login-page-setting',
        LOGINPAGEBGCOLOR: 'loginpagebackgroundcolor',
        LOGINSETTINGPIC: 'loginsettingpic',
        LOGINBGOPACITY: 'loginbackgroundopacity',
        LOGINBGGRADIENT: 'login-page-backgroundgradient1',
        LOGINBGGRADIENT2: "login-page-backgroundgradient2",
        SETTINGITEM: '.setting-item',
        BRANDLOGOPOS: 'brandlogopos',
        LOGINPANELLOGO: 'loginpanellogo'
    };
    /**
     * Initialize events.
     */
    function init() {
        $(`[name=${SELECTOR.LOGINPAGEBACKGROUND}]`).on('change', toggleBgMenu);
        $(`[name=${SELECTOR.BRANDLOGOPOS}]`).on('change', toggleLogoMenu);
    }
    function toggleBgMenu() {
        let type = $(`[name=${SELECTOR.LOGINPAGEBACKGROUND}]`).val();
        $(`[name=${SELECTOR.LOGINPAGEBGCOLOR}]`).closest(SELECTOR.SETTINGITEM).toggleClass(SELECTOR.DNONE, type != 'color');

        $(`[name=${SELECTOR.LOGINSETTINGPIC}]`).closest(SELECTOR.SETTINGITEM).toggleClass(SELECTOR.DNONE, type != 'image');
        $(`[name=${SELECTOR.LOGINBGOPACITY}]`).closest(SELECTOR.SETTINGITEM).toggleClass(SELECTOR.DNONE, type != 'image');

        $(`[name=${SELECTOR.LOGINBGGRADIENT}]`).closest(SELECTOR.SETTINGITEM).toggleClass(SELECTOR.DNONE, type != 'gradient');
        $(`[name=${SELECTOR.LOGINBGGRADIENT2}]`).closest(SELECTOR.SETTINGITEM).toggleClass(SELECTOR.DNONE, type != 'gradient');

    }

    function toggleLogoMenu() {
        let logopos = $(`[name=${SELECTOR.BRANDLOGOPOS}]`).val();
        $(`[name=${SELECTOR.LOGINPANELLOGO}]`).closest(SELECTOR.SETTINGITEM).toggleClass(SELECTOR.DNONE, logopos == 0);
    }

    /**
     * Initialize events.
     */
    function apply() {
        toggleBgMenu();
        toggleLogoMenu();
    }


    return {
        init: init,
        apply: apply
    };
});
