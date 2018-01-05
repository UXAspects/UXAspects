FilterContainerCtrl.$inject = ["$scope", "previewPaneProvider"];

export default function FilterContainerCtrl($scope, previewPaneProvider) {
  var vm = this;
  vm.filteroptions = $scope.filteroptions = [];
  vm.filters = $scope.filters = [];
  vm.clearTitle = $scope.clearTitle;
  vm.filterContainer = $scope;
  vm.clearedFilter = 0;
  vm.filterContainer.provider = previewPaneProvider;
}

FilterContainerCtrl.prototype.addFilterOptions = function (val) {
  this.filteroptions.push(val);
};

FilterContainerCtrl.prototype.addFilters = function (val) {
  this.filters.push(val);
};

FilterContainerCtrl.prototype.clearFilter = function () {

  for (var i = this.filteroptions.length - 1; i >= 0; i--) {
    this.filteroptions[i].select();
  }

  for (var idx = this.filters.length - 1; idx >= 0; idx--) {
    this.filters[idx].previousFilter = null;
    this.filters[idx].clearDynamic();
  }

  this.filterContainer.provider.preview.previewFile = "";
};

FilterContainerCtrl.prototype.setClass = function (filterAlreadySelected) {

  if (filterAlreadySelected !== null) {

    if (!filterAlreadySelected) {
      this.clearedFilter++;
    } else {
      this.clearedFilter--;
    }
  }

  this.filterContainer.containerClass = (this.clearedFilter > 0) ? 'clear-selected' : '';
};