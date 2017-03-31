angular.module('app').directive('uxdStackedTabsWrapper', () => {
    return {
        restrict: 'E',
        template: require('./stacked-tabs-wrapper.directive.html'),
        controller: 'StackedTabsCtrl as vm'
    };
});

angular.module('app').controller('StackedTabsCtrl', StackedTabsCtrl);

function StackedTabsCtrl() {

    var vm = this;

    vm.stackedTabs = [{
      title: 'Schedule',
      icon: 'hpe-schedule',
      content: ' Lorem ipsum dolor sit amet, charetra varius quam sit amet vulputate.Quisque mauris augue, molestie tincidunt condimentum vitae, gravida a libero. '
    }, {
      title: 'Protection',
      icon: 'hpe-shield',
      content: 'Secondo sed ac orci quis tortor imperdiet venenatis. Duis elementum auctor accumsan. Aliquam in felis sit amet augue.'
    }, {
      title: 'Solution',
      icon: 'hpe-information',
      content: 'Thirdamuno, ipsum dolor sit amet, consectetur adipiscing elit. Duis pharetra varius quam sit amet vulputate. Quisque mauris augue, molestie tincidunt condimentum vitae.'
    }];

  }