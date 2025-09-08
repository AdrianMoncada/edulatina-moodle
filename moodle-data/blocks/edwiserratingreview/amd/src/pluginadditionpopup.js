/* eslint-disable no-console */
/* eslint-disable no-restricted-globals */

define([
    'jquery',
    'core/ajax',
    'core/modal_factory',
    'core/modal_events',
    'core/str',
],
    function ($, Ajax, ModalFactory, ModalEvents, Str) {
        var addpluginmodal = function () {
            ModalFactory.create({
                type: ModalFactory.types.SAVE_CANCEL,
                title: Str.get_string('frontpagemodaltitle', 'block_edwiserratingreview'),
                body: Str.get_string('frontpagemodalbody', 'block_edwiserratingreview'),
            })
            .done(function (modal) {
                modal.setSaveButtonText(Str.get_string('yes', 'block_edwiserratingreview'));
                var root = modal.getRoot();
                root.on(ModalEvents.save, function () {
                    addplugintocourse('true');
                });
                root.on(ModalEvents.cancel, function () {
                    addplugintocourse('No');
                });
                modal.show();
            });
        };
        var addplugintocourse = function (value) {
            console.log("ratingreview: " + value);
            Ajax.call([{
                methodname: 'block_edwiserratingreview_add_plugin_to_course',
                args: { userdeniedvalue: value },
                done: function () {
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
                    addpluginmodal();
                });
            },
        };

    });
