/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-dupe-keys */
/* eslint-disable quote-props */
/* eslint-disable no-eq-null */
/* eslint-disable max-len */
/* eslint-disable no-undef */

if ( typeof rmblckmdlrelease !== 'undefined' && rmblckmdlrelease < '4.3' ) {
    moduleDependencies = [
        'jquery',
        'core/ajax',
        'core/notification',
        'core/templates',
        'core/modal_factory',
        'core/modal_events',
        'core/fragment',
        'core/str',
        'local_edwiserpagebuilder/remuiblck/modal_task_popup',
        'local_edwiserpagebuilder/remuiblck/events',
        'local_edwiserpagebuilder/remuiblck/task_filters',
        'local_edwiserpagebuilder/remuiblck/task_view'
    ];
} else {
    moduleDependencies = [
        'jquery',
        'core/ajax',
        'core/notification',
        'core/templates',
        'local_edwiserpagebuilder/remuiblck/modal_factory',
        'core/modal_events',
        'core/fragment',
        'core/str',
        'local_edwiserpagebuilder/remuiblck/modal_task_popup',
        'local_edwiserpagebuilder/remuiblck/events',
        'local_edwiserpagebuilder/remuiblck/task_filters',
        'local_edwiserpagebuilder/remuiblck/task_view'
    ];
}

