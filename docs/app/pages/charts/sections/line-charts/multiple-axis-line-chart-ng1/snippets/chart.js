angular.module('app').controller('MultipleAxisLineChartCtrl', MultipleAxisLineChartCtrl);

MultipleAxisLineChartCtrl.$inject = ['flotDataService', '$colorService'];

function MultipleAxisLineChartCtrl(flotDataService, $colorService) {

    var lc = this;

    var flotChartColors = {
        chart1Color: $colorService.getColor('chart1').toRgb(),
        chart2Color: $colorService.getColor('chart2').toRgb(),
        gridColor: $colorService.getColor('grey4').toHex(),
        tickColor: $colorService.getColor('grey6').toHex(),
        borderColor: $colorService.getColor('grey2').setAlpha(0.5).toRgba()
    };

    var d1 = [],
        d2 = [],
        d3 = [],
        d4 = [],
        d5 = [],
        d6 = [];

    for (var i = 1; i <= 10; i += 1) {
        d1.push([i, parseInt(Math.random() * 10000)]);
        d2.push([i, parseInt(Math.random() * 10000)]);
        d3.push([i, parseInt(Math.random() * 10000)]);
    }

    for (i = 11; i <= 13; i += 1) {
        d4.push([i, parseInt(Math.random() * 10000)]);
        d5.push([i, parseInt(Math.random() * 10000)]);
        d6.push([i, parseInt(Math.random() * 10000)]);
    }

    var oilprices = flotDataService.getOilPrices();

    var exchangerates = flotDataService.getExchangeRates();

    function euroFormatter(v, axis) {
        return v.toFixed(axis.tickDecimals) + "€";
    }

    lc.multiaxesChart = {
        data: [{
            data: oilprices,
            label: "Oil price ($)",
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
            shadowSize: 0,
            highlightColor: [flotChartColors.chart1Color]
        }, {
            data: exchangerates,
            label: "USD/EUR exchange rate",
            yaxis: 2,
            lines: {
                show: true,
                fill: true,
                lineWidth: 1,
                fillColor: {
                    colors: [{
                        opacity: 0.2
                    }, {
                        opacity: 0.2
                    }]
                }
            },
            shadowSize: 0,
            highlightColor: [flotChartColors.chart2Color]
        }],
        options: {
            xaxes: [{
                mode: 'time'
            }],
            yaxes: [{
                min: 0
            }, {
                // align if we are to the right
                position: "right",
                alignTicksWithAxis: 1,
                tickFormatter: euroFormatter
            }],
            legend: {
                position: 'sw'
            },
            colors: [flotChartColors.chart1Color, flotChartColors.chart2Color],
            grid: {
                color: [flotChartColors.gridColor],
                clickable: true,
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
                hoverable: true //IMPORTANT! this is needed for tooltip to work,
            },
            tooltip: {
                show: true,
                shifts: {
                    x: 0,
                    y: -35
                },
                content: "%s for %x was %y",
                xDateFormat: "%y-%0m-%0d"
            }
        }
    };

}