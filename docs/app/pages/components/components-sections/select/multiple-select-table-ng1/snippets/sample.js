angular.module("app").controller("MultipleSelectTableCtrl", MultipleSelectTableCtrl);

function MultipleSelectTableCtrl($timeout, $filter, $q) {
  var vm = this;
  vm.multipleSelectedVals = [];
  vm.searchText = "";
  vm.heading = "Select an author";
  vm.selectKey = "name";

  vm.authors = [
      {
          id: "1",
          name: chance.name()
      }, {
          id: "2",
          name: chance.name()
      }, {
          ...
      }, {
          id: "40",
          name: chance.name()
      }
  ];

  vm.getSelectedIds = function () {
    return vm.multipleSelectedVals.map(function (elem) {
      return elem.id
    }).join(', ');
  };

  vm.clearSelection = function() {
    vm.multipleSelectedVals = [];
  };
}