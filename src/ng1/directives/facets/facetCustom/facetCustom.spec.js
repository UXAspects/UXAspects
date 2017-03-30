describe("facet custom directive", function() {

    var $compile, $rootScope, $scope, element, $controller, controller;

    beforeEach(module("ux-aspects.facets", "ux-aspects.previewPanes", "ux-aspects.safeTimeout"));

    beforeEach(inject(function(_$compile_, _$rootScope_, _$controller_) {
        $compile = _$compile_;
        $controller = _$controller_;
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
    }));

    beforeEach(function() {
        controller = $controller("FacetOptionCtrl as fo", {
            $scope: $scope
        });
        controller.facetContainer = {
            addSelected: jasmine.createSpy("addSelected"),
            removeSelected: jasmine.createSpy("removeSelected")
        };

        $scope.name = "Initial Name";

        $scope.testFn = function() {
            $scope.test = "test";
            return $scope.test;
        };

        $scope.select = jasmine.createSpy('select');
        $scope.deselect = jasmine.createSpy('deselect');

        var html =
            "<facet-container select-title=\"Filters\" clear-text=\"Clear All\" no-items-text=\"None selected\">\n" +
            "  <facet-custom name=\"name\" select=\"select\" deselect=\"deselect\" model=\"test\" display=\"testFn\"> " +
            "       <button ng-click=\"testFn()\"></button>" +
            "    </facet-custom>" +
            "</facet-container>";

        element = $compile(html)($scope);
        $scope.$digest();
    });

    it('should not overwrite the name when item is selected', function() {
        element.find("button").trigger('click');
        $scope.$digest();
        expect(element.find('.facet-name').scope().name).toBe('Initial Name');
    });

    it("should display the name", function () {
        element.find("button").trigger('click');
        $scope.$digest();
        expect(element.find('.facet-selected-name').text()).toBe('test');
    });
    it("should select when clicked", function () {
        var fc = $scope.$$childHead.fc;
        spyOn(fc, 'addSelected');
        element.find('button').click();
        $scope.$digest();
        expect($scope.select).toHaveBeenCalled();
        expect(fc.addSelected).toHaveBeenCalled();
    });
    it("should deselect when clicked", function () {
        var fc = $scope.$$childHead.fc;
        spyOn(fc, 'addSelected');
        spyOn(fc, 'removeSelected');
        element.find('button').click();
        $scope.$digest();
        expect($scope.select).toHaveBeenCalled();
        expect(fc.addSelected).toHaveBeenCalled();
        element.find('button').click();
        $scope.$digest();
        expect($scope.deselect).toHaveBeenCalled();
        expect(fc.removeSelected).toHaveBeenCalled();
    });

});
