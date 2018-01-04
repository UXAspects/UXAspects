describe("multiple select item", function () {
  var $compile, element, provider, scope, item;

  var getId = function (item) {
    return item.item.id;
  };

  var onDeselect = jasmine.createSpy('onDeselect'),
    onSelect = jasmine.createSpy('onSelect'),
    template = "<div class='item' multiple-select-item='item'></div>";

  beforeEach(module("ux-aspects.multipleSelect"));
  beforeEach(inject(function (_$compile_, _$rootScope_, _multipleSelectProvider_) {

    $compile = _$compile_;
    scope = _$rootScope_.$new();
    provider = _multipleSelectProvider_;
    scope.item = item = {
      id: 1,
      name: "name"
    };

    onDeselect.calls.reset();
    onSelect.calls.reset();
    provider.onSelect = onSelect;
    provider.onDeselect = onDeselect;
    provider.keyFn = getId;

  }));
  describe("nothing selected to start", function () {
    beforeEach(function () {
      element = $compile(template)(scope);
      scope.$digest();
    });

    it("should add class if its in selecting mode", function () {
      expect(element.hasClass("multiple-select-item--selecting")).not.toBe(true);
      provider.state.selecting = true;
      scope.$digest();
      expect(element.hasClass("multiple-select-item--selecting")).toBe(true);
    });

    it("should add class if its selected", function () {
      provider.state.selecting = true;
      scope.$digest();
      expect(element.hasClass("multiple-select-item--selected")).not.toBe(true);
      element.click();
      scope.$digest();
      expect(element.hasClass("multiple-select-item--selected")).toBe(true);
    });

    it("should remove class if its selected", function () {
      provider.state.selecting = true;
      scope.$digest();
      expect(element.hasClass("multiple-select-item--selected")).not.toBe(true);
      element.click();
      scope.$digest();
      expect(element.hasClass("multiple-select-item--selected")).toBe(true);
      element.click();
      scope.$digest();
      expect(element.hasClass("multiple-select-item--selected")).not.toBe(true);
    });

    it("should remove class selection mode is left", function () {
      provider.state.selecting = true;
      scope.$digest();
      expect(element.hasClass("multiple-select-item--selecting")).toBe(true);
      provider.state.selecting = false;
      scope.$digest();
      expect(element.hasClass("multiple-select-item--selecting")).not.toBe(true);
    });

    it("should remove all classes selection mode is left", function () {
      provider.state.selecting = true;
      scope.$digest();
      element.click();
      scope.$digest();
      expect(element.hasClass("multiple-select-item--selecting")).toBe(true);
      expect(element.hasClass("multiple-select-item--selected")).toBe(true);
      provider.state.selecting = false;
      scope.$digest();
      expect(element.hasClass("multiple-select-item--selecting")).not.toBe(true);
      expect(element.hasClass("multiple-select-item--selected")).not.toBe(true);
    });

    it("should select all when select all is clicked  ", function () {
      provider.state.selecting = true;
      scope.$digest();
      expect(element.hasClass("multiple-select-item--selecting")).toBe(true);
      expect(element.hasClass("multiple-select-item--selected")).not.toBe(true);

      provider.selectAll();
      scope.$digest();

      expect(element.hasClass("multiple-select-item--selected")).toBe(true);
    });

    it("should select none when select none is clicked", function () {
      provider.state.selecting = true;
      scope.$digest();
      provider.selectAll();
      scope.$digest();
      expect(element.hasClass("multiple-select-item--selected")).toBe(true);
      provider.selectNone();
      scope.$digest();

      expect(element.hasClass("multiple-select-item--selected")).not.toBe(true);
    });

    it("should stay selected when select all is clicked", function () {
      provider.state.selecting = true;
      scope.$digest();
      element.click();
      scope.$digest();
      expect(element.hasClass("multiple-select-item--selecting")).toBe(true);
      expect(element.hasClass("multiple-select-item--selected")).toBe(true);
      provider.selectAll();
      scope.$digest();
      expect(element.hasClass("multiple-select-item--selected")).toBe(true);
    });

    it("should deselected when clicked after select all", function () {
      provider.state.selecting = true;
      scope.$digest();
      provider.selectAll();
      scope.$digest();
      expect(element.hasClass("multiple-select-item--selecting")).toBe(true);
      expect(element.hasClass("multiple-select-item--selected")).toBe(true);
      element.click();
      scope.$digest();
      expect(element.hasClass("multiple-select-item--selected")).not.toBe(true);
    });

    it("should stay deselected when select none is clicked.", function () {
      provider.state.selecting = true;
      scope.$digest();
      provider.selectAll();
      scope.$digest();
      element.click();
      scope.$digest();
      expect(element.hasClass("multiple-select-item--selected")).not.toBe(true);

      provider.selectNone();
      scope.$digest();
      expect(element.hasClass("multiple-select-item--selected")).not.toBe(true);
    });
  });

  describe("item already selected", function () {
    beforeEach(function () {
      provider.state.selecting = true;
      provider.selectedItems.push(1);
      element = $compile(template)(scope);
      scope.$digest();
    });
    it("should set the classes correctly if item is already selected", function () {
      expect(element.hasClass("multiple-select-item--selecting")).toBe(true);
      expect(element.hasClass("multiple-select-item--selected")).toBe(true);
    });
    it("should still click to deselect", function () {
      expect(element.hasClass("multiple-select-item--selecting")).toBe(true);
      expect(element.hasClass("multiple-select-item--selected")).toBe(true);
      element.click();
      scope.$digest();
      expect(element.hasClass("multiple-select-item--selecting")).toBe(true);
      expect(element.hasClass("multiple-select-item--selected")).not.toBe(true);
    });

  });


});