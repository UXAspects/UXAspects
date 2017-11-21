  angular.module("app").controller("TabsBarCtrl", TabsBarCtrl);

  TabsBarCtrl.$inject = ['$colorService'];

  function TabsBarCtrl($colorService) {
    var vm = this;

    var flotChartColors = {
      chartColor: $colorService.getColor('chart1').toRgb(),
      highlightColor: $colorService.getColor("chart1").setAlpha(0.2).toRgba(),
      forecastFillColor: $colorService.getColor("chart1").setAlpha(0.3).toRgba(),
      gridColor: $colorService.getColor('grey4').toHex(),
      tickColor: $colorService.getColor('grey6').toHex(),
      borderColor: $colorService.getColor('grey2').setAlpha(0.5).toRgba(),
      white: '#ffffff'
    };

    vm.barChart = {
      data: [{
        label: "bar",
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
            'align': "center"
          },
          highlightColor: [flotChartColors.highlightColor],
          forecastFillColor: [flotChartColors.forecastFillColor],
          forecastColor: [flotChartColors.chartColor],
          forecastHighLightColor: [flotChartColors.highlightColor],
          forecastDashStyle: [5]
        },
        xaxis: {
          tickDecimals: 0,
          color: [flotChartColors.white],
          ticks: [
            [1, ".doc"],
            [2, ".ppt"],
            [3, ".pdf"],
            [4, ".xls"],
            [5, ".html"],
            [6, ".txt"],
            [7, ".csv"],
            [8, ".mht"]
          ]

        },
        colors: [flotChartColors.chartColor],
        grid: {
          color: [flotChartColors.gridColor],
          hoverable: true,
          clickable: true,
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
          show: false
        },
        tooltip: {
          show: true,
          shifts: {
            x: 0,
            y: -30
          },
          content: function (label, xval, yval) {
            var content = "x: " + "%x" + ", y: " + yval;
            return content;
          }
        }
      }
    };

  }