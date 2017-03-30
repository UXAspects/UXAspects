angular.module('app').directive('uxdHoverActionsWrapper', () => {
    return {
        restrict: 'E',
        template: require('./hover-actions-wrapper.directive.html')
    };
});