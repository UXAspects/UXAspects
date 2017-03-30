FacetCustomCtrl.$inject = ['$scope'];

export default function FacetCustomCtrl($scope) {
  var vm = this;
  vm.scope = $scope;
  vm.name = $scope.name;
  vm.expanded = true;

  vm.toggleExpand = function ($event) {
    vm.expanded = !vm.expanded;
    $event.currentTarget.blur();
  };
  vm.toggleExpandKey = function ($event) {
    if ($event.keyCode === 13) {
      vm.expanded = !vm.expanded;
      $event.preventDefault();
    }
  };

  $scope.$watch('model', function (nV, oV) {
    if (!angular.equals(nV, oV)) {
      vm.scope.fo.deselect();
      if (nV !== "") {
        vm.scope.fo.option.displayName = vm.scope.display();
        vm.scope.fo.select();
      }
    }
  });

}

FacetCustomCtrl.prototype.register = function (fo) {
  if (!this.options) {
    this.options = [];
  }
  this.options.push(fo);
};