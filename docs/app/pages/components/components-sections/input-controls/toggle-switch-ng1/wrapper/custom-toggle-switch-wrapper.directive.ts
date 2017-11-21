angular.module('app').directive('uxdCustomToggleSwitchWrapper', () => {
    return {
        restrict: 'E',
        controller: 'CustomToggleSwitchDemoCtrl as vm',
        template: require('./custom-toggle-switch-wrapper.directive.html'),
        scope: true
    };
});

angular.module('app').controller('CustomToggleSwitchDemoCtrl', ['$scope', CustomToggleSwitchDemoCtrl]);

function CustomToggleSwitchDemoCtrl($scope: angular.IScope) {
    var vm = this;

    vm.$onDestroy = function() {
       $scope.$destroy();
    };

    vm.toggleSwitches = {
        option5: false
    };
    vm.toggleSwitchDisable = false;
}