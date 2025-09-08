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
 * @module     theme_remui/profile
 * @copyright (c) 2023 WisdmLabs (https://wisdmlabs.com/)
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

"use strict";
define([
    'jquery',
    'core/ajax',
    'core/notification',
    'core_message/message_drawer_helper'
], function ($, Ajax, Notification, MessageDrawerHelper) {
    var SELECTORS = {
        ERROR: 'div#error-message',
        DANGER: 'alert-danger',
        SUCCESS: 'alert-success',
        PROFILEABOUTMEWRAPPER: '.profile-about-me-wrapper',
        EDITICON: '.about-me-edit-icon-wrapper .edw-icon-Edit',
        CANCELICON: '.about-me-edit-icon-wrapper .edw-icon-Cancel',
        EDITPROFILEDETAILSWRAPPER: '.edit-profile-details-wrapper',
    };
    function toggleProfileField(selector, value) {
        var $col = $(selector).closest('.profile-item-col');
        if (!value || value.trim() === '' || value.trim() == 'Select a country...') {
            $col.addClass('d-none');
        } else {
            $col.removeClass('d-none');
        }
    }
    $('#editprofile .form-horizontal #btn-save-changes').click(function () {
        $(SELECTORS.ERROR).show();
        $(SELECTORS.ERROR).removeClass(SELECTORS.DANGER).addClass(SELECTORS.SUCCESS);
        $(SELECTORS.ERROR).find('p').html("Saving...");

        var fname = $('#first_name').val();
        var lname = $('#surname').val();
        var phonenumber = $('#phone_number').val();
        var department = $('#department').val();
        var country = $('#editprofile .form-horizontal #country option:selected').val();
        var countryname = $('#editprofile .form-horizontal #country option:selected').text();
        var city = $.trim($('#city').val());
        var description = $.trim($('#description').val());
        var address = $.trim($('#address').val());

        if (fname === '') {
            $(SELECTORS.ERROR).show();
            $(SELECTORS.ERROR).removeClass(SELECTORS.SUCCESS).addClass(SELECTORS.DANGER);
            $(SELECTORS.ERROR).find('p').html(M.util.get_string('enterfirstname', 'theme_remui'));
            $('#first_name').focus();
            return false;
        }

        if (lname === '') {
            $(SELECTORS.ERROR).show();
            $(SELECTORS.ERROR).removeClass(SELECTORS.SUCCESS).addClass(SELECTORS.DANGER);
            $(SELECTORS.ERROR).find('p').html(M.util.get_string('enterlastname', 'theme_remui'));
            $('#surname').focus();
            return false;
        }


        var phonenoregex = /^\d{10}$/;
        if (!phonenumber == '') {
            if (!phonenumber.match(phonenoregex)) {
                $(SELECTORS.ERROR).show();
                $(SELECTORS.ERROR).removeClass(SELECTORS.SUCCESS).addClass(SELECTORS.DANGER);
                $(SELECTORS.ERROR).find('p').html(M.util.get_string('entervalidphoneno', 'theme_remui'));
                $('#phone_number').focus();
                return false;
            }
        }
        if (address.length > 240) {
            $(SELECTORS.ERROR).show();
            $(SELECTORS.ERROR).removeClass(SELECTORS.SUCCESS).addClass(SELECTORS.DANGER);
            $(SELECTORS.ERROR).find('p').html("max 250 chars are allowed");
            $('#address').focus();
            return false;
        }

        if (fname.length > 100) {
            $(SELECTORS.ERROR).show();
            $(SELECTORS.ERROR).removeClass(SELECTORS.SUCCESS).addClass(SELECTORS.DANGER);
            $(SELECTORS.ERROR).find('p').html("max 100 chars are allowed");
            $('#first_name').focus();
            return false;
        }

        if (lname.length > 100) {
            $(SELECTORS.ERROR).show();
            $(SELECTORS.ERROR).removeClass(SELECTORS.SUCCESS).addClass(SELECTORS.DANGER);
            $(SELECTORS.ERROR).find('p').html("max 100 chars are allowed");
            $('#surname').focus();
            return false;
        }
        if (department.length > 100) {
            $(SELECTORS.ERROR).show();
            $(SELECTORS.ERROR).removeClass(SELECTORS.SUCCESS).addClass(SELECTORS.DANGER);
            $(SELECTORS.ERROR).find('p').html("max 100 chars are allowed");
            $('#department').focus();
            return false;
        }

        var promise = Ajax.call([{
            methodname: 'theme_remui_save_user_profile_settings',
            args: {
                fname,
                lname,
                description,
                city,
                country,
                phonenumber,
                department,
                address
            }
        }])[0];
        promise.done(function (response) {
            let profileData = JSON.parse(response);
            $(SELECTORS.ERROR).show();
            $(SELECTORS.ERROR).removeClass(SELECTORS.DANGER).addClass(SELECTORS.SUCCESS);
            $(SELECTORS.ERROR).find('p').css('margin', '0').html(M.util.get_string('detailssavedsuccessfully', 'theme_remui'));
            setTimeout(function () {
                $(SELECTORS.PROFILEABOUTMEWRAPPER).toggleClass('d-none');
                $(SELECTORS.EDITPROFILEDETAILSWRAPPER).toggleClass('d-none');
                $(SELECTORS.EDITICON).toggleClass('d-none');
                $(SELECTORS.CANCELICON).toggleClass('d-none');
                $('.profile-user').text(fname + " " + lname);
                $('.usermenu a span.usertext').text(fname + " " + lname);
                $('#user-description').html(profileData.description);
                $('.prof-user-firstname').text(fname);
                $('.prof-user-lastname').text(lname);
                $('.prof-user-phone').text(phonenumber);
                toggleProfileField('.prof-user-phone', phonenumber);
                $('.prof-user-department').text(profileData.department);
                toggleProfileField('.prof-user-department', profileData.department);
                $('.prof-user-desc').html(profileData.description);
                toggleProfileField('.prof-user-desc', profileData.description);
                $('.prof-user-country').text(countryname);
                toggleProfileField('.prof-user-country', countryname);
                $('.prof-user-city').text(profileData.city);
                toggleProfileField('.prof-user-city', profileData.city);
                $('.prof-user-address').text(profileData.address);
                toggleProfileField('.prof-user-address', profileData.address);
            }, 1000);

        })
            .fail(function (ex) {
                $(SELECTORS.ERROR).removeClass(SELECTORS.SUCCESS).addClass(SELECTORS.DANGER);
                $(SELECTORS.ERROR).find('p')
                    .css('margin', '0')
                    .html(ex.errorcode + ' : ' + ex.error + ', ' + M.util.get_string('actioncouldnotbeperformed', 'theme_remui'));
                Notification.exception(ex);
            });

        return false;
    });

    $(".userbadgelink").click(function () {
        $("#aboutmetab").trigger("click");
    });
    $(".usercontactsurl").click(function () {
        MessageDrawerHelper.show();
        setTimeout(function () {
            $("a[data-route='view-contacts']").trigger("click");
        }, 200);

    });
    var summaryheight = $('.user-desc-target').height();
    if (summaryheight > 110) {
        $('.user-desc-target').find('#readmorebtn').removeClass('d-none');
        $('.user-desc').addClass('ellipsis ellipsis-3');
    }
    $('#readmorebtn').on('click', function () {
        $('.user-desc-target .user-desc').removeClass('ellipsis ellipsis-3');
        $('.user-desc-target .user-desc').removeClass('ellipsis ellipsis-3');
        $('.user-desc-target').find('#readmorebtn').addClass('d-none');
        $('.user-desc-target').find('#readlessbtn').removeClass('d-none');
    });
    $('#readlessbtn').on('click', function () {
        $('.user-desc-target .user-desc').addClass('ellipsis ellipsis-3');
        $('.user-desc-target .user-desc').addClass('ellipsis ellipsis-3');
        $('.user-desc-target').find('#readmorebtn').removeClass('d-none');
        $('.user-desc-target').find('#readlessbtn').addClass('d-none');
    });

    $('.edit-profile-icon-wrapper .edw-icon-Edit').on('click', function () {
        $(SELECTORS.PROFILEABOUTMEWRAPPER).addClass('d-none');
        $(SELECTORS.EDITPROFILEDETAILSWRAPPER).removeClass('d-none');
        $(SELECTORS.EDITICON).toggleClass('d-none');
        $(SELECTORS.CANCELICON).toggleClass('d-none');
        $(SELECTORS.ERROR).hide();
    });

    $('#btn-canel-changes').on('click', function () {
        $(SELECTORS.EDITICON).toggleClass('d-none');
        $(SELECTORS.CANCELICON).toggleClass('d-none');
        $(SELECTORS.PROFILEABOUTMEWRAPPER).toggleClass('d-none');
        $(SELECTORS.EDITPROFILEDETAILSWRAPPER).toggleClass('d-none');
    });

});
