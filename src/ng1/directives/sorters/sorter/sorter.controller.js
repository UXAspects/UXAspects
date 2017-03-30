SorterController.$inject = ["$scope"];

export default function SorterController($scope) {
    var vm = this;
    vm.sorteroption = $scope;
    vm.default = $scope.title;
    vm.sorteroptions = $scope.sorteroptions = [];
    vm.previousSorter = null;
}

SorterController.prototype.setTitle = function(title, defaultval) {

    var sorterAlreadySelected = null;
    this.sorteroption.name = title;
    this.sorteroption.class = (!defaultval) ? 'sorter-selected' : '';

    if (this.previousSorter === this) {

        if (defaultval) {
            sorterAlreadySelected = true;
            this.previousSorter = null;
        } else {
            sorterAlreadySelected = false;
            this.previousSorter = this;
        }
    }
};

SorterController.prototype.addSorterOptions = function(val) {
    this.sorteroptions.push(val);
};