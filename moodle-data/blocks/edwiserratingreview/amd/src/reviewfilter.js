/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
define(['jquery', 'core/ajax', 'core/notification', 'core/str', 'core/templates'], function ($, Ajax, Notification, Str) {

    var SELECTORS = {
        REVIEWDATA: '.reviewdata',
        SHOWMOREREVIEWBTN: '.showmorereviewsbtn',
        COURSEID: '#courseId',
        REVIEWSELECTOR: '.reviewselector',
        SHOWMOREREVIEWCLASS: '#showmorereviewclass',
    };


    // ****** IMPORTANT ******
    // Do not change the sequence.
    // If you want to add new strings here, add it at the bottom.
    // Do not remove any string from the array.
    // There is no way we can revert back if sequence is changed.
    // ****** IMPORTANT ******
    const strings = [
        {key: 'noreviewsfound', component: 'block_edwiserratingreview'},
        {key: 'showmorereview', component: 'block_edwiserratingreview'},
        {key: 'showmorereviwebutton', component: 'block_edwiserratingreview'},
    ];

    var LANGS; // Gloabl variable to store languages.

    // Functionality to fetch strings.
    const fetchLanguages = () => {
        Str.get_strings(strings).then(function(results) {
            LANGS = results;
            return results;
        });
    };

    var getreviewdata = function (rates) {
        Ajax.call([{
            methodname: 'block_edwiserratingreview_show_review',
            args: { rating: rates, startlimit: 0, lastlimit: 5, contextid: M.cfg.courseContextId },
            done: function (data) {
                var result ='<div class="m-3">' + M.util.get_string('noreviewsfound', 'block_edwiserratingreview')+'</div>';
                if (data !== '') {
                    result = data;
                }

                $(SELECTORS.REVIEWDATA).empty().append(result);

                if ($(SELECTORS.REVIEWDATA).children('li.review-card').length == 5) {
                    var showmorereviewbuttontext = M.util.get_string('showmorereview', 'block_edwiserratingreview');
                    // eslint-disable-next-line max-len
                    var showmorereviebtn = M.util.get_string('showmorereviwebutton', 'block_edwiserratingreview');
                    $(SELECTORS.SHOWMOREREVIEWCLASS).empty().append(showmorereviebtn);
                    setbuttonurl(rates);
                } else {
                    $(SELECTORS.SHOWMOREREVIEWCLASS).empty().append('');
                }
            },
            fail: function () {
                console.log(Notification.exception);
            }
        }]);

    };

    var setbuttonurl = function (rating) {
        var url = M.cfg.wwwroot + '/blocks/edwiserratingreview/view.php?filter=' + rating + '&contextid=' + M.cfg.courseContextId;
        $(SELECTORS.SHOWMOREREVIEWBTN).attr('href', url);
    };

    const loadReviews = () => {
        var rating = $('.reviewselector option:selected').attr('value');
        getreviewdata(rating);
    };

    return {
        init: function () {
            $(document).ready(function () {
                fetchLanguages();

                loadReviews();

                $(document).on("change", SELECTORS.REVIEWSELECTOR, function () {
                    loadReviews();
                });
            });
        }
    };

});
