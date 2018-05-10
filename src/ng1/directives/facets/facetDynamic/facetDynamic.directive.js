facetDynamic.$inject = ["$controller", "previewPaneProvider"];

export default function facetDynamic($controller, previewPaneProvider) {
  return {
    restrict: "E",
    require: ['^facetContainer'],
    template: require('./facetDynamic.html'),
    transclude: true,
    replace: true,
    controller: "FacetDynamicCtrl as fac",
    scope: {
      name: "=",
      facetOptions: "=",
      displayConfiguration: "=?",
      placeholder: "=",
      updateCallback: "=?",
      maxLength: "=",
      maxLines: "=?",
      disableReturn: "=?",
      facetOptionTemplate: "=?",
      facetOptionTypeahead: "=?"
    },
    link: function (scope, element, attrs, controllers) {
      scope.title = '' + scope.name;
      var textareaEl = "";
      scope.regex = "'.*(\\\\([0-9]*\\\\))'";
      scope.fontClass = "'count-font-light'";
      scope.fac.foConstructor = {
        '$controller': $controller,
        'previewPaneProvider': previewPaneProvider,
        'facetContainer': controllers[0]
      };

      //Add the facet to the container
      controllers[0].register(scope.fac);

      // Watching when the textarea is included in the page.
      scope.$watch("element.children().length", function () {
        textareaEl = element.find('textarea');
        if (textareaEl.length !== 0) {

          if (scope.maxLength !== undefined) {
            textareaEl[0].setAttribute('maxlength', scope.maxLength);
          }

        }
      });

      //Adding watch to capture dynamic facet option changes and when no facets are loaded- it checks for undefined nv
      scope.$watch("facetOptions.options", function (nv, ov) {
        if (nv !== ov) {
          // if nv is not defined, then assigning the options to an empty array.
          if (typeof nv === "undefined") {
            nv = [];
          }

          scope.fac.updateFacetOptions(nv);
        }
      });

      // Removing events when scope is destroyed.
      scope.$on("$destroy", function () {
        textareaEl.off('input');
      });

    }
  };
}