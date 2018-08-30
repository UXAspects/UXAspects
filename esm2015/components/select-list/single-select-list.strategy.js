/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { DOWN_ARROW, ENTER, SPACE, UP_ARROW } from '@angular/cdk/keycodes';
import { SelectionStrategy } from '../../directives/selection/strategies/selection.strategy';
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2luZ2xlLXNlbGVjdC1saXN0LnN0cmF0ZWd5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvc2VsZWN0LWxpc3Qvc2luZ2xlLXNlbGVjdC1saXN0LnN0cmF0ZWd5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDM0UsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sMERBQTBELENBQUM7QUFFN0YsTUFBTSwrQkFBZ0MsU0FBUSxpQkFBaUI7Ozs7OztJQUUzRCxLQUFLLENBQUMsTUFBa0IsRUFBRSxJQUFTO1FBRS9CLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7O1lBRTFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUN0Qjs7UUFHRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDOztRQUdyQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3JCOzs7Ozs7SUFFRCxPQUFPLENBQUMsS0FBb0IsRUFBRSxJQUFTO1FBRW5DLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBRWxCLEtBQUssUUFBUSxFQUFFLENBQUM7Z0JBQ1osS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUN2QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUM1QyxLQUFLLENBQUM7YUFDVDtZQUVELEtBQUssVUFBVSxFQUFFLENBQUM7Z0JBQ2QsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUN2QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUM3QyxLQUFLLENBQUM7YUFDVDtZQUVELEtBQUssS0FBSyxDQUFDO1lBQ1gsS0FBSyxLQUFLO2dCQUNOLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDdkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQ3ZCLEtBQUssQ0FBQztTQUNiO0tBQ0o7Q0FFSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERPV05fQVJST1csIEVOVEVSLCBTUEFDRSwgVVBfQVJST1cgfSBmcm9tICdAYW5ndWxhci9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHsgU2VsZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL3NlbGVjdGlvbi9zdHJhdGVnaWVzL3NlbGVjdGlvbi5zdHJhdGVneSc7XG5cbmV4cG9ydCBjbGFzcyBTaW5nbGVTZWxlY3RMaXN0U3RyYXRlZ3kgZXh0ZW5kcyBTZWxlY3Rpb25TdHJhdGVneSB7XG5cbiAgICBjbGljayhfZXZlbnQ6IE1vdXNlRXZlbnQsIGRhdGE6IGFueSk6IHZvaWQge1xuXG4gICAgICAgIGlmICghdGhpcy5zZWxlY3Rpb25TZXJ2aWNlLmlzU2VsZWN0ZWQoZGF0YSkpIHtcbiAgICAgICAgICAgIC8vIGRlc2VsZWN0IGFsbCBvdGhlciBpdGVtc1xuICAgICAgICAgICAgdGhpcy5kZXNlbGVjdEFsbCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gYWN0aXZhdGUgdGhlIGNsaWNrZWQgaXRlbVxuICAgICAgICB0aGlzLnNlbGVjdGlvblNlcnZpY2UuYWN0aXZhdGUoZGF0YSk7XG5cbiAgICAgICAgLy8gdG9nZ2xlIHRoZSBzZWxlY3RlZCBzdGF0ZSBvZiB0aGUgaXRlbVxuICAgICAgICB0aGlzLnRvZ2dsZShkYXRhKTtcbiAgICB9XG5cbiAgICBrZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50LCBkYXRhOiBhbnkpOiB2b2lkIHtcblxuICAgICAgICBzd2l0Y2ggKGV2ZW50LndoaWNoKSB7XG5cbiAgICAgICAgICAgIGNhc2UgVVBfQVJST1c6IHtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uU2VydmljZS5hY3RpdmF0ZVNpYmxpbmcodHJ1ZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNhc2UgRE9XTl9BUlJPVzoge1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25TZXJ2aWNlLmFjdGl2YXRlU2libGluZyhmYWxzZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNhc2UgU1BBQ0U6XG4gICAgICAgICAgICBjYXNlIEVOVEVSOlxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5jbGljayhudWxsLCBkYXRhKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxufSJdfQ==