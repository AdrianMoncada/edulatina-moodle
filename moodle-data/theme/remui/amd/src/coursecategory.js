/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable jsdoc/require-jsdoc */
/* eslint-disable no-unused-vars */
/* eslint-disable babel/semi */
/* eslint-disable no-trailing-spaces*/
/* eslint-disable promise/catch-or-return*/

/* eslint-disable no-undef*/
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
 * @module     theme_remui/coursecategory
 * @copyright (c) 2023 WisdmLabs (https://wisdmlabs.com/)
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

"use strict";

define([
    'jquery',
    'core/ajax',
    'core/str',
    'core/templates',
    'theme_remui/jquery-toolbar',
    'core/notification',
    'theme_remui/user/repository',
    'theme_remui/bootstrap-select'
], function($, Ajax, str, templates, toolbar, Notification,UserRepository) {

    // Globals.
    var filterobj;
    var langstrings;

    var categoryfilter = $('#categoryfilter');

    var sortfilter = $('select#sortfilter');

    var categorylink = '[category-filter-link]';

    var cardswrapperarea = $('.course-cards');
    var cardspagination = $('.cards-pagination');

    // View templates.
    var gridtemplate = 'theme_remui/course_card_grid';
    var listtemplate = 'theme_remui/course_card_list';
    var summarytemplate = 'theme_remui/course_card_summary';

    var searchfilter = $('.layout-1 .filters-wrapper .simplesearchform');


    var coursecounter = $('.course-counter span.course-number');

    var tagswrapper = $('.tag-wrapper');

    var togglebtn = $(".togglebtn");

    var courseArchieveFilters = {};

    const SELECTORS = {
        'CUSTOM_DROPDOWN_MENU': '.edw-custom-dropdown-wrapper .dropdown-menu',
        'COURSE_SORTING': '.edw-custom-dropdown-wrapper.course-shorting',
        'COURSE_FILTERS': '.edw-custom-dropdown-wrapper.course-filters',
        'MAX_COURSE_SHOWN': '.edw-custom-dropdown-wrapper.max-course-shown',
        'COURSE_FILTER_FORM': '.edw-custom-dropdown-wrapper #course-filter-form',
        'MAXCOURSE_DEFAULT': '.edw-custom-dropdown-wrapper.max-course-shown .max-course-default',
    };

    /**
     * Main category filters class.
     * @param  {Integer} defaultCategory Default category to select.
     * @return {Object}  Filter object
     */
    var categoryFilters = function(defaultCategory) {

        var _pageobj = {courses: 0, mycourses: 0};
        var _obj = {
            // Category id.
            category: defaultCategory,
            // Sorting.
            sort: 'ASC',
            // Searching string.
            search: "",
            // If true, means mycourses tab is active.
            tab: false,
            // This object consist of page number that is currently active, has mycourses and all courses tab page number.
            page: _pageobj,
            // If True, regenerate the pagination on any action performed.
            pagination: true,
            // Initially it is null to detect initial change in view, String grid - view in grid format, String list - list format.
            // view: null,
            // This filterModified true will tell that we need to fetch the courses otherwise show old fetched data.
            isFilterModified: true
        };

        _obj.initAttributes = function() {
            _obj.category = defaultCategory;
            _obj.sort = 'ASC';
            _obj.search = '';
            _obj.tab = false;
            _obj.page = _pageobj;
            _obj.pagination = true;
            // _obj.view = null;
            _obj.isFilterModified = true;
        };

        _obj.initPagination = function() {
            _obj.page = {courses: 0, mycourses: 0};
        };
        return _obj;
    };

    /**
     * Course content object to handle ajax.
     */
    var courseContent = new (function() {
        this.mycourses = false;
        this.courses = false;

        /**
         * Check if course contents are loaded.
         * @returns {Boolean}
         */
        this.isLoaded = function() {
            let type = courseContent.getActive();
            return this[type];
        };

        /**
         * Mark courses as loaded
         * @param {Boolean} state Loading state
         */
        this.loaded = function(state) {
            let type = courseContent.getActive();
            if (state === undefined) {
                state = true;
            }
            this[type] = state;
        };

        /**
         * Reset courses.
         */
        this.reset = function() {
            this.mycourses = false;
            this.courses = false;
        };

        /**
         * Get currently active tab
         * @returns {String}
         */
        this.getActive = function() {
            return filterobj.tab === true ? 'mycourses' : 'courses';
        };
    })();

    /**
     * Filters Generation
     * @param  {Object} filterdata Filter data
     */
    function generateFilters(filterdata) {
        $(".selectpicker").each(function() {
            $(this).selectpicker();
        });

        if (filterdata.category !== "") {


            if ($.isNumeric(filterdata.category)) {
                var targetElement = $('.categoryfiltermenu .dropdown-menu a[data-cat-id="' + filterdata.category + '"]');
                $('.categoryfiltermenu .categoryfilter span').text(targetElement.text());
            }
        }

        if (filterdata.tab == true) {
            $('#switch-label1, #switch-label2').prop('checked', true);
        } else {
            $('#switch-label1, #switch-label2').prop('checked', false);
        }
        if (filterdata.sort !== null && filterdata.sort != undefined && typeof filterdata.sort != "function") {
            $("#sortfilter.selectpicker").selectpicker('val', filterdata.sort);
        }

        if (filterdata.search !== "") {
            $(searchfilter).find('input[type="text"]').val(filterdata.search);
        }

    }

    /**
     * Update page content
     */
    function updatePage() {
        // Destroy the cards from page.
        destroyCourseCards();
        // Create courses cards again.
        generateCourseCards();
    }

    /*
     * Populate the tags section.
     */
    function populate_tags() {
        var serviceName = 'theme_remui_get_tags';
        var getcourses = Ajax.call([{
            methodname: serviceName,
            args: {
                data: JSON.stringify(filterobj)
            }
        }]);
        getcourses[0].done(function(response) {
            tagswrapper.empty().append(response);
            generateHorizontalScroller($(".tag_list"));

        }).fail(Notification.exception);
    }

    const generateHorizontalScroller = (element) => {
        const _leftscroll = ".left-scroll";
        const _rightscroll = ".right-scroll";

        if (element.length == 0) {
            return;
        }

        const _main = element[0];

        if (_main.scrollWidth > _main.clientWidth) {

            $(_leftscroll + "," + _rightscroll).removeClass("d-none");

            const updateButtons = () => {

                $(_leftscroll).disabled = false;
                $(_rightscroll).disabled = false;

                if (_main.scrollLeft == 0) {
                    $(_leftscroll).disabled = true;
                }

                var _scrollWidth = _main.scrollWidth;
                var _clientWidth = _main.clientWidth;
                var _scrollLeft = _main.scrollLeft;
                var _rightPos = _scrollWidth - _clientWidth;
                // Here we detect if element if fully scrolled to right.
                if (_scrollLeft == _rightPos) {
                    $(_leftscroll).disabled = true;
                }
            };

            const moveRight = (_ele, scrollStep = 30) => {
                _ele.scrollLeft += scrollStep;
                updateButtons();
            };

            const moveLeft = (_ele, scrollStep = 30) => {
                _ele.scrollLeft -= scrollStep;
                updateButtons();
            };

            var _lInterval;
            var _rInterval;

            $(_leftscroll).on("mouseover", function() {
                _lInterval = setInterval(function() {
                    moveLeft(_main, 1);
                }, 1);

            });

            $(_rightscroll).on("mouseover", function() {
                _rInterval = setInterval(function() {
                    moveRight(_main, 1);
                }, 1);
            });

            $(_leftscroll).on("mouseout", function() {
                clearInterval(_lInterval);
            });
            $(_rightscroll).on("mouseout", function() {
                clearInterval(_rInterval);
            });
        }
    };

    /**
     * Course cards initialization function.
     */
    function generateCourseCards() {
        // Check if Filters are modified and need to fetch the courses.
        if (!filterobj.isFilterModified) {
            return;
        }
        toggleContent(true);

        // Fetch the courses.
        getCourses();


    }

    /**
     * Hide the content.
     * @param  {Boolean} hidecontent
     */
    function toggleContent(hidecontent) {
        if (hidecontent) {
            $("#course-archive-main-container .tag-wrapper").addClass("d-none");
            $("#course-archive-main-container .course-cards").addClass("d-none");
            $("#course-archive-main-container .cards-pagination").addClass("d-none");
            $("#course-archive-main-container .loader-overlay").addClass("d-flex").removeClass("d-none");
        } else {
            $("#course-archive-main-container .tag-wrapper").removeClass("d-none");
            $("#course-archive-main-container .course-cards").removeClass("d-none");
            $("#course-archive-main-container .cards-pagination").removeClass("d-none");
            $("#course-archive-main-container .loader-overlay").addClass("d-none").removeClass("d-flex");
        }
    }
    /**
     * Destroy courses cards
     */
    function destroyCourseCards() {
        // Find active tab to append the course cards.
        // var destroytab = (filterobj.tab) ? mycoursesregion : coursesregion;
        // Empty the courses region.
        $(cardswrapperarea).empty();

        // Destroy the pagination also.
        if (filterobj.pagination) {
            // Var destroypagination = (filterobj.tab) ? mycoursespagination : coursespagination;
            // $(destroypagination).empty();
            cardspagination.empty();
        }
    }

    /**
     * Ajax to fetch the course and also append those courses to the page.
     * If pagination is enabled it will also generate new pagination.
     */
    function getCourses() {
        $('.courses-tabs .courses-loader-wrap').show();
        // Find active tab to append the course cards.
        // var appendtab = (filterobj.tab) ? mycoursesregion : coursesregion;
        // var appendpagination = (filterobj.tab) ? mycoursespagination : coursespagination;
        var serviceName = 'theme_remui_get_courses';
        var getcourses = Ajax.call([{
            methodname: serviceName,
            args: {
                data: JSON.stringify(filterobj)
            }
        }]);
        getcourses[0].done(function(response) {
            response = JSON.parse(response);

            $(coursecounter).text(response.totalcoursescount);

            // Get the view.
            var viewobj = (typeof filterobj.view === "undefined") ? response.view : filterobj.view;

            // It will handle the view buttons synchronization with myoverview settings
            var filterbuttonsarray = $('.filters-wrapper .view-buttons .btn');
            var prefveiwbuttonavailable = filterbuttonsarray.filter(function() {
                return $(this).attr('data-view') == viewobj;
            }).length > 0;
            if (!prefveiwbuttonavailable) {
                if (filterbuttonsarray.length >= 1) {
                    viewobj = $(filterbuttonsarray[0]).attr('data-view');
                }
            }
            var rendertemplate = gridtemplate;

            if (viewobj == 'grid' || response.latest_card) {
                rendertemplate = gridtemplate;
            }
            if (viewobj == 'list' || response.latest_card) {
                rendertemplate = listtemplate;
            }
            if (viewobj == 'summary' || response.latest_card) {
                rendertemplate = summarytemplate;
            }

            // Always render grid teplate on mobile screen and when latest cards setting is on.
            if (window.screen.width <= 480 || response.latest_card) {
                rendertemplate = gridtemplate;
                viewobj = 'grid';
            }

            if (prefveiwbuttonavailable) {
                // Update the view.
                updateView(viewobj);
            } else {
                // Update the card container.
                updateCardContainer(viewobj);
            }
            updateCards(response.latest_card);

            var courses = response.courses;
            if (courses.length > 0) {
                for (var i = 0; i < courses.length; i++) {
                    // This will call the function to load and render our template.
                    templates.render(rendertemplate, courses[i])
                    // It returns a promise that needs to be resoved.
                    /* eslint no-loop-func: 0 */
                    .then(function(html, js) {
                        // Here eventually I have my compiled template, and any javascript that it generated.
                        // The templates object has append, prepend and replace functions.
                        // templates.appendNodeContents(appendtab, html, js);
                        templates.appendNodeContents(cardswrapperarea, html, js);

                        // Show options button on course card.
                        // check if not mycourse tab.
                        // This is very bad code, couldn't do it another way.
                        // it get called each time a single card is added to dom, try to improve it.
                        if (!filterobj.tab && !response.latest_card) {
                            /* eslint promise/always-return: 0 */
                            $('.showoptions').each(function() {
                                $(this).toolbar({
                                    content: $(this).data('toolbar'),
                                    style: 'primary'
                                });
                            });
                        }
                    }).fail(Notification.exception);
                }

                $(SELECTORS.COURSE_SORTING).removeClass("d-none");
                $(SELECTORS.MAX_COURSE_SHOWN).removeClass("d-none");

            } else {
                var htmldata = '<div class="alert alert-warning alert-dismissible  w-full mx-10" role="alert">';
                htmldata += '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
                    '<span aria-hidden="true">×</span><span class="sr-only">Close</span></button>' + langstrings[0] + '</div>';

                $(SELECTORS.COURSE_SORTING).addClass("d-none");
                $(SELECTORS.MAX_COURSE_SHOWN).addClass("d-none");

                templates.appendNodeContents(cardswrapperarea, htmldata, '');

            }

            // Pagination html.
            // Check if pagination is enabled.
            if (filterobj.pagination) {
                templates.appendNodeContents(cardspagination, response.pagination, '');
            }
            $('.courses-tabs .courses-loader-wrap').hide();
            toggleContent(false);
        }).fail(Notification.exception);
    }

    /**
     * Update cards view
     * @param  {Boolean} latest True if want to show as latest card
     */
    function updateCards(latest) {
        if (latest) {
            cardswrapperarea.addClass('latest-cards');
            $('.viewtoggler').addClass('hidden');
        } else {
            cardswrapperarea.removeClass('latest-cards');
            $('.viewtoggler').removeClass('hidden');
        }
    }

    /**
     * Updates the view of the course cards based on the specified view type.
     *
     * @param {string} view - The view type to update to ('grid', 'list', or 'summary').
     * @returns {void}
     */
    function updateView(view) {
        const views = {
            grid: 'grid-view edw-course-card-grid',
            list: 'list-view list-group edw-course-list-container',
            summary: 'summary-view edw-course-summary-container d-flex flex-column m-0'
        };

        const commonRemoveClasses = Object.values(views).join(' ');
        const btnSelector = `.${view}_btn`;

        cardswrapperarea
            .removeClass(commonRemoveClasses)
            .addClass(views[view]);

        $('.grid_btn, .list_btn, .summary_btn').removeClass('btn-primary active');
        $(btnSelector).addClass('btn-primary active');

        if (view === 'grid') {
            filterobj.view = 'grid';
        }
    }

    /**
     *
     * @param  {String} view View typ
     */
    function updateCardContainer(view) {
        const viewClasses = {
            grid: 'grid-view edw-course-card-grid',
            list: 'list-view list-group edw-course-list-container',
            summary: 'summary-view edw-course-summary-container d-flex flex-column m-0'
        };

        const allClasses = Object.values(viewClasses).join(' ');

        cardswrapperarea.removeClass(allClasses).addClass(viewClasses[view]);
    }
    // This is for, Toolbar redirection not working.
    $(document).delegate('.tool-item', 'click', function() {
        window.location = $(this).attr('href');
    });

    $(categoryfilter).on('change', function(e) {

        filterobj.category = e.target.value;

        var url = M.cfg.wwwroot + '/course/index.php?categoryid=' + encodeURI(e.target.value);

        if (filterobj.search != "") {
            url += "&search=" + filterobj.search;
        }

        if (filterobj.sort != "default" && filterobj.sort != -1 && typeof filterobj.sort != "function") {
            url += "&sort=" + filterobj.sort;
        }

        window.history.replaceState(
            'pagechange',
            document.title,
            url
        );

        window.location.reload();
        // UpdatePage();
        // populate_tags();
    });

    // Search Filter.
    $(searchfilter).on('submit', function(e) {
        e.preventDefault();
        e.stopPropagation();
        filterobj.initPagination();
        filterobj.search = $('#course-archive-main-container .filters-wrapper .simplesearchform input.form-control').val();
        courseContent.reset();
        updatePage();
    });

    $('#switch-label1, #switch-label2').on('change.bootstrapSwitch', function(e, data) {
        filterobj.tab = e.target.checked;
        updatePage();
        populate_tags();
    });

    // View toggler.
    $(togglebtn).on('click', function() {
        var clckviewbtn = $(this).attr('data-view');
        filterobj.view = clckviewbtn;
        updateView(filterobj.view);
            UserRepository.setUserPreference('course_view_state', clckviewbtn, null);
        courseFilterCommon();
    });

    // Sorting Filter.
    $(sortfilter).on('changed.bs.select', function(e) {
        filterobj.sort = e.target.value;
        updatePage();
    });

    $("#course-archive-main-container").on('click', ".menu-picker-select", function() {
        $(this).find(".menu-content").toggleClass('d-none');
        $(this).find(".edw-icon-Setting").toggleClass('d-none');
        $(this).find(".edw-icon-Cancel").toggleClass('d-none');
    });

    // Pagination Click Event.
    $(document).delegate('.cards-pagination .pagination .page-item .page-link', 'click', function(e) {
        e.preventDefault();
        // Update the page number in object for mycourses as well as all courses tab.
        var linkdata = e.target.href;
        if (linkdata === undefined) {
            linkdata = e.target.parentElement.href;
            if (linkdata === undefined) {
                linkdata = e.target.parentElement.parentElement.href;
            }
        }

        var hashes = linkdata.slice(linkdata.indexOf('?') + 1).split('&');
        var vars = [],
            hash;
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }

        if (filterobj.tab) {
            filterobj.page.mycourses = vars.page;
        } else {
            filterobj.page.courses = vars.page;
            courseArchieveFilters.pageno = vars.page;
            sessionStorage.setItem('courseArchieveFilters', JSON.stringify(courseArchieveFilters));
        }

        updatePage();
    });

    function courseFilterCommon() {
        filterobj.page.courses = 0;
        courseArchieveFilters.pageno = 0;

        $(SELECTORS.CUSTOM_DROPDOWN_MENU).removeClass('show');
        setCoursePerPageDetails();

        sessionStorage.setItem('courseArchieveFilters', JSON.stringify(courseArchieveFilters));
        updatePage();
    }

    function shortingSelectOption(e) {
        $(SELECTORS.COURSE_SORTING + ' .dropdown-toggle .toggle-text').text($(this).text());
        $(SELECTORS.COURSE_SORTING + ' .select-option').removeClass('active');
        $(this).addClass('active');

        filterobj.sort = $(this).data('value');

        courseArchieveFilters.sort = $(this).data('value');

        courseFilterCommon();
    }

    function maxCourseSelectOption(e) {
        $(SELECTORS.MAX_COURSE_SHOWN + ' .dropdown-toggle .toggle-text').text($(this).text());
        $(SELECTORS.MAX_COURSE_SHOWN + ' .select-option').removeClass('active');
        $(this).addClass('active');

        filterobj.courserowperpage = $(this).data('value');

        courseArchieveFilters.courserowperpage = $(this).data('value');

        courseFilterCommon();
    }

    function courseFilterFormSubmit(e) {
        e.preventDefault();
        var selectedFilters = getCheckedFiltersData(this);

        if (Object.keys(selectedFilters).length > 0) {
            filterobj.selectedFilters = selectedFilters;
            filterobj.isfilterapplied = true;
        } else {
            filterobj.isfilterapplied = false;
            delete filterobj.selectedFilters;
        }

        courseArchieveFilters.coursefilters = selectedFilters;

        courseFilterCommon();
    }

    function courseFilterFormClear(e) {
        $(SELECTORS.COURSE_FILTER_FORM).find('input[type="checkbox"]').each(function() {
            $(this).prop('checked', false);
        });
    }

    function getCheckedFiltersData($filterform) {
        var selectedFilters = {};
        var filterCount = 0;
        $($filterform).find('input[type="checkbox"]:checked').each(function() {
            var filterType = $(this).data('filtertype');
            var value = $(this).val();
            var name = $(this).attr('name');
            filterCount++;

            if (!selectedFilters[filterType]) {
                selectedFilters[filterType] = [];
            }

            selectedFilters[filterType].push({
                'name': name,
                'value': value
            });
        });

        if (filterCount) {
            $(SELECTORS.COURSE_FILTERS + " .filter-count-label").removeClass('d-none').text(filterCount);
        } else {
            $(SELECTORS.COURSE_FILTERS + " .filter-count-label").addClass('d-none').text("");
        }

        return selectedFilters;
    }

    function setCoursePerPageDetails() {
        let courseperrow = 4;
        if (typeof window === 'undefined') {
            courseperrow = 4;
        }

        var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

        if (screenWidth < 768) {
            courseperrow = 1;
        } else if (screenWidth < 1024) {
            courseperrow = 2;
        } else if (screenWidth < 1200 || $('body').hasClass('limitedwidth')) {
            courseperrow = 3;
        } else {
            courseperrow = 4;
        }

        if (!filterobj.courserowperpage) {
            let maxCourseDefault = $(SELECTORS.MAXCOURSE_DEFAULT).data('value');
            let courserowperpage = Math.ceil(maxCourseDefault / courseperrow);
            filterobj.courserowperpage = courserowperpage;

            let activeOption = $(SELECTORS.MAX_COURSE_SHOWN + " .select-option[data-value='" + courserowperpage + "']");

            $(SELECTORS.MAX_COURSE_SHOWN + ' .dropdown-toggle .toggle-text').text(activeOption.text());
            $(SELECTORS.MAX_COURSE_SHOWN + ' .select-option').removeClass('active');
            activeOption.addClass('active');
        }

        filterobj.courseperrow = courseperrow;
    }


    function setDefaultCourseFilters() {
        // Retrieve filters from session storage or initialize empty object
        courseArchieveFilters = JSON.parse(sessionStorage.getItem('courseArchieveFilters'));

        let activesort = null;
        let screenWidth = window?.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

        if (!courseArchieveFilters) {
            // Initialize default filters if not present
            courseArchieveFilters = {};

            courseArchieveFilters.islimitedwidth = $('body').hasClass('limitedwidth');
            courseArchieveFilters.maxCourseDefault = $(SELECTORS.MAXCOURSE_DEFAULT).data('value');
            courseArchieveFilters.windowWidth = screenWidth;
            courseArchieveFilters.category = filterobj.category;

        } else {
            if (courseArchieveFilters.coursefilters) {
                // Set checked state for filter inputs
                Object.keys(courseArchieveFilters.coursefilters).forEach(filterType => {
                    courseArchieveFilters.coursefilters[filterType].forEach(filter => {
                        let filterInputField = $(SELECTORS.COURSE_FILTER_FORM + " input[name='" + filter.name + "']");
                        if (filterInputField) {
                            filterInputField.prop('checked', true);
                        }
                    });
                });


                filterobj.selectedFilters = getCheckedFiltersData(SELECTORS.COURSE_FILTER_FORM);

                if (filterobj.selectedFilters && Object.keys(filterobj.selectedFilters).length > 0) {
                    filterobj.isfilterapplied = true;
                }
            }

            // Set course rows per page
            if (courseArchieveFilters.courserowperpage) {
                let activepage = $(SELECTORS.MAX_COURSE_SHOWN + " .select-option[data-value='" + courseArchieveFilters.courserowperpage + "']");
                $(SELECTORS.MAX_COURSE_SHOWN + ' .dropdown-toggle .toggle-text').text(activepage.text());
                $(SELECTORS.MAX_COURSE_SHOWN + ' .select-option').removeClass('active');
                activepage.addClass('active');

                filterobj.courserowperpage = courseArchieveFilters.courserowperpage;
            }

            // Set active sort option
            if (courseArchieveFilters.sort) {
                activesort = $(SELECTORS.COURSE_SORTING + " .select-option[data-value='" + courseArchieveFilters.sort + "']");
            }

            // Update page number and reset if necessary
            if (courseArchieveFilters.hasOwnProperty('pageno') || courseArchieveFilters.pageno !== undefined) {
                filterobj.page.courses = courseArchieveFilters.pageno;
            }
            if (!courseArchieveFilters.courserowperpage && (courseArchieveFilters.maxCourseDefault != $(SELECTORS.MAXCOURSE_DEFAULT).data('value'))) {
                courseArchieveFilters.maxCourseDefault = $(SELECTORS.MAXCOURSE_DEFAULT).data('value');
                filterobj.page.courses = 0;
                courseArchieveFilters.pageno = 0;
            }

            // Reset page if layout or screen width changed
            if (courseArchieveFilters.islimitedwidth !== $('body').hasClass('limitedwidth') ||
                courseArchieveFilters.windowWidth !== screenWidth) {
                courseArchieveFilters.islimitedwidth = $('body').hasClass('limitedwidth');
                courseArchieveFilters.windowWidth = screenWidth;
                filterobj.page.courses = 0;
                courseArchieveFilters.pageno = 0;
            }

            if (courseArchieveFilters.category != filterobj.category) {
                courseArchieveFilters.category = filterobj.category;
                filterobj.page.courses = 0;
                courseArchieveFilters.pageno = 0;
            }
        }


        // Set default sort option if not already set
        if (!activesort || activesort.length == 0) {
            activesort = $(SELECTORS.COURSE_SORTING + " .select-option[data-value='none']");
            courseArchieveFilters.sort = 'none';
        }

        // Save filters to session storage
        sessionStorage.setItem('courseArchieveFilters', JSON.stringify(courseArchieveFilters));

        // Update UI for sorting
        $(SELECTORS.COURSE_SORTING + ' .dropdown-toggle .toggle-text').text(activesort.text());
        $(SELECTORS.COURSE_SORTING + ' .select-option').removeClass('active');
        activesort.addClass('active');

        setCoursePerPageDetails();

        filterobj.sort = courseArchieveFilters.sort;
    }

    var init = function(defaultCategory) {
        $(document).ready(function() {
            var categorydescription = $(".category-description-container").get();
            $(".filters-wrapper .category-description-container").remove();
            $(categorydescription).insertAfter(".header-wrapper");
            $(categorydescription).removeClass("d-none");

            // Gradient effect handling on category discription
            var summaryheight = $('.category-description-wrapper').height();

            const $container = $('.category-description-container');
            const $wrapper = $('.category-description-wrapper');
            const $readMore = $container.find('#readmorebtn');
            const $readLess = $container.find('#readlessbtn');
            if (summaryheight > 300) {
                $readMore.removeClass('d-none');
                $wrapper.addClass('summary-collapsed').removeClass('summary-expanded');
            }
            function toggleSummary(expand) {
                $wrapper.toggleClass('summary-expanded', expand).toggleClass('summary-collapsed', !expand);
                $readMore.toggleClass('d-none', expand);
                $readLess.toggleClass('d-none', !expand);
            }

            $readMore.on('click', () => toggleSummary(true));
            $readLess.on('click', () => toggleSummary(false));

            $(SELECTORS.CUSTOM_DROPDOWN_MENU).on('click.bs.dropdown', function(e) {
                e.stopPropagation();
            });

            $(SELECTORS.COURSE_SORTING + ' .select-option').on('click', shortingSelectOption);
            $(SELECTORS.MAX_COURSE_SHOWN + ' .select-option').on('click', maxCourseSelectOption);

            $(SELECTORS.COURSE_FILTER_FORM + ' .clear-btn').on('click', courseFilterFormClear);
            $(SELECTORS.COURSE_FILTER_FORM).on('submit', courseFilterFormSubmit);

            $(SELECTORS.CUSTOM_DROPDOWN_MENU + ' .dropdown-close').on('click', () => {
                $(SELECTORS.CUSTOM_DROPDOWN_MENU).removeClass('show');
            });

            $('.categoryfiltermenu .dropdown-menu .dropdown-close').on('click', () => {
                $('.categoryfiltermenu .dropdown-menu').removeClass('show');
            });

        });

        $(categorylink).on('click', function(event) {
            event.preventDefault();
            $(categoryfilter).val($(this).data('id')).trigger('change');
            return false;
        });
        var strings = [
            {
                key: 'nocoursefound',
                component: 'theme_remui'
            }
        ];
        str.get_strings(strings).then(function(stringres) {
            langstrings = stringres;

            filterobj = categoryFilters(defaultCategory); // Global object for filters.
            // Initialize global filter object with default values.

            var vars = [],
                hash;
            var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');

            for (var i = 0; i < hashes.length; i++) {
                hash = hashes[i].split('=');
                vars.push(hash[0]);
                vars[hash[0]] = hash[1];
            }

            if (vars.categoryid && vars.categoryid != 0) {
                filterobj.category = vars.categoryid;
            }

            setDefaultCourseFilters(); // It will set filters default value to global variable filterobj.

            if (vars.hasOwnProperty('sort') && typeof vars.sort !== 'function') {
                filterobj.sort = vars.sort;
            }

            if (vars.search != undefined) {
                filterobj.search = decodeURI(vars.search);
            }

            generateFilters(filterobj); // This will create filters.
            generateCourseCards(); // Course cards Generation.
            populate_tags();
        });
    };

    return {
        init: init
    };
});
