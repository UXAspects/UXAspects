(function() {
  angular.module("app").controller("PageHeaderCtrl", PageHeaderCtrl);


  PageHeaderCtrl.$inject = ['$scope', '$rootScope', '$state', '$staticTooltip'];

  function PageHeaderCtrl($scope, $rootScope, $state, $staticTooltip) {
    var vm = this;

    vm.sourceUrl = document.referrer;

    vm.currentState = null;
    vm.previousState = null;
    vm.topSearchExpanded = false;
    vm.versionName = "Elements Angular Version";

    // when route changes check if we should show back button or not
    $rootScope.$on('$viewContentLoaded', function() {

      // get the name of the current state
      vm.currentState = $state.current.name;
    });

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState) {
      vm.previousState = fromState.name;
    });

    vm.expandTopSearch = function(value) {
      vm.topSearchExpanded = value;
    };

    vm.sortHelpCenter = function(prev, next) {
      if(prev.title > next.title) {
         return 1;
      } else if(prev.title < next.title ) {
        return -1;
      } else {
        return 0;
      }
    };

    vm.goBack = function() {

      if (vm.currentState === 'detailview' && vm.previousState) {
        // if current state is detail view then go back to list view
        $state.go(vm.previousState);
      } else {
        // otherwise go back to the showcase page
        window.location.href = vm.sourceUrl;
      }
    };

    vm.tooltipsVisible = false;

    vm.toggleTooltips = function() {
      //find the static tooltips, if there are none show if there are some hide 
      if(document.querySelector(".static-tooltip")){
        $staticTooltip.hideAllTooltips(); 
      } else {
        $staticTooltip.showAllTooltips();
      }  
    };

    $scope.$watch(function() {
      return $staticTooltip.tooltipsVisible();
    }, function(nv) {
      vm.tooltipsVisible = nv;
    });

  }

})();