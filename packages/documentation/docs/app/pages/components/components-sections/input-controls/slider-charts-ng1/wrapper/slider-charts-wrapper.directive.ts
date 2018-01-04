angular.module('app').directive('uxdSliderChartsWrapper', () => {
    return {
        restrict: 'E',
        controller: 'SlidersChartsCtrl as vm',
        template: require('./slider-charts-wrapper.directive.html'),
        scope: true
    };
});

angular.module('app').controller('SlidersChartsCtrl', SlidersChartsCtrl);

SlidersChartsCtrl.$inject = ['$colorService', '$scope'];

function SlidersChartsCtrl($colorService: any, $scope: angular.IScope) {

    var vm = this;

    vm.$onDestroy = function () {
        $scope.$destroy();
    };


    var accentColor = $colorService.getColor('accent').toRgb();

    vm.value = {
        low: 1,
        high: 30
    };

    vm.sliderOptions = {
        type: 'range',
        handles: {
            style: 'button',
            callout: {
                trigger: 'hover',
                background: '#464646',
                color: '#fff',
                formatter: function (value: any) {
                    return value;
                }
            }
        },
        track: {
            height: 'narrow',
            min: 1,
            max: 30,
            ticks: {
                snap: 'major',
                major: {
                    show: false,
                    steps: 1,
                    labels: true,
                    formatter: function (value: any) {
                        return value;
                    }
                },
                minor: {
                    show: false,
                    steps: 5,
                    labels: false,
                    formatter: function (value: any) {
                        return value;
                    }
                }
            },
            colors: {
                lower: '#f2f2f2',
                range: accentColor,
                higher: '#f2f2f2'
            }
        }
    };

    vm.chart = {
        data: [{
            label: 'line',
            data: [
                [1, 34],
                [2, 25],
                [3, 19],
                [4, 34],
                [5, 32],
                [6, 44],
                [7, 34],
                [8, 25],
                [9, 19],
                [10, 36],
                [11, 20],
                [12, 41],
                [13, 34],
                [14, 20],
                [15, 31],
                [16, 34],
                [17, 32],
                [18, 44],
                [19, 19],
                [20, 25],
                [21, 19],
                [22, 21],
                [23, 32],
                [24, 30],
                [25, 34],
                [26, 25],
                [27, 45],
                [28, 50],
                [29, 55],
                [30, 48]
            ]
        }],
        options: {
            series: {
                lines: {
                    show: true,
                    lineWidth: 0,
                    fill: true,
                    fillColor: {
                        colors: [{
                            opacity: 0.1
                        }, {
                            opacity: 0.3
                        }]
                    }
                },
                shadowSize: 0,
                highlightColor: [accentColor],
                forecastDashStyle: [5],
            },
            xaxis: {
                show: false
            },
            yaxis: {
                show: false
            },
            colors: [accentColor],
            grid: {
                borderWidth: {
                    'left': 0,
                    'bottom': 0,
                    'right': 0,
                    'top': 0
                }
            },
            legend: {
                show: false
            },
            tooltip: {
                show: true,
                snap: true,
                shifts: {
                    x: 0,
                    y: -35
                },
                content: 'x: %x, y: %y'
            }
        }
    };

    // Second example

    vm.valueTwo = {
        low: 7,
        high: 26
    };

    vm.sliderOptionsTwo = {
        type: 'range',
        handles: {
            style: 'button',
            callout: {
                trigger: 'hover',
                background: '#464646',
                color: '#fff',
                formatter: function (value: any) {
                    return value;
                }
            }
        },
        track: {
            height: 'narrow',
            min: 1,
            max: 31,
            ticks: {
                snap: 'all',
                major: {
                    show: true,
                    steps: 5,
                    labels: true,
                    formatter: function (value: any) {
                        return value;
                    }
                },
                minor: {
                    show: true,
                    steps: 1,
                    labels: false,
                    formatter: function (value: any) {
                        return value;
                    }
                }
            },
            colors: {
                lower: '#f2f2f2',
                range: accentColor,
                higher: '#f2f2f2'
            }
        }
    };

    vm.chartTwo = {
        data: [{
            label: 'line',
            data: [
                [1, 14],
                [2, 25],
                [3, 34],
                [4, 19],
                [5, 20],
                [6, 21],
                [7, 22],
                [8, 24],
                [9, 17],
                [10, 18],
                [11, 26],
                [12, 32],
                [13, 41],
                [14, 25],
                [15, 32],
                [16, 35],
                [17, 32],
                [18, 33],
                [19, 40],
                [20, 42],
                [21, 44],
                [22, 45],
                [23, 32],
                [24, 30],
                [25, 34],
                [26, 42],
                [27, 45],
                [28, 50],
                [29, 55],
                [30, 48],
                [31, 39]
            ]
        }],
        options: {
            series: {
                lines: {
                    show: true,
                    lineWidth: 0,
                    fill: true,
                    fillColor: {
                        colors: [{
                            opacity: 0.1
                        }, {
                            opacity: 0.3
                        }]
                    }
                },
                shadowSize: 0,
                highlightColor: [accentColor],
                forecastDashStyle: [5],
            },
            xaxis: {
                show: false
            },
            yaxis: {
                show: false
            },
            colors: [accentColor],
            grid: {
                borderWidth: {
                    'left': 0,
                    'bottom': 0,
                    'right': 0,
                    'top': 0
                }
            },
            legend: {
                show: false
            },
            tooltip: {
                show: true,
                snap: true,
                shifts: {
                    x: 0,
                    y: -35
                },
                content: 'x: %x, y: %y'
            }
        }
    };

}