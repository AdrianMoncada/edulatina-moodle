/* eslint-disable no-console */
/* eslint-disable no-dupe-keys */
/* eslint-disable camelcase */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable no-empty-function */
/* eslint-disable promise/catch-or-return */
/* eslint-disable promise/always-return */
/* eslint-disable no-undef */
define([
    'jquery',
    'core/ajax',
    'core/notification',
    'core/templates',
    'core/modal_factory',
    'core/modal_events',
    'core/str',
    'core_user/repository',
    'core/modal_save_cancel',
    'local_edwiserpagebuilder/remuiblck/dataTables.bootstrap4',
    'local_edwiserpagebuilder/remuiblck/jquery-asPieProgress',
    'local_edwiserpagebuilder/remuiblck/aspieprogress'
], function(
    $,
    Ajax,
    Notification,
    Templates,
    ModalFactory,
    ModalEvents,
    Str,
    UserRepository
) {
    var SELECTORS = {
        ROOT: '',
        TABLE: '#DataTables_Teacher',
        DATA_TABLE: '#DataTables_Teacher_wrapper',
        STUDENT_PROGRESS_ELEMENT: '.student_progress_ele',
        STUDENT_PROGRESS_TABLE: '#wdmCourseProgressTable',
        COURSE_NAME: '.wdm_course_name.has-student',
        MESSAGE_HIDDEN: '#messageidhidden',
        MESSAGE_AREA: '#messagearea',
        TOGGLE_DESCRIPTION: '.epb-toggle-desc',
        REVERT: '#courserevertbtn',
        CUSTOM_MESSAGE: '.custom-message',
        MESSAGE_SEND: '.send-message',
        BLOCK_PROCESSING: '.block-processing',
        ALWAYS_LOAD: '#always-load-progress',
        COURSE_PROGRESSING: '.course-progress-settings',
        LOAD_COURSE_PROGRESS: '#load-progress',
        PANEL: '.panel',
        PANEL_HEADING: '.panel-heading',
        PANEL_ACTIONS: 'panel-actions',
        STUDENT_PROOGRESS_VISIBLE: 'student-progress-visible',
        DATATABLE_HEADER: "#datatable_header"
    };

    var LANGS; // Gloabl variable to store languages.

    // ****** IMPORTANT ******
    // Do not change the sequence.
    // If you want to add new strings here, add it at the bottom.
    // Do not remove any string from the array.
    // There is no way we can revert back if sequence is changed.
    // ****** IMPORTANT ******
    const strings = [
        {key: 'searchforcourses', component: 'local_edwiserpagebuilder'},
        {key: 'datatableinfo', component: 'local_edwiserpagebuilder'},
        {key: 'search', component: 'local_edwiserpagebuilder'},
        {key: 'alwaysload', component: 'local_edwiserpagebuilder'},
        {key: 'alwaysloadwarning', component: 'local_edwiserpagebuilder'},
        {key: 'nomatchingcourses', component: 'core_backup'},
        {key: 'show', component: 'moodle'},
        {key: 'entries', component: 'moodle'},
    ];

    // Functionality to fetch strings.
    async function fetchLanguages() {
        await Str.get_strings(strings).then(function(results) {
            LANGS = results;
            return results;
        });
    }

    // Data object to store local data
    var DATA = {
        coursesTable: [],
        alwaysloadwarning: false
    };

    var PROMISES = {
        /**
         * Get courses using ajax
         * @param  {String}  search Search query
         * @param  {Number}  length Number of courses
         * @param  {Number}  start  Start index of courses
         * @param  {Array}   order  Sorting order
         * @param {int} loadProgress
         * @return {Promise}        Ajax promise
         */
        GET_COURSES: function(search, length, start, order, loadProgress) {
            return Ajax.call([{
                methodname: 'local_edwiserpagebuilder_remuiblck_action',
                args: {
                    action: "get_course_progress_list",
                    config: JSON.stringify({
                        "search": search,
                        "length": length,
                        "start": start,
                        "order": order,
                        "loadprogress": loadProgress
                    })
                }
            }])[0];
        },
        /**
         * Get course progress using course id and ajax
         * @param  {Number}  courseid Course id
         * @return {Promise}          Ajax promise
         */
        GET_COURSE_PROGRESS: function(courseid) {
            return Ajax.call([{
                methodname: 'local_edwiserpagebuilder_remuiblck_action',
                args: {
                    action: "get_course_progress",
                    config: JSON.stringify({
                        "courseid": courseid
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
            return Ajax.call([{
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

    /**
     * Generate teacher courses table data from ajax response
     * @param  {Array}  courses Courses list with course details
     * @return {Object}         Data object
     */
    function generate_courses_table_data(courses) {
        var data = [];
        courses.forEach(function(course) {
            var dData = {};
            dData.index = '<div class="w-50" tabindex="0">' + course.index + '</div>';
            if (course.enrolledStudents > 0) {
                dData.course = '<div class="wdm_course_name has-student" data-courseid="' + course.id + '"><a href="javascript:void(0)">' + course.fullname + '</a></div>';
            } else {
                dData.course = '<div class="wdm_course_name" data-courseid="' + course.id + '" >' + course.fullname + '</div>';
            }
            dData.startdate = course.startdate;
            dData.students = '<div class="w-100"><span class="w-full pl-40">' + course.enrolledStudents + '</span></div>';
            if (course.percentage == -1) {
                dData.progress = '';
            } else {
                dData.progress = '<td class="w-100 px-10"><div class="pie-progress pie-progress-xs m-0 w-35" data-plugin="pieProgress" data-valuemax="50" data-barcolor="#11c26d" data-size="20" data-barsize="3" data-goal="35" aria-valuenow="' + course.percentage + '" role="progressbar" style="max-width: 35px!important;"><div class="pie-progress-content" style="z-index:2;"> </div> <span class=" progress-percent" style="margin-left: 50px;position: absolute;top: 8px;">' + course.percentage + '%</span> </div></td>';
            }
            data.push(dData);
        });
        return data;
    }

    //* ****************
    // This is code is for table creation on dashboard
    // this code also toggles between course progress and student progress table
    // Function createDatatable() creates course progress table
    /**
     * @param {DOM} root
     */
    function createDatatable(root, uniqid) {
        DATA.coursesTable[uniqid] = $(root).show().find(SELECTORS.TABLE).DataTable({
            "paging":   true,
            "pagingType": "simple_numbers",
            "autoWidth": true,
            "scrollX": true,
            "bPaginate": true,
            "bServerSide": true,
            language: {
                searchPlaceholder: M.util.get_string('searchforcourses', 'local_edwiserpagebuilder'),
                emptyTable: M.util.get_string('nomatchingcourses', 'core_backup'),
                lengthMenu: M.util.get_string('show', 'moodle') + " _MENU_ " + M.util.get_string('entries', 'moodle'),
                info: M.util.get_string('datatableinfo', 'local_edwiserpagebuilder'),
                search: M.util.get_string('search', 'local_edwiserpagebuilder') + ':',
                paginate: {
                    // First: M.util.get_string('first', 'moodle'),
                    // previous: M.util.get_string('previous', 'moodle'),
                    // next: M.util.get_string('next', 'moodle'),
                    // last: M.util.get_string('last', 'moodle')
                    first: "<span class='edw-icon fa fa-angle-left'></span>",
                    previous: "<span class='edw-icon fa fa-angle-left'></span>",
                    next: "<span class='edw-icon fa fa-angle-right'></span>",
                    last: "<span class='edw-icon fa fa-angle-right'></span>",
                },
            },
            "ajax": function(data, callback, settings) {
                $(root).find(SELECTORS.BLOCK_PROCESSING).addClass('show');
                let loadCourseProgress = $(root + ' ' + SELECTORS.COURSE_PROGRESSING).is('.load-progress');
                PROMISES.GET_COURSES(
                    data.search.value,
                    data.length,
                    data.start,
                    data.order[0],
                    loadCourseProgress
                ).done(function(response) {
                    response = JSON.parse(response);
                    if (response.recordsTotal == 0) {
                        response.data = [];
                        callback(response);
                        $(root).find(SELECTORS.BLOCK_PROCESSING).removeClass('show');
                        return;
                    }
                    response.data = generate_courses_table_data(response.courses);
                    callback(response);
                    $(root).find(SELECTORS.BLOCK_PROCESSING).removeClass('show');
                }).fail(Notification.exception);
            },
            columns: [
                {data: "index"},
                {data: "course"},
                {data: "startdate"},
                {data: "students", "orderable": false},
                {data: "progress", "orderable": false}
            ],
            responsive: true,
            drawCallback: function(settings) {
                createPieProgress('', root);
                $(DATA.coursesTable[uniqid].table().header()).addClass('h-semibold-6');
            }
        });
    }


    /**
     * Create pie progress where div with .pie-progress class is present
     * @param {String} target
     */
    function createPieProgress(target, root) {
        var element = $(root);
        if (target != '') {
            element = element.find(target);
        }
        element.find('.pie-progress').asPieProgress({
            namespace: 'pie-progress',
            speed: 30,
            classes: {
                svg: 'pie-progress-svg',
                element: 'pie-progress',
                number: 'pie-progress-number',
                content: 'pie-progress-content'
            }
        });
    }

    var courseProgressTable;
    /**
     * Fetch students course progress data using ajax and display in table format
     * @param  {int} courseid Course id
     */
    function getCourseProgressData(courseid, root) {
        $(root).find(SELECTORS.BLOCK_PROCESSING).addClass('show');
        PROMISES.GET_COURSE_PROGRESS(courseid).done(function(response) {
            response = JSON.parse(response);
            Templates.render('local_edwiserpagebuilder/remuiblck/course_progress_view', response)
            .done(function(html, js) {
                $(root).find(SELECTORS.DATA_TABLE).hide();
                Templates.replaceNodeContents($(root).find(SELECTORS.STUDENT_PROGRESS_ELEMENT), html, js);
                createPieProgress(SELECTORS.STUDENT_PROGRESS_ELEMENT, root);
                courseProgressTable = $(root).find(SELECTORS.STUDENT_PROGRESS_TABLE).DataTable({
                    "scrollY":        "300px",
                    "scrollCollapse": true,
                    "paging": false,
                    "retrieve": true,
                    "lengthchange": false,
                    "autoWidth": true,
                    "scrollX": true,
                    "search": "Fred",
                    "info": false,
                    language: {
                        searchPlaceholder: "Search"
                    },
                    responsive: true,
                });

                $(root).find('div.dataTables_filter input').addClass('form-control');
                $(root).find('div.dataTables_length select').addClass('form-control');

                $(root).addClass(SELECTORS.STUDENT_PROOGRESS_VISIBLE);
                $(root).find(SELECTORS.BLOCK_PROCESSING).removeClass('show');

                $('html, body').animate({
                    scrollTop: $(root).offset().top - 120
                }, 300);
            })
            .fail(function() {
            });
        }).fail(function() {
            $(root).find('div#analysis-chart-area').hide();
        });

    }

    /**
     * Send message to user
     * @param  {int}    studentid Student id
     * @param  {string} message   Text message
     */
    function sendMessageToUser(studentid, message, root) {
        PROMISES.SEND_MESSAGE(studentid, message)
        .done(function() {
            clearModalFields(root);
            $(root).find('.close-message').click();
        })
        .fail(function(ex) {
            Notification.exception(ex);
            $(root).find('div#analysis-chart-area').hide();
        });
    }

    /**
     * Clear message modal field
     */
    function clearModalFields(root) {
        $(root).find(SELECTORS.MESSAGE_HIDDEN).val('');
        $(root).find(SELECTORS.MESSAGE_AREA).val('');
    }

    /**
     * Toggle always load course progress preference
     * @param {Boolean} checked If checked course progress will be loaded always
     */
    function toggleAlwaysLoading(checked, root, uniqid) {
        if (typeof rmblckmdlrelease !== 'undefined' && rmblckmdlrelease < '4.3') {
            M.util.set_user_preference('always-load-progress', checked);
        } else {
            UserRepository.setUserPreference('always-load-progress', checked);
        }
        $(root).find(SELECTORS.COURSE_PROGRESSING).toggleClass('always-loading', checked);
        $(root).find(SELECTORS.COURSE_PROGRESSING).toggleClass('load-progress', checked);
        DATA.coursesTable[uniqid].draw();
        // DATA.coursesTable[uniqid].draw(false);
        // $(root).show().find(SELECTORS.TABLE).DataTable().draw();
    }

    /**
     * Initialze events for course progress block
     * @param  {String} root Root container id.
     */
    function initializeEvents(root, uniqid) {
        // Destroy the table and send ajax request
        $('body').on('click', root + ' ' + SELECTORS.COURSE_NAME, function() {
            var courseid = $(this).data('courseid');
            // TeacherViewTable.destroy();
            getCourseProgressData(courseid, root);
        })

        // Restore the previous table
        .on('click', root + ' ' + SELECTORS.REVERT, function() {
            courseProgressTable.destroy();
            $(root).find(SELECTORS.STUDENT_PROGRESS_ELEMENT).empty();
            $(root).find(SELECTORS.DATA_TABLE).show();
            $(root).removeClass(SELECTORS.STUDENT_PROOGRESS_VISIBLE);
            $('html, body').animate({
                scrollTop: $(root).offset().top - 120
            }, 300);
        })

        // This block opens modal and sends message to user
        .on('click', root + ' ' + SELECTORS.CUSTOM_MESSAGE, function() {
            var studentid = $(this).data('studentid');
            $(SELECTORS.MESSAGE_HIDDEN).val(studentid);
        })

        // Send message
        .on('click', root + ' ' + SELECTORS.MESSAGE_SEND, function() {

            var studentid = $(root).find(SELECTORS.MESSAGE_HIDDEN).val();
            var message = $(root).find(SELECTORS.MESSAGE_AREA).val();
            if (message != '') {
                sendMessageToUser(studentid, message, root);
            } else {
                $(SELECTORS.MESSAGE_AREA).focus();
            }
        })

        // Toggle description of student progress
        .on('click', root + ' ' + SELECTORS.TOGGLE_DESCRIPTION, function() {
            $(this).toggleClass('fa-plus');
            $(this).toggleClass('fa-minus');
            $(this).parents(SELECTORS.STUDENT_PROGRESS_ELEMENT).find('.panel-body').toggleClass('show');
        })

        // Enable course progress always loading
        .on('change', root + ' ' + SELECTORS.ALWAYS_LOAD, function() {
            var checkbox = $(this);
            var checked = $(this).is(':checked');
            if (!DATA.alwaysloadwarning && checked) {
                ModalFactory.create({
                    type: ModalFactory.types.SAVE_CANCEL,
                    title: M.util.get_string('alwaysload', 'local_edwiserpagebuilder'),
                    body: M.util.get_string('alwaysloadwarning', 'local_edwiserpagebuilder')
                })
                .then(function(modal) {
                    var modalRoot = modal.getRoot();
                    modalRoot.on(ModalEvents.save, function() {
                        DATA.alwaysloadwarning = true;

                        if (typeof rmblckmdlrelease !== 'undefined' && rmblckmdlrelease < '4.3') {
                            M.util.set_user_preference('always-load-warning', true);
                        } else {
                            UserRepository.setUserPreference('always-load-warning', true);
                        }

                        toggleAlwaysLoading(checked, root, uniqid);
                        modal.destroy();
                    });
                    modalRoot.on(ModalEvents.cancel, function() {
                        checkbox.prop('checked', false);
                    });
                    modal.show();
                });
            } else {
                toggleAlwaysLoading(checked, root, uniqid);
            }
        })

        // Load course progress on click
        .on('click', root + ' ' + SELECTORS.LOAD_COURSE_PROGRESS, function() {
            $(root).find(SELECTORS.COURSE_PROGRESSING).addClass('load-progress');
            // DATA.coursesTable.draw(false);
            DATA.coursesTable[uniqid].draw();
            // $(root).show().find(SELECTORS.TABLE).DataTable().draw();
        });

        // Teacher courses listing table order pieprogress
        $(root + ' ' + SELECTORS.TABLE).on('order.dt', function() {
           createPieProgress('', root);
        });

        // Student progress listing table order pieprogress
        $(root + ' ' + SELECTORS.STUDENT_PROGRESS_TABLE).on('order.dt', function() {
           createPieProgress('', root);
        });
    }

    /**
     * Move settings to panel heading
     * @param  {string} root Root container id
     */
    var updateContainers = function(root) {
        // Move add button panel heading
        let button = $(root).find(SELECTORS.COURSE_PROGRESSING).detach();
        let panelHeading = $(root).closest(SELECTORS.PANEL).find(SELECTORS.PANEL_HEADING);
        let panelActions = $(panelHeading).find('.' + SELECTORS.PANEL_ACTIONS);
        if (panelActions.length == 0) {
            panelActions = $('<div class="' + SELECTORS.PANEL_ACTIONS + '"></div>');
            panelHeading.append(panelActions);
        }
        $(root + ' ' + SELECTORS.DATATABLE_HEADER).append(button);
        button.removeClass('d-none').addClass('d-flex');
        // $(SELECTORS.DATATABLE_HEADER).find("div").removeClass("col-sm-12 col-md-6").addClass("search-show-filter");
        let taskProcessing = $(root).find(SELECTORS.BLOCK_PROCESSING).detach();
        let panel = $(panelHeading).parent(SELECTORS.PANEL);
        panel.prepend(taskProcessing);
    };

    /**
     * Load task on initialisation
     * @param {DOM}     root          block DOM object
     * @param {Boolean} alwaysloadwarning If false then always load progress warning will be shown on enabling
     */
    var init = async function(root, alwaysloadwarning = false, uniqid = "1") {
        await fetchLanguages();
        DATA.alwaysloadwarning = alwaysloadwarning;
        $(document).ready(function() {
            // UpdateContainers(root);
            createPieProgress('', root);
            createDatatable(root, uniqid);
            updateContainers(root);
            initializeEvents(root, uniqid);
        });
    };
    return {
        init: init
    };
});
