MultipleListSelectActionsCtrl.$inject = ["$scope", "multipleSelectProvider"];

export default function MultipleListSelectActionsCtrl($scope, multipleSelectProvider) {
  this.provider = multipleSelectProvider;
  this.provider.onSelect = $scope.onSelect;
  this.provider.onDeselect = $scope.onDeselect;
  this.provider.total = $scope.total;
  //only override keyfn if one exists
  this.provider.keyFn = $scope.keyFn;

  this.state = this.provider.state;

}