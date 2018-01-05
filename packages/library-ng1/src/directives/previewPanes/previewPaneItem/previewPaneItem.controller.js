PreviewPaneItemCtrl.$inject = ["$scope", "$attrs", "$parse"];

export default function PreviewPaneItemCtrl($scope, $attrs, $parse) {
  var vm = this;
  vm.$scope = $scope;
  vm.selectCallback = $parse($attrs.previewPaneItem);
  vm.tabIndex = 0;
}

PreviewPaneItemCtrl.prototype.updateIndex = function (val) {
  this.tabIndex = val;
};

PreviewPaneItemCtrl.prototype.select = function (val) {
  this.selectCallback(this.$scope, {
    itemIndex: val
  });
};