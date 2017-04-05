angular.module("app").controller("TooltipsCtrl", TooltipsCtrl);

function TooltipsCtrl() {
    var vm = this;

    vm.buttonText = "Button with tooltip";
    vm.tooltipText = "Tooltip text";
}