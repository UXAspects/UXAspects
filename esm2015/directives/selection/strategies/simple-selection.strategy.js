/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { DOWN_ARROW, SPACE, UP_ARROW } from '@angular/cdk/keycodes';
import { SelectionStrategy } from './selection.strategy';
/**
 * @template T
 */
export class SimpleSelectionStrategy extends SelectionStrategy {
    /**
     * When the item is clicked simply toggle the current selected state
     * @param {?} _event
     * @param {?} data
     * @return {?}
     */
    click(_event, data) {
        this.toggle(data);
    }
    /**
     * Add basic keyboard support for navigating
     * and selecting/deselecting items
     * @param {?} event
     * @param {?} data
     * @return {?}
     */
    keydown(event, data) {
        switch (event.which) {
            case UP_ARROW:
                event.preventDefault();
                this.selectionService.activateSibling(true);
                return;
            case DOWN_ARROW:
                event.preventDefault();
                this.selectionService.activateSibling(false);
                return;
            case SPACE:
                event.preventDefault();
                return this.toggle(data);
        }
    }
    /**
     * Override the standard toggle function to always activate the item
     * @param {?} data
     * @return {?}
     */
    toggle(data) {
        super.toggle(data);
        this.selectionService.activate(data);
    }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxlLXNlbGVjdGlvbi5zdHJhdGVneS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL3NlbGVjdGlvbi9zdHJhdGVnaWVzL3NpbXBsZS1zZWxlY3Rpb24uc3RyYXRlZ3kudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3BFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDOzs7O0FBRXpELE1BQU0sOEJBQWtDLFNBQVEsaUJBQW9COzs7Ozs7O0lBS2xFLEtBQUssQ0FBQyxNQUFrQixFQUFFLElBQU87UUFDL0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUNuQjs7Ozs7Ozs7SUFNRCxPQUFPLENBQUMsS0FBb0IsRUFBRSxJQUFPO1FBRW5DLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBRXBCLEtBQUssUUFBUTtnQkFDWCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzVDLE1BQU0sQ0FBQztZQUVULEtBQUssVUFBVTtnQkFDYixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzdDLE1BQU0sQ0FBQztZQUVULEtBQUssS0FBSztnQkFDUixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ3ZCLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzVCO0tBQ0Y7Ozs7OztJQUtELE1BQU0sQ0FBQyxJQUFPO1FBQ1osS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3RDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBET1dOX0FSUk9XLCBTUEFDRSwgVVBfQVJST1cgfSBmcm9tICdAYW5ndWxhci9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHsgU2VsZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICcuL3NlbGVjdGlvbi5zdHJhdGVneSc7XG5cbmV4cG9ydCBjbGFzcyBTaW1wbGVTZWxlY3Rpb25TdHJhdGVneTxUPiBleHRlbmRzIFNlbGVjdGlvblN0cmF0ZWd5PFQ+IHtcblxuICAvKipcbiAgICogV2hlbiB0aGUgaXRlbSBpcyBjbGlja2VkIHNpbXBseSB0b2dnbGUgdGhlIGN1cnJlbnQgc2VsZWN0ZWQgc3RhdGVcbiAgICovXG4gIGNsaWNrKF9ldmVudDogTW91c2VFdmVudCwgZGF0YTogVCk6IHZvaWQge1xuICAgIHRoaXMudG9nZ2xlKGRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBiYXNpYyBrZXlib2FyZCBzdXBwb3J0IGZvciBuYXZpZ2F0aW5nXG4gICAqIGFuZCBzZWxlY3RpbmcvZGVzZWxlY3RpbmcgaXRlbXNcbiAgICovXG4gIGtleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQsIGRhdGE6IFQpOiB2b2lkIHtcblxuICAgIHN3aXRjaCAoZXZlbnQud2hpY2gpIHtcblxuICAgICAgY2FzZSBVUF9BUlJPVzpcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5zZWxlY3Rpb25TZXJ2aWNlLmFjdGl2YXRlU2libGluZyh0cnVlKTtcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgICBjYXNlIERPV05fQVJST1c6XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMuc2VsZWN0aW9uU2VydmljZS5hY3RpdmF0ZVNpYmxpbmcoZmFsc2UpO1xuICAgICAgICByZXR1cm47XG5cbiAgICAgIGNhc2UgU1BBQ0U6XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHJldHVybiB0aGlzLnRvZ2dsZShkYXRhKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogT3ZlcnJpZGUgdGhlIHN0YW5kYXJkIHRvZ2dsZSBmdW5jdGlvbiB0byBhbHdheXMgYWN0aXZhdGUgdGhlIGl0ZW1cbiAgICovXG4gIHRvZ2dsZShkYXRhOiBUKTogdm9pZCB7XG4gICAgc3VwZXIudG9nZ2xlKGRhdGEpO1xuICAgIHRoaXMuc2VsZWN0aW9uU2VydmljZS5hY3RpdmF0ZShkYXRhKTtcbiAgfVxufVxuIl19