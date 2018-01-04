export default function numberPicker() {
	return {
		restrict: 'E',
		replace: true,
		require: 'ngModel',
		template: require('./numberPicker.tmpl.html'),
		scope: {
			step: "=?",
			max: "=?",
			min: "=?",
			validate: "=?",
			ngDisabled: "=?"
		},
		controller: numberPickerCtrl,
		controllerAs: 'vm',
		link: numberPickerLink
	};
}

numberPickerCtrl.$inject = ['$scope'];

function numberPickerCtrl($scope) {
	var vm = this;

	vm.value = 0;
	vm.validate = {};
	vm.ngModelCtrl = {};

	// define the default values in none provided
	var step = $scope.step ? parseFloat($scope.step) : 1;
	var max = parseFloat($scope.max);
	var min = parseFloat($scope.min);

	// get the number of decimal places the step has
	var decimals = (countDecimals(step) === 0) ? 1 : countDecimals(step);

	// listen for input and then validate the input
	$scope.$watch('vm.value', function (nV) {
		vm.ngModelCtrl.$setViewValue(nV);
		// if custom validation specified, then do it
		if ($scope.validate) {
			var customValidateError = $scope.validate(nV);
			if (customValidateError) {
				invalidAll();
				return;
			}
		}

		validate(nV);
	});

	// if its not a number, or an out of range number then apply the invalid-entry class to the input and the disabled classes to the buttons
	function validate(value, customValidation) {

		vm.validate = customValidation ? vm.validate : {};

		value = (value === "" || isNaN(value)) ? value : parseFloat(value);

		if (value === max || (value + step) > max) {
			vm.validate.upDisabled = true;
			vm.validate.downDisabled = false;
		} else if (value === min || (value - step) < min) {
			vm.validate.downDisabled = true;
			vm.validate.upDisabled = false;
		}

		if (isNaN(value) || value > $scope.max || value < $scope.min || value === "") {
			invalidAll();
		}
	}


	// apply validation to buttons and input field
	function invalidAll() {
		vm.validate.inputError = true;
		vm.validate.upDisabled = true;
		vm.validate.downDisabled = true;
	}

	// trigger upButton click if up key pressed and vice versa
	vm.keyPressed = function (e) {
		if (e.keyCode === 38)
			vm.upClick();
		else if (e.keyCode === 40)
			vm.downClick();
	};

	// increments the input value
	vm.upClick = function () {
		if (vm.validate.upDisabled || $scope.ngDisabled) return;

		var incrementedValue = parseFloat((parseFloat(vm.value) + parseFloat(step)).toFixed(decimals));
		vm.value = incrementedValue;
	};

	// decrements the input value
	vm.downClick = function () {
		if (vm.validate.downDisabled || $scope.ngDisabled) return;

		var decrementedValue = parseFloat((parseFloat(vm.value) - parseFloat(step)).toFixed(decimals));
		vm.value = decrementedValue;
	};

	// calculate the how many decimal places the step has. 
	// used to avoid javascript precision problems (where 0.2 + 0.4 = 0.600000000001)
	function countDecimals(value) {
		if (Math.floor(value) !== parseFloat(value))
			return value.toString().split(".")[1].length || 0;
		return 0;
	}

}


function numberPickerLink(scope, element, attrs, ngModelCtrl) {
	scope.vm.ngModelCtrl = ngModelCtrl;

	// when model value changes, update input model value
	ngModelCtrl.$render = function () {
		scope.vm.value = ngModelCtrl.$viewValue;
	};
}