/* eslint-disable no-undef */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
define(['jquery', 'core/ajax', 'local_edwiserpagebuilder/remuiblck/chartjs','local_edwiserpagebuilder/remuiblck/bootstrap-select'], function($, Ajax) {

    var SELECTORS = {
        PIE_CHART_BLOCK: '#epb-pieChartblock',
        COURSE_CATEGORY_LISTBLOCK: '#epb-coursecategorylistblock',
        ENROLL_STATS_NOUSERERROR: '.epb-enroll-stats-nouserserror',
        CHART_LEGEND: '.epb-chart-legend',
        ENROLL_STATS_ERROR: '.epb-enroll-stats-error',
    };

    var myDoughnuts = {};
    var legendtemplatestr1 = "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%>";
    var legendtemplatestr2 = "<span style=\"background-color:<%=segments[i].fillColor%>\"></span>";
    var legendtemplatestr3 = "<%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>";
    var pieOptions = {
        // Boolean - Whether we should show a stroke on each segment
        segmentShowStroke: true,
        // String - The colour of each segment stroke
        segmentStrokeColor: "#fff",
        // Number - The width of each segment stroke
        segmentStrokeWidth: 1,
        // Number - The percentage of the chart that we cut out of the middle
        percentageInnerCutout: 50, // This is 0 for Pie charts
        // Number - Amount of animation steps
        animationSteps: 100,
        // String - Animation easing effect
        /* animation: {
            duration: 2000,
            easing: "easeOutBounce"
        },*/
        // Boolean - Whether we animate the rotation of the Doughnut
        animateRotate: true,
        // Boolean - Whether we animate scaling the Doughnut from the centre
        animateScale: false,
        // Boolean - whether to make the chart responsive to window resizing
        responsive: true,
        // Boolean - whether to maintain the starting aspect ratio or not when responsive,
        // if set to false, will take up entire container
        maintainAspectRatio: true,
        // String - A legend template
        legendTemplate: legendtemplatestr1 + legendtemplatestr2 + legendtemplatestr3,
        // String - A tooltip template
        tooltipTemplate: "<%=value %> <%=label%> users",
        legend: {
            display: false,
        },
        plugins: {
            legend: {
              display: false
            }
        }
    };

    /**
     * @param {String} response
     */
    function renderPieChart(response, root, uniqid) {

        if (myDoughnuts[uniqid] && myDoughnuts[uniqid] !== null) {
            myDoughnuts[uniqid].destroy();
        }

        var pieChartCanvas = $(root + " " + SELECTORS.PIE_CHART_BLOCK).get(0).getContext("2d");

        var doughnutData = {
            labels: response.labels,
            datasets: [{
                data: response.data,
                backgroundColor: response.background_color,
                hoverBackgroundColor: response.hoverBackground_color,
            }]
        };

        myDoughnuts[uniqid] = new Chart(pieChartCanvas, {type: 'doughnut', data: doughnutData, options: pieOptions});
    }


    /**
     *
     */
    function createpiechart(root, uniqid) {
        var categoryId = $(root + " " + SELECTORS.COURSE_CATEGORY_LISTBLOCK + ' option:selected').data('id');
        Ajax.call([{
            methodname: 'local_edwiserpagebuilder_remuiblck_action',
            args: {
                action: "get_enrolled_users_by_category",
                config: JSON.stringify({
                    "categoryid": categoryId,
                })
            }

        }])[0].done(function(response) {
            response = JSON.parse(response);
            if (response === null) {
                $(root + ' canvas' + SELECTORS.PIE_CHART_BLOCK).hide();
                $(root + ' ' + SELECTORS.ENROLL_STATS_NOUSERERROR).hide();
                $(root + ' ' + SELECTORS.CHART_LEGEND).hide();
                $(root + ' ' + SELECTORS.ENROLL_STATS_ERROR).show();
            } else {
                $(root + ' ' + SELECTORS.ENROLL_STATS_ERROR).hide();
                $(root + ' ' + SELECTORS.ENROLL_STATS_NOUSERERROR).hide();
                $(root + ' ' + SELECTORS.CHART_LEGEND).show();
                $(root + ' canvas' + SELECTORS.PIE_CHART_BLOCK).show();

                $(root + ' ' + SELECTORS.CHART_LEGEND).empty();
                var colors = ['#264485', '#0051F9', '#37BE71', '#4caf50', '#8bc34a', '#ffeb3b', '#ff9800', '#f44336', '#9c27b0', '#673ab7', '#3f51b5'];
                $.each(response.labels, function (index, value) {
                    $(root + ' ' + SELECTORS.CHART_LEGEND).append('<li class="list-group-item d-flex align-items-center flex-gap-4 p-0"><span class="badge badge-round text-trasparent" style="background-color:' + colors[index] + ';">1</span>' + '<span >' + value + ':' + '<span class="st-count">' + response.data[index] + '</span>' + '</span>' + '</li>');
                });

                renderPieChart(response, root, uniqid);
            }

        }).fail(function() {
            $(root + ' canvas' + SELECTORS.PIE_CHART_BLOCK).hide();
            $(root + ' ' + SELECTORS.ENROLL_STATS_ERROR).show();
        });
    }

    // Update pie chart on category selection
    function initializeEvents(root, uniqid) {
        if ($(root + ' select').length) {
            $(root + ' select' + SELECTORS.COURSE_CATEGORY_LISTBLOCK).on('change', function() {
                createpiechart(root, uniqid);
            });
            createpiechart(root, uniqid);
        }
        $(root + ' ' + SELECTORS.COURSE_CATEGORY_LISTBLOCK).selectpicker();
    }


    var init = function(root, uniqid) {
        $(document).ready(function() {
            initializeEvents(root, uniqid);
        });
    };

    return {
        init: init
    };
    // ----------------------------------
    // - END PIE CHART - DOUGHNUT
    // ----------------------------------

});
