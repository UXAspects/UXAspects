describe("multiple select actions", function () {
  var $compile, element, provider, scope;

  var getId = function (item) {
    return item.id;
  };

  var name1 = "action1",
    name2 = "action2",
    action1 = jasmine.createSpy('action1'),
    action2 = jasmine.createSpy('action2'),
    onDeselect = jasmine.createSpy('onDeselect'),
    onSelect = jasmine.createSpy('onSelect'),
    template = "<div class='affix-container'>\n" +
    " <div class='affix-toolbar'>\n" +
    "   <multiple-select-actions on-select='onSelect(item)' on-deselect='onDeselect(item)' key-fn='keyFn(item)' total='total'>\n" +
    "     <div class='actions'>\n" +
    "       <multiple-select-action action='action1()' name='{{name1}}'>Action1</multiple-select-action>\n" +
    "       <multiple-select-action action='action2()' name='{{name2}}'>Action2</multiple-select-action>\n" +
    "     </div>\n" +
    "   </multiple-select-actions>\n" +
    " </div>\n" +
    "</div>\n";


  beforeEach(module("ux-aspects.multipleSelect"));

  beforeEach(inject(function (_$compile_, _$rootScope_, _multipleSelectProvider_) {
    $compile = _$compile_;
    scope = _$rootScope_.$new();
    provider = _multipleSelectProvider_;
    scope.name1 = name1;
    scope.name2 = name2;
    scope.action1 = action1;
    scope.action2 = action2;
    scope.keyFn = getId;
    scope.total = 10;
    scope.onDeselect = onDeselect;
    scope.onSelect = onSelect;
    onDeselect.calls.reset();
    onSelect.calls.reset();
    action1.calls.reset();
    action2.calls.reset();
    element = $compile(template)(scope);
    scope.$digest();

  }));

  it("should enter selection mode", function () {
    element.find(".btn").eq(0).click();
    scope.$digest();
    expect(element.find(".actions").parent().hasClass("ng-hide")).toBe(true);
    expect(element.find(".button-primary").text()).toBe(name1);
  });

  it("should exit selection mode", function () {
    element.find(".btn").eq(0).click();
    scope.$digest();
    expect(element.find(".actions").parent().hasClass("ng-hide")).toBe(true);
    element.find(".cancel-btn").click();
    scope.$digest();
    expect(element.find(".actions").parent().hasClass("ng-hide")).toBe(false);
  });

  it("should call action which action is confirmed", function () {
    element.find(".btn").eq(0).click();
    scope.$digest();
    element.find(".button-primary").click();
    scope.$digest();
    expect(action1).toHaveBeenCalled();
  });

  it("should select all when clicked and display select none", function () {
    spyOn(provider, "selectAll").and.callThrough();
    element.find(".btn").eq(0).click();
    scope.$digest();
    expect(element.find(".multiple-select-link").eq(0).text()).toContain(provider.selectAllText);
    element.find(".multiple-select-link").eq(0).click();
    scope.$digest();
    expect(provider.selectAll).toHaveBeenCalled();
    expect(element.find("b").text()).toBe("10");
    expect(element.find(".multiple-select-link").eq(0).text()).toContain(provider.selectNoneText);
  });

  it("should display select all as soon as a single item is deselected", function () {
    element.find(".btn").eq(0).click();
    scope.$digest();
    element.find(".multiple-select-link").eq(0).click();
    provider.itemClicked({
      id: 1
    });
    scope.$digest();
    expect(element.find("b").text()).toBe("9");
    expect(element.find(".multiple-select-link").eq(0).text()).toContain(provider.selectAllText);
  });

  it("should reset to 0 and display select all when select none is clicked", function () {
    spyOn(provider, "selectNone").and.callThrough();
    element.find(".btn").eq(0).click();
    scope.$digest();
    element.find(".multiple-select-link").eq(0).click();
    scope.$digest();
    element.find(".multiple-select-link").eq(0).click();
    scope.$digest();
    expect(provider.selectNone).toHaveBeenCalled();
    expect(element.find(".multiple-select-link").eq(0).text()).toContain(provider.selectAllText);
  });
});