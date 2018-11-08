/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { DOWN_ARROW, SPACE, UP_ARROW } from '@angular/cdk/keycodes';
import { SelectionStrategy } from './selection.strategy';
/**
 * @template T
 */
var /**
 * @template T
 */
RowSelectionStrategy = /** @class */ (function (_super) {
    tslib_1.__extends(RowSelectionStrategy, _super);
    function RowSelectionStrategy() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._selection = { start: null, end: null };
        return _this;
    }
    /**
     * By default on shift click the browser will highlight
     * text. This looks bad and we don't want this to occur
     */
    /**
     * By default on shift click the browser will highlight
     * text. This looks bad and we don't want this to occur
     * @param {?} event
     * @return {?}
     */
    RowSelectionStrategy.prototype.mousedown = /**
     * By default on shift click the browser will highlight
     * text. This looks bad and we don't want this to occur
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.preventDefault();
    };
    /**
     * When a row is clicked we want to handle selection
     */
    /**
     * When a row is clicked we want to handle selection
     * @param {?} event
     * @param {?} data
     * @return {?}
     */
    RowSelectionStrategy.prototype.click = /**
     * When a row is clicked we want to handle selection
     * @param {?} event
     * @param {?} data
     * @return {?}
     */
    function (event, data) {
        // determine which modifier keys are pressed
        var ctrlKey = event.ctrlKey, shiftKey = event.shiftKey;
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
    };
    /**
     * To support full keyboard control we need to support the following:
     * 1. Arrow keys to navigate up and down
     * 2. Spacebar to toggle selection
     * 3. Shift + Arrow keys to multiple select
     * 4. Ctrl + Arrow keys to allow retained selection and navigation
     */
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
    RowSelectionStrategy.prototype.keydown = /**
     * To support full keyboard control we need to support the following:
     * 1. Arrow keys to navigate up and down
     * 2. Spacebar to toggle selection
     * 3. Shift + Arrow keys to multiple select
     * 4. Ctrl + Arrow keys to allow retained selection and navigation
     * @param {?} event
     * @param {?} data
     * @return {?}
     */
    function (event, data) {
        switch (event.which) {
            case UP_ARROW:
            case DOWN_ARROW:
                event.preventDefault();
                this.navigate(event, data);
                break;
            case SPACE:
                event.preventDefault();
                this.selectionService.strategy.toggle(data);
                // also activate the item
                this.selectionService.activate(data);
                break;
        }
    };
    /**
     * Override the standard toggle function to store or clear the
     * most recently selected item
     */
    /**
     * Override the standard toggle function to store or clear the
     * most recently selected item
     * @param {?} data
     * @return {?}
     */
    RowSelectionStrategy.prototype.toggle = /**
     * Override the standard toggle function to store or clear the
     * most recently selected item
     * @param {?} data
     * @return {?}
     */
    function (data) {
        _super.prototype.toggle.call(this, data);
        // store or clear the selection
        this.selectionService.isSelected(data) ? this.setSelectionStart(data) : this.clearSelection();
    };
    /**
     * Clear all other selected items and select only
     * the most recently selected item
     * @param {?} data
     * @return {?}
     */
    RowSelectionStrategy.prototype.singleSelect = /**
     * Clear all other selected items and select only
     * the most recently selected item
     * @param {?} data
     * @return {?}
     */
    function (data) {
        // deselect all other rows if neither modifier key is pressed
        this.deselectAll();
        // select the current row
        this.select(data);
        // store the current item as the selection start
        this.setSelectionStart(data);
    };
    /**
     * Handle multiple selection:
     * 1. If no start item selected - select it
     * 2. If a start item has been selected - select all in between
     * 3. If a start and end item have been selected clear the range and then select the new range
     */
    /**
     * Handle multiple selection:
     * 1. If no start item selected - select it
     * 2. If a start item has been selected - select all in between
     * 3. If a start and end item have been selected clear the range and then select the new range
     * @param {?} data
     * @return {?}
     */
    RowSelectionStrategy.prototype.multipleSelect = /**
     * Handle multiple selection:
     * 1. If no start item selected - select it
     * 2. If a start item has been selected - select all in between
     * 3. If a start and end item have been selected clear the range and then select the new range
     * @param {?} data
     * @return {?}
     */
    function (data) {
        // if no selection currently exists then perform initial selection
        if (!this._selection.start) {
            // select the row
            this.select(data);
            // store the starting point
            return this.setSelectionStart(data);
        }
        // if a multiple selection already took place - clear the previous selection
        if (this._selection.start && this._selection.end) {
            this.deselect.apply(this, tslib_1.__spread(this.getSelectedItems()));
        }
        // set the new selection end point
        this.setSelectionEnd(data);
        // select all the items in the range
        this.select.apply(this, tslib_1.__spread(this.getSelectedItems()));
    };
    /**
     * Set the selection start point. If there was previously a
     * selection end point then clear it as this is a new selection
     * @param {?} data
     * @return {?}
     */
    RowSelectionStrategy.prototype.setSelectionStart = /**
     * Set the selection start point. If there was previously a
     * selection end point then clear it as this is a new selection
     * @param {?} data
     * @return {?}
     */
    function (data) {
        this._selection.start = data;
        this._selection.end = null;
        // activate the item
        this.selectionService.activate(data);
    };
    /**
     * Set the selection end point
     * @param {?} data
     * @return {?}
     */
    RowSelectionStrategy.prototype.setSelectionEnd = /**
     * Set the selection end point
     * @param {?} data
     * @return {?}
     */
    function (data) {
        this._selection.end = data;
        // activate the item
        this.selectionService.activate(data);
    };
    /**
     * Clear both start and end selection points
     */
    /**
     * Clear both start and end selection points
     * @param {?=} deactivate
     * @return {?}
     */
    RowSelectionStrategy.prototype.clearSelection = /**
     * Clear both start and end selection points
     * @param {?=} deactivate
     * @return {?}
     */
    function (deactivate) {
        if (deactivate === void 0) { deactivate = true; }
        // reset the selected item
        this._selection = { start: null, end: null };
        // remove the current active item
        if (deactivate) {
            this.selectionService.deactivate();
        }
    };
    /**
     * Determine all the items affected by the current selection.
     * Note that the end point may be above the start point so
     * we need to account for this.
     * @return {?}
     */
    RowSelectionStrategy.prototype.getSelectedItems = /**
     * Determine all the items affected by the current selection.
     * Note that the end point may be above the start point so
     * we need to account for this.
     * @return {?}
     */
    function () {
        // get the latest dataset
        var dataset = this.selectionService.dataset;
        // get the indexes of the start and end point
        var /** @type {?} */ startIdx = dataset.indexOf(this._selection.start);
        var /** @type {?} */ endIdx = dataset.indexOf(this._selection.end);
        // get the region of the array that is selected - note the endIdx may be before the startIdx so account for this
        return dataset.slice(Math.min(startIdx, endIdx), Math.max(startIdx, endIdx) + 1);
    };
    /**
     * Activate the sibling item when arrow keys are pressed
     * @param {?} event
     * @param {?} data
     * @return {?}
     */
    RowSelectionStrategy.prototype.navigate = /**
     * Activate the sibling item when arrow keys are pressed
     * @param {?} event
     * @param {?} data
     * @return {?}
     */
    function (event, data) {
        // determine which modifier keys are pressed
        var ctrlKey = event.ctrlKey, shiftKey = event.shiftKey;
        // if no modifier keys are pressed then deselect all and clear the selection
        if (!ctrlKey && !shiftKey) {
            this.deselectAll();
            this.clearSelection(false);
        }
        // activate the sibling - if the up arrow is pressed then navigate to the previous sibling
        var /** @type {?} */ sibling = this.selectionService.activateSibling(event.which === UP_ARROW);
        // if the shift key is pressed then we also want to toggle the state if the item
        if (shiftKey && sibling) {
            // if there is no current selection start then select the current row
            if (!this._selection.start) {
                this.multipleSelect(data);
            }
            this.multipleSelect(sibling);
        }
    };
    return RowSelectionStrategy;
}(SelectionStrategy));
/**
 * @template T
 */
