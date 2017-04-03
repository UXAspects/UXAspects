angular.module('app').directive('uxdSideModalWrapper', () => {
    return {
        restrict: 'E',
        template: require('./side-modal-wrapper.directive.html'),
        controller: ['$scope', '$templateCache', function ($scope, $templateCache) {
            $templateCache.put('modalContent.html', require('../snippets/modalContent.html'));
            $templateCache.put('modalFooter.html', require('../snippets/modalFooter.html'));

            var vm = this;

            vm.sideModalOptions = {
                title: "Site Detail - UX Aspects",
                main: "modalContent.html",
                footer: "modalFooter.html",
                modalColumns: 'col-lg-6 col-md-7 col-sm-9 col-xs-10',
                affixHeader: true
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
