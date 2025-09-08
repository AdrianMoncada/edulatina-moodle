/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable no-undef */
define([
    'jquery',
    'core/ajax',
    'core/notification',
    'core/modal_factory',
    'core/modal_save_cancel',
    'core/modal_events',
    'core/templates',
    'core/str',
    'local_edwiserpagebuilder/remuiblck/chartjs',
    'local_edwiserpagebuilder/remuiblck/jquery.dataTables',
    'local_edwiserpagebuilder/remuiblck/dataTables.bootstrap4'
], function(
    $,
    ajax,
    Notification,
    ModalFactory,
    ModalSaveCancel,
    ModalEvents,
    Templates,
    Str
) {

    var SELECTORS = {
        ROOT: "",
        VIEW_REPORT: '.epb-view-course-report',
        STATS_TAB: '#wdm-userstats',
        STATS_TABLE: '#userstats-table',
        EXPORT_WRAPPER: '#userstats-table_wrapper .wdm-export-buttons',
        EXPORT: '.wdm-manage-course-export-csv',
        STATS_CHART: '#coursestats-chart',
        STATS_FILTER_INPUT: '#userstats-table_filter input',
        DROPPING_STUDENT_MESSAGE: '.dropping-student-message'
    };

    // ****** IMPORTANT ******
    // Do not change the sequence.
    // If you want to add new strings here, add it at the bottom.
    // Do not remove any string from the array.
    // There is no way we can revert back if sequence is changed.
    // ****** IMPORTANT ******
    const strings = [
        {key: 'studentcompleted', component: 'local_edwiserpagebuilder'},
        {key: 'inprogress', component: 'local_edwiserpagebuilder'},
        {key: 'yettostart', component: 'local_edwiserpagebuilder'},
        {key: 'searchnameemail', component: 'local_edwiserpagebuilder'},
        {key: 'nostudentsenrolled', component: 'local_edwiserpagebuilder'},
        {key: 'exportcsv', component: 'local_edwiserpagebuilder'},
        {key: 'sendmessage', component: 'core_message'},
        {key: 'send', component: 'core_message'},
        {key: 'sendmessageto', component: 'core_message'}
    ];

    var LANGS; // Gloabl variable to store languages.

    // Functionality to fetch strings.
    // Functionality to fetch strings.
    async function fetchLanguages() {
        await Str.get_strings(strings).then(function(results) {
            LANGS = results;
            return results;
        });
    }

    var PROMISES = {
        /**
         * Get course report promise
         * @param  {int} courseid Course id
         * @return {promise}           Ajax promise object
         */
        GET_COURSE_REPORT: function(courseid) {
            return ajax.call([{
                methodname: 'local_edwiserpagebuilder_remuiblck_action',
                args: {
                    action: "get_course_report",
                    config: JSON.stringify({
                        "courseid": courseid
                    })
                }
            }])[0];
        },

        /**
         * Get dropping off students list promise
         * @param {int}     courseid Course id
         * @param {String}  search   Search query
         * @param {int}     length   Number of rows per page
         * @param {int}     start    Starting row number
         * @param {object}  order    Sorting order
         * @return {promise}           Ajax promise object
         */
        GET_DROPPING_OFF_STUDENTS: function(courseid, search, length, start, order) {
            return ajax.call([{
                methodname: 'local_edwiserpagebuilder_remuiblck_action',
                args: {
                    action: "get_dropping_off_students",
                    config: JSON.stringify({
                        "courseid": courseid,
                        "search": search,
                        "length": length,
                        "start": start,
                        "order": order
                    })
                }
            }])[0];
        },

        /**
         * Export dropping off students list promise
         * @param {int}     courseid Course id
         * @param {string}  search   search query
         * @return {promise}           Ajax promise object
         */
        EXPORT_DROPPING_OFF_STUDENTS: function(courseid, search) {
            return ajax.call([{
                methodname: 'local_edwiserpagebuilder_remuiblck_action',
                args: {
                    action: "export_dropping_off_students",
                    config: JSON.stringify({
                        "courseid": courseid,
                        "search": search
                    })
                }
            }])[0];
        },
        /**
         * Send message to student using student id and ajax
         * @param  {Number} studentid   Student id
         * @param  {String} messagetext Message text
         * @return {Promise}            Ajax promise
         */
        SEND_MESSAGE: function(studentid, messagetext) {
            return ajax.call([{
                methodname: 'local_edwiserpagebuilder_remuiblck_action',
                args: {
                    action: "send_message",
                    config: JSON.stringify({
                        "studentid": studentid,
                        "messagetext": messagetext
                    })
                }
            }])[0];
        }
    };

    $('body').on('click', SELECTORS.ROOT + " " + SELECTORS.VIEW_REPORT, function() {
        event.preventDefault();
        var _this = this;
        var trigger = $('#create-modal');
        ModalFactory.create({
            title: $(_this).attr('title')
        }, trigger).done(function(modal) {
            modal.modal.addClass('modal-lg');

            // Destroy when hidden.
            modal.getRoot().on(ModalEvents.hidden, function() {
                modal.destroy();
            }).addClass('fade');

            // Show loading icon till load modal body
            modal.setBody('<i class="fa fa-circle-o-notch fa-spin fa-fw" aria-hidden="true"></i>');

            // Fetch body using ajax request
            PROMISES.GET_COURSE_REPORT($(_this).data('course-id'))
            .done(function(response) {
                response = JSON.parse(response);
                // modal.setBody(response);

                let studentcompletedcolor = response.studentcompletedcolor,
                inprogresscolor = response.inprogresscolor,
                yettostartcolor = response.yettostartcolor;

                Templates.render("local_edwiserpagebuilder/remuiblck/course_report", response).done(function(html, js) {
                    modal.setBody(html);
                    if (modal.getRoot().find(SELECTORS.STATS_CHART).length != 0) {
                        var ctx = modal.getRoot().find(SELECTORS.STATS_CHART)[0].getContext('2d');
                        new Chart(ctx, {
                            type: 'doughnut',
                            data: {
                                labels: [
                                    M.util.get_string('studentcompleted', 'local_edwiserpagebuilder'),
                                    M.util.get_string('inprogress', 'local_edwiserpagebuilder'),
                                    M.util.get_string('yettostart', 'local_edwiserpagebuilder')
                                ],
                                datasets: [{
                                    backgroundColor: [
                                        studentcompletedcolor,
                                        inprogresscolor,
                                        yettostartcolor
                                    ],
                                    data: [
                                        modal.getRoot().find(SELECTORS.STATS_CHART).data('studentcompleted'),
                                        modal.getRoot().find(SELECTORS.STATS_CHART).data('inprogress'),
                                        modal.getRoot().find(SELECTORS.STATS_CHART).data('yettostart')
                                    ]
                                }]
                            },
                            options: {
                                legend: {
                                    display: false
                                }
                            }
                        });
                    }
                });
                
            })
            .fail(Notification.exception);

            // Show modal
            setTimeout(modal.show(), 100);
        });
        return;
    }).on('click', SELECTORS.ROOT + " " + SELECTORS.STATS_TAB, function() {
        if ($(SELECTORS.STATS_TABLE).is('.dataTable')) {
            return;
        }
        $(SELECTORS.STATS_TABLE).DataTable({
            "bPaginate": true,
            "bServerSide": true,
            "language": {
                "searchPlaceholder": M.util.get_string('searchnameemail', 'local_edwiserpagebuilder'),
                "emptyTable": M.util.get_string('nostudentsenrolled', 'local_edwiserpagebuilder')
            },
            "dom": '<"wdm-export-buttons">frtip',
            "initComplete": function(settings, json) {
                $(SELECTORS.EXPORT_WRAPPER).append(
                    "<button class='wdm-manage-course-export-csv btn btn-primary' data-course-id='" + $(this).data('course-id') + "'>" + M.util.get_string(
                        'exportcsv',
                        'local_edwiserpagebuilder'
                    ) + "</button>"
                );
            },
            "ajax": function(data, callback, settings) {
                PROMISES.GET_DROPPING_OFF_STUDENTS(
                    $(this).data('course-id'),
                    data.search.value,
                    data.length,
                    data.start,
                    data.order[0]
                ).done(function(response) {
                    response = JSON.parse(response);
                    callback(response);
                }).fail(Notification.exception);
            },
            "columns": [
                {"className": "pb-0 pt-0", "data": "name"},
                {"className": "pb-0 pt-0", "data": "email"},
                {"className": "pb-0 pt-0", "data": "enroltimestart"},
                {"className": "pb-0 pt-0", "data": "lastaccess"}
            ],
            "rowCallback": function(row, data, index) {
                if (index % 2 == 0) {
                    $(row).addClass('bg-grey-100');
                } else {
                    $(row).addClass('bg-grey-200');
                }
            }
        });
    }).on('click', SELECTORS.ROOT + " " + SELECTORS.EXPORT, function() {
        var _this = this;
        PROMISES.EXPORT_DROPPING_OFF_STUDENTS(
            $(_this).data('course-id'),
            $(SELECTORS.STATS_FILTER_INPUT).val()
        ).done(function(response) {
            response = JSON.parse(response);
            var file = $('<a></a>');
            $('body').append(file);
            $(file).attr('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(response.filedata));
            $(file).attr('download', response.filename).hide()[0].click();
            $(file).remove();
        }).fail(Notification.exception);
    }).on('click', SELECTORS.ROOT + " " + SELECTORS.DROPPING_STUDENT_MESSAGE, function() {
        var _this = this;
        var trigger = $('#create-modal');
        ModalFactory.create({
            type: ModalFactory.types.SAVE_CANCEL,
            title: M.util.get_string('sendmessage', 'core_message')
        }, trigger).done(function(modal) {

            // Set button text as send
            modal.setSaveButtonText(M.util.get_string('send', 'core_message'));

            // Add textarea field in body

            modal.setBody('<label>' + M.util.get_string('sendmessageto', 'core_message', $($(_this).parent('td').siblings()[0]).html()) + '</label><textarea class="form-control message" rows="5" autocomplete="off"></textarea>');

            // Destroy when hidden.
            modal.getRoot().on(ModalEvents.hidden, function() {
                modal.destroy();
            });

            // Send message when save button is clicked
            modal.getRoot().on(ModalEvents.save, function(event) {
                var studentid = $(_this).data('student-id');
                var message = $(this).find('.message').val();
                if (message != '') {
                    PROMISES.SEND_MESSAGE(studentid, message)
                    .done(function(response) {
                        modal.destroy();
                    })
                    .fail(function(ex) {
                        Notification.exception(ex);
                    });
                }
            }).addClass('modal-success fade');
            modal.modal.addClass('modal-center');

            // Show modal
            setTimeout(modal.show(), 100);
        });
    });

    var init = async function(root) {
        await fetchLanguages();
        SELECTORS.ROOT = root;
        $(document).ready(function() {
            $(root).on('click', ".menu-picker-select", function() {
                $(this).find(".menu-content").toggleClass('d-none');
                $(this).find(".showmenuoption").toggleClass('d-none');
                $(this).find(".hidemenuoption").toggleClass('d-none');
            });
        });
    };
    return {
        init: init
    };
});
