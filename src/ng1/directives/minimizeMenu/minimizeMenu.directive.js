minimizeMenu.$inject = ['$rootScope', '$navigationMenu'];

export default function minimizeMenu($rootScope, $navigationMenu) {
  return {
    restrict: 'A',
    scope: true,
    link: function (scope, element, attrs) {
      scope.animate = scope.$eval(attrs.animate);
      scope.autoCollapse = scope.$eval(attrs.autoCollapse);

      var previousWindowWidth = window.innerWidth;
      var autoCollapse = scope.autoCollapse;

      scope.$evalAsync(function () {
        //initially hide is screen is small or auto collapse is true after we get the width
        if (window.innerWidth <= $navigationMenu.collapseAtWidth() || autoCollapse) {
          $navigationMenu.hide();
        }
      });

      if (scope.animate) {
        document.body.classList.add("animate-navbar");
      }

      //button is clicked
      element.on("click", function () {
        if ($navigationMenu.visible()) {
          scope.$apply(function() {
            $navigationMenu.hide();
          });
        } else {
          scope.$apply(function() {
            $navigationMenu.show();
          });
        }
      });

      //window resize
      window.addEventListener('resize', function () {

        //dont do anything if auto collapse is true
        if (autoCollapse) {
          return;
        }

        var collapseWidth = $navigationMenu.collapseAtWidth();

        if (window.innerWidth < collapseWidth && $navigationMenu.visible() && previousWindowWidth >= collapseWidth) {
          scope.$apply(function() {
            $navigationMenu.hide();
          });
        } else if (window.innerWidth >= collapseWidth && !$navigationMenu.visible() && previousWindowWidth < collapseWidth) {
          scope.$apply(function() {
            $navigationMenu.show();
          });
        }
        //store the old screen position so it only shows/hides when required and not every resize
        previousWindowWidth = window.innerWidth;
      });

      //if auto collapse is true the side bar should collapse when state changes
      var stateChanged = function () {
        if (autoCollapse && $navigationMenu.visible()) {
          $navigationMenu.hide();
        }
      };
      $rootScope.$on('$stateChangeStart', stateChanged);

    }

  };
}