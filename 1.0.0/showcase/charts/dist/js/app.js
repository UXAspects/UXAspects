angular.module('app', ['ux-aspects']).run(function ($rootScope, $state, $stateParams) {
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
});
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
(function () {
    angular.module('app').controller('LeftNavigationCtrl', LeftNavigationCtrl);

    LeftNavigationCtrl.$inject = ['$rootScope'];

    function LeftNavigationCtrl($rootScope) {
        var vm = this;

        vm.pageName = '';

        $rootScope.$on('$stateChangeSuccess', function (event, toState) {
            switch (toState.name) {
                
                case 'socialchart':
                    vm.pageName = 'Social Chart';
                    break;
                
                case 'partitionmap':
                    vm.pageName = 'Partition Map';
                    break;
                
                case 'sankeychart':
                    vm.pageName = 'Sankey Chart';
                    break;
                   
            }
        });
    }
})();
(function() {
  angular.module("app").controller("PageHeaderCtrl", PageHeaderCtrl);


  PageHeaderCtrl.$inject = ['$scope', '$rootScope', '$state'];

  function PageHeaderCtrl($scope, $rootScope, $state) {
    var vm = this;

    vm.sourceUrl = document.referrer;

    vm.currentState = null;
    vm.previousState = null;
    vm.topSearchExpanded = false;
    vm.versionName = "Elements Angular Version";

    // when route changes check if we should show back button or not
    $rootScope.$on('$viewContentLoaded', function() {

      // get the name of the current state
      vm.currentState = $state.current.name;
    });

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState) {
      vm.previousState = fromState.name;
    });

    vm.expandTopSearch = function(value) {
      vm.topSearchExpanded = value;
    };

    vm.goBack = function() {

      if (vm.currentState === 'detailview' && vm.previousState) {
        // if current state is detail view then go back to list view
        $state.go(vm.previousState);
      } else {
        // otherwise go back to the showcase page
        window.location.href = vm.sourceUrl;
      }
    };

  }

})();
(function() {
  angular.module("app").controller("PartitionMapCtrl", PartitionMapCtrl);

  function PartitionMapCtrl() {
    var vm = this;

    vm.options = {
      edit: {
        text: 'Edit',
        image: 'img/pencil.png',
        click: function() {
          //perform action when the edit option is clicked
        },
        editor: {
          enabled: true,
          finishText: 'Done',
          noGroupsText: 'No groups available',
          availableGroups: ['Custodian', 'Language', 'Data Source'],
          maxRows: 3,
          minRows: 1,
          onFinish: function() {
          }
        }
      },
      select: function() {
        //perform action when a segment has been clicked
      },
      maximize: {
      	disableScrolling: false,
      	buttonVisible: false,
      	isMaximized: true,
        fillScreen: true,
        sidePanelWidth: 235,
        shouldResize: true,
        onToggle: function(action) {

          //the following changes are to allow documentation to draw correctly

          //resize containing element
          var containingElement = document.getElementsByClassName('partition-map-box')[0];
          containingElement.style.height = action ? 'auto' : '600px';

          //reposition the details div
          var details = document.getElementById('partition-details');
          if (details) {
            details.style.position = action ? 'relative' : '';
            details.style.top = action ? '-93px' : '';
          }
        }
      },
      popoverTemplate: 'app/views/partitionMap/template/popoverTemplate.html',
      popoverEnabled: true,
      valueFormatter: function(value) {
        return value;
      },
      noDataLabel: 'No data to display',
      loadingLabel: 'Loading...',
      popoverDelay: 650
    };

    vm.isLoading = false;

    vm.chartData = [{
      label: 'Home',
      image: 'img/home.png',
      groupName: 'Hard Drives',
      children: [{
        label: chance.name(),
        groupName: 'Custodian',
        children: [{
          label: 'English',
          groupName: 'Language',
          children: [{
            label: 'Email',
            groupName: 'Data Source',
            value: 40
          }, {
            label: 'Microsoft Word',
            groupName: 'Data Source',
            value: 10
          }]
        }, {
          label: 'German',
          groupName: 'Language',
          children: [{
            label: 'Email',
            groupName: 'Data Source',
            value: 10
          }, {
            label: 'Microsoft Word',
            groupName: 'Data Source',
            value: 5
          }]
        }]
      }, {
        label: chance.name(),
        groupName: 'Custodian',
        children: [{
          label: 'English',
          groupName: 'Language',
          children: [
            {
            label: 'Email',
            groupName: 'Data Source',
            value: 15
          }, {
            label: 'Microsoft Word',
            groupName: 'Data Source',
            value: 5
          }],
        },
        {
          label: 'German',
          groupName: 'Language',
          children: [{
            label: 'Email',
            groupName: 'Data Source',
            value: 10
          }, {
            label: 'Microsoft Word',
            groupName: 'Data Source',
            value: 5
          }]
        }]
      }]
    }];

  }
})();

