/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable jsdoc/require-jsdoc*/
/* eslint-disable jsdoc/require-jsdoc*/
/* eslint-disable jsdoc/require-jsdoc*/
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
 * @module     theme_remui/floating_add_block_handler
 * @copyright (c) 2020 WisdmLabs (https://wisdmlabs.com/)
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

define(['jquery', 'core/ajax', 'core/toast'], function($, Ajax, Toast) {
    /**
     * Selectors
     */
    var SELECTOR = {
        ADDBLOCKFLOATMENU: '#add-block-float-menu ',
        ADDBLOCKSPLITICONBTN: '#add-block-float-menu .add-block-split-icon-btn',
        FLOATADDBLOCKBUTTON: '#add-block-float-menu .floating-add-block-button',
        DNONE: 'd-none'
    };
    var elements = ['.side-pre-link', '.side-bottom-link', '.side-top-link', '.content-link', '.full-width-top-link', '.full-bottom-link'];
    var activeregionlink = '.full-width-top-link';
    var blockregions = [];
    var blockinviewport = [];
    var getSelectedregion = (blocksectiondata, currentitem) => {
        var data = '';
        blocksectiondata.forEach(element => {
            if ($(currentitem).attr('data-region') == element.regionid) {
                data = element;
                return false;
            }
        });
        return data;
    };
    var callAllFunctions = (blocksectiondata, currentclickedelement, scroll = false) => {
        var currentsectionlink = getSelectedregion(blocksectiondata, currentclickedelement);
        if (scroll) {
            scrolltoelement(currentsectionlink);
        }
        activeregionclassaddition(currentclickedelement);
        getAaddblockData(currentsectionlink.regionaddblockbutton);
    };

    var getAaddblockData = (currentactiveregoninfo) => {
        var html = $(currentactiveregoninfo).html();
        $(SELECTOR.FLOATADDBLOCKBUTTON).attr({
            'href': $(html).attr('href'),
            'data-key': $(html).attr('data-key'),
            'data-url': $(html).attr('data-url'),
            'id': $(html).attr('id'),
        });
    };

    var activeregionclassaddition = (currentactiveregionlink) => {
        $(SELECTOR.ADDBLOCKFLOATMENU).find('.dropdown-item').removeClass('activeregion');
        $(currentactiveregionlink).addClass('activeregion');
    };
    var scrolltoelement = (element) => {
        var targetOffset = '';
        if (element.regionid == '#block-region-side-pre') {
            if (!$('.drawer-right').hasClass('show')) {
                $('.drawer-toggler.drawer-right-toggle [data-action="toggle"]').click();
            }
        } else {
            targetOffset = $(`${element.regionid}-indicator`).offset().top;
            var scrollPosition = targetOffset - ($(window).height() / 2) + ($((`${element.regionid}-indicator`)).height() / 2);
            $("html, body").animate({ scrollTop: scrollPosition }, 1000);
        }
        var msg = M.util.get_string('floataddblockbtnregionselectionmsg', 'theme_remui', element.regionname);
        Toast.add(msg, {
            delay: 3000,
            closeButton: true,
            type: 'warning edw_toast'
        });
        // $(SELECTOR.FLOATADDBLOCKBUTTON).tooltip('hide').attr('data-original-title', 'block will be added in' + ' ' + element.regionname + ' ' + 'region').tooltip('show');
    };
// Function to check if the element is in the viewport
function isElementInViewport(elem) {
    var $elem = $(elem);
    var $window = $(window);

    var docViewTop = $window.scrollTop();
    var docViewBottom = docViewTop + $window.height();

    var elemTop = $elem.offset().top;
    var elemBottom = elemTop + $elem.height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

// Function to calculate the distance between two points
function getDistance(x1, y1, x2, y2) {
    var dx = x1 - x2;
    var dy = y1 - y2;
    return Math.sqrt(dx * dx + dy * dy);
}

function isViewportAtTop() {
    var scrollPosition = $(window).scrollTop();
    var threshold = 10; // Adjust this threshold as needed

    return scrollPosition <= threshold;
}

// Function to find the ID closest to the viewport for a given selector
function findClosestID(ids) {
    var viewportCenterX = $(window).scrollLeft() + $(window).width() / 2;
    var viewportCenterY = $(window).scrollTop() + $(window).height() / 2;

    var closestID = null;
    var closestDistance = Infinity;

    // Loop through each ID in the array
    $.each(ids, function (index, id) {
        var $element = $(id);

        // Check if the element exists
        if ($element.length > 0) {
            var elementOffset = $element.offset();
            var elementCenterX = elementOffset.left + $element.width() / 2;
            var elementCenterY = elementOffset.top + $element.height() / 2;

            var distance = getDistance(
                viewportCenterX,
                viewportCenterY,
                elementCenterX,
                elementCenterY
            );

            if (distance < closestDistance) {
                closestDistance = distance;
                closestID = id;
            }
        }
    });

    return closestID;
}
const registerCommonEvents = () => {
    $(SELECTOR.ADDBLOCKSPLITICONBTN).click(function () {
        $(`${SELECTOR.ADDBLOCKSPLITICONBTN} .edw-icon-Down-Arrow`).toggleClass(SELECTOR.DNONE);
        $(`${SELECTOR.ADDBLOCKSPLITICONBTN} .edw-icon-UpArrow`).toggleClass(SELECTOR.DNONE);
    });

    $(document).on("click", elements[0], function () {
        callAllFunctions(blocksectiondata, this, true);
    });
    $(document).on("click", elements[1], function () {
        callAllFunctions(blocksectiondata, this, true);
    });
    $(document).on("click", elements[2], function () {
        callAllFunctions(blocksectiondata, this, true);
    });
    $(document).on("click", elements[3], function () {
        callAllFunctions(blocksectiondata, this, true);
    });
    $(document).on("click", elements[4], function () {
        callAllFunctions(blocksectiondata, this, true);
    });
    $(document).on("click", elements[5], function () {
        callAllFunctions(blocksectiondata, this, true);
    });

    // $(window).on('resize scroll', function () {
    //     blockinviewport = [];
    //     var closestID = findClosestID(blockregions);
    //     blockinviewport.push(closestID);
    //     if (blockinviewport.length > 0) {
    //         callAllFunctions(blocksectiondata, `a[data-region="${blockinviewport[0]}"]`);
    //     }
    // });
};

return {
    init: function () {
        $(document).ready(function () {
            // Blocksectiondata is comming from data_for_js
            registerCommonEvents();
            // Check if each div is in the viewport
            blocksectiondata.forEach(function (divID) {
                var id = divID.regionid;
                blockregions.push(id);
            });
            var closestID = findClosestID(blockregions);
            blockinviewport.push(closestID);
            if (blockinviewport.length > 0) {
                callAllFunctions(blocksectiondata, `a[data-region="${blockinviewport[0]}"]`);
            } else {
                callAllFunctions(blocksectiondata, `a[data-region=#region-fullwidthtop-blocks`);
            }
        });
    },
};
});
