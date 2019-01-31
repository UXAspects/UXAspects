import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from "rxjs/Subject";

export class SelectionModel {

    constructor() {
        /** @type {ReadonlyArray<*>} */
        this._selection = [];
        this.onSelect = new Subject();
        this.onDeselect = new Subject();
        this.onSelectionChange = new BehaviorSubject([]);

        /** @type {number} */
        this.origin = null;

        /** @type {boolean} */
        this.isSelecting = false;

        // a function that allows comparing objects based on a property rather than an object
        this.comparator = null;
    }

    reset() {
        this._selection = [];
        this.origin = null;
        this.isSelecting = false;
        this.onSelectionChange.next(this._selection);
    }

    select(item) {
        if (!this.isSelected(item)) {
            this._selection = [...this._selection, item];
            this.onSelect.next(item);
            this.onSelectionChange.next(this._selection);
        }
    }

    selectAll(items) {

        // populate the array with the data provided
        this.setSelection(...items);
    }

    deselect(item) {
        if (this.isSelected(item)) {
            this._selection = this._selection.filter(_item => !this.compare(item, _item));
            this.onDeselect.next(item);
            this.onSelectionChange.next(this._selection);
        }
    }

    deselectAll() {
        this._selection.forEach(item => this.deselect(item));
    }

    toggle(item) {
        return this.isSelected(item) ? this.deselect(item) : this.select(item);
    }

    isSelected(item) {
        return this._selection.find(_item => this.compare(_item, item));
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

    compare(previous, current) {
        if (typeof this.comparator === 'function') {
            return this.comparator(previous, current);
        }

        return current === previous;
    }

}