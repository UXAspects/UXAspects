describe("facet container directive", function () {
  var $compile, $rootScope, $controller, $scope, controller, provider;
  var clearAll = "Clear All";
  var selectTitle = "You have selected:";
  var noItemsText = "None selected";
  var clearAllFn = function() {};
  var element;
  beforeEach(module("ux-aspects.facets", "ux-aspects.previewPanes","ux-aspects.safeTimeout"));
  beforeEach(inject(function (_$controller_, _$compile_, _$rootScope_, _previewPaneProvider_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $controller = _$controller_;
    $scope = $rootScope.$new();
    $scope.clearAllFn = clearAllFn;
    $scope.isClearAllFn = angular.isUndefined(clearAllFn)===false;
    $scope.clearText = clearAll;
    $scope.selectTitle = selectTitle;
    provider = _previewPaneProvider_;
  }));
  describe("controller", function () {
    beforeEach(function () {
      controller = $controller("FacetContainerCtrl as fc", {
        $scope: $scope,
        provider: provider
      });
    });
    it("should set clear text", function () {
      expect(controller.clearText).toBe(clearAll);
    });
    it("should set select text", function () {
      expect(controller.selectTitle).toBe(selectTitle);
    });
    it("should add items to the selected list", function () {
      var obj = {};
      controller.addSelected(obj);
      expect(controller.selected.length).toBe(1);
      expect(controller.selected[0]).toBe(obj);
    });
    it("should remove items to the selected list", function () {
      var obj = {};
      var obj2 = {};
      controller.addSelected(obj);
      controller.addSelected(obj2);
      expect(controller.selected.length).toBe(2);
      controller.removeSelected(obj);
      expect(controller.selected.length).toBe(1);
      expect(controller.selected[0]).toBe(obj2);
    });
    it("should remove items to the selected list", function () {
      var spy = jasmine.createSpy('deselect');
      var obj = {
        deselect: spy
      };
      var obj2 = {
        deselect: spy
      };
      controller.addSelected(obj);
      controller.addSelected(obj2);
      expect(controller.selected.length).toBe(2);
      controller.clearAll();
      expect(controller.selected.length).toBe(2);
      expect(spy.calls.count()).toBe(2);
    });
    it("should set isclearAllFn value and execute user method", function() {
      expect(controller.scope.isClearAllFn).toBe(true);
      controller.clearAll();
      expect(controller.isClearAllFn).toBe(false);
      controller.clearAllFn = null;
      expect(angular.isUndefined(controller.clearAllFn === false)).toBe(false);
    });
  });
  describe("element", function () {
    beforeEach(function () {
      element = $compile('<facet-container select-title="' + selectTitle + '" clear-text="' + clearAll + '"></facet-container>')($scope);
      $scope.$digest();
    });

    it("should no items when nothing is selected", function () {
      expect(element.find(".facets-selected-container").length).toBe(0);
    });
    describe("items added", function () {
      var spy, options;
      beforeEach(function () {
        spy = jasmine.createSpy('deselect');
        options = [{
            deselect: spy,
            option: {
              'name': 'Test'
            }
        },
          {
            deselect: spy,
            option: {
              'name': 'Test2'

            }
        }];
        options.forEach($scope.$$childHead.fc.addSelected, $scope.$$childHead.fc);
        $scope.$digest();
      });
      it("should show items when something is selected", function () {

        expect(element.find(".facets-selected-container").length).toBe(1);
        expect(element.find(".facets-selected-container li").length).toBe(options.length);
      });
      it("should show selected title", function () {

        expect(element.find(".facets-selected-title").length).toBe(1);
        expect(element.find(".facets-selected-title").text()).toContain(selectTitle);
      });
      it("should show clear all", function () {
        expect(element.find(".facets-selected-clear").length).toBe(1);
      });
      it("should be able to remove a single item", function () {
        element.find(".facets-selected-container li a").eq(0).click();
        expect(spy).toHaveBeenCalled();
      });
      it("should be able to remove all items via clear all", function () {
        element.find(".facets-selected-clear").eq(0).click();
        expect(spy.calls.count()).toBe(2);
      });
    });

  });
  describe("element with no-items-text attribute", function(){
      beforeEach(function () {
      element = $compile('<facet-container select-title="' + selectTitle + '" clear-text="' + clearAll + '" no-items-text ="' + noItemsText + '"></facet-container>')($scope);
      $scope.$digest();
    });
    it("should show no items selected text when nothing is selected", function () {
      expect(element.find(".facets-none-selected").length).toBe(1);
      expect(element.find(".facets-none-selected").text()).toContain(noItemsText);

    });
    it("should not show the Clear All button when nothing is selected", function () {
      expect(element.find(".facets-selected-clear").length).toBe(0);
    });
        describe("items added", function () {
      var spy, options;
      beforeEach(function () {
        spy = jasmine.createSpy('deselect');
        options = [{
            deselect: spy,
            option: {
              'name': 'Test'
            }
        },
          {
            deselect: spy,
            option: {
              'name': 'Test2'

            }
        }];
        options.forEach($scope.$$childHead.fc.addSelected, $scope.$$childHead.fc);
        $scope.$digest();
      });
      it("should show the Clear All button when something is selected", function () {
           expect(element.find(".facets-selected-clear").length).toBe(1);
      });
      it("should not show no items selected text when something is selected", function () {
           expect(element.find(".facets-none-selected").length).toBe(0);
      });
    });

  });

  describe("programmatic selection", function(){
    beforeEach(function () {
      var template = '<facet-container select-title="' + selectTitle + '" clear-text="' + clearAll + '" no-items-text ="' + noItemsText + '" api="api">';

      template +='<facet-custom name=" \'DATE MODIFIED\' " select="dateFacetSelect" deselect="dateFacetDeselect" model="date" display="dateFacetDisplayFn"></facet-custom>';
      template +='<facet ng-repeat=" facet in facets" name="facet.title">';
      template +='<facet-option ng-repeat="option in facet.options" name="option.name" selected-aria-label="Selected" select="option.select()" count="option.count" deselect="option.deselect()"></facet-option>';
      template +='</facet>';
      template +='<facet-dynamic name="dfacets.title" facet-options="dfacets" placeholder=" \'Find Author\' " display-configuration="facetLongListConfig"></facet-dynamic>';

      template += '</facet-container>';
      $scope.api = {};
      $scope.facetLongListConfig = {
      };
      $scope.dateFacetSelect = angular.noop;
      $scope.dateFacetDedelect = angular.noop;
      $scope.dateFacetDisplayFn = angular.noop;
      $scope.facets = [
        {
          title:"test",
          options: [
            {
              name:"",
              select:angular.noop,
              deselect:angular.noop,
              count: 0
            }
          ]
        }
      ];
      $scope.dfacets = {
          title:"dtest",
          options: [
            {
              name:"",
              select:angular.noop,
              deselect:angular.noop,
              count: 0
            }
          ]
        };
      $scope.date = {};

      element = $compile(template)($scope);
      $scope.$digest();
    });
    it("should populate the api object", function(){
      expect(element.scope().api).toBeDefined();
    });
    it("should select Facet items", function(){
      expect(element.children().eq(1).scope().selected.length).toBe(0);
      var facets = element.scope().api.getFacets()[1];
      facets.options[0].select();
      expect(element.children().eq(1).scope().selected.length).toBe(1);

    });
    it("should select Custom Facet items", function(){
      expect(element.children().eq(1).scope().selected.length).toBe(0);
      var facets = element.scope().api.getFacets()[0];
      facets.options[0].select();
      expect(element.children().eq(1).scope().selected.length).toBe(1);

    });
    it("should select Dynamic Facet items", function(){
      expect(element.children().eq(1).scope().selected.length).toBe(0);
      var facets = element.scope().api.getFacets()[1];
      facets.options[0].select();
      expect(element.children().eq(1).scope().selected.length).toBe(1);
    });
  });


});
