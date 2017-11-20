angular.module('app').controller('SquareModalDemoModalCtrl', SquareModalDemoModalCtrl);

SquareModalDemoModalCtrl.$inject = ['$modalInstance'];

function SquareModalDemoModalCtrl($modalInstance) {
    var vm = this;

    vm.ok = function () {
        $modalInstance.close('true');
    };

    vm.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}
