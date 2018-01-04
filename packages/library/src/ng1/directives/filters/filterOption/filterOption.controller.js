FilterOptionCtrl.$inject = ["$scope", "previewPaneProvider"];

export default function FilterOptionCtrl($scope, previewPaneProvider) {
  var vm = this;
  vm.selectCallback = $scope.select;
  vm.name = $scope.name;
  vm.default = $scope.default;
  vm.filterOption = $scope;
  
  if (vm.default) {
    vm.filterOption.selectedClass = true;
  }
  vm.filterOption.provider = previewPaneProvider;
}

FilterOptionCtrl.prototype.select = function () {
  this.filter.setTitle(this.name, this.default);

  for (var i = this.filter.filteroptions.length - 1; i >= 0; i--) {
    this.filter.filteroptions[i].deselect();
  }

  this.filterOption.selectedClass = true;
  this.selectCallback();
  this.filterOption.provider.preview.previewFile = "";
};

FilterOptionCtrl.prototype.deselect = function () {
  this.filterOption.selectedClass = false;
};