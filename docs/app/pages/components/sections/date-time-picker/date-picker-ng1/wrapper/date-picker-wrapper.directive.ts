angular.module('app').directive('uxdDatePickerWrapper', () => {
    return {
        restrict: 'E',
        controller: 'DatePickerCtrl as vm',
        template: require('./date-picker-wrapper.directive.html'),
        scope: true
    };
});

angular.module('app').controller('DatePickerCtrl', ['$scope', DatePickerCtrl]);

function DatePickerCtrl($scope: angular.IScope) {
    var vm = this;

    vm.$onDestroy = function() {
       $scope.$destroy();
    };

    vm.date = new Date();
    vm.opened = false;

    vm.open = function($event: any) {
        $event.preventDefault();
        $event.stopPropagation();
        vm.opened = true;
    };

    vm.openKey = function($event: any) {
        if ($event.which === 13) {
            $event.preventDefault();
            $event.stopPropagation();
            vm.opened = true;
        }
    };

    vm.change = function() {
        var customdate = new Date(vm.date);

        if (isNaN(customdate as any)) {
            vm.date = new Date();
        } else if(vm.date !== vm.prevdate) {
            vm.date = new Date(vm.date);
            vm.prevdate = vm.date;
        }
    };
}