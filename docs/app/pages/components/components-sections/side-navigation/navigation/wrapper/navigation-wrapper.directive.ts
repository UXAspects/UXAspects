angular.module('app').directive('uxdNavigationWrapper', () => {
    return {
        restrict: 'E',
        template: require('./navigation-wrapper.directive.html')
    };
});