angular.module("app").controller("HorizontalBarChartCtrl", HorizontalBarChartCtrl);

HorizontalBarChartCtrl.$inject = ['$colorService'];

function HorizontalBarChartCtrl($colorService) {
    var bc = this;

    bc.horizbarChart = {
        data: [{
            label: 'bar',
            data: [
                [34, 1],
                [25, 2],
                [19, 3],
                [34, 4],
                [32, 5],
                [44, 6]
            ]
        }],
        baroptions: {
            series: {
                bars: {
                    show: true,
                    fill: true,
                    fillColor: {
                        colors: [{
                            opacity: 0.1
                        }, {
                            opacity: 0.1
                        }]
                    },
                    barWidth: 0.5,
                    lineWidth: 1,
                    horizontal: true,
                    align: 'center'
                },
                highlightColor: [$colorService.getColor("chart1").setAlpha(0.2).toRgba()],
                valueLabels: {
                    show: true,
                    valign: 'top',
                    plotAxis: 'y',
                    xoffset: -30,
                    yoffset: -5,
                    font: '13px \'Source Sans Pro\'',
                    fontcolor: '#545454',
                    labelFormatter: function (v) {
                        var ticks = ['.doc', '.ppt', '.pdf', '.xls', '.html', '.txt'];
                        return ticks[parseInt(v) - 1];
                    }
                }
            },
            xaxis: {
                tickDecimals: 0,
                color: [$colorService.getColor("secondary").toHex()]
            },
            yaxis: {
                ticks: []
            },
            colors: [$colorService.getColor("chart1").toRgb()],
            grid: {
                color: ['#999'],
                hoverable: true,
                clickable: true,
                borderWidth: {
                    left: 1,
                    bottom: 1,
                    right: 0,
                    top: 0
                },
                borderColor: {
                    left: [$colorService.getColor("grey1").setAlpha(0.2).toRgba()],
                    bottom: [$colorService.getColor("grey1").setAlpha(0.2).toRgba()]
                }
            },
            legend: {
                show: false
            },
            tooltip: {
                show: true,
                shifts: {
                    x: 0,
                    y: -38
                },
                content: function (label, xval, yval) {
                    var ticks = ['.doc', '.ppt', '.pdf', '.xls', '.html', '.txt'];
                    return 'x: ' + xval + ', y: ' + ticks[parseInt(yval) - 1];
                }
            }
        }
    };

}