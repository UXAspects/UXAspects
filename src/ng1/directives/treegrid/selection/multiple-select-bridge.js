/**
 * This is a wrapper to prevent breaking changes.
 * We previously used the multiple select provider
 * but we now use the SelectionModel instead. This
 * is a compatibility layer that provides the same API
 * as the multiple select provider but uses the SelectionModel
 */
export class MultipleSelectBridge {

    constructor(selectionModel, treeGridCtrl) {
        this._selectionModel = selectionModel;
        this._treeGridCtrl = treeGridCtrl;
    }

    reset() {
        this._selectionModel.reset();
    }

    selectNone() {
        this._selectionModel.deselectAll();
    }

    selectAll() {
        this._selectionModel.selectAll(this._treeGridCtrl.getGridRows());
    }

    isSelected(item) {
        return this._selectionModel.isSelected(item);
    }

    setSelected(item, isSelected) {
        return isSelected ? this._selectionModel.select(item) : this._selectionModel.deselect(item);
    }

    rangeClicked(items) {
        this._selectionModel.setSelection(...items);
    }

    itemClicked(item) {
        this._selectionModel.toggle(item);

        return this._selectionModel.isSelected(item);
    }

    // These methods no longer do anything - keep them present to avoid errors
    getNextComponentId() { }
    getComponentInstance() {}
    validateSelection() {}
    itemsSelected() {}
    displayError() {}
    cancel() {}
    proceed() {}
    updateCount() {}

}