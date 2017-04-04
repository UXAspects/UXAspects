angular.module('app').directive('uxdCardTabsWrapper', () => {
    return {
        restrict: 'E',
        template: require('./card-tabs-wrapper.directive.html'),
        controller: 'CardTabsCtrl as vm',
        scope: true
    };
});

angular.module('app').controller('CardTabsCtrl', ['$scope', CardTabsCtrl]);


function CardTabsCtrl($scope: angular.IScope) {

    var vm = this;

    vm.$onDestroy = function() {
      $scope.$destroy();
    };

    vm.cardTabs = [{
      title: 'Archive Totals',
      image: 'img1',
      value: '637 <small>GB</small>',
      subtitle: '63% licensed storage used',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam cursus volutpat eros, in varius nibh ultrices a. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam pellentesque vel augue nec pellentesque. Nullam sollicitudin pulvinar lectus, non eleifend mauris finibus vitae. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.'
    }, {
      title: 'Data Processed',
      image: 'img2',
      value: '1.3 <small>GB</small>',
      subtitle: 'processed this month',
      content: 'Vestibulum faucibus porttitor ligula, vitae sollicitudin tellus efficitur quis. Duis sit amet sollicitudin dui. Praesent mauris tortor, dignissim sit amet convallis et, sollicitudin et risus. Phasellus eget tortor eu est egestas suscipit et eget ante. Vivamus eget ultricies felis. Ut dolor justo, finibus vel metus quis, hendrerit malesuada justo. Donec est nibh, suscipit non feugiat eget, rutrum sed ipsum.'
    }, {
      title: 'Data Retention',
      image: 'img3',
      value: '242 <small>GB</small>',
      subtitle: '39% data on hold',
      content: 'Mauris sit amet condimentum lorem. Aliquam at ante sed quam volutpat ornare. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam congue posuere eros sed egestas. Cras gravida viverra ipsum vel porta. Ut at hendrerit velit. Fusce est est, vehicula vel elementum et, ultricies at leo.'
    }, {
      title: 'Users',
      image: 'img4',
      value: '195',
      subtitle: '76 logged in',
      content: 'In hac habitasse platea dictumst. Donec ut nunc mauris. Suspendisse lobortis viverra neque vitae cursus. Proin tempus arcu erat, eu sollicitudin neque efficitur interdum. Cras bibendum eget sapien sit amet hendrerit. Phasellus non dictum urna. Sed fermentum nisl nec turpis euismod lobortis. Pellentesque porta ligula at auctor tempus. Suspendisse non augue nec libero posuere tempus quis nec lectus. Sed non nisl velit.'
    }, {
      title: 'Audit Trail',
      image: 'img5',
      value: '&nbsp;',
      subtitle: 'activity (last 7 days)',
      content: 'Fusce tempus aliquet tristique. Cras mollis cursus eros, ac tincidunt arcu aliquet sed. Fusce magna nisl, euismod eget mattis ut, convallis sit amet mi. Sed tempor nunc ac blandit pretium. Aliquam ut luctus augue. Etiam luctus felis nisi. Cras a ante nec nulla mattis dignissim. Vivamus placerat faucibus ultricies. Aliquam in efficitur elit, nec egestas odio.'
    }];

  }