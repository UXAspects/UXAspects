/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { SelectionStrategy } from './selection.strategy';
var RowSelectionStrategy = (function (_super) {
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
    };
    /**
     * Override the standard toggle function to store or clear the
     * most recently selected item
     */
    /**
     * Override the standard toggle function to store or clear the
     * most recently selected item
     * @param {?} data
     * @param {?=} activate
     * @return {?}
     */
    RowSelectionStrategy.prototype.toggle = /**
     * Override the standard toggle function to store or clear the
     * most recently selected item
     * @param {?} data
     * @param {?=} activate
     * @return {?}
     */
    function (data, activate) {
        if (activate === void 0) { activate = false; }
        _super.prototype.toggle.call(this, data);
        // store or clear the selection
        this.selectionService.isSelected(data) ? this.setSelectionStart(data) : this.clearSelection();
        // if we want to keep the item activated then activate
        if (activate) {
            this.selectionService.activate(data);
        }
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
        var /** @type {?} */ sibling = this.selectionService.activateSibling(event.keyCode === KeyCode.UpArrow);
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
export { RowSelectionStrategy };
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
var KeyCode = {
    UpArrow: 38,
    DownArrow: 40,
    Spacebar: 32,
};
KeyCode[KeyCode.UpArrow] = "UpArrow";
KeyCode[KeyCode.DownArrow] = "DownArrow";
KeyCode[KeyCode.Spacebar] = "Spacebar";

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93LXNlbGVjdGlvbi5zdHJhdGVneS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL3NlbGVjdGlvbi9zdHJhdGVnaWVzL3Jvdy1zZWxlY3Rpb24uc3RyYXRlZ3kudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUV6RCxJQUFBO0lBQTBDLGdEQUFpQjs7OzJCQUd6QixFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRTs7O0lBRTFEOzs7T0FHRzs7Ozs7OztJQUNILHdDQUFTOzs7Ozs7SUFBVCxVQUFVLEtBQWlCO1FBQ3pCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztLQUN4QjtJQUVEOztPQUVHOzs7Ozs7O0lBQ0gsb0NBQUs7Ozs7OztJQUFMLFVBQU0sS0FBaUIsRUFBRSxJQUFTOztRQUd4QixJQUFBLHVCQUFPLEVBQUUseUJBQVEsQ0FBVzs7UUFHcEMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNiLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2xDOztRQUdELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDWixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUMxQjs7UUFHRCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3pCO0lBRUQ7Ozs7OztPQU1HOzs7Ozs7Ozs7OztJQUNILHNDQUFPOzs7Ozs7Ozs7O0lBQVAsVUFBUSxLQUFvQixFQUFFLElBQVM7UUFFckMsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFFdEIsS0FBSyxPQUFPLENBQUMsT0FBTyxDQUFDO1lBQ3JCLEtB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NE1DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2VsZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICcuL3NlbGVjdGlvbi5zdHJhdGVneSc7XG5cbmV4cG9ydCBjbGFzcyBSb3dTZWxlY3Rpb25TdHJhdGVneSBleHRlbmRzIFNlbGVjdGlvblN0cmF0ZWd5IHtcblxuICAvLyBzdG9yZSB0aGUgbW9zdCByZWNlbnRseSBzZWxlY3RlZCByb3dcbiAgcHJpdmF0ZSBfc2VsZWN0aW9uOiBTZWxlY3Rpb24gPSB7IHN0YXJ0OiBudWxsLCBlbmQ6IG51bGwgfTtcblxuICAvKipcbiAgICogQnkgZGVmYXVsdCBvbiBzaGlmdCBjbGljayB0aGUgYnJvd3NlciB3aWxsIGhpZ2hsaWdodFxuICAgKiB0ZXh0LiBUaGlzIGxvb2tzIGJhZCBhbmQgd2UgZG9uJ3Qgd2FudCB0aGlzIHRvIG9jY3VyXG4gICAqL1xuICBtb3VzZWRvd24oZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFdoZW4gYSByb3cgaXMgY2xpY2tlZCB3ZSB3YW50IHRvIGhhbmRsZSBzZWxlY3Rpb25cbiAgICovXG4gIGNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50LCBkYXRhOiBhbnkpOiB2b2lkIHtcblxuICAgIC8vIGRldGVybWluZSB3aGljaCBtb2RpZmllciBrZXlzIGFyZSBwcmVzc2VkXG4gICAgY29uc3QgeyBjdHJsS2V5LCBzaGlmdEtleSB9ID0gZXZlbnQ7XG5cbiAgICAvLyBpZiB0aGUgc2hpZnQga2V5IGlzIHByZXNzZWQgd2Ugd2FudCB0byBwZXJmb3JtIGEgbXVsdGlwbGUgc2VsZWN0aW9uXG4gICAgaWYgKHNoaWZ0S2V5KSB7XG4gICAgICByZXR1cm4gdGhpcy5tdWx0aXBsZVNlbGVjdChkYXRhKTtcbiAgICB9XG5cbiAgICAvLyBpZiB0aGUgY29udHJvbCBrZXkgaXMgcHJlc3NlZCB3ZSB3YW50IHRvIHBlcmZvcm0gYW4gYWRkaXRpdmUgdG9nZ2xlIHNlbGVjdGlvblxuICAgIGlmIChjdHJsS2V5KSB7XG4gICAgICByZXR1cm4gdGhpcy50b2dnbGUoZGF0YSk7XG4gICAgfVxuXG4gICAgLy8gcGVyZm9ybSBhIHNpbmdsZSBzZWxlY3Rpb24gd2hlcmUgYWxsIG90aGVyIHJvd3MgYXJlIGRlc2VsZWN0ZWRcbiAgICB0aGlzLnNpbmdsZVNlbGVjdChkYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUbyBzdXBwb3J0IGZ1bGwga2V5Ym9hcmQgY29udHJvbCB3ZSBuZWVkIHRvIHN1cHBvcnQgdGhlIGZvbGxvd2luZzpcbiAgICogMS4gQXJyb3cga2V5cyB0byBuYXZpZ2F0ZSB1cCBhbmQgZG93blxuICAgKiAyLiBTcGFjZWJhciB0byB0b2dnbGUgc2VsZWN0aW9uXG4gICAqIDMuIFNoaWZ0ICsgQXJyb3cga2V5cyB0byBtdWx0aXBsZSBzZWxlY3RcbiAgICogNC4gQ3RybCArIEFycm93IGtleXMgdG8gYWxsb3cgcmV0YWluZWQgc2VsZWN0aW9uIGFuZCBuYXZpZ2F0aW9uXG4gICAqL1xuICBrZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50LCBkYXRhOiBhbnkpOiB2b2lkIHtcblxuICAgIHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xuXG4gICAgICBjYXNlIEtleUNvZGUuVXBBcnJvdzpcbiAgICAgIGNhc2UgS2V5Q29kZS5Eb3duQXJyb3c6XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMubmF2aWdhdGUoZXZlbnQsIGRhdGEpO1xuICAgICAgICBicmVhaztcbiAgICAgICAgXG4gICAgICBjYXNlIEtleUNvZGUuU3BhY2ViYXI6XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMuc2VsZWN0aW9uU2VydmljZS5zdHJhdGVneS50b2dnbGUoZGF0YSwgdHJ1ZSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE92ZXJyaWRlIHRoZSBzdGFuZGFyZCB0b2dnbGUgZnVuY3Rpb24gdG8gc3RvcmUgb3IgY2xlYXIgdGhlXG4gICAqIG1vc3QgcmVjZW50bHkgc2VsZWN0ZWQgaXRlbVxuICAgKi9cbiAgdG9nZ2xlKGRhdGE6IGFueSwgYWN0aXZhdGU6IGJvb2xlYW4gPSBmYWxzZSk6IHZvaWQge1xuICAgIHN1cGVyLnRvZ2dsZShkYXRhKTtcblxuICAgIC8vIHN0b3JlIG9yIGNsZWFyIHRoZSBzZWxlY3Rpb25cbiAgICB0aGlzLnNlbGVjdGlvblNlcnZpY2UuaXNTZWxlY3RlZChkYXRhKSA/IHRoaXMuc2V0U2VsZWN0aW9uU3RhcnQoZGF0YSkgOiB0aGlzLmNsZWFyU2VsZWN0aW9uKCk7XG5cbiAgICAvLyBpZiB3ZSB3YW50IHRvIGtlZXAgdGhlIGl0ZW0gYWN0aXZhdGVkIHRoZW4gYWN0aXZhdGVcbiAgICBpZiAoYWN0aXZhdGUpIHtcbiAgICAgIHRoaXMuc2VsZWN0aW9uU2VydmljZS5hY3RpdmF0ZShkYXRhKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2xlYXIgYWxsIG90aGVyIHNlbGVjdGVkIGl0ZW1zIGFuZCBzZWxlY3Qgb25seVxuICAgKiB0aGUgbW9zdCByZWNlbnRseSBzZWxlY3RlZCBpdGVtXG4gICAqL1xuICBwcml2YXRlIHNpbmdsZVNlbGVjdChkYXRhOiBhbnkpOiB2b2lkIHtcblxuICAgIC8vIGRlc2VsZWN0IGFsbCBvdGhlciByb3dzIGlmIG5laXRoZXIgbW9kaWZpZXIga2V5IGlzIHByZXNzZWRcbiAgICB0aGlzLmRlc2VsZWN0QWxsKCk7XG5cbiAgICAvLyBzZWxlY3QgdGhlIGN1cnJlbnQgcm93XG4gICAgdGhpcy5zZWxlY3QoZGF0YSk7XG5cbiAgICAvLyBzdG9yZSB0aGUgY3VycmVudCBpdGVtIGFzIHRoZSBzZWxlY3Rpb24gc3RhcnRcbiAgICB0aGlzLnNldFNlbGVjdGlvblN0YXJ0KGRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZSBtdWx0aXBsZSBzZWxlY3Rpb246XG4gICAqIDEuIElmIG5vIHN0YXJ0IGl0ZW0gc2VsZWN0ZWQgLSBzZWxlY3QgaXRcbiAgICogMi4gSWYgYSBzdGFydCBpdGVtIGhhcyBiZWVuIHNlbGVjdGVkIC0gc2VsZWN0IGFsbCBpbiBiZXR3ZWVuXG4gICAqIDMuIElmIGEgc3RhcnQgYW5kIGVuZCBpdGVtIGhhdmUgYmVlbiBzZWxlY3RlZCBjbGVhciB0aGUgcmFuZ2UgYW5kIHRoZW4gc2VsZWN0IHRoZSBuZXcgcmFuZ2VcbiAgICovXG4gIHByaXZhdGUgbXVsdGlwbGVTZWxlY3QoZGF0YTogYW55KTogdm9pZCB7XG5cbiAgICAvLyBpZiBubyBzZWxlY3Rpb24gY3VycmVudGx5IGV4aXN0cyB0aGVuIHBlcmZvcm0gaW5pdGlhbCBzZWxlY3Rpb25cbiAgICBpZiAoIXRoaXMuX3NlbGVjdGlvbi5zdGFydCkge1xuXG4gICAgICAvLyBzZWxlY3QgdGhlIHJvd1xuICAgICAgdGhpcy5zZWxlY3QoZGF0YSk7XG5cbiAgICAgIC8vIHN0b3JlIHRoZSBzdGFydGluZyBwb2ludFxuICAgICAgcmV0dXJuIHRoaXMuc2V0U2VsZWN0aW9uU3RhcnQoZGF0YSk7XG4gICAgfVxuXG4gICAgLy8gaWYgYSBtdWx0aXBsZSBzZWxlY3Rpb24gYWxyZWFkeSB0b29rIHBsYWNlIC0gY2xlYXIgdGhlIHByZXZpb3VzIHNlbGVjdGlvblxuICAgIGlmICh0aGlzLl9zZWxlY3Rpb24uc3RhcnQgJiYgdGhpcy5fc2VsZWN0aW9uLmVuZCkge1xuICAgICAgdGhpcy5kZXNlbGVjdCguLi50aGlzLmdldFNlbGVjdGVkSXRlbXMoKSk7XG4gICAgfVxuXG4gICAgLy8gc2V0IHRoZSBuZXcgc2VsZWN0aW9uIGVuZCBwb2ludFxuICAgIHRoaXMuc2V0U2VsZWN0aW9uRW5kKGRhdGEpO1xuXG4gICAgLy8gc2VsZWN0IGFsbCB0aGUgaXRlbXMgaW4gdGhlIHJhbmdlXG4gICAgdGhpcy5zZWxlY3QoLi4udGhpcy5nZXRTZWxlY3RlZEl0ZW1zKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgc2VsZWN0aW9uIHN0YXJ0IHBvaW50LiBJZiB0aGVyZSB3YXMgcHJldmlvdXNseSBhXG4gICAqIHNlbGVjdGlvbiBlbmQgcG9pbnQgdGhlbiBjbGVhciBpdCBhcyB0aGlzIGlzIGEgbmV3IHNlbGVjdGlvblxuICAgKi9cbiAgcHJpdmF0ZSBzZXRTZWxlY3Rpb25TdGFydChkYXRhOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLl9zZWxlY3Rpb24uc3RhcnQgPSBkYXRhO1xuICAgIHRoaXMuX3NlbGVjdGlvbi5lbmQgPSBudWxsO1xuXG4gICAgLy8gYWN0aXZhdGUgdGhlIGl0ZW1cbiAgICB0aGlzLnNlbGVjdGlvblNlcnZpY2UuYWN0aXZhdGUoZGF0YSk7XG4gIH1cblxuICAvKipcbiAgICogU2V0IHRoZSBzZWxlY3Rpb24gZW5kIHBvaW50XG4gICAqL1xuICBwcml2YXRlIHNldFNlbGVjdGlvbkVuZChkYXRhOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLl9zZWxlY3Rpb24uZW5kID0gZGF0YTtcblxuICAgIC8vIGFjdGl2YXRlIHRoZSBpdGVtXG4gICAgdGhpcy5zZWxlY3Rpb25TZXJ2aWNlLmFjdGl2YXRlKGRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIENsZWFyIGJvdGggc3RhcnQgYW5kIGVuZCBzZWxlY3Rpb24gcG9pbnRzXG4gICAqL1xuICBwcml2YXRlIGNsZWFyU2VsZWN0aW9uKGRlYWN0aXZhdGU6IGJvb2xlYW4gPSB0cnVlKTogdm9pZCB7XG5cbiAgICAvLyByZXNldCB0aGUgc2VsZWN0ZWQgaXRlbVxuICAgIHRoaXMuX3NlbGVjdGlvbiA9IHsgc3RhcnQ6IG51bGwsIGVuZDogbnVsbCB9O1xuXG4gICAgLy8gcmVtb3ZlIHRoZSBjdXJyZW50IGFjdGl2ZSBpdGVtXG4gICAgaWYgKGRlYWN0aXZhdGUpIHtcbiAgICAgIHRoaXMuc2VsZWN0aW9uU2VydmljZS5kZWFjdGl2YXRlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIERldGVybWluZSBhbGwgdGhlIGl0ZW1zIGFmZmVjdGVkIGJ5IHRoZSBjdXJyZW50IHNlbGVjdGlvbi5cbiAgICogTm90ZSB0aGF0IHRoZSBlbmQgcG9pbnQgbWF5IGJlIGFib3ZlIHRoZSBzdGFydCBwb2ludCBzb1xuICAgKiB3ZSBuZWVkIHRvIGFjY291bnQgZm9yIHRoaXMuXG4gICAqL1xuICBwcml2YXRlIGdldFNlbGVjdGVkSXRlbXMoKTogYW55W10ge1xuXG4gICAgLy8gZ2V0IHRoZSBsYXRlc3QgZGF0YXNldFxuICAgIGNvbnN0IHsgZGF0YXNldCB9ID0gdGhpcy5zZWxlY3Rpb25TZXJ2aWNlO1xuXG4gICAgLy8gZ2V0IHRoZSBpbmRleGVzIG9mIHRoZSBzdGFydCBhbmQgZW5kIHBvaW50XG4gICAgY29uc3Qgc3RhcnRJZHggPSBkYXRhc2V0LmluZGV4T2YodGhpcy5fc2VsZWN0aW9uLnN0YXJ0KTtcbiAgICBjb25zdCBlbmRJZHggPSBkYXRhc2V0LmluZGV4T2YodGhpcy5fc2VsZWN0aW9uLmVuZCk7XG5cbiAgICAvLyBnZXQgdGhlIHJlZ2lvbiBvZiB0aGUgYXJyYXkgdGhhdCBpcyBzZWxlY3RlZCAtIG5vdGUgdGhlIGVuZElkeCBtYXkgYmUgYmVmb3JlIHRoZSBzdGFydElkeCBzbyBhY2NvdW50IGZvciB0aGlzXG4gICAgcmV0dXJuIGRhdGFzZXQuc2xpY2UoTWF0aC5taW4oc3RhcnRJZHgsIGVuZElkeCksIE1hdGgubWF4KHN0YXJ0SWR4LCBlbmRJZHgpICsgMSk7XG4gIH1cblxuICAvKipcbiAgICogQWN0aXZhdGUgdGhlIHNpYmxpbmcgaXRlbSB3aGVuIGFycm93IGtleXMgYXJlIHByZXNzZWRcbiAgICovXG4gIHByaXZhdGUgbmF2aWdhdGUoZXZlbnQ6IEtleWJvYXJkRXZlbnQsIGRhdGE6IGFueSk6IHZvaWQge1xuXG4gICAgLy8gZGV0ZXJtaW5lIHdoaWNoIG1vZGlmaWVyIGtleXMgYXJlIHByZXNzZWRcbiAgICBjb25zdCB7IGN0cmxLZXksIHNoaWZ0S2V5IH0gPSBldmVudDtcblxuICAgIC8vIGlmIG5vIG1vZGlmaWVyIGtleXMgYXJlIHByZXNzZWQgdGhlbiBkZXNlbGVjdCBhbGwgYW5kIGNsZWFyIHRoZSBzZWxlY3Rpb25cbiAgICBpZiAoIWN0cmxLZXkgJiYgIXNoaWZ0S2V5KSB7XG4gICAgICB0aGlzLmRlc2VsZWN0QWxsKCk7XG4gICAgICB0aGlzLmNsZWFyU2VsZWN0aW9uKGZhbHNlKTtcbiAgICB9XG5cbiAgICAvLyBhY3RpdmF0ZSB0aGUgc2libGluZyAtIGlmIHRoZSB1cCBhcnJvdyBpcyBwcmVzc2VkIHRoZW4gbmF2aWdhdGUgdG8gdGhlIHByZXZpb3VzIHNpYmxpbmdcbiAgICBjb25zdCBzaWJsaW5nID0gdGhpcy5zZWxlY3Rpb25TZXJ2aWNlLmFjdGl2YXRlU2libGluZyhldmVudC5rZXlDb2RlID09PSBLZXlDb2RlLlVwQXJyb3cpO1xuXG4gICAgLy8gaWYgdGhlIHNoaWZ0IGtleSBpcyBwcmVzc2VkIHRoZW4gd2UgYWxzbyB3YW50IHRvIHRvZ2dsZSB0aGUgc3RhdGUgaWYgdGhlIGl0ZW1cbiAgICBpZiAoc2hpZnRLZXkgJiYgc2libGluZykge1xuXG4gICAgICAvLyBpZiB0aGVyZSBpcyBubyBjdXJyZW50IHNlbGVjdGlvbiBzdGFydCB0aGVuIHNlbGVjdCB0aGUgY3VycmVudCByb3dcbiAgICAgIGlmICghdGhpcy5fc2VsZWN0aW9uLnN0YXJ0KSB7XG4gICAgICAgIHRoaXMubXVsdGlwbGVTZWxlY3QoZGF0YSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMubXVsdGlwbGVTZWxlY3Qoc2libGluZyk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2VsZWN0aW9uIHtcbiAgc3RhcnQ6IGFueTtcbiAgZW5kOiBhbnk7XG59XG5cbmVudW0gS2V5Q29kZSB7XG4gIFVwQXJyb3cgPSAzOCxcbiAgRG93bkFycm93ID0gNDAsXG4gIFNwYWNlYmFyID0gMzJcbn1cbiJdfQ==