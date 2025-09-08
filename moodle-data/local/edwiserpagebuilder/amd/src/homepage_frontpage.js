/* eslint-disable require-jsdoc */
/* eslint-disable jsdoc/require-jsdoc */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable max-len */
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

// Section manager class
//
// @module     local_remuihomepage/frontpage
// @copyright  (c) 2018 WisdmLabs (https://wisdmlabs.com/)
// @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later.

define([
    'jquery',
    'core/modal_factory',
    'core/templates',
    'core/str', 'core/modal_events',
    'core/fragment',
    'core/ajax',
    'core/notification',
    'theme_remui/slick'
], function (
    $,
    ModalFactory,
    Templates,
    Str,
    ModalEvents,
    Fragment,
    Ajax,
    Notification
) {
    var instanceid = '';
    var categoryid = '';
    let SECTIONSELECTOR = "";
    var COURSESECTIONCATEGORY = " .section-courses .category-list .category-item";
    /**
     * Generate courses slick slider
     * @param  {Number}   instanceid Instance id of section
     * @param  {Number}   categoryid Category id
     * @param  {Function} callback   Callback function
     */
    function generateCourses(instanceid, categoryid, callback) {
        var section = getSectionElement(instanceid);
        section.find('.courses-slider').removeClass('show');
        Ajax.call([{
            methodname: 'local_edwiserpagebuilder_get_frontpage_section_courses_in_category',
            args: {
                instanceid: instanceid,
                categoryid: categoryid
            },
            done: function (response) {
                response = JSON.parse(response);
                response.shadowless = response.sectionproperties.shadowless;
                response.shadowcolor = response.sectionproperties.shadowcolor;
                section.find('.courses-slider.slick-initialized.slick-slider').slick('unslick');
                section.find('.courses-slider').empty();
                section.data('totalcourses', response.totalcourse);
                section.data('current', 0);
                Templates.render('local_edwiserpagebuilder/courses_cards', response)
                    .done(function (html, js) {
                        Templates.appendNodeContents(section.find('.courses-slider'), html, js);
                        applySlickToCourses(instanceid, {
                            slidesToShow: 3,
                            slidesToScroll: 3
                        });
                        if (typeof callback == 'function') {
                            callback();
                        }
                    })
                    .fail(Notification.exception);
            },
            fail: function (ex) {
                Notification.exception(ex);
            }
        }]);
    }

    function setcategoryInstanceid(id) {
        this.instanceid = id;
        SECTIONSELECTOR = 'section[data-instance="' + id + '"]';
        return SECTIONSELECTOR;
    };

    function getSectionElement(instanceid) {
        if (instanceid !== false) {
            setcategoryInstanceid(instanceid);
        }
        return $('body').find(SECTIONSELECTOR);
    };
    /**
 * Polyfill method for Object.assign
 * @param  {Object}    target    Target Object
 * @return {Object}              Merged object
 */
    var assign = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
        return target;
    };

    var initializeEvents = function () {
        // Load courses on course category selection.
        $('body').on('click', COURSESECTIONCATEGORY, function () {
            var instanceid = $(this).parents('section[data-instance]').data('instance');
            $(this).parents('section[data-instance]').find('.courses-slider').removeClass('show');
            var categoryid = $(this).data('id');
            generateCourses(instanceid, categoryid, (function () {
                $(this).siblings().removeClass('active');
                $(this).addClass('active');
                $(this).parents('.category-list').removeClass('show');
            }).bind(this));
        });

    };
    /**
 * Apply slick to courses list
 * @param  {Number} instanceid Section instance id
 * @param  {Object} options    Options of slick slider
 */
    function applySlickToCourses(instanceid, options) {
        var defaults = {
            dots: false,
            arrows: true,
            infinite: false,
            speed: 500,
            prevArrow: $("section[data-instance='" + instanceid + "'] .button-container .btn-prev"),
            nextArrow: $("section[data-instance='" + instanceid + "'] .button-container .btn-next"),
            rtl: ($("html").attr("dir") == "rtl") ? true : false,
            slidesToShow: 4,
            slidesToScroll: 4,
            responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            }, {
                breakpoint: 800,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }, {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }]
        };
        if (options !== null && typeof options == 'object') {
            assign(defaults, options);
        }
        var section =
            getSectionElement(instanceid);
        section.find('.available-courses').addClass('d-none');
        if (section.find('.courses-slider .empty-courses-container').length != 0) {
            return;
        }
        section.find('.courses-slider').slick(defaults)
            .on('setPosition', function (event, slick) {
                $(section).find('.slick-slide > div').css('height', '100%');
                slick.$slides.css('height', slick.$slideTrack.height() + 'px');
            });
        section.find('.available-courses').removeClass('d-none');
    }

    return {
        init: function () {
            $(document).ready(function () {
                initializeEvents();
                var instanceid = $(COURSESECTIONCATEGORY).parents('section[data-instance]').data('instance');
                $(this).parents(COURSESECTIONCATEGORY).find('.courses-slider').removeClass('show');
                var categoryid = 0;
                if ($(COURSESECTIONCATEGORY).length) {
                    generateCourses(instanceid, categoryid, (function () {
                        $(COURSESECTIONCATEGORY).siblings().removeClass('active');
                        $(COURSESECTIONCATEGORY).addClass('active');
                        $(COURSESECTIONCATEGORY).parents('.category-list').removeClass('show');
                    }).bind(COURSESECTIONCATEGORY));
                }
            });
        }
    };
});
