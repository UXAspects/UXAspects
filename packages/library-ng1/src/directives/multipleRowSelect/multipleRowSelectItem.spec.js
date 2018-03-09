describe("multiple row select item", function () {
  var $compile, element, provider, scope;
  var getId = function (item) {
    return item.item.id;
  };
  var onDeselect = jasmine.createSpy('onDeselect'),
    onSelect = jasmine.createSpy('onSelect'),
    template = "<table><tr ng-repeat='item in items' class='r{{item.id}}' multiple-row-select-item='item'></tr></table>";
  beforeEach(module("ux-aspects.multipleSelect"));
  beforeEach(module("ux-aspects.multipleListSelect"));
  beforeEach(module("ux-aspects.multipleRowSelect"));
  beforeEach(inject(function (_$compile_, _$rootScope_, _multipleSelectProvider_) {
    $compile = _$compile_;
    scope = _$rootScope_.$new();
    provider = _multipleSelectProvider_;
    scope.items = [
      { id: 1, name: "A" },
      { id: 2, name: "B" },
      { id: 3, name: "C" }
    ];
    onDeselect.calls.reset();
    onSelect.calls.reset();
    provider.onSelect = onSelect;
    provider.onDeselect = onDeselect;
    provider.keyFn = getId;


  }));
  describe("selection", function () {
    beforeEach(function () {
      element = $compile(template)(scope);
      scope.$digest();
    });
    it("should select one item on click", function () {
      expect(provider.selectedItems.length).toBe(0);
      var row = element.find("tr.r1");
      row.click();
      scope.$digest();
      expect(provider.selectedItems.length).toBe(1);
      expect(provider.selectedItems[0]).toBe(1);
    });
    it("should create a new selection on click", function () {
      expect(provider.selectedItems.length).toBe(0);
      element.find("tr.r1").click();
      element.find("tr.r2").click();
      expect(provider.selectedItems.length).toBe(1);
      expect(provider.selectedItems[0]).toBe(2);
    });
    it("should extend a selection on ctrl click", function () {
      expect(provider.selectedItems.length).toBe(0);
      element.find("tr.r1").click();
      element.find("tr.r2").trigger(ctrlClick());
      expect(provider.selectedItems.length).toBe(2);
    });
    it("should toggle selection on ctrl click", function () {
      expect(provider.selectedItems.length).toBe(0);
      element.find("tr.r1").click();
      element.find("tr.r2").trigger(ctrlClick());
      element.find("tr.r1").trigger(ctrlClick());
      expect(provider.selectedItems.length).toBe(1);
      expect(provider.selectedItems[0]).toBe(2);
    });

    it("should select a range on shift click", function() {
      expect(provider.selectedItems.length).toBe(0);
      element.find("tr.r1").click();
      element.find("tr.r3").trigger(shiftClick());
      expect(provider.selectedItems.length).toBe(3);

    });

    it("should extend a range on shift click in the same direction", function() {
      expect(provider.selectedItems.length).toBe(0);
      element.find("tr.r1").click();
      element.find("tr.r2").trigger(shiftClick());
      expect(provider.selectedItems.length).toBe(2);

      element.find("tr.r3").trigger(shiftClick());
      expect(provider.selectedItems.length).toBe(3);

    });

    it("should replace a range on shift click in the opposite direction", function() {
      expect(provider.selectedItems.length).toBe(0);
      element.find("tr.r1").click();
      element.find("tr.r3").trigger(shiftClick());
      expect(provider.selectedItems.length).toBe(3);

      element.find("tr.r2").trigger(shiftClick());
      expect(provider.selectedItems.length).toBe(2);

    });

  });

  function shiftClick() {
    var e = jQuery.Event("click");
    e.shiftKey = true;
    return e;
  }
  function ctrlClick() {
    var e = jQuery.Event("click");
    e.ctrlKey = true;
    return e;
  }

});
