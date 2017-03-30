angular.module("app").controller("DetailRowHeaderPopoverCtrl", DetailRowHeaderPopoverCtrl);

DetailRowHeaderPopoverCtrl.$inject = ["$scope", "exampleDataService"];

function DetailRowHeaderPopoverCtrl($scope, exampleDataService) {
    var vm = this;

    vm.scrollBarConfig = {
        autoReinitialise: true,
        autoReinitialiseDelay: 50,
        enableKeyboardNavigation: true,
        scrollMargin: 5
    };

    // public values
    vm.filterList = [];

    vm.updateSelected = function (value) {
        value.active = !value.active;
    };

    // private values
    var activeFilters = [];
    var addresses = exampleDataService.getFilterList();

    for (var i = 0; i < addresses.length; i++) {
        var address = {
            address: addresses[i],
            active: false
        };
        vm.filterList.push(address);
    }

    vm.apply = function () {
        activeFilters = [];
        for (var i = 0; i < vm.filterList.length; i++) {
            if (vm.filterList[i].active) {
                activeFilters.push(vm.filterList[i].address);
            }
        }
        if (activeFilters.length > 0) {
            $scope.setFilterActive(true);
        } else {
            $scope.setFilterActive(false);
        }
        exampleDataService.applyFilters(activeFilters);
        $scope.closePopover();
    };

    vm.reset = function () {
        activeFilters = [];
        for (var i = 0; i < vm.filterList.length; i++) {
            vm.filterList[i].active = false;
        }
        $scope.setFilterActive(false);
        exampleDataService.applyFilters(activeFilters);
    };

    vm.cancel = function () {
        $scope.closePopover();
    };

    $scope.$on("detailRowHeaderPopoverClosed", function () {
        for (var i = 0; i < vm.filterList.length; i++) {
            if (activeFilters.indexOf(vm.filterList[i].address) > -1) {
                vm.filterList[i].active = true;
            } else {
                vm.filterList[i].active = false;
            }
        }
    });
}