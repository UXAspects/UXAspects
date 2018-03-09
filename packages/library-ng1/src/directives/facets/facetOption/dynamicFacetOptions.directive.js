export default function dynamicFacetOption() {
  return {
    restrict: "E",
    require: ["^facetDynamic", "^^facetContainer"],
    controller: "FacetOptionCtrl as fo",
    template: require('./facetOption.html'),
    transclude: true,
    replace: true,
    scope: {
      name: "=",
      count: "=?",
      select: "&",
      deselect: "&",
      disabled: "=?",
      selectedAriaLabel: "@",
      showZero: '=?'
    },
    link: function(scope, element, attrs, controllers) {
      scope.fo.facetContainer = controllers[1];
      scope.fo.facet = controllers[0];

      //Add the option to the facet
      scope.fo.facet.register(scope.fo);

      //Add the facet to the container
      scope.fo.facetContainer.register(scope.fo.facet);

      scope.checked = false;
      scope.$on("destroy", function() {
        scope.fo.deselect();
      });
    }
  };
}
