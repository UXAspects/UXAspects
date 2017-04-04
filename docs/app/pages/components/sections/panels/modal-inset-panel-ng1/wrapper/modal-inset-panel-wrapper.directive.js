angular.module('app').directive('uxdModalInsetPanelWrapper', () => {
    return {
        restrict: 'E',
        template: require('./modal-inset-panel-wrapper.directive.html'),
        controller: ['$scope', '$templateCache', '$modal', function ($scope, $templateCache, $modal) {
            $templateCache.put('modalLayout.html', require('../snippets/modalLayout.html'));

            var vm = this;

            vm.openModal = function () {

                var modalInstance = $modal.open({
                    animation: false,
                    templateUrl: 'modalLayout.html',
                    controller: 'ModalInsetPanelDemoModalCtrl',
                    controllerAs: 'vm',
                    size: 'md',
                    keyboard: 'true'
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

angular.module('app').controller('ModalInsetPanelDemoModalCtrl', ModalInsetPanelDemoModalCtrl);

ModalInsetPanelDemoModalCtrl.$inject = ['$modalInstance'];

function ModalInsetPanelDemoModalCtrl($modalInstance) {
    var vm = this;

    var chance = require('chance').Chance();

    // Inset Panel Properties
    vm.showPanel = false;
    vm.panelWidth = 300;
    vm.panelSide = 'right';

    vm.scrollBarConfig = {
        autoReinitialise: true,
        enableKeyboardNavigation: true,
        showOnlyOnHover: false
    };

    // Populate users list with dummy data
    vm.users = [];

    for (var i = 0; i < 20; i++) {
        var fileCount = Math.floor(Math.random() * 10000);

        vm.users.push({
            name: chance.name(),
            percentComplete: ((fileCount / 10000) * 100),
            label: '<span class="spark-label-1 modal-panel-detail-text">' + fileCount + ' Documents</span>'
        });
    }

    vm.ok = function () {
        $modalInstance.close("true");
    };

    vm.cancel = function () {
        $modalInstance.dismiss("cancel");
    };

    vm.showInsetLeft = function () {
        vm.panelSide = 'left';
        vm.showPanel = true;
    };

    vm.showInsetRight = function () {
        vm.panelSide = 'right';
        vm.showPanel = true;
    };
}