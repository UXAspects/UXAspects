describe("facet dynamic directive", function() {

    var $compile, $rootScope, $controller, $scope, provider;

    var selectOption = function() {};
    var deselectOption = function() {};
    var updateCallback = jasmine.createSpy('updateCallback');

    var facetOptions;

    beforeEach(module("ux-aspects.facets", "ux-aspects.previewPanes", "ux-aspects.safeTimeout", "ux-aspects.checkbox"));

    beforeEach(inject(function(_$controller_, _$compile_, _$rootScope_, _previewPaneProvider_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $controller = _$controller_;
        provider = _previewPaneProvider_;
    }));

    beforeEach(function() {
        facetOptions = {
            name: 'Test Name',
            options: [{
                name: 'Item One',
                count: 0,
                select: selectOption,
                deselect: deselectOption
            }, {
                name: 'Item Two',
                count: 10,
                select: selectOption,
                deselect: deselectOption
            }, {
                name: 'Item Three',
                count: 20,
                select: selectOption,
                deselect: deselectOption
            }]
        };
    });

    describe("controller", function() {

        it('should have correct default display configuration', function() {
            //create new scope and decorate it
            $scope = $rootScope.$new();
            $scope.name = facetOptions.name;
            $scope.facetOptions = facetOptions;
            $scope.displayConfiguration = {};
            $scope.placeholder = 'Sample Placeholder';
            $scope.updateCallback = updateCallback;

            //instantiate controller with scope
            var controller = $controller("FacetDynamicCtrl as fc", {
                $scope: $scope
            });

            //expect default values
            expect(controller.maxDisplayableItems).toBe(facetOptions.options.length);
            expect(controller.minCharsForTypeahead).toBe(3);
            expect(controller.showZero).toBe(undefined);
        });

        it('should have correct display configuration after set', function() {
            //create new scope and decorate it
            $scope = $rootScope.$new();
            $scope.name = facetOptions.name;
            $scope.facetOptions = facetOptions;
            $scope.displayConfiguration = {
                minCharacters: 10,
                minIndividualItems: 11,
                maxIndividualItems: 12,
                maxDisplayableItems: 13,
                showZero: true
            };
            $scope.placeholder = 'Sample Placeholder';
            $scope.updateCallback = updateCallback;

            //instantiate controller with scope
            var controller = $controller("FacetDynamicCtrl as fc", {
                $scope: $scope
            });

            //expect set values
            expect(controller.maxDisplayableItems).toBe(13);
            expect(controller.minCharsForTypeahead).toBe(10);
            expect(controller.showZero).toBe(true);
            expect(controller.visibleFacetOptions.length).toBe(facetOptions.options.length);
        });

        it('should have typeahead control', function() {
            //create new scope and decorate it
            $scope = $rootScope.$new();
            $scope.name = facetOptions.name;
            $scope.facetOptions = facetOptions;
            $scope.displayConfiguration = {
                maxIndividualItems: 2
            };
            $scope.placeholder = 'Sample Placeholder';
            $scope.updateCallback = updateCallback;

            //instantiate controller with scope
            var controller = $controller("FacetDynamicCtrl as fc", {
                $scope: $scope
            });

            //expect default values
            expect(controller.useTypeaheadControl).toBe(true);
            expect(controller.showFacetOptions).toBe(false);
        });

        it('should not have typeahead control', function() {
            //create new scope and decorate it
            $scope = $rootScope.$new();
            $scope.name = facetOptions.name;
            $scope.facetOptions = facetOptions;
            $scope.displayConfiguration = {
                maxIndividualItems: 4
            };
            $scope.placeholder = 'Sample Placeholder';
            $scope.updateCallback = updateCallback;

            //instantiate controller with scope
            var controller = $controller("FacetDynamicCtrl as fc", {
                $scope: $scope
            });

            //expect default values
            expect(controller.useTypeaheadControl).toBe(false);
            expect(controller.showFacetOptions).toBe(true);
        });

        it('should have typeahead control and facet options', function() {
            //create new scope and decorate it
            $scope = $rootScope.$new();
            $scope.name = facetOptions.name;
            $scope.facetOptions = facetOptions;
            $scope.displayConfiguration = {
                minIndividualItems: 1,
                maxIndividualItems: 2
            };
            $scope.placeholder = 'Sample Placeholder';
            $scope.updateCallback = updateCallback;

            //instantiate controller with scope
            var controller = $controller("FacetDynamicCtrl as fc", {
                $scope: $scope
            });

            //expect default values
            expect(controller.useTypeaheadControl).toBe(true);
            expect(controller.visibleFacetOptions.length).toBe(1);
            expect(controller.showFacetOptions).toBe(true);
        });

        it('should not show typeahead if showing all items as facet options', function() {
            //create new scope and decorate it
            $scope = $rootScope.$new();
            $scope.name = facetOptions.name;
            $scope.facetOptions = facetOptions;
            $scope.displayConfiguration = {
                minIndividualItems: 3,
                maxIndividualItems: 2
            };
            $scope.placeholder = 'Sample Placeholder';
            $scope.updateCallback = updateCallback;

            //instantiate controller with scope
            var controller = $controller("FacetDynamicCtrl as fc", {
                $scope: $scope
            });

            //expect default values
            expect(controller.useTypeaheadControl).toBe(false);
            expect(controller.showFacetOptions).toBe(true);
        });
    });

    describe("element", function() {

        var htmlTemplate =
            "<facet-container select-title=\"Filters\" clear-text=\"Clear All\" no-items-text=\"None selected\">\n" +
            "  <facet-dynamic name=\"name\" facet-options=\"facetOptions\" display-configuration=\"displayConfiguration\" placeholder=\"placeholder\" update-callback=\"updateCallback\">\n" +
            "  </facet-dynamic>\n" +
            "</facet-container>";

        var htmlTemplateWithOptionTemplate =
            "<facet-container select-title=\"Filters\" clear-text=\"Clear All\" no-items-text=\"None selected\">\n" +
            "  <facet-dynamic name=\"name\" facet-options=\"facetOptions\" display-configuration=\"displayConfiguration\" placeholder=\"placeholder\" update-callback=\"updateCallback\" facet-option-template=\"\'optionTemplate\'\">\n" +
            "  </facet-dynamic>\n" +
            "</facet-container>\n" +
            "<script type=\"text\/ng-template\" id=\"optionTemplate\">\n" +
            "  <span class=\"custom-count\" ng-bind=\"data.count\"></span>\n" +
            "</script>";

        it("should display element correctly", function() {
            //create new scope and decorate it
            $scope = $rootScope.$new();
            $scope.name = facetOptions.name;
            $scope.facetOptions = facetOptions;
            $scope.displayConfiguration = {};
            $scope.placeholder = 'Sample Placeholder';
            $scope.updateCallback = updateCallback;

            var element = $compile(htmlTemplate)($scope);
            $scope.$digest();

            //ensure title text is correct
            var titleElements = element[0].getElementsByClassName('facet-name');
            expect(titleElements.length).toBe(1);

            var title = titleElements[0].innerText;
            expect(title).toBe($scope.name);

            var typeaheadElement = element[0].getElementsByTagName('textarea');
            expect(typeaheadElement.length).toBe(1);

            var placeholder = typeaheadElement[0].getAttribute('placeholder');
            expect(placeholder).toBe($scope.placeholder + '...');
        });

        it("should show no facet options", function() {
            //create new scope and decorate it
            $scope = $rootScope.$new();
            $scope.name = facetOptions.name;
            $scope.facetOptions = facetOptions;
            $scope.displayConfiguration = {};
            $scope.placeholder = 'Sample Placeholder';
            $scope.updateCallback = updateCallback;

            var element = $compile(htmlTemplate)($scope);
            $scope.$digest();

            var facetElements = element[0].getElementsByClassName('facet-option');
            expect(facetElements.length).toBe(0);
        });

        it("should show facet options with counts greater than zero", function() {
            //create new scope and decorate it
            $scope = $rootScope.$new();
            $scope.name = facetOptions.name;
            $scope.facetOptions = facetOptions;
            $scope.displayConfiguration = {
                minIndividualItems: 3
            };
            $scope.placeholder = 'Sample Placeholder';
            $scope.updateCallback = updateCallback;

            var element = $compile(htmlTemplate)($scope);
            $scope.$digest();

            var facetElements = element[0].getElementsByClassName('facet-option');
            expect(facetElements.length).toBe(2);
        });

        it("should show facet options with counts greater than or equal to zero", function() {
            //create new scope and decorate it
            $scope = $rootScope.$new();
            $scope.name = facetOptions.name;
            $scope.facetOptions = facetOptions;
            $scope.displayConfiguration = {
                minIndividualItems: 3,
                showZero: true
            };
            $scope.placeholder = 'Sample Placeholder';
            $scope.updateCallback = updateCallback;

            var element = $compile(htmlTemplate)($scope);
            $scope.$digest();

            var facetElements = element[0].getElementsByClassName('facet-option');
            expect(facetElements.length).toBe(3);
        });

        it("should call updateCallback when typeahead text changes", function() {
            //create new scope and decorate it
            $scope = $rootScope.$new();
            $scope.name = facetOptions.name;
            $scope.facetOptions = facetOptions;
            $scope.displayConfiguration = {
                maxIndividualItems: 1
            };
            $scope.placeholder = 'Sample Placeholder';
            $scope.updateCallback = updateCallback;

            var element = $compile(htmlTemplate)($scope);
            $scope.$digest();

            var typeaheadElement = element[0].getElementsByTagName('textarea');
            expect(typeaheadElement.length).toBe(1);

            //set value less than min character length
            typeaheadElement[0].value = 'abc';
            angular.element(typeaheadElement[0]).triggerHandler('input');
            expect($scope.updateCallback).toHaveBeenCalled();
        });

        it("should call select facet option when clicked", function() {
            //create new scope and decorate it
            $scope = $rootScope.$new();
            $scope.name = facetOptions.name;
            $scope.facetOptions = facetOptions;
            $scope.displayConfiguration = {
                minIndividualItems: 1
            };
            $scope.placeholder = 'Sample Placeholder';
            $scope.updateCallback = updateCallback;

            var element = $compile(htmlTemplate)($scope);
            $scope.$digest();

            //find a facet option
            var facetOptionsElements = element[0].getElementsByClassName('facet-option');
            expect(facetOptionsElements.length).toBe(1);

            var facetLink = facetOptionsElements[0].getElementsByTagName('a');
            expect(facetLink.length).toBe(1);

            //should be unchecked
            var tickIcon = facetLink[0].getElementsByClassName('el-checkbox');
            expect(tickIcon.length).toBe(1);

            expect(angular.element(tickIcon[0]).hasClass('checked')).toBe(false);

            //click link
            angular.element(facetLink[0]).click();
            $scope.$digest();

            expect(angular.element(tickIcon[0]).hasClass('checked')).toBe(true);
        });

        describe("when the facet option template is informed", function () {
            var element,
                customOptions;

            beforeEach(function () {
                //create new scope and decorate it
                $scope = $rootScope.$new();
                $scope.name = facetOptions.name;
                $scope.facetOptions = facetOptions;
                $scope.displayConfiguration = {
                    minIndividualItems: 5
                };
                $scope.placeholder = 'Sample Placeholder';
                $scope.updateCallback = updateCallback;

                element = $compile(htmlTemplateWithOptionTemplate)($scope);
                $scope.$digest();
            });

            it("should apply the template", function() {
                customOptions = element[0].getElementsByClassName("custom-count");
                expect(customOptions.length).toBe(2);
            });

            it("should properly apply the values to the template bindings", function() {
                expect(customOptions[0].innerText).toBe(facetOptions.options[1].count + "");
                expect(customOptions[1].innerText).toBe(facetOptions.options[2].count + "");
            });

            it("should not load the default template", function() {
                var defaultFacetOptionNames = element[0].getElementsByClassName("facet-option-name");
                expect(defaultFacetOptionNames.length).toBe(0);
            });
        });

    });

});
