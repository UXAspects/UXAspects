/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ContentChildren, Directive, Input, QueryList } from '@angular/core';
import { TabbableListItemDirective } from './tabbable-list-item.directive';
import { TabbableListService } from './tabbable-list.service';
var TabbableListDirective = /** @class */ (function () {
    function TabbableListDirective(_tabbableList) {
        this._tabbableList = _tabbableList;
        /**
         * Determine whether the up/down arrows should be used or the left/right arrows
         */
        this.direction = 'vertical';
        /**
         * Indicate whether or not focus should loop back to the first element after the last
         */
        this.wrap = true;
        /**
         * Indicate whether or not the first item should receive focus on show - useful for modals and popovers
         */
        this.focusOnShow = false;
        /**
         * Indicate whether or not focus should be returned to the previous element (only applicable when using focusOnShow)
         */
        this.returnFocus = false;
    }
    Object.defineProperty(TabbableListDirective.prototype, "allowAltModifier", {
        /** Prevent keyboard interaction when alt modifier key is pressed */
        set: /**
         * Prevent keyboard interaction when alt modifier key is pressed
         * @param {?} value
         * @return {?}
         */
        function (value) { this._tabbableList.allowAltModifier = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabbableListDirective.prototype, "allowCtrlModifier", {
        /** Prevent keyboard interaction when ctrl modifier key is pressed */
        set: /**
         * Prevent keyboard interaction when ctrl modifier key is pressed
         * @param {?} value
         * @return {?}
         */
        function (value) { this._tabbableList.allowCtrlModifier = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabbableListDirective.prototype, "focusKeyManager", {
        get: /**
         * @return {?}
         */
        function () {
            return this._tabbableList.focusKeyManager;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    TabbableListDirective.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        // store the currently focused element
        this._focusedElement = /** @type {?} */ (document.activeElement);
        // Set up the focus monitoring
        this._tabbableList.initialize(this.items, this.direction, this.wrap);
        // focus the first element if specified
        if (this.focusOnShow) {
            this._tabbableList.focusKeyManager.setFirstItemActive();
        }
    };
    /**
     * @return {?}
     */
    TabbableListDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.returnFocus && this._focusedElement instanceof HTMLElement) {
            setTimeout(function () { return _this._focusedElement.focus(); });
        }
    };
    /**
     * @return {?}
     */
    TabbableListDirective.prototype.focusTabbableItem = /**
     * @return {?}
     */
    function () {
        this._tabbableList.focusTabbableItem();
    };
    TabbableListDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[uxTabbableList]',
                    exportAs: 'ux-tabbable-list',
                    providers: [TabbableListService]
                },] }
    ];
    /** @nocollapse */
    TabbableListDirective.ctorParameters = function () { return [
        { type: TabbableListService }
    ]; };
    TabbableListDirective.propDecorators = {
        direction: [{ type: Input }],
        wrap: [{ type: Input }],
        focusOnShow: [{ type: Input }],
        returnFocus: [{ type: Input }],
        allowAltModifier: [{ type: Input }],
        allowCtrlModifier: [{ type: Input }],
        items: [{ type: ContentChildren, args: [TabbableListItemDirective, { descendants: true },] }]
    };
    return TabbableListDirective;
}());
export { TabbableListDirective };
function TabbableListDirective_tsickle_Closure_declarations() {
    /**
     * Determine whether the up/down arrows should be used or the left/right arrows
     * @type {?}
     */
    TabbableListDirective.prototype.direction;
    /**
     * Indicate whether or not focus should loop back to the first element after the last
     * @type {?}
     */
    TabbableListDirective.prototype.wrap;
    /**
     * Indicate whether or not the first item should receive focus on show - useful for modals and popovers
     * @type {?}
     */
    TabbableListDirective.prototype.focusOnShow;
    /**
     * Indicate whether or not focus should be returned to the previous element (only applicable when using focusOnShow)
     * @type {?}
     */
    TabbableListDirective.prototype.returnFocus;
    /**
     * Find all tabbable list items
     * @type {?}
     */
    TabbableListDirective.prototype.items;
    /** @type {?} */
    TabbableListDirective.prototype._focusedElement;
    /** @type {?} */
    TabbableListDirective.prototype._tabbableList;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiYmFibGUtbGlzdC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlcy9hY2Nlc3NpYmlsaXR5L3RhYmJhYmxlLWxpc3QvdGFiYmFibGUtbGlzdC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBb0IsZUFBZSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQWEsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFHLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDOztJQW9DMUQsK0JBQW9CLGFBQWtDO1FBQWxDLGtCQUFhLEdBQWIsYUFBYSxDQUFxQjs7Ozt5QkExQk4sVUFBVTs7OztvQkFHakMsSUFBSTs7OzsyQkFHRyxLQUFLOzs7OzJCQUdMLEtBQUs7S0FpQnFCO0lBZDFELHNCQUFhLG1EQUFnQjtRQUQ3QixvRUFBb0U7Ozs7OztRQUNwRSxVQUE4QixLQUFjLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUMsRUFBRTs7O09BQUE7SUFHOUYsc0JBQWEsb0RBQWlCO1FBRDlCLHFFQUFxRTs7Ozs7O1FBQ3JFLFVBQStCLEtBQWMsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQyxFQUFFOzs7T0FBQTtJQU9oRyxzQkFBSSxrREFBZTs7OztRQUFuQjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQztTQUM3Qzs7O09BQUE7Ozs7SUFJRCxrREFBa0I7OztJQUFsQjs7UUFHSSxJQUFJLENBQUMsZUFBZSxxQkFBRyxRQUFRLENBQUMsYUFBNEIsQ0FBQSxDQUFDOztRQUc3RCxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDOztRQUdyRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUNuQixJQUFJLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1NBQzNEO0tBQ0o7Ozs7SUFFRCwyQ0FBVzs7O0lBQVg7UUFBQSxpQkFJQztRQUhHLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLGVBQWUsWUFBWSxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ2xFLFVBQVUsQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLEVBQUUsRUFBNUIsQ0FBNEIsQ0FBQyxDQUFDO1NBQ2xEO0tBQ0o7Ozs7SUFFRCxpREFBaUI7OztJQUFqQjtRQUNJLElBQUksQ0FBQyxhQUFhLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztLQUMxQzs7Z0JBMURKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsa0JBQWtCO29CQUM1QixRQUFRLEVBQUUsa0JBQWtCO29CQUM1QixTQUFTLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQztpQkFDbkM7Ozs7Z0JBTlEsbUJBQW1COzs7NEJBVXZCLEtBQUs7dUJBR0wsS0FBSzs4QkFHTCxLQUFLOzhCQUdMLEtBQUs7bUNBR0wsS0FBSztvQ0FHTCxLQUFLO3dCQUdMLGVBQWUsU0FBQyx5QkFBeUIsRUFBRSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUU7O2dDQS9CckU7O1NBVWEscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRm9jdXNLZXlNYW5hZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgQWZ0ZXJDb250ZW50SW5pdCwgQ29udGVudENoaWxkcmVuLCBEaXJlY3RpdmUsIElucHV0LCBPbkRlc3Ryb3ksIFF1ZXJ5TGlzdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVGFiYmFibGVMaXN0SXRlbURpcmVjdGl2ZSB9IGZyb20gJy4vdGFiYmFibGUtbGlzdC1pdGVtLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBUYWJiYWJsZUxpc3RTZXJ2aWNlIH0gZnJvbSAnLi90YWJiYWJsZS1saXN0LnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1t1eFRhYmJhYmxlTGlzdF0nLFxuICAgIGV4cG9ydEFzOiAndXgtdGFiYmFibGUtbGlzdCcsXG4gICAgcHJvdmlkZXJzOiBbVGFiYmFibGVMaXN0U2VydmljZV1cbn0pXG5leHBvcnQgY2xhc3MgVGFiYmFibGVMaXN0RGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95IHtcblxuICAgIC8qKiBEZXRlcm1pbmUgd2hldGhlciB0aGUgdXAvZG93biBhcnJvd3Mgc2hvdWxkIGJlIHVzZWQgb3IgdGhlIGxlZnQvcmlnaHQgYXJyb3dzICovXG4gICAgQElucHV0KCkgZGlyZWN0aW9uOiAnaG9yaXpvbnRhbCcgfCAndmVydGljYWwnID0gJ3ZlcnRpY2FsJztcblxuICAgIC8qKiBJbmRpY2F0ZSB3aGV0aGVyIG9yIG5vdCBmb2N1cyBzaG91bGQgbG9vcCBiYWNrIHRvIHRoZSBmaXJzdCBlbGVtZW50IGFmdGVyIHRoZSBsYXN0ICovXG4gICAgQElucHV0KCkgd3JhcDogYm9vbGVhbiA9IHRydWU7XG5cbiAgICAvKiogSW5kaWNhdGUgd2hldGhlciBvciBub3QgdGhlIGZpcnN0IGl0ZW0gc2hvdWxkIHJlY2VpdmUgZm9jdXMgb24gc2hvdyAtIHVzZWZ1bCBmb3IgbW9kYWxzIGFuZCBwb3BvdmVycyAqL1xuICAgIEBJbnB1dCgpIGZvY3VzT25TaG93OiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKiogSW5kaWNhdGUgd2hldGhlciBvciBub3QgZm9jdXMgc2hvdWxkIGJlIHJldHVybmVkIHRvIHRoZSBwcmV2aW91cyBlbGVtZW50IChvbmx5IGFwcGxpY2FibGUgd2hlbiB1c2luZyBmb2N1c09uU2hvdykgKi9cbiAgICBASW5wdXQoKSByZXR1cm5Gb2N1czogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqIFByZXZlbnQga2V5Ym9hcmQgaW50ZXJhY3Rpb24gd2hlbiBhbHQgbW9kaWZpZXIga2V5IGlzIHByZXNzZWQgKi9cbiAgICBASW5wdXQoKSBzZXQgYWxsb3dBbHRNb2RpZmllcih2YWx1ZTogYm9vbGVhbikgeyB0aGlzLl90YWJiYWJsZUxpc3QuYWxsb3dBbHRNb2RpZmllciA9IHZhbHVlOyB9XG5cbiAgICAvKiogUHJldmVudCBrZXlib2FyZCBpbnRlcmFjdGlvbiB3aGVuIGN0cmwgbW9kaWZpZXIga2V5IGlzIHByZXNzZWQgKi9cbiAgICBASW5wdXQoKSBzZXQgYWxsb3dDdHJsTW9kaWZpZXIodmFsdWU6IGJvb2xlYW4pIHsgdGhpcy5fdGFiYmFibGVMaXN0LmFsbG93Q3RybE1vZGlmaWVyID0gdmFsdWU7IH1cblxuICAgIC8qKiBGaW5kIGFsbCB0YWJiYWJsZSBsaXN0IGl0ZW1zICovXG4gICAgQENvbnRlbnRDaGlsZHJlbihUYWJiYWJsZUxpc3RJdGVtRGlyZWN0aXZlLCB7IGRlc2NlbmRhbnRzOiB0cnVlIH0pIGl0ZW1zOiBRdWVyeUxpc3Q8VGFiYmFibGVMaXN0SXRlbURpcmVjdGl2ZT47XG5cbiAgICBwcml2YXRlIF9mb2N1c2VkRWxlbWVudDogSFRNTEVsZW1lbnQ7XG5cbiAgICBnZXQgZm9jdXNLZXlNYW5hZ2VyKCk6IEZvY3VzS2V5TWFuYWdlcjxUYWJiYWJsZUxpc3RJdGVtRGlyZWN0aXZlPiB7XG4gICAgICAgIHJldHVybiB0aGlzLl90YWJiYWJsZUxpc3QuZm9jdXNLZXlNYW5hZ2VyO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX3RhYmJhYmxlTGlzdDogVGFiYmFibGVMaXN0U2VydmljZSkge31cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcblxuICAgICAgICAvLyBzdG9yZSB0aGUgY3VycmVudGx5IGZvY3VzZWQgZWxlbWVudFxuICAgICAgICB0aGlzLl9mb2N1c2VkRWxlbWVudCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgYXMgSFRNTEVsZW1lbnQ7XG5cbiAgICAgICAgLy8gU2V0IHVwIHRoZSBmb2N1cyBtb25pdG9yaW5nXG4gICAgICAgIHRoaXMuX3RhYmJhYmxlTGlzdC5pbml0aWFsaXplKHRoaXMuaXRlbXMsIHRoaXMuZGlyZWN0aW9uLCB0aGlzLndyYXApO1xuXG4gICAgICAgIC8vIGZvY3VzIHRoZSBmaXJzdCBlbGVtZW50IGlmIHNwZWNpZmllZFxuICAgICAgICBpZiAodGhpcy5mb2N1c09uU2hvdykge1xuICAgICAgICAgICAgdGhpcy5fdGFiYmFibGVMaXN0LmZvY3VzS2V5TWFuYWdlci5zZXRGaXJzdEl0ZW1BY3RpdmUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5yZXR1cm5Gb2N1cyAmJiB0aGlzLl9mb2N1c2VkRWxlbWVudCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuX2ZvY3VzZWRFbGVtZW50LmZvY3VzKCkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZm9jdXNUYWJiYWJsZUl0ZW0oKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3RhYmJhYmxlTGlzdC5mb2N1c1RhYmJhYmxlSXRlbSgpO1xuICAgIH1cbn0iXX0=