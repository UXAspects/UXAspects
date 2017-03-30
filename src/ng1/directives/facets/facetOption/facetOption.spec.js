describe("facet option directive", function () {
  var $compile, $rootScope, $controller, $scope, select, deselect, provider;

  beforeEach(module("ux-aspects.facets", "ux-aspects.previewPanes", "ux-aspects.checkbox"));
  beforeEach(inject(function (_$controller_, _$compile_, _$rootScope_, _previewPaneProvider_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $controller = _$controller_;
    $scope = $rootScope.$new();
    provider = _previewPaneProvider_;
    deselect = jasmine.createSpy('deselect');
    select = jasmine.createSpy('select');
  }));

  describe("controller", function () {
    var controller;
    beforeEach(function () {
      $scope.select = select;
      $scope.deselect = deselect;
      $scope.checked = false;
      $scope.previewProvider = provider;
      controller = $controller("FacetOptionCtrl as fo", {
        $scope: $scope,
        provider:provider
      });
      controller.facetContainer = {
        addSelected: jasmine.createSpy("addSelected"),
        removeSelected: jasmine.createSpy("removeSelected")
      };

    });

    it("should deselect", function () {
      controller.deselect();
      expect(controller.option.checked).toBe(false);
      expect(controller.facetContainer.removeSelected).toHaveBeenCalled();
      expect(controller.deselectCallback).toHaveBeenCalled();
    });

    it("should select", function () {
      controller.select();
      expect(controller.option.checked).toBe(true);
      expect(controller.facetContainer.addSelected).toHaveBeenCalled();
      expect(controller.selectCallback).toHaveBeenCalled();
    });

    it("should toggle", function () {
      controller.select();
      expect(controller.option.checked).toBe(true);
      expect(controller.facetContainer.addSelected).toHaveBeenCalled();
      expect(controller.selectCallback).toHaveBeenCalled();
      controller.deselect();
      expect(controller.option.checked).toBe(false);
      expect(controller.facetContainer.removeSelected).toHaveBeenCalled();
      expect(controller.deselectCallback).toHaveBeenCalled();
    });

  });
  
  describe("element", function () {
    var element;
    beforeEach(function () {
      $scope.facetName = "test";
      $scope.facetOptionName = "testName";
      $scope.facetOptionCount = 10;
      $scope.select = select;
      $scope.deselect = deselect;
      element = $compile('<facet-container select-title="Selected:" clear-text="clear">\n' +
        ' <facet name="facetName">\n' +
        '   <facet-option name="facetOptionName" count="facetOptionCount" select="select()" deselect="deselect()"></facet-option>\n' +
        ' </facet>\n' +
        '</facet-container>\n')($scope);
      $scope.$digest();
    });

    it("should display the name", function () {
      expect(element.find('.facet-option-name').text()).toBe($scope.facetOptionName);
    });

    it("should display the count", function () {
      expect(element.find('.facet-option-count span').text()).toBe($scope.facetOptionCount.toString());
    });

    it("should update the count", function () {
      expect(element.find('.facet-option-count span').text()).toBe($scope.facetOptionCount.toString());
      $scope.facetOptionCount = 20;
      $scope.$digest();
      expect(element.find('.facet-option-count span').text()).toBe($scope.facetOptionCount.toString());
    });

    it("should select when clicked", function () {
      var fc = $scope.$$childHead.fc;
      spyOn(fc, 'addSelected');
      element.find('.facet-option a').click();
      $scope.$digest();
      expect(select).toHaveBeenCalled();
      expect(element.find('.facet-option-check').hasClass("invisible")).not.toBe(true);
      expect(fc.addSelected).toHaveBeenCalled();
    });

    it("should deselect when clicked", function () {
      var fc = $scope.$$childHead.fc;
      spyOn(fc, 'addSelected');
      spyOn(fc, 'removeSelected');
      element.find('.facet-option a').click();
      $scope.$digest();
      expect(select).toHaveBeenCalled();
      expect(element.find('.facet-option-check .el-checkbox').hasClass("checked")).toBe(true);
      expect(fc.addSelected).toHaveBeenCalled();
      element.find('.facet-option a').click();
      $scope.$digest();
      expect(deselect).toHaveBeenCalled();
      expect(element.find('.facet-option-check .el-checkbox').hasClass("checked")).toBe(false);
      expect(fc.removeSelected).toHaveBeenCalled();
    });

    it("should not show brackets when no count is added", function() {
      var elementNoCount = $compile('<facet-container select-title="Selected:" clear-text="clear">\n' +
        ' <facet name="facetName">\n' +
        '   <facet-option name="facetOptionName" select="select()" deselect="deselect()"></facet-option>\n' +
        ' </facet>\n' +
        '</facet-container>\n')($scope);
      $scope.$digest();
      expect(element.find('.facet-option-count').hasClass('ng-hide')).toBe(false);
      expect(elementNoCount.find('.facet-option-count').hasClass('ng-hide')).toBe(true);
    });
  });
});