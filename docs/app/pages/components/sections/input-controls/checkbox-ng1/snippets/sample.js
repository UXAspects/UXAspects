angular.module('app').controller('CheckboxDemoCtrl', CheckboxDemoCtrl);

function CheckboxDemoCtrl() {
    var vm = this;

    vm.checkModel = {
        option1: true,
        option2: false,
        option3: false,
        option4: false
    };

    vm.simplified = false;
    vm.indeterminateValue = -1;
    vm.disableCheck = false;
}