describe('floating action button', function () {
  var $compile, $rootScope, $scope, $document, elementBottom, elementRight, elementTop, elementLeft;

  beforeEach(module("ux-aspects.floatingActionButton"));

  beforeEach(inject(function (_$compile_, _$rootScope_, _$document_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $document = _$document_;
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
    expect(elementBottom.find('.floating-action-button-list')[0].classList.contains('collapsed')).toBe(true);
  });

  it('should call the expand function on click', function () {
    var scope = angular.element(elementBottom.find('.button-primary')[0]).scope();
    elementBottom.find('.button-primary').trigger("click");
    $scope.$digest();
    expect(scope.fab.expanded).toBe(true);
  });

  it('should call the collapse function on click outside', function () {
    var scope = angular.element(elementBottom.find('.button-primary')[0]).scope();

    elementBottom.find('.button-primary').trigger("click");
    $scope.$digest();
    expect(scope.fab.expanded).toBe(true);

    $document.trigger("click");
    $scope.$digest();
    expect(scope.fab.expanded).toBe(false);
  });

  it('should call the selectedCollapse function on click', function () {
    var scope = angular.element(elementBottom.find('.button-primary')[0]).scope();

    elementBottom.find('.button-primary').trigger("click");
    $scope.$digest();
    expect(scope.fab.expanded).toBe(true);

    elementBottom.find(".button-secondary").first().trigger("click");
    $scope.$digest();
    expect(scope.fab.expanded).toBe(false);
  });

  it('should expand in the correct direction', function () {
    expect(elementBottom.find(".floating-action-button-list").hasClass("bottom")).toBe(true);
    expect(elementRight.find(".floating-action-button-list").hasClass("right")).toBe(true);
    expect(elementTop.find(".floating-action-button-list").hasClass("top")).toBe(true);
    expect(elementLeft.find(".floating-action-button-list").hasClass("left")).toBe(true);
  });

});