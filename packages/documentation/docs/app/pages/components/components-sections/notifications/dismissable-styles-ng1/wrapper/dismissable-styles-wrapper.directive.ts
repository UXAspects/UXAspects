angular.module('app').directive('uxdDismissableStylesWrapper', () => {
    return {
        restrict: 'E',
        template: require('./dismissable-styles-wrapper.directive.html'),
        controller: ['$scope', function ($scope) {
            var vm = this;

            vm.addDismissAlert = function (type: string) {
                vm.dismissAlerts.push({
                    type: type,
                    msg: 'This is an example of a dismissible ' + type + ' alert.',
                    linkText: 'Alert Link'
                });
            };

            vm.dismissAlerts = [];
            vm.addDismissAlert('info');
            vm.addDismissAlert('error');

            vm.close = function (item: any) {
                vm.dismissAlerts.splice(vm.dismissAlerts.indexOf(item), 1);
            };

            // Clean up scope
            vm.$onDestroy = function () {
                $scope.$destroy();
            };
        }],
        controllerAs: 'vm'
    };
});
