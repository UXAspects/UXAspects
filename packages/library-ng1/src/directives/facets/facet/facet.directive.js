facet.$inject = ["$rootScope", "$timeout"];

export default function facet($rootScope, $timeout) {
  return {
    restrict: "E",
    template: require('./facet.html'),
    transclude: true,
    replace: true,
    controller: "FacetCtrl as fac",
    scope: {
      name: "=",
      facetScroll: "@",
      loadDelay: "=?"
    },
    link: {
       pre: FacetDirectiveLinkFn
    }
  };

  function FacetDirectiveLinkFn (scope, element) {

    scope.enableScroll = (scope.facetScroll !== "off");

    var facetScrollContainer = [];
    var paneMaxHeight = null;

    $timeout(function() {
      // Check when ng-if has been resolved.
      facetScrollContainer = element.find('.facet-scroll');
      if (facetScrollContainer.length > 0) {
        //give the scroll container a unique id
        facetScrollContainer.uniqueId();

        scope.uniqueId = facetScrollContainer.attr('id');

        paneMaxHeight = getMaxHeight(facetScrollContainer);

        if (!(scope.loadDelay === undefined || scope.loadDelay <= 0)) {
          $timeout(reinitialize, scope.loadDelay);
        }
        scope.$watch('fac.expanded', function () {
          //this is done to re-initialise the custom scrollbar on facets
          $timeout(reinitialize, 100);
        });
        // Event to allow reinitialise to be triggered externally
        scope.$on("facet-reinitialise", function() {
          $timeout(reinitialize, 100);
        });
      }
    });

    scope.fac.reinitialize = function () {
      return reinitialize;
    }();

    function reinitialize() {
      if (facetScrollContainer.length > 0) {
        var jsp = facetScrollContainer.data("jsp");
        if (jsp) {
          jsp.reinitialise();

          // Since jspContainer does not shrink correctly after reinitialize I have taken the fix from this bug:
          // https://github.com/vitch/jScrollPane/issues/143
          resizeJsp(element, paneMaxHeight);
        }
      }
    }

    function getMaxHeight(elem) {
      var maxHeight = elem.css("max-height");
      if (maxHeight.indexOf("px") !== -1) {
        maxHeight = parseFloat(maxHeight);
        if (isNaN(maxHeight)) {
          maxHeight = null;
        }
      } else {
        maxHeight = null;
      }
      return maxHeight;
    }

    function resizeJsp(parentElem, paneMaxHeight) {
      var pane = parentElem.find(".jspPane");
      var container = parentElem.find(".jspContainer");

      var paneHeight = parentElem.innerHeight();

      // If pane is shorter than the maximum allowed height, grow the container
      if (paneMaxHeight !== null) {
        if (paneHeight < paneMaxHeight) {
          paneHeight = paneMaxHeight;
          container.css({
            height: paneMaxHeight + 'px'
          });
        }
      }

      // If the content has reduced in height, shrink the container
      if (pane.outerHeight() < paneHeight) {
        container.css({
          height: pane.outerHeight() + 'px'
        });
      }
    }

  }
}
