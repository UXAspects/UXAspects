angular.module('app').directive('uxdSideInsetPanelSplitterWrapper', () => {
    return {
        restrict: 'E',
        template: require('./side-inset-panel-splitter-wrapper.directive.html'),
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