angular.module('app').directive('uxdSquareModalWrapper', () => {
    return {
        restrict: 'E',
        template: require('./square-modal-wrapper.directive.html'),
        controller: ['$templateCache', '$modal', function ($templateCache, $modal) {
            $templateCache.put('square-modal-ng1/modalLayout.html', require('!!raw-loader!../snippets/modalLayout.html'));

            var vm = this;

            
            vm.openModal2 = function () {

                // workaround for @ngtools - prevent it trying to load resource
                var key = 'templateUrl';
    
                var config = {
                    controller: 'SquareModalDemoModalCtrl',
                    controllerAs: 'vm',
                    animation: false,
                    keyboard: 'true',
                    windowClass: 'square-modal-window'
                };
    
                config[key] = 'square-modal-ng1/modalLayout.html';

                var modalInstance = $modal.open(config);

                modalInstance.result.then(function () {
                    // result passed into closed function;
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
