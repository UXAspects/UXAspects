angular.module('app').directive('uxdTimeAgoServiceWrapper', () => {
    return {
        restrict: 'E',
        template: require('./time-ago-service-wrapper.directive.html'),
        controller: 'TimeAgoCtrl as vm'
    };
});

angular.module('app').controller('TimeAgoCtrl', TimeAgoCtrl);

function TimeAgoCtrl() {
  var vm = this;

  // store the time this page was navigated to
  vm.loadTime = new Date();
}