angular.module('app').controller('ToggleSwitchDemoCtrl', ToggleSwitchDemoCtrl);

function ToggleSwitchDemoCtrl() {
    var vm = this;

    vm.toggleSwitches = {
        option1: true,
        option2: false,
        option3: false,
        option4: false,
        option5: false
    };
    vm.toggleSwitchDisable = false;
}