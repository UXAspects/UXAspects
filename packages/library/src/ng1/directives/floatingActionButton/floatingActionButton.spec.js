describe('floating action button', function () {
  var $compile, $rootScope, $scope, elementBottom, elementRight, elementTop, elementLeft;

  beforeEach(module("ux-aspects.floatingActionButton"));

  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();

    $scope.selectFloatingActionButton = function () {};

    $scope.items = [{
      icon: "hp-add",
      event: $scope.selectFloatingActionButton
    }, {
      icon: "hp-analytics",
      event: $scope.selectFloatingActionButton
    }, {
      icon: "hp-app",
      event: $scope.selectFloatingActionButton
    }];

    var htmlBottom = '<floating-action-button primary="\'hp-connect\'" items="items" direction="\'bottom\'"></floating-action-button>';
    var htmlRight = '<floating-action-button primary="\'hp-connect\'" items="items" direction="\'right\'"></floating-action-button>';
    var htmlTop = '<floating-action-button primary="\'hp-connect\'" items="items" direction="\'top\'"></floating-action-button>';
    var htmlLeft = '<floating-action-button primary="\'hp-connect\'" items="items" direction="\'left\'"></floating-action-button>';

    elementBottom = $compile(htmlBottom)($scope);
    elementRight = $compile(htmlRight)($scope);
    elementTop = $compile(htmlTop)($scope);
    elementLeft = $compile(htmlLeft)($scope);
    $scope.$digest();
  }));

  it('should not show any children', function () {
    expect(elementBottom.find('.child-btn-set')[0].classList.contains('child-btn-set-visible')).toBe(false);
  });

  it('should call the expand function on click', function () {
    var scope = angular.element(elementBottom.find('.dir-bottom')[0]).scope();
    spyOn(scope, "expand");
    elementBottom.find('.dir-bottom').trigger("click");
    $scope.$digest();
    expect(scope.expand).toHaveBeenCalled();
  });

  it('should call the collapse function on mouseout', function () {
    var scope = angular.element(elementBottom.find('.dir-bottom')[0]).scope();
    spyOn(scope, "collapse");
    elementBottom.find('.dir-bottom').trigger("mouseout");
    $scope.$digest();
    expect(scope.collapse).toHaveBeenCalled();
  });

  it('should call the selectedCollapse function on click', function () {
    var scope = angular.element(elementBottom.find('.dir-bottom')[0]).scope();
    spyOn(scope, "selectedCollapse");
    elementBottom.find(".button-secondary").trigger("click");
    $scope.$digest();
    expect(scope.selectedCollapse).toHaveBeenCalled();
  });

  it('should expand in the correct direction', function () {
    expect(elementBottom.find(".button-primary").hasClass("dir-bottom")).toBe(true);
    expect(elementRight.find(".button-primary").hasClass("dir-right")).toBe(true);
    expect(elementTop.find(".button-primary").hasClass("dir-top")).toBe(true);
    expect(elementLeft.find(".button-primary").hasClass("dir-left")).toBe(true);
  });

});