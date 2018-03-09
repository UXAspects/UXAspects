angular.module("app").controller("StaticTooltipDemoCtrl", StaticTooltipDemoCtrl);

function StaticTooltipDemoCtrl() {
    var vm = this;

    vm.content = 'This is an example of a static tooltip. It will appear when the page is loaded until dismissed. It is useful for giving the user information about a specific control.';
    vm.dismissText = 'HIDE TIPS';
    vm.direction = 'up';
    vm.position = 'middle';
    vm.offsetX = 0;
    vm.offsetY = 5;
    vm.zIndex = 9998;
}