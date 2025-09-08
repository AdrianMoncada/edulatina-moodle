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
    DYNAMICBLOCKSWRAPPER: 'dynamic-blocks-wrapper',
    STATICBLOCKSWRAPPER: 'static-blocks-wrapper',
    BLOCKLAYOUTWRAPPER: 'block-layout-wrapper',
    DYNAMICBLOCKSFILTERS: 'dynamic-blocks-filters',
    STATICBLOCKSFILTERS: 'static-blocks-filters',
    BLOCKLAYOUTFILTERS: 'block-layout-filters',
    LEFTSIDEBARMIDREGIN:'left-sidebar-mid-region',
    COMMONBLOCKWRAPPER:'common-block-wrapper',

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
    let scrollInterval;

    function scrollBlockCategoryListDesktop(ele) {
        ele.animate({
            scrollTop: 0
        }, {
            duration: 'smooth',
            complete: function() {
                // This function will be called when the animation is complete
                $(this).stop(true, true); // Stop the animation immediately
            }
        });
    };

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
            $('.edw-tabs-navigation.edwiser-custom-blocks-nav').removeClass('d-none');
            // The variable edwremuitheninfo is comming from theme using data for js
            if ( typeof edwremuithemeinfo !== 'undefined' && edwremuithemeinfo == 'available') {
                $('.modal-subheader').addClass('p-mb-2').removeClass('p-mb-6');
            }
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
            $('.modal-subheader').addClass('p-mb-6').removeClass('p-mb-2');
            $('.edw-tabs-navigation.edwiser-custom-blocks-nav').addClass('d-none');
        }
    });

    document.addEventListener('click', e => {
        const selecteditem = e.target.closest('#static-blocks-btn');
        if (selecteditem) {
            $(SELECTORS.DEFAULTBLOCKWRAPPER).removeClass(`${SELECTORS.DYNAMICBLOCKSWRAPPER} ${SELECTORS.BLOCKLAYOUTWRAPPER}`).addClass(SELECTORS.STATICBLOCKSWRAPPER);
            $(`.${SELECTORS.LEFTSIDEBARMIDREGIN}`).removeClass().addClass(`${SELECTORS.LEFTSIDEBARMIDREGIN} ${SELECTORS.STATICBLOCKSFILTERS}`);
            var filtercategory = $(selecteditem).data('filter');
            var filteritem = $(`.${SELECTORS.LEFTSIDEBARMIDREGIN} .${filtercategory}.active`);
            applySelectedCategory(filteritem);
            applyFilterOnBlocks($(filteritem));
        }
    });

    document.addEventListener('click', e => {
        const selecteditem = e.target.closest('#dynamic-blocks-btn');
        if (selecteditem) {
            $(SELECTORS.DEFAULTBLOCKWRAPPER).removeClass(`${SELECTORS.STATICBLOCKSWRAPPER} ${SELECTORS.BLOCKLAYOUTWRAPPER}`).addClass(SELECTORS.DYNAMICBLOCKSWRAPPER);
            $(`.${SELECTORS.LEFTSIDEBARMIDREGIN}`).removeClass().addClass(`${SELECTORS.LEFTSIDEBARMIDREGIN} ${SELECTORS.DYNAMICBLOCKSFILTERS}`);
            var filtercategory = $(selecteditem).data('filter');
            var filteritem = $(`.${SELECTORS.LEFTSIDEBARMIDREGIN} .${filtercategory}.active`);
            applySelectedCategory(filteritem);
            applyFilterOnBlocks($(filteritem));
        }
    });

    document.addEventListener('click', e => {
        const selecteditem = e.target.closest('#layout-blocks-btn');
        if (selecteditem) {
            $(SELECTORS.DEFAULTBLOCKWRAPPER).removeClass(`${SELECTORS.DYNAMICBLOCKSWRAPPER} ${SELECTORS.STATICBLOCKSWRAPPER}`).addClass(SELECTORS.BLOCKLAYOUTWRAPPER);
            $(`.${SELECTORS.LEFTSIDEBARMIDREGIN}`).removeClass().addClass(`${SELECTORS.LEFTSIDEBARMIDREGIN} ${SELECTORS.BLOCKLAYOUTFILTERS}`);
            var filtercategory = $(selecteditem).data('filter');
            var filteritem = $(`.${SELECTORS.LEFTSIDEBARMIDREGIN} .${filtercategory}.active`);
            applySelectedCategory(filteritem);
            applyFilterOnBlocks($(filteritem));

        }
    });

    // On mouse enter of block layout image
    $(document).on('mouseenter', ".addblock-modal-body .block-page-layout", function () {

        // Get card height
        const cardHeight = $(this).find(".card").height();

        // Get card image
        const img = $(this).find(".card img");

        // Get image height
        const imgHeight = img.height();

        // Calculate scroll height by subtracting card height from image height (adding 40px for ensuriing smooth scroll)
        let scrollHeight = imgHeight - cardHeight + 40;

        // Remove animation
        img.css("animation", "unset");

        // If scroll height is greater than 0
        if (scrollHeight > 0) {

            // Calculate scroll time
            let scrolltime = scrollHeight / 100;
            if (scrolltime < 1) {
                scrolltime = 1;
            }

            // Set transition
            img.css("transition", `top ${scrolltime}s ease-in-out`);

            // Set initial top position
            img.css("top", `${-scrollHeight}px`);

            // On transition end, set top to 0
            img.one('transitionend', function() {
                img.css("top", `0px`);
            });

            // Set interval to repeat scroll animation
            scrollInterval = setInterval(function() {

                img.css("top", `${-scrollHeight}px`);

                img.one('transitionend', function() {
                    img.css("top", `0px`);
                });

            }, scrolltime * 2000);
        }
    });

    $(document).on('mouseleave', ".addblock-modal-body .block-page-layout", function() {
        const img = $(this).find(".card img");
        img.css("transition", "unset");
        img.css("top", `0px`);

        clearInterval(scrollInterval);
    });

    $(document).on('click', ".advancedblocktab .left-sidebar .category-list-item .edw-icon", function(e) {
        e.stopPropagation();
        e.preventDefault();
        var $activeClass = "active";
        var categorylistitem = $(this).closest(".category-list-item");
        var categoryFilter = categorylistitem.data('filter');
        var selectedElement = $(`.${SELECTORS.LEFTSIDEBARMIDREGIN} .category-list-item[data-filter="${categoryFilter}"][data-target="all"]`);
        selectedElement.addClass($activeClass).siblings('[data-filter="' + categoryFilter + '"]').removeClass($activeClass);
        // selectedElements.addClass('active');
        applyFilterOnBlocks(selectedElement);
        scrollBlockCategoryListDesktop($('.block-category-list-desktop'));
    });

    $(document).on('click', ".advancedblocktab .left-sidebar .category-selector", function() {
        applySelectedCategory(this);
        applyFilterOnBlocks($(this));
    });
    $(document).off('click', '.block_exporter_btn').on('click', '.block_exporter_btn', async function (e) {
        e.stopPropagation();
        e.preventDefault();
        try {
            const blockid = $(this).data('blockid'); // Get the block ID from the button

            // Prepare request payload
            const request = {
                methodname: 'local_edwiserpagebuilder_do_import_export_action',
                args: {
                    action: "export_blocks_data",
                    config: JSON.stringify({ blockid })
                }
            };

            // Send the AJAX request
            let response = await Ajax.call([request])[0];

            response = JSON.parse(response);

            // Check for errors in the response
            if (response.error) {
                alert("Error: " + response.message);
                return;
            }

            // Create a Blob from the JSON response
            const blob = new Blob([JSON.stringify(response, null, 2)], { type: 'application/json' });
            const filename = `block_${blockid}.json`;

            // Create a link element to download the file
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = filename;

            // Trigger the download
            document.body.appendChild(link);
            link.click();

            // Clean up
            document.body.removeChild(link);
            URL.revokeObjectURL(link.href);

            console.log("Export successful");
        } catch (error) {
            console.error("Export failed:", error);
        }
    });

    $(document).off('submit', '.block_json_upload_form').on('submit', '.block_json_upload_form', function (e) {

        e.preventDefault(); // Prevent the default form submission
        const form = $(this); // Capture the form element context
        const submitButton = form.find('button[type="submit"]'); // Get the submit button
        submitButton.prop('disabled', true); // Disable the submit button

        const fileInput = form.find('.jsonfileholder')[0]; // Get the file input element by class
        const file = fileInput.files[0]; // Get the selected file

        const blockid = form.closest("section.block_edwiseradvancedblock").attr('data-instance-id'); // Get the block ID

        if (file) {
            const reader = new FileReader();

            reader.onload = async function (event) {
                let fileContent = event.target.result;

                try {
                    fileContent = JSON.parse(fileContent); // Parse the file content
                } catch (err) {
                    console.error("Invalid JSON file content");
                    alert("The selected file contains invalid JSON.");
                    submitButton.prop('disabled', false);
                    return;
                }

                // Prepare request payload
                const request = {
                    methodname: 'local_edwiserpagebuilder_do_import_export_action',
                    args: {
                        action: "import_blocks_data",
                        config: JSON.stringify({
                            'blockid': blockid,
                            'blockdata': fileContent,
                        })
                    }
                };

                try {
                    // Send the AJAX request
                    let response = await Ajax.call([request])[0];

                    response = JSON.parse(response);

                    if (response.status == 'success') {
                        window.location.reload();
                    } else {
                        // Remove existing error message elements
                        form.find('.block_import_exporterrormsg').remove();

                        // Create a new error message paragraph element with red text
                        const errorMessage = `<p class="block_import_exporterrormsg " style="margin-top: 16px;margin-bottom: 0px;color: #B60011;font-size: 12px;font-style: normal;font-weight: 400">${response.message}</p>`;

                        // Insert the new error message above the submit button
                        submitButton.before(errorMessage);

                    }
                } catch (err) {
                    console.error("Error with AJAX request:", err);
                } finally {
                    // Re-enable the submit button
                    submitButton.prop('disabled', false);
                }
            };

            reader.onerror = function () {
                console.error('Error reading the file');
                submitButton.prop('disabled', false);
            };

            reader.readAsText(file); // Read the file as text
        } else {
            submitButton.prop('disabled', false);
        }
    });

    $(document).ready(function () {
        // Iterate through all sections that have block bodies containing 'data-edwiser-dynamic'
        $('section.block_edwiseradvancedblock').each(function () {
            // Check if the block body contains the attribute 'data-edwiser-dynamic'
            if ($(this).find('[data-edwiser-dynamic]').length > 0) {
                // Hide the button with class 'block_exporter_btn' in the header of this block
                $(this).find('.block_exporter_btn').hide();
            }
        });
    });

    // $(window).on('resize', blockViewHandler);
}

