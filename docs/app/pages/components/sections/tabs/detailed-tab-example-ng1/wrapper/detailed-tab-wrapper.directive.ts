angular.module('app').directive('uxdDetailedTabWrapper', () => {
    return {
        restrict: 'E',
        template: require('./detailed-tab-wrapper.directive.html'),
        controller: 'DetailedTabsCtrl as vm',
        scope: true
    };
});

angular.module('app').controller('DetailedTabsCtrl', ['$scope', DetailedTabsCtrl]);

function DetailedTabsCtrl($scope: angular.IScope) {

    var vm = this;

    vm.$onDestroy = function() {
      $scope.$destroy();
    };

    // load tab templates as angular 1 templates
    require('!ng-cache-loader?name=tab-bar.html!./tab-bar.html');
    require('!ng-cache-loader?name=tab-sankey.html!./tab-sankey.html');
    require('!ng-cache-loader?name=tab-table.html!./tab-table.html');

    vm.detailedTabs = [{
        title: 'Bar Chart',
        content: 'tab-bar.html'
    }, {
        title: 'Sankey Chart',
        content: 'tab-sankey.html'
    }, {
        title: 'Fixed Header Table',
        content: 'tab-table.html'
    }];

}

angular.module('app').controller('TabsBarCtrl', TabsBarCtrl);

