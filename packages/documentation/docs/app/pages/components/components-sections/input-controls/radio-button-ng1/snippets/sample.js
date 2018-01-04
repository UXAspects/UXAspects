angular.module("app").controller("RadioButtonCtrl", RadioButtonCtrl);

function RadioButtonCtrl() {
    var vm = this;

    vm.radioModel = 100;

    vm.radioOptions = {
        option1: 100,
        option2: "string",
        option3: {
            test: 1
        },
        option4: "Wrap-Text"
    };

    vm.disableRadio = false;
    vm.simplified = false;
}