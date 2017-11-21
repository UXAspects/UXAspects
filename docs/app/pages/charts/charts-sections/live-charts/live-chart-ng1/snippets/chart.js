angular.module('app').controller('LiveChartCtrl', LiveChartCtrl);

LiveChartCtrl.$inject = ['$interval', '$colorService'];

function LiveChartCtrl($interval, $colorService) {

    var lc = this;

    var flotChartColors = {
        primary: $colorService.getColor('chart1').toRgb(),
        gridColor: $colorService.getColor('grey4').toHex(),
        tickColor: $colorService.getColor('grey6').toHex(),
        borderColor: $colorService.getColor('grey2').setAlpha(0.5).toRgba(),
        white: "#FFFFFF"
    };

    var livedata = [];
    var maximum = 300;

    function getRandomData() {

        if (livedata.length) {
            livedata = livedata.slice(1);
        }

        while (livedata.length < maximum) {
            var previous = livedata.length ? livedata[livedata.length - 1] : 50;
            var y = previous + Math.random() * 10 - 5;
            livedata.push(y < 0 ? 0 : y > 100 ? 100 : y);
        }

        // zip the generated y values with the x values

        var res = [];
        for (var i = 0; i < livedata.length; ++i) {
            res.push([i, livedata[i]]);
        }

        return res;
    }

    lc.liveChart = {
        series: [{
            data: getRandomData(),
            lines: {
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
            grid: {
                color: [flotChartColors.gridColor],
                tickColor: [flotChartColors.tickColor],
                borderWidth: {
                    "top": 0,
                    "bottom": 1,
                    "left": 1,
                    "right": 0
                },
                borderColor: {
                    "bottom": [flotChartColors.borderColor],
                    "left": [flotChartColors.borderColor]
                },
                minBorderMargin: 20,
                labelMargin: 10,
                backgroundColor: {
                    colors: [
                        [flotChartColors.white],
                        [flotChartColors.white]
                    ]
                },
                margin: {
                    top: 8,
                    bottom: 20,
                    left: 20
                },
                markings: function (axes) {
                    var markings = [];
                    var xaxis = axes.xaxis;
                    for (var x = Math.floor(xaxis.min); x < xaxis.max; x += xaxis.tickSize * 2) {
                        markings.push({
                            xaxis: {
                                from: x,
                                to: x + xaxis.tickSize
                            },
                            color: [flotChartColors.white]
                        });
                    }
                    return markings;
                }
            },
            colors: [flotChartColors.primary],
            xaxis: {
                tickFormatter: function () {
                    return "";
                }
            },
            yaxis: {
                min: 0,
                max: 110
            },
            legend: {
                show: true
            }
        }

    };

    $interval(function () {
        lc.liveChart.series[0].data = getRandomData();
    }, 40);


}