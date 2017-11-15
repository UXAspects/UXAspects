angular.module('app').directive('uxdFloatingActionButtonWrapper', () => {
    return {
        restrict: 'E',
        template: require('./floating-action-button-wrapper.directive.html'),
        controller: ['$templateCache', function ($templateCache) {
            var vm = this;

            vm.selectFloatingActionButton = function () { };

            vm.items = [{
                icon: 'hpe-add',
                event: this.selectFloatingActionButton
            }, {
                icon: 'hpe-analytics',
                event: this.selectFloatingActionButton
            }, {
                icon: 'hpe-app',
                event: this.selectFloatingActionButton
            }];
        }],
        controllerAs: 'vm'
    };
});
