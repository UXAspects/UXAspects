SliderChartCtrl.$inject = ['$scope'];

export default function SliderChartCtrl($scope) {

    var vm = this;

    var min = vm.sliderOptions.track.min;
    var max = vm.sliderOptions.track.max;
    var range = max - min;

    var updateLeftOverlay = function() {
        vm.left = (vm.ngModel.low - min) / range * 100;
        if (vm.right !== undefined) {
            vm.middle = 100 - vm.left - vm.right;
        }
        if (vm.left === 0) {
            vm.hideLeftBorder = true;
        } else {
            vm.hideLeftBorder = false;
        }
    };

    var updateRightOverlay = function() {
        vm.right = (max - vm.ngModel.high) / range * 100;
        vm.middle = 100 - vm.left - vm.right;
        if (vm.right === 0) {
            vm.hideRightBorder = true;
        } else {
            vm.hideRightBorder = false;
        }
    };

    // use timeout to apply on next digest cycle
    updateLeftOverlay();
    updateRightOverlay();

    // watch for any changes to low
    $scope.$watch('vm.ngModel.low', function(newValue, oldValue) {
        if (newValue !== oldValue) {
            updateLeftOverlay();
        }
    });

    // watch for any changes to high+
    $scope.$watch('vm.ngModel.high', function(newValue, oldValue) {
        if (newValue !== oldValue) {
            updateRightOverlay();
        }
    });

}