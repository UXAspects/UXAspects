angular.module('app').directive('uxdNestedSplitterWrapper', () => {
    return {
        restrict: 'E',
        template: require('./nested-splitter-wrapper.directive.html'),
        controller: ['$scope', function ($scope) {
            var vm = this;

            // vm.scrollConfig = {
            //     resizeSensor: true,
            //     isScrollableH: false,
            //     scrollMargin: 5
            // };

            // Clean up scope
            vm.$onDestroy = function () {
                $scope.$destroy();
            };
        }],
        controllerAs: 'vm'
    };
});