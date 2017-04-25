angular.module("app").controller("PageContentCtrl", PageContentCtrl);

PageContentCtrl.$inject = ['$scope', '$navigationMenu'];

function PageContentCtrl($scope, $navigationMenu) {
    var pc = this;

    // Listen for the navigationMenu.visibilityChanged event to handle show/hide initiated elsewhere.
    $scope.$on('navigationMenu.visibilityChanged', function (event, isVisible) {
        // Update the state of the toggle button.
        pc.navigationOpen = isVisible;
    });

    // Property containing the state of the toggle button
    pc.navigationOpen = $navigationMenu.visible();
    $scope.$watch('pc.navigationOpen', function (nv, ov) {
        // Check that the state changed to avoid loops
        if (nv !== ov) {
            if (nv === true) {
                $navigationMenu.show();
            } else {
                $navigationMenu.hide();
            }
        }
    });

    // Property containing the state of the "Auto-Hide" toggle switch
    pc.navigationAutoCollapse = ($navigationMenu.collapseAtWidth() > 0);
    $scope.$watch('pc.navigationAutoCollapse', function (nv) {
        if (nv) {
            // Enable collapse at window width using default value (1024px)
            $navigationMenu.setDefaultCollapseAtWidth();
        } else {
            // Disable collapsing the side navigation menu according to window width
            $navigationMenu.setCollapseAtWidth(0);
        }
    });
}