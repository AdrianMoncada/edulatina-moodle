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
        RECENT_FEEDBACK_LIST: 'local_edwiserpagebuilder/remuiblck/recent_assignments_list'
    };
    var PROMISES = {
        /**
         * Get recent feedbacks promise call
         * @return {promise} ajax promise
         */
        GET_RECENT_FEEDBACKS: function() {
            return ajax.call([{
                methodname: 'local_edwiserpagebuilder_remuiblck_action',
                args: {
                    action: "get_recent_feedbacks",
                    config: ""
                }
            }])[0];
        }
    };

    /**
     * Load recent feedback list
     * @param {DOM} root block DOM object
     */
    var loadRecentFeedbacks = function(root) {
        PROMISES.GET_RECENT_FEEDBACKS().done(function(response) {
            response = JSON.parse(response);

            if (response?.recentdata?.recentfeedback)
            response.recentdata.recentfeedback = Object.values(response.recentdata.recentfeedback);

            var output = Templates.render(TEMPLATES.RECENT_FEEDBACK_LIST, response);
            output.done(function(html) {
                $(root).html(html);
            }).fail(Notification.exception);
        }).fail(Notification.exception);
    };

    /**
     * Load recent feedbacks on initialisation
     * @param {DOM} root block DOM object
     */
    var init = function(root) {
        $(document).ready(function() {
            loadRecentFeedbacks(root);
        });
    };
    return {
        init: init
    };
});
