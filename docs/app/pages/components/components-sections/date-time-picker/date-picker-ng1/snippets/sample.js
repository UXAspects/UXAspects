angular.module("app").controller("DatePickerCtrl", DatePickerCtrl);

function DatePickerCtrl() {
    var vm = this;

    vm.date = new Date();
    vm.opened = false;

    vm.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        vm.opened = true;
    };

    vm.openKey = function($event) {
        if ($event.which === 13){
            $event.preventDefault();
            $event.stopPropagation();
            vm.opened = true;
        }
    };

    vm.change = function() {
        var customdate = new Date(vm.date);

        if(isNaN(customdate)) {
            vm.date = new Date();
        } else if(vm.date !== vm.prevdate) {
            vm.date = new Date(vm.date);
            vm.prevdate = vm.date;
        }
    };
}