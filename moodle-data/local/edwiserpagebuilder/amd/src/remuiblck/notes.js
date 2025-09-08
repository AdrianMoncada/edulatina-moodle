/* eslint-disable @babel/no-unused-expressions */
define(['jquery', 'core/ajax', 'core/str'], function($, Ajax, Str) {
     /* Add Notes Block */
     var SELECTORS = {
        ADD_NOTE_BUTTON: '.epb-add-notes-button',
        ADD_NOTE_SELECT: '.epb-add-notes-select',
        SITE_NOTE: '.epb-site-note',
        COURSE_NOTE: '.epb-course-note',
        PERSONAL_NOTE: '.epb-personal-note',
        STUDENT_LABEL: '.epb-select2-studentlist-label',
        STUDENT_LIST: '.epb-select2-studentlist',
        SELECT_STUDENT_NOTE: '.epb-select-note-student',
        ADD_NOTES_BUTTON_WRAPPER: ".epb-add-notes-button-wrapper",
    };

    // ****** IMPORTANT ******
    // Do not change the sequence.
    // If you want to add new strings here, add it at the bottom.
    // Do not remove any string from the array.
    // There is no way we can revert back if sequence is changed.
    // ****** IMPORTANT ******
    const strings = [
        {key: 'selectastudent', component: 'local_edwiserpagebuilder'},
        {key: 'nousersenrolledincourse', component: 'local_edwiserpagebuilder'},
        {key: 'total', component: 'moodle'}
    ];

    var LANGS; // Gloabl variable to store languages.

    // Functionality to fetch strings.
    const fetchLanguages = () => {
        Str.get_strings(strings).then(function(results) {
            LANGS = results;
            return results;
        });
    };

    function initializeEvents(root) {

        if ($(root + " " + SELECTORS.ADD_NOTE_SELECT).length) {
            $(root + " " + SELECTORS.ADD_NOTE_BUTTON).hide();
            $(root + " " + SELECTORS.STUDENT_LABEL).hide();
            $(root + " " + SELECTORS.STUDENT_LIST).hide();
            var courseId, studentCount, userId, courseName;

            $(root + " " + SELECTORS.ADD_NOTE_SELECT + ' select').on('change', function() {
                $(root + " " + SELECTORS.ADD_NOTE_BUTTON).hide();
                $(root + " " + SELECTORS.SELECT_STUDENT_NOTE).removeClass('d-none');
                courseId = $(this).children(":selected").attr("id");
                courseName = $(this).children(":selected").text();
                if (courseId === undefined) {
                    $(root + " " + SELECTORS.STUDENT_LABEL).hide();
                    $(root + " " + SELECTORS.STUDENT_LIST).empty();
                    $(root + " " + SELECTORS.STUDENT_LIST).hide();
                    return;
                }root + " " +

                Ajax.call([{
                    methodname: 'local_edwiserpagebuilder_remuiblck_action',
                    args: {
                        action: "get_enrolled_users_by_course",
                        config: JSON.stringify({
                            "courseid": courseId,
                        })
                    }
                }])[0].done(function(response) {
                    response = JSON.parse(response);
                    studentCount = Object.keys(response).length;
                    $(root + " " + SELECTORS.STUDENT_LABEL).show();
                    $(root + " " + SELECTORS.STUDENT_LIST).show();
                    $(root + " " + SELECTORS.STUDENT_LIST).empty();
                    if (studentCount) {
                        $(root + " " + SELECTORS.STUDENT_LIST).append('<option>' + M.util.get_string(
                            "selectastudent", "local_edwiserpagebuilder") + ' (' + M.util.get_string("total", "moodle") +
                            ': ' + studentCount + ')</option>');

                        $.each(response, function(index, student) {
                            $(root + " " + SELECTORS.STUDENT_LIST).append('<option value="' + student.id + '">' + student.fullname + '</option>');
                        });

                    } else {
                        $(root + " " + SELECTORS.STUDENT_LIST).append('<option>' + M.util.get_string("nousersenrolledincourse",
                            "local_edwiserpagebuilder", courseName) + '</option>');
                    }

                }).fail(function(ex) {
                    $(root + " " + SELECTORS.STUDENT_LIST).html('<option>' + ex.message + '</option>');
                });
            });

            $(root + " " + SELECTORS.STUDENT_LIST).on('change', function() {
                $(root + " " + SELECTORS.ADD_NOTE_BUTTON).show();
                $(root + " " + SELECTORS.ADD_NOTES_BUTTON_WRAPPER).removeClass('d-none');
                userId = $(this).find('option:selected').val();
                var notesLink = M.cfg.wwwroot + '/notes/edit.php?courseid=' + courseId +
                    '&userid=' + userId + '&publishstate=site';
                $(root + " " + SELECTORS.ADD_NOTE_BUTTON + ' ' + SELECTORS.SITE_NOTE).attr('href', notesLink);
                notesLink = M.cfg.wwwroot + '/notes/edit.php?courseid=' + courseId +
                    '&userid=' + userId + '&publishstate=public';
                $(root + " " + SELECTORS.ADD_NOTE_BUTTON + ' ' + SELECTORS.COURSE_NOTE).attr('href', notesLink);
                notesLink = M.cfg.wwwroot + '/notes/edit.php?courseid=' + courseId +
                    '&userid=' + userId + '&publishstate=draft';
                $(root + " " + SELECTORS.ADD_NOTE_BUTTON + ' ' + SELECTORS.PERSONAL_NOTE).attr('href', notesLink);
            });
        }
    }

    var init = async function(root) {
        await fetchLanguages();
        $(document).ready(function() {
            initializeEvents(root);
        });
    };

    return {
        init: init
    };
    /* End - Add Notes Block */
});
