describe('single line overflow tooltip', function () {
  var $compile, $rootScope;

  beforeEach(module("ux-aspects.overflowTooltip"));

  beforeEach(function () {

    inject(function (_$compile_, _$rootScope_) {
      $compile = _$compile_;
      $rootScope = _$rootScope_;
    });
  });

  function create() {
    var $scope = $rootScope.$new();
    var html = '<p style="width:10px; height:10px; display:inline-block;" single-line-overflow-tooltip>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>';
    var element = $compile(html)($scope);
    $scope.$digest();
    return {
      element: element,
      scope: $scope
    };
  }

  it('should remove tooltip on destroy', function (done) {
    var directive = create();

    setTimeout(() => {
      expect(directive.element.data()["bs.tooltip"]).toBeTruthy();
      directive.scope.$destroy();
      expect(directive.element.data()["bs.tooltip"]).not.toBeTruthy();
      done();
    }, 1);
  });

});