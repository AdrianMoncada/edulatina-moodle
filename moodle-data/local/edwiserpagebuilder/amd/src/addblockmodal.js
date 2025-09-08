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
 * Show an add block modal instead of doing it on a separate page.
 *
 * @module     core/addblockmodal
 * @copyright  2016 Damyon Wiese <damyon@moodle.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

import $ from 'local_edwiserpagebuilder/jquery';
import ModalFactory from 'core/modal_factory';
import ModalEvents from 'core/modal_events';
import Templates from 'core/templates';
import { get_string as getString } from 'core/str';
import Ajax from 'core/ajax';
import blockmanager from 'local_edwiserpagebuilder/blockmanager';

const SELECTORS = {
    ADD_BLOCK: '[data-key="addblock"]',
    MODAL_SUB_HEADER: '.modal-subheader',
    MODAL_HEADER_TITLE: '.modal-header .modal-title'
};

// Ensure we only add our listeners once.
let listenerEventsRegistered = false;

/**
 * Register related event listeners.
 *
 * @method registerListenerEvents
 * @param {String} pageType The type of the page
 * @param {String} pageLayout The layout of the page
 * @param {String|null} addBlockUrl The add block URL
 * @param {String} subPage The subpage identifier
  * @param {String|null} issiteadmin check user is a site admin
 * @param {String} edwepbf check edwpbf plugin available or not
 * @param {Boolean} pbfnotenable check setting is enable or not
 */
const registerListenerEvents = async (pageType, pageLayout, addBlockUrl, subPage, issiteadmin, edwepbf, pbfnotenable) => {
    document.addEventListener('click', e => {

        const addBlock = e.target.closest(SELECTORS.ADD_BLOCK);
        if (addBlock) {
            e.preventDefault();

            let addBlockModal = null;
            let addBlockModalUrl = addBlockUrl ?? addBlock.dataset.url;

            buildAddBlockModal()
                .then(modal => {
                    modal.getRoot().addClass("epb_custom_modal");
                    modal.getRoot().on(ModalEvents.cancel, function (e) {
                        e.preventDefault();
                        modal.destroy();
                    });
                    addBlockModal = modal;
                    const modalBody = renderBlocks(
                        addBlockModalUrl, pageType, pageLayout, subPage, issiteadmin, edwepbf, pbfnotenable
                    );
                    modal.setBody(modalBody);
                    modal.show();
                    // setTimeout(moveSubheaderToMain, 800);
                    // setTimeout(hideunactivetabdata, 800);
                    blockmanager.load(addBlockModalUrl, pageType);
                    return modalBody;
                })
                .catch(() => {
                    addBlockModal.destroy();
                });
        }
    });
};

const moveSubheaderToMain = () => {
    // Remove Sub Header and append in main header.
    $(".modal-header " + SELECTORS.MODAL_SUB_HEADER).remove();
    $($(SELECTORS.MODAL_SUB_HEADER)).insertAfter(SELECTORS.MODAL_HEADER_TITLE);
    $(".modal-body " + SELECTORS.MODAL_SUB_HEADER).remove();
    $(SELECTORS.MODAL_SUB_HEADER).removeClass("d-none");
};

const hideunactivetabdata = () =>{
    $('.moodleblock').addClass('d-none');
    $('.advanceblockblocks').removeClass('d-none');
};
/**
 * Method that creates the 'add block' modal.
 *
 * @method buildAddBlockModal
 * @returns {Promise} The modal promise (modal's body will be rendered later).
 */
const buildAddBlockModal = () => {
    return ModalFactory.create({
        type: ModalFactory.types.CANCEL,
        title: getString('addblock')
    });
};

/**
 * Method that renders the list of available blocks.
 *
 * @method renderBlocks
 * @param {String} addBlockUrl The add block URL
 * @param {String} pageType The type of the page
 * @param {String} pageLayout The layout of the page
 * @param {String} subPage The subpage identifier
* @param {Boolean} issiteadmin The layout of the page
 * @param {Boolean} edwepbf check the edwpbf plugin exist
 * @param {Boolean} pbfnotenable check setting is enable or not
 * @return {Promise}
 */
