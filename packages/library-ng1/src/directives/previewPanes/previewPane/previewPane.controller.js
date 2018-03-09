PreviewPaneCtrl.$inject = ["$scope", "$rootScope", "previewPaneProvider", "windowCommunicationService"];

export default function PreviewPaneCtrl($scope, $rootScope, previewPaneProvider, windowCommunicationService) {
  var vm = this;
  vm.previewpane = $scope;
  vm.provider = previewPaneProvider;
  vm.previewOn = previewPaneProvider.preview.previewOn;

  // if name if broadcast from previewPaneWindow directive, then open preview pane window
  $scope.$on('$previewPaneWindowOpen', function (event, data) {
    if(vm.previewpane.previewName === data) {
      vm.openInNewWindow();
    }
  });

  vm.previewWindow = null;

  // if preview file changes while window open, reload window to show the new file
  $scope.$watch(function () {
    return vm.previewpane.previewFile;
  }, function (nV, oV) {
    if (nV === oV) return;
    if (vm.previewWindow === null || vm.previewWindow.closed) return;

    windowCommunicationService.updateContent(vm.previewpane.$parent, nV);

  });

  vm.updatePreviewOn = function (nv) {
    vm.previewOn = nv;
  };

  vm.updateHasPreviewFile = function (nv) {
    vm.provider.preview.previewFile = nv;
    vm.previewpane.previewFile = vm.provider.preview.previewFile;

    return vm.previewpane.previewFile;
  };

  vm.openInNewWindow = function () {
    // if the button is clicked while the preview window is open, return
    if ((vm.previewWindow && !vm.previewWindow.closed) || vm.previewpane.previewFile === undefined || vm.previewpane.previewFile === "")
      return;
    else
      vm.previewWindow = windowCommunicationService.createWindow('Preview', vm.previewpane.$parent, vm.previewpane.previewFile);
  };

}