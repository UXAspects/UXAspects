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
SingleSelectListStrategy = /** @class */ (function (_super) {
    tslib_1.__extends(SingleSelectListStrategy, _super);
    function SingleSelectListStrategy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {?} _event
     * @param {?} data
     * @return {?}
     */
    SingleSelectListStrategy.prototype.click = /**
     * @param {?} _event
     * @param {?} data
     * @return {?}
     */
    function (_event, data) {
        if (!this.selectionService.isSelected(data)) {
            // deselect all other items
            this.deselectAll();
        }
        // activate the clicked item
        this.selectionService.activate(data);
        // toggle the selected state of the item
        this.toggle(data);
    };
    /**
     * @param {?} event
     * @param {?} data
     * @return {?}
     */
    SingleSelectListStrategy.prototype.keydown = /**
     * @param {?} event
     * @param {?} data
     * @return {?}
     */
    function (event, data) {
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
    };
    return SingleSelectListStrategy;
}(SelectionStrategy));
/**
 * @template T
 */
export { SingleSelectListStrategy };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2luZ2xlLXNlbGVjdC1saXN0LnN0cmF0ZWd5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvc2VsZWN0LWxpc3Qvc2luZ2xlLXNlbGVjdC1saXN0LnN0cmF0ZWd5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzNFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDBEQUEwRCxDQUFDOzs7O0FBRTdGOzs7QUFBQTtJQUFpRCxvREFBb0I7Ozs7Ozs7OztJQUVqRSx3Q0FBSzs7Ozs7SUFBTCxVQUFNLE1BQWtCLEVBQUUsSUFBTztRQUU3QixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDOztZQUUxQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDdEI7O1FBR0QsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7UUFHckMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUNyQjs7Ozs7O0lBRUQsMENBQU87Ozs7O0lBQVAsVUFBUSxLQUFvQixFQUFFLElBQU87UUFFakMsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFFbEIsS0FBSyxRQUFRLEVBQUUsQ0FBQztnQkFDWixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzVDLEtBQUssQ0FBQzthQUNUO1lBRUQsS0FBSyxVQUFVLEVBQUUsQ0FBQztnQkFDZCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzdDLEtBQUssQ0FBQzthQUNUO1lBRUQsS0FBSyxLQUFLLENBQUM7WUFDWCxLQUFLLEtBQUs7Z0JBQ04sS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUN2QixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDdkIsS0FBSyxDQUFDO1NBQ2I7S0FDSjttQ0F6Q0w7RUFHaUQsaUJBQWlCLEVBd0NqRSxDQUFBOzs7O0FBeENELG9DQXdDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERPV05fQVJST1csIEVOVEVSLCBTUEFDRSwgVVBfQVJST1cgfSBmcm9tICdAYW5ndWxhci9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHsgU2VsZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL3NlbGVjdGlvbi9zdHJhdGVnaWVzL3NlbGVjdGlvbi5zdHJhdGVneSc7XG5cbmV4cG9ydCBjbGFzcyBTaW5nbGVTZWxlY3RMaXN0U3RyYXRlZ3k8VD4gZXh0ZW5kcyBTZWxlY3Rpb25TdHJhdGVneTxUPiB7XG5cbiAgICBjbGljayhfZXZlbnQ6IE1vdXNlRXZlbnQsIGRhdGE6IFQpOiB2b2lkIHtcblxuICAgICAgICBpZiAoIXRoaXMuc2VsZWN0aW9uU2VydmljZS5pc1NlbGVjdGVkKGRhdGEpKSB7XG4gICAgICAgICAgICAvLyBkZXNlbGVjdCBhbGwgb3RoZXIgaXRlbXNcbiAgICAgICAgICAgIHRoaXMuZGVzZWxlY3RBbGwoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGFjdGl2YXRlIHRoZSBjbGlja2VkIGl0ZW1cbiAgICAgICAgdGhpcy5zZWxlY3Rpb25TZXJ2aWNlLmFjdGl2YXRlKGRhdGEpO1xuXG4gICAgICAgIC8vIHRvZ2dsZSB0aGUgc2VsZWN0ZWQgc3RhdGUgb2YgdGhlIGl0ZW1cbiAgICAgICAgdGhpcy50b2dnbGUoZGF0YSk7XG4gICAgfVxuXG4gICAga2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCwgZGF0YTogVCk6IHZvaWQge1xuXG4gICAgICAgIHN3aXRjaCAoZXZlbnQud2hpY2gpIHtcblxuICAgICAgICAgICAgY2FzZSBVUF9BUlJPVzoge1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25TZXJ2aWNlLmFjdGl2YXRlU2libGluZyh0cnVlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY2FzZSBET1dOX0FSUk9XOiB7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvblNlcnZpY2UuYWN0aXZhdGVTaWJsaW5nKGZhbHNlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY2FzZSBTUEFDRTpcbiAgICAgICAgICAgIGNhc2UgRU5URVI6XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNsaWNrKG51bGwsIGRhdGEpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG59Il19