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
 * @module     theme_remui/addblockaddedlistners
 * @copyright  2016 Damyon Wiese <damyon@moodle.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import { get_string as getString } from 'core/str';
import Ajax from 'core/ajax';
import $ from 'jquery';
import { exception as displayException } from 'core/notification';

const SELECTORS = {
    ADD_BLOCK: '[data-key="addblock"]',
    DEFAULTBLOCKWRAPPER: '.modal-body  .default-blocks-wrapper',
    ADDBLOCKGRIDVIEW: '.add-block-grid-view',
    ADDBLOCKLISTVIEW: '.add-block-list-view',
};

let activeclassview = 'grid-view';
let notactiveclassview = 'list-view';
let userprefclass = SELECTORS.ADDBLOCKGRIDVIEW;
let usernotprefclass = SELECTORS.ADDBLOCKLISTVIEW;
let templatefile = 'theme_remui/add_block_body_cards';
let csscontent = '';
let prefview = 'card';
let tabpref = 'edwadvancedblocks';
let edwiseradvancedblocktab = '.edwiseradvancedblocktab';
let moodleblockstab = '.moodleblockstab';
let activeadvancedtab = true;
/**
 * Initialize events
 */
function init() {
    document.addEventListener('click', e => {
        const selecteditem = e.target.closest('.add-block-grid-view');
        templatefile = 'theme_remui/add_block_body_cards';
        if (selecteditem) {
            activeclassview = 'grid-view';
            notactiveclassview = 'list-view';
            userprefclass = SELECTORS.ADDBLOCKGRIDVIEW;
            usernotprefclass = SELECTORS.ADDBLOCKLISTVIEW;
            $(userprefclass).addClass('active');
            $(usernotprefclass).removeClass('active');
            $(SELECTORS.DEFAULTBLOCKWRAPPER).removeClass(notactiveclassview).addClass(activeclassview);
        }
    });

    document.addEventListener('click', e => {
        const selecteditem = e.target.closest('.add-block-list-view');
        if (selecteditem) {
            activeclassview = 'list-view';
            notactiveclassview = 'grid-view';
            userprefclass = SELECTORS.ADDBLOCKLISTVIEW;
            usernotprefclass = SELECTORS.ADDBLOCKGRIDVIEW;
            $(userprefclass).addClass('active');
            $(usernotprefclass).removeClass('active');
            $(SELECTORS.DEFAULTBLOCKWRAPPER).removeClass(notactiveclassview).addClass(activeclassview);
        }
    });

    document.addEventListener('click', e => {
        const selecteditem = e.target.closest('.edwiseradvancedblocktab');
        if (selecteditem) {
            activeadvancedtab = true;
            $('.moodleblock').addClass('d-none');
            $('.advanceblockblocks').removeClass('d-none');
            $('.advancedblocktab').addClass('active show');
            $('.moodleblocktab').removeClass('active show');
            $('.action-buttons-modal').removeClass('d-none');
        }
    });

    document.addEventListener('click', e => {
        const selecteditem = e.target.closest('.edwmoodleblockstab');
        if (selecteditem) {
            activeadvancedtab = false;
            $('.moodleblock').removeClass('d-none');
            $('.advanceblockblocks').addClass('d-none');
            $('.moodleblocktab').addClass('active show');
            $('.advancedblocktab').removeClass('active show');
            $('.action-buttons-modal').addClass('d-none');
        }
    });
}

export {
    init
};