export { RowSelectionStrategy };
function RowSelectionStrategy_tsickle_Closure_declarations() {
    /** @type {?} */
    RowSelectionStrategy.prototype._selection;
}
/**
 * @record
 * @template T
 */
export function Selection() { }
function Selection_tsickle_Closure_declarations() {
    /** @type {?} */
    Selection.prototype.start;
    /** @type {?} */
    Selection.prototype.end;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93LXNlbGVjdGlvbi5zdHJhdGVneS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL3NlbGVjdGlvbi9zdHJhdGVnaWVzL3Jvdy1zZWxlY3Rpb24uc3RyYXRlZ3kudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNwRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7OztBQUV6RDs7O0FBQUE7SUFBNkMsZ0RBQW9COzs7MkJBRzVCLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFOzs7SUFFN0Q7OztPQUdHOzs7Ozs7O0lBQ0gsd0NBQVM7Ozs7OztJQUFULFVBQVUsS0FBaUI7UUFDekIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO0tBQ3hCO0lBRUQ7O09BRUc7Ozs7Ozs7SUFDSCxvQ0FBSzs7Ozs7O0lBQUwsVUFBTSxLQUFpQixFQUFFLElBQU87O1FBR3RCLElBQUEsdUJBQU8sRUFBRSx5QkFBUSxDQUFXOztRQUdwQyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2IsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDbEM7O1FBR0QsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNaLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzFCOztRQUdELElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDekI7SUFFRDs7Ozs7O09BTUc7Ozs7Ozs7Ozs7O0lBQ0gsc0NBQU87Ozs7Ozs7Ozs7SUFBUCxVQUFRLEtBQW9CLEVBQUUsSUFBTztRQUVuQyxNQUFNLENBQUMsQ0FBQyxL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Z0NBME1DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRE9XTl9BUlJPVywgU1BBQ0UsIFVQX0FSUk9XIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7IFNlbGVjdGlvblN0cmF0ZWd5IH0gZnJvbSAnLi9zZWxlY3Rpb24uc3RyYXRlZ3knO1xuXG5leHBvcnQgY2xhc3MgUm93U2VsZWN0aW9uU3RyYXRlZ3k8VD4gZXh0ZW5kcyBTZWxlY3Rpb25TdHJhdGVneTxUPiB7XG5cbiAgLy8gc3RvcmUgdGhlIG1vc3QgcmVjZW50bHkgc2VsZWN0ZWQgcm93XG4gIHByaXZhdGUgX3NlbGVjdGlvbjogU2VsZWN0aW9uPFQ+ID0geyBzdGFydDogbnVsbCwgZW5kOiBudWxsIH07XG5cbiAgLyoqXG4gICAqIEJ5IGRlZmF1bHQgb24gc2hpZnQgY2xpY2sgdGhlIGJyb3dzZXIgd2lsbCBoaWdobGlnaHRcbiAgICogdGV4dC4gVGhpcyBsb29rcyBiYWQgYW5kIHdlIGRvbid0IHdhbnQgdGhpcyB0byBvY2N1clxuICAgKi9cbiAgbW91c2Vkb3duKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBXaGVuIGEgcm93IGlzIGNsaWNrZWQgd2Ugd2FudCB0byBoYW5kbGUgc2VsZWN0aW9uXG4gICAqL1xuICBjbGljayhldmVudDogTW91c2VFdmVudCwgZGF0YTogVCk6IHZvaWQge1xuXG4gICAgLy8gZGV0ZXJtaW5lIHdoaWNoIG1vZGlmaWVyIGtleXMgYXJlIHByZXNzZWRcbiAgICBjb25zdCB7IGN0cmxLZXksIHNoaWZ0S2V5IH0gPSBldmVudDtcblxuICAgIC8vIGlmIHRoZSBzaGlmdCBrZXkgaXMgcHJlc3NlZCB3ZSB3YW50IHRvIHBlcmZvcm0gYSBtdWx0aXBsZSBzZWxlY3Rpb25cbiAgICBpZiAoc2hpZnRLZXkpIHtcbiAgICAgIHJldHVybiB0aGlzLm11bHRpcGxlU2VsZWN0KGRhdGEpO1xuICAgIH1cblxuICAgIC8vIGlmIHRoZSBjb250cm9sIGtleSBpcyBwcmVzc2VkIHdlIHdhbnQgdG8gcGVyZm9ybSBhbiBhZGRpdGl2ZSB0b2dnbGUgc2VsZWN0aW9uXG4gICAgaWYgKGN0cmxLZXkpIHtcbiAgICAgIHJldHVybiB0aGlzLnRvZ2dsZShkYXRhKTtcbiAgICB9XG5cbiAgICAvLyBwZXJmb3JtIGEgc2luZ2xlIHNlbGVjdGlvbiB3aGVyZSBhbGwgb3RoZXIgcm93cyBhcmUgZGVzZWxlY3RlZFxuICAgIHRoaXMuc2luZ2xlU2VsZWN0KGRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRvIHN1cHBvcnQgZnVsbCBrZXlib2FyZCBjb250cm9sIHdlIG5lZWQgdG8gc3VwcG9ydCB0aGUgZm9sbG93aW5nOlxuICAgKiAxLiBBcnJvdyBrZXlzIHRvIG5hdmlnYXRlIHVwIGFuZCBkb3duXG4gICAqIDIuIFNwYWNlYmFyIHRvIHRvZ2dsZSBzZWxlY3Rpb25cbiAgICogMy4gU2hpZnQgKyBBcnJvdyBrZXlzIHRvIG11bHRpcGxlIHNlbGVjdFxuICAgKiA0LiBDdHJsICsgQXJyb3cga2V5cyB0byBhbGxvdyByZXRhaW5lZCBzZWxlY3Rpb24gYW5kIG5hdmlnYXRpb25cbiAgICovXG4gIGtleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQsIGRhdGE6IFQpOiB2b2lkIHtcblxuICAgIHN3aXRjaCAoZXZlbnQud2hpY2gpIHtcblxuICAgICAgY2FzZSBVUF9BUlJPVzpcbiAgICAgIGNhc2UgRE9XTl9BUlJPVzpcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5uYXZpZ2F0ZShldmVudCwgZGF0YSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIFNQQUNFOlxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGlzLnNlbGVjdGlvblNlcnZpY2Uuc3RyYXRlZ3kudG9nZ2xlKGRhdGEpO1xuXG4gICAgICAgIC8vIGFsc28gYWN0aXZhdGUgdGhlIGl0ZW1cbiAgICAgICAgdGhpcy5zZWxlY3Rpb25TZXJ2aWNlLmFjdGl2YXRlKGRhdGEpO1xuICAgICAgICBicmVhaztcblxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBPdmVycmlkZSB0aGUgc3RhbmRhcmQgdG9nZ2xlIGZ1bmN0aW9uIHRvIHN0b3JlIG9yIGNsZWFyIHRoZVxuICAgKiBtb3N0IHJlY2VudGx5IHNlbGVjdGVkIGl0ZW1cbiAgICovXG4gIHRvZ2dsZShkYXRhOiBUKTogdm9pZCB7XG4gICAgc3VwZXIudG9nZ2xlKGRhdGEpO1xuXG4gICAgLy8gc3RvcmUgb3IgY2xlYXIgdGhlIHNlbGVjdGlvblxuICAgIHRoaXMuc2VsZWN0aW9uU2VydmljZS5pc1NlbGVjdGVkKGRhdGEpID8gdGhpcy5zZXRTZWxlY3Rpb25TdGFydChkYXRhKSA6IHRoaXMuY2xlYXJTZWxlY3Rpb24oKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhciBhbGwgb3RoZXIgc2VsZWN0ZWQgaXRlbXMgYW5kIHNlbGVjdCBvbmx5XG4gICAqIHRoZSBtb3N0IHJlY2VudGx5IHNlbGVjdGVkIGl0ZW1cbiAgICovXG4gIHByaXZhdGUgc2luZ2xlU2VsZWN0KGRhdGE6IFQpOiB2b2lkIHtcblxuICAgIC8vIGRlc2VsZWN0IGFsbCBvdGhlciByb3dzIGlmIG5laXRoZXIgbW9kaWZpZXIga2V5IGlzIHByZXNzZWRcbiAgICB0aGlzLmRlc2VsZWN0QWxsKCk7XG5cbiAgICAvLyBzZWxlY3QgdGhlIGN1cnJlbnQgcm93XG4gICAgdGhpcy5zZWxlY3QoZGF0YSk7XG5cbiAgICAvLyBzdG9yZSB0aGUgY3VycmVudCBpdGVtIGFzIHRoZSBzZWxlY3Rpb24gc3RhcnRcbiAgICB0aGlzLnNldFNlbGVjdGlvblN0YXJ0KGRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZSBtdWx0aXBsZSBzZWxlY3Rpb246XG4gICAqIDEuIElmIG5vIHN0YXJ0IGl0ZW0gc2VsZWN0ZWQgLSBzZWxlY3QgaXRcbiAgICogMi4gSWYgYSBzdGFydCBpdGVtIGhhcyBiZWVuIHNlbGVjdGVkIC0gc2VsZWN0IGFsbCBpbiBiZXR3ZWVuXG4gICAqIDMuIElmIGEgc3RhcnQgYW5kIGVuZCBpdGVtIGhhdmUgYmVlbiBzZWxlY3RlZCBjbGVhciB0aGUgcmFuZ2UgYW5kIHRoZW4gc2VsZWN0IHRoZSBuZXcgcmFuZ2VcbiAgICovXG4gIHByb3RlY3RlZCBtdWx0aXBsZVNlbGVjdChkYXRhOiBUKTogdm9pZCB7XG5cbiAgICAvLyBpZiBubyBzZWxlY3Rpb24gY3VycmVudGx5IGV4aXN0cyB0aGVuIHBlcmZvcm0gaW5pdGlhbCBzZWxlY3Rpb25cbiAgICBpZiAoIXRoaXMuX3NlbGVjdGlvbi5zdGFydCkge1xuXG4gICAgICAvLyBzZWxlY3QgdGhlIHJvd1xuICAgICAgdGhpcy5zZWxlY3QoZGF0YSk7XG5cbiAgICAgIC8vIHN0b3JlIHRoZSBzdGFydGluZyBwb2ludFxuICAgICAgcmV0dXJuIHRoaXMuc2V0U2VsZWN0aW9uU3RhcnQoZGF0YSk7XG4gICAgfVxuXG4gICAgLy8gaWYgYSBtdWx0aXBsZSBzZWxlY3Rpb24gYWxyZWFkeSB0b29rIHBsYWNlIC0gY2xlYXIgdGhlIHByZXZpb3VzIHNlbGVjdGlvblxuICAgIGlmICh0aGlzLl9zZWxlY3Rpb24uc3RhcnQgJiYgdGhpcy5fc2VsZWN0aW9uLmVuZCkge1xuICAgICAgdGhpcy5kZXNlbGVjdCguLi50aGlzLmdldFNlbGVjdGVkSXRlbXMoKSk7XG4gICAgfVxuXG4gICAgLy8gc2V0IHRoZSBuZXcgc2VsZWN0aW9uIGVuZCBwb2ludFxuICAgIHRoaXMuc2V0U2VsZWN0aW9uRW5kKGRhdGEpO1xuXG4gICAgLy8gc2VsZWN0IGFsbCB0aGUgaXRlbXMgaW4gdGhlIHJhbmdlXG4gICAgdGhpcy5zZWxlY3QoLi4udGhpcy5nZXRTZWxlY3RlZEl0ZW1zKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgc2VsZWN0aW9uIHN0YXJ0IHBvaW50LiBJZiB0aGVyZSB3YXMgcHJldmlvdXNseSBhXG4gICAqIHNlbGVjdGlvbiBlbmQgcG9pbnQgdGhlbiBjbGVhciBpdCBhcyB0aGlzIGlzIGEgbmV3IHNlbGVjdGlvblxuICAgKi9cbiAgcHJpdmF0ZSBzZXRTZWxlY3Rpb25TdGFydChkYXRhOiBUKTogdm9pZCB7XG4gICAgdGhpcy5fc2VsZWN0aW9uLnN0YXJ0ID0gZGF0YTtcbiAgICB0aGlzLl9zZWxlY3Rpb24uZW5kID0gbnVsbDtcblxuICAgIC8vIGFjdGl2YXRlIHRoZSBpdGVtXG4gICAgdGhpcy5zZWxlY3Rpb25TZXJ2aWNlLmFjdGl2YXRlKGRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgc2VsZWN0aW9uIGVuZCBwb2ludFxuICAgKi9cbiAgcHJpdmF0ZSBzZXRTZWxlY3Rpb25FbmQoZGF0YTogVCk6IHZvaWQge1xuICAgIHRoaXMuX3NlbGVjdGlvbi5lbmQgPSBkYXRhO1xuXG4gICAgLy8gYWN0aXZhdGUgdGhlIGl0ZW1cbiAgICB0aGlzLnNlbGVjdGlvblNlcnZpY2UuYWN0aXZhdGUoZGF0YSk7XG4gIH1cblxuICAvKipcbiAgICogQ2xlYXIgYm90aCBzdGFydCBhbmQgZW5kIHNlbGVjdGlvbiBwb2ludHNcbiAgICovXG4gIHByb3RlY3RlZCBjbGVhclNlbGVjdGlvbihkZWFjdGl2YXRlOiBib29sZWFuID0gdHJ1ZSk6IHZvaWQge1xuXG4gICAgLy8gcmVzZXQgdGhlIHNlbGVjdGVkIGl0ZW1cbiAgICB0aGlzLl9zZWxlY3Rpb24gPSB7IHN0YXJ0OiBudWxsLCBlbmQ6IG51bGwgfTtcblxuICAgIC8vIHJlbW92ZSB0aGUgY3VycmVudCBhY3RpdmUgaXRlbVxuICAgIGlmIChkZWFjdGl2YXRlKSB7XG4gICAgICB0aGlzLnNlbGVjdGlvblNlcnZpY2UuZGVhY3RpdmF0ZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmUgYWxsIHRoZSBpdGVtcyBhZmZlY3RlZCBieSB0aGUgY3VycmVudCBzZWxlY3Rpb24uXG4gICAqIE5vdGUgdGhhdCB0aGUgZW5kIHBvaW50IG1heSBiZSBhYm92ZSB0aGUgc3RhcnQgcG9pbnQgc29cbiAgICogd2UgbmVlZCB0byBhY2NvdW50IGZvciB0aGlzLlxuICAgKi9cbiAgcHJpdmF0ZSBnZXRTZWxlY3RlZEl0ZW1zKCk6IFRbXSB7XG5cbiAgICAvLyBnZXQgdGhlIGxhdGVzdCBkYXRhc2V0XG4gICAgY29uc3QgeyBkYXRhc2V0IH0gPSB0aGlzLnNlbGVjdGlvblNlcnZpY2U7XG5cbiAgICAvLyBnZXQgdGhlIGluZGV4ZXMgb2YgdGhlIHN0YXJ0IGFuZCBlbmQgcG9pbnRcbiAgICBjb25zdCBzdGFydElkeCA9IGRhdGFzZXQuaW5kZXhPZih0aGlzLl9zZWxlY3Rpb24uc3RhcnQpO1xuICAgIGNvbnN0IGVuZElkeCA9IGRhdGFzZXQuaW5kZXhPZih0aGlzLl9zZWxlY3Rpb24uZW5kKTtcblxuICAgIC8vIGdldCB0aGUgcmVnaW9uIG9mIHRoZSBhcnJheSB0aGF0IGlzIHNlbGVjdGVkIC0gbm90ZSB0aGUgZW5kSWR4IG1heSBiZSBiZWZvcmUgdGhlIHN0YXJ0SWR4IHNvIGFjY291bnQgZm9yIHRoaXNcbiAgICByZXR1cm4gZGF0YXNldC5zbGljZShNYXRoLm1pbihzdGFydElkeCwgZW5kSWR4KSwgTWF0aC5tYXgoc3RhcnRJZHgsIGVuZElkeCkgKyAxKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBY3RpdmF0ZSB0aGUgc2libGluZyBpdGVtIHdoZW4gYXJyb3cga2V5cyBhcmUgcHJlc3NlZFxuICAgKi9cbiAgcHJpdmF0ZSBuYXZpZ2F0ZShldmVudDogS2V5Ym9hcmRFdmVudCwgZGF0YTogVCk6IHZvaWQge1xuXG4gICAgLy8gZGV0ZXJtaW5lIHdoaWNoIG1vZGlmaWVyIGtleXMgYXJlIHByZXNzZWRcbiAgICBjb25zdCB7IGN0cmxLZXksIHNoaWZ0S2V5IH0gPSBldmVudDtcblxuICAgIC8vIGlmIG5vIG1vZGlmaWVyIGtleXMgYXJlIHByZXNzZWQgdGhlbiBkZXNlbGVjdCBhbGwgYW5kIGNsZWFyIHRoZSBzZWxlY3Rpb25cbiAgICBpZiAoIWN0cmxLZXkgJiYgIXNoaWZ0S2V5KSB7XG4gICAgICB0aGlzLmRlc2VsZWN0QWxsKCk7XG4gICAgICB0aGlzLmNsZWFyU2VsZWN0aW9uKGZhbHNlKTtcbiAgICB9XG5cbiAgICAvLyBhY3RpdmF0ZSB0aGUgc2libGluZyAtIGlmIHRoZSB1cCBhcnJvdyBpcyBwcmVzc2VkIHRoZW4gbmF2aWdhdGUgdG8gdGhlIHByZXZpb3VzIHNpYmxpbmdcbiAgICBjb25zdCBzaWJsaW5nID0gdGhpcy5zZWxlY3Rpb25TZXJ2aWNlLmFjdGl2YXRlU2libGluZyhldmVudC53aGljaCA9PT0gVVBfQVJST1cpO1xuXG4gICAgLy8gaWYgdGhlIHNoaWZ0IGtleSBpcyBwcmVzc2VkIHRoZW4gd2UgYWxzbyB3YW50IHRvIHRvZ2dsZSB0aGUgc3RhdGUgaWYgdGhlIGl0ZW1cbiAgICBpZiAoc2hpZnRLZXkgJiYgc2libGluZykge1xuXG4gICAgICAvLyBpZiB0aGVyZSBpcyBubyBjdXJyZW50IHNlbGVjdGlvbiBzdGFydCB0aGVuIHNlbGVjdCB0aGUgY3VycmVudCByb3dcbiAgICAgIGlmICghdGhpcy5fc2VsZWN0aW9uLnN0YXJ0KSB7XG4gICAgICAgIHRoaXMubXVsdGlwbGVTZWxlY3QoZGF0YSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMubXVsdGlwbGVTZWxlY3Qoc2libGluZyk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2VsZWN0aW9uPFQ+IHtcbiAgc3RhcnQ6IFQ7XG4gIGVuZDogVDtcbn1cbiJdfQ==