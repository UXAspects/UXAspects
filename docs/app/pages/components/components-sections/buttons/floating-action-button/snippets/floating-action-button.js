angular.module("app").controller("FloatingActionButtonCtrl", FloatingActionButtonCtrl);

function FloatingActionButtonCtrl() {
    var vm = this;

    vm.selectFloatingActionButton = function () {};

    vm.items = [{
        icon: "hpe-add",
        event: this.selectFloatingActionButton
    }, {
        icon: "hpe-analytics",
        event: this.selectFloatingActionButton
    }, {
        icon: "hpe-app",
        event: this.selectFloatingActionButton
    }];
}
