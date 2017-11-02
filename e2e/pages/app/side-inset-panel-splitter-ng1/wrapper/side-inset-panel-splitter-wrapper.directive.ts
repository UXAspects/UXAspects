angular.module('app').directive('uxdSideInsetPanelSplitterWrapper', () => {
    return {
        restrict: 'E',
        template: require('./side-inset-panel-splitter-wrapper.directive.html'),
        controller: ['$templateCache', function ($templateCache) {
            var vm = this;

        }],
        controllerAs: 'vm'
    };
});