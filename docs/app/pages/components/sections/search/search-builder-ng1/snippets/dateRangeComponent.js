angular.module('app').controller('DateRangeComponentCtrl', DateRangeComponentCtrl);

function DateRangeComponentCtrl() {
    var vm = this;

    vm.fromOpened = false;
    vm.toOpened = false;

    vm.fromOpen = function (event) {
        vm.fromOpened = true;
        event.stopPropagation();
    };

    vm.toOpen = function (event) {
        vm.toOpened = true;
        event.stopPropagation();
    };
}