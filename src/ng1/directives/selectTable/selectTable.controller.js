export default class SelectTableController {

    /**
     * @param {ng.ITimeoutService} $timeout
     * @param {ng.IScope} $scope
     */
    constructor($timeout, $scope) {
        this.$timeout = $timeout;
        this.$scope = $scope;

        // initialise once we have the necessary properties
        $timeout(() => this.onInit());
    }

    /**
     * Initialise the select table component once we have all the initial values
     */
    onInit() {

        /** @type {*[]} */
        this.values = this.values;

        /** @type {*[]} */
        this.visibleValues = this.values.slice();

        /** @type {(Readonly<any> | ReadonlyArray<any>)} */
        this.selected = this.multipleSelect ? this.selected || [] : this.selected;

        /** @private @type {boolean} */
        this._reselectFilteredItems = this.selectHiddenItems === 'reselect';

        /** @private @type {boolean} */
        this._keepFilteredItemsSelected = this.selectHiddenItems !== 'clear' && this.selectHiddenItems !== 'reselect';

        /** @private @type {*} */
        this._filteredSelection = null;

        /** @private @type {*} */
        this._lastSelection = null;

        /** @private */
        this._valueWatch = this.$scope.$watch(() => this.values, this.filter.bind(this), true);

        /** @private */
        this._searchWatch = this.$scope.$watch(() => this.searchText, this.filter.bind(this));

        // cleanup after the component has been destroyed
        this.$scope.$on('$destroy', () => this.onDestroy());
    }

    /**
     * Remove all watches
     */
    onDestroy() {
        this._valueWatch();
        this._searchWatch();
    }

    /**
     * Get the property that should be displayed in the list
     * @param {*} value the item to return the text to display
     * @returns {string}
     */
    getDisplayText(value) {
        return this.selectKey ? value[this.selectKey] : value;
    }

    /**
     * Determine if a given value is selected or not
     * @param {*} value The item to determine the selected state of
     * @returns {boolean}
     */
    isSelected(value) {
        return this.multipleSelect ? this.selected.find(_item => _item === value) : value === this.selected;
    }

    /**
     * Reinitialise the JScrollPane if one is present
     */
    reinitialiseScrollbar() {

        // ensure scrollpane has been initialised
        if (this.$scope.pane === undefined) {
            return;
        }

        // update the scrollpane on next digest
        this.$timeout(this.$scope.pane.reinitialise, 0, false);
    }

    /**
     * Update the select table to only show items that match the search query
     */
    filter() {
        // update which values should be visible based on the search query
        this.visibleValues = this.values.filter(item => this.isVisible(item));

        // This is to provide the option to deselect items when they are no longer visible based on the search text
        if (!this.multipleSelect && !this._keepFilteredItemsSelected) {

            // if the item is selected but not visible then we should deselect it
            if (this.selected && !this.isVisible(this.selected)) {
                this.deselect(this.selected);

                // if we want to restore previously selected items if they become visible again, store it
                if (this._reselectFilteredItems) {
                    this._filteredSelection = this.selected;
                }
            }

            // if the item was previously selected and we want to restore selected items then reselect it
            if (this._reselectFilteredItems && this._filteredSelection && !this.selected && this.isVisible(this._filteredSelection)) {
                this.select(this._filteredSelection);
            }
        }

        // reinitialise the JScrollPane if present
        this.reinitialiseScrollbar();
    }

    /**
     * Determine whether a list item is visible based on the current search query
     * @param {*} value The list item to determine the visibility of
     * @returns {boolean}
     */
    isVisible(value) {
        return this.getDisplayText(value).toLowerCase().indexOf(this.searchText.toLowerCase()) !== -1;
    }

    /**
     * Toggle the selected state of a given item
     * @param {*} value The value to toggle the selected state
     */
    toggle(value) {
        this.isSelected(value) ? this.deselect(value) : this.select(value); // jshint ignore:line
    }

    /**
     * Select an item in the list
     * @param {*} value The item to select
     */
    select(value) {
        this.selected = this.multipleSelect ? [...this.selected, value] : value;

        // store the item once it has been selected
        this._lastSelection = value;
    }

    /**
     * Select many items - eg. using shift click
     * @param {*} start The first item in the selection
     * @param {*} end The last item in the selection
     */
    selectRange(start, end) {

        // get the indexes of the start and end items
        const startIdx = this.values.indexOf(start);
        const endIdx = this.values.indexOf(end);

        // get the all items to select
        const range = this.values.slice(Math.min(startIdx, endIdx), Math.max(startIdx, endIdx) + 1);

        // perform the selection
        range.filter(value => !this.isSelected(value)).forEach(value => this.select(value));

        // reselect the first item as the last selection
        this._lastSelection = start;
    }

    /**
     * Deselect an item in the list
     * @param {*} value The item to deselect
     */
    deselect(value) {
        this.selected = this.multipleSelect ? this.selected.filter(item => item !== value) : null;

        // clear the last selection value
        this._lastSelection = null;
    }

    /**
     * Allow the toggle of a selection state using the keyboard
     * @param {KeyboardEvent} event The enter that triggered the toggle
     * @param {*} value The item that the keypress occurred on
     */
    onKeydown(event, value) {
        //Enter or space, trigger a click
        if (event.which === 13 || event.which === 32) {
            this.toggle(value);
            event.stopPropagation();
            event.preventDefault();
        }
    }

    /**
     * Handle item click events
     * @param {MouseEvent} event The click event
     * @param {*} value The value that was clicked
     */
    onClick(event, value) {

        /**
         * Ensure all the following conditions are met:
         * 1. We are in multiple select mode
         * 2. The shift key is pressed
         * 3. The is a last selection stored
         * 4. We are not clicking on the last selected item
         * 5. The last selection is not hidden by a filter
         * 6. The last selection is still a selected item
        */

        if (this.multipleSelect &&
            event.shiftKey &&
            this._lastSelection &&
            value !== this._lastSelection &&
            this.visibleValues.indexOf(this._lastSelection) !== -1 &&
            this.selected.indexOf(this._lastSelection) !== -1) {

            return this.selectRange(this._lastSelection, value);
        }

        // otherwise simply perform a toggle operation
        this.toggle(value);
    }
}

SelectTableController.$inject = ['$timeout', '$scope'];