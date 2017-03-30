export default function elementReady() {
  return {
    restrict: "A",
    link: function (scope, element, attrs) {
      element.ready(function () {
        scope.$eval(attrs.elementReady);
      });
    }
  };
}