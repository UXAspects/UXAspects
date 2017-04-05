angular.module('app').controller('NestedDonutChartCtrl', NestedDonutChartCtrl);

NestedDonutChartCtrl.$import = ['$colorService'];

function NestedDonutChartCtrl($colorService) {

    var dc = this;

    // nested donut chart
    dc.nestedDonutData = [{
      label: 'documents',
      color: $colorService.getColor('chart1').toHex(),
      value: 23456
    }, {
      label: 'reviewed',
      color: $colorService.getColor('chart2').toHex(),
      value: 19876
    }, {
      label: 'produced',
      color: $colorService.getColor('chart3').toHex(),
      value: 11123
    }];

    dc.nestedDonutOptions = {
        size: 100,
        donutWidth: 4,
        donutSpacing: 4,
        hoverAnimation: true,
        onHover: function(data) {
        // perform any actions here on hover
      },
      onClick: function(data) {
        // perform any actions here on hover        
      },
      tooltip: {
        show: true,
        content: function(data) {
            return '<div style="display: inline-block; width: 10px; height: 10px; margin-right: 2px; background-color: ' + data.color + '"></div> <b>' + data.value + '</b> ' + data.label;
        },
        shifts: {
            x: 0,
            y: 0
        }
      }
    };

}