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
    TabbableListDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[uxTabbableList]',
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
        items: [{ type: ContentChildren, args: [TabbableListItemDirective,] }]
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiYmFibGUtbGlzdC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlcy9hY2Nlc3NpYmlsaXR5L3RhYmJhYmxlLWxpc3QvdGFiYmFibGUtbGlzdC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBb0IsZUFBZSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQWEsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFHLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDOztJQXlCMUQsK0JBQW9CLGFBQWtDO1FBQWxDLGtCQUFhLEdBQWIsYUFBYSxDQUFxQjs7Ozt5QkFoQk4sVUFBVTs7OztvQkFHakMsSUFBSTs7OzsyQkFHRyxLQUFLOzs7OzJCQUdMLEtBQUs7S0FPcUI7Ozs7SUFFMUQsa0RBQWtCOzs7SUFBbEI7O1FBR0ksSUFBSSxDQUFDLGVBQWUscUJBQUcsUUFBUSxDQUFDLGFBQTRCLENBQUEsQ0FBQzs7UUFHN0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzs7UUFHckUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDbkIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztTQUMzRDtLQUNKOzs7O0lBRUQsMkNBQVc7OztJQUFYO1FBQUEsaUJBSUM7UUFIRyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxlQUFlLFlBQVksV0FBVyxDQUFDLENBQUMsQ0FBQztZQUNsRSxVQUFVLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxFQUFFLEVBQTVCLENBQTRCLENBQUMsQ0FBQztTQUNsRDtLQUNKOztnQkEzQ0osU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxrQkFBa0I7b0JBQzVCLFNBQVMsRUFBRSxDQUFDLG1CQUFtQixDQUFDO2lCQUNuQzs7OztnQkFMUSxtQkFBbUI7Ozs0QkFTdkIsS0FBSzt1QkFHTCxLQUFLOzhCQUdMLEtBQUs7OEJBR0wsS0FBSzt3QkFHTCxlQUFlLFNBQUMseUJBQXlCOztnQ0F2QjlDOztTQVFhLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyQ29udGVudEluaXQsIENvbnRlbnRDaGlsZHJlbiwgRGlyZWN0aXZlLCBJbnB1dCwgT25EZXN0cm95LCBRdWVyeUxpc3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRhYmJhYmxlTGlzdEl0ZW1EaXJlY3RpdmUgfSBmcm9tICcuL3RhYmJhYmxlLWxpc3QtaXRlbS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgVGFiYmFibGVMaXN0U2VydmljZSB9IGZyb20gJy4vdGFiYmFibGUtbGlzdC5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbdXhUYWJiYWJsZUxpc3RdJyxcbiAgICBwcm92aWRlcnM6IFtUYWJiYWJsZUxpc3RTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBUYWJiYWJsZUxpc3REaXJlY3RpdmUgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgLyoqIERldGVybWluZSB3aGV0aGVyIHRoZSB1cC9kb3duIGFycm93cyBzaG91bGQgYmUgdXNlZCBvciB0aGUgbGVmdC9yaWdodCBhcnJvd3MgKi9cbiAgICBASW5wdXQoKSBkaXJlY3Rpb246ICdob3Jpem9udGFsJyB8ICd2ZXJ0aWNhbCcgPSAndmVydGljYWwnO1xuXG4gICAgLyoqIEluZGljYXRlIHdoZXRoZXIgb3Igbm90IGZvY3VzIHNob3VsZCBsb29wIGJhY2sgdG8gdGhlIGZpcnN0IGVsZW1lbnQgYWZ0ZXIgdGhlIGxhc3QgKi9cbiAgICBASW5wdXQoKSB3cmFwOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIC8qKiBJbmRpY2F0ZSB3aGV0aGVyIG9yIG5vdCB0aGUgZmlyc3QgaXRlbSBzaG91bGQgcmVjZWl2ZSBmb2N1cyBvbiBzaG93IC0gdXNlZnVsIGZvciBtb2RhbHMgYW5kIHBvcG92ZXJzICovXG4gICAgQElucHV0KCkgZm9jdXNPblNob3c6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKiBJbmRpY2F0ZSB3aGV0aGVyIG9yIG5vdCBmb2N1cyBzaG91bGQgYmUgcmV0dXJuZWQgdG8gdGhlIHByZXZpb3VzIGVsZW1lbnQgKG9ubHkgYXBwbGljYWJsZSB3aGVuIHVzaW5nIGZvY3VzT25TaG93KSAqL1xuICAgIEBJbnB1dCgpIHJldHVybkZvY3VzOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKiogRmluZCBhbGwgdGFiYmFibGUgbGlzdCBpdGVtcyAqL1xuICAgIEBDb250ZW50Q2hpbGRyZW4oVGFiYmFibGVMaXN0SXRlbURpcmVjdGl2ZSkgaXRlbXM6IFF1ZXJ5TGlzdDxUYWJiYWJsZUxpc3RJdGVtRGlyZWN0aXZlPjtcblxuICAgIHByaXZhdGUgX2ZvY3VzZWRFbGVtZW50OiBIVE1MRWxlbWVudDtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX3RhYmJhYmxlTGlzdDogVGFiYmFibGVMaXN0U2VydmljZSkge31cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcblxuICAgICAgICAvLyBzdG9yZSB0aGUgY3VycmVudGx5IGZvY3VzZWQgZWxlbWVudFxuICAgICAgICB0aGlzLl9mb2N1c2VkRWxlbWVudCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgYXMgSFRNTEVsZW1lbnQ7XG5cbiAgICAgICAgLy8gU2V0IHVwIHRoZSBmb2N1cyBtb25pdG9yaW5nXG4gICAgICAgIHRoaXMuX3RhYmJhYmxlTGlzdC5pbml0aWFsaXplKHRoaXMuaXRlbXMsIHRoaXMuZGlyZWN0aW9uLCB0aGlzLndyYXApO1xuXG4gICAgICAgIC8vIGZvY3VzIHRoZSBmaXJzdCBlbGVtZW50IGlmIHNwZWNpZmllZFxuICAgICAgICBpZiAodGhpcy5mb2N1c09uU2hvdykge1xuICAgICAgICAgICAgdGhpcy5fdGFiYmFibGVMaXN0LmZvY3VzS2V5TWFuYWdlci5zZXRGaXJzdEl0ZW1BY3RpdmUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5yZXR1cm5Gb2N1cyAmJiB0aGlzLl9mb2N1c2VkRWxlbWVudCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuX2ZvY3VzZWRFbGVtZW50LmZvY3VzKCkpO1xuICAgICAgICB9XG4gICAgfVxufSJdfQ==