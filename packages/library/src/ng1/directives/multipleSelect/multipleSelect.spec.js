describe("multiple select provider", function () {
  var provider;
  var getItem = function (id) {
    return {
      id: id,
      name: "item" + id
    };
  };

  var getId = function (item) {
    return item.item.id;
  };

  var onDeselect = jasmine.createSpy('onDeselect');
  var onSelect = jasmine.createSpy('onSelect');

  beforeEach(module("ux-aspects.multipleSelect"));
  beforeEach(inject(function (_multipleSelectProvider_) {
    provider = _multipleSelectProvider_;
    provider.onDeselect = onDeselect;
    provider.onSelect = onSelect;
    provider.keyFn = getId;
    provider.cancel(); //clear down and set everything
    onDeselect.calls.reset();
    onSelect.calls.reset();
  }));

  it("should update count correctly when items are in selected", function () {
    provider.selectedItems.push(getItem(1));
    provider.selectedItems.push(getItem(2));
    provider.updateCount();
    expect(provider.state.count).toBe(2);

  });

  it("should update count when there are no items", function () {
    provider.selectedItems.push(getItem(1));
    provider.selectedItems.push(getItem(2));
    provider.updateCount();
    expect(provider.state.count).toBe(2);
    provider.selectedItems.pop();
    provider.selectedItems.pop();
    provider.updateCount();
    expect(provider.state.count).toBe(0);
  });

  it("should select when item is first selected", function () {
    var item = getItem(1);
    provider.itemClicked(item);
    expect(provider.state.count).toBe(1);
    expect(provider.onSelect).toHaveBeenCalled();
  });

  it("should desselect when item is clicked twice", function () {
    var item = getItem(1);
    provider.itemClicked(item);
    provider.itemClicked(item);
    expect(provider.state.count).toBe(0);
    expect(provider.onSelect).toHaveBeenCalled();
    expect(provider.onDeselect).toHaveBeenCalled();
  });

  it("should update count to total when select all", function () {

    provider.total = 10;
    provider.selectAll();
    expect(provider.state.count).toBe(10);
    expect(provider.onSelect).toHaveBeenCalled();
  });

  it("should update selected when select all", function () {
    var item = getItem(1);
    provider.itemClicked(item);
    provider.selectAll();
    expect(provider.selectedItems.length).toBe(0);
    expect(provider.deselectedItems.length).toBe(0);
    expect(provider.onSelect).toHaveBeenCalled();
  });

  it("should deselecet items after select all", function () {
    var item = getItem(1);
    provider.total = 10;
    provider.selectAll();
    provider.itemClicked(item);

    expect(provider.selectedItems.length).toBe(0);
    expect(provider.deselectedItems.length).toBe(1);
    expect(provider.state.count).toBe(9);
    expect(provider.onDeselect).toHaveBeenCalled();
  });

  it("should know if an item is selected or deselected when in select all", function () {
    var item = getItem(1);
    provider.total = 10;
    provider.selectAll();
    expect(provider.isSelected(item)).toBe(true);

    provider.itemClicked(item);
    expect(provider.isSelected(item)).toBe(false);
  });
});