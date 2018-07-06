describe('single line overflow tooltip', function () {
  var $compile, $rootScope, $timeout;

  beforeEach(module("ux-aspects.overflowTooltip"));

  beforeEach(function () {

    inject(function (_$compile_, _$rootScope_, _$timeout_) {
      $compile = _$compile_;
      $rootScope = _$rootScope_;
      $timeout = _$timeout_;
    });
  });

  function create() {
    var $scope = $rootScope.$new();
    var html = '<p style="width:10px; height:10px; display:inline-block;" single-line-overflow-tooltip>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>';
    var element = $compile(html)($scope);
    $scope.$digest();
    $timeout.flush();
    return {
      element: element,
      scope: $scope
    };
  }

  it('should remove tooltip on destroy', function () {
    var directive = create();
    expect(directive.element.data()["bs.tooltip"]).toBeTruthy();
    directive.scope.$destroy();
    expect(directive.element.data()["bs.tooltip"]).not.toBeTruthy();
  });

});