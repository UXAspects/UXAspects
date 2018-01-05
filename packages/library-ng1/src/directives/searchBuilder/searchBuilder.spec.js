describe('Search Builder directive', function() {

    var $compile, $rootScope, $timeout, $templateCache, $q, element;

    beforeEach(module("ux-aspects.searchBuilder"));

    beforeEach(inject(function(_$compile_, _$rootScope_, _$timeout_, _$templateCache_, _$q_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $timeout = _$timeout_;
        $templateCache = _$templateCache_;
        $q = _$q_;
    }));

    beforeEach(function() {
        //create any templates
        var textComponent = '<search-component><label class="form-label">Text</label><input placeholder="Enter Text" class="form-control" ng-model="model" /></search-component>';
        $templateCache.put('textComponent.html', textComponent);

        var searchGroup = "<div class=\"search-group\">";
        searchGroup += "";
        searchGroup += "  <p class=\"search-group-title\" ng-bind=\"groupTitle\"><\/p>";
        searchGroup += "";
        searchGroup += "  <div class=\"search-group-content\">";
        searchGroup += "    <div class=\"operator-label {{ operator }}\" ng-class=\"{ 'search-builder-show': sg.components.length > 1 }\">";
        searchGroup += "      {{ operator }}";
        searchGroup += "    <\/div>";
        searchGroup += "    <div class=\"field-list\">";
        searchGroup += "      <ul class=\"field-collection\" ng-class=\"{ 'search-builder-show': sg.components.length > 0 }\">";
        searchGroup += "        <li class=\"field\" ng-repeat=\"component in sg.components\" component-id=\"{{ component.componentId }}\">";
        searchGroup += "          <ng-include src=\"component.templateUrl\"><\/ng-include>";
        searchGroup += "        <\/li>";
        searchGroup += "      <\/ul>";
        searchGroup += "      <div class=\"placeholder-field\" ng-show=\"sg.showPlaceholder\">";
        searchGroup += "        <label class=\"form-label\">New field<\/label>";
        searchGroup += "        <div class=\"form-control\"><\/div>";
        searchGroup += "      <\/div>";
        searchGroup += "    <\/div>";
        searchGroup += "    <div class=\"add-field\" ng-class=\"{ 'limit-reached' : sg.maxFields && (sg.components.length >= maxFields) }\">";
        searchGroup += "      <div class=\"button-container\" ng-click=\"sg.addNewField()\">";
        searchGroup += "        <div class=\"add-button\"><span class=\"hpe-icon hpe-add\"><\/span><\/div>";
        searchGroup += "        <span class=\"add-text\" single-line-overflow-tooltip ng-bind=\"buttonText\"><\/span>";
        searchGroup += "      <\/div>";
        searchGroup += "    <\/div>";
        searchGroup += "  <\/div>";
        searchGroup += "  <hr class=\"group-divider\" \/>";
        searchGroup += "<\/div>";

        $templateCache.put('searchBuilder/templates/searchGroup.html', searchGroup);

        var searchComponent = "<div class=\"search-component\">";
        searchComponent += "  <div class=\"component-container\">";
        searchComponent += "  <\/div>";
        searchComponent += "  <div class=\"component-remove\">";
        searchComponent += "      <span class=\"hpe-icon hpe-close\" ng-click=\"sc.removeComponent()\"><\/span>";
        searchComponent += "  <\/div>";
        searchComponent += "<\/div>";

        $templateCache.put('searchBuilder/templates/searchComponent.html', searchComponent);
    });

    it("should have the correct search groups", function() {
        createElement({});

        var searchGroups = element.find('.search-group');

        expect(searchGroups.length).toBe(2);
    });

    it("should have search groups with the correct titles", function() {
        createElement({});

        var titles = element.find('.search-group-title');

        expect(titles.length).toBe(2);
        expect(titles.get(0).innerHTML).toBe('Text Keywords');
        expect(titles.get(1).innerHTML).toBe('ANY of the following');
    });

    it("should have search groups with the correct button text", function() {
        createElement({});

        var buttonText = element.find('.add-text');

        expect(buttonText.length).toBe(2);
        expect(buttonText.get(0).innerHTML).toBe('Add text keywords');
        expect(buttonText.get(1).innerHTML).toBe('Add a field');
    });

    it("should have search groups with the correct operator", function() {
        createElement({});

        var operators = element.find('.operator-label');

        expect(operators.length).toBe(2);
        expect(operators.get(0).innerHTML.trim()).toBe('or');
        expect(operators.get(1).innerHTML.trim()).toBe('and');
    });

    it("should have search groups with no components", function() {
        createElement({});

        var componentLists = element.find('.field-collection');

        expect(componentLists.length).toBe(2);
        expect(componentLists.get(0).children.length).toBe(0);
        expect(componentLists.get(1).children.length).toBe(0);
    });

    it("should have the ability to add a simple component", function() {
        var scope = createElement({});

        var button = element.find('.button-container');

        expect(button.length).toBe(2);

        angular.element(button.get(0)).click();

        scope.$digest();

        var componentLists = element.find('.field-collection');

        expect(componentLists.length).toBe(2);
        expect(componentLists.get(0).children.length).toBe(1);
        expect(componentLists.get(1).children.length).toBe(0);
    });

    it("should show placeholder when waiting on resolution", function() {
        var scope = createElement({});

        var button = element.find('.button-container');

        expect(button.length).toBe(2);

        angular.element(button.get(1)).click();

        scope.$digest();

        var placeholders = element.find('.placeholder-field');
        expect(placeholders.length).toBe(2);

        expect(angular.element(placeholders.get(0)).hasClass('ng-hide')).toBe(true);
        expect(angular.element(placeholders.get(1)).hasClass('ng-hide')).toBe(false);
    });

    it("should hide placeholder after promise resolved", function(done) {
      var scope = createElement({});

      var button = element.find('.button-container');

      expect(button.length).toBe(2);

      angular.element(button.get(1)).click();

      scope.$digest();

      var placeholders = element.find('.placeholder-field');
      expect(placeholders.length).toBe(2);

      expect(angular.element(placeholders.get(0)).hasClass('ng-hide')).toBe(true);
      expect(angular.element(placeholders.get(1)).hasClass('ng-hide')).toBe(false);

      setTimeout(function() {
        scope.$digest();
        expect(angular.element(placeholders.get(0)).hasClass('ng-hide')).toBe(true);
        expect(angular.element(placeholders.get(1)).hasClass('ng-hide')).toBe(true);
        done();
      }, 1100);
    });

    it("should generate search query", function(done) {
      var scope = createElement({});

      var button = element.find('.button-container');

      expect(button.length).toBe(2);

      angular.element(button.get(1)).click();

      scope.$digest();

      setTimeout(function() {
        scope.$digest();

        expect(JSON.stringify(scope.searchQuery)).toBe('{"locations":{"text-promise":{"component":"text","value":null}}}');

        done();
      }, 1100);
    });



    function createElement(searchQuery) {
        var html = '<search-builder search-query="searchQuery" components="components">';
        html += ' <search-group group-id="\'keywords\'" group-title="\'Text Keywords\'" operator="\'or\'" button-text="\'Add text keywords\'" add-field="addKeywordField"></search-group>';
        html += ' <search-group group-id="\'locations\'" group-title="\'ANY of the following\'" operator="\'and\'" button-text="\'Add a field\'" add-field="addCustomField"></search-group>';
        html += '</search-builder>';

        var $scope = $rootScope.$new();

        $scope.searchQuery = searchQuery;
        $scope.components = [{
            name: 'text',
            templateUrl: 'textComponent.html'
        }];

        $scope.addKeywordField = function() {
            return {
                id: 'textComponent1',
                component: 'text'
            };
        };

        $scope.addCustomField = function() {
            var defer = $q.defer();

            setTimeout(function() {
                defer.resolve({
                    id: 'text-promise',
                    component: 'text'
                });
            }, 1000);

            return defer.promise;
        };

        element = $compile(html)($scope);

        //ensure everything is ready
        $scope.$digest();

        return $scope;
    }

});
