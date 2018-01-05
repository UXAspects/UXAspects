describe('tag input control', function () {
  var $compile, $rootScope, element, $scope;

  beforeEach(module("ux-aspects.tagInput"));
  beforeEach(module("ux-aspects.safeTimeout"));

  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();
  }));

  var enterKeypressEvent = jQuery.Event("keydown", {
    which: 13,
    keyCode: 13
  });
  var backspaceKeypressEvent = jQuery.Event("keydown", {
    which: 8,
    keyCode: 8
  });

  describe("tag input control", function () {
    beforeEach(function () {

      $scope.tags = ["demo0"];
      $scope.options = {};
      $scope.fullTagSet = ["demo1", "demo2", "demo3"];
      $scope.disabled = false;

      $scope.api = {
        onTagAdding: jasmine.createSpy(),
        onTagAdded: jasmine.createSpy(),
        onInvalidTag: jasmine.createSpy(),
        onTagRemoving: jasmine.createSpy(),
        onTagRemoved: jasmine.createSpy(),
        onTagClicked: jasmine.createSpy()
      };

      var html = '<tag-input tags="tags" full-tag-set="fullTagSet" options="options" ng-disabled="disabled"></tag-input>';

      element = $compile(html)($scope);

      $scope.$digest();
    });

    describe("Loading", function () {

      it('should start with the preset tags loaded', function () {
        expect(element.find(".tag-list li").length).toBe(1);
        expect(element.find(".tag-list li ti-tag-item span").text()).toBe("demo0");
      });

    });

    describe("Adding", function () {

      it('should add a new tag', function () {
        var input = element.find("input");
        input.val("demo-new").trigger("input");
        $scope.$digest();
        input.trigger(enterKeypressEvent);
        $scope.$digest();
        expect(element.scope().tags[1].text).toBe("demo-new");
      });

      it('should expose the new tag to the parent scope', function () {

        expect($scope.tags.length).toBe(1);

        var input = element.find("input");
        input.val("demo-new").trigger("input");
        $scope.$digest();
        input.trigger(enterKeypressEvent);
        $scope.$digest();
        expect(element.scope().tags[1].text).toBe("demo-new");

        expect($scope.tags.length).toBe(2);

      });

    });

    describe("Removing", function () {

      it('should remove after double back space', function () {
        var input = element.find("input");
        input.focus();
        $scope.$digest();
        input.trigger(backspaceKeypressEvent);
        $scope.$digest();
        expect(element.find("li.selected").length).toBe(1);
        input.trigger(backspaceKeypressEvent);
        $scope.$digest();
        expect(element.scope().tags.length).toBe(0);

      });

      it('should remove when clicking the X', function () {
        var x = element.find("a.remove-button");
        x.trigger("click");
        $scope.$digest();
        expect(element.scope().tags.length).toBe(0);
      });

    });

    describe("Autocomplete forced", function () {

      var element_autocomplete_forced;

      beforeEach(function () {

        var $scope = $rootScope.$new();
        $scope.tags = ["demo0"];
        $scope.options = {
          autocomplete: {
            addFromAutocompleteOnly: true,
            delay: 0
          }
        };
        $scope.fullTagSet = ["demo1", "demo2", "demo3"];

        var html = '<tag-input tags="tags" full-tag-set="fullTagSet" options="options"></tag-input>';

        element_autocomplete_forced = $compile(html)($scope);

        $scope.$digest();
      });

      it('should force autocomplete only', function () {
        var input = element_autocomplete_forced.find("input");
        input.val("this text is not in the dropdown").trigger("input");
        $scope.$digest();

        var autocompleteList = element_autocomplete_forced.find("tags-input").scope().ti.loadTags("this text is not in the dropdown");

        var result;
        autocompleteList.then(function (data) {
          result = data;
        });
        $scope.$digest();
        expect(result.length).toBe(0);

        input.trigger(enterKeypressEvent);
        $scope.$digest();
        expect(element_autocomplete_forced.scope().tags.length).toBe(1);
      });

    });

    describe("Autocomplete supported", function () {

      var element_autocomplete_supported;

      beforeEach(function () {

        var $scope = $rootScope.$new();
        $scope.tags = ["demo0"];
        $scope.options = {
          autocomplete: {
            addFromAutocompleteOnly: false,
            delay: 0
          }
        };
        $scope.fullTagSet = ["demo1", "demo2", "demo3"];

        var html = '<tag-input tags="tags" full-tag-set="fullTagSet" options="options"></tag-input>';

        element_autocomplete_supported = $compile(html)($scope);

        $scope.$digest();
      });

      it('should allow freeform typing ', function () {
        var input = element_autocomplete_supported.find("input");
        input.val("this text is not in the dropdown").trigger("input");
        $scope.$digest();

        var autocompleteList = element_autocomplete_supported.find("tags-input").scope().ti.loadTags("this text is not in the dropdown");

        var result;
        autocompleteList.then(function (data) {
          result = data;
        });
        $scope.$digest();
        expect(result.length).toBe(0);

        input.trigger(enterKeypressEvent);
        $scope.$digest();
        expect(element_autocomplete_supported.scope().tags.length).toBe(2);
      });

      it('should support autocomplete', function () {
        var input = element_autocomplete_supported.find("input");
        input.val("demo").trigger("input");
        $scope.$digest();

        var autocompleteList = element_autocomplete_supported.find("tags-input").scope().ti.loadTags("demo");

        var result;
        autocompleteList.then(function (data) {
          result = data;
        });
        $scope.$digest();
        expect(result.length).toBe(3);
      });

    });

    describe("Autocomplete off", function () {

      it('should allow freeform typing ', function () {
        var input = element.find("input");
        input.val("new item").trigger("input");
        $scope.$digest();
        input.trigger(enterKeypressEvent);
        $scope.$digest();
        expect(element.scope().tags[1].text).toBe("new item");
      });

    });

    describe("Max tags reached", function () {

      var element_max_tags_reached;

      beforeEach(function () {

        var $scope = $rootScope.$new();
        $scope.tags = ["demo0"];
        $scope.options = {
          placeholder: "Add tag",
          maxNumberTags: 1,
          maxTagsMessage: "Maximum number of tags has been added",
          autocomplete: {
            addFromAutocompleteOnly: true,
            delay: 0,
            minLength: 1
          }
        };
        $scope.fullTagSet = ["demo1", "demo2"];

        var html = '<tag-input tags="tags" full-tag-set="fullTagSet" options="options"></tag-input>';

        element_max_tags_reached = $compile(html)($scope);

        $scope.$digest();
      });

      it('should show max tags message', function () {
        var input = element_max_tags_reached.find("input");
        var message = element_max_tags_reached.find(".text-warning");
        expect(message[0].classList.contains("ng-hide")).toBe(true);
        element_max_tags_reached.find("tags-input").scope().ti.updateMessage("a");
        $scope.$digest();
        expect(message[0].classList.contains("ng-hide")).toBe(false);
        input.focus();
        $scope.$digest();
        input.trigger(backspaceKeypressEvent);
        $scope.$digest();
        input.trigger(backspaceKeypressEvent);
        $scope.$digest();
        element_max_tags_reached.find("tags-input").scope().ti.updateMessage("a");
        $scope.$digest();
        expect(message[0].classList.contains("ng-hide")).toBe(true);
      });

    });

    describe("Max tags reached and maxTagsHidden", function () {

      var element_max_tags_reached;

      beforeEach(function () {

        var $scope = $rootScope.$new();
        $scope.tags = ["demo0"];
        $scope.options = {
          placeholder: "Add tag",
          maxNumberTags: 1,
          maxTagsHidden: true,
          autocomplete: {
            addFromAutocompleteOnly: true,
            delay: 0,
            minLength: 1
          }
        };
        $scope.fullTagSet = ["demo1", "demo2"];

        var html = '<tag-input tags="tags" full-tag-set="fullTagSet" options="options"></tag-input>';

        element_max_tags_reached = $compile(html)($scope);

        $scope.$digest();
      });

      it('should hide placeholder', function () {
        var input = element_max_tags_reached.find("input");
        expect(input[0].placeholder).toBe("");
        input.focus();
        $scope.$digest();
        input.trigger(backspaceKeypressEvent);
        $scope.$digest();
        input.trigger(backspaceKeypressEvent);
        $scope.$digest();
        expect(input[0].placeholder).toBe("Add tag");
      });

    });


    describe("API", function () {

      var spy;

      beforeEach(function () {

        $scope.tags = ["demo0"];
        $scope.options = {};
        $scope.fullTagSet = ["demo1", "demo2", "demo3"];

        spy = jasmine.createSpy();

        $scope.api = {
          onTagAdding: function ($tag) {
            spy();
            if ($tag.text === "accept this one") {
              return true;
            }
            if ($tag.text === "reject this one") {
              return false;
            }
            return false;
          },
          onTagAdded: jasmine.createSpy(),
          onInvalidTag: jasmine.createSpy(),
          onTagRemoving: function ($tag) {
            spy();
            if ($tag.text === "accept this one") {
              return true;
            }
            if ($tag.text === "demo0") {
              return false;
            }
            return false;
          },
          onTagRemoved: jasmine.createSpy(),
          onTagClicked: jasmine.createSpy()
        };

        var html = '<tag-input tags="tags" full-tag-set="fullTagSet" api="api" options="options"></tag-input>';

        element = $compile(html)($scope);

        $scope.$digest();
      });

      it('should call add a tag when onTagAdding returns true', function () {
        var input = element.find("input");
        input.val("accept this one").trigger("input");
        $scope.$digest();
        expect(element.scope().tags.length).toBe(1);
        input.trigger(enterKeypressEvent);
        expect(spy).toHaveBeenCalled();
        $scope.$digest();
        expect(element.scope().tags.length).toBe(2);
      });

      it('should call not add a tag when onTagAdding returns false', function () {
        var input = element.find("input");
        input.val("reject this one").trigger("input");
        $scope.$digest();
        expect(element.scope().tags.length).toBe(1);
        input.trigger(enterKeypressEvent);
        expect(spy).toHaveBeenCalled();
        $scope.$digest();
        expect(element.scope().tags.length).toBe(1);
      });
      it('should call onTagAdded when a new tag is added', function () {
        expect(element.scope().tags.length).toBe(1);
        var input = element.find("input");
        input.val("accept this one").trigger("input");
        $scope.$digest();
        input.trigger(enterKeypressEvent);
        $scope.$digest();
        expect(element.scope().tags.length).toBe(2);
        expect($scope.api.onTagAdded).toHaveBeenCalledWith({
          text: "accept this one"
        });

      });
      it('should call onInvalidTag when a new tag is invalid', function () {
        expect(element.scope().tags.length).toBe(1);
        var input = element.find("input");
        input.val("accept this one").trigger("input");
        $scope.$digest();
        input.trigger(enterKeypressEvent);
        $scope.$digest();

        expect(element.scope().tags.length).toBe(2);
        input = element.find("input");
        input.val("accept this one").trigger("input");
        $scope.$digest();
        input.trigger(enterKeypressEvent);
        $scope.$digest();

        expect($scope.api.onInvalidTag).toHaveBeenCalledWith({
          text: "accept this one"
        });

        expect(element.scope().tags.length).toBe(2);

      });
      it('should call onTagRemoving before a tag is removed and not remove when returns false', function () {
        expect(element.scope().tags.length).toBe(1);
        var x = element.find("a.remove-button").last();
        x.trigger("click");
        $scope.$digest();
        expect(spy).toHaveBeenCalled();
        expect(element.scope().tags.length).toBe(1);
      });
      it('should call onTagRemoving before a tag is removed and remove when returns true', function () {
        var input = element.find("input");
        input.val("accept this one").trigger("input");
        $scope.$digest();
        expect(element.scope().tags.length).toBe(1);
        input.trigger(enterKeypressEvent);
        expect(spy).toHaveBeenCalled();
        $scope.$digest();
        expect(element.scope().tags.length).toBe(2);

        var x = element.find("a.remove-button").last();
        x.trigger("click");
        $scope.$digest();
        expect(spy).toHaveBeenCalled();
        expect(element.scope().tags.length).toBe(1);
        expect($scope.api.onTagRemoved).toHaveBeenCalled();
      });

      it('should call onTagClicked when a tag is clicked', function () {
        var tagItem = element.find("li.tag-item").last();
        tagItem.trigger("click");
        expect($scope.api.onTagClicked).toHaveBeenCalledWith({
          text: "demo0"
        });
      });

    });

    

    describe("disabled state", function () {

      beforeEach(function () {

        $scope.tags = ["demo0"];
        $scope.options = {};
        $scope.fullTagSet = ["demo1", "demo2", "demo3"];
        $scope.disabled = true;

        var html = '<tag-input tags="tags" full-tag-set="fullTagSet" options="options" ng-disabled="disabled"></tag-input>';

        element = $compile(html)($scope);

        $scope.$digest();
      });

      it('should prevent tags being removed', function () {
        expect(element.find(".tag-list li").length).toBe(1);
        expect(element.find(".tag-list li ti-tag-item span").text()).toBe("demo0");

        // Check that x button does not remove the tag in disabled state
        var x = element.find("a.remove-button").last();
        x.trigger("click");
        $scope.$digest();
        expect(element.scope().tags.length).toBe(1);

        // Check that backspace does not remove the tag
        var input = element.find("input");
        input.focus();
        $scope.$digest();
        input.trigger(backspaceKeypressEvent);
        $scope.$digest();
        expect(element.scope().tags.length).toBe(1);
      });

      it('should prevent input', function () {
        // Verify disabled input
        var input = element.find("input");
        expect(input.prop("disabled")).toBe(true);
      });

      it('should update disabled state from binding', function () {
        // Verify disabled input
        var input = element.find("input");
        expect(input.prop("disabled")).toBe(true);

        $scope.disabled = false;
        $scope.$digest();

        // Verify enabled input
        expect(input.prop("disabled")).toBe(false);

        // Check that the x button now removes the tag
        var x = element.find("a.remove-button").last();
        x.trigger("click");
        $scope.$digest();
        expect(element.scope().tags.length).toBe(0);
      });

    });

  });

});