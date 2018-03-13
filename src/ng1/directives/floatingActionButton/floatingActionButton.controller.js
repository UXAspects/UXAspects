export default class FloatingActionButton {

  constructor($scope, $document, $element) {

    // by default the FAB should be collapsed
    this.$scope = $scope;
    this.$element = $element.get(0);
    this.expanded = false;

    // when anywhere in the document is clicked collapse the menu
    $document.on('click', this.collapse.bind(this));

    // Clean up when component is destroyed
    $scope.$on('$destroy', () => $document.off('click', this.collapse.bind(this)));
  }

  /*
   * When an item is selected call the associated event and collapse items
   */
  select(item) {
    if (item.event) {
      item.event.call(item);
    }

    this.expanded = false;
  }

  /*
   * Show the floating action buttons
   */
  expand() {
    this.expanded = true;
  }

  /*
   * Collapse the floating action buttons
   */
  collapse(event) {
    if (this.expanded && !this.$element.contains(event.target)) {
      this.$scope.$evalAsync(() => this.expanded = false);
    }
  }
}

FloatingActionButton.$inject = ['$scope', '$document', '$element'];