/**
 * Applies the selected category filter to the block category list.
 *
 * @param {HTMLElement} category - The category element that was selected.
 */
function applySelectedCategory(category) {

    // for desktop filter
    var $activeClass = "active";
    var categoryFilter = $(category).data('filter');
    var categorytarget = $(category).data('target');
    var categoryListItem = $('.block-category-list-desktop .category-list-item[data-target="' + categorytarget + '"][data-filter="' + categoryFilter + '"]');
    var categoryDropdownItem = $('.block-category-select-mob .dropdown-item[data-target="' + categorytarget + '"][data-filter="' + categoryFilter + '"]');

    $(categoryListItem).addClass($activeClass).siblings('[data-filter="' + categoryFilter + '"]').removeClass($activeClass);

    //for mobilefilter
    if (categoryDropdownItem.length > 1) {
        // Remove all items except the first one
        categoryDropdownItem.slice(1).remove();

        // Keep the first item as a selector
        categoryDropdownItem = categoryDropdownItem.first();

    }
    var text = $(categoryDropdownItem).text();
    $('.block-category-select-mob .dropdown-toggle').text(text);
    $(categoryDropdownItem).addClass($activeClass).siblings('[data-filter="' + categoryFilter + '"]').removeClass($activeClass);
};

/**
 * Applies a filter to the blocks based on the provided selector.
 *
 * @param {jQuery} selector - The jQuery selector object that contains the target information.
 * @returns {void}
 */
function applyFilterOnBlocks(selector) {
    var target = selector.data('target');
    var categoryselector = target + '-blocks';
    if (target == 'all') {
        $(`.${SELECTORS.COMMONBLOCKWRAPPER}`).addClass('show').removeClass('hide');
        $(".addblock-modal-body .tab-content").scrollTop('0px');
    } else {
        $(`.${categoryselector}`).addClass('show').removeClass('hide').siblings().addClass('hide').removeClass('show');
        $(".addblock-modal-body .tab-content").scrollTop('0px');
    }
}

export {
    init
};
