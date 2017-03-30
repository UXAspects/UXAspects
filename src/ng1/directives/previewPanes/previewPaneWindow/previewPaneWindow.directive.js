previewPaneWindow.$inject = ["$rootScope"];

export default function previewPaneWindow($rootScope) {
  return {
    restrict: "E",
    replace: true,
    template: '<a class="preview-pane-new-window" ng-click="openInNewWindow()">' +
      '<i class="hpe-icon hpe-clone"></i>' +
      '</a>',
    scope: {
      previewName: "="
    },
    link: function (scope) {
      // boradcast name so PreviewPaneCtrl can watch 
      scope.openInNewWindow = function () {
        $rootScope.$broadcast('$previewPaneWindowOpen', scope.previewName);
      };
    }
  };
}