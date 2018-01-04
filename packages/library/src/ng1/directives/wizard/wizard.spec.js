describe('wizard directive', function () {
  var $compile, $rootScope, element, $scope, actions, stepLinks;

  beforeEach(module("ux-aspects.wizard"));

  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  var getActions = function () {
    return $(element).find(".actions ul li .btn");
  };

  var getStepLinks = function () {
    return $(element).find(".steps ul li");
  };

  describe("wizard controller", function () {
    var scope;
    
    var steps = [];
    beforeEach(inject(function (_$controller_) {
      scope = $rootScope.$new();
      _$controller_("AspectsWizardCtrl as wzrd", {
        $scope: scope
      }); 

      var stepScope = null;

      for (var i = 0; i < 4; i++) {
        stepScope = $rootScope.$new();
        stepScope.disabled = false;
        stepScope.done = false;
        steps.push(stepScope);
      }

    }));

    it('should update the steps to be done when updateIsVisited is called except current step 0', function () {
      scope.wzrd.addStep(steps[0]);
      scope.wzrd.addStep(steps[1]);
      scope.wzrd.addStep(steps[2]);
      expect(scope.wzrd.steps[1].done).toBe(false);
      expect(scope.wzrd.steps[2].done).toBe(false);

      scope.wzrd.updateIsVisited();

      // steps should now be done
      expect(scope.wzrd.steps[1].done).toBe(true);
      expect(scope.wzrd.steps[2].done).toBe(true);
    });

    it("should be able to add a step", function () {
      scope.wzrd.addStep(steps[0]);
      expect(scope.wzrd.steps.length).toBe(1);
    });

    it("should set first step to active", function () {
      scope.wzrd.addStep(steps[0]);
      scope.wzrd.addStep(steps[1]);
      expect(scope.wzrd.steps.length).toBe(2);
      expect(steps[0].active).toBe(true);
      expect(scope.wzrd.currentActiveStep).toBe(steps[0]);
    });

    it("should set everything bar first step to disabled", function () {
      scope.wzrd.addStep(steps[0]);
      scope.wzrd.addStep(steps[1]);

      expect(steps[1].disabled).toBe(true);
    });

    it("should be able to remove non active steps", function () {
      scope.wzrd.addStep(steps[0]);
      scope.wzrd.addStep(steps[1]);
      expect(scope.wzrd.steps.length).toBe(2);
      scope.wzrd.removeStep(steps[1]);
      expect(scope.wzrd.steps.length).toBe(1);
      expect(scope.wzrd.steps.indexOf(steps[1])).toBe(-1);
    });

    it("should be able to remove first active step", function () {
      scope.wzrd.addStep(steps[0]);
      scope.wzrd.addStep(steps[1]);
      expect(scope.wzrd.steps.length).toBe(2);
      scope.wzrd.removeStep(steps[0]);
      expect(scope.wzrd.steps.length).toBe(1);
      expect(steps[1].active).toBe(true);
    });

    it("should be able to remove active step", function () {
      scope.wzrd.addStep(steps[0]);
      scope.wzrd.addStep(steps[1]);
      scope.wzrd.next();
      expect(steps[1].active).toBe(true);
      scope.wzrd.removeStep(steps[1]);
      expect(scope.wzrd.steps.length).toBe(1);
      expect(steps[0].active).toBe(true);
    });

    it("should move to the next step", function () {
      scope.wzrd.addStep(steps[0]);
      scope.wzrd.addStep(steps[1]);
      scope.wzrd.next();
      expect(steps[1].active).toBe(true);
      expect(steps[1].disabled).toBe(false);
      expect(steps[0].done).toBe(true);
      expect(steps[0].disabled).toBe(false);
    });

    it("should move to the previous step", function () {
      scope.wzrd.addStep(steps[0]);
      scope.wzrd.addStep(steps[1]);
      scope.wzrd.next();
      scope.wzrd.previous();
      expect(steps[0].active).toBe(true);
      expect(steps[0].disabled).toBe(false);
      expect(steps[0].done).toBe(false);
      expect(steps[1].done).toBe(true);
      expect(steps[1].disabled).toBe(false);
      expect(steps[1].active).toBe(false);
    });

    it("should disable previous button intially", function () {
      scope.wzrd.addStep(steps[0]);
      scope.wzrd.addStep(steps[1]);
      expect(scope.wzrd.buttonOptions.previousEnabled).toBe(false);
    });

    it("should disable previous button when returning to first step", function () {
      scope.wzrd.addStep(steps[0]);
      scope.wzrd.addStep(steps[1]);
      scope.wzrd.next();
      expect(scope.wzrd.buttonOptions.previousEnabled).toBe(true);
      scope.wzrd.previous();
      expect(scope.wzrd.buttonOptions.previousEnabled).toBe(false);
    });

    it("should hide next and show finish", function () {
      scope.wzrd.addStep(steps[0]);
      scope.wzrd.addStep(steps[1]);
      expect(scope.wzrd.nextShow).toBe(true);

      expect(scope.wzrd.finishShow).toBe(false);
      scope.wzrd.next();
      expect(scope.wzrd.nextShow).toBe(false);

      expect(scope.wzrd.finishShow).toBe(true);
    });

    it("should show finish if only one step", function () {
      scope.wzrd.addStep(steps[0]);
      expect(scope.wzrd.nextShow).toBe(false);

      expect(scope.wzrd.finishShow).toBe(true);
    });

    it("should be able to insert to an index", function () {
      scope.wzrd.addStep(steps[0]);
      scope.wzrd.addStep(steps[1]);
      scope.wzrd.insertStep(steps[2], 0);
      expect(scope.wzrd.steps.length).toBe(3);
      expect(scope.wzrd.steps[0]).toBe(steps[2]);
      expect(scope.wzrd.steps[1]).toBe(steps[0]);
      expect(scope.wzrd.steps[2]).toBe(steps[1]);
      expect(steps[2].active).toBe(true);
    });
  });


  describe("wizard buttons", function () {
    var scope, wzrdCtrl, wzrdScope;

    beforeEach(function () {
      scope = $rootScope.$new();

      scope.steps = [{
        title: "First Step",
        content: "Content of step 1."
      }, {
        title: "Second Step",
        content: "Content of step 2."
      }, {
        title: "Third Step",
        content: "Content of step 3."
      }, {
        title: "Fourth Step",
        content: "Content of step 4."
      }];

      scope.buttonOptions = {
        previousTooltip: "Go to the previous step",
        nextTooltip: "Go to the next step",
        cancelTooltip: "Cancel the wizard",
        finishTooltip: "Finish the wizard"
      };

      var html = '<wizard button-options="buttonOptions">' +
        '<step ng-repeat="item in steps">' +
        '<step-heading>' +
        '<span ng-bind="item.title"></span>' +
        '</step-heading>' +
        '<p ng-bind="item.content"></p>' +
        '</step>' +
        '</wizard>';

      element = $compile(html)(scope);
      scope.$digest();
      wzrdCtrl = element.controller('wizard');
      wzrdScope = element.scope();
    });

    it("should have the Previous button disabled initially with tabindex -1", function () {
      expect(wzrdCtrl.buttonOptions.previousEnabled).toBe(false);
      expect(wzrdCtrl.buttonOptions.previousTabIndex).toBe(-1);
    });

    it("should set the tabindex to -1 when the Next button is disabled", function () {
      wzrdScope.buttonOptions.nextEnabled = false;
      scope.$digest();
      expect(wzrdCtrl.buttonOptions.nextTabIndex).toBe(-1);
    });

    it('should set the tabindex from -1 to 0 when button is enabled again', function () {
      wzrdScope.buttonOptions.nextEnabled = false;
      scope.$digest();
      expect(wzrdCtrl.buttonOptions.nextTabIndex).toBe(-1);

      wzrdScope.buttonOptions.nextEnabled = true;
      scope.$digest();
      expect(wzrdCtrl.buttonOptions.nextTabIndex).toBe(0);
    });

    it("should disable the Next button when the consuming ctrl changes nextEnabled to false", function () {
      expect(wzrdCtrl.buttonOptions.nextEnabled).toBe(true);

      // should update directive ctrl when consuming ctrl changes
      wzrdScope.buttonOptions.nextEnabled = false;
      scope.$digest();
      expect(wzrdCtrl.buttonOptions.nextEnabled).toBe(false);
    });

    it('should set the tabindex from -1 to 0 when button is enabled again', function () {
      wzrdScope.buttonOptions.cancelEnabled = false;
      scope.$digest();
      expect(wzrdCtrl.buttonOptions.cancelTabIndex).toBe(-1);

      wzrdScope.buttonOptions.cancelEnabled = true;
      scope.$digest();
      expect(wzrdCtrl.buttonOptions.cancelTabIndex).toBe(0);
    });

    it("should disable the Cancel button when the consuming ctrl changes cancelEnabled to false", function () {
      expect(wzrdCtrl.buttonOptions.cancelEnabled).toBe(true);

      // should update directive ctrl when consuming ctrl changes
      wzrdScope.buttonOptions.cancelEnabled = false;
      scope.$digest();
      expect(wzrdCtrl.buttonOptions.cancelEnabled).toBe(false);
    });

  });



  describe("wizard element", function () {
    var steps, $scope, actions, stepLinks;
    beforeEach(function () {
      $scope = $rootScope.$new();
      steps = [{
        title: "title1",
        content: "content1"
      }, {
        title: "title2",
        content: "content2"
      }, {
        title: "title3",
        content: "content3"
      }];

      $scope.steps = steps;
      element = $compile('<wizard>\n' +
        ' <step ng-repeat="item in steps">\n' +
        '   <step-heading>\n' +
        '      <span ng-bind="item.title"></span>\n' +
        '    </step-heading>\n' +
        '   <p ng-bind="item.content"></p>\n' +
        ' </step>\n' +
        '</wizard>')($scope);

      $scope.$digest();
      actions = getActions();
      stepLinks = getStepLinks();
    });
    it("should create steps", function () {
      expect($(element).find(".body").length).toBe(steps.length);
      expect(stepLinks.length).toBe(steps.length);
    });
    it("should populate bodies", function () {
      var bodies = $(element).find(".body");
      expect($.trim(bodies.eq(0).text())).toBe(steps[0].content);
      expect($.trim(bodies.eq(1).text())).toBe(steps[1].content);
    });
    it("should create actions", function () {
      expect(actions.length).toBe(4);
    });

    it("should disable all step links bar first one", function () {
      expect(stepLinks.eq(0).hasClass("current")).toBe(true);
      expect(stepLinks.eq(1).hasClass("disabled")).toBe(true);
    });
    it("should set step links to done once moved to next one", function () {
      angular.element(actions[1]).triggerHandler("click");

      expect(stepLinks.eq(0).hasClass("current")).toBe(false);
      expect(stepLinks.eq(0).hasClass("done")).toBe(true);
      expect(stepLinks.eq(0).hasClass("disabled")).toBe(false);
      expect(stepLinks.eq(1).hasClass("disabled")).toBe(false);
      expect(stepLinks.eq(1).hasClass("current")).toBe(true);
      expect(stepLinks.eq(1).hasClass("done")).toBe(false);
    });
    it("should set step links to done once moved to previous", function () {

      angular.element(actions[1]).triggerHandler("click");
      angular.element(actions[0]).triggerHandler("click");

      expect(stepLinks.eq(0).hasClass("current")).toBe(true);
      expect(stepLinks.eq(0).hasClass("done")).toBe(false);
      expect(stepLinks.eq(0).hasClass("disabled")).toBe(false);
      expect(stepLinks.eq(1).hasClass("disabled")).toBe(false);
      expect(stepLinks.eq(1).hasClass("current")).toBe(false);
      expect(stepLinks.eq(1).hasClass("done")).toBe(true);
    });
    it("should disable previous button initially", function () {
      expect(actions.eq(0).hasClass("disabled")).toBe(true);
    });
    it("should not perform previous action when disabled", function () {
      expect(actions.eq(0).hasClass("disabled")).toBe(true);
      expect(stepLinks.eq(0).hasClass("current")).toBe(true);
      expect(stepLinks.eq(0).hasClass("done")).toBe(false);
      expect(stepLinks.eq(0).hasClass("disabled")).toBe(false);

      angular.element(actions[0]).triggerHandler("click");

      expect(stepLinks.eq(0).hasClass("current")).toBe(true);
      expect(stepLinks.eq(0).hasClass("done")).toBe(false);
      expect(stepLinks.eq(0).hasClass("disabled")).toBe(false);

    });
    it("should display finish on last step", function () {
      angular.element(actions[1]).triggerHandler("click");
      angular.element(actions[1]).triggerHandler("click");
      expect(actions.eq(1).hasClass("hide")).toBe(true);
      expect(actions.eq(2).hasClass("show")).toBe(true);
    });
    describe("optional events", function () {
      beforeEach(function () {
        $scope.onChanging = function () {};
        $scope.onFinishing = function () {};
        $scope.onFinished = function () {};
        $scope.onCanceled = function () {};
        spyOn($scope, "onChanging").and.returnValue(true);
        spyOn($scope, "onFinishing").and.returnValue(true);
        spyOn($scope, "onFinished");
        spyOn($scope, "onCanceled");

        element = $compile('<wizard on-changing="onChanging(from,to)" on-finishing="onFinishing()" on-finished="onFinished()" on-canceled="onCanceled()">\n' +
          ' <step ng-repeat="item in steps">\n' +
          '   <step-heading>\n' +
          '      <span ng-bind="item.title"></span>\n' +
          '    </step-heading>\n' +
          '   <p ng-bind="item.content"></p>\n' +
          ' </step>\n' +
          '</wizard>')($scope);

        $scope.$digest();
        actions = getActions();
        stepLinks = getStepLinks();

      });
      it("should call onChanging function when next is clicked", function () {
        angular.element(actions[1]).triggerHandler("click");
        expect($scope.onChanging).toHaveBeenCalled();
        expect($scope.onChanging).toHaveBeenCalledWith(0, 1);
      });
      it("should call onChanging function when previous is clicked", function () {
        angular.element(actions[1]).triggerHandler("click");
        $scope.onChanging.calls.reset();
        angular.element(actions[0]).triggerHandler("click");
        expect($scope.onChanging).toHaveBeenCalled();
        expect($scope.onChanging).toHaveBeenCalledWith(1, 0);
      });
      it("should call onFinishing and onFinished function when finished is clicked", function () {
        angular.element(actions[1]).triggerHandler("click");
        angular.element(actions[2]).triggerHandler("click");
        expect($scope.onFinishing).toHaveBeenCalled();
        expect($scope.onFinished).toHaveBeenCalled();
      });
      it("should set current step to error not move to next step if onChanging returns false", function () {
        $scope.onChanging.and.returnValue(false);
        angular.element(actions[1]).triggerHandler("click");
        expect($scope.onChanging).toHaveBeenCalled();
        expect(stepLinks.eq(0).hasClass("current")).toBe(true);
        expect(stepLinks.eq(0).hasClass("done")).toBe(false);
        expect(stepLinks.eq(0).hasClass("disabled")).toBe(false);
        expect(stepLinks.eq(0).hasClass("error")).toBe(true);
        expect(stepLinks.eq(1).hasClass("disabled")).toBe(true);
        expect(stepLinks.eq(1).hasClass("current")).toBe(false);
        expect(stepLinks.eq(1).hasClass("done")).toBe(false);
      });
      it("should change to the specified step if onChanging returns a number", function () {
        $scope.onChanging.and.returnValue(2);
        angular.element(actions[1]).triggerHandler("click");
        expect($scope.onChanging).toHaveBeenCalled();
        expect(stepLinks.eq(0).hasClass("current")).toBe(false);
        expect(stepLinks.eq(0).hasClass("done")).toBe(true);
        expect(stepLinks.eq(0).hasClass("error")).toBe(false);
        expect(stepLinks.eq(1).hasClass("current")).toBe(false);
        expect(stepLinks.eq(1).hasClass("done")).toBe(false);
        expect(stepLinks.eq(2).hasClass("current")).toBe(true);
        expect(stepLinks.eq(2).hasClass("done")).toBe(false);
      });

      it("should set current step to error and not call onFinished if onFinishing returns false ", function () {
        $scope.onFinishing.and.returnValue(false);
        angular.element(actions[1]).triggerHandler("click");
        angular.element(actions[2]).triggerHandler("click");
        expect($scope.onFinishing).toHaveBeenCalled();
        expect($scope.onFinished).not.toHaveBeenCalled();
        expect(stepLinks.eq(1).hasClass("error")).toBe(true);
        expect(stepLinks.eq(1).hasClass("disabled")).toBe(false);
        expect(stepLinks.eq(1).hasClass("current")).toBe(true);
        expect(stepLinks.eq(1).hasClass("done")).toBe(false);
      });
    });

    describe("step removal", function () {
      it("should not change active step when non active step is removed", function () {
        steps.splice(1, 1);
        $scope.$digest();
        expect(getStepLinks().length).toBe(steps.length);
        expect($(element).find(".body").length).toBe(steps.length);
        expect(getStepLinks().eq(0).hasClass("current")).toBe(true);
      });
      it("should change active step to next element when first step is active and removed", function () {
        steps.splice(0, 1);
        $scope.$digest();
        expect(getStepLinks().length).toBe(steps.length);
        expect($(element).find(".body").length).toBe(steps.length);
        expect(getStepLinks().eq(0).hasClass("current")).toBe(true);
      });
      it("should change active step to next element when active step is removed", function () {
        angular.element(actions[1]).triggerHandler("click");
        expect(stepLinks.eq(1).hasClass("current")).toBe(true);
        steps.splice(1, 1);
        $scope.$digest();
        expect(getStepLinks().length).toBe(steps.length);
        expect($(element).find(".body").length).toBe(steps.length);
        expect(getStepLinks().eq(1).hasClass("current")).toBe(true);
      });
      it("should change active step to previous element when last step is active is removed", function () {
        angular.element(actions[1]).triggerHandler("click");
        angular.element(actions[1]).triggerHandler("click");
        expect(stepLinks.eq(2).hasClass("current")).toBe(true);
        steps.splice(2, 1);
        $scope.$digest();
        expect(getStepLinks().length).toBe(steps.length);
        expect($(element).find(".body").length).toBe(steps.length);
        expect(getStepLinks().eq(1).hasClass("current")).toBe(true);
      });

    });
    describe("clicking on done step", function () {
      beforeEach(function () {
        steps.push({
          title: "title3",
          content: "content3"
        });
        $scope.$digest();
        stepLinks = getStepLinks();
        actions = getActions();
      });
      it("should take you to the clicked step", function () {
        angular.element(actions[1]).triggerHandler("click");
        angular.element(stepLinks.eq(0).find("a")[0]).triggerHandler("click");
        expect(stepLinks.eq(0).hasClass("current")).toBe(true);
      });
      it("should take you to the clicked step, last step", function () {
        angular.element(actions[1]).triggerHandler("click");
        angular.element(actions[1]).triggerHandler("click");
        angular.element(actions[0]).triggerHandler("click");
        angular.element(actions[0]).triggerHandler("click");
        angular.element(stepLinks.eq(2).find("a")[0]).triggerHandler("click");
        expect(stepLinks.eq(2).hasClass("current")).toBe(true);
      });
      describe("with on change event", function () {
        beforeEach(function () {
          $scope.onChanging = function (from) {
            return from !== 1;
          };

          spyOn($scope, "onChanging").and.callThrough();

          element = $compile('<wizard on-changing="onChanging(from,to)">\n' +
            ' <step ng-repeat="item in steps">\n' +
            '   <step-heading>\n' +
            '      <span ng-bind="item.title"></span>\n' +
            '    </step-heading>\n' +
            '   <p ng-bind="item.content"></p>\n' +
            ' </step>\n' +
            '</wizard>')($scope);

          $scope.$digest();
          actions = getActions();
          stepLinks = getStepLinks();

        });
        it("should not allow movement back if current step is invalid", function () {
          angular.element(actions[1]).triggerHandler("click"); //click next
          $scope.onChanging.calls.reset();
          angular.element(stepLinks.eq(0).find("a")[0]).triggerHandler("click");
          expect($scope.onChanging).toHaveBeenCalled();
          expect(stepLinks.eq(1).hasClass("current")).toBe(true);
          expect(stepLinks.eq(1).hasClass("error")).toBe(true);


        });
      });
    });
    describe("changing step", function () {
      it("should change content", function () {
        angular.element(actions[1]).triggerHandler("click");
        var bodies = $(element).find(".body");
        expect(bodies.eq(1).hasClass("show")).toBe(true);
        expect(bodies.eq(0).hasClass("show")).toBe(false);
      });
    });

  });
  describe("wizard element dynamic steps", function () {

    var steps;

    describe("modify steps", function () {
      beforeEach(function () {

        $scope = $rootScope.$new();
        steps = [{
          title: "title1",
          content: "content1"
        }, {
          title: "title2",
          content: "content2"
        }, {
          title: "title3",
          content: "content3"
        }];


        $scope.steps = steps;

        $scope.onChanging = function () {

        };

        element = $compile('<wizard on-changing="onChanging(from,to)">\n' +
          ' <step ng-repeat="item in steps">\n' +
          '   <step-heading>\n' +
          '      <span ng-bind="item.title"></span>\n' +
          '    </step-heading>\n' +
          '   <p ng-bind="item.content"></p>\n' +
          ' </step>\n' +
          '</wizard>')($scope);

        $scope.$digest();
        actions = getActions();
        stepLinks = getStepLinks();

      });
      it("should allow step removal from onChange", function () {
        spyOn($scope, "onChanging").and.callFake(function () {
          $scope.steps.splice(1, 1);
          return true;
        });
        angular.element(actions[1]).triggerHandler("click");
        stepLinks = getStepLinks();
        expect(stepLinks.length).toBe(2);
        var bodies = $(element).find(".body");
        expect($.trim(bodies.eq(1).text())).toBe(steps[1].content);
        expect(bodies.eq(1).hasClass("show")).toBe(true);
      });
      it("should allow step addition from onChange", function () {
        spyOn($scope, "onChanging").and.callFake(function () {
          $scope.steps.push({
            title: "title4",
            content: "content4"
          });
          return true;
        });
        angular.element(actions[1]).triggerHandler("click");
        stepLinks = getStepLinks();
        expect(stepLinks.length).toBe(4);
        var bodies = $(element).find(".body");
        expect($.trim(bodies.eq(1).text())).toBe(steps[1].content);
        expect(bodies.eq(1).hasClass("show")).toBe(true);
      });
      it("should allow step insertion from onChange", function () {
        spyOn($scope, "onChanging").and.callFake(function () {
          $scope.steps.splice(1, 0, {
            title: "title4",
            content: "content4"
          });
          return true;
        });
        angular.element(actions[1]).triggerHandler("click");
        stepLinks = getStepLinks();
        expect(stepLinks.length).toBe(4);
        var bodies = $(element).find(".body");
        expect($.trim(bodies.eq(1).text())).toBe(steps[1].content);
        expect(bodies.eq(1).hasClass("show")).toBe(true);
      });
    });
  });


});