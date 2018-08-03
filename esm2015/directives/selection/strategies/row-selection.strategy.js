/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { KeyCode } from './keycode.enum';
import { SelectionStrategy } from './selection.strategy';
export class RowSelectionStrategy extends SelectionStrategy {
    constructor() {
        super(...arguments);
        this._selection = { start: null, end: null };
    }
    /**
     * By default on shift click the browser will highlight
     * text. This looks bad and we don't want this to occur
     * @param {?} event
     * @return {?}
     */
    mousedown(event) {
        event.preventDefault();
    }
    /**
     * When a row is clicked we want to handle selection
     * @param {?} event
     * @param {?} data
     * @return {?}
     */
    click(event, data) {
        // determine which modifier keys are pressed
        const { ctrlKey, shiftKey } = event;
        // if the shift key is pressed we want to perform a multiple selection
        if (shiftKey) {
            return this.multipleSelect(data);
        }
        // if the control key is pressed we want to perform an additive toggle selection
        if (ctrlKey) {
            return this.toggle(data);
        }
        // perform a single selection where all other rows are deselected
        this.singleSelect(data);
    }
    /**
     * To support full keyboard control we need to support the following:
     * 1. Arrow keys to navigate up and down
     * 2. Spacebar to toggle selection
     * 3. Shift + Arrow keys to multiple select
     * 4. Ctrl + Arrow keys to allow retained selection and navigation
     * @param {?} event
     * @param {?} data
     * @return {?}
     */
    keydown(event, data) {
        switch (event.keyCode) {
            case KeyCode.UpArrow:
            case KeyCode.DownArrow:
                event.preventDefault();
                this.navigate(event, data);
                break;
            case KeyCode.Spacebar:
                event.preventDefault();
                this.selectionService.strategy.toggle(data, true);
                break;
        }
    }
    /**
     * Override the standard toggle function to store or clear the
     * most recently selected item
     * @param {?} data
     * @param {?=} activate
     * @return {?}
     */
    toggle(data, activate = false) {
        super.toggle(data);
        // store or clear the selection
        this.selectionService.isSelected(data) ? this.setSelectionStart(data) : this.clearSelection();
        // if we want to keep the item activated then activate
        if (activate) {
            this.selectionService.activate(data);
        }
    }
    /**
     * Clear all other selected items and select only
     * the most recently selected item
     * @param {?} data
     * @return {?}
     */
    singleSelect(data) {
        // deselect all other rows if neither modifier key is pressed
        this.deselectAll();
        // select the current row
        this.select(data);
        // store the current item as the selection start
        this.setSelectionStart(data);
    }
    /**
     * Handle multiple selection:
     * 1. If no start item selected - select it
     * 2. If a start item has been selected - select all in between
     * 3. If a start and end item have been selected clear the range and then select the new range
     * @param {?} data
     * @return {?}
     */
    multipleSelect(data) {
        // if no selection currently exists then perform initial selection
        if (!this._selection.start) {
            // select the row
            this.select(data);
            // store the starting point
            return this.setSelectionStart(data);
        }
        // if a multiple selection already took place - clear the previous selection
        if (this._selection.start && this._selection.end) {
            this.deselect(...this.getSelectedItems());
        }
        // set the new selection end point
        this.setSelectionEnd(data);
        // select all the items in the range
        this.select(...this.getSelectedItems());
    }
    /**
     * Set the selection start point. If there was previously a
     * selection end point then clear it as this is a new selection
     * @param {?} data
     * @return {?}
     */
    setSelectionStart(data) {
        this._selection.start = data;
        this._selection.end = null;
        // activate the item
        this.selectionService.activate(data);
    }
    /**
     * Set the selection end point
     * @param {?} data
     * @return {?}
     */
    setSelectionEnd(data) {
        this._selection.end = data;
        // activate the item
        this.selectionService.activate(data);
    }
    /**
     * Clear both start and end selection points
     * @param {?=} deactivate
     * @return {?}
     */
    clearSelection(deactivate = true) {
        // reset the selected item
        this._selection = { start: null, end: null };
        // remove the current active item
        if (deactivate) {
            this.selectionService.deactivate();
        }
    }
    /**
     * Determine all the items affected by the current selection.
     * Note that the end point may be above the start point so
     * we need to account for this.
     * @return {?}
     */
    getSelectedItems() {
        // get the latest dataset
        const { dataset } = this.selectionService;
        // get the indexes of the start and end point
        const /** @type {?} */ startIdx = dataset.indexOf(this._selection.start);
        const /** @type {?} */ endIdx = dataset.indexOf(this._selection.end);
        // get the region of the array that is selected - note the endIdx may be before the startIdx so account for this
        return dataset.slice(Math.min(startIdx, endIdx), Math.max(startIdx, endIdx) + 1);
    }
    /**
     * Activate the sibling item when arrow keys are pressed
     * @param {?} event
     * @param {?} data
     * @return {?}
     */
    navigate(event, data) {
        // determine which modifier keys are pressed
        const { ctrlKey, shiftKey } = event;
        // if no modifier keys are pressed then deselect all and clear the selection
        if (!ctrlKey && !shiftKey) {
            this.deselectAll();
            this.clearSelection(false);
        }
        // activate the sibling - if the up arrow is pressed then navigate to the previous sibling
        const /** @type {?} */ sibling = this.selectionService.activateSibling(event.keyCode === KeyCode.UpArrow);
        // if the shift key is pressed then we also want to toggle the state if the item
        if (shiftKey && sibling) {
            // if there is no current selection start then select the current row
            if (!this._selection.start) {
                this.multipleSelect(data);
            }
            this.multipleSelect(sibling);
        }
    }
}
function RowSelectionStrategy_tsickle_Closure_declarations() {
    /** @type {?} */
    RowSelectionStrategy.prototype._selection;
}
/**
 * @record
 */
