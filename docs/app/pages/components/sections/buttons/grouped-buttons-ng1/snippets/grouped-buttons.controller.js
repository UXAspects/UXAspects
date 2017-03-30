angular.module("app").controller("GroupedButtonsCtrl", GroupedButtonsCtrl);

function GroupedButtonsCtrl() {
    var vm = this;

    vm.position = 'middle';
    vm.page = 1;

    vm.previousPage = function () {
        if (vm.page > 1) vm.page--;
    };

    vm.nextPage = function () {
        if (vm.page < 4) vm.page++;
    };
}