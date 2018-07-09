export default function multipleSelectProvider() {


    multipleSelectFactory.$inject = ["$timeout"];

    function multipleSelectFactory($timeout) {
        return new MultipleSelect($timeout);
    }
    this.$get = multipleSelectFactory;

}

function MultipleSelect($timeout) {
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

MultipleSelect.prototype.getNextComponentId = function() {
    return this.nextComponentId++;
};

MultipleSelect.prototype.getComponentInstance = function(componentId) {
    if (!this.componentInstances[componentId]) {
        this.componentInstances[componentId] = new MultipleSelect(this.$timeout);
    }

    return this.componentInstances[componentId];
};

MultipleSelect.prototype.validateSelection = function() {
    if (this.state.selectAllMode === true && this.state.selecting === true) {
        this.selectNone();
        this.displayError();
    }
};

MultipleSelect.prototype.itemsSelected = function() {
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
        } else {
            //return are there any items selected
            return this.selectedItems.length > 0;
        }
    }
    return false;
};

MultipleSelect.prototype.displayError = function() {
    this.showError = true;
    this.$timeout(function() {
        this.showError = false;
    }.bind(this), 2000);
};

MultipleSelect.prototype.reset = function() {
    this.action = null;
    this.state.selecting = false;
    this.selectedItems = [];
    this.deselectedItems = [];
    this.currentSelectedRange = [];
    this.state.count = this.selectAllTotal = 0;
    this.state.selectAllMode = false;
    this.state.selectedFromButton = false;
    this.state.selectedFromCheckBox = false;
};

MultipleSelect.prototype.cancel = function() {
    this.reset();
    this.onDeselect({
        item: null
    });
};

MultipleSelect.prototype.proceed = function() {
    this.action.callback();
    this.reset();
};

MultipleSelect.prototype.updateCount = function() {
    if (this.selectedItems.length) {
        this.state.count = this.selectedItems.length;
    } else if (this.state.selectAllMode) {
        this.state.count = this.selectAllTotal - this.deselectedItems.length;
    } else {
        this.state.count = 0;
    }
};

MultipleSelect.prototype.selectNone = function() {
    this.selectedItems = [];
    this.deselectedItems = [];
    this.currentSelectedRange = [];
    this.state.count = this.selectAllTotal = 0;
    this.state.selectAllMode = false;
};

MultipleSelect.prototype.selectAll = function() {
    this.state.selectAllMode = true;
    this.selectedItems = [];
    this.deselectedItems = [];
    this.currentSelectedRange = [];
    this.selectAllTotal = this.total;
    this.updateCount();
    this.onSelect({
        item: null
    });
};

MultipleSelect.prototype.isSelected = function(item) {
    if (this.keyFn) {
        var key = this.keyFn({
            item: item
        });
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
};

MultipleSelect.prototype.setSelected = function(item, isSelected) {
    var currentState = this.isSelected(item);
    if (isSelected !== undefined && isSelected !== currentState) {
        this.itemClicked(item);
    }
}

/*
  Method for selecting a range of necessarily contiguous items simultaneously
*/
MultipleSelect.prototype.rangeClicked = function(itemsCollection) {
    if (this.keyFn) {
        var keys = [];
        for (var i in itemsCollection) {
            var key = this.keyFn({
                item: itemsCollection[i]
            });
            if (key === undefined || key === null) {
                return false;
            } else {
                keys.push(key);
            }
        }

        // Deselect the previous range selection, if any.
        // This allows shift clicking to expand and contract a range without affecting selections elsewhere.
        for (var c in this.currentSelectedRange) {
            var index = this.selectedItems.indexOf(this.currentSelectedRange[c]);
            if (index >= 0) {
                this.selectedItems.splice(index, 1);
            }
        }
        this.updateCount();

        for (var j in keys) {
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
};

MultipleSelect.prototype.itemClicked = function(item) {
    if (this.keyFn) {
        var key = this.keyFn({
            item: item
        });
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
                this.onDeselect({
                    item: item
                });
                //deselect
                return false;
            } else {
                this.selectedItems.push(key);
                this.updateCount();
                this.onSelect({
                    item: item
                });
                return true;
            }
        }
        //select all mode
        // keeps track of deselected items.
        if (this.state.selectAllMode) {

            var idx = this.deselectedItems.indexOf(key);
            if (idx >= 0) {
                this.deselectedItems.splice(idx, 1);
                this.updateCount();
                this.onSelect({
                    item: item
                });
                //Select
                return true;
            } else {
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
            this.onSelect({
                item: item
            });
            return true;
        }
    }
    return false;
};