angular.module('app').directive('uxdHoverActionsWrapper', () => {
    return {
        restrict: 'E',
        template: require('./hover-actions-wrapper.directive.html'),
        scope: true,
        controller: ['$scope', function ($scope) {
            // cleanup afterwards
            this.$onDestroy = function () {
                $scope.$destroy();
            };
        }]
    };
});