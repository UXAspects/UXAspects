angular.module('app').directive('uxdToggleSwitchWrapper', () => {
    return {
        restrict: 'E',
        controller: 'ToggleSwitchDemoCtrl as vm',
        template: require('./toggle-switch-wrapper.directive.html'),
        scope: true
    };
});

angular.module('app').controller('ToggleSwitchDemoCtrl', ['$scope', ToggleSwitchDemoCtrl]);

function ToggleSwitchDemoCtrl($scope: angular.IScope) {
    var vm = this;

    vm.$onDestroy = function() {
       $scope.$destroy();
    };

    vm.toggleSwitches = {
        option1: true,
        option2: false,
        option3: false,
        option4: false
    };
    vm.toggleSwitchDisable = false;
}