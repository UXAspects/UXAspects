describe('social chart', function () {
  var $compile, $rootScope, $scope, $timeout, $interval;
  var vm = {};
  var suite = {};

  beforeEach(module("ux-aspects.socialChart"));
  beforeEach(module('ux-aspects.d3'));
  beforeEach(module('ux-aspects.sigma'));
  beforeEach(module("ux-aspects.safeTimeout"));

  beforeEach(inject(function (_$compile_, _$rootScope_, _$timeout_, _$interval_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $timeout = _$timeout_;
    $interval = _$interval_;
    $scope = $rootScope.$new();
  }));

  describe("social chart directive", function () {
    beforeEach(function () {
      vm = {};

      vm.data = { 
        'nodes': [{
          id: 0,
          label: "Scarlett O'Hara",
          additional: {
            volume: '999',
            fullName: "scarlett@tara.com"
          }
        }, {
          id: 1,
          label: "Rhett Butler",
          additional: {
            volume: '999',
            fullName: "rhett@charleston.com"
          }
        }, {
          id: 2,
          label: "Ashley Wilkes",
          additional: {
            volume: '999',
            fullName: "ashley@twelveoaks.com"
          }
        }, {
          id: 3,
          label: "Melanie Wilkes",
          additional: {
            volume: '900',
            fullName: "melanie@atlanta.com"
          }
        }, {
          id: 4,
          label: "Gerald O'Hara",
          additional: {
            volume: '900',
            fullName: "gerald@tara.com"
          }
        }, {
          id: 5,
          label: "Charles Hamilton",
          additional: {
            volume: '400',
            fullName: "charles@atlanta.com"
          }
        }, {
          id: 6,
          label: "Brett Tarleton",
          additional: {
            volume: '500',
            fullName: "brett@twelveoaks.com"
          }
        }, {
          id: 7,
          label: "Sue Ellen O'Hara",
          additional: {
            volume: '100',
            fullName: "sueellen@tara.com"
          }
        }, {
          id: 8,
          label: "Mammy",
          additional: {
            volume: '900',
            fullName: "mammy@tara.com"
          }
        }, {
          id: 9,
          label: "Mrs. O'Hara",
          additional: {
            volume: '900',
            fullName: "mrsohara@tara.com"
          }
        }, {
          id: 10,
          label: "Dr. Meade",
          additional: {
            volume: '50',
            fullName: "Margaret Mitchell"
          }
        }, {
          id: 11,
          label: "XYZ",
          additional: {
            volume: '50',
            fullName: "Margaret Mitchell"
          }
        }],
        'edges': [{
          source: 1,
          target: 0,
          value: 100
        }, {
          source: 0,
          target: 1,
          value: 50
        }, {
          source: 0,
          target: 2,
          value: 100
        }, {
          source: 1,
          target: 2,
          value: 5
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
          target: 5,
          value: 50
        }, {
          source: 5,
          target: 3,
          value: 100
        }, {
          source: 3,
          target: 2,
          value: 1000
        }, {
          source: 2,
          target: 3,
          value: 500
        }, {
          source: 4,
          target: 0,
          value: 1
        }, {
          source: 4,
          target: 9,
          value: 1
        }, {
          source: 9,
          target: 4,
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
          source: 8,
          target: 9,
          value: 2
        }, {
          source: 9,
          target: 8,
          value: 2
        }, {
          source: 9,
          target: 0,
          value: 1
        }, {
          source: 10,
          target: 0,
          value: 1
        }, {
          source: 11,
          target: 1,
          value: 1
        }]
      };

      suite.spies = {
        'onNodeClick': jasmine.createSpy("onNodeClick"),
        'onEdgeClick': jasmine.createSpy("onEdgeClick"),
        'onStageClick': jasmine.createSpy("onStageClick"),
        'onLoadComplete': jasmine.createSpy("onLoadComplete")
      };



      suite.testFunctions = {
        testOnNodeClick: function () {
          suite.spies.onNodeClick();
        },
        testOnEdgeClick: function () {
          suite.spies.onEdgeClick();
        },
        testOnStageClick: function () {
          suite.spies.onStageClick();
        },
        testOnLoadComplete: function () {
          suite.spies.onLoadComplete();
        }
      };

      spyOn(suite.testFunctions, "testOnNodeClick").and.callThrough();
      spyOn(suite.testFunctions, "testOnEdgeClick").and.callThrough();
      spyOn(suite.testFunctions, "testOnStageClick").and.callThrough();
      spyOn(suite.testFunctions, "testOnLoadComplete").and.callThrough();

      vm.api = {
        onNodeClick: suite.testFunctions.testOnNodeClick,
        onEdgeClick: suite.testFunctions.testOnEdgeClick,
        onStageClick: suite.testFunctions.testOnStageClick,
        onLoadComplete: suite.testFunctions.testOnLoadComplete
      };

      vm.chartTitle = {
        title: "Entire network",
        nodeSelectedTitle: "Social interactions with {{node}}",
        edgeSelectedTitle: "Social interactions between {{source}} and {{target}}",
        stageSelectedTitle: "Entire network"
      };

      vm.minLabels = 5;

      vm.communities = {};
      vm.detailStyle = {};
      vm.forceAtlasDuration = 0;
      vm.options = {};

      $scope.vm = vm;

      var html = '<social-chart data="vm.data"';
      html += 'width="100%" ';
      html += 'height="800px" ';
      html += 'api="vm.api" ';
      html += 'communities="vm.communities"';
      html += 'detail-style="vm.detailStyle"';
      html += 'force-atlas-duration="vm.forceAtlasDuration"';
      html += 'node-size-attribute=" \'volume\' "';
      html += 'start-maximized="true"';
      html += 'social-chart-container="jasmine_html-reporter"';
      html += 'show-maximize-control="true"';
      html += 'options="vm.options"';
      html += 'chart-title="vm.chartTitle"';
      html += 'min-labels="vm.minLabels">';
      html += '</social-chart>';

      if (!suite.element) {
        suite.element = $compile(html)($scope);
        $timeout.flush();
        $scope.$digest();
      }

    });

    afterAll(function () {
      $scope.$destroy();
      suite.element.remove();
      suite = null;
    });

    it('should initiate a sigma instance', function () {
      var scope = suite.element.find(".sigma-wrapper").scope();
      var sc = scope.sc;
      expect(sc.sigmaInstance).toBeDefined();
      $scope.$digest();
      expect(suite.spies.onLoadComplete).toHaveBeenCalled();
    });

    it('should display at least the minimum number of labels', function () {
      var scope = suite.element.find(".sigma-wrapper").scope();
      var sc = scope.sc;
      var nodes = sc.sigmaInstance.graph.nodes();

      var labelled = nodes.filter(function (node) {
        return node.showLabel === true;
      });

      expect(labelled.length).toBe(5);
    });

    it('should call the supplied onNodeClick function when a node is clicked', function () {
      var scope = suite.element.find(".sigma-wrapper").scope();
      scope.api.setSelectedNodeById(1);
      $scope.$digest();
      expect(suite.spies.onNodeClick).toHaveBeenCalled();
    });

    it('should call the supplied onEdgeClick function when an edge is clicked', function () {
      var scope = suite.element.find(".sigma-wrapper").scope();
      scope.api.setSelectedEdgeById('e1');
      $scope.$digest();
      expect(suite.spies.onEdgeClick).toHaveBeenCalled();
    });

    it('should call the supplied onStageClick function when the stage is clicked', function () {
      reset();

      expect(suite.spies.onStageClick).toHaveBeenCalled();
    });

    it('should render highlighted nodes in the foregound', function () {
      var scope = suite.element.find(".sigma-wrapper").scope();
      var sc = scope.sc;
      var nodes = sc.sigmaInstance.graph.nodes();
      for (var i in nodes) {
        expect(nodes[i].bringToFront).not.toBe(true);
      }
      scope.api.setSelectedNodeById(0);
      $scope.$digest();
      nodes = sc.sigmaInstance.graph.nodes();

      expect(nodes[0].bringToFront).toBe(true);
      expect(nodes[11].bringToFront).toBe(false);


    });

    it('should clear the bringToFront property of nodes when an edge is selected', function () {
      var scope = reset();
      var sc = scope.sc;

      var nodes = sc.sigmaInstance.graph.nodes();

      for (var i in nodes) {
        expect(nodes[i].bringToFront).not.toBe(true);
      }

      scope.api.setSelectedNodeById(0);
      $scope.$digest();
      nodes = sc.sigmaInstance.graph.nodes();

      expect(nodes[0].bringToFront).toBe(true);
      expect(nodes[11].bringToFront).toBe(false);

      scope.api.setSelectedEdgeById('e0');
      $scope.$digest();
      nodes = sc.sigmaInstance.graph.nodes();

      for (var j in nodes) {
        if (nodes[j].id !== sc.selectedEdge.source && nodes[j].id !== sc.selectedEdge.target) {
          expect(nodes[j].bringToFront).not.toBe(true);
        }
      }
    });

    it('should clear the bringToFront property of nodes when the stage is clicked', function () {
      var scope = reset();
      var sc = scope.sc;

      var nodes = sc.sigmaInstance.graph.nodes();
      for (var i in nodes) {
        expect(nodes[i].bringToFront).not.toBe(true);
      }
      scope.api.setSelectedNodeById(0);
      $scope.$digest();
      nodes = sc.sigmaInstance.graph.nodes();

      expect(nodes[0].bringToFront).toBe(true);
      expect(nodes[11].bringToFront).toBe(false);

      scope.sc.clickStage();
      $scope.$digest();
      nodes = sc.sigmaInstance.graph.nodes();

      for (var j in nodes) {
        expect(nodes[j].bringToFront).not.toBe(true);
      }
    });

    it("should bring to front the nodes which are highlighted when an edge is selected", function () {
      var scope = reset();
      var sc = scope.sc;

      var nodes = sc.sigmaInstance.graph.nodes();
      for (var i in nodes) {
        expect(nodes[i].bringToFront).not.toBe(true);
      }

      scope.api.setSelectedEdgeById('e0');
      $scope.$digest();
      nodes = sc.sigmaInstance.graph.nodes();

      expect(nodes[0].bringToFront).toBe(true);
      expect(nodes[1].bringToFront).toBe(true);

      for (var j = 2; j < nodes.length; j++) {
        expect(nodes[j].bringToFront).not.toBe(true);
      }
    });

    it("should bring to front the selected edge when an edge is selected", function () {
      var scope = reset();
      var sc = scope.sc;

      scope.api.setSelectedEdgeById('e0');
      $scope.$digest();

      var edges = sc.sigmaInstance.graph.edges();
      expect(sc.selectedEdge.bringToFront).toBe(true);
      for (var i in edges) {
        if (edges[i].id !== sc.selectedEdge.id) {
          expect(edges[i].bringToFront).not.toBe(true);
        }
      }

    });

    it('should display the correct title when a node is clicked', function () {
      var scope = reset();
      var sc = scope.sc;
      scope.api.setSelectedNodeById(1);
      $scope.$digest();
      expect(sc.socialChartTitle).toBe("Social interactions with Rhett Butler");
    });

    it('should display the correct title when an edge is clicked', function () {
      var scope = reset();
      var sc = scope.sc;
      scope.api.setSelectedEdgeById('e1');
      $scope.$digest();
      expect(sc.socialChartTitle).toBe("Social interactions between Scarlett O'Hara and Rhett Butler");
    });

    it('should display the correct title when a stage is clicked', function () {
      var scope = reset();
      var sc = scope.sc;
      scope.sc.clickStage();
      $scope.$digest();
      expect(sc.socialChartTitle).toBe("Entire network");
    });

    function reset() {
      var scope = suite.element.find(".sigma-wrapper").scope();
      scope.sc.clickStage();
      $scope.$digest();

      return scope;
    }

  });

});