describe('number picker directive', function () {
	var $compile, $scope, element;

	beforeEach(module("ux-aspects.numberPicker"));

	beforeEach(inject(function (_$compile_, _$rootScope_) {
		$compile = _$compile_;
		$scope = _$rootScope_.$new();
	}));

	describe('functionality', function() {
		var upButton, downButton, input;
		beforeEach(function() {
                  $scope.step = 1;
                  $scope.max = 3;
                  $scope.min = 0;
                  $scope.value = 0;
			var html = '<number-picker step="step" max="max" min="min" ng-model="value"></number-picker>';
			element = $compile(html)($scope);
	      	$scope.$digest();

	      	upButton = element.find('#upButton');
	      	downButton = element.find('#downButton'); 
	      	input = element.find('input');
		});
		
      	it('should increment when the up button is clicked', function() {
      		upButton.trigger("click");
      		expect(input.val()).toBe("1");
      		upButton.trigger("click");
      		expect(input.val()).toBe("2");
      	});

      	it('should increment when the up button is clicked', function() {
      		upButton.trigger("click");
      		expect(input.val()).toBe("1");
      		downButton.trigger("click");
      		expect(input.val()).toBe("0");
      	});

      	it('should not increment if at the upper limit', function() {
      		upButton.trigger("click");
      		upButton.trigger("click");
      		upButton.trigger("click");
      		expect(input.val()).toBe("3");
      		// now at the upper limit, shouldn't increment again
      		upButton.trigger("click");
      		expect(input.val()).toBe("3");
      	});

      	it('should not decrement if at the lower limit', function() {
      		upButton.trigger("click");
      		downButton.trigger("click");
      		expect(input.val()).toBe("0");
      		// now at the lower limit, shouldn't decrement again
      		downButton.trigger("click");
      		expect(input.val()).toBe("0");
      	});

      	it('should show validation if text entered is not a number', function() {
      		input.val("Text").trigger("input");
      		$scope.$digest();
      		expect(element.hasClass('invalid-entry')).toBe(true);
      	});

      	it('should not show validation if text entered is in range and complies with the step', function() {
      		input.val("2").trigger("input");
      		$scope.$digest();
      		expect(element.hasClass('invalid-entry')).toBe(false);
      	});

      	it('should show validation if text entered is NOT in range', function() {
      		input.val("4").trigger("input");
      		$scope.$digest();
      		expect(element.hasClass('invalid-entry')).toBe(true);
      	});

            it('should show validation when the input field is empty', function() {
                  input.val("").trigger("input");
                  $scope.$digest();
                  expect(element.hasClass('invalid-entry')).toBe(true);
            });

	});

});