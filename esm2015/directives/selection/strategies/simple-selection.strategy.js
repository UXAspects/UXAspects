/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { DOWN_ARROW, SPACE, UP_ARROW } from '@angular/cdk/keycodes';
import { SelectionStrategy } from './selection.strategy';
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
                return this.selectionService.activateSibling(true);
            case DOWN_ARROW:
                event.preventDefault();
                return this.selectionService.activateSibling(false);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxlLXNlbGVjdGlvbi5zdHJhdGVneS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL3NlbGVjdGlvbi9zdHJhdGVnaWVzL3NpbXBsZS1zZWxlY3Rpb24uc3RyYXRlZ3kudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3BFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRXpELE1BQU0sOEJBQStCLFNBQVEsaUJBQWlCOzs7Ozs7O0lBSzVELEtBQUssQ0FBQyxNQUFrQixFQUFFLElBQVM7UUFDakMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUNuQjs7Ozs7Ozs7SUFNRCxPQUFPLENBQUMsS0FBb0IsRUFBRSxJQUFTO1FBRXJDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBRXBCLEtBQUssUUFBUTtnQkFDWCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ3ZCLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRXJELEtBQUssVUFBVTtnQkFDYixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ3ZCLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRXRELEtBQUssS0FBSztnQkFDUixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ3ZCLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzVCO0tBQ0Y7Ozs7OztJQUtELE1BQU0sQ0FBQyxJQUFTO1FBQ2QsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3RDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBET1dOX0FSUk9XLCBTUEFDRSwgVVBfQVJST1cgfSBmcm9tICdAYW5ndWxhci9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHsgU2VsZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICcuL3NlbGVjdGlvbi5zdHJhdGVneSc7XG5cbmV4cG9ydCBjbGFzcyBTaW1wbGVTZWxlY3Rpb25TdHJhdGVneSBleHRlbmRzIFNlbGVjdGlvblN0cmF0ZWd5IHtcblxuICAvKipcbiAgICogV2hlbiB0aGUgaXRlbSBpcyBjbGlja2VkIHNpbXBseSB0b2dnbGUgdGhlIGN1cnJlbnQgc2VsZWN0ZWQgc3RhdGVcbiAgICovXG4gIGNsaWNrKF9ldmVudDogTW91c2VFdmVudCwgZGF0YTogYW55KTogdm9pZCB7XG4gICAgdGhpcy50b2dnbGUoZGF0YSk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGJhc2ljIGtleWJvYXJkIHN1cHBvcnQgZm9yIG5hdmlnYXRpbmdcbiAgICogYW5kIHNlbGVjdGluZy9kZXNlbGVjdGluZyBpdGVtc1xuICAgKi9cbiAga2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCwgZGF0YTogYW55KTogdm9pZCB7XG5cbiAgICBzd2l0Y2ggKGV2ZW50LndoaWNoKSB7XG5cbiAgICAgIGNhc2UgVVBfQVJST1c6XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGlvblNlcnZpY2UuYWN0aXZhdGVTaWJsaW5nKHRydWUpO1xuXG4gICAgICBjYXNlIERPV05fQVJST1c6XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGlvblNlcnZpY2UuYWN0aXZhdGVTaWJsaW5nKGZhbHNlKTtcblxuICAgICAgY2FzZSBTUEFDRTpcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMudG9nZ2xlKGRhdGEpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBPdmVycmlkZSB0aGUgc3RhbmRhcmQgdG9nZ2xlIGZ1bmN0aW9uIHRvIGFsd2F5cyBhY3RpdmF0ZSB0aGUgaXRlbVxuICAgKi9cbiAgdG9nZ2xlKGRhdGE6IGFueSk6IHZvaWQge1xuICAgIHN1cGVyLnRvZ2dsZShkYXRhKTtcbiAgICB0aGlzLnNlbGVjdGlvblNlcnZpY2UuYWN0aXZhdGUoZGF0YSk7XG4gIH1cbn1cbiJdfQ==