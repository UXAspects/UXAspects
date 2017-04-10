angular.module("app").controller("InputExpandCtrl", InputExpandCtrl);

function InputExpandCtrl() {
    var vm = this;

    vm.filterSearchExpanded = false;

    vm.expandFilter = function(value) {
        vm.filterSearchExpanded = value;
    };

}