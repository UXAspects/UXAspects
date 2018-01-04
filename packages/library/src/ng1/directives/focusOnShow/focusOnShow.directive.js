focusOnShow.$inject = ["$timeout"];

export default function focusOnShow($timeout) {
  return {
    restrict: "A",
    link: function (scope, element, attrs) {

      if (attrs.ngShow) {
        scope.$watch(attrs.ngShow, function (nV) {
          if (nV) {
            $timeout(function () {
              element.focus();
            });
          }
        });
      } else if (attrs.ngHide) {
        scope.$watch(attrs.ngHide, function (nV) {
          if (!nV) {
            $timeout(function () {
              element.focus();
            });
          }
        });
      }
    }
  };
}