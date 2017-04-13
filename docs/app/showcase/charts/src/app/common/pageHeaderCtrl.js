(function() {
  angular.module("app").controller("PageHeaderCtrl", PageHeaderCtrl);


  PageHeaderCtrl.$inject = ['$scope', '$rootScope', '$state'];

  function PageHeaderCtrl($scope, $rootScope, $state) {
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

    vm.goBack = function() {

      if (vm.currentState === 'detailview' && vm.previousState) {
        // if current state is detail view then go back to list view
        $state.go(vm.previousState);
      } else {
        // otherwise go back to the showcase page
        window.location.href = vm.sourceUrl;
      }
    };

  }

})();