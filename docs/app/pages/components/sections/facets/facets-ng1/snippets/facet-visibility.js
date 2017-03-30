$scope.$watch("vm.showFacets", function (nv) {
  if (nv) {
    $scope.$broadcast("facet-reinitialise");
  }
});