export default function facetContainer() {
  return {
    restrict: "E",
    controller: "FacetContainerCtrl as fc",
    template: require("./facetContainer.html"),
    scope: {
      selectTitle: "@",
      clearText: "@",
      noItemsText: "@?",
      clearAllFn: "&?",
      api: "=?"
    },
    transclude: true,
    replace: true,
    link: function (scope, elem, attr) {
      // use the attr to check whether the property is defined
      scope.isClearAllFn = angular.isUndefined(attr.clearAllFn) === false;
    }
  };
}