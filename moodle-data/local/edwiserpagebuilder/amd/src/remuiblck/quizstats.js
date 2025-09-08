/* eslint-disable no-console */
/* eslint-disable no-undef */
define(['local_edwiserpagebuilder/jquery', 'core/ajax', "core/str", 'local_edwiserpagebuilder/remuiblck/chartjs'], function($, Ajax, Str) {

    var SELECTORS = {
        CHART: "#barChart",
        CHART_AREA: '#quiz-chart-area',
        COURSE_LIST: '#quiz-course-list',
        QUIZ_LIST: '#quiz-list',
        LIST_SELECTED: 'option:selected',
        ERROR: '.quiz-stats-error'
    };

    // ****** IMPORTANT ******
    // Do not change the sequence.
    // If you want to add new strings here, add it at the bottom.
    // Do not remove any string from the array.
    // There is no way we can revert back if sequence is changed.
    // ****** IMPORTANT ******
    const strings = [
        {key: 'noofstudents', component: 'local_edwiserpagebuilder'}
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

    var barCharts = {};

    var getStepSize = function(datasets) {
        let max = 0;
        let current;
        datasets.forEach(function(data) {
            current = Math.max.apply(Math, data.data);
            max = current > max ? current : max;
        });
        return Math.ceil(max / 20);
    };

    /**
     * 
     */

    function createBarChart(root, uniqid) {
        var courseId = getSelectedCourseID(root);
        var quizId = getSelectedQuizID(root);

        Ajax.call([{
            methodname: 'local_edwiserpagebuilder_remuiblck_action',
            args: {
                action: "get_quiz_participation",
                config: JSON.stringify({
                    "courseid": courseId,
                    "quizid": quizId
                })
            }
        }])[0]
            .done(function(response) {
                response = JSON.parse(response);
                if (response.datasets === undefined) {
                    $(root).find(SELECTORS.CHART_AREA).hide();
                    $(root).find(SELECTORS.ERROR).show();
                } else {
                    if (barCharts[uniqid] && barCharts[uniqid] !== null) {
                        barCharts[uniqid].destroy();
                    }
                    var barcontext = $(root).find(SELECTORS.CHART).get(0).getContext("2d");
                    barcontext.canvas.height = 400;
                    var barData = {
                        labels: response.labels,
                        datasets: response.datasets
                    };
                    barCharts[uniqid] = new Chart(barcontext, {
                        type: 'bar',
                        data: barData,
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            scales: {
                                yAxes: [{
                                    scaleLabel: {
                                        display: true,
                                        labelString: M.util.get_string('noofstudents', 'local_edwiserpagebuilder'),
                                        fontColor: '#4C5A73',
                                    },
                                    ticks: {
                                        min: 0,
                                        stepSize: getStepSize(response.datasets)
                                    },
                                    gridLines: {
                                        drawBorder: false,
                                    }
                                }],
                                xAxes: [{
                                    gridLines: {
                                        drawBorder: false,
                                        display: true,
                                        borderDash: [8, 4],
                                        color: "#EBF0F9"
                                    },
                                    barThickness: 38,
                                }]
                            },
                            legend: {
                                display: true,
                                position: 'bottom',
                                align: 'left',
                                labels: {
                                    fontColor: '#4C5A73',
                                }
                            }
                        }
                    });
                }
            })
            .fail(function() {
                $(root).find(SELECTORS.CHART_AREA).hide();
                $(root).find(SELECTORS.ERROR).show();
            });
    }

    var getSelectedCourseID = function(root) {
        return $(root).find(SELECTORS.COURSE_LIST + ' ' + SELECTORS.LIST_SELECTED).data('courseid');
    };
    var getSelectedQuizID = function(root) {
        return $(root).find(SELECTORS.QUIZ_LIST + ' ' + SELECTORS.LIST_SELECTED).data('quizid');
    };
    var populateQuizSelector = function(root, uniqid) {
        var courseId = getSelectedCourseID(root);

        Ajax.call([{
            methodname: 'local_edwiserpagebuilder_remuiblck_action',
            args: {
                action: "get_quizzes_of_course",
                config: JSON.stringify({
                    "courseid": courseId,
                })
            }
        }])[0]
            .done(function(response) {
                response = JSON.parse(response);
                response = Object.values(response);
                var option = "";
                for (var i = 0; i < response.length; i++) {
                    option = option + "<option data-id='" + response[i].courseid + "' data-quizid='" + response[i].quizid + "'>";
                    option = option + response[i].quizname + "</option>";
                }

                $(root).find(SELECTORS.QUIZ_LIST).empty().append(option);
                createBarChart(root, uniqid);
            })
            .fail(function() {
                $(root).find(SELECTORS.CHART_AREA).hide();
                $(root).find(SELECTORS.ERROR).show();
            });
    };
    var initEvents = function(root, uniqid) {
        $(root).find(SELECTORS.COURSE_LIST).on('change', function() {
            populateQuizSelector(root, uniqid);
        });
        $(root).find(SELECTORS.QUIZ_LIST).on('change', function() {
            createBarChart(root, uniqid);
        });
    };

    var init = function(root, uniqid) {
        $(document).ready(async function() {
            fetchLanguages();
            initEvents(root, uniqid);
            if ($(root).find(SELECTORS.CHART).length) {
                createBarChart(root, uniqid);
            }
        });
    };
    return {
        init: init
    };
});
