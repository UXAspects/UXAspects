angular.module('app').directive('uxdNestedSplitterWrapper', () => {
    return {
        restrict: 'E',
        template: require('./nested-splitter-wrapper.directive.html'),
        controller: ['$scope', function ($scope) {
            var vm = this;

            // Clean up scope
            vm.$onDestroy = function () {
                $scope.$destroy();
            };
        }],
        controllerAs: 'vm'
    };
});