define(moduleDependencies, function(
    $,
    ajax,
    Notification,
    Templates,
    ModalFactory,
    ModalEvents,
    Fragment,
    Str,
    ModalTaskPopup,
    RemuiblckEvents,
    TaskFilters,
    TaskView
) {
    var SELECTORS = {
        ADD_TASK: '[data-region="add-schedule-task"]',
        TASK: '[data-region="task-item"]',
        TASK_SUBJECT: '[data-toggle="collapse"]',
        TASK_EDIT: '[data-action="edit"]',
        TASK_POPUP: "[data-region='task-body']",
        TASK_DURATION_FILTER: '[data-region="task-duration-filter"]',
        TASK_STATUS_FILTER: '[data-region="task-status-filter"]',
        TASK_FILTER_OPTION: '[data-value]',
        TASK_SUBJECT: '.item-title .panel-heading span',
        PANEL: '.panel',
        PANEL_HEADING: '.panel-heading',
        PANEL_ACTIONS: 'panel-actions',
        TOASTER_CONTAINER: '[aria-task-toasters]',
        TOASTER_CONTAINER_ID: 'aria-task-toasters',
        TASK_PROCESSING: '.block-processing',
    };

    // ****** IMPORTANT ******
    // Do not change the sequence.
    // If you want to add new strings here, add it at the bottom.
    // Do not remove any string from the array.
    // There is no way we can revert back if sequence is changed.
    // ****** IMPORTANT ******
    const strings = [
        {key: 'deletetask', component: 'local_edwiserpagebuilder'},
        {key: 'deletetaskmessage', component: 'local_edwiserpagebuilder'},
        {key: 'taskdeleted', component: 'local_edwiserpagebuilder'},
        {key: 'ok', component: 'moodle'}
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
         * Create new task promise call
         * @param  {JSON} settings task settings object
         * @return {promise} ajax promise
         */
        CREATE_NEW_TASK: function(settings) {
            return ajax.call([{
                methodname: 'local_edwiserpagebuilder_remuiblck_action',
                args: {
                    action: "create_new_task",
                    config: JSON.stringify(settings)
                }
            }])[0];
        },

        /**
         * Edit task settings promise call
         * @param  {object} settings task settings object
         * @return {promise} ajax promise
         */
        EDIT_TASK: function(settings) {
            return ajax.call([{
                methodname: 'local_edwiserpagebuilder_remuiblck_action',
                args: {
                    action: "edit_task",
                    config: JSON.stringify(settings)
                }
            }])[0];
        },

        /**
         * Toggle task completion promise call
         * @param  {int}     taskid id of task
         * @param  {bool}    status true for completed and false for incomplete
         * @return {promise}        ajax promise
         */
        COMPLETE_TASK: function(taskid, status) {
            return ajax.call([{
                methodname: 'local_edwiserpagebuilder_remuiblck_action',
                args: {
                    action: "complete_task",
                    config: JSON.stringify({
                        "id": taskid,
                        "status": status
                    })
                }
            }])[0];
        },

        /**
         * Delete existing task
         * @param  {int}     taskid task id
         * @return {promise}        ajax promise
         */
        DELETE_TASK: function(taskid) {
            return ajax.call([{
                methodname: 'local_edwiserpagebuilder_remuiblck_action',
                args: {
                    action: "delete_task",
                    config: JSON.stringify({
                        "id": taskid
                    })
                }
            }])[0];
        },

        /**
         * Notify users about task
         * @param {int}      taskid task id
         * @param {string}   type   type of notification from one of these [create|complete|incomplete]
         * @return {promise}        ajax promise
         */
        NOTIFY_USERS: function(taskid, type) {
            return ajax.call([{
                methodname: 'local_edwiserpagebuilder_remuiblck_action',
                args: {
                    action: "task_notify_users",
                    config: JSON.stringify({
                        "id": taskid,
                        "type": type
                    })
                }
            }])[0];
        }
    };
    var FRAGMENTS = {
        /**
         * Fetch task form fragment call
         * @param  {int}     taskid task id
         * @return {promise}        fragment promise call
         */
        GET_TASK_FORM: function(taskid) {
            return Fragment.loadFragment(
                'local_edwiserpagebuilder',
                'task_form',
                contextid,
                {
                    taskid: taskid
                }
            );
        }
    };

    /**
     * Close task popup modal
     * @param {ModalFactory} modal modal factory object
     */
    var closeTaskPopup = function(modal) {
        modal.hide();
        modal.destroy();
    };

    /**
     * Get subject of task on the basis of id
     * It check whether task is present in task list
     * @param  {string} root   root container id
     * @param  {[type]} taskid task id
     * @return {string}        task subject
     */
    var getSubject = function(root, taskid) {
        let task = $(root).find(SELECTORS.TASK + '[data-id="' + taskid + '"]');
        if (task) {
            return task.find(SELECTORS.TASK_SUBJECT).text();
        }
        return taskid;
    };

    /**
     * Show toaster
     * @param  {string} root     root container id
     * @param  {[type]} position position of toaster
     * @param  {[type]} type     type of toaster
     * @param  {[type]} message  message to show in toater
     */
    var toast = function(root, position, type, message) {
        if ($(root).find('.' + position + SELECTORS.TOASTER_CONTAINER).length == 0) {
            $(root).append('<div class="toaster ' + position + '"' + SELECTORS.TOASTER_CONTAINER_ID + 'role="alert"></div>');
        }
        let newToast = $('<div class="toast toast-just-text ' + type + ' toast-shadow"><div class="toast-message">' + message + '</div></div>');
        $(root).find(SELECTORS.TOASTER_CONTAINER).append(newToast);
        setTimeout(function() {
            newToast.addClass('show');
        }, 0);
        setTimeout(function() {
            newToast.removeClass('show');
            setTimeout(function() {
                newToast.remove();
            }, 250);
        }, 2000);
    };

    /**
     * Delete task
     * @param {string} root   block root selector
     * @param {int}    taskid id of task
     * @param {taskModal} taskModal
     */
    var deleteTask = function(root, taskid, taskModal) {
        let subject = getSubject(root, taskid);
        ModalFactory.create({
            type: ModalFactory.types.SAVE_CANCEL,
            title: M.util.get_string('deletetask', 'local_edwiserpagebuilder'),
            body: M.util.get_string('deletetaskmessage', 'local_edwiserpagebuilder', subject)
        }, $('#create'))
        .done(function(modal) {
            modal.setSaveButtonText(M.util.get_string('ok', 'moodle'));
            modal.getRoot().on(ModalEvents.save, function() {
                PROMISES.DELETE_TASK(taskid).done(function(response) {
                    response = JSON.parse(response);
                    if (response.status == true) {
                        closeTaskPopup(modal);
                        closeTaskPopup(taskModal);
                        setTimeout(function () {
                            closeTaskPopup(modal);
                        }, 200);
                        setTimeout(function () {
                            closeTaskPopup(taskModal);
                        }, 200);
                        loadTasks(root);
                        toast(root, 'toast-top-center', 'toast-error', M.util.get_string('taskdeleted', 'local_edwiserpagebuilder', subject));
                        return;
                    }
                    Notification.exception({
                        name: response.msg
                    });
                }).fail(Notification.exception);
            }).on(ModalEvents.cancel, function() {
                closeTaskPopup(modal);
            });
            modal.show();
        })
        .fail(Notification.exception);
    };

    /**
     * Notify users about task. This call ajax request
     * @param {int}      taskid   task id
     * @param {string}   type     type of notification from one of these [create|complete|incomplete]
     * callback call to execute after notify completion
     */
    var notifyUsers = function(taskid, type) {
        var callback = arguments.length > 1 && arguments[2] !== undefined ? arguments[2] : null;
        PROMISES.NOTIFY_USERS(taskid, type).done(callback).fail(function(ex) {
            Notification.exception(ex);
            if (callback != null) {
                callback();
            }
        });
    };

    /**
     * Open task popup for creating new task editing existing
     * @param {DOM} root   block DOM object
     * @param {int} taskid task id. -1 if new task
     */
    var taskPopup = function(root, taskid) {
        ModalFactory.create(
            {
                type: ModalTaskPopup.TYPE,
                templateContext: {
                    new: taskid == -1
                }
            },
            $('#create')
        ).done(function(modal) {
            modal.show();
            modal.setBody(FRAGMENTS.GET_TASK_FORM(taskid));
            modal.getRoot().on(ModalEvents.hidden, function() {

                // Handle modal close event
                closeTaskPopup(modal);
            }).on(RemuiblckEvents.TASK_SAVE, function() {

                if (!modal.valid_settings()) {
                    return;
                }
                modal.saving();
                // Handle task save event
                let settings = modal.get_task_settings();
                if (taskid == -1) {
                    PROMISES.CREATE_NEW_TASK(settings).done(function(response) {
                        response = JSON.parse(response);
                        if (settings.notify == true) {
                            notifyUsers(response, 'create', function() {
                                closeTaskPopup(modal);
                                loadTasks(root);
                            });
                            return;
                        }
                        closeTaskPopup(modal);
                        loadTasks(root);
                    }).fail(function(ex) {
                        modal.saving(false);
                        Notification.exception(ex);
                    });
                    return;
                }
                settings.id = taskid;
                PROMISES.EDIT_TASK(settings).done(function() {
                    closeTaskPopup(modal);
                    loadTasks(root);
                }).fail(function(ex) {
                    modal.saving(false);
                    Notification.exception(ex);
                });
            }).on(RemuiblckEvents.TASK_DELETE, function() {

                // Handle task delete event
                deleteTask(root, taskid, modal);
            }).on(RemuiblckEvents.TASK_CANCEL, function() {

                // Handle task cancel event
                closeTaskPopup(modal);
            });
        });
    };

    /**
     * Load tasks in task list
     * @param {DOM} root block DOM object
     */
    var loadTasks = function(root) {
        TaskView.loadTasks(root, TaskFilters.getTaskDuration(root), TaskFilters.getTaskStatus(root));
    };

    /**
     * Toggle task completion
     * @param {string} root   block root selector
     * @param {int}    taskid id of task
     * @param {bool}   status true for completed and false for incomplete
     */
    var completeTask = function(root, taskid, status) {
        TaskView.toggleTaskProcessing(root, true);
        PROMISES.COMPLETE_TASK(taskid, status).done(function(response) {
            response = JSON.parse(response);
            if (response.status == true) {
                loadTasks(root);
                return;
            }
            $(root + ' ' + SELECTORS.TASK + '[data-id="' + taskid + '"]').find('input').prop('checked', !status);
            Notification.exception({
                name: response.msg
            });
            TaskView.toggleTaskProcessing(root);
        }).fail(function(ex) {
            Notification.exception(ex);
            $(root + ' ' + SELECTORS.TASK + '[data-id="' + taskid + '"]').find('input').prop('checked', !status);
            TaskView.toggleTaskProcessing(root);
        });
    };


    /**
     * Initialise dom events
     * @param {DOM} root block DOM object
     */
    var initialiseEvents = function(root) {
        $('body').on('click', root + " " + SELECTORS.ADD_TASK, function() {
            taskPopup(root, -1);
        }).on('click', root + ' ' + SELECTORS.TASK, function(e) {
            if ($(e.target).is('input')) {
                completeTask(root, $(this).data('id'), $(e.target).is(':checked'));
                return;
            }
            if ($(e.target).is(SELECTORS.TASK_SUBJECT)) {
                return;
            }
            if ($(e.target).is(SELECTORS.TASK_EDIT) || $(e.target).parent().is(SELECTORS.TASK_EDIT)) {
                taskPopup(root, $(this).data('id'));
            }
        });
    };

    var updateContainers = function(root) {
        // Move add button panel heading
        let button = $(root).find(SELECTORS.ADD_TASK).detach();
        let panelHeading = $(root).closest(SELECTORS.PANEL).find(SELECTORS.PANEL_HEADING);
        let panelActions = $(panelHeading).find('.' + SELECTORS.PANEL_ACTIONS);
        if (panelActions.length == 0) {
            panelActions = $('<div class="' + SELECTORS.PANEL_ACTIONS + '"></div>');
            panelHeading.append(panelActions);
        }
        panelActions.prepend(button);
        button.removeClass('d-none');

        let taskProcessing = $(root).find(SELECTORS.TASK_PROCESSING).detach();
        let panel = $(panelHeading).parent(SELECTORS.PANEL);
        panel.prepend(taskProcessing);
    };

    /**
     * Initialise tasks
     * @param {DOM} root block DOM object
     */
    var init = async function(root) {
        await fetchLanguages();
        $(document).ready(function() {
            initialiseEvents(root);
            // updateContainers(root);
        });
        TaskView.init(root);
        TaskFilters.init(root);
    };
    return {
        init: init
    };
});
