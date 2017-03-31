angular.module("app").controller("StackedBarChartCtrl", StackedBarChartCtrl);

StackedBarChartCtrl.$inject = ["$colorService"];

function StackedBarChartCtrl($colorService) {

    var bc = this;

    var flotChartColors = {
        chartColor1: $colorService.getColor("chart1").setAlpha(0.7).toRgba(),
        chartColor2: $colorService.getColor("chart2").setAlpha(0.7).toRgba(),
        chartColor3: $colorService.getColor("chart3").setAlpha(0.7).toRgba(),
        chartHover1: $colorService.getColor("chart1").setAlpha(0.2).toRgba(),
        chartHover2: $colorService.getColor("chart2").setAlpha(0.3).toRgba(),
        chartHover3: $colorService.getColor("chart3").setAlpha(0.3).toRgba(),
        forecastColor1: $colorService.getColor("chart1").setAlpha(0.3).toRgba(),
        forecastColor2: $colorService.getColor("chart2").setAlpha(0.2).toRgba(),
        forecastColor3: $colorService.getColor("chart3").setAlpha(0.2).toRgba(),
        gridColor: $colorService.getColor("grey4").toHex(),
        tickColor: $colorService.getColor("grey6").toHex(),
        transparent: "rgba(0, 0, 0, 0)",
        borderColor: $colorService.getColor("grey2").toHex()
    };

    var d1 = [],
        d2 = [],
        d3 = [],
        fd1 = [],
        fd2 = [],
        fd3 = [];

    for (var i = 1; i <= 10; i += 1) {
        d1.push([i, parseInt(Math.random() * 10000)]);
        d2.push([i, parseInt(Math.random() * 10000)]);
        d3.push([i, parseInt(Math.random() * 10000)]);
    }

    for (i = 11; i <= 13; i++) {
        fd1.push([i, parseInt(Math.random() * 10000)]);
        fd2.push([i, parseInt(Math.random() * 10000)]);
        fd3.push([i, parseInt(Math.random() * 10000)]);
    }

    function euroFormatter(v, axis) {
        return v.toFixed(axis.tickDecimals) + "€";
    }

    bc.stackBarChart = {
        data: [{
            label: "Sales 1",
            data: d1,
            color: [flotChartColors.chartColor1],
            highlightColor: [flotChartColors.chartHover1],
            forecastData: fd1,
            forecastFillColor: [flotChartColors.forecastColor1],
            forecastColor: [flotChartColors.chartColor1],
            forecastHighLightColor: [flotChartColors.chartHover1],
            forecastDashStyle: [5]
        }, {
            label: "Sales 2",
            data: d2,
            color: [flotChartColors.chartColor2],
            highlightColor: [flotChartColors.chartHover2],
            forecastData: fd2,
            forecastFillColor: [flotChartColors.forecastColor2],
            forecastColor: [flotChartColors.chartColor2],
            forecastHighLightColor: [flotChartColors.chartColor2],
            forecastDashStyle: [5]
        }, {
            label: "Sales 3",
            data: d3,
            color: [flotChartColors.chartColor3],
            highlightColor: [flotChartColors.chartHover3],
            forecastData: fd3,
            forecastFillColor: [flotChartColors.forecastColor3],
            forecastColor: [flotChartColors.chartColor3],
            forecastHighLightColor: [flotChartColors.chartHover3],
            forecastDashStyle: [5]
        }],
        stackoptions: {
            series: {
                stack: true,
                bars: {
                    show: true,
                    barWidth: 0.6,
                    lineWidth: 0,
                    align: "center"
                }
            },
            xaxis: {
                tickColor: "transparent"
            },
            yaxis: {
                tickFormatter: euroFormatter
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
                container: "#legendHolderBar",
                noColumns: 0
            },
            tooltip: {
                show: true,
                shifts: {
                    x: 0,
                    y: -44
                },
                content: "<strong>%s</strong><br/><span class=\"font-size-small\"> %y in cycle %x</span>"
            }
        }
    };
}