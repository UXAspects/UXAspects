/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { DOWN_ARROW, SPACE, UP_ARROW } from '@angular/cdk/keycodes';
import { RowSelectionStrategy } from './row-selection.strategy';
/**
 * @template T
 */
var /**
 * @template T
 */
RowAltSelectionStrategy = /** @class */ (function (_super) {
    tslib_1.__extends(RowAltSelectionStrategy, _super);
    function RowAltSelectionStrategy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {?} event
     * @param {?} data
     * @return {?}
     */
    RowAltSelectionStrategy.prototype.keydown = /**
     * @param {?} event
     * @param {?} data
     * @return {?}
     */
    function (event, data) {
        switch (event.which) {
            case UP_ARROW:
            case DOWN_ARROW:
                event.preventDefault();
                this.handleCursorKey(event, data);
                break;
            case SPACE:
                event.preventDefault();
                this.selectionService.strategy.toggle(data);
                break;
        }
    };
    /**
     * Select the sibling item when arrow keys are pressed
     * @param {?} event
     * @param {?} data
     * @return {?}
     */
    RowAltSelectionStrategy.prototype.handleCursorKey = /**
     * Select the sibling item when arrow keys are pressed
     * @param {?} event
     * @param {?} data
     * @return {?}
     */
    function (event, data) {
        // determine which modifier keys are pressed
        var ctrlKey = event.ctrlKey, shiftKey = event.shiftKey;
        // if no modifier keys are pressed then deselect all and clear the selection
        if (!ctrlKey && !shiftKey) {
            this.deselectAll();
            this.clearSelection(false);
        }
        if (ctrlKey) {
            this.selectionService.activateSibling(event.which === UP_ARROW);
        }
        else {
            var /** @type {?} */ sibling = this.selectionService.getSibling(event.which === UP_ARROW);
            this.multipleSelect(sibling ? sibling : data);
        }
    };
    return RowAltSelectionStrategy;
}(RowSelectionStrategy));
/**
 * @template T
 */
export { RowAltSelectionStrategy };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93LWFsdC1zZWxlY3Rpb24uc3RyYXRlZ3kuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlcy9zZWxlY3Rpb24vc3RyYXRlZ2llcy9yb3ctYWx0LXNlbGVjdGlvbi5zdHJhdGVneS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3BFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDOzs7O0FBRWhFOzs7QUFBQTtJQUFnRCxtREFBdUI7Ozs7Ozs7OztJQUNuRSx5Q0FBTzs7Ozs7SUFBUCxVQUFRLEtBQW9CLEVBQUUsSUFBTztRQUNqQyxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNsQixLQUFLLFFBQVEsQ0FBQztZQUNkLEtBQUssVUFBVTtnQkFDWCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUNsQyxLQUFLLENBQUM7WUFFVixLQUFLLEtBQUs7Z0JBQ04sS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUN2QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDNUMsS0FBSyxDQUFDO1NBQ2I7S0FDSjs7Ozs7OztJQUtPLGlEQUFlOzs7Ozs7Y0FBQyxLQUFvQixFQUFFLElBQU87O1FBRXpDLElBQUEsdUJBQU8sRUFBRSx5QkFBUSxDQUFXOztRQUdwQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDeEIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ25CLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDOUI7UUFFRCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ1YsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsS0FBSyxLQUFLLFFBQVEsQ0FBQyxDQUFDO1NBQ25FO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixxQkFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxLQUFLLFFBQVEsQ0FBQyxDQUFDO1lBQzNFLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2pEOztrQ0FyQ1Q7RUFHZ0Qsb0JBQW9CLEVBb0NuRSxDQUFBOzs7O0FBcENELG1DQW9DQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERPV05fQVJST1csIFNQQUNFLCBVUF9BUlJPVyB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9rZXljb2Rlcyc7XHJcbmltcG9ydCB7IFJvd1NlbGVjdGlvblN0cmF0ZWd5IH0gZnJvbSAnLi9yb3ctc2VsZWN0aW9uLnN0cmF0ZWd5JztcclxuXHJcbmV4cG9ydCBjbGFzcyBSb3dBbHRTZWxlY3Rpb25TdHJhdGVneTxUPiBleHRlbmRzIFJvd1NlbGVjdGlvblN0cmF0ZWd5PFQ+IHtcclxuICAgIGtleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQsIGRhdGE6IFQpOiB2b2lkIHtcclxuICAgICAgICBzd2l0Y2ggKGV2ZW50LndoaWNoKSB7XHJcbiAgICAgICAgICAgIGNhc2UgVVBfQVJST1c6XHJcbiAgICAgICAgICAgIGNhc2UgRE9XTl9BUlJPVzpcclxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUN1cnNvcktleShldmVudCwgZGF0YSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGNhc2UgU1BBQ0U6XHJcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25TZXJ2aWNlLnN0cmF0ZWd5LnRvZ2dsZShkYXRhKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNlbGVjdCB0aGUgc2libGluZyBpdGVtIHdoZW4gYXJyb3cga2V5cyBhcmUgcHJlc3NlZFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGhhbmRsZUN1cnNvcktleShldmVudDogS2V5Ym9hcmRFdmVudCwgZGF0YTogVCk6IHZvaWQge1xyXG4gICAgICAgIC8vIGRldGVybWluZSB3aGljaCBtb2RpZmllciBrZXlzIGFyZSBwcmVzc2VkXHJcbiAgICAgICAgY29uc3QgeyBjdHJsS2V5LCBzaGlmdEtleSB9ID0gZXZlbnQ7XHJcblxyXG4gICAgICAgIC8vIGlmIG5vIG1vZGlmaWVyIGtleXMgYXJlIHByZXNzZWQgdGhlbiBkZXNlbGVjdCBhbGwgYW5kIGNsZWFyIHRoZSBzZWxlY3Rpb25cclxuICAgICAgICBpZiAoIWN0cmxLZXkgJiYgIXNoaWZ0S2V5KSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGVzZWxlY3RBbGwoKTtcclxuICAgICAgICAgICAgdGhpcy5jbGVhclNlbGVjdGlvbihmYWxzZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoY3RybEtleSkge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvblNlcnZpY2UuYWN0aXZhdGVTaWJsaW5nKGV2ZW50LndoaWNoID09PSBVUF9BUlJPVyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc3Qgc2libGluZyA9IHRoaXMuc2VsZWN0aW9uU2VydmljZS5nZXRTaWJsaW5nKGV2ZW50LndoaWNoID09PSBVUF9BUlJPVyk7XHJcbiAgICAgICAgICAgIHRoaXMubXVsdGlwbGVTZWxlY3Qoc2libGluZyA/IHNpYmxpbmcgOiBkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19