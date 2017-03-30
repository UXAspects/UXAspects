angular.module('app').directive('uxdAppNavigatorWrapper', ['$templateCache', ($templateCache) => {
    return {
        restrict: 'E',
        template: require('./app-navigator-wrapper.directive.html'),
        link: function() {
            let popover = require('./app_navigator_popover.html');
            $templateCache.put('appNavigatorPopover.html', popover);
        }
    };
}]);