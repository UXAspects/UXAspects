import { BehaviorSubject, Subject } from "rxjs";

export class SelectionModel {

    constructor() {
        /** @type {ReadonlyArray<*>} */
        this._selection = [];
        this.onSelect = new Subject();
        this.onDeselect = new Subject();
        this.onSelectionChange = new BehaviorSubject([]);

        // handle ctrl and shift selection
        this.origin = null;
        this.isSelecting = false;
    }

    select(item) {
        if (!this.isSelected(item)) {
            this._selection = [...this._selection, item];
            this.onSelect.next(item);
            this.onSelectionChange.next(this._selection);
        }
    }

    deselect(item) {
        if (this.isSelected(item)) {
            this._selection = this._selection.filter(_item => _item !== item);
            this.onDeselect.next(item);
            this.onSelectionChange.next(this._selection);
        }
    }

    deselectAll() {
        this._selection.forEach(item => this.deselect(item))
    }

    toggle(item) {
        return this.isSelected(item) ? this.deselect(item) : this.select(item);
    }

    isSelected(item) {
        return this._selection.find(_item => _item === item);
    }

    setSelection(...items) {

        // check if the selection has changed
        if (items.length === this._selection.length && items.every(item => this.isSelected(item))) {
            return;
        }

        // deselect all currently selected items
        this.deselectAll();

        // select the new selection
        items.forEach(item => this.select(item));
    }

    getSelection() {
        return this._selection;
    }

}