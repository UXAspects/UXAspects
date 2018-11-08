/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { DOWN_ARROW, ENTER, SPACE, UP_ARROW } from '@angular/cdk/keycodes';
import { SelectionStrategy } from '../../directives/selection/strategies/selection.strategy';
/**
 * @template T
 */
export class SingleSelectListStrategy extends SelectionStrategy {
    /**
     * @param {?} _event
     * @param {?} data
     * @return {?}
     */
    click(_event, data) {
        if (!this.selectionService.isSelected(data)) {
            // deselect all other items
            this.deselectAll();
        }
        // activate the clicked item
        this.selectionService.activate(data);
        // toggle the selected state of the item
        this.toggle(data);
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
                this.selectionService.activateSibling(true);
                break;
            }
            case DOWN_ARROW: {
                event.preventDefault();
                this.selectionService.activateSibling(false);
                break;
            }
            case SPACE:
            case ENTER:
                event.preventDefault();
                this.click(null, data);
                break;
        }
    }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2luZ2xlLXNlbGVjdC1saXN0LnN0cmF0ZWd5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvc2VsZWN0LWxpc3Qvc2luZ2xlLXNlbGVjdC1saXN0LnN0cmF0ZWd5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDM0UsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sMERBQTBELENBQUM7Ozs7QUFFN0YsTUFBTSwrQkFBbUMsU0FBUSxpQkFBb0I7Ozs7OztJQUVqRSxLQUFLLENBQUMsTUFBa0IsRUFBRSxJQUFPO1FBRTdCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7O1lBRTFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUN0Qjs7UUFHRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDOztRQUdyQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3JCOzs7Ozs7SUFFRCxPQUFPLENBQUMsS0FBb0IsRUFBRSxJQUFPO1FBRWpDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBRWxCLEtBQUssUUFBUSxFQUFFLENBQUM7Z0JBQ1osS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUN2QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUM1QyxLQUFLLENBQUM7YUFDVDtZQUVELEtBQUssVUFBVSxFQUFFLENBQUM7Z0JBQ2QsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUN2QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUM3QyxLQUFLLENBQUM7YUFDVDtZQUVELEtBQUssS0FBSyxDQUFDO1lBQ1gsS0FBSyxLQUFLO2dCQUNOLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDdkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQ3ZCLEtBQUssQ0FBQztTQUNiO0tBQ0o7Q0FFSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERPV05fQVJST1csIEVOVEVSLCBTUEFDRSwgVVBfQVJST1cgfSBmcm9tICdAYW5ndWxhci9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHsgU2VsZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL3NlbGVjdGlvbi9zdHJhdGVnaWVzL3NlbGVjdGlvbi5zdHJhdGVneSc7XG5cbmV4cG9ydCBjbGFzcyBTaW5nbGVTZWxlY3RMaXN0U3RyYXRlZ3k8VD4gZXh0ZW5kcyBTZWxlY3Rpb25TdHJhdGVneTxUPiB7XG5cbiAgICBjbGljayhfZXZlbnQ6IE1vdXNlRXZlbnQsIGRhdGE6IFQpOiB2b2lkIHtcblxuICAgICAgICBpZiAoIXRoaXMuc2VsZWN0aW9uU2VydmljZS5pc1NlbGVjdGVkKGRhdGEpKSB7XG4gICAgICAgICAgICAvLyBkZXNlbGVjdCBhbGwgb3RoZXIgaXRlbXNcbiAgICAgICAgICAgIHRoaXMuZGVzZWxlY3RBbGwoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGFjdGl2YXRlIHRoZSBjbGlja2VkIGl0ZW1cbiAgICAgICAgdGhpcy5zZWxlY3Rpb25TZXJ2aWNlLmFjdGl2YXRlKGRhdGEpO1xuXG4gICAgICAgIC8vIHRvZ2dsZSB0aGUgc2VsZWN0ZWQgc3RhdGUgb2YgdGhlIGl0ZW1cbiAgICAgICAgdGhpcy50b2dnbGUoZGF0YSk7XG4gICAgfVxuXG4gICAga2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCwgZGF0YTogVCk6IHZvaWQge1xuXG4gICAgICAgIHN3aXRjaCAoZXZlbnQud2hpY2gpIHtcblxuICAgICAgICAgICAgY2FzZSBVUF9BUlJPVzoge1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25TZXJ2aWNlLmFjdGl2YXRlU2libGluZyh0cnVlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY2FzZSBET1dOX0FSUk9XOiB7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvblNlcnZpY2UuYWN0aXZhdGVTaWJsaW5nKGZhbHNlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY2FzZSBTUEFDRTpcbiAgICAgICAgICAgIGNhc2UgRU5URVI6XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNsaWNrKG51bGwsIGRhdGEpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG59Il19