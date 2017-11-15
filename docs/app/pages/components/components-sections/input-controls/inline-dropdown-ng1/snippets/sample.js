angular.module("app").controller("InlineDropDownCtrl", InlineDropDownCtrl);

function InlineDropDownCtrl() {
    var vm = this;

    vm.inlineDropDownOpen = false;
    vm.inlineDropDownOptions = ["Every Day", "Every Week", "Every Hour", "Every Month"];
    vm.inlineDefaultIndex = 2;

    vm.dropClick = function(index) {
        vm.inlineDefaultIndex = index;        
    };
}