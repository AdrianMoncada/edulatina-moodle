/* eslint-disable no-console */
/* eslint-disable jsdoc/require-jsdoc*/
/* eslint-disable jsdoc/require-jsdoc*/
/* eslint-disable jsdoc/require-jsdoc*/
/* eslint-disable no-loop-func*/
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
 * @module     theme_remui/validatejson
 * @copyright (c) 2023 WisdmLabs (https://wisdmlabs.com/)
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

define(['jquery'], function ($) {

    var _scrollTopEle = false;

    function isValidJSONString(_str) {
        try {
            JSON.parse(_str);
        } catch (e) {

            return false;
        }
        return true;
    }

    const toggleError = (_fieldele, action) => {
        if (action) {
            $(_fieldele).css("border-color", "red");
        } else {
            $(_fieldele).css("border-color", "#ced4da");
        }
    };

    const validateMenuField = (_fieldele, _updateScrollTopEle = false) => {
        // var _fieldele = "#id_s_theme_remui_footercolumn" + _elemIndex + "menu";
        var _content = $(_fieldele).val();
        var _validated = true;

        if (_content !== "" || _content !== null || _content != undefined) {
            if (!isValidJSONString(_content)) {
                if (_validated && _updateScrollTopEle) {
                    // Here we get first element to scroll
                    _scrollTopEle = _fieldele;
                }
                _validated = false;
                toggleError(_fieldele, true);
            } else {
                toggleError(_fieldele, false);
            }
        }
        return _validated;
    };

    const validateMenuFields = (_elemIndex) => {
        var _fieldele = "#id_s_theme_remui_footercolumn" + _elemIndex + "menu";
        var _validated = true;
        for (var i = 4; i >= 1; i--) {
            _validated = validateMenuField(_fieldele, true);
        }
        var container = $('.settingsform');
        if (!_validated) {
            $([document.documentElement, document.body]).animate({
                scrollTop: $(_scrollTopEle).offset().top - container.offset().top + container.scrollTop()
            }, 500);
            _scrollTopEle = false;
        }
        return _validated;
    };

    const registerValidationEvents = () => {
        $("#id_s_theme_remui_footercolumn1menu").on("focusout", function () {
            validateMenuField("#id_s_theme_remui_footercolumn1menu");
        });
        $("#id_s_theme_remui_footercolumn2menu").on("focusout", function () {
            validateMenuField("#id_s_theme_remui_footercolumn2menu");
        });
        $("#id_s_theme_remui_footercolumn3menu").on("focusout", function () {
            validateMenuField("#id_s_theme_remui_footercolumn3menu");
        });
        $("#id_s_theme_remui_footercolumn4menu").on("focusout", function () {
            validateMenuField("#id_s_theme_remui_footercolumn4menu");
        });
    };
    const allEqual = arr => arr.every(val => val === true);
    return {
        init: function () {
            // add event listener for text area.
            // for (var i = 4; i >= 1; i--) {
            //     var _fieldele = "#id_s_theme_remui_footercolumn"+i+"menu";
            //     $(_fieldele).on("focusout", function(){
            //         validateMenuField(_fieldele);
            //     });
            // }
            registerValidationEvents();

            const submitbtn = "#adminsettings .settingsform .btn[type='submit']";
            $(submitbtn).on('click', function (e) {
                var linktofootersetting = $('a[href="#theme_remui_footer"]');
                if (linktofootersetting.hasClass('active') && linktofootersetting.text() == M.util.get_string('footersettings', 'theme_remui') && linktofootersetting.attr('aria-selected')) {
                    e.preventDefault();
                    var _validatallfields = [];
                    // _validatallfields[0] = true;
                    for (var i = 1; i <= 4; i++) {
                        if ($('#admin-footercolumn'+i+'menu').css('display') !== 'none') {
                            _validatallfields[i] = validateMenuFields(i);
                        }
                    }
                    if (allEqual(_validatallfields)) {
                        $("#adminsettings").submit();
                    }

                }
            });
        }
    };
});
