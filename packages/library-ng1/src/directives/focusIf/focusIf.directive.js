export default function focusIf() {
  return {
    restrict: "A",
    link: function (scope, element, attrs) {
      
      // Place focus when condition evaluates true
      scope.$watch(attrs.focusIf, function(nv) {
        if (nv) {
          element.focus();
        }
      });

      scope.$watch(function() {
        return element.is(":visible");
      }, function(nv) {
        if (nv && scope.$eval(attrs.focusIf)) {
          element.focus();
        }
      });

    }
  };
}