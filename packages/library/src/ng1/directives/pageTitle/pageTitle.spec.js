describe('pageTitle directive', function() {

  var $compile, $rootScope, element;

  beforeEach(module("ux-aspects.pageTitle"));

  beforeEach(inject(function(_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  beforeEach(function() {
    element = $compile("<div page-title='hello'></div>")($rootScope);
  });

  it("should display default title", function() {
    $rootScope.$broadcast("$stateChangeStart", {}, {}, {});
    expect(element.text()).toBe("hello");
  });

  it("should display updated title", function() {
    $rootScope.$broadcast("$stateChangeStart", { data: { pageTitle:'test' } }, {});
    expect(element.text()).toBe("test");
  });

});