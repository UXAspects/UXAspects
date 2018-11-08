/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { DOWN_ARROW, SPACE, UP_ARROW } from '@angular/cdk/keycodes';
import { SelectionStrategy } from './selection.strategy';
/**
 * @template T
 */
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
    }
    /**
     * Override the standard toggle function to store or clear the
     * most recently selected item
     * @param {?} data
     * @return {?}
     */
    toggle(data) {
        super.toggle(data);
        // store or clear the selection
        this.selectionService.isSelected(data) ? this.setSelectionStart(data) : this.clearSelection();
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
        const /** @type {?} */ sibling = this.selectionService.activateSibling(event.which === UP_ARROW);
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
 * @template T
 */
export function Selection() { }
function Selection_tsickle_Closure_declarations() {
    /** @type {?} */
    Selection.prototype.start;
    /** @type {?} */
    Selection.prototype.end;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93LXNlbGVjdGlvbi5zdHJhdGVneS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL3NlbGVjdGlvbi9zdHJhdGVnaWVzL3Jvdy1zZWxlY3Rpb24uc3RyYXRlZ3kudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3BFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDOzs7O0FBRXpELE1BQU0sMkJBQStCLFNBQVEsaUJBQW9COzs7MEJBRzVCLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFOzs7Ozs7OztJQU03RCxTQUFTLENBQUMsS0FBaUI7UUFDekIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO0tBQ3hCOzs7Ozs7O0lBS0QsS0FBSyxDQUFDLEtBQWlCLEVBQUUsSUFBTzs7UUFHOUIsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsR0FBRyxLQUFLLENBQUM7O1FBR3BDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDYixNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNsQzs7UUFHRCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ1osTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDMUI7O1FBR0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUN6Qjs7Ozs7Ozs7Ozs7SUFTRCxPQUFPLENBQUMsS0FBb0IsRUFBRSxJQUFPO1FBRW5DLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBRXBCLEtBQUssUUFBUSxDQUFDO1lBQ2Qs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RyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7O1FBR3BELE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDOzs7Ozs7OztJQU0zRSxRQUFRLENBQUMsS0FBb0IsRUFBRSxJQUFPOztRQUc1QyxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxHQUFHLEtBQUssQ0FBQzs7UUFHcEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQzFCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNuQixJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzVCOztRQUdELHVCQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxLQUFLLEtBQUssUUFBUSxDQUFDLENBQUM7O1FBR2hGLEVBQUUsQ0FBQyxDQUFDLFFBQVEsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDOztZQUd4QixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDM0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUMzQjtZQUVELElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDOUI7O0NBRUoiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBET1dOX0FSUk9XLCBTUEFDRSwgVVBfQVJST1cgfSBmcm9tICdAYW5ndWxhci9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHsgU2VsZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICcuL3NlbGVjdGlvbi5zdHJhdGVneSc7XG5cbmV4cG9ydCBjbGFzcyBSb3dTZWxlY3Rpb25TdHJhdGVneTxUPiBleHRlbmRzIFNlbGVjdGlvblN0cmF0ZWd5PFQ+IHtcblxuICAvLyBzdG9yZSB0aGUgbW9zdCByZWNlbnRseSBzZWxlY3RlZCByb3dcbiAgcHJpdmF0ZSBfc2VsZWN0aW9uOiBTZWxlY3Rpb248VD4gPSB7IHN0YXJ0OiBudWxsLCBlbmQ6IG51bGwgfTtcblxuICAvKipcbiAgICogQnkgZGVmYXVsdCBvbiBzaGlmdCBjbGljayB0aGUgYnJvd3NlciB3aWxsIGhpZ2hsaWdodFxuICAgKiB0ZXh0LiBUaGlzIGxvb2tzIGJhZCBhbmQgd2UgZG9uJ3Qgd2FudCB0aGlzIHRvIG9jY3VyXG4gICAqL1xuICBtb3VzZWRvd24oZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFdoZW4gYSByb3cgaXMgY2xpY2tlZCB3ZSB3YW50IHRvIGhhbmRsZSBzZWxlY3Rpb25cbiAgICovXG4gIGNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50LCBkYXRhOiBUKTogdm9pZCB7XG5cbiAgICAvLyBkZXRlcm1pbmUgd2hpY2ggbW9kaWZpZXIga2V5cyBhcmUgcHJlc3NlZFxuICAgIGNvbnN0IHsgY3RybEtleSwgc2hpZnRLZXkgfSA9IGV2ZW50O1xuXG4gICAgLy8gaWYgdGhlIHNoaWZ0IGtleSBpcyBwcmVzc2VkIHdlIHdhbnQgdG8gcGVyZm9ybSBhIG11bHRpcGxlIHNlbGVjdGlvblxuICAgIGlmIChzaGlmdEtleSkge1xuICAgICAgcmV0dXJuIHRoaXMubXVsdGlwbGVTZWxlY3QoZGF0YSk7XG4gICAgfVxuXG4gICAgLy8gaWYgdGhlIGNvbnRyb2wga2V5IGlzIHByZXNzZWQgd2Ugd2FudCB0byBwZXJmb3JtIGFuIGFkZGl0aXZlIHRvZ2dsZSBzZWxlY3Rpb25cbiAgICBpZiAoY3RybEtleSkge1xuICAgICAgcmV0dXJuIHRoaXMudG9nZ2xlKGRhdGEpO1xuICAgIH1cblxuICAgIC8vIHBlcmZvcm0gYSBzaW5nbGUgc2VsZWN0aW9uIHdoZXJlIGFsbCBvdGhlciByb3dzIGFyZSBkZXNlbGVjdGVkXG4gICAgdGhpcy5zaW5nbGVTZWxlY3QoZGF0YSk7XG4gIH1cblxuICAvKipcbiAgICogVG8gc3VwcG9ydCBmdWxsIGtleWJvYXJkIGNvbnRyb2wgd2UgbmVlZCB0byBzdXBwb3J0IHRoZSBmb2xsb3dpbmc6XG4gICAqIDEuIEFycm93IGtleXMgdG8gbmF2aWdhdGUgdXAgYW5kIGRvd25cbiAgICogMi4gU3BhY2ViYXIgdG8gdG9nZ2xlIHNlbGVjdGlvblxuICAgKiAzLiBTaGlmdCArIEFycm93IGtleXMgdG8gbXVsdGlwbGUgc2VsZWN0XG4gICAqIDQuIEN0cmwgKyBBcnJvdyBrZXlzIHRvIGFsbG93IHJldGFpbmVkIHNlbGVjdGlvbiBhbmQgbmF2aWdhdGlvblxuICAgKi9cbiAga2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCwgZGF0YTogVCk6IHZvaWQge1xuXG4gICAgc3dpdGNoIChldmVudC53aGljaCkge1xuXG4gICAgICBjYXNlIFVQX0FSUk9XOlxuICAgICAgY2FzZSBET1dOX0FSUk9XOlxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGlzLm5hdmlnYXRlKGV2ZW50LCBkYXRhKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgU1BBQ0U6XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMuc2VsZWN0aW9uU2VydmljZS5zdHJhdGVneS50b2dnbGUoZGF0YSk7XG5cbiAgICAgICAgLy8gYWxzbyBhY3RpdmF0ZSB0aGUgaXRlbVxuICAgICAgICB0aGlzLnNlbGVjdGlvblNlcnZpY2UuYWN0aXZhdGUoZGF0YSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE92ZXJyaWRlIHRoZSBzdGFuZGFyZCB0b2dnbGUgZnVuY3Rpb24gdG8gc3RvcmUgb3IgY2xlYXIgdGhlXG4gICAqIG1vc3QgcmVjZW50bHkgc2VsZWN0ZWQgaXRlbVxuICAgKi9cbiAgdG9nZ2xlKGRhdGE6IFQpOiB2b2lkIHtcbiAgICBzdXBlci50b2dnbGUoZGF0YSk7XG5cbiAgICAvLyBzdG9yZSBvciBjbGVhciB0aGUgc2VsZWN0aW9uXG4gICAgdGhpcy5zZWxlY3Rpb25TZXJ2aWNlLmlzU2VsZWN0ZWQoZGF0YSkgPyB0aGlzLnNldFNlbGVjdGlvblN0YXJ0KGRhdGEpIDogdGhpcy5jbGVhclNlbGVjdGlvbigpO1xuICB9XG5cbiAgLyoqXG4gICAqIENsZWFyIGFsbCBvdGhlciBzZWxlY3RlZCBpdGVtcyBhbmQgc2VsZWN0IG9ubHlcbiAgICogdGhlIG1vc3QgcmVjZW50bHkgc2VsZWN0ZWQgaXRlbVxuICAgKi9cbiAgcHJpdmF0ZSBzaW5nbGVTZWxlY3QoZGF0YTogVCk6IHZvaWQge1xuXG4gICAgLy8gZGVzZWxlY3QgYWxsIG90aGVyIHJvd3MgaWYgbmVpdGhlciBtb2RpZmllciBrZXkgaXMgcHJlc3NlZFxuICAgIHRoaXMuZGVzZWxlY3RBbGwoKTtcblxuICAgIC8vIHNlbGVjdCB0aGUgY3VycmVudCByb3dcbiAgICB0aGlzLnNlbGVjdChkYXRhKTtcblxuICAgIC8vIHN0b3JlIHRoZSBjdXJyZW50IGl0ZW0gYXMgdGhlIHNlbGVjdGlvbiBzdGFydFxuICAgIHRoaXMuc2V0U2VsZWN0aW9uU3RhcnQoZGF0YSk7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlIG11bHRpcGxlIHNlbGVjdGlvbjpcbiAgICogMS4gSWYgbm8gc3RhcnQgaXRlbSBzZWxlY3RlZCAtIHNlbGVjdCBpdFxuICAgKiAyLiBJZiBhIHN0YXJ0IGl0ZW0gaGFzIGJlZW4gc2VsZWN0ZWQgLSBzZWxlY3QgYWxsIGluIGJldHdlZW5cbiAgICogMy4gSWYgYSBzdGFydCBhbmQgZW5kIGl0ZW0gaGF2ZSBiZWVuIHNlbGVjdGVkIGNsZWFyIHRoZSByYW5nZSBhbmQgdGhlbiBzZWxlY3QgdGhlIG5ldyByYW5nZVxuICAgKi9cbiAgcHJvdGVjdGVkIG11bHRpcGxlU2VsZWN0KGRhdGE6IFQpOiB2b2lkIHtcblxuICAgIC8vIGlmIG5vIHNlbGVjdGlvbiBjdXJyZW50bHkgZXhpc3RzIHRoZW4gcGVyZm9ybSBpbml0aWFsIHNlbGVjdGlvblxuICAgIGlmICghdGhpcy5fc2VsZWN0aW9uLnN0YXJ0KSB7XG5cbiAgICAgIC8vIHNlbGVjdCB0aGUgcm93XG4gICAgICB0aGlzLnNlbGVjdChkYXRhKTtcblxuICAgICAgLy8gc3RvcmUgdGhlIHN0YXJ0aW5nIHBvaW50XG4gICAgICByZXR1cm4gdGhpcy5zZXRTZWxlY3Rpb25TdGFydChkYXRhKTtcbiAgICB9XG5cbiAgICAvLyBpZiBhIG11bHRpcGxlIHNlbGVjdGlvbiBhbHJlYWR5IHRvb2sgcGxhY2UgLSBjbGVhciB0aGUgcHJldmlvdXMgc2VsZWN0aW9uXG4gICAgaWYgKHRoaXMuX3NlbGVjdGlvbi5zdGFydCAmJiB0aGlzLl9zZWxlY3Rpb24uZW5kKSB7XG4gICAgICB0aGlzLmRlc2VsZWN0KC4uLnRoaXMuZ2V0U2VsZWN0ZWRJdGVtcygpKTtcbiAgICB9XG5cbiAgICAvLyBzZXQgdGhlIG5ldyBzZWxlY3Rpb24gZW5kIHBvaW50XG4gICAgdGhpcy5zZXRTZWxlY3Rpb25FbmQoZGF0YSk7XG5cbiAgICAvLyBzZWxlY3QgYWxsIHRoZSBpdGVtcyBpbiB0aGUgcmFuZ2VcbiAgICB0aGlzLnNlbGVjdCguLi50aGlzLmdldFNlbGVjdGVkSXRlbXMoKSk7XG4gIH1cblxuICAvKipcbiAgICogU2V0IHRoZSBzZWxlY3Rpb24gc3RhcnQgcG9pbnQuIElmIHRoZXJlIHdhcyBwcmV2aW91c2x5IGFcbiAgICogc2VsZWN0aW9uIGVuZCBwb2ludCB0aGVuIGNsZWFyIGl0IGFzIHRoaXMgaXMgYSBuZXcgc2VsZWN0aW9uXG4gICAqL1xuICBwcml2YXRlIHNldFNlbGVjdGlvblN0YXJ0KGRhdGE6IFQpOiB2b2lkIHtcbiAgICB0aGlzLl9zZWxlY3Rpb24uc3RhcnQgPSBkYXRhO1xuICAgIHRoaXMuX3NlbGVjdGlvbi5lbmQgPSBudWxsO1xuXG4gICAgLy8gYWN0aXZhdGUgdGhlIGl0ZW1cbiAgICB0aGlzLnNlbGVjdGlvblNlcnZpY2UuYWN0aXZhdGUoZGF0YSk7XG4gIH1cblxuICAvKipcbiAgICogU2V0IHRoZSBzZWxlY3Rpb24gZW5kIHBvaW50XG4gICAqL1xuICBwcml2YXRlIHNldFNlbGVjdGlvbkVuZChkYXRhOiBUKTogdm9pZCB7XG4gICAgdGhpcy5fc2VsZWN0aW9uLmVuZCA9IGRhdGE7XG5cbiAgICAvLyBhY3RpdmF0ZSB0aGUgaXRlbVxuICAgIHRoaXMuc2VsZWN0aW9uU2VydmljZS5hY3RpdmF0ZShkYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhciBib3RoIHN0YXJ0IGFuZCBlbmQgc2VsZWN0aW9uIHBvaW50c1xuICAgKi9cbiAgcHJvdGVjdGVkIGNsZWFyU2VsZWN0aW9uKGRlYWN0aXZhdGU6IGJvb2xlYW4gPSB0cnVlKTogdm9pZCB7XG5cbiAgICAvLyByZXNldCB0aGUgc2VsZWN0ZWQgaXRlbVxuICAgIHRoaXMuX3NlbGVjdGlvbiA9IHsgc3RhcnQ6IG51bGwsIGVuZDogbnVsbCB9O1xuXG4gICAgLy8gcmVtb3ZlIHRoZSBjdXJyZW50IGFjdGl2ZSBpdGVtXG4gICAgaWYgKGRlYWN0aXZhdGUpIHtcbiAgICAgIHRoaXMuc2VsZWN0aW9uU2VydmljZS5kZWFjdGl2YXRlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIERldGVybWluZSBhbGwgdGhlIGl0ZW1zIGFmZmVjdGVkIGJ5IHRoZSBjdXJyZW50IHNlbGVjdGlvbi5cbiAgICogTm90ZSB0aGF0IHRoZSBlbmQgcG9pbnQgbWF5IGJlIGFib3ZlIHRoZSBzdGFydCBwb2ludCBzb1xuICAgKiB3ZSBuZWVkIHRvIGFjY291bnQgZm9yIHRoaXMuXG4gICAqL1xuICBwcml2YXRlIGdldFNlbGVjdGVkSXRlbXMoKTogVFtdIHtcblxuICAgIC8vIGdldCB0aGUgbGF0ZXN0IGRhdGFzZXRcbiAgICBjb25zdCB7IGRhdGFzZXQgfSA9IHRoaXMuc2VsZWN0aW9uU2VydmljZTtcblxuICAgIC8vIGdldCB0aGUgaW5kZXhlcyBvZiB0aGUgc3RhcnQgYW5kIGVuZCBwb2ludFxuICAgIGNvbnN0IHN0YXJ0SWR4ID0gZGF0YXNldC5pbmRleE9mKHRoaXMuX3NlbGVjdGlvbi5zdGFydCk7XG4gICAgY29uc3QgZW5kSWR4ID0gZGF0YXNldC5pbmRleE9mKHRoaXMuX3NlbGVjdGlvbi5lbmQpO1xuXG4gICAgLy8gZ2V0IHRoZSByZWdpb24gb2YgdGhlIGFycmF5IHRoYXQgaXMgc2VsZWN0ZWQgLSBub3RlIHRoZSBlbmRJZHggbWF5IGJlIGJlZm9yZSB0aGUgc3RhcnRJZHggc28gYWNjb3VudCBmb3IgdGhpc1xuICAgIHJldHVybiBkYXRhc2V0LnNsaWNlKE1hdGgubWluKHN0YXJ0SWR4LCBlbmRJZHgpLCBNYXRoLm1heChzdGFydElkeCwgZW5kSWR4KSArIDEpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFjdGl2YXRlIHRoZSBzaWJsaW5nIGl0ZW0gd2hlbiBhcnJvdyBrZXlzIGFyZSBwcmVzc2VkXG4gICAqL1xuICBwcml2YXRlIG5hdmlnYXRlKGV2ZW50OiBLZXlib2FyZEV2ZW50LCBkYXRhOiBUKTogdm9pZCB7XG5cbiAgICAvLyBkZXRlcm1pbmUgd2hpY2ggbW9kaWZpZXIga2V5cyBhcmUgcHJlc3NlZFxuICAgIGNvbnN0IHsgY3RybEtleSwgc2hpZnRLZXkgfSA9IGV2ZW50O1xuXG4gICAgLy8gaWYgbm8gbW9kaWZpZXIga2V5cyBhcmUgcHJlc3NlZCB0aGVuIGRlc2VsZWN0IGFsbCBhbmQgY2xlYXIgdGhlIHNlbGVjdGlvblxuICAgIGlmICghY3RybEtleSAmJiAhc2hpZnRLZXkpIHtcbiAgICAgIHRoaXMuZGVzZWxlY3RBbGwoKTtcbiAgICAgIHRoaXMuY2xlYXJTZWxlY3Rpb24oZmFsc2UpO1xuICAgIH1cblxuICAgIC8vIGFjdGl2YXRlIHRoZSBzaWJsaW5nIC0gaWYgdGhlIHVwIGFycm93IGlzIHByZXNzZWQgdGhlbiBuYXZpZ2F0ZSB0byB0aGUgcHJldmlvdXMgc2libGluZ1xuICAgIGNvbnN0IHNpYmxpbmcgPSB0aGlzLnNlbGVjdGlvblNlcnZpY2UuYWN0aXZhdGVTaWJsaW5nKGV2ZW50LndoaWNoID09PSBVUF9BUlJPVyk7XG5cbiAgICAvLyBpZiB0aGUgc2hpZnQga2V5IGlzIHByZXNzZWQgdGhlbiB3ZSBhbHNvIHdhbnQgdG8gdG9nZ2xlIHRoZSBzdGF0ZSBpZiB0aGUgaXRlbVxuICAgIGlmIChzaGlmdEtleSAmJiBzaWJsaW5nKSB7XG5cbiAgICAgIC8vIGlmIHRoZXJlIGlzIG5vIGN1cnJlbnQgc2VsZWN0aW9uIHN0YXJ0IHRoZW4gc2VsZWN0IHRoZSBjdXJyZW50IHJvd1xuICAgICAgaWYgKCF0aGlzLl9zZWxlY3Rpb24uc3RhcnQpIHtcbiAgICAgICAgdGhpcy5tdWx0aXBsZVNlbGVjdChkYXRhKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5tdWx0aXBsZVNlbGVjdChzaWJsaW5nKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBTZWxlY3Rpb248VD4ge1xuICBzdGFydDogVDtcbiAgZW5kOiBUO1xufVxuIl19