angular.module('app').directive('uxdOverflowTooltipWrapper', () => {
    return {
        restrict: 'E',
        template: require('./overflow-tooltip-wrapper.directive.html')
    };
});