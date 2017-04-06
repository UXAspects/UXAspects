angular.module('app').directive('uxdCustomScrollbarWrapper', () => {
    return {
        restrict: 'E',
        template: require('./custom-scrollbar-wrapper.directive.html'),
        controller: ['$scope', '$templateCache', function ($scope, $templateCache) {
            var vm = this;

            vm.scrollBarConfig = {
                resizeSensor: true,
                showOnlyOnHover: false,
                enableKeyboardNavigation: true,
                isScrollableH: false,
                scrollMargin: 5
            };

            // Clean up scope
            vm.$onDestroy = function () {
                $scope.$destroy();
            };
        }],
        controllerAs: 'vm'
    };
});