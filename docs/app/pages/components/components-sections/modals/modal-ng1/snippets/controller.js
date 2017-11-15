angular.module('app').controller('ModalDemoCtrl', ModalDemoCtrl);

ModalDemoCtrl.$inject = ['$modal'];

function ModalDemoCtrl($modal) {
    var vm = this;

    vm.openModal1 = function () {
        var modalInstance = $modal.open({
            templateUrl: 'modalLayout.html',
            controller: 'ModalDemoModalCtrl',
            controllerAs: 'vm',
            animation: false,
            keyboard: 'true'
            // Add this class attribute for dark modal header
            // windowClass: 'modal-window-dark-header'
        });
        modalInstance.result.then(function () {
            // result passed into closed function;
        });
    };
}
