class PartitionMapPopoverCtrl {

    lineChart: any;

    static $inject = ['$scope'];

    constructor(private $scope: angular.IScope) {

        // get the segment color from the parent scope
        var primaryColor = $scope.$parent.color;

        var lineData = this.randomData();

        this.lineChart = {
            data: [{
                data: lineData,
                lines: {
                    show: true,
                    fill: true,
                    lineWidth: 1,
                    fillColor: {
                        colors: [{
                            opacity: 0.0
                        }, {
                            opacity: 0.5
                        }, {
                            opacity: 0.8
                        }]
                    }
                },
                shadowSize: 0
            }],
            options: {
                xaxes: [{
                    show: false
                }],
                yaxes: [{
                    show: false
                }],
                colors: [primaryColor],
                grid: {
                    borderWidth: {
                        'bottom': 0,
                        'left': 0,
                        'top': 0,
                        'right': 0
                    },
                },
                tooltip: false
            }
        };
    }

    // generate some random data for the chart
    randomData() {
        var dataPoints = [];

        for (var i = 0; i <= 40; i++) {
            dataPoints.push([i, Math.floor((Math.random() * (150 - 40)) + 40)]);
        }

        return dataPoints;
    }

}

angular.module('app').controller('PartitionMapPopoverCtrl', ['$scope', PartitionMapPopoverCtrl]);