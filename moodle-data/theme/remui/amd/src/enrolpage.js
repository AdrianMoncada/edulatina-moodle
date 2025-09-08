/* eslint-disable no-console */
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
 * @module     theme_remui/enrolpage
 * @copyright (c) 2023 WisdmLabs (https://wisdmlabs.com/)
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

define([
    'jquery',
    'core/ajax',
    'core/templates',
    'core/notification',
    'core_message/message_user_button',
    'core/custom_interaction_events',
    'core_message/message_drawer_helper',
], function(
    $,
    Ajax,
    Templates,
    Notification,
    Messageuserbutton,
    CustomEvents,
    MessageDrawerHelper) {
    const linkcoursecontent = '#linkcoursecontent';
    // Const activeloading = ".loading.active";
    const activeloadingpane = ".tab-pane.active.loading";
    const loadingnavlink = ".nav-link.loading";
    const tabpanearea = ".tab-pane-area";
    const enrolinstructorscount = "#enrol_instructorscount";
    const enrollnowbtnform = "#enroll-now-btn-form";
    const enrolbtn = ".enroll-btn-wrapper a.btn";
    const showenrollbtn = 'show-enrol-option-btn';
    const hideenrollbtn = 'hide-enrol-option-btn';
    const enrollbtnupddropdown = '.enroll-btn-upd-dropdown';
    const cancelenrolldropdownbtn = '.cancel-enroll-dropdown-btn';
    const defaultpricing = '.default-pricing-section';
    const custompricetextinput = '#custompricetext';
    const enabledefaultpricing = '#enable-default-pricing';
    const custompricebox = '#custom-price-box';
    const enrolbtnurl = '#enrolbtnurl';
    const displayException = (ex) => {
        console.error(ex);
    };

    const activateContentLoading = (_thispane) => {
        var serviceName = $(_thispane).attr("data-service");
        var templateName = $(_thispane).attr("data-template");
        if (serviceName) {
            var autoservice = Ajax.call([{
                methodname: serviceName,
                args: {courseid: M.cfg.courseId}
            }]);
            autoservice[0].done(function(response) {
                response = JSON.parse(response);
                Templates.renderForPromise(templateName, response)
                    .then(({html, js}) => {
                        $(_thispane).find(tabpanearea).empty();
                        Templates.appendNodeContents(_thispane, html, js);
                        $('.nav-link[href="#' + $(_thispane).attr('id') + '"]').removeClass('loading');
                        $(_thispane).removeClass('loading');
                    }).catch(ex => displayException(ex));
            }).fail(Notification.exception);
        }
    };

    // Add functionality to update the enroll now button
    const updateEnrollNowBtn = (title, link, customprice) => {
        Ajax.call([{
            methodname: 'theme_remui_enrol_page_action',
            args: {
                action: "update_enroll_now_btn",
                config: JSON.stringify({
                    'courseid': M.cfg.courseId,
                    'title': title,
                    'link': link,
                    'customprice': customprice
                })
            },
            done: function(response) {
                var data = JSON.parse(response);

                $(enrolbtn).html(data.buttontext);
                // $(enrolbtn).attr('href',data.buttonlink);

                if (data.customprice) {
                    $(custompricebox).removeClass("d-none");
                    $(custompricebox + " .pricing--price").html(data.customprice);
                    $(defaultpricing).addClass("disabled");
                } else {
                    $(custompricebox).addClass("d-none");
                    $(defaultpricing).removeClass("disabled");
                }
            },
            fail: function (ex) {
                Notification.exception(ex);
            }
        }]);

    };

    const clearCustomPriceAndLink = () => {
        Ajax.call([{
            methodname: 'theme_remui_enrol_page_action',
            args: {
                action: "clear_ustomprice_and_link",
                config: JSON.stringify({
                    'courseid': M.cfg.courseId,
                })
            },
            done: function(response) {
                var data = JSON.parse(response);
                console.log(data);
                $(custompricebox).addClass("d-none");
                $(custompricebox + " .pricing--price").text("");
                $(defaultpricing).removeClass("disabled");

                $(custompricetextinput).val("");
                $(enrolbtnurl).val("#");
            },
            fail: function (ex) {
                Notification.exception(ex);
            }
        }]);
    };

    // Add functionality to show/hide the enroll option
    const updateenrolloption = (status) => {
        Ajax.call([{
            methodname: 'theme_remui_enrol_page_action',
            args: {
                action: "update_enroll_option",
                config: JSON.stringify({
                    'courseid': M.cfg.courseId,
                    'enrolloptionshidden': status
                })
            },
            done: function(response) {
                var data = JSON.parse(response);
                if(data.enrolloptionshidden){
                    $('.'+hideenrollbtn).removeClass('d-flex').addClass('d-none');
                    $('.'+showenrollbtn).removeClass('d-none').addClass('d-flex');
                    $('.enrol-main-area-wrapper').addClass('d-none');
                    $('.enrol-mainarea-hidden-contentainer').removeClass('d-none');
                }else{
                    $('.'+showenrollbtn).removeClass('d-flex').addClass('d-none');
                    $('.'+hideenrollbtn).removeClass('d-none').addClass('d-flex');
                    $('.enrol-main-area-wrapper').removeClass('d-none');
                    $('.enrol-mainarea-hidden-contentainer').addClass('d-none');
                }
            },
            fail: function (ex) {
                Notification.exception(ex);
            }
        }]);

    };

    const registerCommonEvents = () =>{
        $(enrolinstructorscount).click(function(e){
            $('a[href="#linkinstructors"]').tab('show');
        });
        $(enrollnowbtnform).submit(function(event) {
            // Prevent the default form submission
            event.preventDefault();
            var buttontext = $(this).find('#enrolbtntext').val();
            var buttonurl = $(this).find('#enrolbtnurl').val();
            var customprice = $(this).find(custompricetextinput).val();
            updateEnrollNowBtn(buttontext, buttonurl, customprice);
            $(enrollbtnupddropdown).removeClass('show');
        });

        $(enabledefaultpricing).on('click', function() {
            clearCustomPriceAndLink();
        });

        // $(custompricetextinput).on('input', function() {
        //     let value = $(this).val();
        //     if (value.length > 17) {
        //         $(this).val(value.slice(0, 17));
        //     }
        // });

        $(enrollbtnupddropdown).on('click.bs.dropdown', function(e) {
            e.stopPropagation();
        });

        $(cancelenrolldropdownbtn).on('click', function() {
            $(enrollbtnupddropdown).removeClass('show');
        });

        $('.' + showenrollbtn + ', .' + hideenrollbtn).on('click', function (e) {
            e.preventDefault();
            // Check the class of the clicked button
            if ($(this).hasClass(showenrollbtn)) {
                updateenrolloption(false);

            } else if ($(this).hasClass(hideenrollbtn)) {
                updateenrolloption(true);
            }
          });

        // Handle messagin feature in instructor tab.
        $(document).on('click','.enrol-instructor-msg-btn',  function (e) {
            var element = $(this);
            if($(this).hasClass('active')){
                MessageDrawerHelper.hide();
                $(this).removeClass('active');
            }
            else{
                $('.enrol-instructor-msg-btn').removeClass('active');
                $(this).addClass('active');
                var args = {
                    conversationid: parseInt(element.attr('data-conversationid')),
                    buttonid: element.attr('id'),
                    userid: parseInt(element.attr('data-userid'))
                };
                if (args.conversationid) {
                    MessageDrawerHelper.showConversation(args);
                } else {
                    MessageDrawerHelper.createConversationWithUser(args);
                }
            }
        });
         // Pause video when the modal is closed
        $(document).on('click','.modal-close-btn, .modal', function () {
            var video = document.getElementById('customfieldinfovideo');
            video.pause();
            video.currentTime = 0;
        });
    };
    return {
        init: function() {
            $(document).ready(function() {
                activateContentLoading(activeloadingpane);
                $(document).on('click', loadingnavlink, function() {
                    var loadContentForPane = $(this).attr("href");
                    activateContentLoading(loadContentForPane);
                });
            });
            registerCommonEvents();
        }
    };
});
