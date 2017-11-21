angular.module('app').controller('ModalInsetPanelDemoCtrl', ModalInsetPanelDemoCtrl);

ModalInsetPanelDemoCtrl.$inject = ['$modal'];

function ModalInsetPanelDemoCtrl($modal) {
    var vm = this;

    vm.openModal = function () {

        var modalInstance = $modal.open({
            animation: false,
            templateUrl: 'modalLayout.html',
            controller: 'ModalInsetPanelDemoModalCtrl',
            controllerAs: 'vm',
            size: 'md',
            keyboard: 'true'
        });

        modalInstance.result.then(function () {
            //result passed into closed function;
        });
    };
}