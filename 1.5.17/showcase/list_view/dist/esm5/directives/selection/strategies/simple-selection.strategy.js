/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { KeyCode } from './keycode.enum';
import { SelectionStrategy } from './selection.strategy';
var SimpleSelectionStrategy = (function (_super) {
    tslib_1.__extends(SimpleSelectionStrategy, _super);
    function SimpleSelectionStrategy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * When the item is clicked simply toggle the current selected state
     */
    /**
     * When the item is clicked simply toggle the current selected state
     * @param {?} event
     * @param {?} data
     * @return {?}
     */
    SimpleSelectionStrategy.prototype.click = /**
     * When the item is clicked simply toggle the current selected state
     * @param {?} event
     * @param {?} data
     * @return {?}
     */
    function (event, data) {
        this.toggle(data);
    };
    /**
     * Add basic keyboard support for navigating
     * and selecting/deselecting items
     */
    /**
     * Add basic keyboard support for navigating
     * and selecting/deselecting items
     * @param {?} event
     * @param {?} data
     * @return {?}
     */
    SimpleSelectionStrategy.prototype.keydown = /**
     * Add basic keyboard support for navigating
     * and selecting/deselecting items
     * @param {?} event
     * @param {?} data
     * @return {?}
     */
    function (event, data) {
        switch (event.keyCode) {
            case KeyCode.UpArrow:
                event.preventDefault();
                return this.selectionService.activateSibling(true);
            case KeyCode.DownArrow:
                event.preventDefault();
                return this.selectionService.activateSibling(false);
            case KeyCode.Spacebar:
                event.preventDefault();
                return this.toggle(data);
        }
    };
    /**
     * Override the standard toggle function to always activate the item
     */
    /**
     * Override the standard toggle function to always activate the item
     * @param {?} data
     * @return {?}
     */
    SimpleSelectionStrategy.prototype.toggle = /**
     * Override the standard toggle function to always activate the item
     * @param {?} data
     * @return {?}
     */
    function (data) {
        _super.prototype.toggle.call(this, data);
        this.selectionService.activate(data);
    };
    return SimpleSelectionStrategy;
}(SelectionStrategy));
export { SimpleSelectionStrategy };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxlLXNlbGVjdGlvbi5zdHJhdGVneS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL3NlbGVjdGlvbi9zdHJhdGVnaWVzL3NpbXBsZS1zZWxlY3Rpb24uc3RyYXRlZ3kudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFekQsSUFBQTtJQUE2QyxtREFBaUI7Ozs7SUFFNUQ7O09BRUc7Ozs7Ozs7SUFDSCx1Q0FBSzs7Ozs7O0lBQUwsVUFBTSxLQUFpQixFQUFFLElBQVM7UUFDaEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUNuQjtJQUVEOzs7T0FHRzs7Ozs7Ozs7SUFDSCx5Q0FBTzs7Ozs7OztJQUFQLFVBQVEsS0FBb0IsRUFBRSxJQUFTO1FBRXJDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBRXRCLEtBQUssT0FBTyxDQUFDLE9BQU87Z0JBQ2xCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDdkIsTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFckQsS0FBSyxPQUFPLENBQUMsU0FBUztnQkFDcEIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUN2QixNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUV0RCxLQUFLLE9BQU8sQ0FBQyxRQUFRO2dCQUNuQixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ3ZCLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzVCO0tBQ0Y7SUFFRDs7T0FFRzs7Ozs7O0lBQ0gsd0NBQU07Ozs7O0lBQU4sVUFBTyxJQUFTO1FBQ2QsaUJBQU0sTUFBTSxZQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25CLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDdEM7a0NBeENIO0VBRzZDLGlCQUFpQixFQXNDN0QsQ0FBQTtBQXRDRCxtQ0FzQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBLZXlDb2RlIH0gZnJvbSAnLi9rZXljb2RlLmVudW0nO1xuaW1wb3J0IHsgU2VsZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICcuL3NlbGVjdGlvbi5zdHJhdGVneSc7XG5cbmV4cG9ydCBjbGFzcyBTaW1wbGVTZWxlY3Rpb25TdHJhdGVneSBleHRlbmRzIFNlbGVjdGlvblN0cmF0ZWd5IHtcblxuICAvKipcbiAgICogV2hlbiB0aGUgaXRlbSBpcyBjbGlja2VkIHNpbXBseSB0b2dnbGUgdGhlIGN1cnJlbnQgc2VsZWN0ZWQgc3RhdGVcbiAgICovXG4gIGNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50LCBkYXRhOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLnRvZ2dsZShkYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgYmFzaWMga2V5Ym9hcmQgc3VwcG9ydCBmb3IgbmF2aWdhdGluZ1xuICAgKiBhbmQgc2VsZWN0aW5nL2Rlc2VsZWN0aW5nIGl0ZW1zXG4gICAqL1xuICBrZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50LCBkYXRhOiBhbnkpOiB2b2lkIHtcblxuICAgIHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xuXG4gICAgICBjYXNlIEtleUNvZGUuVXBBcnJvdzpcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0aW9uU2VydmljZS5hY3RpdmF0ZVNpYmxpbmcodHJ1ZSk7XG5cbiAgICAgIGNhc2UgS2V5Q29kZS5Eb3duQXJyb3c6XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGlvblNlcnZpY2UuYWN0aXZhdGVTaWJsaW5nKGZhbHNlKTtcblxuICAgICAgY2FzZSBLZXlDb2RlLlNwYWNlYmFyOlxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICByZXR1cm4gdGhpcy50b2dnbGUoZGF0YSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE92ZXJyaWRlIHRoZSBzdGFuZGFyZCB0b2dnbGUgZnVuY3Rpb24gdG8gYWx3YXlzIGFjdGl2YXRlIHRoZSBpdGVtXG4gICAqL1xuICB0b2dnbGUoZGF0YTogYW55KTogdm9pZCB7XG4gICAgc3VwZXIudG9nZ2xlKGRhdGEpO1xuICAgIHRoaXMuc2VsZWN0aW9uU2VydmljZS5hY3RpdmF0ZShkYXRhKTtcbiAgfVxufVxuIl19