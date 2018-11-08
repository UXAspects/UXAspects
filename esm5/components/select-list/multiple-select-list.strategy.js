/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { DOWN_ARROW, ENTER, SPACE, UP_ARROW } from '@angular/cdk/keycodes';
import { SelectionStrategy } from '../../directives/selection/strategies/selection.strategy';
/**
 * @template T
 */
var /**
 * @template T
 */
MultipleSelectListStrategy = /** @class */ (function (_super) {
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
            this._lastSelection = data;
            return;
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
/**
 * @template T
 */
export { MultipleSelectListStrategy };
function MultipleSelectListStrategy_tsickle_Closure_declarations() {
    /** @type {?} */
    MultipleSelectListStrategy.prototype._lastSelection;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGlwbGUtc2VsZWN0LWxpc3Quc3RyYXRlZ3kuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9zZWxlY3QtbGlzdC9tdWx0aXBsZS1zZWxlY3QtbGlzdC5zdHJhdGVneS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMzRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwwREFBMEQsQ0FBQzs7OztBQUU3Rjs7O0FBQUE7SUFBbUQsc0RBQW9COzs7O0lBSW5FLGdFQUFnRTs7Ozs7O0lBQ2hFLDhDQUFTOzs7OztJQUFULFVBQVUsS0FBaUI7UUFDdkIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO0tBQzFCOzs7Ozs7SUFFRCwwQ0FBSzs7Ozs7SUFBTCxVQUFNLEtBQWlCLEVBQUUsSUFBTzs7UUFHNUIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7UUFHckMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDakIsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDcEM7O1FBR0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNwQixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztTQUM5QjtRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNsQixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztTQUM5QjtLQUNKOzs7Ozs7SUFFRCw0Q0FBTzs7Ozs7SUFBUCxVQUFRLEtBQW9CLEVBQUUsSUFBTztRQUVqQyxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUVsQixLQUFLLFFBQVEsRUFBRSxDQUFDO2dCQUNaLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDdkIscUJBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBRTVELEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO29CQUNqQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztvQkFDM0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxPQUFPLENBQUM7aUJBQ2pDO2dCQUNELEtBQUssQ0FBQzthQUNUO1lBRUQsS0FBSyxVQUFVLEVBQUUsQ0FBQztnQkFDZCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ3ZCLHFCQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUU3RCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztvQkFDakIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7b0JBQzNCLElBQUksQ0FBQyxjQUFjLEdBQUcsT0FBTyxDQUFDO2lCQUNqQztnQkFDRCxLQUFLLENBQUM7YUFDVDtZQUVELEtBQUssS0FBSyxDQUFDO1lBQ1gsS0FBSyxLQUFLO2dCQUNOLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDdkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDbEIsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDM0UsS0FBSyxDQUFDO1NBQ2I7S0FDSjs7Ozs7SUFFRCxtREFBYzs7OztJQUFkLFVBQWUsSUFBTzs7UUFHbEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztZQUN2QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2xCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO1lBQzNCLE1BQU0sQ0FBQztTQUNWOztRQUdELElBQUksQ0FBQyxNQUFNLE9BQVgsSUFBSSxtQkFBVyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsR0FBRTs7UUFHakUsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7S0FDOUI7Ozs7OztJQUVPLHFEQUFnQjs7Ozs7Y0FBQyxLQUFRLEVBQUUsR0FBTTs7UUFHN0IsSUFBQSx1Q0FBTyxDQUEyQjs7UUFHMUMscUJBQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDeEMscUJBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7O1FBR3BDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDOztxQ0E3RnpGO0VBR21ELGlCQUFpQixFQTZGbkUsQ0FBQTs7OztBQTdGRCxzQ0E2RkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBET1dOX0FSUk9XLCBFTlRFUiwgU1BBQ0UsIFVQX0FSUk9XIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7IFNlbGVjdGlvblN0cmF0ZWd5IH0gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9zZWxlY3Rpb24vc3RyYXRlZ2llcy9zZWxlY3Rpb24uc3RyYXRlZ3knO1xuXG5leHBvcnQgY2xhc3MgTXVsdGlwbGVTZWxlY3RMaXN0U3RyYXRlZ3k8VD4gZXh0ZW5kcyBTZWxlY3Rpb25TdHJhdGVneTxUPiB7XG5cbiAgICBwcml2YXRlIF9sYXN0U2VsZWN0aW9uOiBUO1xuXG4gICAgLyoqIFByZXZlbnQgdGhlIGJyb3dzZXIgZnJvbSBoaWdobGlnaHRpbmcgdGV4dCBvbiBzaGlmdCBjbGljayAqL1xuICAgIG1vdXNlZG93bihldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIGNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50LCBkYXRhOiBUKTogdm9pZCB7XG5cbiAgICAgICAgLy8gYWN0aXZhdGUgdGhlIGNsaWNrZWQgaXRlbVxuICAgICAgICB0aGlzLnNlbGVjdGlvblNlcnZpY2UuYWN0aXZhdGUoZGF0YSk7XG5cbiAgICAgICAgLy8gaWYgdGhlIHNoaWZ0IGtleSBpcyBwcmVzc2VkIHdlIHdhbnQgdG8gcGVyZm9ybSBhIG11bHRpcGxlIHNlbGVjdGlvblxuICAgICAgICBpZiAoZXZlbnQuc2hpZnRLZXkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm11bHRpcGxlU2VsZWN0KGRhdGEpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gb3RoZXJ3aXNlIHBlcmZvcm0gYSBzaW5nbGUgdG9nZ2xlIHNlbGVjdGlvblxuICAgICAgICBpZiAodGhpcy5zZWxlY3Rpb25TZXJ2aWNlLmlzU2VsZWN0ZWQoZGF0YSkpIHtcbiAgICAgICAgICAgIHRoaXMuZGVzZWxlY3QoZGF0YSk7XG4gICAgICAgICAgICB0aGlzLl9sYXN0U2VsZWN0aW9uID0gbnVsbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0KGRhdGEpO1xuICAgICAgICAgICAgdGhpcy5fbGFzdFNlbGVjdGlvbiA9IGRhdGE7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBrZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50LCBkYXRhOiBUKTogdm9pZCB7XG5cbiAgICAgICAgc3dpdGNoIChldmVudC53aGljaCkge1xuXG4gICAgICAgICAgICBjYXNlIFVQX0FSUk9XOiB7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBjb25zdCBzaWJsaW5nID0gdGhpcy5zZWxlY3Rpb25TZXJ2aWNlLmFjdGl2YXRlU2libGluZyh0cnVlKTtcblxuICAgICAgICAgICAgICAgIGlmIChldmVudC5zaGlmdEtleSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdChkYXRhLCBzaWJsaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbGFzdFNlbGVjdGlvbiA9IHNpYmxpbmc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjYXNlIERPV05fQVJST1c6IHtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHNpYmxpbmcgPSB0aGlzLnNlbGVjdGlvblNlcnZpY2UuYWN0aXZhdGVTaWJsaW5nKGZhbHNlKTtcblxuICAgICAgICAgICAgICAgIGlmIChldmVudC5zaGlmdEtleSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdChkYXRhLCBzaWJsaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbGFzdFNlbGVjdGlvbiA9IHNpYmxpbmc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjYXNlIFNQQUNFOlxuICAgICAgICAgICAgY2FzZSBFTlRFUjpcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlKGRhdGEpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2xhc3RTZWxlY3Rpb24gPSB0aGlzLnNlbGVjdGlvblNlcnZpY2UuaXNTZWxlY3RlZChkYXRhKSA/IGRhdGEgOiBudWxsO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbXVsdGlwbGVTZWxlY3QoZGF0YTogVCk6IHZvaWQge1xuXG4gICAgICAgIC8vIGlmIHRoZXJlIGlzIG5vIHN0YXJ0IGl0ZW0gc2VsZWN0ZWRcbiAgICAgICAgaWYgKCF0aGlzLl9sYXN0U2VsZWN0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdChkYXRhKTtcbiAgICAgICAgICAgIHRoaXMuX2xhc3RTZWxlY3Rpb24gPSBkYXRhO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgdGhlcmUgYWxyZWFkeSBpcyBhIHN0YXJ0IGl0ZW0gdGhlbiBmaW5kIHRoZSBpdGVtcyBpbiB0aGUgcmFuZ2VcbiAgICAgICAgdGhpcy5zZWxlY3QoLi4udGhpcy5nZXRTZWxlY3RlZEl0ZW1zKHRoaXMuX2xhc3RTZWxlY3Rpb24sIGRhdGEpKTtcblxuICAgICAgICAvLyBzdG9yZSB0aGUgc2VsZWN0aW9uIGVuZCBwb2ludFxuICAgICAgICB0aGlzLl9sYXN0U2VsZWN0aW9uID0gZGF0YTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFNlbGVjdGVkSXRlbXMoc3RhcnQ6IFQsIGVuZDogVCk6IFRbXSB7XG5cbiAgICAgICAgLy8gZ2V0IHRoZSBsYXRlc3QgZGF0YXNldFxuICAgICAgICBjb25zdCB7IGRhdGFzZXQgfSA9IHRoaXMuc2VsZWN0aW9uU2VydmljZTtcblxuICAgICAgICAvLyBnZXQgdGhlIGluZGV4ZXMgb2YgdGhlIHN0YXJ0IGFuZCBlbmQgcG9pbnRcbiAgICAgICAgY29uc3Qgc3RhcnRJZHggPSBkYXRhc2V0LmluZGV4T2Yoc3RhcnQpO1xuICAgICAgICBjb25zdCBlbmRJZHggPSBkYXRhc2V0LmluZGV4T2YoZW5kKTtcblxuICAgICAgICAvLyBnZXQgdGhlIHJlZ2lvbiBvZiB0aGUgYXJyYXkgdGhhdCBpcyBzZWxlY3RlZCAtIG5vdGUgdGhlIGVuZElkeCBtYXkgYmUgYmVmb3JlIHRoZSBzdGFydElkeCBzbyBhY2NvdW50IGZvciB0aGlzXG4gICAgICAgIHJldHVybiBkYXRhc2V0LnNsaWNlKE1hdGgubWluKHN0YXJ0SWR4LCBlbmRJZHgpLCBNYXRoLm1heChzdGFydElkeCwgZW5kSWR4KSArIDEpO1xuICAgIH1cblxufSJdfQ==