export default function facetOption() {
  return {
    restrict: "E",
    require: ["^facet", "^^facetContainer"],
    controller: "FacetOptionCtrl as fo",
    template: require('./facetOption.html'),
    transclude: true,
    replace: true,
    scope: {
      name: "=",
      count: "=?",
      select: "&",
      disabled: "=?",
      deselect: "&",
      selectedAriaLabel: "@",
      showZero: '=?',
      simplified: "=?"
    },
    link: function(scope, element, attrs, controllers) {

      scope.fo.facetContainer = controllers[1];
      scope.fo.facet = controllers[0];

      //Add the option to the facet
      scope.fo.facet.register(scope.fo);

      //Add the facet to the container
      scope.fo.facetContainer.register(scope.fo.facet);

      //Update the scroll panel
      scope.fo.facet.reinitialize();

      scope.checked = false;
      scope.checkedIcon = false;
      
      if(scope.simplified === undefined || scope.simplified === null){
        scope.simplified = true;
      }

      scope.$on("destroy", function() {
        scope.fo.deselect();
      });
    }
  };
}
