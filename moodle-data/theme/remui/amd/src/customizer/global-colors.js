/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
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
 * Theme customizer global-colors js
 * @copyright (c) 2023 WisdmLabs (https://wisdmlabs.com/) <support@wisdmlabs.com>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 * @author    Yogesh Shirsath
 */

import $ from 'jquery';
import Utils from 'theme_remui/customizer/utils';
import ColorUtils from 'theme_remui/customizer/color-utils';
import SmartColor from 'theme_remui/customizer/smartcolor';

// Selectors list.
var SELECTOR = {
    BACKGROUNDCSS: 'global-background-css',
    ASCESNTBG: '[name="global-colors-ascentbackgroundcolor"]',
    SMELEMENTBG: '[name="global-colors-elementbackgroundcolor"]',
    SITECOLOR: '[name="sitecolorhex"]',
    SECONDARY: '[name="secondarycolor"]',
    TEXT: '[name="themecolors-textcolor"]',
    LIGHTBORDER: '[name="themecolors-lightbordercolor"]',
    MEDIUMBORDER: '[name="themecolors-mediumbordercolor"]',
    LINK: '[name="global-typography-body-linkcolor"]',
    LINKHOVER: '[name="global-typography-body-linkhovercolor"]',
    SMART: '[name="smart-colors-button"]',
    BACKGROUNDCHOOSE: '[name="global-colors-pagebackground"]',
    BACKGROUNDCOLOR: '[name="global-colors-pagebackgroundcolor"]',
    BACKGROUNDGRAD1: '[name="global-colors-pagebackgroundgradient1"]',
    BACKGROUNDGRAD2: '[name="global-colors-pagebackgroundgradient2"]',
    BACKGROUNDGRADANGLE: '[name="global-colors-gradient-angle"]',
    BACKGROUNDIMAGE: '[name="global-colors-pagebackgroundimage"]',
    BACKGROUNDIMAGEATTACHMENT: '[name="global-colors-pagebackgroundimageattachment"]'
};

/**
 * Set primary color.
 */
function setPrimaryColor() {
    let color = $(SELECTOR.SITECOLOR).spectrum('get').toString();

    // Default color.
    let content = `.bg-primary,
    .maincalendar .calendarmonth td.today .day-number-circle {
        background-color: ${color} !important;
    }
    .border-primary, .btn-outline-primary {
        border-color: ${color} !important;
    }
    .text-primary, .btn-outline-primary:not(:hover), .activity-add, .block-add,
    .navbar .primary-navigation .nav-link.active,
    .navbar .primary-navigation .nav-link:hover,
    .dropdown.show > .dropdown-toggle,
    .navbar #usernavigation .nav-link:hover,
    .navbar #usernavigation .dropdown-toggle:hover,
    .breadcrumb .breadcrumb-item a:not(.edg-grader-breadcrumbs a),
    .edw-tabs-navigation .nav-tabs .nav-item .nav-link.active,
    .edw-tabs-navigation .nav-tabs .nav-item .nav-link:hover,
    .edw-tabs-navigation .nav-tabs .nav-item .nav-link:focus,
    #manage_courses .filters .display-filter li a.active,
    .dataTables_paginate .pagination .paginate_button.active .page-link,
    .all-filter-wrapper .nav-display-selector-wrapper .nav-display-selector .nav .nav-item .nav-link [aria-current="true"],
    #course-archive-main-container .filters-wrapper .btn-group a.btn-primary .edw-icon,
    .block-myoverview [data-region="filter"] .nav-tabs .nav-grouping-selector .nav li.nav-item [aria-current="true"],.users-list-name,.color-primary {
        color: ${color} !important;
    }
    .navbar .primary-navigation .nav-link.active::before,
    .edw-tabs-navigation .nav-tabs .nav-item .nav-link.active::before,
    .block-myoverview [data-region="filter"] .nav-grouping-selector .nav li.nav-item [aria-current="true"]::after {
        border-bottom-color: ${color} !important;
    }
    .navbar-item-container .navitem.active .course-count{
      background-color: ${color} !important;
    }
    .navbar-item-container .navitem.active .course-count,.cnc-navbar-carousel.navbar-carousel .navbar-inner .navbar-item-container .navitem.active,
    .border-color-primary{
        border-color: ${color} !important;
    }
    #theme_remui-drawers-courseindex .drawercontent #courseindex #courseindex-content .courseindex .courseindex-section .courseindex-section-title,.que .formulation{
        background-color:${ColorUtils.tint(color, 90)} !important;
    }
    #theme_remui-drawers-courseindex .drawercontent #courseindex #courseindex-content .courseindex .courseindex-section,.que .formulation{
        border-color: ${ColorUtils.tint(color, 70)} !important;
    }
    `;

    // Shades and Tints.
    content += `
        .alert-primary {
            color: ${ColorUtils.shade(color, 48)} !important;
            background-color: ${ColorUtils.tint(color, 80)} !important;
            border: ${ColorUtils.tint(color, 72)} !important;
        }
        .activity-add, .block-add {
            border-color: ${ColorUtils.tint(color, 16)} !important;
            background-color: ${ColorUtils.tint(color, 96)} !important;
        }
    `;
    Utils.putStyle('sitecolor-css', content);
}

/**
 * Set link color.
 */
function setLinkColor() {
    let color = $(SELECTOR.LINK).spectrum('get').toString();
    let hoverColor = $(SELECTOR.LINKHOVER).spectrum('get').toString();

    // Default color.
    let content = `
    a:not(.btn):not(.nav-link):not(.page-link):not(.badge-primary a):not(.panel-action):not(#page-footer a):not(.quick-menu-nav a):not(#edw-quick-menu a ):not(.category-link):not(.dropdown-item){
        color: ${color};
    }
    a:not(.btn):not(.nav-link):not(.page-link):not(.badge-primary a):hover:not(.panel-action):not(#page-footer a):not(.quick-menu-nav a):not(#edw-quick-menu a ):not(.category-link):not(.dropdown-item){
        color: ${hoverColor};
    }`;

    Utils.putStyle('site-linkcolor-css', content);
}

/**
 * Set secondary color.
 */
function setSecondaryColor() {
    let color = $(SELECTOR.SECONDARY).spectrum('get').toString();

    // Default color.
    let content = `
    .bg-secondary, .badge-secondary,
    .message-app .contact-status {
        background-color: ${color} !important;
    }
    .border-secondary {
        border-color: ${color} !important;
    }
    .text-secondary,
    .dashboard-card .course-info-container .edw-card-design-hd span.categoryname.small-info-regular,
    .edw-stats-wrapper .stat-block .inner .edw-icon,
    .edw-stats-wrapper .stat-block .inner .edw-icon,
    .courseindex-item-content .courseindex-item .edw-section-content-wrapper .completioninfo .icon.fa-circle {
        color: ${color} !important;
    }

    `;

    // Shades and Tints.
    content += `
        .alert-secondary {
            color: ${ColorUtils.shade(color, 48)} !important;
            background-color: ${ColorUtils.tint(color, 80)} !important;
            border: ${ColorUtils.tint(color, 72)} !important;
        }
    `;
    Utils.putStyle('secondary-css', content);
}

/**
 * Handle site text color.
 */
function handleTextColor() {
    let color = $(SELECTOR.TEXT).spectrum('get').toString();
    Utils.putStyle('body-text-color', `
        body,
        .bootstrap-select .show .dropdown-menu  li  a,
        .nav-item .nav-link .fp-repo-name,
        .text-paragraph,
        .nav ol .breadcrumb .breadcrumb-item span,
        ul.dragdrop-keyboard-drag,
        .coursesummary,.coursesummary,.category-description-wrapper,
        #course-archive-main-container .filters-wrapper  .course-counter,
        .bootstrap-select.btn-group .dropdown-menu li a,
        [aria-controls="moreactionsmenu"],
        .cards-pagination .pagination ul .page-item .page-link,
        .course-instructors,
        .progress-data-wrapper,
        .progress-text:not(.single-card .progress-text),
        .edw-card-design-bd .summary,
        .courseindex-sectioncontent .courseindex-item,
        .pricing-section .bottom .list-item-group .list-item .sub-label,
        .details,
        .frontpage-sections #edwiser-aboutus .heading .desc,
        .edw-msg-panel-badge,
        .view-overview-body .tab-body-container .nav-item,
        .contact-list-wrapper .contact-list-tab .nav-item .nav-link,
        .msg-panel-setting-wrapper,
        [data-region="confirm-dialogue-container"],
        [data-region="text-container"],
        .list-group-item .chat-content-text,
        #page-user-profile .nav-tabs .nav-link,
        .nav-grouping-selector .nav li.nav-item .nav-link,
        .edw-search-form-wrapper .input-group-prepend .form-control,
        .form-label-color,
        .pagelayout-incourse .time_circles>div>h4,
        .pagelayout-incourse  .time_circles>div>span,
        .popover-body .footer-section,
        table tbody td,
        table tbody td a,
        table tbody th,
        .editor_atto_notification .atto_info,
        .editor_atto_notification .atto_warning,
        .feature-box__text,
        .fp-repo-items-container .fp-filename,
        .fp-pathbar .fp-path-folder-name,
        .fp-toolbar .btn-label,
        .fp-fileinfo div,
        .nav-tabs .nav-item  .nav-link:not(.active):not(:hover):not(:focus):not(.nav-display-selector .nav-link),
        .edw-tabs-navigation .nav-tabs .nav-item .nav-link:not(.active):not(:hover):not(:focus),
        tr.yui3-calendar-row .yui3-calendar-day,
        .moodle-dialogue-bd ul.dragdrop-keyboard-drag li,
        .yui3-widget-bd,
        nav ol.breadcrumb .breadcrumb-item span:not(.edg-grader-breadcrumbs span),
        .checkbox-label,
        .text-paragraph,
        .nav .nav-tabs-bleft .nav-item .fp-repo-name,
        .remblk-course-startdate,
        .rmblck-card-body .course-summary,
         #manage_courses .pagination-wrapper,
        .pagination-wrapper label,
        .each-stats-wrapper .rmblck-grade-label,
        .dataTables_length label,
        #DataTables_Teacher_filter label,
        .course-progress-settings .form-check .form-check-label,
        .dataTables_info,
        .paging_simple_numbers .pagination .paginate_button:not(.disabled):not(:active),
        #enrolled_users_stats_block label,
        .chart-legend .list-group-item,
        #latest_members .user-info-wrapper .user-designation,
        .select-note-course-label,
        .select2-studentlist-label,
        .progress-percent,
        .block_remuiblck #recentfeedback .text-info,
        .edw-form-label,
        .profile-general-content-wrapper .user-desc,
        .edw-paragraph-color,
        .userselector #reportuser option,
        #userselector_options_inner .form-check-label,
        #page-admin-roles-check [role='main'] ul li,
        #page-admin-roles-check [role='main'] ul li a{
            color: ${color} !important;
        }
        .text-body {
            color: ${color} !important;
        }
        .header-panel  .panel-left .profile-group .profile-info .profile-status,
        .messager-info .time,
        [data-region="send-message-txt"],
        [data-region="last-message-date"],
        .content-item-container .content-item-footer,
        .yui3-calendar-prevmonth-day,
        .color-font-small,
        .small-info-regular,
        .small-info-semibold:not(.instructorscount):not(.lesson-count):not(.updated-date):not(.paymentmethodcount):not(.enrolled-users-count):not(.edw-card-design-hd .categoryname),
        #latest_members .user-info-wrapper .users-list-date,.item-due-date,.rating-short-design .rnr-link,.rating-short-design .avgrating{
            color:  ${ColorUtils.tint(color, 15)} !important;
        }
        .small-info-regular.avgratingstat{
            color:white !important;
        }
    `);
}

/**
 * Handle light border color.
 */
function handleLightBorderColor() {
    let color = $(SELECTOR.LIGHTBORDER).spectrum('get').toString();
    let content = `
        #page-course-view-topics .course-content ul.topics li.section,
        #page-course-view-topics .course-content ul.weeks li.section,
        #page-course-view-topics .course-content ul.topics li.section .activity.activity-wrapper .activity-item,
        #page-course-view-topics .course-content ul.weeks li.section .activity.activity-wrapper .activity-item,
        #course-archive-main-container .edw-course-card-grid .edw-card-design-ft .ft-lock-icon,
        #course-archive-main-container .edw-course-list .edw-card-design-ft .ft-lock-icon,
        #course-archive-main-container .filters-wrapper .bootstrap-select.btn-group li a:hover,
        #course-archive-main-container .filters-wrapper .dropdown-menu li:hover,
        .edw-course-summary-container .edw-course-list,
        .edw-course-list-container .edw-course-list,
        .dashboard-card,
        #page-enrol-index .enrollment-sections .section .divider,
        #page-login-forgot_password .mform #fitem_id_username2 .form-control-static,
        .fp-iconview .fp-thumbnail:hover,
        .fp-select .fp-thumbnail img,
        .yui3-skin-sam .yui3-calendar-content,
        .dropdown-menu,
        .popover-region-container,
        .popover,
        .edw-search-field .input-group,
        .table-bordered,
        .table-bordered th,
        .table-bordered td,
        .table .thead-light th,
        .course-content .section-summary,
        .path-grade-report-grader .gradeparent table,
        .path-grade-report-grader .gradeparent .cell,
        .admin_colourpicker .colourdialogue,
        .admin_colourpicker .previewcolour,
        .admin_colourpicker .currentcolour,
        .form-autocomplete-suggestions,
        .simplesearchform .btn-submit,
        .filepicker-filelist,
        .filemanager-container,
        .input-group-text,
        .custom-file-label ,
        .rmblk-card,
        .rmblk-list,
        .rmblk-summary,
        .block_remuiblck .coursemenubtn,
        .modal-body .default-blocks-wrapper .card .card-body,
        .epb_custom_modal .default-blocks-wrapper .advanceblockblocks .card-body,
        .fullwidth-modal .modal-body .default-blocks-wrapper.grid-view .card-wrapper,
        #page-search-index .page-context-header,.rolecap,.userselector #reportuser
        {
            border-color: ${color} !important;
        }
        @media print {
            .table-dark th,
            .table-dark td,
            .table-dark thead th,
            .table-dark tbody + tbody,
            .table .thead-dark th {
                border-color: ${color} !important;
            }
        }
        .message-app .body-container .msg-panel-setting-wrapper .msg-setting-privacy-wrapper,
        .message-app .body-container .msg-panel-setting-wrapper .msg-notification-preference-wrapper,
        .message-app .body-container .msg-panel-setting-wrapper .general-setting-wrapper,
        .message-app .view-conversation,
        .message-app .footer-container [data-region="content-messages-footer-container"],
        table.generaltable tbody td,
        table.generaltable tbody th,
        table.dataTable tbody td,
        table.dataTable tbody th,
        .filemanager .fp-info,
        .popover-region-footer-container,
        .table th,
        .table td,
        .table tbody + tbody,
        .path-grade-report-grader .gradeparent tr.lastrow th,
        .path-grade-report-grader .gradeparent tr.lastrow td,
        .modal-footer,.rolecap tbody th,.rolecap tbody td,
        .category-wrapper > *:not(:first-child) {
            border-top-color: ${color} !important;
        }
        #block-region-side-pre .block,
        .popover.footer .popover-body .footer-section:not(:last-child),
        .popover-region-header-container,
        .content-item-container,
        .table thead th,
        .section li.activity:not(.activity-wrapper).hasinfo,
        .course-content ul li.section.main:not(.course-section),
        .mform fieldset,
        .modal-header,
        .moodle-dialogue .moodle-dialogue-content.moodle-dialogue-wrap .moodle-dialogue-hd.yui3-widget-hd,
        section#region-main .maincalendar tr:not(:last-child) td, aside:not(#block-region-side-pre) .maincalendar tr:not(:last-child) td,
        .quiz-overview-body-ft,
        #scheduletask .filters,
        .quiz-list-wrapper,
        .fullwidth-modal .modal-body .default-blocks-wrapper.list-view .card,
        .edw-timeline-event-list-item,.rolecap tbody th,.rolecap tbody td{
            border-bottom-color: ${color} !important;
        }
        table.generaltable tbody td,
        table.generaltable tbody th,
        table.dataTable tbody td,
        table.dataTable tbody th,
        section#region-main .maincalendar td:not(:last-child), aside:not(#block-region-side-pre) .maincalendar td:not(:last-child) ,.rolecap tbody th,.rolecap tbody td{
            border-right-color: ${color} !important;
        }
        .filemanager .fp-repo-items-container,
        .filepicker .fp-repo-items-container {
            border-left-color: ${color} !important;
        }

        .login-identityproviders .login-heading:before,
        .login-identityproviders .login-heading:after {
            color: ${color} !important;
        }
    `;
    Utils.putStyle('body-light-border-color', content);
}

/**
 * Handle medium border color.
 */
function handleMediumBorderColor() {
    let color = $(SELECTOR.MEDIUMBORDER).spectrum('get').toString();
    let content = `
        .cards-pagination .pagination ul .page-item .page-link #course-archive-main-container,
        .calendarmonth ul li a,
        .each-stats-wrapper{
            border-color: ${color} !important;
        }
        #course-archive-main-container .filters-wrapper,
        .block-myoverview .nav-grouping-selector,
        .edw-tabs-navigation,
        #adminsettings .box.generalbox.formsettingheading p{
            border-bottom-color: ${color} !important;
        }
        .accordion-list-group li.accordion-list-item.accordion-bb:not(:first-of-type),
        hr:not(#page-footer hr) {
            border-top-color: ${color} !important;
        }
        table.dataTable thead tr th,
        table.generaltable thead tr th,
        section#region-main .maincalendar th:not(:last-child),
        aside:not(#block-region-side-pre) .maincalendar th:not(:last-child),
        .rolecap thead th,.rolecap thead td{
            border-right-color: ${color} !important;
        }

        .epb_custom_modal .advancedblocktab .left-sidebar .left-sidebar-mid-region .block-category-list-desktop .category-list-item:hover .category-link,
        .epb_custom_modal .advancedblocktab .left-sidebar .left-sidebar-mid-region .block-category-list-desktop .category-list-item.active .category-link
        {
            background-color: ${color} !important;
        }
    `;
    Utils.putStyle('body-medium-border-color', content);
}

/**
 * Handle background color.
 */
function handleBackgroundColor() {
    let color = $(SELECTOR.BACKGROUNDCOLOR).spectrum('get').toString();
    Utils.putStyle(SELECTOR.BACKGROUNDCSS, `
        #page ,
        .block_remuiblck #latestmembers .panel-body #latest_members .users-list .list-inline-item,
        .block_remuiblck #courseanlytics .panel-body #quiz_overview .quiz-overview-body #course-stats .each-stats-wrapper{
            background: ${color} !important;
        }
    `);
}

/**
 * Handle background gradient color.
 */
function handleBackgroundGradient() {
    let color1 = $(SELECTOR.BACKGROUNDGRAD1).spectrum('get').toString();
    let color2 = $(SELECTOR.BACKGROUNDGRAD2).spectrum('get').toString();
    let angle = $(SELECTOR.BACKGROUNDGRADANGLE).val();
    Utils.putStyle(SELECTOR.BACKGROUNDCSS, `
        #page {
            background: linear-gradient(${angle}deg, ${color1}, ${color2}) !important;
        }
    `);
}

/**
 * Handle background image.
 */
function handleBackgroundImage() {
    let itemid = $(SELECTOR.BACKGROUNDIMAGE).val();
    let attachment = $(SELECTOR.BACKGROUNDIMAGEATTACHMENT).val();
    Utils.getFileURL(itemid).done(function(response) {
        if (response == '') {
            response = M.cfg.wwwroot + '/theme/remui/pix/placeholder.png';
        }

        Utils.putStyle(SELECTOR.BACKGROUNDCSS, `
                    #page {
                        background: url('${response}') !important;
                        background-attachment: ${attachment} !important;
                        background-position: top;
                        background-size: ${attachment == 'fixed' ? 'cover' : 'auto'};
                    }
                `);
    });
}

/**
 * Switch background type.
 */
function handleBackground() {
    $(`
        ${SELECTOR.BACKGROUNDCOLOR},
        ${SELECTOR.BACKGROUNDGRAD1},
        ${SELECTOR.BACKGROUNDGRAD2},
        ${SELECTOR.BACKGROUNDGRADANGLE},
        ${SELECTOR.BACKGROUNDIMAGE},
        ${SELECTOR.BACKGROUNDIMAGEATTACHMENT}
    `).closest('.setting-item').addClass('d-none');
    switch ($(SELECTOR.BACKGROUNDCHOOSE).val()) {
        case 'color':
            $(SELECTOR.BACKGROUNDCOLOR).closest('.setting-item').removeClass('d-none');
            handleBackgroundColor();
            break;
        case 'gradient':
            $(`${SELECTOR.BACKGROUNDGRAD1}, ${SELECTOR.BACKGROUNDGRAD2}, ${SELECTOR.BACKGROUNDGRADANGLE}`)
                .closest('.setting-item').removeClass('d-none');
            handleBackgroundGradient();
            break;
        case 'image':
            $(`${SELECTOR.BACKGROUNDIMAGE}, ${SELECTOR.BACKGROUNDIMAGEATTACHMENT}`)
                .closest('.setting-item').removeClass('d-none');
            handleBackgroundImage();
            break;
    }
}

/**
 * Handle ascent background color.
 */
function handleAscentColor() {
    let color = $(SELECTOR.ASCESNTBG).spectrum('get').toString();
    let content = `
        .badge-primary:not(.single-card .badge-primary) {
            background-color: ${color} !important;
            color:white !important;
        }
        .badge-primary:hover,.badge-primary a:not(.single-card .badge-primary):hover{
            color:white !important;
        }
    `;
    Utils.putStyle('global-ascent-color', content);
}
/**
 * Handle Small element background color.
 */
function handleSmallementColor() {
    let color = $(SELECTOR.SMELEMENTBG).spectrum('get').toString();
    let content = `
        .edw-msg-panel-badge,
        .drawer.drawer-left .drawercontent .list-group .list-group-item.active,
        .drawer.drawer-left .drawercontent .list-group .list-group-item:focus,
        .drawer.drawer-left .drawercontent .list-group .list-group-item:hover,
        #fitem_id_username2 .form-control-static,
        .message-app .view-conversation .content-message-container [data-region="day-messages-container"] .received [data-region="text-container"],
        .message-app .view-conversation .content-message-container [data-region="day-messages-container"] .send [data-region="text-container"],
        .dashboard-card .course-info-container .edw-card-design-hd .instructorscount,
        .dropdown-item[aria-current="true"],
        .dropdown-item.active,
        .dropdown-item:hover,
        .badge-light,
        section#region-main .maincalendar th, aside:not(#block-region-side-pre) .maincalendar th,
        div.editor_atto_toolbar,
        table thead th,
        table thead tr,
        .node_category .lead,
        .badges-container .badges-container-heading,
        .fullwidth-modal .modal-header,.edw-card-design-hd .categoryname,.paymentmethodcount,
        .epb_custom_modal .advancedblocktab .left-sidebar .edw-tabs-navigation.edwiser-custom-blocks-nav .nav .nav-item .nav-link.active,
        .epb_custom_modal .advancedblocktab .left-sidebar,
        .epb_custom_modal .advancedblocktab .left-sidebar .static-block.html .card-item .card,
        .epb_custom_modal .advancedblocktab .left-sidebar .left-sidebar-mid-region  {
            background-color: ${color} !important;
        }
    `;
    Utils.putStyle('global-colors-elementbackgroundcolor', content);
}

/**
 * Apply settings.
 */
function apply() {
    setPrimaryColor();
    setSecondaryColor();
    setLinkColor();
    handleBackground();
    handleTextColor();
    handleLightBorderColor();
    handleMediumBorderColor();
    handleAscentColor();
    handleSmallementColor();
}

/**
 * Initialize events.
 */
function init() {
    // Use smart color utility to calculate and apply js.
    $(SELECTOR.SMART).on('click', SmartColor.apply);

    // Site color.
    $(SELECTOR.SITECOLOR).on('color.changed', setPrimaryColor);

    // Handle secondary color.
    $(SELECTOR.SECONDARY).on('color.changed', setSecondaryColor);

    // Handle text color.
    $(SELECTOR.TEXT).on('color.changed', handleTextColor);

    // Handle border color.
    $(SELECTOR.LIGHTBORDER).on('color.changed', handleLightBorderColor);
    $(SELECTOR.MEDIUMBORDER).on('color.changed', handleMediumBorderColor);

    // Handle ascent color.
    $(SELECTOR.ASCESNTBG).on('color.changed', handleAscentColor);

    // Handle Small element color.
    $(SELECTOR.SMELEMENTBG).on('color.changed', handleSmallementColor);

    // Link color.
    $(`${SELECTOR.LINK}, ${SELECTOR.LINKHOVER}`).on('color.changed', setLinkColor);

    // Background change.
    $(SELECTOR.BACKGROUNDCHOOSE).on('input', handleBackground);

    // Handle background color.
    $(SELECTOR.BACKGROUNDCOLOR).on('color.changed', handleBackgroundColor);

    // Handle background gradient.
    $(`${SELECTOR.BACKGROUNDGRAD1}, ${SELECTOR.BACKGROUNDGRAD2}`).on('color.changed', handleBackgroundGradient);
    $(SELECTOR.BACKGROUNDGRADANGLE).on('input', handleBackgroundGradient);

    // Background image observer.
    Utils.fileObserver($(SELECTOR.BACKGROUNDIMAGE).siblings('.filemanager')[0], handleBackground);

    // Handle background attachment.
    $(`${SELECTOR.BACKGROUNDIMAGEATTACHMENT}`)
        .on('input', handleBackgroundImage);
}

export default {
    init,
    apply
};
