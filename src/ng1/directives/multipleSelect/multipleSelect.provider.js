export default function multipleSelectProvider() {

    multipleSelectFactory.$inject = ["$timeout"];

    function multipleSelectFactory($timeout) {
        return new MultipleSelect($timeout);
    }
    this.$get = multipleSelectFactory;

}

/**
 * @param {ng.ITimeoutService} $timeout
 */
class MultipleSelect {

    constructor($timeout) {
        //$timeout for the display error
        this.$timeout = $timeout;
        this.showError = false;
        //state has to be an object so that when it changes
        //all references to it in $scopes will trigger a change
        this.state = {
            selecting: false,
            count: 0,
            selectAllMode: false,
            selectedFromButton: false,
            selectedFromCheckBox: false
        };
        this.selectedItems = [];
        this.deselectedItems = [];
        this.currentSelectedRange = [];
        //the multiple selection action ctrl that was clicked originally
        this.action = null;
        //called when item is selected (single item) pass null when selecting all
        this.onSelect = null;
        //called when item is deselected (single item) pass null when deselecting all
        this.onDeselect = null;
        //total count of items that should be displayed when select all is true
        this.total = 0;
        this.selectAllTotal = 0;
        this.cancelText = "Cancel";
        this.selectItemsText = "Select items or";
        this.selectedItemsText = "Selected";
        this.selectedItemsUnitText = "items.";
        this.selectedItemUnitText = "item.";
        this.selectAllText = "Select all";
        this.selectNoneText = "Select none";
        this.selectionInvalidText = "This selection is no longer valid";
        //used for us to keep track of total items selected.
        this.keyFn = null;
        this.nextComponentId = 0;
        this.componentInstances = {};
    }

    getNextComponentId() {
        return this.nextComponentId++;
    }

    /**
     * @param {number|string} componentId
     */
    getComponentInstance(componentId) {
        if (!this.componentInstances[componentId]) {
            this.componentInstances[componentId] = new MultipleSelect(this.$timeout);
        }
        return this.componentInstances[componentId];
    }

    validateSelection() {
        if (this.state.selectAllMode === true && this.state.selecting === true) {
            this.selectNone();
            this.displayError();
        }
    }

    itemsSelected() {
        //check we are selecting
        if (this.state.selecting) {
            //if we are in select all mode
            if (this.state.selectAllMode) {
                //we must check if everything is deselected
                if (this.deselectedItems.length === this.selectAllTotal) {
                    //return false if everything is selected but then deselected
                    return false;
                }
                return true;
            }
            else {
                //return are there any items selected
                return this.selectedItems.length > 0;
            }
        }
        return false;
    }

    displayError() {
        this.showError = true;
        this.$timeout(() => this.showError = false, 2000);
    }

    reset() {
        this.action = null;
        this.state.selecting = false;
        this.selectedItems = [];
        this.deselectedItems = [];
        this.currentSelectedRange = [];
        this.state.count = this.selectAllTotal = 0;
        this.state.selectAllMode = false;
        this.state.selectedFromButton = false;
        this.state.selectedFromCheckBox = false;
    }

    cancel() {
        this.reset();
        this.onDeselect({ item: null });
    }

    proceed() {
        this.action.callback();
        this.reset();
    }

    updateCount() {
        if (this.selectedItems.length) {
            this.state.count = this.selectedItems.length;
        }
        else if (this.state.selectAllMode) {
            this.state.count = this.selectAllTotal - this.deselectedItems.length;
        }
        else {
            this.state.count = 0;
        }
    }

    selectNone() {
        this.selectedItems = [];
        this.deselectedItems = [];
        this.currentSelectedRange = [];
        this.state.count = this.selectAllTotal = 0;
        this.state.selectAllMode = false;
    }

    selectAll() {
        this.state.selectAllMode = true;
        this.selectedItems = [];
        this.deselectedItems = [];
        this.currentSelectedRange = [];
        this.selectAllTotal = this.total;
        this.updateCount();
        this.onSelect({ item: null });
    }

    isSelected(item) {
        if (this.keyFn) {
            const key = this.keyFn({ item: item });
            if (key === undefined || key === null) {
                return false;
            }
            //if selected items has length
            //means we are selecting normally
            if (this.selectedItems.length) {
                return this.selectedItems.indexOf(key) >= 0;
            }
            //if in selectAll mode then we are using the deselect items.
            if (this.state.selectAllMode) {
                return this.deselectedItems.indexOf(key) === -1;
            }
        }
        return false;
    }

    setSelected(item, isSelected) {
        const currentState = this.isSelected(item);
        if (isSelected !== undefined && isSelected !== currentState) {
            this.itemClicked(item);
        }
    }

    /*
      Method for selecting a range of necessarily contiguous items simultaneously
    */
    rangeClicked(itemsCollection) {
        if (this.keyFn) {
            const keys = [];
            for (const i in itemsCollection) {
                const key = this.keyFn({ item: itemsCollection[i] });
                if (key === undefined || key === null) {
                    return false;
                }
                else {
                    keys.push(key);
                }
            }
            // Deselect the previous range selection, if any.
            // This allows shift clicking to expand and contract a range without affecting selections elsewhere.
            for (const c in this.currentSelectedRange) {
                const index = this.selectedItems.indexOf(this.currentSelectedRange[c]);
                if (index >= 0) {
                    this.selectedItems.splice(index, 1);
                }
            }
            this.updateCount();
            for (const j in keys) {
                if (!~this.selectedItems.indexOf(keys[j])) {
                    this.selectedItems.push(keys[j]);
                    this.updateCount();
                    this.onSelect({
                        item: itemsCollection[j]
                    });
                }
            }
            this.currentSelectedRange = angular.copy(keys);
            return true;
        }
        return false;
    }

    itemClicked(item) {
        if (this.keyFn) {
            const key = this.keyFn({ item: item });
            if (key === undefined || key === null) {
                return false;
            }
            this.currentSelectedRange = [];
            //normal selection mode.
            if (this.selectedItems.length) {
                //we know that we are selecting items into the selected items array.
                var index = this.selectedItems.indexOf(key);
                if (index >= 0) {
                    this.selectedItems.splice(index, 1);
                    this.updateCount();
                    this.onDeselect({ item: item });
                    //deselect
                    return false;
                }
                else {
                    this.selectedItems.push(key);
                    this.updateCount();
                    this.onSelect({ item: item });
                    return true;
                }
            }
            //select all mode
            // keeps track of deselected items.
            if (this.state.selectAllMode) {
                const idx = this.deselectedItems.indexOf(key);
                if (idx >= 0) {
                    this.deselectedItems.splice(idx, 1);
                    this.updateCount();
                    this.onSelect({ item: item });
                    //Select
                    return true;
                }
                else {
                    this.deselectedItems.push(key);
                    this.updateCount();
                    this.onDeselect({
                        item: item
                    });
                    return false;
                }
            }
            //nothing in deselect or select items then start pushing on select items
            if (!this.selectedItems.length && !this.state.selectAllMode) {
                this.selectedItems.push(key);
                this.updateCount();
                this.onSelect({ item: item });
                return true;
            }
        }
        return false;
    }
}