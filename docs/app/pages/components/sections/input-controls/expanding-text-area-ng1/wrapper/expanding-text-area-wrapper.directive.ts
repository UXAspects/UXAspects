angular.module('app').directive('uxdExpandingTextAreaWrapper', () => {
    return {
        restrict: 'E',
        template: require('./expanding-text-area-wrapper.directive.html')
    };
});