PreviewPaneToggleCtrl.$inject = ["$scope", "previewPaneProvider"];

export default function PreviewPaneToggleCtrl($scope, previewPaneProvider) {
  var vm = this;
  vm.previewpanetoggle = $scope;
  vm.provider = previewPaneProvider;
  $scope.setPreview = previewPaneProvider.preview.previewOn;
}

PreviewPaneToggleCtrl.prototype.togglePreview = function () {
  this.provider.preview.previewOn = !this.provider.preview.previewOn;
  this.previewpanetoggle.setPreview = this.provider.preview.previewOn;

  return this.previewpanetoggle.setPreview;
};