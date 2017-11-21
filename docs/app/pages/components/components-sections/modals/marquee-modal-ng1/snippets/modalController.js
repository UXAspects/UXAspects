angular.module('app').controller('MarqueeModalDemoModalCtrl', MarqueeModalDemoModalCtrl);

MarqueeModalDemoModalCtrl.$inject = ['$modalInstance'];

function MarqueeModalDemoModalCtrl($modalInstance) {
    var vm = this;

    // date picker properties
    vm.date = new Date();
    vm.opened = false;

    vm.open = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        vm.opened = true;
    };

    // modal properties
    vm.ok = function () {
        $modalInstance.close("true");
    };

    vm.cancel = function () {
        $modalInstance.dismiss("cancel");
    };
}
