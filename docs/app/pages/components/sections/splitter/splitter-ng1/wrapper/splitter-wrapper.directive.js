angular.module('app').directive('uxdSplitterWrapper', () => {
    return {
        restrict: 'E',
        template: require('./splitter-wrapper.directive.html'),
        controller: ['$scope', function ($scope) {
            var vm = this;

            // vm.scrollConfig = {
            //     resizeSensor: true,
            //     isScrollableH: false,
            //     scrollMargin: 5
            // };

            vm.dragStart = function () {
                //this will be called when the user begins to drag
            };

            vm.drag = function () {
                //this will be called when the moves the divider
            };

            vm.dragEnd = function () {
                //this will be called when the user has finished dragging
            };

            // Clean up scope
            vm.$onDestroy = function () {
                $scope.$destroy();
            };
        }],
        controllerAs: 'vm'
    };
});