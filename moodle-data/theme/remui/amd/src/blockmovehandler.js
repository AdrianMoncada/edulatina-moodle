/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable jsdoc/require-jsdoc*/
/* eslint-disable jsdoc/require-jsdoc*/
/* eslint-disable jsdoc/require-jsdoc*/
/* eslint-disable no-restricted-globals */
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
 * @module     theme_remui/blockhandler
 * @copyright (c) 2020 WisdmLabs (https://wisdmlabs.com/)
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

define(['jquery', 'core/ajax', 'core/str'], function ($, Ajax, Str) {
    /**
 * Selectors
 */
    var SELECTOR = {
        BLOCKCONTROLS: '.block-controls',
        MOVETOP: '.block-controls .move-top',
        MOVEBOTTOM: '.block-controls .move-bottom',
        BLOCK: 'section.block'
    };

    // Blockregions is comming from data_for _js from php

    var blockregionarr = {};

    var blockregionidarr = [];

    var currentelement = '';
    var nextelement = '';
    var prevelement = '';
    var currentelementid = '';
    var movingelementid = '';
    var curentregion = '';
    var previousregion = '';
    var nextregion = '';
    var regionlastblock = '';
    var regionfirstblock = '';
    const noblockregion = 'noblockregion';
    const swapdirectonup = 'up';
    const swapdirectondown = 'down';
    const notfound = 'na';
    const firstblock = 'firstblock';
    const lastblock = 'lastblock';
    const sidepreregion = '#block-region-side-pre';

    const getCurrentBlockRegion = (clickedElement) => {
        for (var i = 0; i < blockregionidarr.length; i++) {
            if (clickedElement.closest(blockregionidarr[i]).length) {
                return blockregionidarr[i];
                break;
            }
        }
        return noblockregion;
    };

    const getBlockInRegion = (blockregion, blockorder) => {
        var regionBlock = 'blocknotfound';
        if (blockorder == lastblock) {
            if ($(blockregion).children('.block').length > 0) {
                regionBlock = $(blockregion).children(".block:last");
            }
        }
        if (blockorder == firstblock) {
            if ($(blockregion).children('.block').length > 0) {
                regionBlock = $(blockregion).children(".block:first");
            }
        }
        return regionBlock;
    };

    const getRegion = (element, regiondirecton) => {
        var region = 'noregion';
        var index = blockregionidarr.indexOf(element);
        if (regiondirecton == 'up') {
            if (index > 0) {
                var previousElement = blockregionidarr[index - 1];
                region = previousElement;
            }
        }
        if (regiondirecton == 'down') {
            if (index > -1 && index < blockregionidarr.length - 1) {
                var nextElement = blockregionidarr[index + 1];
                region = nextElement;
            }
        }
        return region;
    };
    const checkidtype = (id) => {
        if (typeof (id) === "undefined") {
            return false;
        }
        return true;
    };

    const swapBlocks = ($block1, $block2) => {
        var block1clone = $block1.clone();
        var block2clone = $block2.clone();
        $block1.replaceWith(block2clone);
        $block2.replaceWith(block1clone);
    };

    const transparentheaderhanlder = () => {
        var transparentheader = false;
        if ($('.navbar').hasClass('trasnparent-home-nav')) {
            transparentheader = true;
        }
        $("body.pagelayout-frontpage").removeClass("transparent-header");
        if (transparentheader) {
            var windowtop = $(window).scrollTop();
            if (windowtop < 45) {
                var hasedwcarouselclass = $('#block-region-full-width-top').children().first().find('div').hasClass('edw-carousel');
                var hascarouselclass = $('#block-region-full-width-top').children().first().find('div').hasClass('carousel');
                var hastestimonial = false;
                var hashomepagetestimonial = $('#block-region-full-width-top').children().first().find('section').hasClass('section-testimonial');
                if (hasedwcarouselclass) {
                    var firstChild = $('#block-region-full-width-top').children().first();
                    var divWithCarouselClass = firstChild.find('div.edw-carousel');
                    var idAttribute = divWithCarouselClass.attr('id');
                    if (idAttribute && idAttribute.indexOf('testimonial') !== -1) {
                        hastestimonial = true;
                    }

                }
                if (((hascarouselclass || hasedwcarouselclass) && !hashomepagetestimonial && !hastestimonial) && $(".old-frontpage").length === 0 ) {
                    $("body.pagelayout-frontpage").addClass("transparent-header");
                }
                if ($('.old-frontpage .frontpage-sections #edwiser-slider').children().first().hasClass('carousel')) {
                    $("body.pagelayout-frontpage").addClass("transparent-header");
                }
                return;
            }
            $("body.pagelayout-frontpage").removeClass("transparent-header");
        }
    };

    const registerCommonEvents = () => {
        $(document).on('click', SELECTOR.MOVETOP, function () {
            currentelement = $(this).closest(SELECTOR.BLOCK);
            prevelement = currentelement.prevAll('.block:first');
            currentelementid = checkidtype(currentelement.attr('data-instance-id')) ? currentelement.attr('data-instance-id') : 'na';
            movingelementid = checkidtype(prevelement.attr('data-instance-id')) ? prevelement.attr('data-instance-id') : 'na';
            curentregion = getCurrentBlockRegion(currentelement);
            if (movingelementid == notfound && curentregion != sidepreregion) {
                if (curentregion != noblockregion) {
                    previousregion = getRegion(curentregion, swapdirectonup);
                    regionlastblock = getBlockInRegion(previousregion, lastblock);
                    if (previousregion != 'noregion') {
                        if (regionlastblock != 'blocknotfound') {
                            movingelementid = checkidtype(regionlastblock.attr('data-instance-id')) ? regionlastblock.attr('data-instance-id') : 'na';
                            blockmover(currentelementid, movingelementid, 'move', blockregionarr[previousregion], true, 'moveblockup');
                        } else {
                            blockmover(currentelementid, movingelementid, 'move', blockregionarr[previousregion], false, 'moveblockup');
                        }
                    }
                }
            } else {
                blockmover(currentelementid, movingelementid, swapdirectonup, blockregionarr[curentregion]);
            }
        });

        $(document).on('click', SELECTOR.MOVEBOTTOM, function () {
            currentelement = $(this).closest(SELECTOR.BLOCK);
            nextelement = currentelement.nextAll('.block:first');
            currentelementid = checkidtype(currentelement.attr('data-instance-id')) ? currentelement.attr('data-instance-id') : 'na';
            movingelementid = checkidtype(nextelement.attr('data-instance-id')) ? nextelement.attr('data-instance-id') : 'na';
            curentregion = getCurrentBlockRegion(currentelement);
            if (movingelementid == notfound && curentregion != sidepreregion) {
                if (curentregion != noblockregion ) {
                    nextregion = getRegion(curentregion, swapdirectondown);
                    regionfirstblock = getBlockInRegion(nextregion, firstblock);
                    if (nextregion != 'noregion') {
                        if (regionfirstblock != 'blocknotfound') {
                            movingelementid = checkidtype(regionfirstblock.attr('data-instance-id')) ? regionfirstblock.attr('data-instance-id') : 'na';
                            blockmover(currentelementid, movingelementid, 'move', blockregionarr[nextregion], true, 'moveblockdown');
                        } else {
                            blockmover(currentelementid, movingelementid, 'move', blockregionarr[nextregion], false, 'moveblockdown');
                        }
                    }
                }
            } else {
                blockmover(currentelementid, movingelementid, swapdirectondown, blockregionarr[curentregion]);
            }
        });
    };

    const blockmover = (currentelementid, moveelementid, type, blockregion = 'noregion', blockfoundflag = false, blockmovedirection = false) => {
        Ajax.call([{
            methodname: 'theme_remui_set_block_pos',
            args: {
                currentblockid: currentelementid,
                movingblockid: moveelementid,
                region: blockregion,
                blockfoundstatus: blockfoundflag,
                operationtype: type,
                movedirection: blockmovedirection,
                contextid: M.cfg.contextid
            },
            done: function (data) {
                if (data) {
                    if (type == swapdirectonup) {
                        swapBlocks(currentelement, prevelement);
                        console.log("swapping done sucessfully");
                    }
                    if (type == swapdirectondown) {
                        swapBlocks(currentelement, nextelement);
                        console.log("swapping done sucessfully");
                    }
                    if (type == 'move') {
                        if (blockmovedirection == 'moveblockup') {
                            currentelement.detach().appendTo(`[data-blockregion="${blockregion}"]`);
                            console.log("moveblockup");
                        }
                        if (blockmovedirection == 'moveblockdown') {
                            currentelement.detach().prependTo(`[data-blockregion="${blockregion}"]`);
                            console.log("moveblockdown");
                        }
                    }
                    transparentheaderhanlder();
                } else {
                    console.log("not allowed");
                }
            },
            fail: function () {
                console.log(Notification.exception);
            }
        }]);
    };
    return {
        init: function () {
            availableblockregions.forEach(function (element, index) {
                blockregionarr[`#block-region-${element}`] = element;
                blockregionidarr[index] = `#block-region-${element}`;
            });
            var secondArrayFixedOrder = [
                "#block-region-full-width-top",
                "#block-region-side-top",
                "#block-region-content",
                "#block-region-side-bottom",
                "#block-region-full-bottom"
              ];
              blockregionidarr.sort(function(a, b) {
                var aIndex = secondArrayFixedOrder.indexOf(a);
                var bIndex = secondArrayFixedOrder.indexOf(b);
                return aIndex - bIndex;
              });
            registerCommonEvents();
        },
    };
});
