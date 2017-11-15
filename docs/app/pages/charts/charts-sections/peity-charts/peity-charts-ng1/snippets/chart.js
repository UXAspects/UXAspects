angular.module('app').controller('PeityChartCtrl', PeityChartCtrl);

PeityChartCtrl.$inject = ['$colorService'];

function PeityChartCtrl($colorService) {
  var pc = this;

  var peityChartColors = {
    chartColor1: $colorService.getColor('chart1').toRgb(),
    chartColor2: $colorService.getColor('chart2').toRgb(),
    chartFill1: $colorService.getColor('chart1').setAlpha(0.2).toRgba()
  };

  pc.LineChart = {
    data_1: [5, 3, 9, 6, 5, 9, 7, 3, 5, 2],
    data_2: [5, 3, 2, -1, -3, -2, 2, 3, 5, 2],
    data_3: [0, -3, -6, -4, -5, -4, -7, -3, -5, -2],
    options: {
      fill: [peityChartColors.chartFill1],
      stroke: [peityChartColors.chartColor1]
    }
  };

  pc.UpdatingLineChart = {
    data: [5, 3, 9, 6, 5, 9, 7, 3, 5, 2, 5, 3, 9, 6, 5, 9, 7, 3, 5, 2],
    options: {
      fill: [peityChartColors.chartFill1],
      stroke: [peityChartColors.chartColor1],
      width: 64
    },
    method: function (oldData) {
      // START - write code here.. that updates the old value to update the chart.
      var random = Math.round(Math.random() * 10);
      var newData = oldData;
      newData.shift();
      newData.push(random);
      // END

      // return the newData to update the chart.
      return newData;
    },
    updateinterval: 300
  };

  pc.BarChart = {
    data_1: [5, 3, 9, 6, 5, 9, 7, 3, 5, 2],
    data_2: [5, 3, 2, -1, -3, -2, 2, 3, 5, 2],
    options: {
      fill: [
        [peityChartColors.chartColor1],
        [peityChartColors.chartColor2]
      ]
    }
  };
}