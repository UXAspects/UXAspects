angular.module("app").controller("MarqueeModalCtrl", ["$modal", MarqueeModalCtrl]);

function MarqueeModalCtrl($modal) {
    var mc = this;

    mc.openModal = function () {

        var modalInstance = $modal.open({
            animation: false,
            templateUrl: 'sample.html',
            controller: 'MarqueeWizardModalCtrl',
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