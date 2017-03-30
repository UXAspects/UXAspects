angular.module('app').controller('DropdownCtrl', DropdownCtrl);

function DropdownCtrl() {
    var vm = this;

    vm.buttonOpen = false;
    vm.splitOpen = false;

    vm.radioOptions = {
        option1: 1,
        option2: 2
    };
    vm.radioModel1 = vm.radioOptions.option1;

    vm.checkModel1 = {
        option1: false,
        option2: false
    };

    vm.cases = [
        "Alpha",
        "Beta",
        "Gamma",
        "Delta",
        "Epsilon",
        "Zeta",
        "Eta",
        "Theta",
        "Iota",
        "Kappa",
        "Alpha 2",
        "Alpha 3",
    ];
    vm.caseFilter = "";
}
