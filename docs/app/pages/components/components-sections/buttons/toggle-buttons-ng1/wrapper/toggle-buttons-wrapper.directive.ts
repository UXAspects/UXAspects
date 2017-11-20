angular.module('app').directive('uxdToggleButtonsWrapper', () => {
    return {
        restrict: 'E',
        template: require('./toggle-buttons-wrapper.directive.html'),
        controller: ['$templateCache', function ($templateCache) {
            
        }],
        controllerAs: 'vm'
    };
});