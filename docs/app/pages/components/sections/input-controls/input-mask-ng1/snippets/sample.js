angular.module("app").controller("InputMaskCtrl", InputMaskCtrl);

function InputMaskCtrl() {
    var vm = this;

    vm.ISBNMask = "999-99-999-9999-9";
    vm.phoneMask = "(999) 999-9999";
    vm.currencyMask = "$ 999,999,999.99";
    vm.IPMask = "99[9].999.999.999";
}