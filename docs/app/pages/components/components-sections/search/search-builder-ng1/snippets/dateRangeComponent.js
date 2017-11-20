angular.module('app').controller('DateRangeComponentCtrl', DateRangeComponentCtrl);

function DateRangeComponentCtrl() {
    var vm = this;

    vm.model = {
        from: {},
        to: {}
    };

    vm.fromOpened = false;
    vm.toOpened = false;

    vm.fromOpen = function (event) {
        vm.fromOpened = true;
        event.preventDefault();
        event.stopPropagation();
    };

    vm.toOpen = function (event) {
        vm.toOpened = true;
        event.preventDefault();
        event.stopPropagation();
    };
}