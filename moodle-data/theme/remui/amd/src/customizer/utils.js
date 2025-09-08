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
 * Theme customizer utils js
 * @copyright (c) 2023 WisdmLabs (https://wisdmlabs.com/) <support@wisdmlabs.com>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 * @author    Yogesh Shirsath
 */


import $ from 'jquery';
import Ajax from 'core/ajax';
import Notification from 'core/notification';
import ModalFactory from 'core/modal_factory';
import ModalEvents from 'core/modal_events';
import Fragment from 'core/fragment';
import 'core/modal_save_cancel';

/**
 * Selectors
 */
var SELECTOR = {
    COMPONENT: 'theme_remui',
    FORMLABEL: '.col-form-label',
    HMTLEDITOR: 'customizer_htmleditor',
    CONTROLS: '#customize-controls',
    IFRAME: '#customizer-frame',
    WRAP: '#customizer-wrap',
    IFRAME_OVERLAY: '#preview-overlay'
};

/**
 * Promises list.
 */
var PROMISES = {
    /**
     * Get file url using itemid
     * @param {number} itemid Item id
     * @return {Promise}
     */
    GET_FILE_URL: function(itemid) {
        return Ajax.call([{
            methodname: 'theme_remui_customizer_get_file_from_setting',
            args: {
                itemid: itemid
            }
        }])[0];
    }
};

/**
 * Device widths
 */
var deviceWidth = {
    sm: 540,
    md: 800,
};

/**
 * Get contentDocument of iframe
 * @return {DOM} contentDocument
 */
function getDocument() {
    return $(SELECTOR.IFRAME)[0].contentDocument;
}

/**
 * Get contentWindow of iframe
 * @return {DOM} contentWindow
 */
function getWindow() {
    return $(SELECTOR.IFRAME)[0].contentWindow;
}

/**
 * Put style in style tag.
 * @param {String} id      Id for style tag
 * @param {String} content Style content
 */
function putStyle(id, content) {
    id += '_style';
    let bodyDOM = $(getDocument()).find('body');

    if ($(bodyDOM).find('#' + id).length == 0) {
        $(bodyDOM).append(`<style id="${id}"></style>`);
    }
    $(bodyDOM).find('#' + id).html(content);
}

/**
 * Load font on iframe.
 * @param {string} fontName Font name
 */
function loadFont(fontName) {
    let id = fontName.replace(' ', '');
    id += '_js';
    let bodyDOM = $(getDocument()).find('body');
    if ($(bodyDOM).find('#' + id).length != 0) {
        return;
    }
    let js = document.createElement('script');
    js.type = 'text/javascript';
    js.id = id;
    js.textContent = `require(['theme_remui/webfont'], function(webFont) {
        webFont.load({
            google: {
                families: ['${fontName}:100,200,300,400,500,600,700,800,900']
            }
        });
    });`;
    $(bodyDOM).append(js);
}

/**
 * Put Jscode in script tag.
 * @param {String} id      Id for js tag
 * @param {String} content Js content
 */
function putJs(id, content) {
    id += '_js';
    let bodyDOM = $(getDocument()).find('body');
    let js = document.createElement('script');
    js.type = 'text/javascript';
    js.id = id;
    js.textContent = content;
    if ($(bodyDOM).find('#' + id).length != 0) {
        $(bodyDOM).find('#' + id).remove();
    }
    $(bodyDOM).append(js);
}

/**
 * Get file user from itemid
 * @param {Number} itemid file itemid
 * @return {Promise}
 */
function getFileURL(itemid) {
    return PROMISES.GET_FILE_URL(itemid).fail(Notification.exception);
}

/**
 * File observer.
 * @param {DOM} targetNode Node on which observer will be applied
 * @param {function} callBack Callback method
 */
function fileObserver(targetNode, callBack) {
    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(function() {
        $(SELECTOR.CONTROLS).data('unsaved', true);
        callBack();
    });

    // Start observing the target node for configured mutations
    observer.observe(targetNode, {
        attributes: true,
        attributeFilter: ['class'],
        childList: false,
        characterData: false
    });
}

/**
 * Show loader.
 */
function showLoader() {
    $(SELECTOR.IFRAME_OVERLAY).show();
}

/**
 * Hide loader/
 */
function hideLoader() {
    $(SELECTOR.IFRAME_OVERLAY).hide();
}

/**
 * Expand html editor in modal to get more area.
 * @param {String} name Setting name.
 */
function htmlEditorExpand(name) {
    $(`#fitem_id_${name} .icon-expand`).on('click', function() {
        let content = $(`#id_${name}`).val();
        ModalFactory.create({
            title: $(`#fitem_id_${name} ${SELECTOR.FORMLABEL}`).text(),
            body: Fragment.loadFragment(SELECTOR.COMPONENT, SELECTOR.HMTLEDITOR, 1, {
                content: content
            }),
            type: ModalFactory.types.SAVE_CANCEL
        }, $('#create')).done(function(modal) {
            modal.show();
            $(modal.getModal()).addClass('modal-lg');
            var root = modal.getRoot();
            root.on(ModalEvents.save, function(event) {
                event.preventDefault();
                content = $(`#${SELECTOR.COMPONENT}_${SELECTOR.HMTLEDITOR}`).val();
                $(`#id_${name}`).val(content).trigger('change');
                $(`#id_${name}editable`).html(content);
                modal.hide();
            });

            // Destroy modal on hidden.
            root.on(ModalEvents.hidden, function() {
                modal.destroy();
            });
        });
    });
}

/**
 * Trigger resize event on iframe.
 */
function triggerResize() {
    getWindow().dispatchEvent(new Event('resize'));
}

export default {
    putStyle,
    putJs,
    loadFont,
    getDocument,
    getWindow,
    deviceWidth,
    getFileURL,
    fileObserver,
    showLoader,
    hideLoader,
    htmlEditorExpand,
    triggerResize
};
