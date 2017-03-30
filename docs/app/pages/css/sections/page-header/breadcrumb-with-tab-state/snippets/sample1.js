// In the controller, create a handler on the '$stateChangeSuccess' event to connect states to the active tab.
angular.module("app").controller("BreadCrumbWithTabStateCtrl", ["$scope", "$state", BreadCrumbWithTabStateCtrl]);

function BreadCrumbWithTabStateCtrl($scope, $state) {
    $scope.documentationTabActive = false;
    $scope.additionalTabActive = false;


    $scope.load = function(state) {
    $state.go(state);
    };

    $scope.$on("$stateChangeSuccess", function() {
    $scope.documentationTabActive = !!$state.is("patterns.pagelayout.breadCrumbWithTabState.documentationTab");
    $scope.additionalTabActive = !!$state.is("patterns.pagelayout.breadCrumbWithTabState.additionalTab");
    });
}