angular.module('app').directive('uxdMarqueeModalWrapper', () => {
    return {
        restrict: 'E',
        template: require('./marquee-modal-wrapper.directive.html'),
        controller: ['$scope', '$templateCache', '$modal', function ($scope, $templateCache, $modal) {
            $templateCache.put('marquee-modal-ng1/modalLayout.html', require('!!raw-loader!../snippets/modalLayout.html'));

            var vm = this;

            vm.openModal = function () {

                var modalInstance = $modal.open({
                    animation: false,
                    templateUrl: 'marquee-modal-ng1/modalLayout.html',
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

            // Clean up scope
            vm.$onDestroy = function () {
                $scope.$destroy();
            };
        }],
        controllerAs: 'vm'
    };
});

angular.module('app').controller('MarqueeModalDemoModalCtrl', ['$modalInstance', function ($modalInstance) {
    var vm = this;

    // date picker properties
    vm.date = new Date();
    vm.opened = false;

    vm.open = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        vm.opened = true;
    };

    // modal properties
    vm.ok = function () {
        $modalInstance.close("true");
    };

    vm.cancel = function () {
        $modalInstance.dismiss("cancel");
    };
}]);
