/* eslint-disable no-unused-vars */
define([
    'jquery',
    'core/ajax',
    'core/notification',
    'core/templates'
], function(
    $,
    ajax,
    Notification,
    Templates
) {
    var TEMPLATES = {
        RECENT_FORUM_LIST: 'local_edwiserpagebuilder/remuiblck/recent_active_forum_table'
    };
    var PROMISES = {
        /**
         * Get recent forum promise call
         * @return {promise}         ajax promise
         */
        GET_RECENT_FORUM: function() {
            return ajax.call([{
                methodname: 'local_edwiserpagebuilder_remuiblck_action',
                args: {
                    action: "get_recent_active_forum",
                    config: ""
                }
            }])[0];
        }
    };

    /**
     * Load recent feedback list
     * @param {DOM}    root     block DOM object
     */
    var loadRecentForum = function(root) {
        PROMISES.GET_RECENT_FORUM().done(function(response) {
            response = JSON.parse(response);
            var output = Templates.render(TEMPLATES.RECENT_FORUM_LIST, response);
            output.done(function(html) {
                $(root).html(html);
            }).fail(Notification.exception);
        }).fail(Notification.exception);
    };

    /**
     * Load recent forum on initialisation
     * @param {DOM} root block DOM object
     */
    var init = function(root) {
        $(document).ready(function() {
            loadRecentForum(root);
        });
    };
    return {
        init: init
    };
});
