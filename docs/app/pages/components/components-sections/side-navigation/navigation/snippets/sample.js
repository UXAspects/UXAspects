function SideNavigationCtrl($state) {
  var vm = this;
  
  vm.$state = $state;
}

angular.module('app')
  .config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

      $urlRouterProvider.otherwise('/menu-levels');
      $stateProvider
        .state('menu-levels', {
          abstract: 'true',
          url: '/menu-levels',
          template: '<ui-view/>'
        })
        .state('menu-levels.second-level', {
          abstract: 'true',
          url: '/second-level',
          template: '<ui-view/>'
        })
        .state('menu-levels.second-level-item-1', {
          url: '/second-level-item-1',
          template: ''
        })
        .state('menu-levels.second-level-item-2', {
          url: '/second-level-item-2',
          template: ''
        })
        .state('menu-levels.second-level-item-3', {
          url: '/second-level-item-3',
          template: ''
        })
        .state('menu-levels.second-level.third-level-item-1', {
          url: '/third-level-item-1',
          template: ''
        })
        .state('menu-levels.second-level.third-level-item-2', {
          url: '/third-level-item-2',
          template: ''
        })

    }
  ]);

  angular.module('app').controller('SideNavigationCtrl', ['$state', SideNavigationCtrl]);