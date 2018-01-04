FacetCtrl.$inject = ['$scope'];

export default function FacetCtrl($scope) {
  var vm = this;
  vm.name = $scope.name;
  vm.expanded = true;
  vm.scrollConfig = {
    autoReinitialise: true,
    showOnlyOnHover: true,
    enableKeyboardNavigation: true
  };
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
}

FacetCtrl.prototype.register = function (fo) {
  if (!this.options) {
    this.options = [];
  }
  this.options.push(fo);
};