(function() {
  angular.module("app").controller("PartitionMapPopoverCtrl", ['$scope', PartitionMapPopoverCtrl]);

  function PartitionMapPopoverCtrl($scope) {
    var vm = this;

    //get the segment color from the parent scope
    var primaryColor = $scope.$parent.color;

    var lineData = randomData();

    vm.lineChart = {
      data: [{
        data: lineData,
        lines: {
          show: true,
          fill: true,
          lineWidth: 1,
          fillColor: {
            colors: [{
              opacity: 0.0
            }, {
              opacity: 0.5
            }, {
              opacity: 0.8
            }]
          }
        },
        shadowSize: 0
      }],
      options: {
        xaxes: [{
          show: false
        }],
        yaxes: [{
          show: false
        }],
        colors: [primaryColor],
        grid: {
          borderWidth: {
            "bottom": 0,
            "left": 0,
            "top": 0,
            "right": 0
          },
        },
        tooltip: false
      }
    };

    //generate some random data for the chart
    function randomData() {
      var dataPoints = [];

      for (var i = 0; i <= 40; i++) {
        dataPoints.push([i, Math.floor((Math.random() * (150 - 40)) + 40)]);
      }

      return dataPoints;
    }

  }

})();

(function() {
    angular.module('app').controller('SankeyCtrl', SankeyCtrl);

    function SankeyCtrl() {
        var vm = this;

        vm.resizeId = null;
	    vm.container = {};
	    vm.chart = {};

    	vm.data = {
			"columns": [
				{"id": "data_source",       "name": "Repository",    "ordinal": 0},
				{"id": "extraction_type",   "name": "Extraction",     "ordinal": 1},
				{"id": "classification",    "name": "Classification", "ordinal": 2},
				{"id": "disposition_type",  "name": "Disposition",    "ordinal": 3}
			],
			"nodes": [
				{"name": "Not Classified",    "type": "classification",    "id": 0,  "value": 130, "datasize": 362969649},
				{"name": "Classified",        "type": "classification",    "id": 1,  "value": 243, "datasize": 326502171},
				{"name": "Phone Records",     "type": "data_source",       "id": 2,  "value": 14,  "datasize": 512125362},
				{"name": "Lync Conversation", "type": "data_source",       "id": 3,  "value": 32,  "datasize": 62160},
				{"name": "Device Backup",     "type": "data_source",       "id": 4,  "value": 50,  "datasize": 33409254},
				{"name": "Data Archive (Internal)",    "type": "data_source",       "id": 5,  "value": 104, "datasize": 35125228},
				{"name": "Exchange",          "type": "data_source",       "id": 6,  "value": 173, "datasize": 108749816},
				{"name": "Archived",          "type": "disposition_type",  "id": 7,  "value": 12,  "datasize": 14860510},
				{"name": "Deleted",           "type": "disposition_type",  "id": 8,  "value": 34,  "datasize": 32517566},
				{"name": "On Hold",           "type": "disposition_type",  "id": 9,  "value": 68,  "datasize": 535140573},
				{"name": "Image",             "type": "extraction_type",   "id": 10, "value": 16,  "datasize": 2286386},
				{"name": "Audio",             "type": "extraction_type",   "id": 11, "value": 22,  "datasize": 525843218},
				{"name": "Text",              "type": "extraction_type",   "id": 12, "value": 335, "datasize": 161342216}
			],
			"links": [
				{"source": 0,   "target": 7,  "value": 4,   "datasize": 348},
				{"source": 0,   "target": 8,  "value": 4,   "datasize": 23572},
				{"source": 1,   "target": 7,  "value": 8,   "datasize": 14860162},
				{"source": 1,   "target": 9,  "value": 27,  "datasize": 217971281},
				{"source": 1,   "target": 8,  "value": 30,  "datasize": 32493994},
				{"source": 0,   "target": 9,  "value": 41,  "datasize": 317169292},
				{"source": 5,   "target": 11, "value": 4,   "datasize": 6741424},
				{"source": 6,   "target": 11, "value": 4,   "datasize": 6976432},
				{"source": 5,   "target": 10, "value": 6,   "datasize": 73059},
				{"source": 6,   "target": 10, "value": 10,  "datasize": 2213327},
				{"source": 2,   "target": 11, "value": 14,  "datasize": 512125362},
				{"source": 3,   "target": 12, "value": 32,  "datasize": 62160},
				{"source": 4,   "target": 12, "value": 50,  "datasize": 33409254},
				{"source": 5,   "target": 12, "value": 94,  "datasize": 28310745},
				{"source": 6,   "target": 12, "value": 159, "datasize": 99560057},
				{"source": 11,  "target": 1,  "value": 4,   "datasize": 187339593},
				{"source": 10,  "target": 0,  "value": 6,   "datasize": 226298},
				{"source": 10,  "target": 1,  "value": 10,  "datasize": 2060088},
				{"source": 11,  "target": 0,  "value": 18,  "datasize": 338503625},
				{"source": 12,  "target": 0,  "value": 105, "datasize": 24239726},
				{"source": 12,  "target": 1,  "value": 230, "datasize": 137102490}
			]
    	};

		vm.options = {
			linkHoverHL: true,
			col: {
				headerLabelSpacing: 25,
				paddingTop: 0,
				paddingBottom: 0,
				headerLabelLength: 18
			},
			block:{
				truncateThreshold:18,
				minWidth: 120,
				calloutData: {
					topLeft: {key: 'datasize', nodeLabel: false, defaultShow: false, valueUnit: 'B', label: 'data', binary: true},
					topRight: {key: 'value', nodeLabel: false, defaultShow: true, valueUnit: null, label: 'items'},
					bottomRight: {},
					bottomLeft: { key: 'name', nodeLabel: true, defaultShow: true }
				}
			},
			overflow:{
				tooltip:{
					label: 'items',
					showTooltip:true
				}
			}
		};

    }

})();
(function() {
    angular.module('app').controller('SocialCtrl', SocialCtrl);

    function SocialCtrl() {
        var vm = this;

        vm.chartTitle = {
            title: "Entire network",
            timeout: 3000,
            nodeSelectedTitle: "Social interactions with {{node}}",
            edgeSelectedTitle: "Social interactions between {{source}} and {{target}}",
            stageSelectedTitle: "Entire network"
        };

        function compareNodes (a,b){
            if (a.setInExternal.ratio < b.setInExternal.ratio){
                return 1;
            }
            if (a.setInExternal.ratio > b.setInExternal.ratio){
                return -1;
            }
            return 0;
        }

        function onNodeClick (){

            function onNodeClick(node){

                if (node.neighborNodes) return;
                var neighbours = node.getNeighbors();
                node.neighborNodes = neighbours.nodes;
                var edges = neighbours.edges;
                node.neighbourList = [];
                for(var i in node.neighborNodes){
                    node.neighborNodes[i].setInExternal = {
                        ratio : Math.round( (node.neighborNodes[i].additional.sent[node.id] + node.neighborNodes[i].additional.received[node.id] ) / node.additional.volume *100 ),
                        goToEdge : makeEdgeFunc(i)
                    };
                    node.neighbourList.push(node.neighborNodes[i]);
                }

                node.neighbourList.sort(compareNodes);

                function makeEdgeFunc(i){
                    function goToEdge(){
                        vm.api.setSelectedEdgeById(Object.keys(edges[i])[0]);
                    }
                    return goToEdge;
                }
            }

            return onNodeClick;
        }

        function onEdgeClick(){

            function onEdgeClick(edge){
                if (edge.sourceNode) return;
                edge.sourceNode = edge.getSourceNode();
                edge.sourceNode.goTo = function(){
                    vm.api.setSelectedNodeById(edge.sourceNode.id);
                };
                edge.targetNode = edge.getTargetNode();
                edge.targetNode.goTo = function(){
                    vm.api.setSelectedNodeById(edge.targetNode.id);
                };
            }

            return onEdgeClick;
        }

        function onStageClick(){

            function onStageClick(){
            }

            return onStageClick;
        }

        vm.api = {
            selectedNode :null,
            selectedEdge : null,
            onNodeClick:onNodeClick(),
            onEdgeClick:onEdgeClick(),
            onStageClick:onStageClick(),
            onNodeHover:onNodeClick(),
            onEdgeHover:onEdgeClick()
        };

        vm.communities = {
            example_group_1: {
                color: '#00cceb',
                style: 'stroke'
            }
        };
        vm.detailStyle = {
            node:{
                'width':'235px',
                'height':'99%'
            },
            edge:{
                'width': '40vw',
                'height':'20%',
                'min-width':'480px',
                'max-height':'176px'
            }
        };

        vm.options = {
            'neighborViewOnSelect': true,
            'minNodeSize':5,
            'maxNodeSize':12
        };

        vm.edgeWeightInfluence = false;

        vm.forceAtlasDuration = 1700;

        vm.minLabels = 5;

        var nodes = [{
            id: 0,
            label: chance.name()
        }, {
            id: 1,
            label: chance.name()
        }, {
            id: 2,
            label: chance.name()
        }, {
            id: 3,
            label: chance.name()
        }, {
            id: 4,
            label: chance.name()
        }, {
            id: 5,
            label: chance.name()
        }, {
            id: 6,
            label: chance.name()
        }, {
            id: 7,
            label: chance.name()
        }, {
            id: 8,
            label: chance.name()
        }, {
            id: 9,
            label: chance.name()
        }, {
            id: 10,
            label: chance.name()
        }, {
            id: 11,
            label: chance.name()
        }, {
            id: 12,
            label: chance.name()
        }, {
            id: 13,
            label: chance.name()
        }, {
            id: 14,
            label: chance.name()
        }, {
            id: 15,
            label: chance.name()
        }, {
            id: 16,
            label: chance.name()
        }, {
            id: 17,
            label: chance.name()
        }, {
            id: 18,
            label: chance.name()
        }, {
            id: 19,
            label: chance.name()
        }, {
            id: 20,
            label: chance.name()
        }, {
            id: 21,
            label: chance.name()
        }, {
            id: 22,
            label: chance.name()
        }, {
            id: 23,
            label: chance.name()
        }, {
            id: 24,
            label: chance.name()
        }, {
            id: 25,
            label: chance.name()
        }, {
            id: 26,
            label: chance.name()
        }, {
            id: 27,
            label: chance.name()
        }, {
            id: 28,
            label: chance.name()
        }, {
            id: 29,
            label: chance.name()
        }, {
            id: 30,
            label: chance.name()
        }, {
            id: 31,
            label: chance.name(),
            community: "example_group_1"
        }, {
            id: 32,
            label: chance.name()
        }, {
            id: 33,
            label: chance.name()
        }, {
            id: 34,
            label: chance.name()
        }, {
            id: 35,
            label: chance.name()
        }, {
            id: 36,
            label: chance.name()
        }, {
            id: 37,
            label: chance.name()
        }, {
            id: 38,
            label: chance.name(),
            community: "example_group_1"
        }, {
            id: 39,
            label: chance.name()
        }, {
            id: 40,
            label: chance.name()
        }, {
            id: 41,
            label: chance.name()
        }, {
            id: 42,
            label: chance.name()
        }, {
            id: 43,
            label: chance.name()
        }, {
            id: 44,
            label: chance.name()
        }, {
            id: 45,
            label: chance.name()
        }, {
            id: 46,
            label: chance.name()
        }, {
            id: 47,
            label: chance.name()
        }, {
            id: 48,
            label: chance.name()
        }, {
            id: 49,
            label: chance.name()
        }, {
            id: 50,
            label: chance.name()
        }, {
            id: 51,
            label: chance.name()
        }, {
            id: 52,
            label: chance.name()
        }, {
            id: 53,
            label: chance.name()
        }, {
            id: 54,
            label: chance.name()
        }, {
            id: 55,
            label: chance.name()
        }, {
            id: 56,
            label: chance.name()
        }, {
            id: 57,
            label: chance.name()
        }, {
            id: 58,
            label: chance.name()
        }, {
            id: 59,
            label: chance.name()
        }, {
            id: 60,
            label: chance.name()
        }, {
            id: 61,
            label: chance.name()
        }, {
            id: 62,
            label: chance.name()
        }, {
            id: 63,
            label: chance.name()
        }, {
            id: 64,
            label: chance.name()
        }, {
            id: 65,
            label: chance.name(),
            community: "example_group_1"
        }, {
            id: 66,
            label: chance.name()
        }, {
            id: 67,
            label: chance.name()
        }, {
            id: 68,
            label: chance.name()
        }, {
            id: 69,
            label: chance.name()
        }, {
            id: 70,
            label: chance.name(),
            community: "example_group_1"
        }, {
            id: 71,
            label: chance.name()
        }, {
            id: 72,
            label: chance.name()
        }, {
            id: 73,
            label: chance.name()
        }, {
            id: 74,
            label: chance.name()
        }, {
            id: 75,
            label: chance.name()
        }, {
            id: 76,
            label: chance.name()
        }];

        var nodeMap = {};

        for (var i = 0; i < nodes.length; i += 1) {
            var email = nodes[i].label.replace(' ', '').toLowerCase();
            nodes[i].additional = {
                fullName: email + "@business.com"
            };
            nodeMap[nodes[i].id] = nodes[i];
        }

        var edges = [{
            source: 1,
            target: 0,
            value: 1
        }, {
            source: 2,
            target: 0,
            value: 8
        }, {
            source: 3,
            target: 0,
            value: 10
        }, {
            source: 3,
            target: 2,
            value: 6
        }, {
            source: 4,
            target: 0,
            value: 1
        }, {
            source: 5,
            target: 0,
            value: 1
        }, {
            source: 6,
            target: 0,
            value: 1
        }, {
            source: 7,
            target: 0,
            value: 1
        }, {
            source: 8,
            target: 0,
            value: 2
        }, {
            source: 9,
            target: 0,
            value: 1
        }, {
            source: 11,
            target: 10,
            value: 1
        }, {
            source: 11,
            target: 3,
            value: 3
        }, {
            source: 11,
            target: 2,
            value: 3
        }, {
            source: 11,
            target: 0,
            value: 5
        }, {
            source: 12,
            target: 11,
            value: 1
        }, {
            source: 13,
            target: 11,
            value: 1
        }, {
            source: 14,
            target: 11,
            value: 1
        }, {
            source: 15,
            target: 11,
            value: 1
        }, {
            source: 17,
            target: 16,
            value: 4
        }, {
            source: 18,
            target: 16,
            value: 4
        }, {
            source: 18,
            target: 17,
            value: 4
        }, {
            source: 19,
            target: 16,
            value: 4
        }, {
            source: 19,
            target: 17,
            value: 4
        }, {
            source: 19,
            target: 18,
            value: 4
        }, {
            source: 20,
            target: 16,
            value: 3
        }, {
            source: 20,
            target: 17,
            value: 3
        }, {
            source: 20,
            target: 18,
            value: 3
        }, {
            source: 20,
            target: 19,
            value: 4
        }, {
            source: 21,
            target: 16,
            value: 3
        }, {
            source: 21,
            target: 17,
            value: 3
        }, {
            source: 21,
            target: 18,
            value: 3
        }, {
            source: 21,
            target: 19,
            value: 3
        }, {
            source: 21,
            target: 20,
            value: 5
        }, {
            source: 22,
            target: 16,
            value: 3
        }, {
            source: 22,
            target: 17,
            value: 3
        }, {
            source: 22,
            target: 18,
            value: 3
        }, {
            source: 22,
            target: 19,
            value: 3
        }, {
            source: 22,
            target: 20,
            value: 4
        }, {
            source: 22,
            target: 21,
            value: 4
        }, {
            source: 23,
            target: 16,
            value: 3
        }, {
            source: 23,
            target: 17,
            value: 3
        }, {
            source: 23,
            target: 18,
            value: 3
        }, {
            source: 23,
            target: 19,
            value: 3
        }, {
            source: 23,
            target: 20,
            value: 4
        }, {
            source: 23,
            target: 21,
            value: 4
        }, {
            source: 23,
            target: 22,
            value: 4
        }, {
            source: 23,
            target: 12,
            value: 2
        }, {
            source: 23,
            target: 11,
            value: 9
        }, {
            source: 24,
            target: 23,
            value: 2
        }, {
            source: 24,
            target: 11,
            value: 7
        }, {
            source: 25,
            target: 24,
            value: 13
        }, {
            source: 25,
            target: 23,
            value: 1
        }, {
            source: 25,
            target: 11,
            value: 12
        }, {
            source: 26,
            target: 24,
            value: 4
        }, {
            source: 26,
            target: 11,
            value: 31
        }, {
            source: 26,
            target: 16,
            value: 1
        }, {
            source: 26,
            target: 25,
            value: 1
        }, {
            source: 27,
            target: 11,
            value: 17
        }, {
            source: 27,
            target: 23,
            value: 5
        }, {
            source: 27,
            target: 25,
            value: 5
        }, {
            source: 27,
            target: 24,
            value: 1
        }, {
            source: 27,
            target: 26,
            value: 1
        }, {
            source: 28,
            target: 11,
            value: 8
        }, {
            source: 28,
            target: 27,
            value: 1
        }, {
            source: 29,
            target: 23,
            value: 1
        }, {
            source: 29,
            target: 27,
            value: 1
        }, {
            source: 29,
            target: 11,
            value: 2
        }, {
            source: 30,
            target: 23,
            value: 1
        }, {
            source: 31,
            target: 30,
            value: 2
        }, {
            source: 31,
            target: 11,
            value: 3
        }, {
            source: 31,
            target: 23,
            value: 2
        }, {
            source: 31,
            target: 27,
            value: 1
        }, {
            source: 32,
            target: 11,
            value: 1
        }, {
            source: 33,
            target: 11,
            value: 2
        }, {
            source: 33,
            target: 27,
            value: 1
        }, {
            source: 34,
            target: 11,
            value: 3
        }, {
            source: 34,
            target: 29,
            value: 2
        }, {
            source: 35,
            target: 11,
            value: 3
        }, {
            source: 35,
            target: 34,
            value: 3
        }, {
            source: 35,
            target: 29,
            value: 2
        }, {
            source: 36,
            target: 34,
            value: 2
        }, {
            source: 36,
            target: 35,
            value: 2
        }, {
            source: 36,
            target: 11,
            value: 2
        }, {
            source: 36,
            target: 29,
            value: 1
        }, {
            source: 37,
            target: 34,
            value: 2
        }, {
            source: 37,
            target: 35,
            value: 2
        }, {
            source: 37,
            target: 36,
            value: 2
        }, {
            source: 37,
            target: 11,
            value: 2
        }, {
            source: 37,
            target: 29,
            value: 1
        }, {
            source: 38,
            target: 34,
            value: 2
        }, {
            source: 38,
            target: 35,
            value: 2
        }, {
            source: 38,
            target: 36,
            value: 2
        }, {
            source: 38,
            target: 37,
            value: 2
        }, {
            source: 38,
            target: 11,
            value: 2
        }, {
            source: 38,
            target: 29,
            value: 1
        }, {
            source: 39,
            target: 25,
            value: 1
        }, {
            source: 40,
            target: 25,
            value: 1
        }, {
            source: 41,
            target: 24,
            value: 2
        }, {
            source: 41,
            target: 25,
            value: 3
        }, {
            source: 42,
            target: 41,
            value: 2
        }, {
            source: 42,
            target: 25,
            value: 2
        }, {
            source: 42,
            target: 24,
            value: 1
        }, {
            source: 43,
            target: 11,
            value: 3
        }, {
            source: 43,
            target: 26,
            value: 1
        }, {
            source: 43,
            target: 27,
            value: 1
        }, {
            source: 44,
            target: 28,
            value: 3
        }, {
            source: 44,
            target: 11,
            value: 1
        }, {
            source: 45,
            target: 28,
            value: 2
        }, {
            source: 47,
            target: 46,
            value: 1
        }, {
            source: 48,
            target: 47,
            value: 2
        }, {
            source: 48,
            target: 25,
            value: 1
        }, {
            source: 48,
            target: 27,
            value: 1
        }, {
            source: 48,
            target: 11,
            value: 1
        }, {
            source: 49,
            target: 26,
            value: 3
        }, {
            source: 49,
            target: 11,
            value: 2
        }, {
            source: 50,
            target: 49,
            value: 1
        }, {
            source: 50,
            target: 24,
            value: 1
        }, {
            source: 51,
            target: 49,
            value: 9
        }, {
            source: 51,
            target: 26,
            value: 2
        }, {
            source: 51,
            target: 11,
            value: 2
        }, {
            source: 52,
            target: 51,
            value: 1
        }, {
            source: 52,
            target: 39,
            value: 1
        }, {
            source: 53,
            target: 51,
            value: 1
        }, {
            source: 54,
            target: 51,
            value: 2
        }, {
            source: 54,
            target: 49,
            value: 1
        }, {
            source: 54,
            target: 26,
            value: 1
        }, {
            source: 55,
            target: 51,
            value: 6
        }, {
            source: 55,
            target: 49,
            value: 12
        }, {
            source: 55,
            target: 39,
            value: 1
        }, {
            source: 55,
            target: 54,
            value: 1
        }, {
            source: 55,
            target: 26,
            value: 21
        }, {
            source: 55,
            target: 11,
            value: 19
        }, {
            source: 55,
            target: 16,
            value: 1
        }, {
            source: 55,
            target: 25,
            value: 2
        }, {
            source: 55,
            target: 41,
            value: 5
        }, {
            source: 55,
            target: 48,
            value: 4
        }, {
            source: 56,
            target: 49,
            value: 1
        }, {
            source: 56,
            target: 55,
            value: 1
        }, {
            source: 57,
            target: 55,
            value: 1
        }, {
            source: 57,
            target: 41,
            value: 1
        }, {
            source: 57,
            target: 48,
            value: 1
        }, {
            source: 58,
            target: 55,
            value: 7
        }, {
            source: 58,
            target: 48,
            value: 7
        }, {
            source: 58,
            target: 27,
            value: 6
        }, {
            source: 58,
            target: 57,
            value: 1
        }, {
            source: 58,
            target: 11,
            value: 4
        }, {
            source: 59,
            target: 58,
            value: 15
        }, {
            source: 59,
            target: 55,
            value: 5
        }, {
            source: 59,
            target: 48,
            value: 6
        }, {
            source: 59,
            target: 57,
            value: 2
        }, {
            source: 60,
            target: 48,
            value: 1
        }, {
            source: 60,
            target: 58,
            value: 4
        }, {
            source: 60,
            target: 59,
            value: 2
        }, {
            source: 61,
            target: 48,
            value: 2
        }, {
            source: 61,
            target: 58,
            value: 6
        }, {
            source: 61,
            target: 60,
            value: 2
        }, {
            source: 61,
            target: 59,
            value: 5
        }, {
            source: 61,
            target: 57,
            value: 1
        }, {
            source: 61,
            target: 55,
            value: 1
        }, {
            source: 62,
            target: 55,
            value: 9
        }, {
            source: 62,
            target: 58,
            value: 17
        }, {
            source: 62,
            target: 59,
            value: 13
        }, {
            source: 62,
            target: 48,
            value: 7
        }, {
            source: 62,
            target: 57,
            value: 2
        }, {
            source: 62,
            target: 41,
            value: 1
        }, {
            source: 62,
            target: 61,
            value: 6
        }, {
            source: 62,
            target: 60,
            value: 3
        }, {
            source: 63,
            target: 59,
            value: 5
        }, {
            source: 63,
            target: 48,
            value: 5
        }, {
            source: 63,
            target: 62,
            value: 6
        }, {
            source: 63,
            target: 57,
            value: 2
        }, {
            source: 63,
            target: 58,
            value: 4
        }, {
            source: 63,
            target: 61,
            value: 3
        }, {
            source: 63,
            target: 60,
            value: 2
        }, {
            source: 63,
            target: 55,
            value: 1
        }, {
            source: 64,
            target: 55,
            value: 5
        }, {
            source: 64,
            target: 62,
            value: 12
        }, {
            source: 64,
            target: 48,
            value: 5
        }, {
            source: 64,
            target: 63,
            value: 4
        }, {
            source: 64,
            target: 58,
            value: 10
        }, {
            source: 64,
            target: 61,
            value: 6
        }, {
            source: 64,
            target: 60,
            value: 2
        }, {
            source: 64,
            target: 59,
            value: 9
        }, {
            source: 64,
            target: 57,
            value: 1
        }, {
            source: 64,
            target: 11,
            value: 1
        }, {
            source: 65,
            target: 63,
            value: 5
        }, {
            source: 65,
            target: 64,
            value: 7
        }, {
            source: 65,
            target: 48,
            value: 3
        }, {
            source: 65,
            target: 62,
            value: 5
        }, {
            source: 65,
            target: 58,
            value: 5
        }, {
            source: 65,
            target: 61,
            value: 5
        }, {
            source: 65,
            target: 60,
            value: 2
        }, {
            source: 65,
            target: 59,
            value: 5
        }, {
            source: 65,
            target: 57,
            value: 1
        }, {
            source: 65,
            target: 55,
            value: 2
        }, {
            source: 66,
            target: 64,
            value: 3
        }, {
            source: 66,
            target: 58,
            value: 3
        }, {
            source: 66,
            target: 59,
            value: 1
        }, {
            source: 66,
            target: 62,
            value: 2
        }, {
            source: 66,
            target: 65,
            value: 2
        }, {
            source: 66,
            target: 48,
            value: 1
        }, {
            source: 66,
            target: 63,
            value: 1
        }, {
            source: 66,
            target: 61,
            value: 1
        }, {
            source: 66,
            target: 60,
            value: 1
        }, {
            source: 67,
            target: 57,
            value: 3
        }, {
            source: 68,
            target: 25,
            value: 5
        }, {
            source: 68,
            target: 11,
            value: 1
        }, {
            source: 68,
            target: 24,
            value: 1
        }, {
            source: 68,
            target: 27,
            value: 1
        }, {
            source: 68,
            target: 48,
            value: 1
        }, {
            source: 68,
            target: 41,
            value: 1
        }, {
            source: 69,
            target: 25,
            value: 6
        }, {
            source: 69,
            target: 68,
            value: 6
        }, {
            source: 69,
            target: 11,
            value: 1
        }, {
            source: 69,
            target: 24,
            value: 1
        }, {
            source: 69,
            target: 27,
            value: 2
        }, {
            source: 69,
            target: 48,
            value: 1
        }, {
            source: 69,
            target: 41,
            value: 1
        }, {
            source: 70,
            target: 25,
            value: 4
        }, {
            source: 70,
            target: 69,
            value: 4
        }, {
            source: 70,
            target: 68,
            value: 4
        }, {
            source: 70,
            target: 11,
            value: 1
        }, {
            source: 70,
            target: 24,
            value: 1
        }, {
            source: 70,
            target: 27,
            value: 1
        }, {
            source: 70,
            target: 41,
            value: 1
        }, {
            source: 70,
            target: 58,
            value: 1
        }, {
            source: 71,
            target: 27,
            value: 1
        }, {
            source: 71,
            target: 69,
            value: 2
        }, {
            source: 71,
            target: 68,
            value: 2
        }, {
            source: 71,
            target: 70,
            value: 2
        }, {
            source: 71,
            target: 11,
            value: 1
        }, {
            source: 71,
            target: 48,
            value: 1
        }, {
            source: 71,
            target: 41,
            value: 1
        }, {
            source: 71,
            target: 25,
            value: 1
        }, {
            source: 72,
            target: 26,
            value: 2
        }, {
            source: 72,
            target: 27,
            value: 1
        }, {
            source: 72,
            target: 11,
            value: 1
        }, {
            source: 73,
            target: 48,
            value: 2
        }, {
            source: 74,
            target: 48,
            value: 2
        }, {
            source: 74,
            target: 73,
            value: 3
        }, {
            source: 75,
            target: 69,
            value: 3
        }, {
            source: 75,
            target: 68,
            value: 3
        }, {
            source: 75,
            target: 25,
            value: 3
        }, {
            source: 75,
            target: 48,
            value: 1
        }, {
            source: 75,
            target: 41,
            value: 1
        }, {
            source: 75,
            target: 70,
            value: 1
        }, {
            source: 75,
            target: 71,
            value: 1
        }, {
            source: 76,
            target: 64,
            value: 1
        }, {
            source: 76,
            target: 65,
            value: 1
        }, {
            source: 76,
            target: 66,
            value: 1
        }, {
            source: 76,
            target: 63,
            value: 1
        }, {
            source: 76,
            target: 62,
            value: 1
        }, {
            source: 76,
            target: 48,
            value: 1
        }, {
            source: 76,
            target: 58,
            value: 1
        }];

        for (var e in edges){
            nodeMap[edges[e].target].additional.received = nodeMap[edges[e].target].additional.received || {};
            nodeMap[edges[e].target].additional.sent = nodeMap[edges[e].target].additional.sent || {};

            nodeMap[edges[e].source].additional.received = nodeMap[edges[e].source].additional.received || {};
            nodeMap[edges[e].source].additional.sent = nodeMap[edges[e].source].additional.sent || {};

            var sourceToTarget = Math.round(Math.random() * 10);
            var targetToSource = Math.round(Math.random() * 10);

            nodeMap[edges[e].target].additional.received[edges[e].source] = sourceToTarget;
            nodeMap[edges[e].target].additional.sent[edges[e].source]  = targetToSource;

            nodeMap[edges[e].source].additional.received[edges[e].target] = targetToSource;
            nodeMap[edges[e].source].additional.sent[edges[e].target]  = sourceToTarget;
        }

        var newNodes = [];

        for (var n in Object.keys(nodeMap)){
            var sentTotal = 0;
            var receivedTotal = 0;
            for (var s in nodeMap[n].additional.sent){
                sentTotal += nodeMap[n].additional.sent[s];
            }
            for (var r in nodeMap[n].additional.received){
                receivedTotal += nodeMap[n].additional.received[r];
            }
            nodeMap[n].additional.volume = receivedTotal + sentTotal;
            newNodes.push(nodeMap[n]);
        }

       vm.data = {
       	'nodes':nodes,
       	'edges':edges
       };

    }
})();
