angular.module('app').controller('LayoutSwitchingSplitterDemoCtrl', LayoutSwitchingSplitterDemoCtrl);

function LayoutSwitchingSplitterDemoCtrl() {
    var vm = this;

    vm.middlePanelHidden = false;
    vm.topPanelHidden = false;
    vm.hideMiddle = function() {
        var panel = angular.element("#splitter-panel-to-remove-middle");
        if (!vm.middlePanelHidden) {
            panel.attr("splitter-panel-collapsed", "");
            vm.middlePanelHidden = true;
        } else {
            panel.attr("splitter-panel-collapsed", null);
            vm.middlePanelHidden = false;
        }
        vm.reinitOuter();
    };

    vm.hideTop = function() {
        var panel = angular.element("#splitter-panel-to-remove-top");
        if (!vm.topPanelHidden) {
            panel.attr("splitter-panel-collapsed", "");
            vm.topPanelHidden = true;
        } else {
            panel.attr("splitter-panel-collapsed", null);
            vm.topPanelHidden = false;
        }
        vm.reinitInner();
    };

    vm.reinitOuter = {};
    vm.reinitInner = {};
}