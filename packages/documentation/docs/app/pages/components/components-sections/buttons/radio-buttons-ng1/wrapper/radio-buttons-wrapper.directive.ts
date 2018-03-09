angular.module('app').directive('uxdRadioButtonsWrapper', () => {
    return {
        restrict: 'E',
        template: require('./radio-buttons-wrapper.directive.html'),
        controller: ['$templateCache', function ($templateCache) {
            var vm = this;

            vm.radioModel = 'Left';
        }],
        controllerAs: 'vm'
    };
});
