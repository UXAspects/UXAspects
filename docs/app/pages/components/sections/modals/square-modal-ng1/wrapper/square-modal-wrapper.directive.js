angular.module('app').directive('uxdSquareModalWrapper', () => {
    return {
        restrict: 'E',
        template: require('./square-modal-wrapper.directive.html'),
        controller: ['$templateCache', '$modal', function ($templateCache, $modal) {
            $templateCache.put('square-modal-ng1/modalLayout.html', require('!!raw-loader!../snippets/modalLayout.html'));

            var vm = this;

            vm.openModal2 = function () {
                var modalInstance = $modal.open({
                    templateUrl: 'square-modal-ng1/modalLayout.html',
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
        }],
        controllerAs: 'vm'
    };
});

angular.module('app').controller('SquareModalDemoModalCtrl', ['$modalInstance', function ($modalInstance) {
    var vm = this;

    vm.ok = function () {
        $modalInstance.close('true');
    };

    vm.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]);
