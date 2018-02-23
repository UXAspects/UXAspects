export default class SliderChartCtrl {

    constructor($scope, $timeout) {

        // ensure we have all the values we need
        $timeout(() => {
            this.min = this.sliderOptions.track.min;
            this.max = this.sliderOptions.track.max;
            this.range = this.max - this.min;
        
            // use timeout to apply on next digest cycle
            this.updateLeftOverlay();
            this.updateRightOverlay();
        
            // watch for any changes to low
            $scope.$watch('vm.ngModel.low', (newValue, oldValue) => {
                if (newValue !== oldValue) {
                    this.updateLeftOverlay();
                }
            });
        
            // watch for any changes to high+
            $scope.$watch('vm.ngModel.high', (newValue, oldValue) => {
                if (newValue !== oldValue) {
                    this.updateRightOverlay();
                }
            });
        });

    }

    updateLeftOverlay() {
        this.left = (this.ngModel.low - this.min) / this.range * 100;

        if (this.right !== undefined) {
            this.middle = 100 - this.left - this.right;
        }

        this.hideLeftBorder = this.left === 0;
    }

    updateRightOverlay() {
        this.right = (this.max - this.ngModel.high) / this.range * 100;
        this.middle = 100 - this.left - this.right;

        this.hideRightBorder = this.right === 0;
    }

}

SliderChartCtrl.$inject = ['$scope', '$timeout'];