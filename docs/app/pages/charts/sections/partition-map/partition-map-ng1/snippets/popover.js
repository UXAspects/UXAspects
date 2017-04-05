angular.module("app").controller("PartitionMapPopoverCtrl", ['$colorService', PartitionMapPopoverCtrl]);

function PartitionMapPopoverCtrl($colorService) {
    var vm = this;

    //get the segment color from the parent scope
    var primaryColor = $colorService.getColor('chart2').toHex();

    var lineData = randomData();

    vm.lineChart = {
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
                    "bottom": 0,
                    "left": 0,
                    "top": 0,
                    "right": 0
                },
            },
            tooltip: false
        }
    };

    //generate some random data for the chart
    function randomData() {
        var dataPoints = [];

        for (var i = 0; i <= 40; i++) {
            dataPoints.push([i, Math.floor((Math.random() * (150 - 40)) + 40)]);
        }

        return dataPoints;
    }

}