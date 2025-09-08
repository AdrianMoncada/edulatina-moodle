/* eslint-disable no-console */
/* eslint-disable no-undef */
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
 * @module     theme_remui/customizer
 * @copyright  (c) 2023 WisdmLabs (https://wisdmlabs.com/)
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 * @author     Yogesh Shirsath
 */

import $ from "jquery";
import Ajax from "core/ajax";
import Notification from "core/notification";
import ModalFactory from "core/modal_factory";
import "core/modal_save_cancel";
import ModalEvents from "core/modal_events";
import Utils from "theme_remui/customizer/utils";
import globalSite from "theme_remui/customizer/global-site";
import globalBody from "theme_remui/customizer/global-body";
import globalColors from "theme_remui/customizer/global-colors";
import globalHeading from "theme_remui/customizer/global-heading";
import globalButtons from "theme_remui/customizer/global-buttons";
import headerLogo from "theme_remui/customizer/header-logo";
import headerSiteDesign from "theme_remui/customizer/header-design";
import footer from "theme_remui/customizer/footer";
import additionalSettings from "theme_remui/customizer/additional-settings";
import iconsettings from "theme_remui/customizer/icon-settings";
import quickSetup from "theme_remui/customizer/quicksetup-settings";
import login from "theme_remui/customizer/login";
import "theme_remui/color-picker";
import feedbackcollection from  "theme_remui/feedbackcollection";

/**
 * Ajax promise requests
 */
var PROMISES = {
    /**
     * Save settings to database
     * @param {Array} settings Settings string
     * @param {Object} options Additional options.
     * @return {Promise}
     */
    SAVE_SETTINGS: (settings, options) => {
        if (options == undefined) {
            options = {};
        }
        return Ajax.call([{
            methodname: "theme_remui_customizer_save_settings",
            args: {
                settings: JSON.stringify(settings),
                options: JSON.stringify(options)
            },
        }])[0];
    },
};

/**
 * Customizer panel settings handler.
 */
var handlers = [
    globalSite,
    globalBody,
    globalColors,
    globalHeading,
    globalButtons,
    headerLogo,
    headerSiteDesign,
    footer,
    additionalSettings,
    iconsettings,
    quickSetup,
    login,
];

/**
 * Selectors
 */
var SELECTOR = {
    CUSTOMIZER: "#customizer",
    CONTROLS: "#customize-controls",
    MODE_TOGGLE: "#customize-controls .mode-toggle",
    WRAP: "#customizer-wrap",
    CLOSE_CUSTOMIZER: ".customize-controls-close",
    CUSTMIZER_TOGGLE: ".customizer-controls-toggle",
    COLOR_SETTING: ".setting-type-color",
    PUBLISH: "#publish-settings",
    IFRAME: "#customizer-frame",
    MAIN_OVERLAY: "#main-overlay",
    PANEL_LINK: "[sidebar-panel-link]",
    PANEL_BACK: ".customize-panel-back",
    PANEL: ".sidebar-panel",
    PANEL_ID: "panel-id",
    PREVIOUS: "previous",
    CURRENT: "current",
    NEXT: "next",
    SETTINGS_RESET: "#reset-settings",
    INPUT_RESET: ".input-reset",
    SELECT_RESET: ".select-reset",
    CHECKBOX_RESET: ".checkbox-reset",
    COLOR_RESET: ".color-reset",
    TEXTAREA_RESET: ".textarea-reset",
    HTMLEDITOR_RESET: ".htmleditor-reset",
    HEADING_TOGGLE: ".heading-toggle",
    RANGEINPUT: ".form-range",
    SETTINGS_SAVE_MODAL: "#settings-save-modal"
};

var CONSTANTS = {
    NIGHTEYESTATE: 'nighteyewState',
    CURRNIGHTEYESTATE: 'currnighteyewState'
};

/**
 * Apply settings on iframe load.
 */
function applySettings() {
    handlers.forEach(handler => handler.apply());
    // Trigger apply so external js can handle customizer apply.
    $(document).trigger("edwiser.customizer.apply");
}

/**
 * Initialize setting change handler.
 */
function initHandlers() {
    handlers.forEach(handler => handler.init());
    // Trigger init so external js can handle customizer init.
    $(document).trigger("edwiser.customizer.init");
}

/**
 * Field reset handlers.
 */
function resetHandlers() {
    // Color reset.
    $(SELECTOR.COLOR_RESET).on("click", function() {
        let color = $(this).data("default");
        $(this).closest('.form-group').find("input").spectrum("set", color);
        $(this).closest('.form-group').find("input").trigger("color.changed", color);
    });

    // Checkbox reset.
    $(SELECTOR.CHECKBOX_RESET).on("click", function() {
        let value = $(this).data("default");
        $(this).closest('.form-group').find("input").prop(
            "checked",
            $(this).closest('.form-group').find("input").val() == value
        );
        $(this).closest('.form-group').find("input").trigger("change").trigger("input");
    });

    // Reset select.
    $(SELECTOR.SELECT_RESET).on("click", function() {
        let value = $(this).data("default");
        $(this).closest('.form-group').find("select").val(value).trigger("input").trigger("change");
    });

    // Reset input.
    $(SELECTOR.INPUT_RESET).on("click", function() {
        let value = $(this).data("default");
        $(this).closest('.form-group').find("input").val(value).trigger("input").trigger("change");
    });


    // Reset textarea.
    $(SELECTOR.TEXTAREA_RESET).on("click", function() {
        let value = $(this).data("default");
        $(this)
            .closest('.form-group')
            .find("textarea")
            .val(value)
            .trigger("input")
            .trigger("change");
    });

    // Reset htmleditor.
    $(SELECTOR.HTMLEDITOR_RESET).on("click", function() {
        let value = $(this).data("default");
        let textarea = $(this).closest('.form-group').find("textarea");
        $(this)
            .closest('.form-group')
            .find(`#${textarea.attr("id")}editable`)
            .html(value);
        textarea.val(value).trigger("input").trigger("change");
    });
}

/**
 * Handle page load and link change of iframe.
 * When loaded or link changed, reapplying all settings.
 */
function iframeHandler() {
    var contentDocument = Utils.getDocument();
    var contentWindow = Utils.getWindow();

    $(contentDocument).find("body").addClass("customizer-opened");
    $(contentDocument)
        .find(".customizer-editing-icon")
        .closest("a")
        .addClass("d-none")
        .removeClass("d-flex");
    $(contentDocument)
        .find("#edwpersonalizer-settings .activatepersonalizer")
        .addClass('d-none');
    $(contentDocument)
        .find("#edwpersonalizer-settings .activepersonalizer")
        .removeClass('d-none');
    $(contentDocument).find("#sidebar-setting").addClass("d-none");
    $(contentDocument).find(".nav-darkmode").addClass('d-none').removeClass('d-flex');
    $(document).trigger("remui-adjust-left-side");

    // Change browser url on iframe navigation.
    window.history.replaceState(
        "pagechange",
        document.title,
        M.cfg.wwwroot +
        "/theme/remui/customizer.php?url=" +
        encodeURI(contentWindow.location.href)
    );

    // Set current iframe url to customizer close button.
    $(SELECTOR.CLOSE_CUSTOMIZER).attr("href", contentWindow.location.href);

    // Apply setting on iframe load.
    applySettings();

    // Hide overlay when iframe loaded.
    Utils.hideLoader();

    setTimeout(() => {
        // Iframe on unload event.
        contentWindow.onbeforeunload = function() {
            console.log('Iframe navigated.');
            Utils.showLoader();
        };
    }, 2000);
}

/**
 * Get settings array which preserve settings before reset.
 * @returns {array} Settings array
 */
function preserveResetSettings() {
    let element,
    settings = [],
    ids = [
        'customcss',
        'facebooksetting',
        'twittersetting',
        'linkedinsetting',
        'gplussetting',
        'youtubesetting',
        'instagramsetting',
        'pinterestsetting',
        'quorasetting',
        'whatsappsetting',
        'telegramsetting',
        'footerprivacypolicy',
        'footertermsandconditions',
        'brandlogotext',
        'footercolumn',
        'footercolumnsize',
        'poweredbyedwiser',
        'footerprivacypolicyshow'
    ];
    for (let i = 1; i <= 4; i++) {
        ids.push('footercolumn' + i + 'type');
        ids.push('footercolumn' + i + 'title');
        ids.push('footercolumn' + i + 'customhtml');
        ids.push('socialmediaiconcol' + i);
        ids.push('footercolumn' + i + 'social');
        ids.push('footercolumn' + i + 'menu');
    }
    ids.forEach(id => {
        element = $('[name="' + id + '"]');
        element.closest('.fitem').find('.reset-button').trigger('click');
        if (element.is('[type="checkbox"]')) {
            settings.push({
                name: id,
                value: element.is(':checked')
            });
        } else if (element.is('select[multiple]')) {
            element.val().forEach(value => {
                settings.push({
                    name: id,
                    value: value
                });
            });
        } else {
            settings.push({
                name: id,
                value: element.val()
            });
        }

    });
    return settings;
}

/**
 * Reset all settings.
 * It also shows confirmation modal.
 */
function resetAllSettingHandler() {
    let body = M.util.get_string("reset-settings-description", "theme_remui");
    body += '<ul class"pl-5">';
    [
        'customcss',
        'socialall',
        'loginpagesitedescription',
        'footerprivacypolicy',
        'footertermsandconditions',
        'footercolumnsettings'
    ].forEach(id => {
        body += '<li>' + M.util.get_string(id, 'theme_remui') + '</li>';
    });

    body += '</ul>';
    ModalFactory.create({
            title: M.util.get_string("reset", "moodle"),
            body: body,
            type: ModalFactory.types.SAVE_CANCEL,
        },
        $("#create-modal")
    ).done(modal => {
        modal.show();
        var root = modal.getRoot();
        root.find('[data-region="footer"]').html(`
            <button type="button" class="btn btn-outline-danger" data-action="reset-all">
                ${M.util.get_string('resetall', 'theme_remui')}
            </button>
            <button type="button" class="btn btn-danger" data-action="reset-some">
                ${M.util.get_string('reset', 'theme_remui')}
            </button>
        `);
        function reset(settings) {
            $(SELECTOR.MAIN_OVERLAY).removeClass("d-none");
            modal.destroy();
            PROMISES.SAVE_SETTINGS(settings, {
                    reset: true
                })
                .done(() => {
                    location.reload();
                })
                .fail(ex => {
                    Notification.exception(ex);
                });
        }
        root.on('click', '[data-action="reset-all"]', () => {
            reset([]);
        });
        root.on('click', '[data-action="reset-some"]', () => {
            reset(preserveResetSettings());
        });
    });
}

/**
 * Publish changes to server.
 */
function publishChanges() {
    console.log('Saving setting to site.');
    $(SELECTOR.MAIN_OVERLAY).removeClass("d-none");
    let settings = $(SELECTOR.CONTROLS).serializeArray();
    settings.forEach((element, index) => {
        if ($(`[name="${element.name}"]`).is(".site-colorpicker")) {
            element.value = $(`[name="${element.name}"]`)
                .spectrum("get")
                .toString();
            settings[index] = element;
        }
    });
    PROMISES.SAVE_SETTINGS(settings)
        .done(response => {
            let obj = {};
            if (response.status == false) {
                obj.title = M.util.get_string("error", "theme_remui");
                obj.body = response.errors;
            } else {
                obj.title = M.util.get_string("success", "moodle");
                obj.body = response.message;
                $(SELECTOR.CONTROLS).data("unsaved", false);
            }
            console.log('Settings saved.');
            location.reload();
            // $(SELECTOR.SETTINGS_SAVE_MODAL).modal('show');
            // $(SELECTOR.SETTINGS_SAVE_MODAL).find('[data-region="title"]').text(obj.title);
            // $(SELECTOR.SETTINGS_SAVE_MODAL).find('[data-region="body"]').text(obj.body);
            // $(SELECTOR.MAIN_OVERLAY).addClass("d-none");
        })
        .fail(function(ex) {
            console.log('Error:' + ex.message);
            Notification.exception(ex);
            $(SELECTOR.MAIN_OVERLAY).addClass("d-none");
        });
}

/**
 * Close customizer.
 * @param {DOMEvent} event Click event.
 * @returns {boolean}
 */
function closeCustomizer(event) {
    if ($(SELECTOR.CONTROLS).data("unsaved") == false) {
        return true;
    }
    event.preventDefault();
    ModalFactory.create({
            title: M.util.get_string("customizer-close-heading", "theme_remui"),
            body: M.util.get_string(
                "customizer-close-description",
                "theme_remui"
            ),
            type: ModalFactory.types.SAVE_CANCEL,
        },
        $("#create")
    ).done(modal => {
        modal.show();
        modal.setSaveButtonText(M.util.get_string("yes", "moodle"));
        var root = modal.getRoot();
        root.on(ModalEvents.save,async  () => {
            const feedbackcontext = await feedbackcollection.get_feedback_context("visualpersonalizer_question");
            if(JSON.parse(feedbackcontext)){
                feedbackcollection.render_feedbackform("visualpersonalizer_question",function(){

                    // Attach click event to a specific button within the rendered form
                    $(document).on("click","#feedbackcollection-form .skip-btn", function() {
                        // feedbackcollection.close_modal();
                        window.location = $(SELECTOR.CLOSE_CUSTOMIZER).attr("href");
                    });

                    $(document).on("submit", "#feedbackcollection-form", function(e) {
                        e.preventDefault();
                        // feedbackcollection.submit_feedback_handler(e);
                        window.location = $(SELECTOR.CLOSE_CUSTOMIZER).attr("href");
                    });
                });
                console.log("inside feedback collection");
            }else{
                window.location = $(SELECTOR.CLOSE_CUSTOMIZER).attr("href");
            }
        });
    });

    // Setting DM status back to saved preference of user.
    localStorage.setItem(CONSTANTS.NIGHTEYESTATE, localStorage.getItem(CONSTANTS.CURRNIGHTEYESTATE));
    return true;
}

/**
 * Initialize events
 */
function init() {
    // Initialize customizer only once.
    if (window["customizer-enabled"] == true) {
        return;
    }
    window["customizer-enabled"] = true;

    // Save current state of DM to another variable.
    localStorage.setItem(CONSTANTS.CURRNIGHTEYESTATE, localStorage.getItem(CONSTANTS.NIGHTEYESTATE));
    // Reset DM on personalizer.
    localStorage.setItem(CONSTANTS.NIGHTEYESTATE, 2);

    $(() => {
        initHandlers();
        resetHandlers();

        // Lazy loading iframe.
        $(SELECTOR.IFRAME).attr('src', $(SELECTOR.IFRAME).data('src'));

        // Iframe on load event.
        $(SELECTOR.IFRAME).get(0).addEventListener("load", iframeHandler);

        $(SELECTOR.SETTINGS_RESET).on("click", resetAllSettingHandler);

        // Open next panel.
        $(SELECTOR.PANEL_LINK).on("click", function() {
            $(SELECTOR.PANEL + "#" + $(this).data(SELECTOR.PANEL_ID)).addClass(
                SELECTOR.CURRENT
            );
            $(this).closest(SELECTOR.PANEL).removeClass(SELECTOR.CURRENT);
        });

        // Hide setting save modal.
        $(SELECTOR.SETTINGS_SAVE_MODAL + ' [data-action="close"]').on('click', function() {
            $(SELECTOR.SETTINGS_SAVE_MODAL).modal('hide');
        });
        $('body').on('click', function(e) {
            var container = $(SELECTOR.SETTINGS_SAVE_MODAL);
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                container.modal('hide');
            }
        });


        // Go back to previous panel.
        $(SELECTOR.PANEL_BACK).on("click", function() {
            $(
                SELECTOR.PANEL +
                ":not(" +
                SELECTOR.PANEL +
                "#" +
                $(this).data(SELECTOR.PANEL_ID) +
                ")"
            ).removeClass(SELECTOR.CURRENT);
            $(SELECTOR.PANEL + "#" + $(this).data(SELECTOR.PANEL_ID)).addClass(
                SELECTOR.CURRENT
            );
        });

        // Toggle screen mode.
        $(SELECTOR.MODE_TOGGLE).on("click", function() {
            $(SELECTOR.CUSTOMIZER)
                .removeClass("mode-desktop mode-tablet mode-mobile")
                .addClass(`mode-${$(this).data("mode")}`);
        });

        // Prevent submission.
        $(SELECTOR.CONTROLS).on("submit", function(event) {
            event.preventDefault();
            return false;
        });

        // Form change handler.
        $(`
            ${SELECTOR.CONTROLS} input[type="text"],
            ${SELECTOR.CONTROLS} input[type="number"],
            ${SELECTOR.CONTROLS} input[type="checkbox"]
            ${SELECTOR.CONTROLS} textarea,
            ${SELECTOR.CONTROLS} select
        `).on("change", function() {
            $(SELECTOR.CONTROLS).data("unsaved", true);
        });
        $(`${SELECTOR.CONTROLS} input[type="color"]`).on(
            "color.changed",
            function() {
                $(SELECTOR.CONTROLS).data("unsaved", true);
            }
        );

        // Submit settings to database.
        $(SELECTOR.PUBLISH).on("click", publishChanges);

        // Handle customizer close event.
        $(SELECTOR.CLOSE_CUSTOMIZER).on("click", closeCustomizer);

        // Toggle customizer.
        $(SELECTOR.CUSTMIZER_TOGGLE).on("click", function() {
            $("body").toggleClass("full-customizer");
        });

        // Toggle headings.
        $(SELECTOR.HEADING_TOGGLE).on("click", function() {
            $(this).toggleClass("collapsed");
            $(this).next().slideToggle("fast");
        });

        // Range slider observer.
        $("body").on("input", SELECTOR.RANGEINPUT, function() {
            let id = $(this).attr("id");
            let value = $(this).val();
            $(`#${id}-range-value`).text(value);
        });

        // Turn On dark mode in personalizer
        $(".previewswitchon").on("click", function() {
            // Set darkmode status to 1(Enable).
            localStorage.setItem(CONSTANTS.NIGHTEYESTATE, 1);

            // Reload Customizer iframe.
            $(SELECTOR.IFRAME).attr('src', $(SELECTOR.IFRAME).data('src'));

            $('#customizer').addClass("showdm");
            $(".previewswitchon").addClass('d-none');
            $(".previewswitchoff").removeClass('d-none');
            $(".customizer-panels").css("overflow-y", "hidden");
        });
        $(".previewswitchoff").on("click", function() {
            // Set darkmode status to 2 (Disable).
            localStorage.setItem(CONSTANTS.NIGHTEYESTATE, 2);

            // Reload Customizer iframe.
            $(SELECTOR.IFRAME).attr('src', $(SELECTOR.IFRAME).data('src'));
            $('#customizer').removeClass("showdm");
            $(".previewswitchoff").addClass('d-none');
            $(".previewswitchon").removeClass('d-none');
            $(".customizer-panels").css("overflow-y", "auto");
        });
    });
}

export {
    init
};
