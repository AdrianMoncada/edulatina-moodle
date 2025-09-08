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
 * @module     theme_remui/remuiloader
 * @copyright (c) 2020 WisdmLabs (https://wisdmlabs.com/)
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

define(['jquery', 'theme_remui/feedbackcollection'], function ($, feedbackcollection) {

    const registerCommonEvents = () => {

        // Make AddBlock modal full Width.
        $(document).on('click', '[data-key="addblock"]', function () {
            setTimeout(function () {
                $('.modal[data-region="modal-container"]').addClass("fullwidth-modal");
            }, 500);
        });


        // This events handle the collapse issue on the messaging panel.
        msgBodyViewFavourite.on('click', function (e) {
            stopCollapseInMsgPanel(msgBodyViewFavourite, e);
        });

        msgBodyViewGroupmsg.on('click', function (e) {
            stopCollapseInMsgPanel(msgBodyViewGroupmsg, e);
        });

        msgBodyViewPrivate.on('click', function (e) {
            stopCollapseInMsgPanel(msgBodyViewPrivate, e);
        });

        // This events handle the collapse issue on the messaging page .
        msgPanelBodyViewFavourite.on('click', function (e) {
            stopCollapseInMsgPanel(msgPanelBodyViewFavourite, e);
        });

        msgPanelBodyViewGroupmsg.on('click', function (e) {
            stopCollapseInMsgPanel(msgPanelBodyViewGroupmsg, e);
        });

        msgPanelBodyViewPrivate.on('click', function (e) {
            stopCollapseInMsgPanel(msgPanelBodyViewPrivate, e);
        });

        $(".nav-grouping-selector ul li ").on("click", function () {
            $(this).siblings("li").find("a").removeAttr("aria-current", false);
            $(this).find("a").attr("aria-current", true);
        });

        $(".nav-display-selector ul li ").on("click", function () {
            $(this).siblings("li").find("a").removeAttr("aria-current", false);
            $(this).siblings("li").find("span").removeAttr("aria-current", false);
            $(this).find("a").attr("aria-current", true);
            $(this).find("span").attr("aria-current", true);
        });

        // Every time the window is scrolled.
        $(window).scroll(function () {
            transparentheaderhanlder();
        });

        $('.category-wrapper .toggle-btn').on("click", function(){
            console.log("listner is working fine");
            setTimeout(() => {
                $(this).closest('.dropdown-menu').addClass('show');
            }, 1);
        });

        $(document).on('click', function (e) {
            // Check if the clicked element is NOT inside the dropdown
            if (!$('.dropdown').is(e.target) && $('.dropdown').has(e.target).length === 0) {
              // Close the dropdown
              $('.category-wrapper .toggle-btn').closest('.dropdown-menu').removeClass('show');
            }
          });

        // $('#admin-showenrolledtextinput input').on("input", function() {
        //     // IF length is greter than 8 than trim it to 8 charactor
        //     var trimmedValue = $(this).val().substring(0, 8);
        //     $(this).val(trimmedValue);
        // });

        // $('#admin-showlessontextinput input').on("input", function() {
        //     // IF length is greter than 8 than trim it to 8 charactor
        //     var trimmedValue = $(this).val().substring(0, 8);
        //     $(this).val(trimmedValue);
        // });

        registerGoToTopEvents();

        registerShowPasswordAction();
    };

    // Variables for msg body container
    var msgBodyViewFavourite = $('[data-region="body-container"]').find('[data-region="view-overview-favourites"]');
    var msgBodyViewGroupmsg = $('[data-region="body-container"]').find('[data-region="view-overview-group-messages"]');
    var msgBodyViewPrivate = $('[data-region="body-container"]').find('[data-region="view-overview-messages"]');

    // Variables for msg panel body container(messaging page)
    var msgPanelBodyViewFavourite = $('[data-region="panel-body-container"]').find('[data-region="view-overview-favourites"]');
    var msgPanelBodyViewGroupmsg = $('[data-region="panel-body-container"]').find('[data-region="view-overview-group-messages"]');
    var msgPanelBodyViewPrivate = $('[data-region="panel-body-container"]').find('[data-region="view-overview-messages"]');

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
                if (((hascarouselclass || hasedwcarouselclass) && !hashomepagetestimonial && !hastestimonial) && $(".old-frontpage").length === 0) {
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

    /*
     * Common method to stop collapsing messaging tabs
     */
    const stopCollapseInMsgPanel = ($this, e) => {
        if ($this.hasClass('expanded')) {
            e.preventDefault();
            e.stopPropagation();
        }
    };
    /*
     * Creating mini version of bootstrap-select for Dropdowns
     * {String} dropdownselector class selector for dropdown
     */
    const generateDropdownSearch = (dropdownselector) => {

        var _catmenus = $(dropdownselector + '+ .dropdown-menu');
        var _searchfield = ".catsearch";

        var sr_text = M.util.get_string('searchcatplaceholdertext', 'theme_remui');
        var _inputfield = '<div class="simplesearchform edw-search-field catsearchfield p-3 d-none">';
        _inputfield += '<div class="input-group d-flex align-items-center">';
        _inputfield += '<label for="header-category-searchinput">';
        _inputfield += '<span class="sr-only">Search</span>';
        _inputfield += '</label>';
        _inputfield += '<div class="input-group-prepend">';
        _inputfield += '<button type="submit" class="btn btn-submit" data-action="submit">';
        _inputfield += '<span class="edw-icon edw-icon-Search"></span>';
        _inputfield += '<span class="sr-only">' + sr_text + '</span>';
        _inputfield += '</button>';
        _inputfield += '</div>';
        _inputfield += '<input tabindex="1" type="text" id="header-category-searchinput" class="catsearch form-control withclear navigation-text" placeholder="' + sr_text + '" aria-label="' + sr_text + '" name="catsearch">';
        _inputfield += '</div>';

        _catmenus.prepend(_inputfield);
        $(".catsearch-item").unbind();
        $(".catsearch-item .catsearch").unbind();
        /*
         * Search Function in the dropdown items according to input field text.
         */
        function filterFunction() {
            var input, filter, a, i;
            input = $('.catselector-menu + .dropdown-menu').find(".catsearch");

            filter = input.val().toUpperCase();

            a = _catmenus.find("a");
            for (i = 0; i < a.length; i++) {
                var _txtval = a[i].textContent || a[i].innerText;
                _txtval = _txtval.split(" ").join("");
                if (_txtval.toUpperCase().indexOf(filter) > -1) {
                    a[i].style.display = "";
                } else {
                    a[i].style.display = "none";
                }
            }
        }
        _catmenus.find(_searchfield).on("keyup", function (e) {
            if (e.which == 32) {
                return true;
            }
            filterFunction();
        });

    };

    const registerGoToTopEvents = () => {
        const _GOTOPSELECTOR = "#gotop";
        // Scroll to top.
        $(_GOTOPSELECTOR).click(function () {
            $('html, body').animate({ scrollTop: 0 }, $(window).scrollTop() / 6);
            return false;
        });

        // Hide and Show Go to top button.
        $(window).scroll(function () {
            if ($(this).scrollTop() > 300) {
                $(_GOTOPSELECTOR).removeClass("d-none").addClass("d-flex");
            } else {
                $(_GOTOPSELECTOR).removeClass("d-flex").addClass("d-none");
            }
        });
    };

    const registerShowPasswordAction = () => {
        const _passwordfieldwrapper = '.password-field-eye';
        const _passwordShowIcon = _passwordfieldwrapper + ' .show-password-icon';
        const _passwordInputField = _passwordfieldwrapper + ' input[name="password"]';

        $(_passwordShowIcon).hover(
            function () {
                $(_passwordInputField).attr("type", "text");
            },
            function () {
                $(_passwordInputField).attr("type", "password");
            }
        );
    };

    // This funcion only runs on custom pages not any other places
    function handleSiteAnnouncementPosition() {
        if ($('#page-epb-page-publish').length || $('#page-epb-page-draft').length) {
            let navbarheight = $('#page-wrapper nav.navbar.fixed-top').outerHeight();
            let subpageheaderheight = 0;
            let siteannouncementheight = 0;
            if ($('.page_sub_header').length) {
                subpageheaderheight = $('.page_sub_header').outerHeight();
            }
            if ($('.site-announcement').length) {
                siteannouncementheight = $('.site-announcement').outerHeight();
                $('#topofscroll').css('margin-top', siteannouncementheight);
                if (window.innerWidth < 1024) {
                    console.log(navbarheight);
                    console.log(subpageheaderheight);
                    $('.site-announcement').css('top', navbarheight + subpageheaderheight);
                } else {
                    $('.site-announcement').css('top', 0);
                }
            }

            $('#page.drawers').css('margin-top', navbarheight + subpageheaderheight);
            $('.drawer-toggler').css('margin-top', subpageheaderheight + siteannouncementheight);
        }

    }

    async function blockediting_feedbackcollection(e) {
        e.preventDefault();
        let href =$(this).attr('href');

        const feedbackcontext = await feedbackcollection.get_feedback_context("livecustomizer_question");
        if(JSON.parse(feedbackcontext)){
            feedbackcollection.render_feedbackform("livecustomizer_question",function(){
                // Attach click event to a specific button within the rendered form
                $(document).on("click","#feedbackcollection-form .skip-btn", function() {
                    feedbackcollection.close_modal();
                    window.location = href;
                });

                $(document).on("submit", "#feedbackcollection-form", function(e) {
                    e.preventDefault();
                    feedbackcollection.submit_feedback_handler(e);
                    window.location = href;
                });
            });
        }else{
            window.location = href;
        }
    }

    return {
        init: function () {
            registerCommonEvents();

            handleSiteAnnouncementPosition();
            $(window).on('load', function() {
                handleSiteAnnouncementPosition();
            });
            $(window).resize(function() {
                handleSiteAnnouncementPosition();
            });

            // Enable Category Search filter in header.
            if ($(".catselector-menu").length) {
                generateDropdownSearch(".catselector-menu");
            }
            // Search Page Content handling
            if (!$('#page-search-index .search-results').length) {
                // var data = "<div class = 'search-result-count p-mb-4 d-none small-info-semibold'>0 "+ M.util.get_string('searchtotalcount', 'theme_remui')+"</div>";
                var htmldata = '<div class="search-results">' + M.util.get_string('noresutssearchmsg', 'theme_remui') + '' + '</div>';
                $("#page-search-index #region-main  [role = main]").append(htmldata);
            } else {
                var searchdata = $("#page-search-index  #id_searchcontainer [name=q]").val();
                searchdata = "<div class=' p-mt-2 h-regular-6'>" + M.util.get_string('searchresultdesctext', 'theme_remui') + ' `' + searchdata + '`' + "</div>";
                console.log(searchdata);
                $('#page-search-index  .page-header-headings').append(searchdata);
            }
            $("#page-search-index .search-result-count").detach().prependTo("#page-search-index #region-main");
            $("#page-search-index .search-result-count").removeClass('d-none');

            $(document).on('click', '#page-local-edwiserpagebuilder-editor .header-right-controls .closeeditor', blockediting_feedbackcollection);

            // Add inside registerCommonEvents function

            transparentheaderhanlder();
        },
    };
});
