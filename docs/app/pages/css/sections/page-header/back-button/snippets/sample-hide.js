angular.module('app', ['ux-aspects']).run(function($rootScope) {
  $rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams){
     $rootScope.showBackButton = toState.name.includes("buttons") ? false:true;
  });
});

// Back Button Controller
angular.module("app").controller("PageHeaderCtrl",  PageHeaderCtrl);
PageHeaderCtrl.$inject = ["$scope", "$rootScope"];

function PageHeaderCtrl($scope, $rootScope) {
  var vm = this;
  vm.rootScope = $rootScope;
}