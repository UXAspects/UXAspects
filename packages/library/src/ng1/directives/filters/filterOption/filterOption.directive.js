export default function filterOption() {
  return {
    restrict: "E",
    require: ['^filter', '^^filterContainer'],
    template: require('./filterOption.html'),
    controller: "FilterOptionCtrl as foc",
    transclude: true,
    replace: true,
    scope: {
      name: "=",
      select: "&",
      default: "="
    },
    link: function (scope, element, attrs, controllers) {
      scope.foc.filter = controllers[0];
      scope.foc.filterContainer = controllers[1];
      scope.foc.filter.addFilterOptions(scope.foc);
      if (scope.default) {
        scope.foc.filterContainer.addFilterOptions(scope.foc);
      }
    }
  };
}