angular.module('app')
  .config(["$stateProvider", "$urlRouterProvider","$breadcrumbProvider",
    function ($stateProvider, $urlRouterProvider,$breadcrumbProvider) {
      
      //allow abstract states in breadcrumb
      $breadcrumbProvider.setOptions({
        includeAbstract: true
      });
      
      $urlRouterProvider.otherwise("/socialchart");
      $stateProvider
        .state('socialchart', {
          url: '/socialchart',
          templateUrl: "app/views/socialChart/socialChart.html",
          controller: 'SocialCtrl as vm',
          ncyBreadcrumb: {
            label: "Social Chart"
          },
          data: {
            pageTitle: 'Social Chart'
          }
        })
        .state('partitionmap', {
          url: '/partitionmap',
          templateUrl: "app/views/partitionMap/partitionMap.html",
          controller: 'PartitionMapCtrl as vm',
          ncyBreadcrumb: {
            label: "Partition Map"
          },
          data: {
            pageTitle: 'Partition Map'
          }
        })
        .state('sankeychart', {
          url: '/sankeychart',
          templateUrl: "app/views/sankeyChart/sankeyChart.html",
          controller: 'SankeyCtrl as vm',
          ncyBreadcrumb: {
            label: "Sankey Chart"
          },
          data: {
            pageTitle: 'Sankey Chart'
          }
        });
    }]);