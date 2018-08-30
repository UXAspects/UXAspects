/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { DOWN_ARROW, SPACE, UP_ARROW } from '@angular/cdk/keycodes';
import { SelectionStrategy } from './selection.strategy';
var SimpleSelectionStrategy = /** @class */ (function (_super) {
    tslib_1.__extends(SimpleSelectionStrategy, _super);
    function SimpleSelectionStrategy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * When the item is clicked simply toggle the current selected state
     */
    /**
     * When the item is clicked simply toggle the current selected state
     * @param {?} _event
     * @param {?} data
     * @return {?}
     */
    SimpleSelectionStrategy.prototype.click = /**
     * When the item is clicked simply toggle the current selected state
     * @param {?} _event
     * @param {?} data
     * @return {?}
     */
    function (_event, data) {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxlLXNlbGVjdGlvbi5zdHJhdGVneS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL3NlbGVjdGlvbi9zdHJhdGVnaWVzL3NpbXBsZS1zZWxlY3Rpb24uc3RyYXRlZ3kudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNwRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUV6RCxJQUFBO0lBQTZDLG1EQUFpQjs7OztJQUU1RDs7T0FFRzs7Ozs7OztJQUNILHVDQUFLOzs7Ozs7SUFBTCxVQUFNLE1BQWtCLEVBQUUsSUFBUztRQUNqQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ25CO0lBRUQ7OztPQUdHOzs7Ozs7OztJQUNILHlDQUFPOzs7Ozs7O0lBQVAsVUFBUSxLQUFvQixFQUFFLElBQVM7UUFFckMsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFFcEIsS0FBSyxRQUFRO2dCQUNYLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDdkIsTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFckQsS0FBSyxVQUFVO2dCQUNiLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDdkIsTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFdEQsS0FBSyxLQUFLO2dCQUNSLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDdkIsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDNUI7S0FDRjtJQUVEOztPQUVHOzs7Ozs7SUFDSCx3Q0FBTTs7Ozs7SUFBTixVQUFPLElBQVM7UUFDZCxpQkFBTSxNQUFNLFlBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUN0QztrQ0F4Q0g7RUFHNkMsaUJBQWlCLEVBc0M3RCxDQUFBO0FBdENELG1DQXNDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERPV05fQVJST1csIFNQQUNFLCBVUF9BUlJPVyB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQgeyBTZWxlY3Rpb25TdHJhdGVneSB9IGZyb20gJy4vc2VsZWN0aW9uLnN0cmF0ZWd5JztcblxuZXhwb3J0IGNsYXNzIFNpbXBsZVNlbGVjdGlvblN0cmF0ZWd5IGV4dGVuZHMgU2VsZWN0aW9uU3RyYXRlZ3kge1xuXG4gIC8qKlxuICAgKiBXaGVuIHRoZSBpdGVtIGlzIGNsaWNrZWQgc2ltcGx5IHRvZ2dsZSB0aGUgY3VycmVudCBzZWxlY3RlZCBzdGF0ZVxuICAgKi9cbiAgY2xpY2soX2V2ZW50OiBNb3VzZUV2ZW50LCBkYXRhOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLnRvZ2dsZShkYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgYmFzaWMga2V5Ym9hcmQgc3VwcG9ydCBmb3IgbmF2aWdhdGluZ1xuICAgKiBhbmQgc2VsZWN0aW5nL2Rlc2VsZWN0aW5nIGl0ZW1zXG4gICAqL1xuICBrZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50LCBkYXRhOiBhbnkpOiB2b2lkIHtcblxuICAgIHN3aXRjaCAoZXZlbnQud2hpY2gpIHtcblxuICAgICAgY2FzZSBVUF9BUlJPVzpcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0aW9uU2VydmljZS5hY3RpdmF0ZVNpYmxpbmcodHJ1ZSk7XG5cbiAgICAgIGNhc2UgRE9XTl9BUlJPVzpcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0aW9uU2VydmljZS5hY3RpdmF0ZVNpYmxpbmcoZmFsc2UpO1xuXG4gICAgICBjYXNlIFNQQUNFOlxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICByZXR1cm4gdGhpcy50b2dnbGUoZGF0YSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE92ZXJyaWRlIHRoZSBzdGFuZGFyZCB0b2dnbGUgZnVuY3Rpb24gdG8gYWx3YXlzIGFjdGl2YXRlIHRoZSBpdGVtXG4gICAqL1xuICB0b2dnbGUoZGF0YTogYW55KTogdm9pZCB7XG4gICAgc3VwZXIudG9nZ2xlKGRhdGEpO1xuICAgIHRoaXMuc2VsZWN0aW9uU2VydmljZS5hY3RpdmF0ZShkYXRhKTtcbiAgfVxufVxuIl19