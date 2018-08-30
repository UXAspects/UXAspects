/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { DOWN_ARROW, ENTER, SPACE, UP_ARROW } from '@angular/cdk/keycodes';
import { SelectionStrategy } from '../../directives/selection/strategies/selection.strategy';
var SingleSelectListStrategy = /** @class */ (function (_super) {
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
export { SingleSelectListStrategy };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2luZ2xlLXNlbGVjdC1saXN0LnN0cmF0ZWd5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvc2VsZWN0LWxpc3Qvc2luZ2xlLXNlbGVjdC1saXN0LnN0cmF0ZWd5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzNFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDBEQUEwRCxDQUFDO0FBRTdGLElBQUE7SUFBOEMsb0RBQWlCOzs7Ozs7Ozs7SUFFM0Qsd0NBQUs7Ozs7O0lBQUwsVUFBTSxNQUFrQixFQUFFLElBQVM7UUFFL0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzs7WUFFMUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3RCOztRQUdELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7O1FBR3JDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDckI7Ozs7OztJQUVELDBDQUFPOzs7OztJQUFQLFVBQVEsS0FBb0IsRUFBRSxJQUFTO1FBRW5DLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBRWxCLEtBQUssUUFBUSxFQUFFLENBQUM7Z0JBQ1osS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUN2QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUM1QyxLQUFLLENBQUM7YUFDVDtZQUVELEtBQUssVUFBVSxFQUFFLENBQUM7Z0JBQ2QsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUN2QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUM3QyxLQUFLLENBQUM7YUFDVDtZQUVELEtBQUssS0FBSyxDQUFDO1lBQ1gsS0FBSyxLQUFLO2dCQUNOLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDdkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQ3ZCLEtBQUssQ0FBQztTQUNiO0tBQ0o7bUNBekNMO0VBRzhDLGlCQUFpQixFQXdDOUQsQ0FBQTtBQXhDRCxvQ0F3Q0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBET1dOX0FSUk9XLCBFTlRFUiwgU1BBQ0UsIFVQX0FSUk9XIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7IFNlbGVjdGlvblN0cmF0ZWd5IH0gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9zZWxlY3Rpb24vc3RyYXRlZ2llcy9zZWxlY3Rpb24uc3RyYXRlZ3knO1xuXG5leHBvcnQgY2xhc3MgU2luZ2xlU2VsZWN0TGlzdFN0cmF0ZWd5IGV4dGVuZHMgU2VsZWN0aW9uU3RyYXRlZ3kge1xuXG4gICAgY2xpY2soX2V2ZW50OiBNb3VzZUV2ZW50LCBkYXRhOiBhbnkpOiB2b2lkIHtcblxuICAgICAgICBpZiAoIXRoaXMuc2VsZWN0aW9uU2VydmljZS5pc1NlbGVjdGVkKGRhdGEpKSB7XG4gICAgICAgICAgICAvLyBkZXNlbGVjdCBhbGwgb3RoZXIgaXRlbXNcbiAgICAgICAgICAgIHRoaXMuZGVzZWxlY3RBbGwoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGFjdGl2YXRlIHRoZSBjbGlja2VkIGl0ZW1cbiAgICAgICAgdGhpcy5zZWxlY3Rpb25TZXJ2aWNlLmFjdGl2YXRlKGRhdGEpO1xuXG4gICAgICAgIC8vIHRvZ2dsZSB0aGUgc2VsZWN0ZWQgc3RhdGUgb2YgdGhlIGl0ZW1cbiAgICAgICAgdGhpcy50b2dnbGUoZGF0YSk7XG4gICAgfVxuXG4gICAga2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCwgZGF0YTogYW55KTogdm9pZCB7XG5cbiAgICAgICAgc3dpdGNoIChldmVudC53aGljaCkge1xuXG4gICAgICAgICAgICBjYXNlIFVQX0FSUk9XOiB7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvblNlcnZpY2UuYWN0aXZhdGVTaWJsaW5nKHRydWUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjYXNlIERPV05fQVJST1c6IHtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uU2VydmljZS5hY3RpdmF0ZVNpYmxpbmcoZmFsc2UpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjYXNlIFNQQUNFOlxuICAgICAgICAgICAgY2FzZSBFTlRFUjpcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuY2xpY2sobnVsbCwgZGF0YSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbn0iXX0=