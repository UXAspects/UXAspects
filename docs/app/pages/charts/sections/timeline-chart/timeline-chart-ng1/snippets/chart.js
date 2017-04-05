angular.module("app").controller("TimelineChartCtrl", TimelineChartCtrl);

TimelineChartCtrl.$inject = ['$scope', 'lineDataService', '$colorService'];

function TimelineChartCtrl($scope, lineDataService, $colorService) {

    var tc = this;

    var flotChartColors = {
        chartColor: $colorService.getColor('chart1').toRgb(),
        chartFill: $colorService.getColor('chart1').setAlpha(0.2).toRgba(),
        gridColor: $colorService.getColor('grey4').toHex(),
        tickColor: $colorService.getColor('grey6').toHex(),
        borderColor: $colorService.getColor('grey2').setAlpha(0.5).toRgba(),
        transparent: "rgba(0, 0, 0, 0)",
    };

    function randomTimelineData() {
        var min = 1167692400000; //represents 1 January 2007
        var max = 1220911200000; //represents 8 September 2008
        var step = 345600000; // represents 4 days

        var dataPoints = [];

        //for every 4 days between specified dates create a random number between 80 & 150
        for (var i = min; i <= max; i += step) {
            //Make March 2 2008 to april 2 2008 zero
            if (!(i > 1204457710000 && i < 1207142075000)) {
                dataPoints.push(i);
                dataPoints.push(Math.floor(Math.random() * (150 - 80) + 80));
            }

        }

        var offset = 259200000; // 3 days
        dataPoints = lineDataService.addZeroPoints(dataPoints, offset);
        return dataPoints;
    }

    //The preselected range on the timeline
    var rangeStart = 1205708400000;
    var rangeEnd = 1217628000000;

    //store so we can share between the two timeline charts
    var timelineData = randomTimelineData();

    //Timeline Chart
    tc.timelineChart = {
        data: [{
            data: timelineData,
            lines: {
                show: true,
                fill: true,
                lineWidth: 1,
                fillColor: {
                    colors: [{
                        opacity: 0.0
                    }, {
                        opacity: 0.3
                    }]
                }
            },
            shadowSize: 0
        }],
        options: {
            xaxes: [{
                mode: 'time'
            }],
            yaxes: [{
                min: 0,
                max: 200,
                show: false
            }],
            colors: [flotChartColors.chartColor],
            grid: {
                color: [flotChartColors.gridColor],
                tickColor: [flotChartColors.transparent]
            },
            tooltip: false,
            timeline: {
                color: flotChartColors.chartFill,
                start: rangeStart,
                end: rangeEnd,
                zoom: {
                    enabled: true,
                    minimumRange: 604800000
                },
                keyboardNavigation: true,
                dragHandles: {
                    width: 5,
                    color: flotChartColors.chartColor,
                    tooltips: {
                        enabled: true,
                        onHover: true,
                        onDrag: true,
                        onDragEnd: false
                    },
                    tooltipFormatter: function (value) {
                        var date = new Date(value);
                        var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                        return date.getDate() + " " + monthNames[date.getMonth()] + " " + date.getFullYear();
                    }
                },
                enabled: true,
                callback: function (position) {
                    //set new values for the min and max of the detailed chart
                    tc.detailedChart.options.xaxes[0].min = position.start;
                    tc.detailedChart.options.xaxes[0].max = position.end;

                    //ensure the chart updates
                    $scope.$digest();
                }
            }
        }
    };

    tc.detailedChart = {
        data: [{
            data: timelineData,
            lines: {
                show: true,
                fill: true,
                lineWidth: 1,
                fillColor: {
                    colors: [{
                        opacity: 0.1
                    }, {
                        opacity: 0.1
                    }]
                }
            },
            shadowSize: 0
        }],
        options: {
            xaxes: [{
                mode: 'time',
                min: rangeStart,
                max: rangeEnd,
                tickColor: [flotChartColors.transparent]
            }],
            yaxes: [{
                min: 0,
                max: 201
            }],
            legend: {
                show: false
            },
            colors: [flotChartColors.chartColor],
            grid: {
                color: [flotChartColors.gridColor],
                tickColor: [flotChartColors.tickColor],
                borderWidth: {
                    "bottom": 1,
                    "left": 1,
                    "top": 0,
                    "right": 0
                },
                borderColor: {
                    "bottom": [flotChartColors.borderColor],
                    "left": [flotChartColors.borderColor]
                },
                hoverable: true
            },
            tooltip: {
                show: true,
                shifts: {
                    x: 0,
                    y: -48
                },
                content: "<strong>%x</strong><br/>%y,000 items added"
            }
        }
    };
}