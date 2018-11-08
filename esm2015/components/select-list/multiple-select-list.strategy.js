/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { DOWN_ARROW, ENTER, SPACE, UP_ARROW } from '@angular/cdk/keycodes';
import { SelectionStrategy } from '../../directives/selection/strategies/selection.strategy';
/**
 * @template T
 */
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
            this._lastSelection = data;
            return;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGlwbGUtc2VsZWN0LWxpc3Quc3RyYXRlZ3kuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9zZWxlY3QtbGlzdC9tdWx0aXBsZS1zZWxlY3QtbGlzdC5zdHJhdGVneS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzNFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDBEQUEwRCxDQUFDOzs7O0FBRTdGLE1BQU0saUNBQXFDLFNBQVEsaUJBQW9COzs7Ozs7SUFLbkUsU0FBUyxDQUFDLEtBQWlCO1FBQ3ZCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztLQUMxQjs7Ozs7O0lBRUQsS0FBSyxDQUFDLEtBQWlCLEVBQUUsSUFBTzs7UUFHNUIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7UUFHckMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDakIsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDcEM7O1FBR0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNwQixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztTQUM5QjtRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNsQixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztTQUM5QjtLQUNKOzs7Ozs7SUFFRCxPQUFPLENBQUMsS0FBb0IsRUFBRSxJQUFPO1FBRWpDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBRWxCLEtBQUssUUFBUSxFQUFFLENBQUM7Z0JBQ1osS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUN2Qix1QkFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFFNUQsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7b0JBQ2pCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO29CQUMzQixJQUFJLENBQUMsY0FBYyxHQUFHLE9BQU8sQ0FBQztpQkFDakM7Z0JBQ0QsS0FBSyxDQUFDO2FBQ1Q7WUFFRCxLQUFLLFVBQVUsRUFBRSxDQUFDO2dCQUNkLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDdkIsdUJBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBRTdELEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO29CQUNqQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztvQkFDM0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxPQUFPLENBQUM7aUJBQ2pDO2dCQUNELEtBQUssQ0FBQzthQUNUO1lBRUQsS0FBSyxLQUFLLENBQUM7WUFDWCxLQUFLLEtBQUs7Z0JBQ04sS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUN2QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNsQixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUMzRSxLQUFLLENBQUM7U0FDYjtLQUNKOzs7OztJQUVELGNBQWMsQ0FBQyxJQUFPOztRQUdsQixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbEIsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7WUFDM0IsTUFBTSxDQUFDO1NBQ1Y7O1FBR0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7O1FBR2pFLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO0tBQzlCOzs7Ozs7SUFFTyxnQkFBZ0IsQ0FBQyxLQUFRLEVBQUUsR0FBTTs7UUFHckMsTUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQzs7UUFHMUMsdUJBQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDeEMsdUJBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7O1FBR3BDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDOztDQUd4RiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERPV05fQVJST1csIEVOVEVSLCBTUEFDRSwgVVBfQVJST1cgfSBmcm9tICdAYW5ndWxhci9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHsgU2VsZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL3NlbGVjdGlvbi9zdHJhdGVnaWVzL3NlbGVjdGlvbi5zdHJhdGVneSc7XG5cbmV4cG9ydCBjbGFzcyBNdWx0aXBsZVNlbGVjdExpc3RTdHJhdGVneTxUPiBleHRlbmRzIFNlbGVjdGlvblN0cmF0ZWd5PFQ+IHtcblxuICAgIHByaXZhdGUgX2xhc3RTZWxlY3Rpb246IFQ7XG5cbiAgICAvKiogUHJldmVudCB0aGUgYnJvd3NlciBmcm9tIGhpZ2hsaWdodGluZyB0ZXh0IG9uIHNoaWZ0IGNsaWNrICovXG4gICAgbW91c2Vkb3duKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgY2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQsIGRhdGE6IFQpOiB2b2lkIHtcblxuICAgICAgICAvLyBhY3RpdmF0ZSB0aGUgY2xpY2tlZCBpdGVtXG4gICAgICAgIHRoaXMuc2VsZWN0aW9uU2VydmljZS5hY3RpdmF0ZShkYXRhKTtcblxuICAgICAgICAvLyBpZiB0aGUgc2hpZnQga2V5IGlzIHByZXNzZWQgd2Ugd2FudCB0byBwZXJmb3JtIGEgbXVsdGlwbGUgc2VsZWN0aW9uXG4gICAgICAgIGlmIChldmVudC5zaGlmdEtleSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubXVsdGlwbGVTZWxlY3QoZGF0YSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBvdGhlcndpc2UgcGVyZm9ybSBhIHNpbmdsZSB0b2dnbGUgc2VsZWN0aW9uXG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGlvblNlcnZpY2UuaXNTZWxlY3RlZChkYXRhKSkge1xuICAgICAgICAgICAgdGhpcy5kZXNlbGVjdChkYXRhKTtcbiAgICAgICAgICAgIHRoaXMuX2xhc3RTZWxlY3Rpb24gPSBudWxsO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3QoZGF0YSk7XG4gICAgICAgICAgICB0aGlzLl9sYXN0U2VsZWN0aW9uID0gZGF0YTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGtleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQsIGRhdGE6IFQpOiB2b2lkIHtcblxuICAgICAgICBzd2l0Y2ggKGV2ZW50LndoaWNoKSB7XG5cbiAgICAgICAgICAgIGNhc2UgVVBfQVJST1c6IHtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHNpYmxpbmcgPSB0aGlzLnNlbGVjdGlvblNlcnZpY2UuYWN0aXZhdGVTaWJsaW5nKHRydWUpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LnNoaWZ0S2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0KGRhdGEsIHNpYmxpbmcpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sYXN0U2VsZWN0aW9uID0gc2libGluZztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNhc2UgRE9XTl9BUlJPVzoge1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2libGluZyA9IHRoaXMuc2VsZWN0aW9uU2VydmljZS5hY3RpdmF0ZVNpYmxpbmcoZmFsc2UpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LnNoaWZ0S2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0KGRhdGEsIHNpYmxpbmcpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sYXN0U2VsZWN0aW9uID0gc2libGluZztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNhc2UgU1BBQ0U6XG4gICAgICAgICAgICBjYXNlIEVOVEVSOlxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy50b2dnbGUoZGF0YSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fbGFzdFNlbGVjdGlvbiA9IHRoaXMuc2VsZWN0aW9uU2VydmljZS5pc1NlbGVjdGVkKGRhdGEpID8gZGF0YSA6IG51bGw7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBtdWx0aXBsZVNlbGVjdChkYXRhOiBUKTogdm9pZCB7XG5cbiAgICAgICAgLy8gaWYgdGhlcmUgaXMgbm8gc3RhcnQgaXRlbSBzZWxlY3RlZFxuICAgICAgICBpZiAoIXRoaXMuX2xhc3RTZWxlY3Rpb24pIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0KGRhdGEpO1xuICAgICAgICAgICAgdGhpcy5fbGFzdFNlbGVjdGlvbiA9IGRhdGE7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiB0aGVyZSBhbHJlYWR5IGlzIGEgc3RhcnQgaXRlbSB0aGVuIGZpbmQgdGhlIGl0ZW1zIGluIHRoZSByYW5nZVxuICAgICAgICB0aGlzLnNlbGVjdCguLi50aGlzLmdldFNlbGVjdGVkSXRlbXModGhpcy5fbGFzdFNlbGVjdGlvbiwgZGF0YSkpO1xuXG4gICAgICAgIC8vIHN0b3JlIHRoZSBzZWxlY3Rpb24gZW5kIHBvaW50XG4gICAgICAgIHRoaXMuX2xhc3RTZWxlY3Rpb24gPSBkYXRhO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0U2VsZWN0ZWRJdGVtcyhzdGFydDogVCwgZW5kOiBUKTogVFtdIHtcblxuICAgICAgICAvLyBnZXQgdGhlIGxhdGVzdCBkYXRhc2V0XG4gICAgICAgIGNvbnN0IHsgZGF0YXNldCB9ID0gdGhpcy5zZWxlY3Rpb25TZXJ2aWNlO1xuXG4gICAgICAgIC8vIGdldCB0aGUgaW5kZXhlcyBvZiB0aGUgc3RhcnQgYW5kIGVuZCBwb2ludFxuICAgICAgICBjb25zdCBzdGFydElkeCA9IGRhdGFzZXQuaW5kZXhPZihzdGFydCk7XG4gICAgICAgIGNvbnN0IGVuZElkeCA9IGRhdGFzZXQuaW5kZXhPZihlbmQpO1xuXG4gICAgICAgIC8vIGdldCB0aGUgcmVnaW9uIG9mIHRoZSBhcnJheSB0aGF0IGlzIHNlbGVjdGVkIC0gbm90ZSB0aGUgZW5kSWR4IG1heSBiZSBiZWZvcmUgdGhlIHN0YXJ0SWR4IHNvIGFjY291bnQgZm9yIHRoaXNcbiAgICAgICAgcmV0dXJuIGRhdGFzZXQuc2xpY2UoTWF0aC5taW4oc3RhcnRJZHgsIGVuZElkeCksIE1hdGgubWF4KHN0YXJ0SWR4LCBlbmRJZHgpICsgMSk7XG4gICAgfVxuXG59Il19