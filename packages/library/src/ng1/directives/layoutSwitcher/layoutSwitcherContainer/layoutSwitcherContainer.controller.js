LayoutSwitcherContainerCtrl.$inject = ['$scope', '$element', '$attrs', '$parse', '$resize', '$timeout'];

export default function LayoutSwitcherContainerCtrl($scope, $element, $attrs, $parse, $resize, $timeout) {
    var vm = this;

    vm.selectedLayout = $parse($attrs.selected)($scope);

    vm.activeLayout = null;
    vm.containerWidth = $element.get(0).offsetWidth;

    vm.layouts = [];

    vm.registerLayout = function (layout) {
        vm.layouts.push(layout);
    };

    vm.updateLayout = function () {

        // hide all layouts
        vm.resetLayoutVisibility();

        // find selected layout
        var selectedLayout = vm.findLayout(vm.selectedLayout);

        // determine if we should show the collapse layout
        if (selectedLayout.collapseLayout) {
            vm.activeLayout = vm.containerWidth <= selectedLayout.collapseSize ? selectedLayout.collapseLayout : vm.selectedLayout;
        } else {
            vm.activeLayout = vm.selectedLayout;
        }

        // find matching layout
        var activeLayout = vm.findLayout(vm.activeLayout);

        // make visible
        activeLayout.visible = true;

        if ($attrs.active) {

            $parse($attrs.active).assign($scope, vm.activeLayout);

            // we need to run a digest here if one is not already in progress 
            if (!$scope.$$phase) {
                $scope.$digest();
            }
        }
    };

    vm.resetLayoutVisibility = function () {

        // set all layouts to hidden
        vm.layouts.forEach(function (layout) {
            layout.visible = false;
        });
    };

    vm.findLayout = function (layoutName) {

        var matches = vm.layouts.filter(function (layout) {
            return layout.layoutName === layoutName;
        });

        return matches[0];
    };

    vm.resizeHandler = function (element, width) {
        vm.containerWidth = width;

        vm.updateLayout();
    };

    // watch for any size changes
    $resize.bind($element.get(0), vm.resizeHandler);

    // update ui after initial digest
    $timeout(vm.updateLayout);

    // watch for any changes to the selectedLayout
    $scope.$watch(function () {
        return $parse($attrs.selected)($scope);
    }, function (newValue, oldValue) {
        if (newValue !== oldValue) {
            vm.selectedLayout = newValue;

            vm.updateLayout();
        }
    });
}