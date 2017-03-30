describe('thumbnail directive', function() {
    var $compile, $rootScope, element, $scope, $controller, controller;

    beforeEach(module('ux-aspects'));
    beforeEach(module('ux-aspects.thumbnail'));

    beforeEach(inject(function(_$rootScope_, _$controller_, _$compile_) {
        $compile = _$compile_;
        $controller = _$controller_;
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
    }));

    describe('testing default values and functionality', function() {
    	beforeEach(function() {
    		var html = '<thumbnail></thumbnail>';
    		element = $compile(html)($scope);
    		
    		controller = $controller("ThumbnailCtrl as tc", {
				$scope: $scope
		   	}); 
			
			$scope.$digest();
    	});

    	it('should have the correct default values initially', function() {
    		expect(controller.show).toBe(true);
    		expect(controller.url).toBe("");
    		expect(controller.height).toBe("120px");
    		expect(controller.width).toBe("220px");
    	});

    });

});