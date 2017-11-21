angular.module("app").controller("NumberPickerCtrl", NumberPickerCtrl);

function NumberPickerCtrl() {
    var vm = this;

    vm.step = 1;
    vm.min = -10;
    vm.max = 10;

    vm.value1 = 0;
    vm.value2 = 0;
    
    vm.validate = function(value) {
      if (value % vm.step !== 0 || value.toString().indexOf('.') !== -1)
        return true;
      else 
        return false;
    };
}