angular.module('app').directive('uxdTooltipsWrapper', () => {
    return {
        restrict: 'E',
        template: require('./tooltips-wrapper.directive.html'),
        controller: 'TooltipsCtrl as vm',
        scope: true
    };
});

angular.module('app').controller('TooltipsCtrl', ['$scope', TooltipsCtrl]);

    function TooltipsCtrl($scope: angular.IScope) {
        var vm = this;

        vm.$onDestroy = function() {
            $scope.$destroy();
        };

        vm.buttonText = 'Button with tooltip';
        vm.tooltipText = 'Tooltip text';
    }