export default function previewPaneToggle() {
  return {
    restrict: "E",
    template: require('./previewPaneToggle.html'),
    controller: "PreviewPaneToggleCtrl as ppt",
    replace: true,
    scope: {
      setPreview: "="
    },
    link: function (scope, element) {
      element.on('click', function () {
        scope.ppt.togglePreview();
        scope.$digest();
      });
    }
  };
}