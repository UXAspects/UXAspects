CheckboxCtrl.$inject = ['$scope'];

export default function CheckboxCtrl($scope) {
    var vm = this;

    if(vm.indeterminateValue === undefined) {
        vm.indeterminateValue = -1;
    }

    if(vm.clickable !== false) {
        vm.clickable = true;
    }

    vm.indeterminate = vm.ngModel === vm.indeterminateValue;

    vm.toggleChecked = function () {

        // if disabled then do nothing
        if (vm.ngDisabled === true || !vm.clickable) {
            return;
        }

        if (vm.indeterminate === true) {
            vm.ngModel = true;
            vm.indeterminate = false;
        } else {
            vm.ngModel = !vm.ngModel;
        }
    };

    vm.keydown = function(event) {
        
        // if spacebar is pressed toggle state
        if(event.keyCode === 32) {
            vm.toggleChecked();
            event.stopPropagation();
            event.preventDefault();
        }
    };

    $scope.$watch('vm.ngModel', function (newValue) {
        vm.indeterminate = newValue === vm.indeterminateValue;
    });
}