TabsBarCtrl.$inject = ['$colorService'];

  function TabsBarCtrl($colorService: any) {
    var vm = this;

    var flotChartColors = {
      chartColor: $colorService.getColor('chart1').toRgb(),
      highlightColor: $colorService.getColor('chart1').setAlpha(0.2).toRgba(),
      forecastFillColor: $colorService.getColor('chart1').setAlpha(0.3).toRgba(),
      gridColor: $colorService.getColor('grey4').toHex(),
      tickColor: $colorService.getColor('grey6').toHex(),
      borderColor: $colorService.getColor('grey2').setAlpha(0.5).toRgba(),
      white: '#ffffff'
    };

    vm.barChart = {
      data: [{
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
            'align': 'center'
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
        colors: [flotChartColors.chartColor],
        grid: {
          color: [flotChartColors.gridColor],
          hoverable: true,
          clickable: true,
          borderWidth: {
            'left': 1,
            'bottom': 1,
            'right': 0,
            'top': 0
          },
          borderColor: {
            'left': [flotChartColors.borderColor],
            'bottom': [flotChartColors.borderColor]
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
          content: function (label: any, xval: any, yval: any) {
            var content = 'x: ' + '%x' + ', y: ' + yval;
            return content;
          }
        }
      }
    };

  }

  angular.module('app').controller('TabsSankeyCtrl', TabsSankeyCtrl);

  function TabsSankeyCtrl() {
    var vm = this;
    vm.resizeId = null;

    vm.click = function (elem: any) {
      console.info(elem);
    };

    vm.data = {
      'columns': [{
        'id': 'data_source',
        'name': 'Repository',
        'ordinal': 0
      }, {
        'id': 'extraction_type',
        'name': 'Extraction',
        'ordinal': 1
      }, {
        'id': 'classification',
        'name': 'Classification',
        'ordinal': 2
      }, {
        'id': 'disposition_type',
        'name': 'Disposition',
        'ordinal': 3
      }],
      'nodes': [{
        'name': 'Not Classified',
        'type': 'classification',
        'id': 0,
        'value': 130,
        'datasize': 362969649
      }, {
        'name': 'Classified',
        'type': 'classification',
        'id': 1,
        'value': 243,
        'datasize': 326502171
      }, {
        'name': 'Phone Records',
        'type': 'data_source',
        'id': 2,
        'value': 14,
        'datasize': 512125362
      }, {
        'name': 'Lync Conversation',
        'type': 'data_source',
        'id': 3,
        'value': 32,
        'datasize': 62160
      }, {
        'name': 'Device Backup',
        'type': 'data_source',
        'id': 4,
        'value': 50,
        'datasize': 33409254
      }, {
        'name': 'Data Archive (Internal)',
        'type': 'data_source',
        'id': 5,
        'value': 104,
        'datasize': 35125228
      }, {
        'name': 'Exchange',
        'type': 'data_source',
        'id': 6,
        'value': 173,
        'datasize': 108749816
      }, {
        'name': 'Archived',
        'type': 'disposition_type',
        'id': 7,
        'value': 12,
        'datasize': 14860510
      }, {
        'name': 'Deleted',
        'type': 'disposition_type',
        'id': 8,
        'value': 34,
        'datasize': 32517566
      }, {
        'name': 'On Hold',
        'type': 'disposition_type',
        'id': 9,
        'value': 68,
        'datasize': 535140573
      }, {
        'name': 'Image',
        'type': 'extraction_type',
        'id': 10,
        'value': 16,
        'datasize': 2286386
      }, {
        'name': 'Audio',
        'type': 'extraction_type',
        'id': 11,
        'value': 22,
        'datasize': 525843218
      }, {
        'name': 'Text',
        'type': 'extraction_type',
        'id': 12,
        'value': 335,
        'datasize': 161342216
      }],
      'links': [{
        'source': 0,
        'target': 7,
        'value': 4,
        'datasize': 348
      }, {
        'source': 0,
        'target': 8,
        'value': 4,
        'datasize': 23572
      }, {
        'source': 1,
        'target': 7,
        'value': 8,
        'datasize': 14860162
      }, {
        'source': 1,
        'target': 9,
        'value': 27,
        'datasize': 217971281
      }, {
        'source': 1,
        'target': 8,
        'value': 30,
        'datasize': 32493994
      }, {
        'source': 0,
        'target': 9,
        'value': 41,
        'datasize': 317169292
      }, {
        'source': 5,
        'target': 11,
        'value': 4,
        'datasize': 6741424
      }, {
        'source': 6,
        'target': 11,
        'value': 4,
        'datasize': 6976432
      }, {
        'source': 5,
        'target': 10,
        'value': 6,
        'datasize': 73059
      }, {
        'source': 6,
        'target': 10,
        'value': 10,
        'datasize': 2213327
      }, {
        'source': 2,
        'target': 11,
        'value': 14,
        'datasize': 512125362
      }, {
        'source': 3,
        'target': 12,
        'value': 32,
        'datasize': 62160
      }, {
        'source': 4,
        'target': 12,
        'value': 50,
        'datasize': 33409254
      }, {
        'source': 5,
        'target': 12,
        'value': 94,
        'datasize': 28310745
      }, {
        'source': 6,
        'target': 12,
        'value': 159,
        'datasize': 99560057
      }, {
        'source': 11,
        'target': 1,
        'value': 4,
        'datasize': 187339593
      }, {
        'source': 10,
        'target': 0,
        'value': 6,
        'datasize': 226298
      }, {
        'source': 10,
        'target': 1,
        'value': 10,
        'datasize': 2060088
      }, {
        'source': 11,
        'target': 0,
        'value': 18,
        'datasize': 338503625
      }, {
        'source': 12,
        'target': 0,
        'value': 105,
        'datasize': 24239726
      }, {
        'source': 12,
        'target': 1,
        'value': 230,
        'datasize': 137102490
      }]
    };

    vm.options = {
      linkHoverHL: true,
      col: {
        headerLabelSpacing: 25,
        paddingTop: 0,
        paddingBottom: 0,
        headerLabelLength: 18
      },
      block: {
        truncateThreshold: 18,
        minWidth: 120,
        calloutData: {
          topLeft: {
            key: 'datasize',
            nodeLabel: false,
            defaultShow: false,
            valueUnit: 'B',
            label: 'data'
          },
          topRight: {
            key: 'value',
            nodeLabel: false,
            defaultShow: true,
            valueUnit: null,
            label: 'items'
          },
          bottomRight: {},
          bottomLeft: {
            key: 'name',
            nodeLabel: true,
            defaultShow: true
          }
        }
      },
      overflow: {
        tooltip: {
          label: 'items',
          showTooltip: true
        }
      }
    };
  }

  angular.module('app').controller('TabsTableCtrl', TabsTableCtrl);

  function TabsTableCtrl() {
      
    var vm = this;

    let chance = require('chance').Chance();
    
    vm.sampleTableData = [{
      id: 1,
      Data: 156,
      User: chance.name(),
      Task: '40%',
      Date: 'July 14, 2016'
    }, {
      id: 2,
      Data: 226,
      User: chance.name(),
      Task: '-20%',
      Date: 'July 15, 2016'
    }, {
      id: 3,
      Data: 52,
      User: chance.name(),
      Task: '26%',
      Date: 'July 21, 2016'
    }, {
      id: 4,
      Data: 461,
      User: chance.name(),
      Task: '-23%',
      Date: 'July 19, 2016'
    }, {
      id: 5,
      Data: 119,
      User: chance.name(),
      Task: '16%',
      Date: 'June 14, 2016'
    }, {
      id: 6,
      Data: 145,
      User: chance.name(),
      Task: '30%',
      Date: 'August 14, 2016'
    }, {
      id: 7,
      Data: 455,
      User: chance.name(),
      Task: '-28%',
      Date: 'September 14, 2016'
    }, {
      id: 8,
      Data: 156,
      User: chance.name(),
      Task: '80%',
      Date: 'October 14, 2016'
    }, {
      id: 9,
      Data: 240,
      User: chance.name(),
      Task: '-22%',
      Date: 'November 14, 2016'
    }];

  }