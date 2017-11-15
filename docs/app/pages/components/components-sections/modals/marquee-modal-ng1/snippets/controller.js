angular.module('app').controller('MarqueeModalDemoCtrl', MarqueeModalDemoCtrl);

MarqueeModalDemoCtrl.$inject = ['$modal'];

function MarqueeModalDemoCtrl($modal) {
    var vm = this;

    vm.openModal = function () {

        var modalInstance = $modal.open({
            animation: false,
            templateUrl: 'modalLayout.html',
            controller: 'MarqueeModalDemoModalCtrl',
            controllerAs: 'vm',
            keyboard: 'true',
            size: 'lg',
            windowClass: 'marquee-modal-window'
        });

        modalInstance.result.then(function () {
            //result passed into closed function;
        });
    };
}