export function Selection() { }
function Selection_tsickle_Closure_declarations() {
    /** @type {?} */
    Selection.prototype.start;
    /** @type {?} */
    Selection.prototype.end;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93LXNlbGVjdGlvbi5zdHJhdGVneS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL3NlbGVjdGlvbi9zdHJhdGVnaWVzL3Jvdy1zZWxlY3Rpb24uc3RyYXRlZ3kudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6QyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUV6RCxNQUFNLDJCQUE0QixTQUFRLGlCQUFpQjs7OzBCQUd6QixFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRTs7Ozs7Ozs7SUFNMUQsU0FBUyxDQUFDLEtBQWlCO1FBQ3pCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztLQUN4Qjs7Ozs7OztJQUtELEtBQUssQ0FBQyxLQUFpQixFQUFFLElBQVM7O1FBR2hDLE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEdBQUcsS0FBSyxDQUFDOztRQUdwQyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2IsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDbEM7O1FBR0QsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNaLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzFCOztRQUdELElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDekI7Ozs7Ozs7Ozs7O0lBU0QsT0FBTyxDQUFDLEtBQW9CLEVBQUUsSUFBUztRQUVyQyxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUV0QixLQUFLLE9BQU8sQ0FBQyxPQUFPLENBQUM7WUFDckIsS0FBSyxPQUFPLENB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USxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN4RCx1QkFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDOztRQUdwRCxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzs7Ozs7Ozs7SUFNM0UsUUFBUSxDQUFDLEtBQW9CLEVBQUUsSUFBUzs7UUFHOUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsR0FBRyxLQUFLLENBQUM7O1FBR3BDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUMxQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDbkIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUM1Qjs7UUFHRCx1QkFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsT0FBTyxLQUFLLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQzs7UUFHekYsRUFBRSxDQUFDLENBQUMsUUFBUSxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUM7O1lBR3hCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUMzQixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQzNCO1lBRUQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUM5Qjs7Q0FFSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEtleUNvZGUgfSBmcm9tICcuL2tleWNvZGUuZW51bSc7XG5pbXBvcnQgeyBTZWxlY3Rpb25TdHJhdGVneSB9IGZyb20gJy4vc2VsZWN0aW9uLnN0cmF0ZWd5JztcblxuZXhwb3J0IGNsYXNzIFJvd1NlbGVjdGlvblN0cmF0ZWd5IGV4dGVuZHMgU2VsZWN0aW9uU3RyYXRlZ3kge1xuXG4gIC8vIHN0b3JlIHRoZSBtb3N0IHJlY2VudGx5IHNlbGVjdGVkIHJvd1xuICBwcml2YXRlIF9zZWxlY3Rpb246IFNlbGVjdGlvbiA9IHsgc3RhcnQ6IG51bGwsIGVuZDogbnVsbCB9O1xuXG4gIC8qKlxuICAgKiBCeSBkZWZhdWx0IG9uIHNoaWZ0IGNsaWNrIHRoZSBicm93c2VyIHdpbGwgaGlnaGxpZ2h0XG4gICAqIHRleHQuIFRoaXMgbG9va3MgYmFkIGFuZCB3ZSBkb24ndCB3YW50IHRoaXMgdG8gb2NjdXJcbiAgICovXG4gIG1vdXNlZG93bihldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIH1cblxuICAvKipcbiAgICogV2hlbiBhIHJvdyBpcyBjbGlja2VkIHdlIHdhbnQgdG8gaGFuZGxlIHNlbGVjdGlvblxuICAgKi9cbiAgY2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQsIGRhdGE6IGFueSk6IHZvaWQge1xuXG4gICAgLy8gZGV0ZXJtaW5lIHdoaWNoIG1vZGlmaWVyIGtleXMgYXJlIHByZXNzZWRcbiAgICBjb25zdCB7IGN0cmxLZXksIHNoaWZ0S2V5IH0gPSBldmVudDtcblxuICAgIC8vIGlmIHRoZSBzaGlmdCBrZXkgaXMgcHJlc3NlZCB3ZSB3YW50IHRvIHBlcmZvcm0gYSBtdWx0aXBsZSBzZWxlY3Rpb25cbiAgICBpZiAoc2hpZnRLZXkpIHtcbiAgICAgIHJldHVybiB0aGlzLm11bHRpcGxlU2VsZWN0KGRhdGEpO1xuICAgIH1cblxuICAgIC8vIGlmIHRoZSBjb250cm9sIGtleSBpcyBwcmVzc2VkIHdlIHdhbnQgdG8gcGVyZm9ybSBhbiBhZGRpdGl2ZSB0b2dnbGUgc2VsZWN0aW9uXG4gICAgaWYgKGN0cmxLZXkpIHtcbiAgICAgIHJldHVybiB0aGlzLnRvZ2dsZShkYXRhKTtcbiAgICB9XG5cbiAgICAvLyBwZXJmb3JtIGEgc2luZ2xlIHNlbGVjdGlvbiB3aGVyZSBhbGwgb3RoZXIgcm93cyBhcmUgZGVzZWxlY3RlZFxuICAgIHRoaXMuc2luZ2xlU2VsZWN0KGRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRvIHN1cHBvcnQgZnVsbCBrZXlib2FyZCBjb250cm9sIHdlIG5lZWQgdG8gc3VwcG9ydCB0aGUgZm9sbG93aW5nOlxuICAgKiAxLiBBcnJvdyBrZXlzIHRvIG5hdmlnYXRlIHVwIGFuZCBkb3duXG4gICAqIDIuIFNwYWNlYmFyIHRvIHRvZ2dsZSBzZWxlY3Rpb25cbiAgICogMy4gU2hpZnQgKyBBcnJvdyBrZXlzIHRvIG11bHRpcGxlIHNlbGVjdFxuICAgKiA0LiBDdHJsICsgQXJyb3cga2V5cyB0byBhbGxvdyByZXRhaW5lZCBzZWxlY3Rpb24gYW5kIG5hdmlnYXRpb25cbiAgICovXG4gIGtleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQsIGRhdGE6IGFueSk6IHZvaWQge1xuXG4gICAgc3dpdGNoIChldmVudC5rZXlDb2RlKSB7XG5cbiAgICAgIGNhc2UgS2V5Q29kZS5VcEFycm93OlxuICAgICAgY2FzZSBLZXlDb2RlLkRvd25BcnJvdzpcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5uYXZpZ2F0ZShldmVudCwgZGF0YSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIEtleUNvZGUuU3BhY2ViYXI6XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMuc2VsZWN0aW9uU2VydmljZS5zdHJhdGVneS50b2dnbGUoZGF0YSwgdHJ1ZSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE92ZXJyaWRlIHRoZSBzdGFuZGFyZCB0b2dnbGUgZnVuY3Rpb24gdG8gc3RvcmUgb3IgY2xlYXIgdGhlXG4gICAqIG1vc3QgcmVjZW50bHkgc2VsZWN0ZWQgaXRlbVxuICAgKi9cbiAgdG9nZ2xlKGRhdGE6IGFueSwgYWN0aXZhdGU6IGJvb2xlYW4gPSBmYWxzZSk6IHZvaWQge1xuICAgIHN1cGVyLnRvZ2dsZShkYXRhKTtcblxuICAgIC8vIHN0b3JlIG9yIGNsZWFyIHRoZSBzZWxlY3Rpb25cbiAgICB0aGlzLnNlbGVjdGlvblNlcnZpY2UuaXNTZWxlY3RlZChkYXRhKSA/IHRoaXMuc2V0U2VsZWN0aW9uU3RhcnQoZGF0YSkgOiB0aGlzLmNsZWFyU2VsZWN0aW9uKCk7XG5cbiAgICAvLyBpZiB3ZSB3YW50IHRvIGtlZXAgdGhlIGl0ZW0gYWN0aXZhdGVkIHRoZW4gYWN0aXZhdGVcbiAgICBpZiAoYWN0aXZhdGUpIHtcbiAgICAgIHRoaXMuc2VsZWN0aW9uU2VydmljZS5hY3RpdmF0ZShkYXRhKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2xlYXIgYWxsIG90aGVyIHNlbGVjdGVkIGl0ZW1zIGFuZCBzZWxlY3Qgb25seVxuICAgKiB0aGUgbW9zdCByZWNlbnRseSBzZWxlY3RlZCBpdGVtXG4gICAqL1xuICBwcml2YXRlIHNpbmdsZVNlbGVjdChkYXRhOiBhbnkpOiB2b2lkIHtcblxuICAgIC8vIGRlc2VsZWN0IGFsbCBvdGhlciByb3dzIGlmIG5laXRoZXIgbW9kaWZpZXIga2V5IGlzIHByZXNzZWRcbiAgICB0aGlzLmRlc2VsZWN0QWxsKCk7XG5cbiAgICAvLyBzZWxlY3QgdGhlIGN1cnJlbnQgcm93XG4gICAgdGhpcy5zZWxlY3QoZGF0YSk7XG5cbiAgICAvLyBzdG9yZSB0aGUgY3VycmVudCBpdGVtIGFzIHRoZSBzZWxlY3Rpb24gc3RhcnRcbiAgICB0aGlzLnNldFNlbGVjdGlvblN0YXJ0KGRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZSBtdWx0aXBsZSBzZWxlY3Rpb246XG4gICAqIDEuIElmIG5vIHN0YXJ0IGl0ZW0gc2VsZWN0ZWQgLSBzZWxlY3QgaXRcbiAgICogMi4gSWYgYSBzdGFydCBpdGVtIGhhcyBiZWVuIHNlbGVjdGVkIC0gc2VsZWN0IGFsbCBpbiBiZXR3ZWVuXG4gICAqIDMuIElmIGEgc3RhcnQgYW5kIGVuZCBpdGVtIGhhdmUgYmVlbiBzZWxlY3RlZCBjbGVhciB0aGUgcmFuZ2UgYW5kIHRoZW4gc2VsZWN0IHRoZSBuZXcgcmFuZ2VcbiAgICovXG4gIHByb3RlY3RlZCBtdWx0aXBsZVNlbGVjdChkYXRhOiBhbnkpOiB2b2lkIHtcblxuICAgIC8vIGlmIG5vIHNlbGVjdGlvbiBjdXJyZW50bHkgZXhpc3RzIHRoZW4gcGVyZm9ybSBpbml0aWFsIHNlbGVjdGlvblxuICAgIGlmICghdGhpcy5fc2VsZWN0aW9uLnN0YXJ0KSB7XG5cbiAgICAgIC8vIHNlbGVjdCB0aGUgcm93XG4gICAgICB0aGlzLnNlbGVjdChkYXRhKTtcblxuICAgICAgLy8gc3RvcmUgdGhlIHN0YXJ0aW5nIHBvaW50XG4gICAgICByZXR1cm4gdGhpcy5zZXRTZWxlY3Rpb25TdGFydChkYXRhKTtcbiAgICB9XG5cbiAgICAvLyBpZiBhIG11bHRpcGxlIHNlbGVjdGlvbiBhbHJlYWR5IHRvb2sgcGxhY2UgLSBjbGVhciB0aGUgcHJldmlvdXMgc2VsZWN0aW9uXG4gICAgaWYgKHRoaXMuX3NlbGVjdGlvbi5zdGFydCAmJiB0aGlzLl9zZWxlY3Rpb24uZW5kKSB7XG4gICAgICB0aGlzLmRlc2VsZWN0KC4uLnRoaXMuZ2V0U2VsZWN0ZWRJdGVtcygpKTtcbiAgICB9XG5cbiAgICAvLyBzZXQgdGhlIG5ldyBzZWxlY3Rpb24gZW5kIHBvaW50XG4gICAgdGhpcy5zZXRTZWxlY3Rpb25FbmQoZGF0YSk7XG5cbiAgICAvLyBzZWxlY3QgYWxsIHRoZSBpdGVtcyBpbiB0aGUgcmFuZ2VcbiAgICB0aGlzLnNlbGVjdCguLi50aGlzLmdldFNlbGVjdGVkSXRlbXMoKSk7XG4gIH1cblxuICAvKipcbiAgICogU2V0IHRoZSBzZWxlY3Rpb24gc3RhcnQgcG9pbnQuIElmIHRoZXJlIHdhcyBwcmV2aW91c2x5IGFcbiAgICogc2VsZWN0aW9uIGVuZCBwb2ludCB0aGVuIGNsZWFyIGl0IGFzIHRoaXMgaXMgYSBuZXcgc2VsZWN0aW9uXG4gICAqL1xuICBwcml2YXRlIHNldFNlbGVjdGlvblN0YXJ0KGRhdGE6IGFueSk6IHZvaWQge1xuICAgIHRoaXMuX3NlbGVjdGlvbi5zdGFydCA9IGRhdGE7XG4gICAgdGhpcy5fc2VsZWN0aW9uLmVuZCA9IG51bGw7XG5cbiAgICAvLyBhY3RpdmF0ZSB0aGUgaXRlbVxuICAgIHRoaXMuc2VsZWN0aW9uU2VydmljZS5hY3RpdmF0ZShkYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdGhlIHNlbGVjdGlvbiBlbmQgcG9pbnRcbiAgICovXG4gIHByaXZhdGUgc2V0U2VsZWN0aW9uRW5kKGRhdGE6IGFueSk6IHZvaWQge1xuICAgIHRoaXMuX3NlbGVjdGlvbi5lbmQgPSBkYXRhO1xuXG4gICAgLy8gYWN0aXZhdGUgdGhlIGl0ZW1cbiAgICB0aGlzLnNlbGVjdGlvblNlcnZpY2UuYWN0aXZhdGUoZGF0YSk7XG4gIH1cblxuICAvKipcbiAgICogQ2xlYXIgYm90aCBzdGFydCBhbmQgZW5kIHNlbGVjdGlvbiBwb2ludHNcbiAgICovXG4gIHByb3RlY3RlZCBjbGVhclNlbGVjdGlvbihkZWFjdGl2YXRlOiBib29sZWFuID0gdHJ1ZSk6IHZvaWQge1xuXG4gICAgLy8gcmVzZXQgdGhlIHNlbGVjdGVkIGl0ZW1cbiAgICB0aGlzLl9zZWxlY3Rpb24gPSB7IHN0YXJ0OiBudWxsLCBlbmQ6IG51bGwgfTtcblxuICAgIC8vIHJlbW92ZSB0aGUgY3VycmVudCBhY3RpdmUgaXRlbVxuICAgIGlmIChkZWFjdGl2YXRlKSB7XG4gICAgICB0aGlzLnNlbGVjdGlvblNlcnZpY2UuZGVhY3RpdmF0ZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmUgYWxsIHRoZSBpdGVtcyBhZmZlY3RlZCBieSB0aGUgY3VycmVudCBzZWxlY3Rpb24uXG4gICAqIE5vdGUgdGhhdCB0aGUgZW5kIHBvaW50IG1heSBiZSBhYm92ZSB0aGUgc3RhcnQgcG9pbnQgc29cbiAgICogd2UgbmVlZCB0byBhY2NvdW50IGZvciB0aGlzLlxuICAgKi9cbiAgcHJpdmF0ZSBnZXRTZWxlY3RlZEl0ZW1zKCk6IGFueVtdIHtcblxuICAgIC8vIGdldCB0aGUgbGF0ZXN0IGRhdGFzZXRcbiAgICBjb25zdCB7IGRhdGFzZXQgfSA9IHRoaXMuc2VsZWN0aW9uU2VydmljZTtcblxuICAgIC8vIGdldCB0aGUgaW5kZXhlcyBvZiB0aGUgc3RhcnQgYW5kIGVuZCBwb2ludFxuICAgIGNvbnN0IHN0YXJ0SWR4ID0gZGF0YXNldC5pbmRleE9mKHRoaXMuX3NlbGVjdGlvbi5zdGFydCk7XG4gICAgY29uc3QgZW5kSWR4ID0gZGF0YXNldC5pbmRleE9mKHRoaXMuX3NlbGVjdGlvbi5lbmQpO1xuXG4gICAgLy8gZ2V0IHRoZSByZWdpb24gb2YgdGhlIGFycmF5IHRoYXQgaXMgc2VsZWN0ZWQgLSBub3RlIHRoZSBlbmRJZHggbWF5IGJlIGJlZm9yZSB0aGUgc3RhcnRJZHggc28gYWNjb3VudCBmb3IgdGhpc1xuICAgIHJldHVybiBkYXRhc2V0LnNsaWNlKE1hdGgubWluKHN0YXJ0SWR4LCBlbmRJZHgpLCBNYXRoLm1heChzdGFydElkeCwgZW5kSWR4KSArIDEpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFjdGl2YXRlIHRoZSBzaWJsaW5nIGl0ZW0gd2hlbiBhcnJvdyBrZXlzIGFyZSBwcmVzc2VkXG4gICAqL1xuICBwcml2YXRlIG5hdmlnYXRlKGV2ZW50OiBLZXlib2FyZEV2ZW50LCBkYXRhOiBhbnkpOiB2b2lkIHtcblxuICAgIC8vIGRldGVybWluZSB3aGljaCBtb2RpZmllciBrZXlzIGFyZSBwcmVzc2VkXG4gICAgY29uc3QgeyBjdHJsS2V5LCBzaGlmdEtleSB9ID0gZXZlbnQ7XG5cbiAgICAvLyBpZiBubyBtb2RpZmllciBrZXlzIGFyZSBwcmVzc2VkIHRoZW4gZGVzZWxlY3QgYWxsIGFuZCBjbGVhciB0aGUgc2VsZWN0aW9uXG4gICAgaWYgKCFjdHJsS2V5ICYmICFzaGlmdEtleSkge1xuICAgICAgdGhpcy5kZXNlbGVjdEFsbCgpO1xuICAgICAgdGhpcy5jbGVhclNlbGVjdGlvbihmYWxzZSk7XG4gICAgfVxuXG4gICAgLy8gYWN0aXZhdGUgdGhlIHNpYmxpbmcgLSBpZiB0aGUgdXAgYXJyb3cgaXMgcHJlc3NlZCB0aGVuIG5hdmlnYXRlIHRvIHRoZSBwcmV2aW91cyBzaWJsaW5nXG4gICAgY29uc3Qgc2libGluZyA9IHRoaXMuc2VsZWN0aW9uU2VydmljZS5hY3RpdmF0ZVNpYmxpbmcoZXZlbnQua2V5Q29kZSA9PT0gS2V5Q29kZS5VcEFycm93KTtcblxuICAgIC8vIGlmIHRoZSBzaGlmdCBrZXkgaXMgcHJlc3NlZCB0aGVuIHdlIGFsc28gd2FudCB0byB0b2dnbGUgdGhlIHN0YXRlIGlmIHRoZSBpdGVtXG4gICAgaWYgKHNoaWZ0S2V5ICYmIHNpYmxpbmcpIHtcblxuICAgICAgLy8gaWYgdGhlcmUgaXMgbm8gY3VycmVudCBzZWxlY3Rpb24gc3RhcnQgdGhlbiBzZWxlY3QgdGhlIGN1cnJlbnQgcm93XG4gICAgICBpZiAoIXRoaXMuX3NlbGVjdGlvbi5zdGFydCkge1xuICAgICAgICB0aGlzLm11bHRpcGxlU2VsZWN0KGRhdGEpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLm11bHRpcGxlU2VsZWN0KHNpYmxpbmcpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNlbGVjdGlvbiB7XG4gIHN0YXJ0OiBhbnk7XG4gIGVuZDogYW55O1xufVxuIl19