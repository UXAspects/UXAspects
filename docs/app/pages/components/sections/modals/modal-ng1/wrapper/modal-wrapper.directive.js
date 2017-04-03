angular.module('app').directive('uxdModalWrapper', () => {
    return {
        restrict: 'E',
        template: require('./modal-wrapper.directive.html'),
        controller: ['$templateCache', '$modal', function ($templateCache, $modal) {
            $templateCache.put('modalLayout.html', require('../snippets/modalLayout.html'));

            var vm = this;

            vm.openModal1 = function () {
                var modalInstance = $modal.open({
                    templateUrl: 'modalLayout.html',
                    controller: 'ModalDemoModalCtrl',
                    controllerAs: 'vm',
                    animation: false,
                    keyboard: 'true'
                });
                modalInstance.result.then(function () {
                    // result passed into closed function;
                });
            };
        }],
        controllerAs: 'vm'
    };
});

angular.module('app').controller('ModalDemoModalCtrl', ['$modalInstance', function ($modalInstance) {
    var vm = this;

    vm.ok = function () {
        $modalInstance.close('true');
    };

    vm.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]);
