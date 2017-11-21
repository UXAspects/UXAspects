angular.module("app").controller("TabsCtrl", TabsCtrl);

function TabsCtrl() {
    var vm = this;

    vm.tabs = [
        { title:"Schedule", icon:"hpe-schedule", content:"tab.html" },
        { title:"Protection", icon:"hpe-shield", content:"tab.html" },
        { title:"Solution", icon:"hpe-information", content:"tab.html" },
        { title:"Analytics", icon:"hpe-analytics", content:"tab.html" }
    ];

    vm.dynamicTabs = [
      { title: "Schedule", icon: "hpe-schedule", content: "tab.html" },
      { title: "Protection", icon: "hpe-shield", content: "tab.html" },
      { title: "Solution", icon: "hpe-information", content: "tab.html" },
      { title: "Analytics", icon: "hpe-analytics", content: "tab.html" }
    ];

    vm.inlineDropDownOptions = ['Security', 'Progress', 'Actions'];

    var dropDownOptionTabs = [
      { title: "Security", icon: "hpe-secure", content: "tab.html" },
      { title: "Progress", icon: "hpe-optimization", content: "tab.html" },
      { title: "Actions", icon: "hpe-actions", content: "tab.html" }
    ];

    vm.dropClick = function(index) {

      if(vm.dynamicTabs.indexOf(dropDownOptionTabs[index]) === - 1) {
          vm.dynamicTabs.push(dropDownOptionTabs[index]);
      }
    };

    vm.tabSelected = function(tab_name) {

      var matching_tabs = vm.dynamicTabs.filter(function(tab) {
        return tab.title === tab_name;
      });

      return matching_tabs.length !== 0;
    };
}