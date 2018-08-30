/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { DOWN_ARROW, ENTER, SPACE, UP_ARROW } from '@angular/cdk/keycodes';
import { SelectionStrategy } from '../../directives/selection/strategies/selection.strategy';
var MultipleSelectListStrategy = /** @class */ (function (_super) {
    tslib_1.__extends(MultipleSelectListStrategy, _super);
    function MultipleSelectListStrategy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /** Prevent the browser from highlighting text on shift click */
    /**
     * Prevent the browser from highlighting text on shift click
     * @param {?} event
     * @return {?}
     */
    MultipleSelectListStrategy.prototype.mousedown = /**
     * Prevent the browser from highlighting text on shift click
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.preventDefault();
    };
    /**
     * @param {?} event
     * @param {?} data
     * @return {?}
     */
    MultipleSelectListStrategy.prototype.click = /**
     * @param {?} event
     * @param {?} data
     * @return {?}
     */
    function (event, data) {
        // activate the clicked item
        this.selectionService.activate(data);
        // if the shift key is pressed we want to perform a multiple selection
        if (event.shiftKey) {
            return this.multipleSelect(data);
        }
        // otherwise perform a single toggle selection
        if (this.selectionService.isSelected(data)) {
            this.deselect(data);
            this._lastSelection = null;
        }
        else {
            this.select(data);
            this._lastSelection = data;
        }
    };
    /**
     * @param {?} event
     * @param {?} data
     * @return {?}
     */
    MultipleSelectListStrategy.prototype.keydown = /**
     * @param {?} event
     * @param {?} data
     * @return {?}
     */
    function (event, data) {
        switch (event.which) {
            case UP_ARROW: {
                event.preventDefault();
                var /** @type {?} */ sibling = this.selectionService.activateSibling(true);
                if (event.shiftKey) {
                    this.select(data, sibling);
                    this._lastSelection = sibling;
                }
                break;
            }
            case DOWN_ARROW: {
                event.preventDefault();
                var /** @type {?} */ sibling = this.selectionService.activateSibling(false);
                if (event.shiftKey) {
                    this.select(data, sibling);
                    this._lastSelection = sibling;
                }
                break;
            }
            case SPACE:
            case ENTER:
                event.preventDefault();
                this.toggle(data);
                this._lastSelection = this.selectionService.isSelected(data) ? data : null;
                break;
        }
    };
    /**
     * @param {?} data
     * @return {?}
     */
    MultipleSelectListStrategy.prototype.multipleSelect = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        // if there is no start item selected
        if (!this._lastSelection) {
            this.select(data);
            return this._lastSelection = data;
        }
        // if there already is a start item then find the items in the range
        this.select.apply(this, tslib_1.__spread(this.getSelectedItems(this._lastSelection, data)));
        // store the selection end point
        this._lastSelection = data;
    };
    /**
     * @param {?} start
     * @param {?} end
     * @return {?}
     */
    MultipleSelectListStrategy.prototype.getSelectedItems = /**
     * @param {?} start
     * @param {?} end
     * @return {?}
     */
    function (start, end) {
        // get the latest dataset
        var dataset = this.selectionService.dataset;
        // get the indexes of the start and end point
        var /** @type {?} */ startIdx = dataset.indexOf(start);
        var /** @type {?} */ endIdx = dataset.indexOf(end);
        // get the region of the array that is selected - note the endIdx may be before the startIdx so account for this
        return dataset.slice(Math.min(startIdx, endIdx), Math.max(startIdx, endIdx) + 1);
    };
    return MultipleSelectListStrategy;
}(SelectionStrategy));
export { MultipleSelectListStrategy };
function MultipleSelectListStrategy_tsickle_Closure_declarations() {
    /** @type {?} */
    MultipleSelectListStrategy.prototype._lastSelection;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGlwbGUtc2VsZWN0LWxpc3Quc3RyYXRlZ3kuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9zZWxlY3QtbGlzdC9tdWx0aXBsZS1zZWxlY3QtbGlzdC5zdHJhdGVneS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMzRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwwREFBMEQsQ0FBQztBQUU3RixJQUFBO0lBQWdELHNEQUFpQjs7OztJQUk3RCxnRUFBZ0U7Ozs7OztJQUNoRSw4Q0FBUzs7Ozs7SUFBVCxVQUFVLEtBQWlCO1FBQ3ZCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztLQUMxQjs7Ozs7O0lBRUQsMENBQUs7Ozs7O0lBQUwsVUFBTSxLQUFpQixFQUFFLElBQVM7O1FBRzlCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7O1FBR3JDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3BDOztRQUdELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDcEIsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7U0FDOUI7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbEIsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7U0FDOUI7S0FDSjs7Ozs7O0lBRUQsNENBQU87Ozs7O0lBQVAsVUFBUSxLQUFvQixFQUFFLElBQVM7UUFFbkMsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFFbEIsS0FBSyxRQUFRLEVBQUUsQ0FBQztnQkFDWixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ3ZCLHFCQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUU1RCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztvQkFDakIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7b0JBQzNCLElBQUksQ0FBQyxjQUFjLEdBQUcsT0FBTyxDQUFDO2lCQUNqQztnQkFDRCxLQUFLLENBQUM7YUFDVDtZQUVELEtBQUssVUFBVSxFQUFFLENBQUM7Z0JBQ2QsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUN2QixxQkFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFFN0QsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7b0JBQ2pCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO29CQUMzQixJQUFJLENBQUMsY0FBYyxHQUFHLE9BQU8sQ0FBQztpQkFDakM7Z0JBQ0QsS0FBSyxDQUFDO2FBQ1Q7WUFFRCxLQUFLLEtBQUssQ0FBQztZQUNYLEtBQUssS0FBSztnQkFDTixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2xCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0JBQzNFLEtBQUssQ0FBQztTQUNiO0tBQ0o7Ozs7O0lBRUQsbURBQWM7Ozs7SUFBZCxVQUFlLElBQVM7O1FBR3BCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7WUFDdkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNsQixNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7U0FDckM7O1FBR0QsSUFBSSxDQUFDLE1BQU0sT0FBWCxJQUFJLG1CQUFXLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxHQUFFOztRQUdqRSxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztLQUM5Qjs7Ozs7O0lBRU8scURBQWdCOzs7OztjQUFDLEtBQVUsRUFBRSxHQUFROztRQUdqQyxJQUFBLHVDQUFPLENBQTJCOztRQUcxQyxxQkFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN4QyxxQkFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQzs7UUFHcEMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7O3FDQTVGekY7RUFHZ0QsaUJBQWlCLEVBNEZoRSxDQUFBO0FBNUZELHNDQTRGQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERPV05fQVJST1csIEVOVEVSLCBTUEFDRSwgVVBfQVJST1cgfSBmcm9tICdAYW5ndWxhci9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHsgU2VsZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL3NlbGVjdGlvbi9zdHJhdGVnaWVzL3NlbGVjdGlvbi5zdHJhdGVneSc7XG5cbmV4cG9ydCBjbGFzcyBNdWx0aXBsZVNlbGVjdExpc3RTdHJhdGVneSBleHRlbmRzIFNlbGVjdGlvblN0cmF0ZWd5IHtcblxuICAgIHByaXZhdGUgX2xhc3RTZWxlY3Rpb246IGFueTtcblxuICAgIC8qKiBQcmV2ZW50IHRoZSBicm93c2VyIGZyb20gaGlnaGxpZ2h0aW5nIHRleHQgb24gc2hpZnQgY2xpY2sgKi9cbiAgICBtb3VzZWRvd24oZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBjbGljayhldmVudDogTW91c2VFdmVudCwgZGF0YTogYW55KTogdm9pZCB7XG5cbiAgICAgICAgLy8gYWN0aXZhdGUgdGhlIGNsaWNrZWQgaXRlbVxuICAgICAgICB0aGlzLnNlbGVjdGlvblNlcnZpY2UuYWN0aXZhdGUoZGF0YSk7XG5cbiAgICAgICAgLy8gaWYgdGhlIHNoaWZ0IGtleSBpcyBwcmVzc2VkIHdlIHdhbnQgdG8gcGVyZm9ybSBhIG11bHRpcGxlIHNlbGVjdGlvblxuICAgICAgICBpZiAoZXZlbnQuc2hpZnRLZXkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm11bHRpcGxlU2VsZWN0KGRhdGEpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gb3RoZXJ3aXNlIHBlcmZvcm0gYSBzaW5nbGUgdG9nZ2xlIHNlbGVjdGlvblxuICAgICAgICBpZiAodGhpcy5zZWxlY3Rpb25TZXJ2aWNlLmlzU2VsZWN0ZWQoZGF0YSkpIHtcbiAgICAgICAgICAgIHRoaXMuZGVzZWxlY3QoZGF0YSk7XG4gICAgICAgICAgICB0aGlzLl9sYXN0U2VsZWN0aW9uID0gbnVsbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0KGRhdGEpO1xuICAgICAgICAgICAgdGhpcy5fbGFzdFNlbGVjdGlvbiA9IGRhdGE7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBrZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50LCBkYXRhOiBhbnkpOiB2b2lkIHtcblxuICAgICAgICBzd2l0Y2ggKGV2ZW50LndoaWNoKSB7XG5cbiAgICAgICAgICAgIGNhc2UgVVBfQVJST1c6IHtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHNpYmxpbmcgPSB0aGlzLnNlbGVjdGlvblNlcnZpY2UuYWN0aXZhdGVTaWJsaW5nKHRydWUpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LnNoaWZ0S2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0KGRhdGEsIHNpYmxpbmcpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sYXN0U2VsZWN0aW9uID0gc2libGluZztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNhc2UgRE9XTl9BUlJPVzoge1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2libGluZyA9IHRoaXMuc2VsZWN0aW9uU2VydmljZS5hY3RpdmF0ZVNpYmxpbmcoZmFsc2UpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LnNoaWZ0S2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0KGRhdGEsIHNpYmxpbmcpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sYXN0U2VsZWN0aW9uID0gc2libGluZztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNhc2UgU1BBQ0U6XG4gICAgICAgICAgICBjYXNlIEVOVEVSOlxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy50b2dnbGUoZGF0YSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fbGFzdFNlbGVjdGlvbiA9IHRoaXMuc2VsZWN0aW9uU2VydmljZS5pc1NlbGVjdGVkKGRhdGEpID8gZGF0YSA6IG51bGw7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBtdWx0aXBsZVNlbGVjdChkYXRhOiBhbnkpOiB2b2lkIHtcblxuICAgICAgICAvLyBpZiB0aGVyZSBpcyBubyBzdGFydCBpdGVtIHNlbGVjdGVkXG4gICAgICAgIGlmICghdGhpcy5fbGFzdFNlbGVjdGlvbikge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3QoZGF0YSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbGFzdFNlbGVjdGlvbiA9IGRhdGE7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiB0aGVyZSBhbHJlYWR5IGlzIGEgc3RhcnQgaXRlbSB0aGVuIGZpbmQgdGhlIGl0ZW1zIGluIHRoZSByYW5nZVxuICAgICAgICB0aGlzLnNlbGVjdCguLi50aGlzLmdldFNlbGVjdGVkSXRlbXModGhpcy5fbGFzdFNlbGVjdGlvbiwgZGF0YSkpO1xuXG4gICAgICAgIC8vIHN0b3JlIHRoZSBzZWxlY3Rpb24gZW5kIHBvaW50XG4gICAgICAgIHRoaXMuX2xhc3RTZWxlY3Rpb24gPSBkYXRhO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0U2VsZWN0ZWRJdGVtcyhzdGFydDogYW55LCBlbmQ6IGFueSk6IGFueVtdIHtcblxuICAgICAgICAvLyBnZXQgdGhlIGxhdGVzdCBkYXRhc2V0XG4gICAgICAgIGNvbnN0IHsgZGF0YXNldCB9ID0gdGhpcy5zZWxlY3Rpb25TZXJ2aWNlO1xuXG4gICAgICAgIC8vIGdldCB0aGUgaW5kZXhlcyBvZiB0aGUgc3RhcnQgYW5kIGVuZCBwb2ludFxuICAgICAgICBjb25zdCBzdGFydElkeCA9IGRhdGFzZXQuaW5kZXhPZihzdGFydCk7XG4gICAgICAgIGNvbnN0IGVuZElkeCA9IGRhdGFzZXQuaW5kZXhPZihlbmQpO1xuXG4gICAgICAgIC8vIGdldCB0aGUgcmVnaW9uIG9mIHRoZSBhcnJheSB0aGF0IGlzIHNlbGVjdGVkIC0gbm90ZSB0aGUgZW5kSWR4IG1heSBiZSBiZWZvcmUgdGhlIHN0YXJ0SWR4IHNvIGFjY291bnQgZm9yIHRoaXNcbiAgICAgICAgcmV0dXJuIGRhdGFzZXQuc2xpY2UoTWF0aC5taW4oc3RhcnRJZHgsIGVuZElkeCksIE1hdGgubWF4KHN0YXJ0SWR4LCBlbmRJZHgpICsgMSk7XG4gICAgfVxuXG59Il19