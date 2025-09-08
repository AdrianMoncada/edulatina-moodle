/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable no-undef */
/* eslint-disable no-loop-func */
/* eslint-disable jsdoc/check-param-names */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */


define([
    'local_edwiserpagebuilder/jquery',
    'core/ajax',
    'local_edwiserpagebuilder/remuiblck/chartjs',
    'core/custom_interaction_events',
    'local_edwiserpagebuilder/remuiblck/events',
    'core_user/repository',
    'core/str',
], function($, Ajax, Chart, CustomEvents, RemuiblckEvents, UserRepository, Str) {

    var SELECTORS = {
        PAGECOUNT: '[data-action-page-count]',
        PAGINATE: '[data-action-paginate]',
        NEXT: '[data-next]',
        PREVIOUS: '[data-previous]',
        CHARTPAGINATION: '.analysis-chart-pagination',
        PAGES: '[data-region-pages]',
        TOGGLELABELS: '#togglelabels',
        PER_PAGE_FILTER: '[data-region="per-page-filter"]',
        FILTER_OPTION: '[data-value]'
    };
    // window['analysisChart'] = null;
    var analysisChart = {};
    var pageNumber = 1;
    var maxPage = 1;
    /* Course Analytics Block */
    var analysisBar;

        // ****** IMPORTANT ******
    // Do not change the sequence.
    // If you want to add new strings here, add it at the bottom.
    // Do not remove any string from the array.
    // There is no way we can revert back if sequence is changed.
    // ****** IMPORTANT ******
    const strings = [
        {key: 'showingfromto', component: 'local_edwiserpagebuilder'}
    ];

    var LANGS; // Gloabl variable to store languages.

    // Functionality to fetch strings.
    async function fetchLanguages() {
        await Str.get_strings(strings).then(function(results) {
            LANGS = results;
            return results;
        });
    }

    /**
     * Get start and end index of bar data
     *
     * @param  {Number} perPage Total number of bars per page
     * @return {Object}         Object with start and end value of bars
     */
    function getStartEnd(perPage) {
        // default limit is 0
        var limit = {
            start: 0,
            end: 0
        };
        if (analysisBar.labels == undefined) {
            return limit;
        }
        // if number of bars is less or equal to per page then return limit with 1 and bars count
        if (analysisBar.labels.length <= perPage) {
            limit.start = 1;
            limit.end = analysisBar.labels.length;
            return limit;
        }
        limit.start = pageNumber == 1 ? 1 : (pageNumber - 1) * perPage + 1;
        limit.end = pageNumber * perPage;
        if (analysisBar.labels.length < limit.end) {
            limit.end = analysisBar.labels.length;
        }
        return limit;
    }

    /**
     * Update bars data in the chart based on start and end of bars
     *
     * @param {String} root      block root element id
     * @param {Number} totalBars Total bar which can be shown in the chart
     */
    function updateBars(root, totalBars, uniqid) {
        // var {start, end} = getStartEnd(totalBars);
        var limit = getStartEnd(totalBars);
        // Update pagination label

        $(root).find(SELECTORS.PAGES).text(M.util.get_string('showingfromto', 'local_edwiserpagebuilder', {
            start: limit.start,
            to: limit.end,
            total: analysisBar.labels.length
        }));

        // Remove previous bar data
        analysisChart[uniqid].data.labels = [];
        analysisChart[uniqid].data.datasets.forEach(function(dataset) {
            dataset.data = [];
        });
        analysisChart[uniqid].update();

        // Add new bar data and re-render the chart
        for (var i = limit.start - 1; i <= limit.end; i++) {
            analysisChart[uniqid].data.labels.push(analysisBar.labels[i]);
            analysisChart[uniqid].data.datasets.forEach(function(dataset, index) {
                dataset.data.push(analysisBar.datasets[index].data[i]);
            });
            analysisChart[uniqid].update();
        }
    }

    /**
     * Generate pagination data on page load
     * @param {String} root    block root element id
     * @param {Number} perPage bars to be shown per page
     */
    function generatePagination(root, perPage, uniqid) {
        // If there is no data then hide pagination and return
        if (analysisBar.labels == undefined) {
            $(root).find(SELECTORS.CHARTPAGINATION).addClass('d-none');
            return;
        }
        pageNumber = 1;
        // var {start, end} = getStartEnd(perPage);

        // Show pagination
        $(root).find(SELECTORS.CHARTPAGINATION).removeClass('d-none');
        maxPage = analysisBar.labels.length > perPage ? Math.round(analysisBar.labels.length / perPage) : 1;
        updateBars(root, perPage, uniqid);
    }

    /**
     * Get Analysis Data using ajax
     *
     * @param  {String} root block root element id
     * @return {Ajax}   Ajax promise
     */
    function getAnalysisData(root) {
        var course_id = $(root).find('#coursecategorylist option:selected').data('id');
        return Ajax.call([{
            methodname: 'local_edwiserpagebuilder_remuiblck_action',
            args: {
                action: "get_course_analytics",
                config: JSON.stringify({
                    "courseid": course_id,
                })
            }
        }])[0];
    }

    /**
     * Create analysis chart from ajax data
     *
     * @param {String} root block root element id
     * @param {String} uniqid uniqid for chart
     */
    function createAnalysisChart(root, uniqid) {
        getAnalysisData(root)
        .done(function (response) {
            response = JSON.parse(response);
            analysisBar = response;
            pageNumber = 1;
            if (analysisChart[uniqid] && analysisChart[uniqid] !== null) {
                analysisChart[uniqid].destroy();
            }

            if (response.error) {
                $(root).find("#highestactivity").html("");
                $(root).find("#lowestactivity").html("");

                $(root).find("#highestgrade").html("0");
                $(root).find("#lowestgrade").html("0");
                $(root).find("#averagegrade").html("0");
            } else {
                $(root).find("#highestactivity").html(analysisBar.maxactivityname);
                $(root).find("#lowestactivity").html(analysisBar.minactivityname);

                $(root).find("#highestgrade").html(analysisBar.highest);
                $(root).find("#lowestgrade").html(analysisBar.lowest);
                $(root).find("#averagegrade").html(analysisBar.average);
            }

            var context = $(root).find("#analysischart").get(0).getContext("2d");
            var datasets = [];
            if (response.datasets != undefined) {
                response.datasets.forEach(function(dataset) {
                    datasets.push({
                        data: [],
                        backgroundColor: dataset.backgroundColor,
                        label: dataset.label
                    });
                });
            }
            context.canvas.height = 400;
            analysisChart[uniqid] = new Chart(context, {
                data: {
                    labels: [],
                    datasets: datasets
                },
                type: 'bar',
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    tooltips: {
                        enabled: true
                    },
                    hover: {
                        animationDuration: 0
                    },
                    layout: {
                        padding: {
                            top: 20
                        }
                    },
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            fontSize: 12
                        }

                    },
                    animation: {
                        duration: 300,
                        easing: 'easeInOutQuad',
                        onComplete: function () {
                            var chartInstance = this.chart,
                                ctx = chartInstance.ctx;
                            ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'bottom';

                            this.data.datasets.forEach(function (dataset, i) {
                                var meta = chartInstance.controller.getDatasetMeta(i);
                                if (meta.hidden != true) {
                                    meta.data.forEach(function (bar, index) {
                                        var data = dataset.data[index];
                                        ctx.fillText(data, bar._model.x, bar._model.y - 5);
                                    });
                                }
                            });
                        }
                    },
                    scales:
                    {
                        xAxes: [{
                            display: false,
                            gridLines: {
                                display: true,
                            },
                            barThickness: 38,
                        }],
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                            },
                            gridLines: {
                                display: true
                            },
                        }]
                    }
                }
            });
            generatePagination(root, getCourseAnalyticsPerPage(root), uniqid);
        })
        .fail(function (xhr, status, error) {
            $(root).find('div#analysis-chart-area').hide();
        });
    }

    /**
     * Event listener for the per page selector
     *
     * @param {object} root The root element for the manage courses block
     * @param {object} uniqid
     */
    var registerCourseAnalyticsPerPageFilter = function(root, uniqid) {
        var courseAnalyticsPerPageFilterContainer = $(root).find(SELECTORS.PER_PAGE_FILTER);
        CustomEvents.define(courseAnalyticsPerPageFilterContainer, [CustomEvents.events.activate]);
        courseAnalyticsPerPageFilterContainer.on(
            CustomEvents.events.activate,
            SELECTORS.FILTER_OPTION,
            function(e, data) {
                data.originalEvent.preventDefault();

                var option = $(e.target).closest(SELECTORS.FILTER_OPTION);


                if (option.hasClass('active')) {
                    // If it's already active then we don't need to do anything.
                    return;
                }

                $(e.target).trigger(RemuiblckEvents.COURSE_ANALYTICS_PAGE_FILTER_CHANGE);
                if ( typeof rmblckmdlrelease !== 'undefined' && rmblckmdlrelease < '4.3' ) {
                    M.util.set_user_preference('courseanalyticsperpage', option.data('value'));
                }else{
                    UserRepository.setUserPreference('courseanalyticsperpage', option.data('value'));
                }
                generatePagination(root, option.data('value'), uniqid);
            }
        );
    };

    /**
     * Get manage courses filter dropdown selection
     *
     * @param  {DOM}    root block root element id
     * @return {string}      selected per page courses
     */
    var getCourseAnalyticsPerPage = function(root) {
        return $(root).find(SELECTORS.PER_PAGE_FILTER).find(SELECTORS.FILTER_OPTION + '.active').data('value');
    };

    /**
     * Initialize event listerns
     *
     * @param  {String} root block root element id
     * @param  {String} uniqid uniqid for chart
     */
    function initEvents(root, uniqid) {
        // Initialize per page filter events
        registerCourseAnalyticsPerPageFilter(root, uniqid);

        // Traverse through page
        $('body').on('click', root + ' ' + SELECTORS.PAGINATE, function() {
            if ($(this).is(SELECTORS.NEXT)) {
                if (pageNumber == maxPage) {
                    return;
                }
                pageNumber++;
            } else if($(this).is(SELECTORS.PREVIOUS)) {
                if (pageNumber == 1) {
                    return;
                }
                pageNumber--;
            } else {
                return;
            }
            var perPage = getCourseAnalyticsPerPage(root, uniqid);
            updateBars(root, perPage, uniqid);
        });

        //Update chart on courses dropdown change
        $('body').on('change', root + ' #coursecategorylist', function () {
            createAnalysisChart(root, uniqid);
        });

        $(document).on("click", SELECTORS.PER_PAGE_FILTER+ " .dropdown-menu .dropdown-item", function () {
            var perpagevalue = $(this).data('value');
            $('#perpage').attr('title', perpagevalue).find('span').text(perpagevalue);
            updateBars(root, perpagevalue, uniqid);
        });

    }

    /**
     * Main method to be initialised for course analytics block
     *
     * @param  {String} root block root element id
     * @param  {String} uniqid uniqid for chart
     */
    var init = function(root, uniqid) {
        fetchLanguages();
        $(document).ready(function() {
            initEvents(root, uniqid);
            if ($(root).find('#analysischart').length) {
                createAnalysisChart(root, uniqid);
            }
        });
    };

    return {
        init: init
    };

});
