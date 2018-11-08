/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { DOWN_ARROW, SPACE, UP_ARROW } from '@angular/cdk/keycodes';
import { SelectionStrategy } from './selection.strategy';
/**
 * @template T
 */
var /**
 * @template T
 */
SimpleSelectionStrategy = /** @class */ (function (_super) {
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
/**
 * @template T
 */
export { SimpleSelectionStrategy };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxlLXNlbGVjdGlvbi5zdHJhdGVneS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL3NlbGVjdGlvbi9zdHJhdGVnaWVzL3NpbXBsZS1zZWxlY3Rpb24uc3RyYXRlZ3kudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNwRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7OztBQUV6RDs7O0FBQUE7SUFBZ0QsbURBQW9COzs7O0lBRWxFOztPQUVHOzs7Ozs7O0lBQ0gsdUNBQUs7Ozs7OztJQUFMLFVBQU0sTUFBa0IsRUFBRSxJQUFPO1FBQy9CLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDbkI7SUFFRDs7O09BR0c7Ozs7Ozs7O0lBQ0gseUNBQU87Ozs7Ozs7SUFBUCxVQUFRLEtBQW9CLEVBQUUsSUFBTztRQUVuQyxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUVwQixLQUFLLFFBQVE7Z0JBQ1gsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUN2QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUM1QyxNQUFNLENBQUM7WUFFVCxLQUFLLFVBQVU7Z0JBQ2IsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUN2QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUM3QyxNQUFNLENBQUM7WUFFVCxLQUFLLEtBQUs7Z0JBQ1IsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUN2QixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUM1QjtLQUNGO0lBRUQ7O09BRUc7Ozs7OztJQUNILHdDQUFNOzs7OztJQUFOLFVBQU8sSUFBTztRQUNaLGlCQUFNLE1BQU0sWUFBQyxJQUFJLENBQUMsQ0FBQztRQUNuQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3RDO2tDQTFDSDtFQUdnRCxpQkFBaUIsRUF3Q2hFLENBQUE7Ozs7QUF4Q0QsbUNBd0NDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRE9XTl9BUlJPVywgU1BBQ0UsIFVQX0FSUk9XIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7IFNlbGVjdGlvblN0cmF0ZWd5IH0gZnJvbSAnLi9zZWxlY3Rpb24uc3RyYXRlZ3knO1xuXG5leHBvcnQgY2xhc3MgU2ltcGxlU2VsZWN0aW9uU3RyYXRlZ3k8VD4gZXh0ZW5kcyBTZWxlY3Rpb25TdHJhdGVneTxUPiB7XG5cbiAgLyoqXG4gICAqIFdoZW4gdGhlIGl0ZW0gaXMgY2xpY2tlZCBzaW1wbHkgdG9nZ2xlIHRoZSBjdXJyZW50IHNlbGVjdGVkIHN0YXRlXG4gICAqL1xuICBjbGljayhfZXZlbnQ6IE1vdXNlRXZlbnQsIGRhdGE6IFQpOiB2b2lkIHtcbiAgICB0aGlzLnRvZ2dsZShkYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgYmFzaWMga2V5Ym9hcmQgc3VwcG9ydCBmb3IgbmF2aWdhdGluZ1xuICAgKiBhbmQgc2VsZWN0aW5nL2Rlc2VsZWN0aW5nIGl0ZW1zXG4gICAqL1xuICBrZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50LCBkYXRhOiBUKTogdm9pZCB7XG5cbiAgICBzd2l0Y2ggKGV2ZW50LndoaWNoKSB7XG5cbiAgICAgIGNhc2UgVVBfQVJST1c6XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMuc2VsZWN0aW9uU2VydmljZS5hY3RpdmF0ZVNpYmxpbmcodHJ1ZSk7XG4gICAgICAgIHJldHVybjtcblxuICAgICAgY2FzZSBET1dOX0FSUk9XOlxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGlzLnNlbGVjdGlvblNlcnZpY2UuYWN0aXZhdGVTaWJsaW5nKGZhbHNlKTtcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgICBjYXNlIFNQQUNFOlxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICByZXR1cm4gdGhpcy50b2dnbGUoZGF0YSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE92ZXJyaWRlIHRoZSBzdGFuZGFyZCB0b2dnbGUgZnVuY3Rpb24gdG8gYWx3YXlzIGFjdGl2YXRlIHRoZSBpdGVtXG4gICAqL1xuICB0b2dnbGUoZGF0YTogVCk6IHZvaWQge1xuICAgIHN1cGVyLnRvZ2dsZShkYXRhKTtcbiAgICB0aGlzLnNlbGVjdGlvblNlcnZpY2UuYWN0aXZhdGUoZGF0YSk7XG4gIH1cbn1cbiJdfQ==