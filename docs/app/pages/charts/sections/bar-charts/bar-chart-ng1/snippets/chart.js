angular.module("app").controller("BarChartCtrl", BarChartCtrl);

BarChartCtrl.$inject = ['$colorService'];

function BarChartCtrl($colorService) {
    var bc = this;

    bc.data = [{
        label: 'bar',
        data: [
            [1, 34],
            [2, 25],
            [3, 19],
            [4, 34],
            [5, 32],
            [6, 44]
        ],
        forecastData: [
            [7, 50],
            [8, 67]
        ]
    }];

    bc.options = {
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
                align: 'center'
            },
            highlightColor: $colorService.getColor("chart1").setAlpha(0.2).toRgba(),
            forecastFillColor: $colorService.getColor("chart1").setAlpha(0.3).toRgba(),
            forecastColor: $colorService.getColor("chart1").setAlpha(0.8).toRgba(),
            forecastHighLightColor: $colorService.getColor("chart1").setAlpha(0.2).toRgba(),
            forecastDashStyle: [5]
        },
        xaxis: {
            tickDecimals: 0,
            color: $colorService.getColor("secondary").toHex(),
            ticks: [
                [1, '.doc'],
                [2, '.ppt'],
                [3, '.pdf'],
                [4, '.xls'],
                [5, '.html'],
                [6, '.txt'],
                [7, '.csv'],
                [8, '.mht']
            ]

        },
        colors: [$colorService.getColor('primary').toRgb()],
        grid: {
            color: '#999',
            hoverable: true,
            clickable: true,
            borderWidth: {
                left: 1,
                bottom: 1,
                right: 0,
                top: 0
            },
            borderColor: {
                left: $colorService.getColor("grey2").setAlpha(0.5).toRgba(),
                bottom: $colorService.getColor("grey2").setAlpha(0.5).toRgba()
            }
        },
        legend: {
            show: false
        },
        tooltip: {
            show: true,
            shifts: {
                x: 0,
                y: -30
            },
            content: function (label, xval, yval) {
                var content = 'x: ' + '%x' + ', y: ' + yval;
                return content;
            }
        }
    };
}