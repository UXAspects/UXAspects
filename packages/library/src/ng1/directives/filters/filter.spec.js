describe('filters', function () {
  var $compile, $rootScope;

  beforeEach(module("ux-aspects.filters"));
  beforeEach(module("ux-aspects.previewPanes"));

  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  describe("dynamic filters", function () {

    describe("with a typeahead", function () {

      var element, $scope;

      beforeEach(function () {

        $scope = $rootScope.$new();

        $scope.name = "Demo Name";
        $scope.filterOptions = {
          options: [{
            name: "Test Filter 1",
            select: jasmine.createSpy(),
            deselect: jasmine.createSpy(),
            default: false
          }, {
            name: "Test Filter 2",
            select: jasmine.createSpy(),
            deselect: jasmine.createSpy(),
            default: false
          }, {
            name: "Test Filter 1",
            select: jasmine.createSpy(),
            deselect: jasmine.createSpy(),
            default: false
          }]
        };
        $scope.filterConfig = {};
        $scope.callback = null;

        var html = '<filter-container clear-tooltip="Clear All"> ';
        html += '<filter name="\'A Test Filter\'" ';
        html += 'filter-options="filterOptions" ';
        html += 'display-configuration="filterConfig" ';
        html += 'update-callback="callback"></filter> ';
        html += '</filter-container>';
        element = $compile(html)($scope);

        $scope.$digest();
      });

      it('should display the typeahead', function () {
        expect(element.find(".dropdown-menu.dynamic-filter input").length).toBe(1);
      });

    });

    describe("with explicit filter options", function () {

      var element, $scope;

      beforeEach(function () {

        $scope = $rootScope.$new();

        $scope.name = "Demo Name";
        $scope.filterOptions = {
          options: [{
            name: "Test Filter 1",
            select: jasmine.createSpy(),
            deselect: jasmine.createSpy(),
            default: false
          }, {
            name: "Test Filter 2",
            select: jasmine.createSpy(),
            deselect: jasmine.createSpy(),
            default: false
          }, {
            name: "Test Filter 1",
            select: jasmine.createSpy(),
            deselect: jasmine.createSpy(),
            default: false
          }]
        };
        $scope.filterConfig = {
          maxIndividualItems: 4
        };
        $scope.callback = null;

        var html = '<filter-container clear-tooltip="Clear All"> ';
        html += '<filter name="\'A Test Filter\'" ';
        html += 'filter-options="filterOptions" ';
        html += 'display-configuration="filterConfig" ';
        html += 'update-callback="callback"></filter> ';
        html += '</filter-container>';
        element = $compile(html)($scope);

        $scope.$digest();
      });

      it('should not display the typeahead', function () {
        expect(element.find(".dropdown-menu.dynamic-filter input").length).toBe(0);
      });
      it('should display individual items', function () {
        expect(element.find(".dropdown-menu li").length).toBe(3);
      });

    });

  });

  describe("tagging filter", function () {

    var element, $scope;

    beforeEach(function () {

      $scope = $rootScope.$new();

      $scope.name = "Demo Name";
      $scope.filterOptions = {
        options: [{
          name: "TAGS",
          select: jasmine.createSpy(),
          deselect: jasmine.createSpy(),
          default: true
        }, {
          name: "Tag1",
          select: jasmine.createSpy(),
          deselect: jasmine.createSpy(),
          default: false
        }, {
          name: "Tag2",
          select: jasmine.createSpy(),
          deselect: jasmine.createSpy(),
          default: false
        }, {
          name: "Tag3",
          select: jasmine.createSpy(),
          deselect: jasmine.createSpy(),
          default: false
        }],
        fixedOptions: [{
          name: "All items",
          select: jasmine.createSpy(),
          deselect: jasmine.createSpy(),
          default: false
        }, {
          name: "Untagged items",
          select: jasmine.createSpy(),
          deselect: jasmine.createSpy(),
          default: false
        }]
      };
      $scope.filterConfig = {
        maxIndividualItems: 0
      };
      $scope.callback = null;

      var html = '<filter-container clear-tooltip="Clear All"> ';
      html += '<filter name="\'TAGS\'" ';
      html += 'filter-options="filterOptions" ';
      html += 'display-configuration="filterConfig" ';
      html += 'update-callback="callback"></filter> ';
      html += '</filter-container>';
      element = $compile(html)($scope);

      $scope.$digest();
    });

    it("should display the expected title", function () {
      expect(element.find("div.dynamic-filter-toggle button").text().trim()).toBe("TAGS");
    });
    it("should display the fixed items", function () {
      expect(element.find("ul.dynamic-filter li.default-container li").eq(0).find("span").text()).toBe("TAGS");
      expect(element.find("ul.dynamic-filter li.default-container li").eq(1).find("span").text()).toBe("All items");
      expect(element.find("ul.dynamic-filter li.default-container li").eq(2).find("span").text()).toBe("Untagged items");
    });
    it("should select the fixed items on click", function () {
      var allItems = element.find("ul.dynamic-filter li.default-container li").eq(1).find("a");
      allItems.trigger("click");
      $scope.$digest();
      expect($scope.filterOptions.fixedOptions[0].select).toHaveBeenCalled();

      var untagged = element.find("ul.dynamic-filter li.default-container li").eq(2).find("a");
      untagged.trigger("click");
      $scope.$digest();
      expect($scope.filterOptions.fixedOptions[1].select).toHaveBeenCalled();
    });
    it("should add a selected item from the typeahead alongside the fixed items", function () {

      var item = {
        "name": "Tag1",
        "default": false,
        select: jasmine.createSpy(),
        deselect: jasmine.createSpy()
      };
      var label = "Tag1";
      element.find("button").scope().fc.dynamicFilterSelected(item, item, label);
      $scope.$digest();

      //Expect the tag we added
      expect(element.find("#dynamic-filter span").text()).toBe("Tag1");

      //Expect still to see our fixed elements
      expect(element.find("ul.dynamic-filter li.default-container li").eq(1).find("span").text()).toBe("All items");
      expect(element.find("ul.dynamic-filter li.default-container li").eq(2).find("span").text()).toBe("Untagged items");


    });

  });

});