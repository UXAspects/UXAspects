/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { DOWN_ARROW, ENTER, SPACE, UP_ARROW } from '@angular/cdk/keycodes';
import { SelectionStrategy } from '../../directives/selection/strategies/selection.strategy';
export class MultipleSelectListStrategy extends SelectionStrategy {
    /**
     * Prevent the browser from highlighting text on shift click
     * @param {?} event
     * @return {?}
     */
    mousedown(event) {
        event.preventDefault();
    }
    /**
     * @param {?} event
     * @param {?} data
     * @return {?}
     */
    click(event, data) {
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
    }
    /**
     * @param {?} event
     * @param {?} data
     * @return {?}
     */
    keydown(event, data) {
        switch (event.which) {
            case UP_ARROW: {
                event.preventDefault();
                const /** @type {?} */ sibling = this.selectionService.activateSibling(true);
                if (event.shiftKey) {
                    this.select(data, sibling);
                    this._lastSelection = sibling;
                }
                break;
            }
            case DOWN_ARROW: {
                event.preventDefault();
                const /** @type {?} */ sibling = this.selectionService.activateSibling(false);
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
    }
    /**
     * @param {?} data
     * @return {?}
     */
    multipleSelect(data) {
        // if there is no start item selected
        if (!this._lastSelection) {
            this.select(data);
            return this._lastSelection = data;
        }
        // if there already is a start item then find the items in the range
        this.select(...this.getSelectedItems(this._lastSelection, data));
        // store the selection end point
        this._lastSelection = data;
    }
    /**
     * @param {?} start
     * @param {?} end
     * @return {?}
     */
    getSelectedItems(start, end) {
        // get the latest dataset
        const { dataset } = this.selectionService;
        // get the indexes of the start and end point
        const /** @type {?} */ startIdx = dataset.indexOf(start);
        const /** @type {?} */ endIdx = dataset.indexOf(end);
        // get the region of the array that is selected - note the endIdx may be before the startIdx so account for this
        return dataset.slice(Math.min(startIdx, endIdx), Math.max(startIdx, endIdx) + 1);
    }
}
function MultipleSelectListStrategy_tsickle_Closure_declarations() {
    /** @type {?} */
    MultipleSelectListStrategy.prototype._lastSelection;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGlwbGUtc2VsZWN0LWxpc3Quc3RyYXRlZ3kuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9zZWxlY3QtbGlzdC9tdWx0aXBsZS1zZWxlY3QtbGlzdC5zdHJhdGVneS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzNFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDBEQUEwRCxDQUFDO0FBRTdGLE1BQU0saUNBQWtDLFNBQVEsaUJBQWlCOzs7Ozs7SUFLN0QsU0FBUyxDQUFDLEtBQWlCO1FBQ3ZCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztLQUMxQjs7Ozs7O0lBRUQsS0FBSyxDQUFDLEtBQWlCLEVBQUUsSUFBUzs7UUFHOUIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7UUFHckMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDakIsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDcEM7O1FBR0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNwQixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztTQUM5QjtRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNsQixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztTQUM5QjtLQUNKOzs7Ozs7SUFFRCxPQUFPLENBQUMsS0FBb0IsRUFBRSxJQUFTO1FBRW5DLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBRWxCLEtBQUssUUFBUSxFQUFFLENBQUM7Z0JBQ1osS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUN2Qix1QkFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFFNUQsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7b0JBQ2pCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO29CQUMzQixJQUFJLENBQUMsY0FBYyxHQUFHLE9BQU8sQ0FBQztpQkFDakM7Z0JBQ0QsS0FBSyxDQUFDO2FBQ1Q7WUFFRCxLQUFLLFVBQVUsRUFBRSxDQUFDO2dCQUNkLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDdkIsdUJBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBRTdELEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO29CQUNqQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztvQkFDM0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxPQUFPLENBQUM7aUJBQ2pDO2dCQUNELEtBQUssQ0FBQzthQUNUO1lBRUQsS0FBSyxLQUFLLENBQUM7WUFDWCxLQUFLLEtBQUs7Z0JBQ04sS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUN2QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNsQixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUMzRSxLQUFLLENBQUM7U0FDYjtLQUNKOzs7OztJQUVELGNBQWMsQ0FBQyxJQUFTOztRQUdwQixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbEIsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO1NBQ3JDOztRQUdELElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDOztRQUdqRSxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztLQUM5Qjs7Ozs7O0lBRU8sZ0JBQWdCLENBQUMsS0FBVSxFQUFFLEdBQVE7O1FBR3pDLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7O1FBRzFDLHVCQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3hDLHVCQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDOztRQUdwQyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzs7Q0FHeEYiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBET1dOX0FSUk9XLCBFTlRFUiwgU1BBQ0UsIFVQX0FSUk9XIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7IFNlbGVjdGlvblN0cmF0ZWd5IH0gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9zZWxlY3Rpb24vc3RyYXRlZ2llcy9zZWxlY3Rpb24uc3RyYXRlZ3knO1xuXG5leHBvcnQgY2xhc3MgTXVsdGlwbGVTZWxlY3RMaXN0U3RyYXRlZ3kgZXh0ZW5kcyBTZWxlY3Rpb25TdHJhdGVneSB7XG5cbiAgICBwcml2YXRlIF9sYXN0U2VsZWN0aW9uOiBhbnk7XG5cbiAgICAvKiogUHJldmVudCB0aGUgYnJvd3NlciBmcm9tIGhpZ2hsaWdodGluZyB0ZXh0IG9uIHNoaWZ0IGNsaWNrICovXG4gICAgbW91c2Vkb3duKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgY2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQsIGRhdGE6IGFueSk6IHZvaWQge1xuXG4gICAgICAgIC8vIGFjdGl2YXRlIHRoZSBjbGlja2VkIGl0ZW1cbiAgICAgICAgdGhpcy5zZWxlY3Rpb25TZXJ2aWNlLmFjdGl2YXRlKGRhdGEpO1xuXG4gICAgICAgIC8vIGlmIHRoZSBzaGlmdCBrZXkgaXMgcHJlc3NlZCB3ZSB3YW50IHRvIHBlcmZvcm0gYSBtdWx0aXBsZSBzZWxlY3Rpb25cbiAgICAgICAgaWYgKGV2ZW50LnNoaWZ0S2V5KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tdWx0aXBsZVNlbGVjdChkYXRhKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG90aGVyd2lzZSBwZXJmb3JtIGEgc2luZ2xlIHRvZ2dsZSBzZWxlY3Rpb25cbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0aW9uU2VydmljZS5pc1NlbGVjdGVkKGRhdGEpKSB7XG4gICAgICAgICAgICB0aGlzLmRlc2VsZWN0KGRhdGEpO1xuICAgICAgICAgICAgdGhpcy5fbGFzdFNlbGVjdGlvbiA9IG51bGw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdChkYXRhKTtcbiAgICAgICAgICAgIHRoaXMuX2xhc3RTZWxlY3Rpb24gPSBkYXRhO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAga2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCwgZGF0YTogYW55KTogdm9pZCB7XG5cbiAgICAgICAgc3dpdGNoIChldmVudC53aGljaCkge1xuXG4gICAgICAgICAgICBjYXNlIFVQX0FSUk9XOiB7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBjb25zdCBzaWJsaW5nID0gdGhpcy5zZWxlY3Rpb25TZXJ2aWNlLmFjdGl2YXRlU2libGluZyh0cnVlKTtcblxuICAgICAgICAgICAgICAgIGlmIChldmVudC5zaGlmdEtleSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdChkYXRhLCBzaWJsaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbGFzdFNlbGVjdGlvbiA9IHNpYmxpbmc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjYXNlIERPV05fQVJST1c6IHtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHNpYmxpbmcgPSB0aGlzLnNlbGVjdGlvblNlcnZpY2UuYWN0aXZhdGVTaWJsaW5nKGZhbHNlKTtcblxuICAgICAgICAgICAgICAgIGlmIChldmVudC5zaGlmdEtleSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdChkYXRhLCBzaWJsaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbGFzdFNlbGVjdGlvbiA9IHNpYmxpbmc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjYXNlIFNQQUNFOlxuICAgICAgICAgICAgY2FzZSBFTlRFUjpcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlKGRhdGEpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2xhc3RTZWxlY3Rpb24gPSB0aGlzLnNlbGVjdGlvblNlcnZpY2UuaXNTZWxlY3RlZChkYXRhKSA/IGRhdGEgOiBudWxsO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbXVsdGlwbGVTZWxlY3QoZGF0YTogYW55KTogdm9pZCB7XG5cbiAgICAgICAgLy8gaWYgdGhlcmUgaXMgbm8gc3RhcnQgaXRlbSBzZWxlY3RlZFxuICAgICAgICBpZiAoIXRoaXMuX2xhc3RTZWxlY3Rpb24pIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0KGRhdGEpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xhc3RTZWxlY3Rpb24gPSBkYXRhO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgdGhlcmUgYWxyZWFkeSBpcyBhIHN0YXJ0IGl0ZW0gdGhlbiBmaW5kIHRoZSBpdGVtcyBpbiB0aGUgcmFuZ2VcbiAgICAgICAgdGhpcy5zZWxlY3QoLi4udGhpcy5nZXRTZWxlY3RlZEl0ZW1zKHRoaXMuX2xhc3RTZWxlY3Rpb24sIGRhdGEpKTtcblxuICAgICAgICAvLyBzdG9yZSB0aGUgc2VsZWN0aW9uIGVuZCBwb2ludFxuICAgICAgICB0aGlzLl9sYXN0U2VsZWN0aW9uID0gZGF0YTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFNlbGVjdGVkSXRlbXMoc3RhcnQ6IGFueSwgZW5kOiBhbnkpOiBhbnlbXSB7XG5cbiAgICAgICAgLy8gZ2V0IHRoZSBsYXRlc3QgZGF0YXNldFxuICAgICAgICBjb25zdCB7IGRhdGFzZXQgfSA9IHRoaXMuc2VsZWN0aW9uU2VydmljZTtcblxuICAgICAgICAvLyBnZXQgdGhlIGluZGV4ZXMgb2YgdGhlIHN0YXJ0IGFuZCBlbmQgcG9pbnRcbiAgICAgICAgY29uc3Qgc3RhcnRJZHggPSBkYXRhc2V0LmluZGV4T2Yoc3RhcnQpO1xuICAgICAgICBjb25zdCBlbmRJZHggPSBkYXRhc2V0LmluZGV4T2YoZW5kKTtcblxuICAgICAgICAvLyBnZXQgdGhlIHJlZ2lvbiBvZiB0aGUgYXJyYXkgdGhhdCBpcyBzZWxlY3RlZCAtIG5vdGUgdGhlIGVuZElkeCBtYXkgYmUgYmVmb3JlIHRoZSBzdGFydElkeCBzbyBhY2NvdW50IGZvciB0aGlzXG4gICAgICAgIHJldHVybiBkYXRhc2V0LnNsaWNlKE1hdGgubWluKHN0YXJ0SWR4LCBlbmRJZHgpLCBNYXRoLm1heChzdGFydElkeCwgZW5kSWR4KSArIDEpO1xuICAgIH1cblxufSJdfQ==