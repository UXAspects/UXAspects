angular.module('app').directive('uxdTimeAgoServiceWrapper', () => {
    return {
        restrict: 'E',
        template: require('./time-ago-service-wrapper.directive.html'),
        controller: 'TimeAgoCtrl as vm',
        scope: true
    };
});

angular.module('app').controller('TimeAgoCtrl', ['$scope', TimeAgoCtrl]);

function TimeAgoCtrl($scope: angular.IScope) {

    var vm = this;

    vm.$onDestroy = function() {
      $scope.$destroy();
    };

  // store the time this page was navigated to
  vm.loadTime = new Date();
}