angular.module('app').directive('uxdNumberPickerWrapper', () => {
    return {
        restrict: 'E',
        controller: 'NumberPickerCtrl as vm',
        template: require('./number-picker-wrapper.directive.html'),
        scope: true
    };
});

angular.module('app').controller('NumberPickerCtrl', ['$scope', NumberPickerCtrl]);

function NumberPickerCtrl($scope: angular.IScope) {
    var vm = this;

    vm.$onDestroy = function() {
       $scope.$destroy();
    };

    vm.step = 1;
    vm.min = -10;
    vm.max = 10;

    vm.value1 = 0;
    vm.value2 = 0;

    vm.validate = function (value: any) {
        if (value % vm.step !== 0 || value.toString().indexOf('.') !== -1) {
            return true;
        } else {
            return false;
        }
    };
}