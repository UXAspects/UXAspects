angular.module('app').directive('uxdAlertStylesWrapper', () => {
    return {
        restrict: 'E',
        template: require('./alert-styles-wrapper.directive.html'),
        controller: ['$scope', function ($scope) {
            var vm = this;

            vm.infoAlert = {
                type: 'info',
                msg: 'This is an example of an info alert.',
                linkText: 'Alert Link'
            };
            vm.errorAlert = {
                type: 'error',
                msg: 'This is an example of an error alert.',
                linkText: 'Alert Link'
            };

            // Clean up scope
            vm.$onDestroy = function () {
                $scope.$destroy();
            };
        }],
        controllerAs: 'vm'
    };
});
