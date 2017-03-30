previewPane.$inject = ["$document", "$window", "previewPaneProvider", "$q", "$compile", "$templateRequest", "$timeout"];

export default function previewPane($document, $window, previewPaneProvider, $q, $compile, $templateRequest, $timeout) {
  return {
    restrict: "E",
    template: require('./previewPane.html'),
    controller: "PreviewPaneCtrl as pp",
    scope: {
      previewFile: "=",
      previewTitle: "=?",
      previewSubtitle: "=?",
      previewEmptyText: "=",
      childScope: "=",
      shadow: "=",
      previewName: "=?"
    },
    replace: true,
    link: function (scope) {

      var modalDomEl = "";
      // extended in the future to opt between template and templateUrl.
      function getTemplatePromise(options) {
        return $templateRequest(options);
      }

      //extended in the future to accomodate angular resolves// if needed.
      function getResolvePromises() {
        return [];
      }

      scope.preview = previewPaneProvider.preview;
      scope.$watch("preview", function (nv, ov) {

        if (nv.previewOn !== ov.previewOn) {
          scope.pp.updatePreviewOn(nv.previewOn);
        }

        scope.pp.updateHasPreviewFile(nv.previewFile);
        if (nv.previewFile !== ov.previewFile) {

          if (nv.previewFile === "") {
            angular.element('.preview-pane-selected-item').removeClass('preview-pane-selected-item');
          }

        }
      }, true);

      scope.$watch("previewFile", function (nv) {
        if (scope.previewFile !== "") {
          var templateAndPromise = $q.all([getTemplatePromise(nv)].concat(getResolvePromises()));
          var value = "";
          templateAndPromise.then(function resolveSuccess(tpl) {
            if (scope.childScope !== null) {
              value = $compile(tpl[0])(scope.childScope);
            } else {
              value = tpl[0];
            }
            modalDomEl = value;
          });

          templateAndPromise.finally(function () {
            $timeout(function () {
              var el = angular.element('.previewFile');
              el.empty();
              el.append(modalDomEl);
            });
          });
        } else {
          scope.pp.updateHasPreviewFile(nv);
        }
      });
    }
  };
}