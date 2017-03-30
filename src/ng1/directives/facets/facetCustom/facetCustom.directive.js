facetCustom.$inject = ["$controller", "previewPaneProvider"];

export default function facetCustom($controller, previewPaneProvider) {
  return {
    restrict: "E",
    require: ['^facetContainer'],
    template: require('./facetCustom.html'),
    transclude: true,
    replace: true,
    controller: "FacetCustomCtrl as fac",
    scope: {
      name: "=",
      select: "=",
      display: "=",
      deselect: "=",
      model: "="
    },
    link: function (scope, element, attrs, controllers) {
      scope.title = '' + scope.name;
      scope.fo = $controller("FacetOptionCtrl", {
        '$scope': scope,
        'previewPaneProvider': previewPaneProvider
      });
      scope.fo.facet = scope.fac;
      scope.fo.facetContainer = controllers[0];

      //Add the option to the facet
      scope.fo.facet.register(scope.fo);

      //Add the facet to the container
      scope.fo.facetContainer.register(scope.fo.facet);
    }
  };
}