LayoutSwitcherItemCtrl.$inject = ['$scope', '$attrs'];

export default function LayoutSwitcherItemCtrl($scope, $attrs) {
    var vm = this;

    // store reference to parent controller
    vm.layoutSwitcher = $scope.$parent.lsc;

    // get values from attributes
    vm.layoutName = $attrs.name;
    vm.layoutUrl = $attrs.layout;
    vm.collapseLayout = $attrs.collapseLayout;
    vm.collapseSize = $attrs.collapseSize || 960;

    // store if this is the current visible view and if collapsed
    vm.visible = false;

    // register this layout in container
    vm.layoutSwitcher.registerLayout(vm);

}