describe('help center directive', function () {
  var $timeout, $rootScope, throttleService, $compile, $scope;
  var title = "Help Buttons";
  var url = "test/sampleDeveloperPage";
  var parenturl = "/";
  var helpText = "HelpCenter";
  var element;

  beforeEach(module("ux-aspects.helpCenter"));
  beforeEach(module("ux-aspects.throttleService"));
  beforeEach(inject(function (_$timeout_, _$rootScope_, _throttleService_, _$compile_) {
    $timeout = _$timeout_;
    $rootScope = _$rootScope_;
    throttleService = _throttleService_;
    $scope = $rootScope.$new();
    $scope.title = title;
    $scope.url = url;
    $compile = _$compile_;
  }));
  describe("element", function () {
    beforeEach(function () {
      element = $compile('<help-center-menu url="' + parenturl + '" help-text="' + helpText + '"></help-center-menu>')($scope);
      $scope.$digest();
    });
    it("replaces content with help center menu list", function () {
      expect((element.find("ul>li:first-child>a")[0].innerText)).toBe(helpText);
      expect((element.find("ul>li:first-child>a").attr('href'))).toBe(parenturl);
    });
  });
});