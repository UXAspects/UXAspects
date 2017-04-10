angular.module("app").controller("StackedLineChartCtrl", StackedLineChartCtrl);

StackedLineChartCtrl.$inject = ['$colorService'];

function StackedLineChartCtrl($colorService) {

    var lc = this;

    var flotChartColors = {
        chart1Color: $colorService.getColor('chart1').toRgb(),
        chart2Color: $colorService.getColor('chart2').toRgb(),
        chart3Color: $colorService.getColor('chart3').toRgb(),
        chart1Fill: $colorService.getColor('chart1').setAlpha(0.2).toRgba(),
        chart2Fill: $colorService.getColor('chart2').setAlpha(0.2).toRgba(),
        chart3Fill: $colorService.getColor('chart3').setAlpha(0.2).toRgba(),
        chart1Hover: $colorService.getColor('chart1').setAlpha(0.3).toRgba(),
        chart2Hover: $colorService.getColor('chart2').setAlpha(0.3).toRgba(),
        chart3Hover: $colorService.getColor('chart3').setAlpha(0.3).toRgba(),
        chart1Forecast: $colorService.getColor('chart1').setAlpha(0.06).toRgba(),
        chart2Forecast: $colorService.getColor('chart2').setAlpha(0.06).toRgba(),
        chart3Forecast: $colorService.getColor('chart3').setAlpha(0.06).toRgba(),
        gridColor: $colorService.getColor('grey4').toHex(),
        tickColor: $colorService.getColor('grey6').toHex(),
        borderColor: $colorService.getColor('grey2').setAlpha(0.5).toRgba(),
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

    function euroFormatter(v, axis) {
        return v.toFixed(axis.tickDecimals) + "€";
    }

    lc.stackLineChart = {
        data: [{
            label: "Sales 1",
            data: d1,
            color: [flotChartColors.chart1Color],
            fillColor: flotChartColors.chart1Fill,
            highlightColor: [flotChartColors.chart1Hover],
            shadowSize: 0,
            forecastData: d4,
            forecastFillColor: [flotChartColors.chart1Forecast],
            forecastColor: [flotChartColors.chart1Color],
            forecastHighLightColor: [flotChartColors.chart1Hover]
        }, {
            label: "Sales 2",
            data: d2,
            color: [flotChartColors.chart2Color],
            fillColor: flotChartColors.chart2Fill,
            highlightColor: [flotChartColors.chart2Hover],
            shadowSize: 0,
            forecastData: d5,
            forecastFillColor: [flotChartColors.chart2Forecast],
            forecastColor: [flotChartColors.chart2Color],
            forecastDashStyle: [5],
            forecastHighLightColor: [flotChartColors.chart2Hover]
        }, {
            label: "Sales 3",
            data: d3,
            color: [flotChartColors.chart3Color],
            fillColor: [flotChartColors.chart3Fill],
            highlightColor: [flotChartColors.chart3Hover],
            shadowSize: 0,
            forecastData: d6,
            forecastFillColor: [flotChartColors.chart3Forecast],
            forecastColor: [flotChartColors.chart3Color],
            forecastDashStyle: [5],
            forecastHighLightColor: [flotChartColors.chart3Hover]
        }],
        stackoptions: {
            series: {
                stack: true,
                lines: {
                    show: true,
                    fill: true
                }
            },
            yaxis: {
                tickFormatter: euroFormatter
            },
            xaxis: {
                tickDecimals: 0
            },
            grid: {
                color: [flotChartColors.gridColor],
                hoverable: true,
                clickable: true,
                tickcolor: [flotChartColors.tickColor],
                borderWidth: {
                    "left": 1,
                    "bottom": 1,
                    "right": 0,
                    "top": 0
                },
                borderColor: {
                    "left": [flotChartColors.borderColor],
                    "bottom": [flotChartColors.borderColor]
                }
            },
            legend: {
                show: true,
                container: "#legendHolderLine",
                noColumns: 0
            },
            tooltip: {
                show: true,
                shifts: {
                    x: 0,
                    y: -35
                },
                content: "%s - %y in cycle %x"
            }
        }
    };

}