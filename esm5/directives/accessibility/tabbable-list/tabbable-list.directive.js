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
    TabbableListDirective.prototype.focus = /**
     * @return {?}
     */
    function () {
        if (this._tabbableList.focusKeyManager && this._tabbableList.focusKeyManager.activeItem) {
            this._tabbableList.focusKeyManager.activeItem.focus();
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiYmFibGUtbGlzdC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlcy9hY2Nlc3NpYmlsaXR5L3RhYmJhYmxlLWxpc3QvdGFiYmFibGUtbGlzdC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBb0IsZUFBZSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQWEsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFHLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDOztJQW9DMUQsK0JBQW9CLGFBQWtDO1FBQWxDLGtCQUFhLEdBQWIsYUFBYSxDQUFxQjs7Ozt5QkExQk4sVUFBVTs7OztvQkFHakMsSUFBSTs7OzsyQkFHRyxLQUFLOzs7OzJCQUdMLEtBQUs7S0FpQnNCO0lBZDNELHNCQUFhLG1EQUFnQjtRQUQ3QixvRUFBb0U7Ozs7OztRQUNwRSxVQUE4QixLQUFjLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUMsRUFBRTs7O09BQUE7SUFHOUYsc0JBQWEsb0RBQWlCO1FBRDlCLHFFQUFxRTs7Ozs7O1FBQ3JFLFVBQStCLEtBQWMsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQyxFQUFFOzs7T0FBQTtJQU9oRyxzQkFBSSxrREFBZTs7OztRQUFuQjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQztTQUM3Qzs7O09BQUE7Ozs7SUFJRCxrREFBa0I7OztJQUFsQjs7UUFHSSxJQUFJLENBQUMsZUFBZSxxQkFBRyxRQUFRLENBQUMsYUFBNEIsQ0FBQSxDQUFDOztRQUc3RCxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDOztRQUdyRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUNuQixJQUFJLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1NBQzNEO0tBQ0o7Ozs7SUFFRCwyQ0FBVzs7O0lBQVg7UUFBQSxpQkFJQztRQUhHLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLGVBQWUsWUFBWSxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ2xFLFVBQVUsQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLEVBQUUsRUFBNUIsQ0FBNEIsQ0FBQyxDQUFDO1NBQ2xEO0tBQ0o7Ozs7SUFFRCxxQ0FBSzs7O0lBQUw7UUFDSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLGVBQWUsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ3RGLElBQUksQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUN6RDtLQUNKOzs7O0lBRUQsaURBQWlCOzs7SUFBakI7UUFDSSxJQUFJLENBQUMsYUFBYSxDQUFDLGlCQUFpQixFQUFFLENBQUM7S0FDMUM7O2dCQWhFSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLGtCQUFrQjtvQkFDNUIsUUFBUSxFQUFFLGtCQUFrQjtvQkFDNUIsU0FBUyxFQUFFLENBQUMsbUJBQW1CLENBQUM7aUJBQ25DOzs7O2dCQU5RLG1CQUFtQjs7OzRCQVV2QixLQUFLO3VCQUdMLEtBQUs7OEJBR0wsS0FBSzs4QkFHTCxLQUFLO21DQUdMLEtBQUs7b0NBR0wsS0FBSzt3QkFHTCxlQUFlLFNBQUMseUJBQXlCLEVBQUUsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFOztnQ0EvQnJFOztTQVVhLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZvY3VzS2V5TWFuYWdlciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7IEFmdGVyQ29udGVudEluaXQsIENvbnRlbnRDaGlsZHJlbiwgRGlyZWN0aXZlLCBJbnB1dCwgT25EZXN0cm95LCBRdWVyeUxpc3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRhYmJhYmxlTGlzdEl0ZW1EaXJlY3RpdmUgfSBmcm9tICcuL3RhYmJhYmxlLWxpc3QtaXRlbS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgVGFiYmFibGVMaXN0U2VydmljZSB9IGZyb20gJy4vdGFiYmFibGUtbGlzdC5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbdXhUYWJiYWJsZUxpc3RdJyxcbiAgICBleHBvcnRBczogJ3V4LXRhYmJhYmxlLWxpc3QnLFxuICAgIHByb3ZpZGVyczogW1RhYmJhYmxlTGlzdFNlcnZpY2VdXG59KVxuZXhwb3J0IGNsYXNzIFRhYmJhYmxlTGlzdERpcmVjdGl2ZSBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSB7XG5cbiAgICAvKiogRGV0ZXJtaW5lIHdoZXRoZXIgdGhlIHVwL2Rvd24gYXJyb3dzIHNob3VsZCBiZSB1c2VkIG9yIHRoZSBsZWZ0L3JpZ2h0IGFycm93cyAqL1xuICAgIEBJbnB1dCgpIGRpcmVjdGlvbjogJ2hvcml6b250YWwnIHwgJ3ZlcnRpY2FsJyA9ICd2ZXJ0aWNhbCc7XG5cbiAgICAvKiogSW5kaWNhdGUgd2hldGhlciBvciBub3QgZm9jdXMgc2hvdWxkIGxvb3AgYmFjayB0byB0aGUgZmlyc3QgZWxlbWVudCBhZnRlciB0aGUgbGFzdCAqL1xuICAgIEBJbnB1dCgpIHdyYXA6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLyoqIEluZGljYXRlIHdoZXRoZXIgb3Igbm90IHRoZSBmaXJzdCBpdGVtIHNob3VsZCByZWNlaXZlIGZvY3VzIG9uIHNob3cgLSB1c2VmdWwgZm9yIG1vZGFscyBhbmQgcG9wb3ZlcnMgKi9cbiAgICBASW5wdXQoKSBmb2N1c09uU2hvdzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqIEluZGljYXRlIHdoZXRoZXIgb3Igbm90IGZvY3VzIHNob3VsZCBiZSByZXR1cm5lZCB0byB0aGUgcHJldmlvdXMgZWxlbWVudCAob25seSBhcHBsaWNhYmxlIHdoZW4gdXNpbmcgZm9jdXNPblNob3cpICovXG4gICAgQElucHV0KCkgcmV0dXJuRm9jdXM6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKiBQcmV2ZW50IGtleWJvYXJkIGludGVyYWN0aW9uIHdoZW4gYWx0IG1vZGlmaWVyIGtleSBpcyBwcmVzc2VkICovXG4gICAgQElucHV0KCkgc2V0IGFsbG93QWx0TW9kaWZpZXIodmFsdWU6IGJvb2xlYW4pIHsgdGhpcy5fdGFiYmFibGVMaXN0LmFsbG93QWx0TW9kaWZpZXIgPSB2YWx1ZTsgfVxuXG4gICAgLyoqIFByZXZlbnQga2V5Ym9hcmQgaW50ZXJhY3Rpb24gd2hlbiBjdHJsIG1vZGlmaWVyIGtleSBpcyBwcmVzc2VkICovXG4gICAgQElucHV0KCkgc2V0IGFsbG93Q3RybE1vZGlmaWVyKHZhbHVlOiBib29sZWFuKSB7IHRoaXMuX3RhYmJhYmxlTGlzdC5hbGxvd0N0cmxNb2RpZmllciA9IHZhbHVlOyB9XG5cbiAgICAvKiogRmluZCBhbGwgdGFiYmFibGUgbGlzdCBpdGVtcyAqL1xuICAgIEBDb250ZW50Q2hpbGRyZW4oVGFiYmFibGVMaXN0SXRlbURpcmVjdGl2ZSwgeyBkZXNjZW5kYW50czogdHJ1ZSB9KSBpdGVtczogUXVlcnlMaXN0PFRhYmJhYmxlTGlzdEl0ZW1EaXJlY3RpdmU+O1xuXG4gICAgcHJpdmF0ZSBfZm9jdXNlZEVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuXG4gICAgZ2V0IGZvY3VzS2V5TWFuYWdlcigpOiBGb2N1c0tleU1hbmFnZXI8VGFiYmFibGVMaXN0SXRlbURpcmVjdGl2ZT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fdGFiYmFibGVMaXN0LmZvY3VzS2V5TWFuYWdlcjtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF90YWJiYWJsZUxpc3Q6IFRhYmJhYmxlTGlzdFNlcnZpY2UpIHsgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xuXG4gICAgICAgIC8vIHN0b3JlIHRoZSBjdXJyZW50bHkgZm9jdXNlZCBlbGVtZW50XG4gICAgICAgIHRoaXMuX2ZvY3VzZWRFbGVtZW50ID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCBhcyBIVE1MRWxlbWVudDtcblxuICAgICAgICAvLyBTZXQgdXAgdGhlIGZvY3VzIG1vbml0b3JpbmdcbiAgICAgICAgdGhpcy5fdGFiYmFibGVMaXN0LmluaXRpYWxpemUodGhpcy5pdGVtcywgdGhpcy5kaXJlY3Rpb24sIHRoaXMud3JhcCk7XG5cbiAgICAgICAgLy8gZm9jdXMgdGhlIGZpcnN0IGVsZW1lbnQgaWYgc3BlY2lmaWVkXG4gICAgICAgIGlmICh0aGlzLmZvY3VzT25TaG93KSB7XG4gICAgICAgICAgICB0aGlzLl90YWJiYWJsZUxpc3QuZm9jdXNLZXlNYW5hZ2VyLnNldEZpcnN0SXRlbUFjdGl2ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnJldHVybkZvY3VzICYmIHRoaXMuX2ZvY3VzZWRFbGVtZW50IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5fZm9jdXNlZEVsZW1lbnQuZm9jdXMoKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmb2N1cygpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX3RhYmJhYmxlTGlzdC5mb2N1c0tleU1hbmFnZXIgJiYgdGhpcy5fdGFiYmFibGVMaXN0LmZvY3VzS2V5TWFuYWdlci5hY3RpdmVJdGVtKSB7XG4gICAgICAgICAgICB0aGlzLl90YWJiYWJsZUxpc3QuZm9jdXNLZXlNYW5hZ2VyLmFjdGl2ZUl0ZW0uZm9jdXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZvY3VzVGFiYmFibGVJdGVtKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl90YWJiYWJsZUxpc3QuZm9jdXNUYWJiYWJsZUl0ZW0oKTtcbiAgICB9XG59Il19