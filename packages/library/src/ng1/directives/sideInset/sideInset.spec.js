describe('side inset directive', function () {
  var $compile, $rootScope, element, $scope;

  beforeEach(module("ux-aspects.sideInset"));

  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();
  }));

  describe("side directive layout", function () {
    beforeEach(function () {
      
      var html = '<div side-inset side-inset-width="30" side-inset-button-top="100px" pretty-print>';
      html+='<div class="main-content wrapper-content" >';
      html+='</div>';
      html+='<div class="side-inset">';
      html+='</div>';
      html+='</div>';
      
      element = $compile(html)($scope);

      $scope.$digest();
    });

    it('should attach the toggle button to the main content', function () {
      var toggle = element.find(".main-content").find(".side-inset-toggle");
      expect(toggle.eq(0).length).toBe(1);
    });

    it('should expand the side panel when the toggle is clicked', function () {
      var toggle = element.find(".main-content").find(".side-inset-toggle");
      toggle.trigger("click");
      $scope.$digest();
      var mainContent = element.find(".main-content");
      expect(mainContent.css("width")).toBe("70%");
    });

    it('should collapse the side panel when the toggle is clicked again', function () {
      var toggle = element.find(".main-content").find(".side-inset-toggle");
      toggle.trigger("click");
      $scope.$digest();
      var mainContent = element.find(".main-content");
      expect(mainContent.css("width")).toBe("70%");
      $scope.$digest();
      toggle.trigger("click");
      $scope.$digest();
      mainContent = element.find(".main-content");
      expect(mainContent.css("width")).toBe("100%");

    });

    it('should place the side inset on the RHS when defined second in template HTML', function () {
      expect(element.find(".main-content").find(".side-inset-toggle")[0].classList.contains("right")).toBe(true);
    });

    it('should place the side inset on the LHS when defined first in template HTML', function () {
      var html = '<div side-inset side-inset-width="30" side-inset-button-top="100px" pretty-print>';
      html+='<div class="side-inset">';
      html+='</div>';
      html+='<div class="main-content wrapper-content" >';
      html+='</div>';
      html+='</div>';
      
      var newElement = $compile(html)($scope);

      $scope.$digest();
      expect(newElement.find(".main-content").find(".side-inset-toggle")[0].classList.contains("left")).toBe(true);
    });

  });

});