describe('flippable card directive', function() {
    var $compile, $rootScope, element, $scope;

    beforeEach(module('ux-aspects.flippableCard'));

    beforeEach(inject(function(_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $scope = _$rootScope_.$new();
    }));


    describe('card-width and card-height attribute tests', function() {

    	beforeEach(function() {
    		var html = '<flippable-card class="m-sm" card-width="300" card-height="300">' +
						'<card-front></card-front>' +
						'<card-back></card-back>' +
					'</flippable-card>';
			
			element = $compile(html)($scope);
			$scope.$digest(); 
		});

		it('should set the width and height of the card', function() {
			var width = element.find('.flip-container').width();
			var height = element.find('.flip-container').height();

			expect(width).toBe(300);
			expect(height).toBe(300);
		});
    	

    });

    describe('flip-style vertical attribute tests', function() {

    	beforeEach(function() {
    		var html = '<flippable-card class="m-sm" flip-style="vertical">' +
						'<card-front></card-front>' +
						'<card-back></card-back>' +
					'</flippable-card>';
			
			element = $compile(html)($scope);
			$scope.$digest(); 
		});

		it('should have the vertical class on the flip-container element', function() {
			expect(element.find('.flip-container').hasClass('vertical')).toBe(true);
		});
    	

    });

    describe('flip-on click attribute tests', function() {
    	var flipElement;

    	beforeEach(function() {
    		var html = '<flippable-card class="m-sm" flip-on="click">' +
						'<card-front></card-front>' +
						'<card-back></card-back>' +
					'</flippable-card>';
			
			element = $compile(html)($scope);
			$scope.$digest(); 

			flipElement = element.find('.flipper');
		});

		it('should not flip when hovered', function() {
			element.trigger('mouseover');
			expect(flipElement.hasClass('flip-card')).toBe(false);
		});

		it('should flip when clicked', function() {
			element.trigger("click");
			expect(flipElement.hasClass('flip-card')).toBe(true);

			//should flip back when clicked again (shouldn't have flip-card class)
			element.trigger("click");
			expect(flipElement.hasClass('flip-card')).toBe(false);
		});
    	

    });

});
