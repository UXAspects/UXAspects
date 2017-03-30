MultipleSelectActionCtrl.$inject = ["$scope", "multipleSelectProvider"];

export default function MultipleSelectActionCtrl($scope, multipleSelectProvider) {
    this.name = $scope.name;
    this.callback = $scope.action;
    this.provider = multipleSelectProvider;
    this.type = $scope.type || "white";
}

MultipleSelectActionCtrl.prototype.activate = function() {
    this.provider.action = this;
    this.provider.state.selecting = true;
    this.provider.state.selectedFromButton = true;
    this.provider.state.selectedFromCheckBox = false;
};