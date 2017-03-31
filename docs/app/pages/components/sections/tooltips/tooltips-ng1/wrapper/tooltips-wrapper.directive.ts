angular.module('app').directive('uxdTooltipsWrapper', () => {
    return {
        restrict: 'E',
        template: require('./tooltips-wrapper.directive.html'),
        controller: 'TooltipsCtrl as vm'
    };
});

angular.module('app').controller('TooltipsCtrl', TooltipsCtrl);

    function TooltipsCtrl() {
        var vm = this;
        vm.buttonText = 'Button with tooltip';
        vm.tooltipText = 'Tooltip text';
    }