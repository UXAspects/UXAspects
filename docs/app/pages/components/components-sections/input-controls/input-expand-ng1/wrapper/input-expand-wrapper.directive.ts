angular.module('app').directive('uxdInputExpandWrapper', () => {
    return {
        restrict: 'E',
        controller: 'InputExpandCtrl as vm',
        template: require('./input-expand-wrapper.directive.html'),
        scope: true
    };
});

angular.module('app').controller('InputExpandCtrl', ['$scope', InputExpandCtrl]);

function InputExpandCtrl($scope: angular.IScope) {
    var vm = this;

    vm.$onDestroy = function() {
       $scope.$destroy();
    };

    vm.filterSearchExpanded = false;

    vm.expandFilter = function(value: any) {
        vm.filterSearchExpanded = value;
    };

}