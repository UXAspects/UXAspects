ListHoverActionsCtrl.$inject = ['$scope', '$element'];

export default function ListHoverActionsCtrl($scope, $element) {
	var vm = this;

	vm.actionFocused = {};

	var row = $element.parents('tr').first();

	// watch to see if actions are focused on
	$scope.$watch('lh.actionFocused', function() {
		for(var prop in vm.actionFocused) {
			// if any actions are focused, the we will add class
			if (vm.actionFocused[prop]) {
				row.addClass('row-selected');
				return;
			}
		}

		row.removeClass('row-selected');
	}, true);
}