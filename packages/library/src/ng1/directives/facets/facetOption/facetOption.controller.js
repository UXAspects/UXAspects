FacetOptionCtrl.$inject = ["$scope", "previewPaneProvider", "$animate"];

export default function FacetOptionCtrl($scope, previewPaneProvider, $animate) {
  var vm = this;
  vm.option = $scope;
  vm.name = $scope.name;
  vm.selectCallback = $scope.select;
  vm.deselectCallback = $scope.deselect;
  vm.option.previewProvider = previewPaneProvider;
  vm.$animate = $animate;
}

FacetOptionCtrl.prototype.toggle = function() {
  var vm = this;

  //disable animations
  this.$animate.enabled(false);

  if (this.option.checked) {
    this.deselect();
  } else {
    this.select();
  }

  //once finished drawing - enable animations
  setTimeout(function() {
    vm.$animate.enabled(true);
  });
};

FacetOptionCtrl.prototype.deselect = function() {
  //if item is disabled do nothing on deselect
  if(this.option.disabled) return;

  this.facetContainer.removeSelected(this);
  this.option.checked = false;
  this.option.checkedIcon = false;
  //If there is a preview pane, then show initial message.
  this.option.previewProvider.preview.previewFile = "";
  // deselect call back is invoked when user wants, else user will handle this.
  if(!this.facetContainer.isClearAllFn) {
      this.deselectCallback();
  }
};

FacetOptionCtrl.prototype.select = function() {
  //if item is disabled do nothing on select
  if(this.option.disabled) return;

  this.facetContainer.addSelected(this);
  this.option.checked = true;
  this.option.checkedIcon = true;
  //If there is a preview pane, then show initial message.
  this.option.previewProvider.preview.previewFile = "";
  this.selectCallback();
};
