searchToolbarCtrl.$inject = ["$scope"];

export default function searchToolbarCtrl($scope) {
    var vm = this;

    vm.inputValue = "";
    vm.currentSearch = null;

    vm.selectTypeaheadValue = function($item, $model, $label) {
        vm.inputValue = $label;
        vm.search();
    };

    vm.search = function() {
        if (vm.currentSearch === vm.inputValue) return;

        $scope.onSearch(vm.inputValue);
        $scope.cancelSearch();

        //store the current search
        vm.currentSearch = vm.inputValue;
    };
}