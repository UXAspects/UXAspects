angular.module('app').directive('uxdFloatLabelsWrapper', () => {
    return {
        restrict: 'E',
        template: require('./float-labels-wrapper.directive.html')
    };
});