angular.module('app').directive('uxdSingleToggleButtonWrapper', () => {
    return {
        restrict: 'E',
        template: require('./single-toggle-button-wrapper.directive.html'),
        controller: ['$templateCache', function ($templateCache) {
            var vm = this;

            vm.singleToggle = 'ON';
        }],
        controllerAs: 'vm'
    };
});
