angular.module("app").controller("CheckboxButtonsCtrl", CheckboxButtonsCtrl);

function CheckboxButtonsCtrl() {
    var vm = this;

    vm.checkModelLeft = "ON";
    vm.checkModelMiddle = false;
    vm.checkModelRight = false;
}