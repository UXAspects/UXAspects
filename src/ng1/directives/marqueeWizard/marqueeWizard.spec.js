describe('marquee wizard', function () {
    var $compile, $rootScope, element, $scope, $templateCache, $timeout;
    var vm = {};

    beforeEach(module("ux-aspects.marqueeWizard"));
    
    beforeEach(inject(function (_$compile_, _$rootScope_, _$templateCache_, _$timeout_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $templateCache = _$templateCache_;
        $timeout = _$timeout_;
        $scope = $rootScope.$new();
    }));

    beforeEach(function () {
        //create the templates
        var wizardMarqueeFirst = '<input id="requiredText" type="text" name="requiredText" placeholder="Text" class="form-control" required ng-model="vm.text">';
        $templateCache.put('app/wizard/templates/wizardMarqueeFirst.html', wizardMarqueeFirst);

        var wizardMarqueeSecond = '<input id="requiredTextTwo" type="text" name="requiredTextTwo" placeholder="Text" class="form-control" required ng-model="vm.text">';
        $templateCache.put('app/wizard/templates/wizardMarqueeSecond.html', wizardMarqueeSecond);
    });

    describe("marquee wizard directive", function () {
        beforeEach(function () {
            vm.steps = [{
                title: 'First step',
                header: 'Marquee wizard',
                templateUrl: 'app/wizard/templates/wizardMarqueeFirst.html'
            }, {
                title: 'Second step',
                header: 'Second step title',
                templateUrl: 'app/wizard/templates/wizardMarqueeSecond.html'
            }];

            vm.buttonOptions = {
                previousTooltip: 'Previous Step',
                nextTooltip: 'Next Step',
                finishTooltip: 'Finish'
            };

            vm.sideInfo = {
                title: "Side info title",
                description: "Description"
            };

            vm.onChanging = function () {
                return $scope.requiredInput.requiredText ? $scope.requiredInput.requiredText.$valid : true;
            };

            vm.onFinishing = function () {
                return $scope.requiredInput.requiredTextTwo.$valid;
            };

            $scope.vm = vm;

            var html = '<form name="requiredInput">' +
                '<marquee-wizard   wizard-icon="vm.icon"' +
                'wizard-steps="vm.steps"' +
                'button-options="vm.buttonOptions"' +
                'on-changing="vm.onChanging"' +
                'on-finishing="vm.onFinishing"' +
                'on-finished="vm.onFinished"' +
                'on-canceled="vm.onCanceled"' +
                'is-visited="vm.isVisited"' +
                'side-info="vm.sideInfo">' +
                '</marquee-wizard>' +
                '</form>';

            element = $compile(html)($scope);
            $timeout.flush();
            $scope.$digest();
        });


        it('should not go to second tab when no value is entered', function () {
            element.find(".marquee-next-btn").trigger('click');
            $scope.$digest();
            expect(element.find(".marquee-title")[0].innerText).toBe('Marquee wizard');
        });

        it('should go to second tab when form is valid and call onChanging', function () {
            var onChangingSpy = spyOn($scope.vm, "onChanging");
            $scope.requiredInput.requiredText.$setViewValue('something valid here');
            $scope.$digest();
            element.find(".marquee-next-btn").trigger('click');
            $scope.$digest();
            expect(element.find(".marquee-title")[0].innerText).toBe('Second step title');
            expect(onChangingSpy).toHaveBeenCalled();
        });

        it('should not finish when no value is entered', function () {
            var onFinishingSpy = spyOn($scope.vm, "onFinishing").and.callThrough();
            $scope.requiredInput.requiredText.$setViewValue('something valid here');
            $scope.$digest();
            element.find(".marquee-next-btn").trigger('click');
            $scope.$digest();
            element.find(".marquee-finish-btn").trigger('click');
            $scope.$digest();
            expect(onFinishingSpy).toHaveBeenCalled();
            expect(onFinishingSpy()).toBe(false);
        });

        it('should finish when form is valid', function () {
            var onFinishingSpy = spyOn($scope.vm, "onFinishing").and.callThrough();
            $scope.requiredInput.requiredText.$setViewValue('something valid here');
            $scope.$digest();
            element.find(".marquee-next-btn").trigger('click');
            $scope.$digest();
            $scope.requiredInput.requiredTextTwo.$setViewValue('something valid here');
            $scope.$digest();
            element.find(".marquee-finish-btn").trigger('click');
            $scope.$digest();
            expect(onFinishingSpy).toHaveBeenCalled();
            expect(onFinishingSpy()).toBe(true);
        });

        it('should go to previous tab', function () {
            $scope.requiredInput.requiredText.$setViewValue('something valid here');
            $scope.$digest();
            element.find(".marquee-next-btn").trigger('click');
            $scope.$digest();
            expect(element.find(".marquee-title")[0].innerText).toBe('Second step title');
            element.find(".marquee-previous-btn").trigger('click');
            $scope.$digest();
            expect(element.find(".marquee-title")[0].innerText).toBe('Marquee wizard');
        });

        it('should display the correct titles', function () {
            expect(element.find(".title")[1].innerText).toBe('First step');
            expect(element.find(".title")[2].innerText).toBe('Second step');
        });

        it('should apply the active class to the active step', function () {
            expect(angular.element(element.find("li")[0]).hasClass('active')).toBe(true);
            expect(angular.element(element.find("li")[1]).hasClass('active')).toBe(false);
            $scope.requiredInput.requiredText.$setViewValue('something valid here');
            $scope.$digest();
            element.find(".marquee-next-btn").trigger('click');
            $scope.$digest();
            expect(element.find(".marquee-title")[0].innerText).toBe('Second step title');
            expect(angular.element(element.find("li")[0]).hasClass('active')).toBe(false);
            expect(angular.element(element.find("li")[1]).hasClass('active')).toBe(true);
        });

        it('should add step complete', function () {
            expect(angular.element(element.find(".step-complete span")[0]).hasClass('invisible')).toBe(true);
            $scope.requiredInput.requiredText.$setViewValue('something valid here');
            $scope.$digest();
            element.find(".marquee-next-btn").trigger('click');
            $scope.$digest();
            expect(angular.element(element.find(".step-complete span")[0]).hasClass('invisible')).toBe(false);
        });

        it('should display the side info', function () {
            expect(element.find(".title")[0].innerText).toBe('Side info title');
            expect(element.find(".description")[0].innerText).toContain('Description');
        });

    });

});