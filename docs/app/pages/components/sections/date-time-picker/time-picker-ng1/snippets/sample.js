angular.module("app").controller("TimePickerCtrl", TimePickerCtrl);

function TimePickerCtrl() {
    var vm = this;
    vm.mytime = new Date();
    vm.hstep = 1;
    vm.mstep = 15;
    vm.ismeridian = true;
    vm.changed = function () {
        console.log("Timepicker changed");
    };

}