angular.module('app')
  .config(["$stateProvider", "$urlRouterProvider","$breadcrumbProvider",
    function ($stateProvider, $urlRouterProvider,$breadcrumbProvider) {
      
      //allow abstract states in breadcrumb
      $breadcrumbProvider.setOptions({
        includeAbstract: true
      });
      
      $urlRouterProvider.otherwise("/listview/listview1");
      $stateProvider
        .state('listview', {
          abstract: 'true',
          url: '/listview',
          template: "<ui-view autoscroll=\"false\" />",
          ncyBreadcrumb: {
            label: 'List Views',
          }
        })
        .state('listview.listview1', {
          url: '/listview1',
          templateUrl: "app/views/listViews/listView1.html",
          controller: 'ListViewCtrl as vm',
          ncyBreadcrumb: {
            label: "List View 1"
          },
          data: {
            pageTitle: 'List View 1'
          }
        })
        .state('listview.listview2', {
          url: '/listview2',
          templateUrl: "app/views/listViews/listView2.html",
          controller: 'ListViewCtrl as vm',
          ncyBreadcrumb: {
            label: "List View 2"
          },
          data: {
            pageTitle: 'List View 2'
          }
        })
        .state('detailview', {
          url: '/detailview',
          templateUrl: "app/views/detailView/detailView.html",
          ncyBreadcrumb: {
            label: "Detail View"
          },
          data: {
            pageTitle: 'Detail View'
          }
        });
    }]);