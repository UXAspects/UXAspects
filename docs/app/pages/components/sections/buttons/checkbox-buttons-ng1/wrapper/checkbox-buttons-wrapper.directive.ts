angular.module('app').directive('uxdCheckboxButtonsWrapper', () => {
    return {
        restrict: 'E',
        template: require('./checkbox-buttons-wrapper.directive.html'),
        controller: ['$templateCache', function ($templateCache) {
            var vm = this;

            vm.checkModelLeft = 'ON';
            vm.checkModelMiddle = false;
            vm.checkModelRight = false;
        }],
        controllerAs: 'vm'
    };
});
