angular.module('app').directive('uxdSideModalWrapper', () => {
    return {
        restrict: 'E',
        template: require('./side-modal-wrapper.directive.html'),
        controller: ['$scope', '$templateCache', function ($scope, $templateCache) {
            $templateCache.put('side-modal-ng1/modalContent.html', require('!!raw-loader!../snippets/modalContent.html'));
            $templateCache.put('side-modal-ng1/modalFooter.html', require('!!raw-loader!../snippets/modalFooter.html'));

            var vm = this;

            vm.sideModalOptions = {
                title: "Site Detail - UX Aspects",
                main: "side-modal-ng1/modalContent.html",
                footer: "side-modal-ng1/modalFooter.html",
                modalColumns: 'col-lg-6 col-md-7 col-sm-9 col-xs-10',
                affixHeader: true,
                animate: true
            };

            // Clean up scope
            vm.$onDestroy = function () {
                $scope.$destroy();
            };
        }],
        controllerAs: 'vm'
    };
});

angular.module('app').controller('SideModalDemoModalCtrl', ['$modalInstance', function ($modalInstance) {
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
