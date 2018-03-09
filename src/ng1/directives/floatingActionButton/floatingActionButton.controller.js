export default class FloatingActionButton {

	constructor($scope, $document) {

		// by default the FAB should be collapsed
		this.expanded = false;
		this.scope = $scope;

		// when anywhere in the document is clicked collapse the menu
		$document.on('click', this.collapse.bind(this));

		// Clean up when component is destroyed
        $scope.$on('$destroy', () => $document.off('click', this.collapse.bind(this)));
	}

	expand(event) {
		this.expanded = true;
		event.stopPropagation();
	}

	collapse() {
		this.scope.$evalAsync(() => this.expanded = false);
	}
}

FloatingActionButton.$inject = ['$scope', '$document'];