angular.module('app').controller('UtilitiesCtrl', UtilitiesCtrl);

UtilitiesCtrl.$inject = ['$colorService'];

function UtilitiesCtrl($colorService) {
    var vm = this;

    vm.colors = {
        chartColor: $colorService.getColor('primary').toRgb(),
        chartFill: $colorService.getColor('accent').setAlpha(0.2).toRgba(),
        gridColor: $colorService.getColor('chart1').toHex(),
    };

}