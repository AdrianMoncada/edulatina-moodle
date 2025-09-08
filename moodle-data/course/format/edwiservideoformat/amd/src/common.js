/* eslint-disable no-undef*/
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
 * Common functionality for Edwiser Video Format.
 *
 * @module     format_edwiservideoformat/common
 * @copyright  Edwiser
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

define(['jquery'], function($) {

    const SELECTORS = {
        COURSE_INDEX_ITEM: ".courseindex-item",
        COURSE_INDEX_ITEM_LINK: ".courseindex-item .courseindex-link[data-for='cm_name']",
        ACTIVITY_LINK: ".activity-item .activityname  .aalink",
    };

    /**
     * Extract activity type and ID from a URL
     * @param {string} url - The URL to parse
     * @returns {object|null} - Object with modtype and modid, or null if not found
     */
    const extractActivityInfo = (url) => {
        try {
            const urlObj = new URL(url);
            const pathParts = urlObj.pathname.split('/');

            // Look for pattern: /mod/{activitytype}/view.php
            const modIndex = pathParts.indexOf('mod');
            if (modIndex !== -1 && modIndex + 2 < pathParts.length) {
                const activityType = pathParts[modIndex + 1];
                const viewFile = pathParts[modIndex + 2];

                // Check if it's a view.php file
                if (viewFile === 'view.php') {
                    const modId = urlObj.searchParams.get('id');
                    if (modId) {
                        return {
                            modtype: activityType,
                            modid: modId
                        };
                    }
                }
            }
            return null;
        } catch (error) {
            // Error parsing URL, return null
            return null;
        }
    };

    /**
     * Create new redirect URL with modtype and modid parameters
     * @param {string} baseUrl - The base course URL
     * @param {string} modtype - The activity type
     * @param {string} modid - The activity ID
     * @returns {string} - The new redirect URL
     */
    const createRedirectUrl = (baseUrl, modtype, modid) => {
        try {
            const urlObj = new URL(baseUrl);
            urlObj.searchParams.set('modtype', modtype);
            urlObj.searchParams.set('modid', modid);
            return urlObj.toString();
        } catch (error) {
            // Error creating redirect URL, return base URL
            return baseUrl;
        }
    };

    /**
     * Register common event handlers
     */
    const registerCommonEvents = () => {
        // Handle both course index item links and activity item links
        $(document).on('click', `${SELECTORS.COURSE_INDEX_ITEM_LINK}, ${SELECTORS.ACTIVITY_LINK}`, function(event) {
            event.preventDefault();
            event.stopPropagation();

            const link = $(this);
            const href = link.attr('href');

            if (!href) {
                return;
            }

            // Extract activity info from the URL
            const activityInfo = extractActivityInfo(href);

            if (activityInfo) {
                // Get the current course URL and preserve the course ID
                // const currentUrl = window.location.href;
                // const urlObj = new URL(currentUrl);
                // const courseId = urlObj.searchParams.get('id');

                // Create base course URL with course ID
                const courseUrl = M.cfg.wwwroot + '/course/view.php?id=' + M.cfg.courseId;
                // const courseUrl = courseId ? `${urlObj.origin}${urlObj.pathname}?id=${courseId}` : currentUrl.split('?')[0];

                // Create new redirect URL
                const redirectUrl = createRedirectUrl(courseUrl, activityInfo.modtype, activityInfo.modid);

                // Redirect to the new URL
                window.location.href = redirectUrl;
            } else {
                // If no activity info found, follow the original link
                // window.location.href = href;
            }
        });
    };

    /**
     * Get the modid parameter from the URL if present.
     * @returns {number|null} The modid as an integer, or null if not present.
     */
    function getModIdFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        const modid = urlParams.get('modid');
        return modid ? parseInt(modid, 10) : null;
    }

    /**
     * Get the modtype parameter from the URL if present.
     * @returns {string|null} The modtype, or null if not present.
     */
    function getModTypeFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('modtype');
    }

        /**
     * Set the current page item in the course index drawer using a simple URL matching approach.
     * Handles both view and edit modes.
     */
    function setCurrentPageItem() {
        const modid = getModIdFromUrl();
        const modtype = getModTypeFromUrl();

        if (!modid || !modtype) {
            return;
        }

        // Create the target URL: sitename/mod/modtype/view.php?id=modid
        const targetUrl = M.cfg.wwwroot + '/mod/' + modtype + '/view.php?id=' + modid;

        // Try multiple selectors for different modes and structures
        let matchingLink = null;

        // Method 1: Try courseindex-link (view mode)
        matchingLink = $('.courseindex-link').filter(function() {
            return $(this).attr('href') === targetUrl;
        });

        // Method 2: Try activity links in edit mode
        if (matchingLink.length === 0) {
            matchingLink = $('.activity-item .activityname a, .activity-item .aalink').filter(function() {
                return $(this).attr('href') === targetUrl;
            });
        }

        // Method 3: Try any link with the target URL
        if (matchingLink.length === 0) {
            matchingLink = $('a[href="' + targetUrl + '"]');
        }

        // Method 4: Try finding by data attributes (if available)
        if (matchingLink.length === 0) {
            matchingLink = $('[data-cmid="' + modid + '"]');
        }

        if (matchingLink.length > 0) {
            // Remove any existing pageitem classes
            $('.courseindex-item, .activity-item').removeClass('pageitem');

            // Add pageitem class to the nearest courseindex-item or activity-item
            const courseIndexItem = matchingLink.closest('.courseindex-item, .activity-item');
            if (courseIndexItem.length > 0) {
                courseIndexItem.addClass('pageitem');

                // Optional: Scroll to the element
                // courseIndexItem[0].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }
    }

    /**
     * Initializes the show more/less summary toggle for long section summaries.
     */
    function initShowMoreSummary() {
        var summaryheight = $('.read-more-target').height();
        if (summaryheight > 300) {
            $('.generalsectioninfo').find('#readmorebtn').removeClass('d-none');
            $('.read-more-target').addClass('summary-collapsed').removeClass('summary-expanded');
        }
        $('#readmorebtn').on('click', function() {
            $('.read-more-target').addClass('summary-expanded').removeClass('summary-collapsed');
            $('.generalsectioninfo').find('#readmorebtn').addClass('d-none');
            $('.generalsectioninfo').find('#readlessbtn').removeClass('d-none');
        });
        $('#readlessbtn').on('click', function() {
            $('.read-more-target').addClass('summary-collapsed').removeClass('summary-expanded');
            $('.generalsectioninfo').find('#readmorebtn').removeClass('d-none');
            $('.generalsectioninfo').find('#readlessbtn').addClass('d-none');
        });
    }

    /**
     * Init method
     */
    function init() {
        $(document).ready(function() {
            registerCommonEvents();
            $('body').addClass('edwiservideoformat-' + M.cfg.theme + '-body');
            // Set current page item with a delay to ensure DOM is fully loaded
            // This is especially important for edit mode where course index might load dynamically
            setTimeout(setCurrentPageItem, 200);
            initShowMoreSummary();

            if(evfmoodleversion < 500) {
                $('body').addClass('edwiservideoformat-moodle-405');
            }
            else {
                $('body').addClass('edwiservideoformat-moodle-500');
            }
        });
    }

    // Must return the init function.
    return {
        init: init
    };
});
