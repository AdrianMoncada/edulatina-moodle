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
 * Main js for template importer
 *
 * @module     local/edwisersiteimporter
 * @author     Yogesh Shirsath
 * @copyright  (c) 2020 WisdmLabs (https://wisdmlabs.com/) <support@wisdmlabs.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
define([
    'jquery',
    'core/modal_factory',
    'core/modal_events',
    'core/templates',
    'core/notification',
    'core/ajax',
    'core/str',
    'core/toast'
], function($,
    ModalFactory,
    ModalEvents,
    Templates,
    Notification,
    Ajax,
    Str,
    Toast
) {
    const SELECTORS = {
        'PAGE_SUB_HEADER': '.page_sub_header',
        'TAG_BOX': '.tag-box',
        'PAGE_SUB_HEADER_MENUS': '.page_sub_header-menus',
        'TABLE_ROW': '.epb_table_row',
        'ROW_NAME': '.epb_table_row-name',
        'ROW_INPUT': '.pagename_edit_form input[name=pagename]',
        'ROW_OLDINPUT': '.pagename_edit_form input[name=old_pagename]',
        'ROW_PAGENAME': '.epb_table_row-name .pagename',
        'MODIFIE_DDATE': '.epb_table_row-date',
        'TARGET_COPYURL': '.target_url',
        'ADD_PAGE_ROW': '#epb_add_page_row',
        'BTN_EDIT': '.btn-edit',
        'BTN_SUBMITEDIT': '.btn-submitedit',
        'BTN_COPYURL': '.btn-copyurl',
        'BTN_DUPLICATE': '.btn-duplicate',
        'BTN_DELETE': '.btn-delete',
        'BTN_ADDPAGE': '.btn-addpage',
        'BTN_EYE': '.btn-eye',
        'BTN_EYECLOSE': '.btn-eyeclose',
        'BTN_PUBLISH': '.btn-publish',
        'HIDDEN_TAG': '.hidden-tag',
        'DRAFT_TAG': '.draft-tag'
    };

    const ACTION = {
        'UPDATE_PAGE': 'update_page',
        'DUPLICATE_PAGE': 'replicate_page_with_layouts',
        'DELETE_PAGE_RECORD': 'delete_page',
        'ADD_NEW_PAGE': 'add_new_page',
        'PUBLISH_PAGE': 'publish_page_with_layouts'
    };


    // ****** IMPORTANT ******
    // Do not change the sequence.
    // If you want to add new strings here, add it at the bottom.
    // Do not remove any string from the array.
    // There is no way we can revert back if sequence is changed.
    // ****** IMPORTANT ******
    const strings = [
        {key: 'copyurl_toast_msg', component: 'local_edwiserpagebuilder'},
        {key: 'replicate_toast_msg', component: 'local_edwiserpagebuilder'},
        {key: 'delete_toast_msg', component: 'local_edwiserpagebuilder'},
        {key: 'published', component: 'local_edwiserpagebuilder'},
        {key: 'update_text', component: 'local_edwiserpagebuilder'},
        {key: 'no', component: 'local_edwiserpagebuilder'},
        {key: 'yes', component: 'local_edwiserpagebuilder'},
        {key: 'hidden_text', component: 'local_edwiserpagebuilder'},
        {key: 'show_toast_msg', component: 'local_edwiserpagebuilder'},
        {key: 'pagepublishmodalhead', component: 'local_edwiserpagebuilder'},
        {key: 'pagepublishmodaldesc', component: 'local_edwiserpagebuilder'},
        {key: 'pageupdatemodalhead', component: 'local_edwiserpagebuilder'},
        {key: 'pageupdatemodaldesc', component: 'local_edwiserpagebuilder'},
        {key: 'updatemsg', component: 'local_edwiserpagebuilder'},
    ];

    var LANGS; // Gloabl variable to store languages.

    // Functionality to fetch strings.
    const fetchLanguages = () => {
        Str.get_strings(strings).then(function(results) {
            LANGS = results;
            return results;
        });
    };

    // Set sub header on top.
    function setHeaderOnTop() {
        if ($('.page_sub_header').length) {
            setTimeout(function() {
                let pagesubheader = $('.page_sub_header');

                pagesubheader.remove();

                $("#page-wrapper nav.navbar").after(pagesubheader);

                let navbarheight = $('#page-wrapper nav.navbar').height();

                let subpageheaderheight = $('.page_sub_header').height();

                $('.page_sub_header').css('margin-top', navbarheight);

                $('#page.drawers').css('margin-top', (navbarheight + subpageheaderheight + 20));

                $('.drawer-toggler').css('margin-top', (navbarheight + subpageheaderheight));

            }, 10);
        }
    }

    function dateModifier(modifiedDate) {
        // Create a Date object from the Unix timestamp
        let date = new Date(modifiedDate * 1000); // Multiply by 1000 to convert from seconds to milliseconds

        // Define an array of month names
        var monthNames = [
        "January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"
        ];

        // Format the date
        return date.getDate() + " " + monthNames[date.getMonth()] + " " + date.getFullYear();
    }

    // Render the page list.
    function renderSitePageLists() {
        Ajax.call([{
            methodname: 'local_edwiserpagebuilder_do_page_action',
            args: {
                action: 'sitepage_table_content',
                config: ''
            },
            done: function(response) {
                response = JSON.parse(response);

                $.each(response, function(index, obj) {
                    if (obj.refid == -1) {
                        obj.indraft = true;
                        obj.pageurl = "pagedraft.php?id=" + obj.id;
                    } else {
                        obj.pageurl = "page.php?id=" + obj.refid;
                    }
                    obj.visible = parseInt(obj.visible, 10);
                    obj.pagemodified = dateModifier(obj.pagemodified);
                });


                Templates.render("local_edwiserpagebuilder/managepages", {
                    pages: response,
                    config: M.cfg
                }).done(function(html, js) {
                    Templates.appendNodeContents($('#managepage-wrapper'), html, js);
                });
            },
            fail: function(ex) {
                Notification.exception(ex);
            }
        }]);
    }

    // Msg contain string name.
    // args-> object or variable according to string require.
    function showToastMessage(classes, message) {
        Toast.add(message, {
            delay: 3000,
            closeButton: true,
            type: ' epb-cp-toast epb-toast-message ' + classes
        });
    }

    // Trigger on page edit icon.
    function showEditPagename(e) {
        let pageid = $(this).data("value");

        let tableRowName = $(`#${pageid} ${SELECTORS.ROW_NAME}`);
        let inputField = $(`#${pageid} ${SELECTORS.ROW_INPUT}`);
        let pageNameLinkText = $(`#${pageid} ${SELECTORS.ROW_PAGENAME}`);

        $(SELECTORS.ROW_NAME).removeClass("name_editing");

        tableRowName.addClass("name_editing");

        inputField.focus();

        inputField.val("");

        inputField.val(pageNameLinkText.text());

        let inputElement = inputField.get(0);

        inputElement.scrollLeft = inputElement.scrollWidth;
    }

    // Trigger when updated pagename submit by clicking enter button or check box icon.
    function submitUpdatedPagename(e, id = 0) {
        e.preventDefault();

        let pageid = id ? id : $(this).closest(".input-group").data("value");

        let inputField = $(`#${pageid} ${SELECTORS.ROW_INPUT}`);
        let inputOldField = $(`#${pageid} ${SELECTORS.ROW_OLDINPUT}`);
        let tableRowName = $(`#${pageid} ${SELECTORS.ROW_NAME}`);
        let pageNameLinkText = $(`#${pageid} ${SELECTORS.ROW_PAGENAME}`);
        let pageModifiedDate = $(`#${pageid} ${SELECTORS.MODIFIE_DDATE}`);

        let pagename = inputField.val();
        if (pagename.length > 0) {
            inputField[0].value = inputOldField.val();

            Ajax.call([{
                methodname: 'local_edwiserpagebuilder_do_page_action',
                args: {
                    action: ACTION.UPDATE_PAGE,
                    config: JSON.stringify({
                        'id': pageid,
                        'pagename': pagename
                    })
                },
                done: function(response) {
                    id = JSON.parse(response);
                    pageNameLinkText.text(pagename);
                    pageModifiedDate.text(dateModifier(Math.floor(Date.now() / 1000)));
                },
                fail: function(ex) {
                    Notification.exception(ex);
                }
            }]);

            tableRowName.removeClass("name_editing");
        }

    };

    function copyPageUrl(e) {
        let pageid = $(this).data("value");

        let copyText = $(`#${pageid} ${SELECTORS.TARGET_COPYURL}`);
        copyText.show();
        copyText.select();
        document.execCommand('copy');
        copyText.hide();

	showToastMessage(' ', LANGS[0]);
    }

    // When Page replicated or created,
    // We got page data after that we insert it to table row by using this function.
    function insertRowToTable(page) {
        Templates.render("local_edwiserpagebuilder/site_page_table_single_row", {
            pages: page,
            config: M.cfg
        }).done(function(html, js) {
            Templates.prependNodeContents($('.epb_table tbody'), html, js);
            $('html, body').animate({ scrollTop: $(".epb_table")[0].offsetTop }, $(window).scrollTop() / 6);
        });
    }

    function replicatePage(e) {
        let pageid = $(this).data("value");
        let pagename = $(`#${pageid} ${SELECTORS.ROW_PAGENAME}`).text() + "_copy";

        Ajax.call([{
            methodname: 'local_edwiserpagebuilder_do_page_action',
            args: {
                action: ACTION.DUPLICATE_PAGE,
                config: JSON.stringify({
                    "id": pageid
                })
            },
            done: function(response) {
                id = JSON.parse(response);
                let visible = true;
                if($(`#${pageid} ${SELECTORS.HIDDEN_TAG}`).length) {
                    visible = false;
                }
                let page = {
                    "id": id,
                    "pagename": pagename,
                    "pageurl": "pagedraft.php?id=" + id,
                    "indraft": true,
                    "visible": visible,
                    "pagemodified": dateModifier(Math.floor(Date.now() / 1000))
                };
                if ($(`${SELECTORS.PAGE_SUB_HEADER_MENUS} ${SELECTORS.BTN_DUPLICATE}`).length) {

                    showToastMessage(' ', LANGS[1]);

                    let newUrl = M.cfg.wwwroot + '/local/edwiserpagebuilder/pagedraft.php?id=' + id;

                    window.open(newUrl, '_blank');
                } else {
                    insertRowToTable(page);
                }
            },
            fail: function(ex) {
                Notification.exception(ex);
            }
        }]);
    }


    async function deletePage(e) {
        let pageid = $(this).data("value");
        let currentPage = $("#" + pageid);
        let tbody = currentPage.parent();
        let addPageRow = $(SELECTORS.ADD_PAGE_ROW);

        deletemodal = await ModalFactory.create({
            type: ModalFactory.types.SAVE_CANCEL,
            title: Str.get_string('pagedeletationmodalhead', 'local_edwiserpagebuilder'),
            body: Str.get_string('pagedeletationmodaldesc', 'local_edwiserpagebuilder'),
        })
        .done(function(modal) {
            // Change cancel button styling.
            modal.setButtonText('cancel', LANGS[5]);

            // Change Save button text.
            modal.setButtonText('save', LANGS[6]);

            var root = modal.getRoot();
            root.on(ModalEvents.save, function() {
                Ajax.call([{
                    methodname: 'local_edwiserpagebuilder_do_page_action',
                    args: {
                        action: ACTION.DELETE_PAGE_RECORD,
                        config: JSON.stringify({
                            "id": pageid
                        })
                    },
                    done: function(response) {
                        response = JSON.parse(response);
                        currentPage.remove();
                        if (tbody.children().length == 1) {
                            addPageRow.removeClass("d-none");
                        }
                        showToastMessage(' ', LANGS[2]);
                    },
                    fail: function(ex) {
                        Notification.exception(ex);
                    }
                }]);
            });
            modal.show();
        });

        $(deletemodal.getActionSelector('cancel')).addClass("deletemodal-btns");
        $(deletemodal.getActionSelector('save')).addClass("deletemodal-btns");
    }

    function publishCurrentPage() {
        let publishBtn = $(this);
        let pageid = $(this).data("value");
        let indraft = $(this).attr('indraft') !== undefined;

        ModalFactory.create({
            type: ModalFactory.types.SAVE_CANCEL,
            title: indraft ? LANGS[9] : LANGS[11],
            body: indraft ? LANGS[10] : LANGS[12],
        })
        .done(function(modal) {
            modal.setButtonText('cancel', LANGS[5]);
            modal.setButtonText('save', LANGS[6]);

            var root = modal.getRoot();
            root.on(ModalEvents.save, function() {
                Ajax.call([{
                    methodname: 'local_edwiserpagebuilder_do_page_action',
                    args: {
                        action: ACTION.PUBLISH_PAGE,
                        config: JSON.stringify({
                            "id": pageid
                        })
                    },
                    done: function(response) {
                        id = JSON.parse(response);

                        $(SELECTORS.BTN_PUBLISH).text(LANGS[4]);
                        publishBtn.removeAttr('indraft');

                        showToastMessage("", indraft ? LANGS[3] : LANGS[13]);
                    },
                    fail: function(ex) {
                        Notification.exception(ex);
                    }
                }]);
            });
            modal.show();
        });
    };

    function showAddPageInput(e) {
        let addPageRow = $(SELECTORS.ADD_PAGE_ROW);
        let inputField = $(`${SELECTORS.ADD_PAGE_ROW} ${SELECTORS.ROW_INPUT}`);
        $(addPageRow).removeClass("d-none");

        let tableRowName = $(`${SELECTORS.ADD_PAGE_ROW} ${SELECTORS.ROW_NAME}`);

        addPageRow.remove();
        $('.epb_table tbody').prepend(addPageRow);

        $(SELECTORS.ROW_NAME).removeClass("name_editing");
        $(tableRowName).addClass("name_editing");

        inputField.focus();
    };

    function inputChangeHandler(e) {
        let submitEdit = $(SELECTORS.BTN_SUBMITEDIT);

        let inputText = $(this).val();
        if (inputText.length > 0) {
            submitEdit.removeClass("d-none");
        } else {
            submitEdit.addClass("d-none");
        }
    };

    function addPageHandler(e) {
        let inputField = $(`${SELECTORS.ADD_PAGE_ROW} ${SELECTORS.ROW_INPUT}`);
        let submitEdit = $(`${SELECTORS.ADD_PAGE_ROW} ${SELECTORS.BTN_SUBMITEDIT}`);

        let pagename = inputField.val();

        if (pagename.length > 0) {
            inputField[0].value = "";

            let pagedata = JSON.stringify({
                "pagename": pagename
            });

            Ajax.call([{
                methodname: 'local_edwiserpagebuilder_do_page_action',
                args: {
                    action: ACTION.ADD_NEW_PAGE,
                    config: pagedata
                },
                done: function(response) {
                    id = JSON.parse(response);

                    $(SELECTORS.ADD_PAGE_ROW).addClass("d-none");
                    submitEdit.addClass("d-none");

                    let page = {
                        "id": id,
                        "pagename": pagename,
                        "pageurl": "pagedraft.php?id=" + id,
                        "indraft": true,
                        "visible": true,
                        "pagemodified": dateModifier(Math.floor(Date.now() / 1000))
                    };

                    insertRowToTable(page);
                },
                fail: function(ex) {
                    Notification.exception(ex);

                }
            }]);
        }
    }

    function makePageVisible(e) {
        let pageid = $(this).data("value");

        Ajax.call([{
            methodname: 'local_edwiserpagebuilder_do_page_action',
            args: {
                action: ACTION.UPDATE_PAGE,
                config: JSON.stringify({
                    'id': pageid,
                    'visible': 1
                })
            },
            done: function(response) {
                id = JSON.parse(response);
                $(`#${pageid} ${SELECTORS.BTN_EYECLOSE}`).removeClass('d-none');
                $(`#${pageid} ${SELECTORS.BTN_EYE}`).addClass('d-none');
                $(`#${pageid} ${SELECTORS.HIDDEN_TAG}`).remove();

                showToastMessage(' ', LANGS[8]);
            },
            fail: function(ex) {
                Notification.exception(ex);
            }
        }]);

    }

    function makePageHidden(e) {
        let pageid = $(this).data("value");

        Ajax.call([{
            methodname: 'local_edwiserpagebuilder_do_page_action',
            args: {
                action: ACTION.UPDATE_PAGE,
                config: JSON.stringify({
                    'id': pageid,
                    'visible': 0
                })
            },
            done: function(response) {
                id = JSON.parse(response);
                $(`#${pageid} ${SELECTORS.BTN_EYECLOSE}`).addClass('d-none');
                $(`#${pageid} ${SELECTORS.BTN_EYE}`).removeClass('d-none');

                let hiddenTag = $(`
                    <div class="btn-tag hidden-tag" title="${LANGS[7]}" >
                        ${LANGS[7]}
                    </div>
                `);

                $(`${SELECTORS.PAGE_SUB_HEADER} ${SELECTORS.TAG_BOX}`).append(hiddenTag);

                showToastMessage(' ', LANGS[8]);
            },
            fail: function(ex) {
                Notification.exception(ex);
            }
        }]);
    }

    function initEvents() {
        renderSitePageLists();

        // Trigger on page edit icon.
        $(document).on("click", `${SELECTORS.TABLE_ROW} ${SELECTORS.BTN_EDIT}`, showEditPagename);

         // Trigger when updated pagename submit by clicking enter button or check box icon.
        $(document).on("click", `${SELECTORS.TABLE_ROW} ${SELECTORS.BTN_SUBMITEDIT}`, submitUpdatedPagename);

        // When we change any thing on input than it's trigger,
        // Its defined for hiding check box icon if input field is empty.
        $(document).on("input",`${SELECTORS.TABLE_ROW} ${SELECTORS.ROW_INPUT}`, inputChangeHandler);

        // Trigger on submit edit input by clicking enter button of keyboard.
        $(document).on("keypress", `${SELECTORS.TABLE_ROW} ${SELECTORS.ROW_INPUT}`, function(e) {
            if (e.which === 13) {
                e.preventDefault();
                const parentElement = $(this).closest(".input-group");
                submitUpdatedPagename(e, parentElement.data("value"));
            }
        });

        // Trigger on Delete icon.
        $(document).on("click", `${SELECTORS.TABLE_ROW} ${SELECTORS.BTN_DELETE}`, deletePage);


        // Trigger on Add a new page button.
        $(document).on("click", SELECTORS.BTN_ADDPAGE, showAddPageInput);

        // When we change any thing on input than it's trigger,
        // Its defined for hiding check box icon if input field is empty.
        $(document).on("input",`${SELECTORS.ADD_PAGE_ROW} ${SELECTORS.ROW_INPUT}`, inputChangeHandler);

        // Submit the page detail by pressing enter key of keyboard.
        $(document).on("keypress",`${SELECTORS.ADD_PAGE_ROW} ${SELECTORS.ROW_INPUT}`, function(e) {
            if (e.which === 13) {
                e.preventDefault();
                addPageHandler(e);
            }
        });

        // Submit the page details by clicking checkbox icon.
        $(document).on("click",`${SELECTORS.ADD_PAGE_ROW} ${SELECTORS.BTN_SUBMITEDIT}`, addPageHandler);

    };

    // These event listner are common for both sub header and site page settings
    function initCommon() {
        setHeaderOnTop();

        fetchLanguages();

        // Trigger on copy icon
        $(document).on("click", SELECTORS.BTN_COPYURL, copyPageUrl);

        // Trigger on Duplicate icon
        $(document).on("click", SELECTORS.BTN_DUPLICATE, replicatePage);

        // Trigger on Delete icon
        $(document).on("click", SELECTORS.BTN_PUBLISH, publishCurrentPage);

        // Trigger on Eye Icon
        $(document).on("click", SELECTORS.BTN_EYE, makePageVisible);

        // Trigger on Eyeclose Icon
        $(document).on("click", SELECTORS.BTN_EYECLOSE, makePageHidden);

        $(window).on('beforeunload', function(e) {
            return undefined;
        });
    }

    return {
        init: function() {
            $(document).ready(function() {
                initEvents();
                initCommon();
            });
        },
        initCommon: function() {
            initCommon();
        }
    };
});
