/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable no-restricted-globals */

define([
    'jquery',
    'core/ajax',
],
    function ($, Ajax) {
        var SELECTORS = {
            LOADER: '.ernr-pluginaddloader',
            APPROVALAREA: '.approvalarea',
            ADDPLUGIN: '#addplugintocourses',
            DONOTADDDPLUGIN: '#donotaddplugintocourses',

        };
        var addplugintocourse = function (value) {
            Ajax.call([{
                methodname: 'block_edwiserratingreview_add_plugin_to_course',
                args: { userdeniedvalue: value },
                done: function (data) {
                    if (data == true) {
                        $(SELECTORS.LOADER).hide();
                        $(SELECTORS.APPROVALAREA).empty().append(M.util.get_string('sucessfullyaddedmsg', 'block_edwiserratingreview'));
                        console.log(value);
                    }
                    window.location.reload();
                },
                fail: function () {
                    console.log(Notification.exception);
                }

            }]);
        };
        return {
            init: function () {
                $(document).ready(function () {
                    $(SELECTORS.LOADER).hide();
                    $(SELECTORS.ADDPLUGIN).on('click', function () {
                        $(SELECTORS.APPROVALAREA).hide();
                        $(SELECTORS.LOADER).show();
                        addplugintocourse('true');

                    });
                    $(SELECTORS.DONOTADDDPLUGIN).on('click', function () {

                        $(SELECTORS.APPROVALAREA).hide();
                        addplugintocourse('false');

                        // window.location.reload();
                    });
                });

            },
        };

    });
