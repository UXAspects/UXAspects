angular.module("app").controller("SingleSelectTableCtrl", SingleSelectTableCtrl);

function SingleSelectTableCtrl() {
  var vm = this;

  vm.selectedVal = "";
  vm.tableId = "example-table";
  vm.searchTextSingle = "";
  vm.heading = "Select an author";
  vm.selectKey="name";
  vm.authors = getRandomNameList(40);

  function getRandomNameList(total) {
    var list = [];
    for (var i = 0; i < total; i++) {
      list.push({"id":i+1,"name":getRandomName(i)});
    }
    return list;

  }
  function getRandomName(seed) {
    if (window.chance) {
      return window.chance.name();
    }
    return "Mark Brown";
  }
}