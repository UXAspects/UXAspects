/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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
/** @enum {number} */
const KeyCode = {
    UpArrow: 38,
    DownArrow: 40,
    Spacebar: 32,
};
KeyCode[KeyCode.UpArrow] = "UpArrow";
KeyCode[KeyCode.DownArrow] = "DownArrow";
KeyCode[KeyCode.Spacebar] = "Spacebar";

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93LXNlbGVjdGlvbi5zdHJhdGVneS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL3NlbGVjdGlvbi9zdHJhdGVnaWVzL3Jvdy1zZWxlY3Rpb24uc3RyYXRlZ3kudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRXpELE1BQU0sMkJBQTRCLFNBQVEsaUJBQWlCOzs7MEJBR3pCLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFOzs7Ozs7OztJQU0xRCxTQUFTLENBQUMsS0FBaUI7UUFDekIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO0tBQ3hCOzs7Ozs7O0lBS0QsS0FBSyxDQUFDLEtBQWlCLEVBQUUsSUFBUzs7UUFHaEMsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsR0FBRyxLQUFLLENBQUM7O1FBR3BDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDYixNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNsQzs7UUFHRCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ1osTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDMUI7O1FBR0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUN6Qjs7Ozs7Ozs7Ozs7SUFTRCxPQUFPLENBQUMsS0FBb0IsRUFBRSxJQUFTO1FBRXJDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBRXRCLEtBQUssT0FBTyxDQUFDLE9BQU8sQ0FBQztZQUNyQixLQUFLLE9BQU8sQ0FBQyxTQUFTO2dCQUNwQixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JB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QU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQzs7UUFHcEQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Ozs7Ozs7O0lBTTNFLFFBQVEsQ0FBQyxLQUFvQixFQUFFLElBQVM7O1FBRzlDLE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEdBQUcsS0FBSyxDQUFDOztRQUdwQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDMUIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ25CLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDNUI7O1FBR0QsdUJBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLE9BQU8sS0FBSyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7O1FBR3pGLEVBQUUsQ0FBQyxDQUFDLFFBQVEsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDOztZQUd4QixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDM0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUMzQjtZQUVELElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDOUI7O0NBRUoiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTZWxlY3Rpb25TdHJhdGVneSB9IGZyb20gJy4vc2VsZWN0aW9uLnN0cmF0ZWd5JztcblxuZXhwb3J0IGNsYXNzIFJvd1NlbGVjdGlvblN0cmF0ZWd5IGV4dGVuZHMgU2VsZWN0aW9uU3RyYXRlZ3kge1xuXG4gIC8vIHN0b3JlIHRoZSBtb3N0IHJlY2VudGx5IHNlbGVjdGVkIHJvd1xuICBwcml2YXRlIF9zZWxlY3Rpb246IFNlbGVjdGlvbiA9IHsgc3RhcnQ6IG51bGwsIGVuZDogbnVsbCB9O1xuXG4gIC8qKlxuICAgKiBCeSBkZWZhdWx0IG9uIHNoaWZ0IGNsaWNrIHRoZSBicm93c2VyIHdpbGwgaGlnaGxpZ2h0XG4gICAqIHRleHQuIFRoaXMgbG9va3MgYmFkIGFuZCB3ZSBkb24ndCB3YW50IHRoaXMgdG8gb2NjdXJcbiAgICovXG4gIG1vdXNlZG93bihldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIH1cblxuICAvKipcbiAgICogV2hlbiBhIHJvdyBpcyBjbGlja2VkIHdlIHdhbnQgdG8gaGFuZGxlIHNlbGVjdGlvblxuICAgKi9cbiAgY2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQsIGRhdGE6IGFueSk6IHZvaWQge1xuXG4gICAgLy8gZGV0ZXJtaW5lIHdoaWNoIG1vZGlmaWVyIGtleXMgYXJlIHByZXNzZWRcbiAgICBjb25zdCB7IGN0cmxLZXksIHNoaWZ0S2V5IH0gPSBldmVudDtcblxuICAgIC8vIGlmIHRoZSBzaGlmdCBrZXkgaXMgcHJlc3NlZCB3ZSB3YW50IHRvIHBlcmZvcm0gYSBtdWx0aXBsZSBzZWxlY3Rpb25cbiAgICBpZiAoc2hpZnRLZXkpIHtcbiAgICAgIHJldHVybiB0aGlzLm11bHRpcGxlU2VsZWN0KGRhdGEpO1xuICAgIH1cblxuICAgIC8vIGlmIHRoZSBjb250cm9sIGtleSBpcyBwcmVzc2VkIHdlIHdhbnQgdG8gcGVyZm9ybSBhbiBhZGRpdGl2ZSB0b2dnbGUgc2VsZWN0aW9uXG4gICAgaWYgKGN0cmxLZXkpIHtcbiAgICAgIHJldHVybiB0aGlzLnRvZ2dsZShkYXRhKTtcbiAgICB9XG5cbiAgICAvLyBwZXJmb3JtIGEgc2luZ2xlIHNlbGVjdGlvbiB3aGVyZSBhbGwgb3RoZXIgcm93cyBhcmUgZGVzZWxlY3RlZFxuICAgIHRoaXMuc2luZ2xlU2VsZWN0KGRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRvIHN1cHBvcnQgZnVsbCBrZXlib2FyZCBjb250cm9sIHdlIG5lZWQgdG8gc3VwcG9ydCB0aGUgZm9sbG93aW5nOlxuICAgKiAxLiBBcnJvdyBrZXlzIHRvIG5hdmlnYXRlIHVwIGFuZCBkb3duXG4gICAqIDIuIFNwYWNlYmFyIHRvIHRvZ2dsZSBzZWxlY3Rpb25cbiAgICogMy4gU2hpZnQgKyBBcnJvdyBrZXlzIHRvIG11bHRpcGxlIHNlbGVjdFxuICAgKiA0LiBDdHJsICsgQXJyb3cga2V5cyB0byBhbGxvdyByZXRhaW5lZCBzZWxlY3Rpb24gYW5kIG5hdmlnYXRpb25cbiAgICovXG4gIGtleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQsIGRhdGE6IGFueSk6IHZvaWQge1xuXG4gICAgc3dpdGNoIChldmVudC5rZXlDb2RlKSB7XG5cbiAgICAgIGNhc2UgS2V5Q29kZS5VcEFycm93OlxuICAgICAgY2FzZSBLZXlDb2RlLkRvd25BcnJvdzpcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5uYXZpZ2F0ZShldmVudCwgZGF0YSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgICBcbiAgICAgIGNhc2UgS2V5Q29kZS5TcGFjZWJhcjpcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5zZWxlY3Rpb25TZXJ2aWNlLnN0cmF0ZWd5LnRvZ2dsZShkYXRhLCB0cnVlKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogT3ZlcnJpZGUgdGhlIHN0YW5kYXJkIHRvZ2dsZSBmdW5jdGlvbiB0byBzdG9yZSBvciBjbGVhciB0aGVcbiAgICogbW9zdCByZWNlbnRseSBzZWxlY3RlZCBpdGVtXG4gICAqL1xuICB0b2dnbGUoZGF0YTogYW55LCBhY3RpdmF0ZTogYm9vbGVhbiA9IGZhbHNlKTogdm9pZCB7XG4gICAgc3VwZXIudG9nZ2xlKGRhdGEpO1xuXG4gICAgLy8gc3RvcmUgb3IgY2xlYXIgdGhlIHNlbGVjdGlvblxuICAgIHRoaXMuc2VsZWN0aW9uU2VydmljZS5pc1NlbGVjdGVkKGRhdGEpID8gdGhpcy5zZXRTZWxlY3Rpb25TdGFydChkYXRhKSA6IHRoaXMuY2xlYXJTZWxlY3Rpb24oKTtcblxuICAgIC8vIGlmIHdlIHdhbnQgdG8ga2VlcCB0aGUgaXRlbSBhY3RpdmF0ZWQgdGhlbiBhY3RpdmF0ZVxuICAgIGlmIChhY3RpdmF0ZSkge1xuICAgICAgdGhpcy5zZWxlY3Rpb25TZXJ2aWNlLmFjdGl2YXRlKGRhdGEpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhciBhbGwgb3RoZXIgc2VsZWN0ZWQgaXRlbXMgYW5kIHNlbGVjdCBvbmx5XG4gICAqIHRoZSBtb3N0IHJlY2VudGx5IHNlbGVjdGVkIGl0ZW1cbiAgICovXG4gIHByaXZhdGUgc2luZ2xlU2VsZWN0KGRhdGE6IGFueSk6IHZvaWQge1xuXG4gICAgLy8gZGVzZWxlY3QgYWxsIG90aGVyIHJvd3MgaWYgbmVpdGhlciBtb2RpZmllciBrZXkgaXMgcHJlc3NlZFxuICAgIHRoaXMuZGVzZWxlY3RBbGwoKTtcblxuICAgIC8vIHNlbGVjdCB0aGUgY3VycmVudCByb3dcbiAgICB0aGlzLnNlbGVjdChkYXRhKTtcblxuICAgIC8vIHN0b3JlIHRoZSBjdXJyZW50IGl0ZW0gYXMgdGhlIHNlbGVjdGlvbiBzdGFydFxuICAgIHRoaXMuc2V0U2VsZWN0aW9uU3RhcnQoZGF0YSk7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlIG11bHRpcGxlIHNlbGVjdGlvbjpcbiAgICogMS4gSWYgbm8gc3RhcnQgaXRlbSBzZWxlY3RlZCAtIHNlbGVjdCBpdFxuICAgKiAyLiBJZiBhIHN0YXJ0IGl0ZW0gaGFzIGJlZW4gc2VsZWN0ZWQgLSBzZWxlY3QgYWxsIGluIGJldHdlZW5cbiAgICogMy4gSWYgYSBzdGFydCBhbmQgZW5kIGl0ZW0gaGF2ZSBiZWVuIHNlbGVjdGVkIGNsZWFyIHRoZSByYW5nZSBhbmQgdGhlbiBzZWxlY3QgdGhlIG5ldyByYW5nZVxuICAgKi9cbiAgcHJpdmF0ZSBtdWx0aXBsZVNlbGVjdChkYXRhOiBhbnkpOiB2b2lkIHtcblxuICAgIC8vIGlmIG5vIHNlbGVjdGlvbiBjdXJyZW50bHkgZXhpc3RzIHRoZW4gcGVyZm9ybSBpbml0aWFsIHNlbGVjdGlvblxuICAgIGlmICghdGhpcy5fc2VsZWN0aW9uLnN0YXJ0KSB7XG5cbiAgICAgIC8vIHNlbGVjdCB0aGUgcm93XG4gICAgICB0aGlzLnNlbGVjdChkYXRhKTtcblxuICAgICAgLy8gc3RvcmUgdGhlIHN0YXJ0aW5nIHBvaW50XG4gICAgICByZXR1cm4gdGhpcy5zZXRTZWxlY3Rpb25TdGFydChkYXRhKTtcbiAgICB9XG5cbiAgICAvLyBpZiBhIG11bHRpcGxlIHNlbGVjdGlvbiBhbHJlYWR5IHRvb2sgcGxhY2UgLSBjbGVhciB0aGUgcHJldmlvdXMgc2VsZWN0aW9uXG4gICAgaWYgKHRoaXMuX3NlbGVjdGlvbi5zdGFydCAmJiB0aGlzLl9zZWxlY3Rpb24uZW5kKSB7XG4gICAgICB0aGlzLmRlc2VsZWN0KC4uLnRoaXMuZ2V0U2VsZWN0ZWRJdGVtcygpKTtcbiAgICB9XG5cbiAgICAvLyBzZXQgdGhlIG5ldyBzZWxlY3Rpb24gZW5kIHBvaW50XG4gICAgdGhpcy5zZXRTZWxlY3Rpb25FbmQoZGF0YSk7XG5cbiAgICAvLyBzZWxlY3QgYWxsIHRoZSBpdGVtcyBpbiB0aGUgcmFuZ2VcbiAgICB0aGlzLnNlbGVjdCguLi50aGlzLmdldFNlbGVjdGVkSXRlbXMoKSk7XG4gIH1cblxuICAvKipcbiAgICogU2V0IHRoZSBzZWxlY3Rpb24gc3RhcnQgcG9pbnQuIElmIHRoZXJlIHdhcyBwcmV2aW91c2x5IGFcbiAgICogc2VsZWN0aW9uIGVuZCBwb2ludCB0aGVuIGNsZWFyIGl0IGFzIHRoaXMgaXMgYSBuZXcgc2VsZWN0aW9uXG4gICAqL1xuICBwcml2YXRlIHNldFNlbGVjdGlvblN0YXJ0KGRhdGE6IGFueSk6IHZvaWQge1xuICAgIHRoaXMuX3NlbGVjdGlvbi5zdGFydCA9IGRhdGE7XG4gICAgdGhpcy5fc2VsZWN0aW9uLmVuZCA9IG51bGw7XG5cbiAgICAvLyBhY3RpdmF0ZSB0aGUgaXRlbVxuICAgIHRoaXMuc2VsZWN0aW9uU2VydmljZS5hY3RpdmF0ZShkYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdGhlIHNlbGVjdGlvbiBlbmQgcG9pbnRcbiAgICovXG4gIHByaXZhdGUgc2V0U2VsZWN0aW9uRW5kKGRhdGE6IGFueSk6IHZvaWQge1xuICAgIHRoaXMuX3NlbGVjdGlvbi5lbmQgPSBkYXRhO1xuXG4gICAgLy8gYWN0aXZhdGUgdGhlIGl0ZW1cbiAgICB0aGlzLnNlbGVjdGlvblNlcnZpY2UuYWN0aXZhdGUoZGF0YSk7XG4gIH1cblxuICAvKipcbiAgICogQ2xlYXIgYm90aCBzdGFydCBhbmQgZW5kIHNlbGVjdGlvbiBwb2ludHNcbiAgICovXG4gIHByaXZhdGUgY2xlYXJTZWxlY3Rpb24oZGVhY3RpdmF0ZTogYm9vbGVhbiA9IHRydWUpOiB2b2lkIHtcblxuICAgIC8vIHJlc2V0IHRoZSBzZWxlY3RlZCBpdGVtXG4gICAgdGhpcy5fc2VsZWN0aW9uID0geyBzdGFydDogbnVsbCwgZW5kOiBudWxsIH07XG5cbiAgICAvLyByZW1vdmUgdGhlIGN1cnJlbnQgYWN0aXZlIGl0ZW1cbiAgICBpZiAoZGVhY3RpdmF0ZSkge1xuICAgICAgdGhpcy5zZWxlY3Rpb25TZXJ2aWNlLmRlYWN0aXZhdGUoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRGV0ZXJtaW5lIGFsbCB0aGUgaXRlbXMgYWZmZWN0ZWQgYnkgdGhlIGN1cnJlbnQgc2VsZWN0aW9uLlxuICAgKiBOb3RlIHRoYXQgdGhlIGVuZCBwb2ludCBtYXkgYmUgYWJvdmUgdGhlIHN0YXJ0IHBvaW50IHNvXG4gICAqIHdlIG5lZWQgdG8gYWNjb3VudCBmb3IgdGhpcy5cbiAgICovXG4gIHByaXZhdGUgZ2V0U2VsZWN0ZWRJdGVtcygpOiBhbnlbXSB7XG5cbiAgICAvLyBnZXQgdGhlIGxhdGVzdCBkYXRhc2V0XG4gICAgY29uc3QgeyBkYXRhc2V0IH0gPSB0aGlzLnNlbGVjdGlvblNlcnZpY2U7XG5cbiAgICAvLyBnZXQgdGhlIGluZGV4ZXMgb2YgdGhlIHN0YXJ0IGFuZCBlbmQgcG9pbnRcbiAgICBjb25zdCBzdGFydElkeCA9IGRhdGFzZXQuaW5kZXhPZih0aGlzLl9zZWxlY3Rpb24uc3RhcnQpO1xuICAgIGNvbnN0IGVuZElkeCA9IGRhdGFzZXQuaW5kZXhPZih0aGlzLl9zZWxlY3Rpb24uZW5kKTtcblxuICAgIC8vIGdldCB0aGUgcmVnaW9uIG9mIHRoZSBhcnJheSB0aGF0IGlzIHNlbGVjdGVkIC0gbm90ZSB0aGUgZW5kSWR4IG1heSBiZSBiZWZvcmUgdGhlIHN0YXJ0SWR4IHNvIGFjY291bnQgZm9yIHRoaXNcbiAgICByZXR1cm4gZGF0YXNldC5zbGljZShNYXRoLm1pbihzdGFydElkeCwgZW5kSWR4KSwgTWF0aC5tYXgoc3RhcnRJZHgsIGVuZElkeCkgKyAxKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBY3RpdmF0ZSB0aGUgc2libGluZyBpdGVtIHdoZW4gYXJyb3cga2V5cyBhcmUgcHJlc3NlZFxuICAgKi9cbiAgcHJpdmF0ZSBuYXZpZ2F0ZShldmVudDogS2V5Ym9hcmRFdmVudCwgZGF0YTogYW55KTogdm9pZCB7XG5cbiAgICAvLyBkZXRlcm1pbmUgd2hpY2ggbW9kaWZpZXIga2V5cyBhcmUgcHJlc3NlZFxuICAgIGNvbnN0IHsgY3RybEtleSwgc2hpZnRLZXkgfSA9IGV2ZW50O1xuXG4gICAgLy8gaWYgbm8gbW9kaWZpZXIga2V5cyBhcmUgcHJlc3NlZCB0aGVuIGRlc2VsZWN0IGFsbCBhbmQgY2xlYXIgdGhlIHNlbGVjdGlvblxuICAgIGlmICghY3RybEtleSAmJiAhc2hpZnRLZXkpIHtcbiAgICAgIHRoaXMuZGVzZWxlY3RBbGwoKTtcbiAgICAgIHRoaXMuY2xlYXJTZWxlY3Rpb24oZmFsc2UpO1xuICAgIH1cblxuICAgIC8vIGFjdGl2YXRlIHRoZSBzaWJsaW5nIC0gaWYgdGhlIHVwIGFycm93IGlzIHByZXNzZWQgdGhlbiBuYXZpZ2F0ZSB0byB0aGUgcHJldmlvdXMgc2libGluZ1xuICAgIGNvbnN0IHNpYmxpbmcgPSB0aGlzLnNlbGVjdGlvblNlcnZpY2UuYWN0aXZhdGVTaWJsaW5nKGV2ZW50LmtleUNvZGUgPT09IEtleUNvZGUuVXBBcnJvdyk7XG5cbiAgICAvLyBpZiB0aGUgc2hpZnQga2V5IGlzIHByZXNzZWQgdGhlbiB3ZSBhbHNvIHdhbnQgdG8gdG9nZ2xlIHRoZSBzdGF0ZSBpZiB0aGUgaXRlbVxuICAgIGlmIChzaGlmdEtleSAmJiBzaWJsaW5nKSB7XG5cbiAgICAgIC8vIGlmIHRoZXJlIGlzIG5vIGN1cnJlbnQgc2VsZWN0aW9uIHN0YXJ0IHRoZW4gc2VsZWN0IHRoZSBjdXJyZW50IHJvd1xuICAgICAgaWYgKCF0aGlzLl9zZWxlY3Rpb24uc3RhcnQpIHtcbiAgICAgICAgdGhpcy5tdWx0aXBsZVNlbGVjdChkYXRhKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5tdWx0aXBsZVNlbGVjdChzaWJsaW5nKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBTZWxlY3Rpb24ge1xuICBzdGFydDogYW55O1xuICBlbmQ6IGFueTtcbn1cblxuZW51bSBLZXlDb2RlIHtcbiAgVXBBcnJvdyA9IDM4LFxuICBEb3duQXJyb3cgPSA0MCxcbiAgU3BhY2ViYXIgPSAzMlxufVxuIl19