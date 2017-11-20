angular.module('app').controller('ModalDemoModalCtrl', ModalDemoModalCtrl);

ModalDemoModalCtrl.$inject = ['$modalInstance'];

function ModalDemoModalCtrl($modalInstance) {
    var vm = this;

    vm.ok = function () {
        $modalInstance.close('true');
    };

    vm.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}
