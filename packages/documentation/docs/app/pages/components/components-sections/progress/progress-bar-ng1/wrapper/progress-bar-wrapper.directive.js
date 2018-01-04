angular.module('app').directive('uxdProgressBarWrapper', () => {
    return {
        restrict: 'E',
        template: require('./progress-bar-wrapper.directive.html'),
        controller: ['$scope', '$templateCache', function ($scope, $templateCache) {
            var vm = this;

            vm.percentComplete = 15;

            vm.random = function () {
                vm.percentComplete = Math.floor((Math.random() * 100) + 1);
            };

            // Clean up scope
            vm.$onDestroy = function () {
                $scope.$destroy();
            };
        }],
        controllerAs: 'vm'
    };
});