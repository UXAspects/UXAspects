angular.module('app').directive('uxdTabsWrapper', () => {
    return {
        restrict: 'E',
        template: require('./tabs-wrapper.directive.html'),
        controller: 'TabsCtrl as vm',
        scope: true
    };
});

angular.module('app').controller('TabsCtrl', ['$templateCache', '$scope', TabsCtrl]);

function TabsCtrl($templateCache: ng.ITemplateCacheService, $scope: angular.IScope) {

    var vm = this;

    vm.$onDestroy = function() {
      $scope.$destroy();
    };

    // load tab templates as angular 1 templates
    $templateCache.put('tab-demo-template.html', require('!raw-loader!./tab.html'));

    vm.tabs = [{
      title: 'Schedule',
      icon: 'hpe-schedule',
      content: 'tab-demo-template.html'
    }, {
      title: 'Protection',
      icon: 'hpe-shield',
      content: 'tab-demo-template.html'
    }, {
      title: 'Solution',
      icon: 'hpe-information',
      content: 'tab-demo-template.html'
    }, {
      title: 'Analytics',
      icon: 'hpe-analytics',
      content: 'tab-demo-template.html'
    }, ];

    vm.dynamicTabs = [{
      title: 'Schedule',
      icon: 'hpe-schedule',
      content: 'tab-demo-template.html'
    }, {
      title: 'Protection',
      icon: 'hpe-shield',
      content: 'tab-demo-template.html'
    }, {
      title: 'Solution',
      icon: 'hpe-information',
      content: 'tab-demo-template.html'
    }, {
      title: 'Analytics',
      icon: 'hpe-analytics',
      content: 'tab-demo-template.html'
    }];

    vm.inlineDropDownOptions = ['Security', 'Progress', 'Actions'];

    let dropDownOptionTabs = [{
      title: 'Security',
      icon: 'hpe-secure',
      content: 'tab-demo-template.html'
    }, {
      title: 'Progress',
      icon: 'hpe-optimization',
      content: 'tab-demo-template.html'
    }, {
      title: 'Actions',
      icon: 'hpe-actions',
      content: 'tab-demo-template.html'
    }];

    vm.dropClick = function (index: number) {

      if (vm.dynamicTabs.indexOf(dropDownOptionTabs[index]) === -1) {
        vm.dynamicTabs.push(dropDownOptionTabs[index]);
      }
    };

    vm.tabSelected = function (tabName: string) {

      let matchingTabs = vm.dynamicTabs.filter(function (tab: any) {
        return tab.title === tabName;
      });

      return matchingTabs.length !== 0;
    };

  }