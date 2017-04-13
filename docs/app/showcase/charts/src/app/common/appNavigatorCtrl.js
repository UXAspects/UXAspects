(function() {
  angular.module("app").controller("AppNavigatorCtrl", AppNavigatorCtrl);

  function AppNavigatorCtrl() {
    var vm = this;

    if(window.location.host === 'uxaspects.github.io') {
      vm.link = '/UXAspects/#/showcase';
    } else {
      vm.link = '/#/showcase';
    }

  }

})();