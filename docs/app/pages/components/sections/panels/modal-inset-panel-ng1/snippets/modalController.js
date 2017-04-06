angular.module('app').controller('ModalInsetPanelDemoModalCtrl', ModalInsetPanelDemoModalCtrl);

ModalInsetPanelDemoModalCtrl.$inject = ['$modalInstance'];

function ModalInsetPanelDemoModalCtrl($modalInstance) {
    var vm = this;

    // Inset Panel Properties
    vm.showPanel = false;
    vm.panelWidth = 300;
    vm.panelSide = 'right';

    vm.scrollBarConfig = {
        autoReinitialise: true,
        enableKeyboardNavigation: true,
        showOnlyOnHover: true
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