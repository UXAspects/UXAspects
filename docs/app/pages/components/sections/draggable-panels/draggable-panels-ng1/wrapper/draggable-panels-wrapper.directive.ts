angular.module('app').directive('uxdDraggablePanelsWrapper', () => {
    return {
        restrict: 'E',
        template: require('./draggable-panels-wrapper.directive.html'),
    };
});
