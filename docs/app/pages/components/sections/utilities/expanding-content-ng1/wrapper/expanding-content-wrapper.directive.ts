angular.module('app').directive('uxdExpandingContentWrapper', () => {
    return {
        restrict: 'E',
        template: require('./expanding-content-wrapper.directive.html'),
        controller: 'ExpandingContentCtrl as vm',
        scope: true
    };
});

angular.module('app').controller('ExpandingContentCtrl', ['$scope', ExpandingContentCtrl]);

function ExpandingContentCtrl($scope: angular.IScope) {

    var vm = this;

    vm.$onDestroy = function() {
      $scope.$destroy();
    };

    vm.expanded = false;
}