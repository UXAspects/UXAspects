angular.module('app').controller('SquareModalDemoCtrl', SquareModalDemoCtrl);

SquareModalDemoCtrl.$inject = ['$modal'];

function SquareModalDemoCtrl($modal) {
    var vm = this;

    vm.openModal2 = function () {
        var modalInstance = $modal.open({
            templateUrl: 'modalLayout.html',
            controller: 'SquareModalDemoModalCtrl',
            controllerAs: 'vm',
            animation: false,
            keyboard: 'true',
            windowClass: 'square-modal-window'
        });
        modalInstance.result.then(function () {
            //result passed into closed function;
        });
    };
}
