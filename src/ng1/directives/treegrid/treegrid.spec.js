describe('treegrid', function () {
  var $rootScope, $scope, $controller, $q, $timeout;

  beforeEach(module("ux-aspects.treegrid"));

  beforeEach(inject(function (_$rootScope_, _$controller_, _$q_, _$timeout_) {
    $rootScope = _$rootScope_;
    $controller = _$controller_;
    $q = _$q_;
    $timeout = _$timeout_;
    $scope = $rootScope.$new();
  }));

  describe("treegrid directive", function () {

    var DummyEvent = {
      stopPropagation: function() {},
      preventDefault: function() {}
    };

    it("should initialise with empty data", function() {
      var ctrl = instantiateController({
        data: [],
        columns: [{ name: "test", value: "test" }]
      });
      var rows = ctrl.getGridRows();
      expect(rows).toEqual([]);
    });

    it("should show top level items to start with", function() {
      var ctrl = instantiateController({
        data: [{
          test: "Row 1",
          nodes: [{
            test: "Row 1.1"
          }]
        }, {
          test: "Row 2",
          nodes: []
        }],
        columns: [{ name: "test", value: "test" }]
      });
      var rows = ctrl.getGridRows();
      expect(rows.length).toBe(2);
      expect(rows[0].level).toBe(0);
      expect(rows[0].canExpand).toBe(true);
      expect(rows[0].expanded).toBe(false);
      expect(rows[0].api.getValueForColumn(0)).toBe("Row 1");
    });

    it("should include child rows when expanded", function(done) {
      var ctrl = instantiateController({
        data: [{
          test: "Row 1",
          nodes: [{
            test: "Row 1.1"
          }]
        }, {
          test: "Row 2",
          nodes: []
        }],
        columns: [{ name: "test", value: "test" }]
      });
      var rows = ctrl.getGridRows();
      expect(rows.length).toBe(2);
      // Expand "Row 1"
      ctrl.expanderClick(rows[0], DummyEvent)
        .then(function () {
          rows = ctrl.getGridRows();
          expect(rows.length).toBe(3);
          expect(rows[0].expanded).toBe(true);
          expect(rows[1].level).toBe(1);
          expect(rows[1].canExpand).toBe(false);
          expect(rows[1].expanded).toBe(false);
          expect(rows[1].api.getValueForColumn(0)).toBe("Row 1.1");
        })
        .catch(failTest)
        .finally(done);
      $rootScope.$apply();
    });

    it("should exclude child rows when contracted", function(done) {
      var ctrl = instantiateController({
        data: [{
          test: "Row 1",
          nodes: [{
            test: "Row 1.1"
          }]
        }, {
          test: "Row 2",
          nodes: []
        }],
        columns: [{ name: "test", value: "test" }]
      });
      var rows = ctrl.getGridRows();
      expect(rows.length).toBe(2);
      // Expand "Row 1"
      ctrl.expanderClick(rows[0], DummyEvent)
        .then(function () {
          rows = ctrl.getGridRows();
          expect(rows.length).toBe(3);
          expect(rows[0].expanded).toBe(true);
          expect(rows[1].api.getValueForColumn(0)).toBe("Row 1.1");
        })
        // Contract "Row 1"
        .then(function() { return ctrl.expanderClick(rows[0], DummyEvent); })
        .then(function () {
          rows = ctrl.getGridRows();
          expect(rows.length).toBe(2);
          expect(rows[0].expanded).toBe(false);
          expect(rows[1].api.getValueForColumn(0)).toBe("Row 2");
        })
        .catch(failTest)
        .finally(done);
      $rootScope.$apply();
    });

    it("should use the configured property to identify child nodes", function(done) {
      var ctrl = instantiateController({
        data: [{
          test: "Row 1",
          nodes: [],
          children: [{
            test: "Row 1.1"
          }]
        }, {
          test: "Row 2",
          nodes: [{
            test: "Row 2.1"
          }]
        }],
        columns: [{ name: "test", value: "test" }],
        options: { childrenProperty: "children" }
      });
      var rows = ctrl.getGridRows();
      expect(rows.length).toBe(2);
      expect(rows[0].canExpand).toBe(true);
      expect(rows[1].canExpand).toBe(false);
      // Expand "Row 1"
      ctrl.expanderClick(rows[0], DummyEvent)
        .then(function () {
          rows = ctrl.getGridRows();
          expect(rows.length).toBe(3);
          expect(rows[0].expanded).toBe(true);
          expect(rows[1].level).toBe(1);
          expect(rows[1].canExpand).toBe(false);
          expect(rows[1].expanded).toBe(false);
          expect(rows[1].api.getValueForColumn(0)).toBe("Row 1.1");
        })
        // Expand "Row 2" (should do nothing)
        .then(function() { return ctrl.expanderClick(rows[2], DummyEvent); })
        .then(function () {
          rows = ctrl.getGridRows();
          expect(rows.length).toBe(3);
        })
        .catch(failTest)
        .finally(done);
      $rootScope.$apply();
    });

    it("should format values with provided function", function() {
      var ctrl = instantiateController({
        data: [{
          test: "Row 1",
          nodes: []
        }, {
          test: "Row 2",
          nodes: []
        }],
        columns: [{
          name: "format test",
          value: function(item) {
            return item.test.replace("Row", "Formatted");
          }
        }]
      });
      var rows = ctrl.getGridRows();
      expect(rows.length).toBe(2);
      expect(rows[0].api.getValueForColumn(0)).toBe("Formatted 1");
      expect(rows[1].api.getValueForColumn(0)).toBe("Formatted 2");
    });

    it("should show nothing if property is missing", function() {
      var ctrl = instantiateController({
        data: [{
          nodes: []
        }],
        columns: [{ name: "test", value: "test" }]
      });
      var rows = ctrl.getGridRows();
      expect(rows.length).toBe(1);
      expect(rows[0].api.getValueForColumn(0)).toBe("");
    });

    it("should limit expansion depth to the configured maxDepth", function(done) {
      var ctrl = instantiateController({
        data: [{
          test: "Row 1",
          nodes: [{
            test: "Row 1.1",
            nodes: [{
              test: "Row 1.1.1",
              nodes: [{
                test: "Row 1.1.1.1",
                nodes: []
              }]
            }]
          }]
        }],
        columns: [{ name: "test", value: "test" }],
        options: { maxDepth: 2 }
      });
      var rows = ctrl.getGridRows();
      expect(rows.length).toBe(1);
      expect(rows[0].level).toBe(0);
      expect(rows[0].canExpand).toBe(true);
      // Expand "Row 1"
      ctrl.expanderClick(rows[0], DummyEvent)
        .then(function () {
          rows = ctrl.getGridRows();
          expect(rows.length).toBe(2);
          expect(rows[1].level).toBe(1);
          expect(rows[1].canExpand).toBe(true);
        })
        // Expand "Row 1.1"
        .then(function() { return ctrl.expanderClick(rows[1], DummyEvent); })
        .then(function () {
          rows = ctrl.getGridRows();
          expect(rows.length).toBe(3);
          expect(rows[2].level).toBe(2);
          expect(rows[2].canExpand).toBe(false);
        })
        // Expand "Row 1.1.1" (should do nothing)
        .then(function() { return ctrl.expanderClick(rows[2], DummyEvent); })
        .then(function () {
          rows = ctrl.getGridRows();
          expect(rows.length).toBe(3);
        })
        .catch(failTest)
        .finally(done);
      $rootScope.$apply();
    });

    it("should should sort by the first column ascending by default", function() {
      var ctrl = instantiateController({
        data: [{
          test: "Row 2",
          num: 1,
          nodes: []
        }, {
          test: "Row 1",
          num: 2,
          nodes: []
        }, {
          test: "A",
          num: 3,
          nodes: []
        }, {
          test: "AA",
          num: 4,
          nodes: []
        }, {
          num: 5,
          nodes: []
        }],
        columns: [{
          name: "test",
          value: "test"
        }, {
          name: "num",
          value: "num"
        }]
      });
      var rows = ctrl.getGridRows();
      expect(rows.length).toBe(5);
      expect(rows[0].api.getValueForColumn(0)).toBe("");
      expect(rows[0].api.getValueForColumn(1)).toBe(5);
      expect(rows[1].api.getValueForColumn(0)).toBe("A");
      expect(rows[1].api.getValueForColumn(1)).toBe(3);
      expect(rows[2].api.getValueForColumn(0)).toBe("AA");
      expect(rows[2].api.getValueForColumn(1)).toBe(4);
      expect(rows[3].api.getValueForColumn(0)).toBe("Row 1");
      expect(rows[3].api.getValueForColumn(1)).toBe(2);
      expect(rows[4].api.getValueForColumn(0)).toBe("Row 2");
      expect(rows[4].api.getValueForColumn(1)).toBe(1);
    });

    it("should should sort dates correctly", function() {
      var ctrl = instantiateController({
        data: [{
          test: new Date('2015-08-03'),
          nodes: []
        }, {
          test: new Date('2015-03-08'),
          nodes: []
        }, {
          test: new Date('2014-08-03'),
          nodes: []
        }, {
          test: new Date('2015-01-01'),
          nodes: []
        }],
        columns: [{ name: "test", value: "test" }]
      });
      var rows = ctrl.getGridRows();
      expect(rows.length).toBe(4);
      expect(rows[0].api.getValueForColumn(0)).toEqual(new Date('2014-08-03'));
      expect(rows[1].api.getValueForColumn(0)).toEqual(new Date('2015-01-01'));
      expect(rows[2].api.getValueForColumn(0)).toEqual(new Date('2015-03-08'));
      expect(rows[3].api.getValueForColumn(0)).toEqual(new Date('2015-08-03'));
    });

    it("should should sort child rows independently", function(done) {
      var ctrl = instantiateController({
        data: [{
          test: "D",
          nodes: []
        }, {
          test: "C",
          nodes: [{
            test: "B",
            nodes: []
          }, {
            test: "A",
            nodes: []
          }]
        }],
        columns: [{ name: "test", value: "test" }]
      });
      var rows = ctrl.getGridRows();
      expect(rows.length).toBe(2);
      expect(rows[0].api.getValueForColumn(0)).toBe("C");
      // Expand "C"
      ctrl.expanderClick(rows[0], DummyEvent)
        .then(function () {
          rows = ctrl.getGridRows();
          expect(rows.length).toBe(4);
          expect(rows[0].api.getValueForColumn(0)).toBe("C");
          expect(rows[1].api.getValueForColumn(0)).toBe("A");
          expect(rows[2].api.getValueForColumn(0)).toBe("B");
          expect(rows[3].api.getValueForColumn(0)).toBe("D");
        })
        .catch(failTest)
        .finally(done);
      $rootScope.$apply();
    });

  });

  describe("api", function() {

    it("should expand child rows on expand() call", function(done) {
      var ctrl = instantiateController({
        data: [{
          test: "Row 1",
          nodes: [{
            test: "Row 1.1"
          }]
        }, {
          test: "Row 2",
          nodes: []
        }],
        columns: [{ name: "test", value: "test" }]
      });
      var rows = ctrl.getGridRows();
      expect(rows.length).toBe(2);
      // Expand "Row 1"
      rows[0].api.expand()
        .then(function () {
          rows = ctrl.getGridRows();
          expect(rows.length).toBe(3);
          expect(rows[0].expanded).toBe(true);
          expect(rows[1].level).toBe(1);
          expect(rows[1].canExpand).toBe(false);
          expect(rows[1].expanded).toBe(false);
          expect(rows[1].api.getValueForColumn(0)).toBe("Row 1.1");
        })
        .catch(failTest)
        .finally(done);
      $rootScope.$apply();
    });

    it("should contract child rows on contract() call", function(done) {
      var ctrl = instantiateController({
        data: [{
          test: "Row 1",
          nodes: [{
            test: "Row 1.1"
          }]
        }, {
          test: "Row 2",
          nodes: []
        }],
        columns: [{ name: "test", value: "test" }]
      });
      var rows = ctrl.getGridRows();
      expect(rows.length).toBe(2);
      // Expand "Row 1"
      rows[0].api.expand()
        .then(function () {
          rows = ctrl.getGridRows();
          expect(rows.length).toBe(3);
          expect(rows[0].expanded).toBe(true);
          expect(rows[1].api.getValueForColumn(0)).toBe("Row 1.1");
        })
        // Contract "Row 1"
        .then(function () {
          rows[0].api.contract();
          rows = ctrl.getGridRows();
          expect(rows.length).toBe(2);
          expect(rows[0].expanded).toBe(false);
          expect(rows[1].api.getValueForColumn(0)).toBe("Row 2");
        })
        .catch(failTest)
        .finally(done);
      $rootScope.$apply();
    });

  });

  function instantiateController(props) {

    // create a new scope
    $scope = $rootScope.$new();

    $scope.vm = {};

    // iterate each prop and add to scope
    for (var prop in props) {
      $scope.vm[prop] = props[prop];
    }

    var ctrl = $controller('TreegridCtrl', {
      $scope: $scope
    }, props);

    // perform initial digest
    $scope.$digest();

    return ctrl;
  }

  function failTest(error) {
    expect(error).toBeUndefined();
  }

});