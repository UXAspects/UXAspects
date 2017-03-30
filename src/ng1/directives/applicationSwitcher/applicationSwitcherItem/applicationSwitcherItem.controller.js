ApplicationSwitcherItemCtrl.$inject = ['$scope'];

export default function ApplicationSwitcherItemCtrl($scope) {
    var vm = this;
    vm.value = $scope.value;

    if (localStorage.getItem(vm.value) === "true") {
        vm.checked = true;
    } else {
        vm.checked = false;
    }

    vm.selectCallback = $scope.select;

    vm.select = function() {
        this.applicationSwitcherContainer.select(this);
        this.selectCallback();
    };
}