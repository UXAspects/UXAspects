angular.module('app').directive('uxdTimePickerWrapper', () => {
    return {
        restrict: 'E',
        controller: 'TimePickerCtrl as vm',
        template: require('./time-picker-wrapper.directive.html'),
        scope: true
    };
});

angular.module('app').controller('TimePickerCtrl', ['$scope', TimePickerCtrl]);

function TimePickerCtrl($scope: angular.IScope) {

    var vm = this;

    vm.$onDestroy = function() {
       $scope.$destroy();
    };
    
    vm.mytime = new Date();
    vm.hstep = 1;
    vm.mstep = 1;
    vm.ismeridian = true;
    vm.changed = function () {};

}