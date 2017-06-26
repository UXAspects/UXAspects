angular.module('app').directive('uxdModalWrapper', () => {
    return {
        restrict: 'E',
        template: require('./modal-wrapper.directive.html'),
        controller: ['$scope', '$templateCache', '$modal', function ($scope, $templateCache, $modal) {
            $templateCache.put('modal-ng1/modalLayout.html', require('!!raw-loader!../snippets/modalLayout.html'));

            var vm = this;

            vm.openModal1 = function () {
                var modalInstance = $modal.open({
                    templateUrl: 'modal-ng1/modalLayout.html',
                    controller: 'ModalDemoModalCtrl',
                    controllerAs: 'vm',
                    animation: false,
                    keyboard: 'true'
                });
                modalInstance.result.then(function () {
                    // result passed into closed function;
                });
            };

            // Clean up scope
            vm.$onDestroy = function () {
                $scope.$destroy();
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
