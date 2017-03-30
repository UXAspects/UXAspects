SorterOptionCtrl.$inject = ["$scope", "previewPaneProvider"];

export default function SorterOptionCtrl($scope, previewPaneProvider) {
    var vm = this;
    vm.selectCallback = $scope.select;
    vm.name = $scope.name;
    vm.default = $scope.default;
    vm.sorterOption = $scope;

    if (vm.default) {
        vm.sorterOption.selectedClass = true;

    }
    vm.sorterOption.provider = previewPaneProvider;
}

SorterOptionCtrl.prototype.select = function() {

    this.sorter.setTitle(this.name, this.default);
    for (var i = this.sorter.sorteroptions.length - 1; i >= 0; i--) {
        this.sorter.sorteroptions[i].deselect();
    }
    this.sorterOption.selectedClass = true;
    this.selectCallback();
    this.sorterOption.provider.preview.previewFile = "";
};

SorterOptionCtrl.prototype.deselect = function() {
    this.sorterOption.selectedClass = false;
};