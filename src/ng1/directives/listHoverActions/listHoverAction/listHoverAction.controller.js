ListHoverActionCtrl.$inject = ["$scope"];

export default function ListHoverActionCtrl($scope) {

	var listHoverActionsCtrl = $scope.$parent.lh;
  var KEYS = {
    ENTER: 13
  };

  this.icon = $scope.icon;

  this.iconBase = this.icon && this.icon.indexOf('hp-') === -1 ? 'hpe-icon' : 'hp-icon';

  this.click = $scope.click;

  // on focus, set to true for this action
  this.focus = function() {
    listHoverActionsCtrl.actionFocused[$scope.$id] = true;
  };

  // on blur, set to false for this action
  this.blur = function() {
    listHoverActionsCtrl.actionFocused[$scope.$id] = false;
  };

  // on enter, stop propagation and call same function as click
  this.enter = function(e) {
    if (e.keyCode !== KEYS.ENTER) return;
    e.preventDefault();
    e.stopPropagation();
    $scope.click();
  };
}