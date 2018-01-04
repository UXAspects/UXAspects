angular.module('app').directive('uxdSingleLineOverflowTooltipWrapper', () => {
    return {
        restrict: 'E',
        template: require('./single-line-overflow-tooltip-wrapper.directive.html')
    };
});