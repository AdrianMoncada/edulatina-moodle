define([
    'jquery',
    'local_edwiserpagebuilder/remuiblck/task'
], function(
    $,
    task
) {
    /**
     * Initialise schedule task block
     * @param {DOM} root block DOM object
     */
    var init = function(root) {
        task.init(root);
    };
    return {
        init: init
    };
});
