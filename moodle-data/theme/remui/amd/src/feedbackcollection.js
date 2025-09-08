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
 * TODO describe module feedbackcollection
 *
 * @module     theme_remui/feedbackcollection
 * @copyright  2024 YOUR NAME <your@email.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */


define(['jquery', 'core/ajax', 'core/notification', 'core/templates'], function($, Ajax, Notification, Templates) {

    let SELECTORS = {
        'FEEDBACKCOLLECTION': 'body',
        'FEEDBACKCOLLECTION_MODAL': '.feedbackcollection-modal',
        'FEEDBACKCOLLECTION_FORM': '#feedbackcollection-form',
    };

    let custompagepublished = false;

    // Check if either the last or current format is "remuiformat"
    let edwisercourseformat = "remuiformat"; // The specific course format to check
    let isRemuiformat = (format) => format === edwisercourseformat;
    function submit_feedback(questionname, submiteddata, verifyuser = false) {
        return Ajax.call([{
            methodname: 'theme_remui_do_feedbackcollection_action',
            args: {
                action: "submit_feedback",
                config: JSON.stringify({
                    "question": questionname,
                    "feedback": submiteddata,
                    "verifyuser": verifyuser
                })
            }
        }])[0];
    }

    function get_feedback_context(questionname) {
        return Ajax.call([{
            methodname: 'theme_remui_do_feedbackcollection_action',
            args: {
                action: "get_feedback_context",
                config: JSON.stringify({
                    questionname
                })
            }
        }])[0];
    }

    function show_feedbackform_modal() {
        $(SELECTORS.FEEDBACKCOLLECTION_MODAL).modal('show');
    }

    function close_modal() {
        $(SELECTORS.FEEDBACKCOLLECTION_MODAL).modal('hide');

        let feedbackTime = Date.now() + (24 * 60 * 60 * 1000); // Add 24 hours to current time
        if($("body").attr("id") == "page-site-index") {
            localStorage.setItem('frontpage_feedback_timestamp', feedbackTime);
        }
        if($('body').attr('id') == "page-admin-setting-themesettingremui") {
            localStorage.setItem("remui_settings_feedback_visited", "false");
        }
        if ($('body').hasClass("pagelayout-course")) {
            localStorage.setItem('courseformatchangetimestamps', feedbackTime);
        }
    }

    async function render_feedbackform(questionname,callback = false) {
        let templatename = "theme_remui/feedbackcollection_form";

        const response = await get_feedback_context(questionname);
        const data = JSON.parse(response);

        if(data) {
            data.questionname = questionname;
            return Templates.render(templatename, {
                config: M.cfg,
                ...data
            }).done(function(html, js) {
                $(SELECTORS.FEEDBACKCOLLECTION_MODAL).remove();
                Templates.appendNodeContents("body", html, js);
            }).then(() => {
                show_feedbackform_modal();
                if (typeof callback === "function") {
                    callback();
                }
            });
        }

        return false;
    }

    async function submit_feedback_handler(e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(e.target);
        const submiteddata = { };
        let questionname = "";

        formData.forEach((value, key) => {
            if (key === "questionname") {
                questionname = value;
            } else {
                submiteddata[key] = value;
            }
        });

        submit_feedback(questionname, submiteddata);

        close_modal();
    }

    function courseformatfeedbackhandler() {


        if($('body').attr('id') == "page-course-edit") {
            // Get the last stored course format from localStorage
            let lastactivecourseformat = localStorage.getItem('lastactivecourseformat');
            let currentactivecourseformat = localStorage.getItem('currentactivecourseformat');
            let currentselectedcourseformat = $("#fitem_id_format select#id_format option:selected").val();

            if(currentactivecourseformat) {
                localStorage.setItem('lastactivecourseformat', currentactivecourseformat);
                lastactivecourseformat = currentactivecourseformat;
            }

            if (!lastactivecourseformat) {
                localStorage.setItem('lastactivecourseformat', currentselectedcourseformat);
            } else {
                localStorage.setItem('currentactivecourseformat', currentselectedcourseformat);
            }
            localStorage.setItem('courseformatchangetimestamps', Date.now());

        }
    }
    function remui_settings_feedback_handler(){
        if($('body').attr('id') != "page-admin-setting-themesettingremui") {
            return;
        }
        let remuisettingvisited = localStorage.getItem("remui_settings_feedback_visited");

        if(remuisettingvisited == "true") {
            render_feedbackform("remuisettingvisit_question");
        }
    }

    function homepagefeedbackhandler() {
        let frontpageFeedbackTimestamp = localStorage.getItem('frontpage_feedback_timestamp');
        let currentTime = Date.now();

        if($("body").attr("id") != "page-site-index") {
            return;
        }

        if(frontpageFeedbackTimestamp && currentTime >= parseInt(frontpageFeedbackTimestamp)) {

            setTimeout(() => {
                render_feedbackform("homepage_question");

            }, 2000);
        }
    }

    return {
        init: function(questionname = false) {

            if(questionname) {
                render_feedbackform(questionname);
            }

            $(document).on("click", SELECTORS.FEEDBACKCOLLECTION + " .skip-btn", close_modal);

            $(document).on("submit", SELECTORS.FEEDBACKCOLLECTION_FORM, submit_feedback_handler);
            $(document).on("submit", "#page-admin-setting-themesettingremui #adminsettings", function(e) {
                localStorage.setItem("remui_settings_feedback_visited", "true");
            });

            $(document).on("click", "#page-site-index .advanceblockblocks .blockurl", function(e) {
                let feedbackTime = Date.now(); // Add 24 hours to current time
                localStorage.setItem('frontpage_feedback_timestamp', feedbackTime);
            });

            $(document).on('click', '.page_sub_header .btn-publish', function() {custompagepublished = true;});
            $(document).on('click', '#page-epb-page-draft .btn[data-action="save"]', function () {
                if (custompagepublished) {
                    render_feedbackform("custompage_question");
                } else {
                    custompagepublished = false;
                }
            });

            let coursefeedbackrenderedcount = 0;
            $(document).on("scroll", function() {
                if(coursefeedbackrenderedcount == 0) {
                    if ($('body').hasClass("pagelayout-course")) {
                        // Calculate scroll position and page height
                        let scrollPosition = window.scrollY;
                        let windowHeight = window.innerHeight;
                        let documentHeight = $(document).height();
                        let scrollTriggerPoint = (documentHeight - windowHeight) * 0.4; // Trigger at 40% scroll
                        // Check if user has scrolled past the trigger point
                        if (scrollPosition > scrollTriggerPoint) {
                            // If either format is "remuiformat", perform the action

                            if(Date.now() >= parseInt(localStorage.getItem('courseformatchangetimestamps'))) {
                                if (isRemuiformat(localStorage.getItem('lastactivecourseformat')) || isRemuiformat(localStorage.getItem('currentactivecourseformat'))) {
                                    render_feedbackform("remuiformat_question");
                                    coursefeedbackrenderedcount++;
                                }
                            }
                        }
                    }
                }
            });
            // $(document).on('click', '#page-site-index a[href]', function(event) {
            //     event.preventDefault(); // Stop the default redirect action

            //     const targetUrl = $(this).attr('href'); // Get the link URL

            //     if (targetUrl === '#' || $(this).closest('#add-block-float-menu').length || $(this).hasClass('block-add')) {
            //         // Skip this link by simply returning from the function
            //         return;
            //     }

            //     // Perform your custom action here
            //     render_feedbackform("homepage_question",function(){
            //         $(document).on("click", SELECTORS.FEEDBACKCOLLECTION + " .skip-btn", function(){
            //             window.location.href = targetUrl;
            //         });

            //         $(document).on("submit", SELECTORS.FEEDBACKCOLLECTION_FORM, function(){
            //             window.location.href = targetUrl;
            //         });
            //     });
            // });

            homepagefeedbackhandler();
            courseformatfeedbackhandler();
            remui_settings_feedback_handler();
        },
        render_feedbackform,
        submit_feedback_handler,
        close_modal,
        get_feedback_context,
        submit_feedback
    };
});