const renderBlocks = async (addBlockUrl, pageType, pageLayout, subPage, issiteadmin, edwepbf, pbfnotenable) => {

    // Fetch all addable blocks in the given page.
    let blockscontext = await getAddableBlocks(pageType, pageLayout, subPage);
    blockscontext = JSON.parse(blockscontext);


    var filterplugindata = false;

    var showfilterreleaseinfo = false;

    if (edwepbf && !pbfnotenable) {

        var filterplugindata = await getfilterpluginstatus();

        filterplugindata = JSON.parse(filterplugindata);

        if (filterplugindata.release <= '4.2.2' ) {
            pbfnotenable = false;
            showfilterreleaseinfo = true;
        }
    }
    var showmodalsecondnav = false;
    // The variable edwremuitheninfo is comming from theme using data for js
    if ( typeof edwremuithemeinfo !== 'undefined' && edwremuithemeinfo == 'available') {
        showmodalsecondnav = true;
    }
    var match = addBlockUrl.match(/[?&]bui_blockregion=([^&]+)/);
    var region = match ? match[1] : "";
    return Templates.render('local_edwiserpagebuilder/add_block_body', {
        blockscontext: blockscontext?.blockscontext,
        htmlblock: blockscontext?.htmlblock,
        importblock: blockscontext?.importblock,
        categories: blockscontext?.categories,
        moodleblock: blockscontext.moodleblock,
        url: addBlockUrl,
        isadmin: issiteadmin,
        pbfpluginexist: edwepbf,
        edwpbfnotenable: pbfnotenable,
        blockpagetype: pageType,
        blockregion: region,
        showsecondmenu: showmodalsecondnav,
        showfilterreleasenotice:showfilterreleaseinfo
    });
};

/**
 * Method that fetches all addable blocks in a given page.
 *
 * @method getAddableBlocks
 * @param {String} pageType The type of the page
 * @param {String} pageLayout The layout of the page
 * @param {String} subPage The subpage identifier
 * @return {Promise}
 */
const getAddableBlocks = async (pageType, pageLayout, subPage) => {
    const request = {
        methodname: 'local_edwiserpagebuilder_fetch_addable_blocks',
        args: {
            pagecontextid: M.cfg.contextid,
            pagetype: pageType,
            pagelayout: pageLayout,
            subpage: subPage,
        },
    };

    return Ajax.call([request])[0];
};

/**
 * This method checks the version of filter plugin is more the 4.2.2 or not .
 *
 * @method getAddableBlocks
 * @param {String} pageType The type of the page
 * @param {String} pageLayout The layout of the page
 * @param {String} subPage The subpage identifier
 * @return {Promise}
 */
const getfilterpluginstatus = async (pageType, pageLayout, subPage) => {
    const request = {
        methodname: 'local_edwiserpagebuilder_get_filter_plugin_status',
        args: {
            config: ""
        }
    };

    return Ajax.call([request])[0];
};

/**
 * Set up the actions.
 *
 * @method init
 * @param {String} pageType The type of the page
 * @param {String} pageLayout The layout of the page
 * @param {String|null} addBlockUrl The add block URL
 * @param {String} subPage The subpage identifier
 * @param {String|null} issiteadmin issiteadmin
 * @param {Boolean} edwepbf plugin avaialable
 *@param {Boolean} pbfnotenable plugin avaialable
 */
export const init = (
    pageType, pageLayout, addBlockUrl = null, subPage = '', issiteadmin = false, edwepbf = false, pbfnotenable = false) => {
    edwepbf = edwepbf == 0 ? false : true;
    issiteadmin = issiteadmin == 0 ? false : true;
    pbfnotenable = pbfnotenable == 0 ? false : true;
    if (!listenerEventsRegistered) {
        registerListenerEvents(pageType, pageLayout, addBlockUrl, subPage, issiteadmin, edwepbf, pbfnotenable);
        listenerEventsRegistered = true;
    }
};
