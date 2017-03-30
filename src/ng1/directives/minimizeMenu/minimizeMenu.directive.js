minimizeMenu.$inject = ['$rootScope'];

export default function minimizeMenu($rootScope) {
  return {
    restrict: 'A',
    scope: true,
    link: function (scope, element, attrs) {
      scope.animate = scope.$eval(attrs.animate);
      scope.autoCollapse = scope.$eval(attrs.autoCollapse);
      
      var body = document.body;
      var navbarVisible = true;
      var previousWindowWidth = window.innerWidth;
      var autoCollapse = scope.autoCollapse;
      var sideNavigation = document.querySelector('.navbar-static-side-container');
      var sideNavigationWidth;

      scope.$evalAsync(function() {
        sideNavigationWidth = sideNavigation.offsetWidth;

        //initially hide is screen is small or auto collapse is true after we get the width
        if(window.innerWidth <= 1023 || autoCollapse){
          minimize();
        }
      });

      if(scope.animate){
        body.classList.add("animate-navbar");
      }

      //minimize the side menu
      var minimize = function() {
        body.classList.add("hide-navbar");
        sideNavigation.style.marginLeft = "-" + sideNavigationWidth + "px";
        navbarVisible = false;
      };

      //maximize the side menu
      var maximize = function() {
        body.classList.remove("hide-navbar");
        sideNavigation.style.marginLeft = "0";
        navbarVisible = true;
      };

      //button is clicked
      element.on("click", function() {
        if(navbarVisible){
          minimize();
        } else {
          maximize();
        }
      });

      //window resize
      window.addEventListener('resize', function(){

        //dont do anything if auto collapse is true
        if(autoCollapse){
          return;
        }

        if(window.innerWidth <= 1023 && navbarVisible === true && previousWindowWidth > 1023){
          minimize();
        } else if(window.innerWidth > 1023 && navbarVisible === false && previousWindowWidth <= 1023){
          maximize();
        }
        //store the old screen position so it only shows/hides when required and not every resize
        previousWindowWidth = window.innerWidth;
      });

      //if auto collapse is true the side bar should collapse when state changes
      var stateChanged = function () {
        if(autoCollapse && navbarVisible === true){
          minimize();
        }
      };
      $rootScope.$on('$stateChangeStart', stateChanged);

    }

  };
}