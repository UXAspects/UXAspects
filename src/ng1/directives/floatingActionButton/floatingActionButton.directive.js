export default function floatingActionButton() {
  return {
    restrict: 'E',
    template: require('./floatingActionButton.html'),
    controller: 'FloatingActionButton as fab',
    replace: true,
    scope: {
      items: "=",
      direction: "=",
      primary: "="
    },
    link: function(scope) {
      if (!scope.direction) {
        scope.direction = "bottom";
      }

      scope.focus = false;
      if (scope.direction === "top") {
        scope.className = "child-btn-set-top-visible";
        scope.parentClass = ".child-btn-set-top.top";
      } else if (scope.direction === "bottom") {
        scope.className = "child-btn-set-visible";
        scope.parentClass = ".child-btn-set.bottom";
      } else if (scope.direction === "left") {
        scope.className = "child-btn-set-visible-horizontal";
        scope.parentClass = ".child-btn-set-horizontal.left";
      } else {
        scope.className = "child-btn-set-visible-horizontal";
        scope.parentClass = ".child-btn-set-horizontal.right";
      }

      scope.expand = function (e) {
        scope.parent = angular.element(e.currentTarget.parentNode);
        scope.parent.addClass('floating-expand');
        var el = ".floating-expand " + scope.parentClass;
        angular.element(el).addClass(scope.className);
      };

      scope.collapse = function () {
        var el = ".floating-expand " + scope.parentClass;
        angular.element(el).removeClass(scope.className);
        if (scope.parent) scope.parent.removeClass('floating-expand');
      };

      scope.selectedCollapse = function (event) {
        scope.fab.onSelect(event);
        var el = ".floating-expand " + scope.parentClass;
        angular.element(el).removeClass(scope.className);
        scope.parent.removeClass('floating-expand');
      };
    }
  };
}