export default function ApplicationSwitcherContainerCtrl() {
    var vm = this;
    vm.selectedItem = null;

    vm.select = function(applicationSwitcherItemCtrl) {
        this.selectedItem = applicationSwitcherItemCtrl;
    };
}