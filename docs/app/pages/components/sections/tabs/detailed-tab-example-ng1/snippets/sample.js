angular.module("app").controller("TabsCtrl", TabsCtrl);

function TabsCtrl() {

  var vm = this;

  vm.detailedTabs = [{
      title: 'Bar Chart',
      content: 'tab-bar.html'
  }, {
      title: 'Sankey Chart',
      content: 'tab-sankey.html'
  }, {
      title: 'Fixed Header Table',
      content: 'tab-table.html'
  }];

}