angular.module('app').controller('ProgressBarDemoCtrl', ProgressBarDemoCtrl);

function ProgressBarDemoCtrl() {
    var vm = this;

    vm.percentComplete = 15;

    vm.random = function () {
        vm.percentComplete = Math.floor((Math.random() * 100) + 1);
    };
}