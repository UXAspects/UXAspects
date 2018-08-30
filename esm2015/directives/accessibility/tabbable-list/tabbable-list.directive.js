/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ContentChildren, Directive, Input, QueryList } from '@angular/core';
import { TabbableListItemDirective } from './tabbable-list-item.directive';
import { TabbableListService } from './tabbable-list.service';
export class TabbableListDirective {
    /**
     * @param {?} _tabbableList
     */
    constructor(_tabbableList) {
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
     * Prevent keyboard interaction when alt modifier key is pressed
     * @param {?} value
     * @return {?}
     */
    set allowAltModifier(value) { this._tabbableList.allowAltModifier = value; }
    /**
     * Prevent keyboard interaction when ctrl modifier key is pressed
     * @param {?} value
     * @return {?}
     */
    set allowCtrlModifier(value) { this._tabbableList.allowCtrlModifier = value; }
    /**
     * @return {?}
     */
    get focusKeyManager() {
        return this._tabbableList.focusKeyManager;
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        // store the currently focused element
        this._focusedElement = /** @type {?} */ (document.activeElement);
        // Set up the focus monitoring
        this._tabbableList.initialize(this.items, this.direction, this.wrap);
        // focus the first element if specified
        if (this.focusOnShow) {
            this._tabbableList.focusKeyManager.setFirstItemActive();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.returnFocus && this._focusedElement instanceof HTMLElement) {
            setTimeout(() => this._focusedElement.focus());
        }
    }
    /**
     * @return {?}
     */
    focus() {
        if (this._tabbableList.focusKeyManager && this._tabbableList.focusKeyManager.activeItem) {
            this._tabbableList.focusKeyManager.activeItem.focus();
        }
    }
    /**
     * @return {?}
     */
    focusTabbableItem() {
        this._tabbableList.focusTabbableItem();
    }
}
TabbableListDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxTabbableList]',
                exportAs: 'ux-tabbable-list',
                providers: [TabbableListService]
            },] }
];
/** @nocollapse */
TabbableListDirective.ctorParameters = () => [
    { type: TabbableListService }
];
TabbableListDirective.propDecorators = {
    direction: [{ type: Input }],
    wrap: [{ type: Input }],
    focusOnShow: [{ type: Input }],
    returnFocus: [{ type: Input }],
    allowAltModifier: [{ type: Input }],
    allowCtrlModifier: [{ type: Input }],
    items: [{ type: ContentChildren, args: [TabbableListItemDirective, { descendants: true },] }]
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiYmFibGUtbGlzdC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlcy9hY2Nlc3NpYmlsaXR5L3RhYmJhYmxlLWxpc3QvdGFiYmFibGUtbGlzdC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBb0IsZUFBZSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQWEsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFHLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBTzlELE1BQU07Ozs7SUE2QkYsWUFBb0IsYUFBa0M7UUFBbEMsa0JBQWEsR0FBYixhQUFhLENBQXFCOzs7O3lCQTFCTixVQUFVOzs7O29CQUdqQyxJQUFJOzs7OzJCQUdHLEtBQUs7Ozs7MkJBR0wsS0FBSztLQWlCc0I7Ozs7OztJQWQzRCxJQUFhLGdCQUFnQixDQUFDLEtBQWMsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQyxFQUFFOzs7Ozs7SUFHOUYsSUFBYSxpQkFBaUIsQ0FBQyxLQUFjLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUMsRUFBRTs7OztJQU9oRyxJQUFJLGVBQWU7UUFDZixNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUM7S0FDN0M7Ozs7SUFJRCxrQkFBa0I7O1FBR2QsSUFBSSxDQUFDLGVBQWUscUJBQUcsUUFBUSxDQUFDLGFBQTRCLENBQUEsQ0FBQzs7UUFHN0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzs7UUFHckUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDbkIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztTQUMzRDtLQUNKOzs7O0lBRUQsV0FBVztRQUNQLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLGVBQWUsWUFBWSxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ2xFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7U0FDbEQ7S0FDSjs7OztJQUVELEtBQUs7UUFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLGVBQWUsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ3RGLElBQUksQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUN6RDtLQUNKOzs7O0lBRUQsaUJBQWlCO1FBQ2IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0tBQzFDOzs7WUFoRUosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLFNBQVMsRUFBRSxDQUFDLG1CQUFtQixDQUFDO2FBQ25DOzs7O1lBTlEsbUJBQW1COzs7d0JBVXZCLEtBQUs7bUJBR0wsS0FBSzswQkFHTCxLQUFLOzBCQUdMLEtBQUs7K0JBR0wsS0FBSztnQ0FHTCxLQUFLO29CQUdMLGVBQWUsU0FBQyx5QkFBeUIsRUFBRSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGb2N1c0tleU1hbmFnZXIgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQgeyBBZnRlckNvbnRlbnRJbml0LCBDb250ZW50Q2hpbGRyZW4sIERpcmVjdGl2ZSwgSW5wdXQsIE9uRGVzdHJveSwgUXVlcnlMaXN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUYWJiYWJsZUxpc3RJdGVtRGlyZWN0aXZlIH0gZnJvbSAnLi90YWJiYWJsZS1saXN0LWl0ZW0uZGlyZWN0aXZlJztcbmltcG9ydCB7IFRhYmJhYmxlTGlzdFNlcnZpY2UgfSBmcm9tICcuL3RhYmJhYmxlLWxpc3Quc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3V4VGFiYmFibGVMaXN0XScsXG4gICAgZXhwb3J0QXM6ICd1eC10YWJiYWJsZS1saXN0JyxcbiAgICBwcm92aWRlcnM6IFtUYWJiYWJsZUxpc3RTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBUYWJiYWJsZUxpc3REaXJlY3RpdmUgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgLyoqIERldGVybWluZSB3aGV0aGVyIHRoZSB1cC9kb3duIGFycm93cyBzaG91bGQgYmUgdXNlZCBvciB0aGUgbGVmdC9yaWdodCBhcnJvd3MgKi9cbiAgICBASW5wdXQoKSBkaXJlY3Rpb246ICdob3Jpem9udGFsJyB8ICd2ZXJ0aWNhbCcgPSAndmVydGljYWwnO1xuXG4gICAgLyoqIEluZGljYXRlIHdoZXRoZXIgb3Igbm90IGZvY3VzIHNob3VsZCBsb29wIGJhY2sgdG8gdGhlIGZpcnN0IGVsZW1lbnQgYWZ0ZXIgdGhlIGxhc3QgKi9cbiAgICBASW5wdXQoKSB3cmFwOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIC8qKiBJbmRpY2F0ZSB3aGV0aGVyIG9yIG5vdCB0aGUgZmlyc3QgaXRlbSBzaG91bGQgcmVjZWl2ZSBmb2N1cyBvbiBzaG93IC0gdXNlZnVsIGZvciBtb2RhbHMgYW5kIHBvcG92ZXJzICovXG4gICAgQElucHV0KCkgZm9jdXNPblNob3c6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKiBJbmRpY2F0ZSB3aGV0aGVyIG9yIG5vdCBmb2N1cyBzaG91bGQgYmUgcmV0dXJuZWQgdG8gdGhlIHByZXZpb3VzIGVsZW1lbnQgKG9ubHkgYXBwbGljYWJsZSB3aGVuIHVzaW5nIGZvY3VzT25TaG93KSAqL1xuICAgIEBJbnB1dCgpIHJldHVybkZvY3VzOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKiogUHJldmVudCBrZXlib2FyZCBpbnRlcmFjdGlvbiB3aGVuIGFsdCBtb2RpZmllciBrZXkgaXMgcHJlc3NlZCAqL1xuICAgIEBJbnB1dCgpIHNldCBhbGxvd0FsdE1vZGlmaWVyKHZhbHVlOiBib29sZWFuKSB7IHRoaXMuX3RhYmJhYmxlTGlzdC5hbGxvd0FsdE1vZGlmaWVyID0gdmFsdWU7IH1cblxuICAgIC8qKiBQcmV2ZW50IGtleWJvYXJkIGludGVyYWN0aW9uIHdoZW4gY3RybCBtb2RpZmllciBrZXkgaXMgcHJlc3NlZCAqL1xuICAgIEBJbnB1dCgpIHNldCBhbGxvd0N0cmxNb2RpZmllcih2YWx1ZTogYm9vbGVhbikgeyB0aGlzLl90YWJiYWJsZUxpc3QuYWxsb3dDdHJsTW9kaWZpZXIgPSB2YWx1ZTsgfVxuXG4gICAgLyoqIEZpbmQgYWxsIHRhYmJhYmxlIGxpc3QgaXRlbXMgKi9cbiAgICBAQ29udGVudENoaWxkcmVuKFRhYmJhYmxlTGlzdEl0ZW1EaXJlY3RpdmUsIHsgZGVzY2VuZGFudHM6IHRydWUgfSkgaXRlbXM6IFF1ZXJ5TGlzdDxUYWJiYWJsZUxpc3RJdGVtRGlyZWN0aXZlPjtcblxuICAgIHByaXZhdGUgX2ZvY3VzZWRFbGVtZW50OiBIVE1MRWxlbWVudDtcblxuICAgIGdldCBmb2N1c0tleU1hbmFnZXIoKTogRm9jdXNLZXlNYW5hZ2VyPFRhYmJhYmxlTGlzdEl0ZW1EaXJlY3RpdmU+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RhYmJhYmxlTGlzdC5mb2N1c0tleU1hbmFnZXI7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfdGFiYmFibGVMaXN0OiBUYWJiYWJsZUxpc3RTZXJ2aWNlKSB7IH1cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcblxuICAgICAgICAvLyBzdG9yZSB0aGUgY3VycmVudGx5IGZvY3VzZWQgZWxlbWVudFxuICAgICAgICB0aGlzLl9mb2N1c2VkRWxlbWVudCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgYXMgSFRNTEVsZW1lbnQ7XG5cbiAgICAgICAgLy8gU2V0IHVwIHRoZSBmb2N1cyBtb25pdG9yaW5nXG4gICAgICAgIHRoaXMuX3RhYmJhYmxlTGlzdC5pbml0aWFsaXplKHRoaXMuaXRlbXMsIHRoaXMuZGlyZWN0aW9uLCB0aGlzLndyYXApO1xuXG4gICAgICAgIC8vIGZvY3VzIHRoZSBmaXJzdCBlbGVtZW50IGlmIHNwZWNpZmllZFxuICAgICAgICBpZiAodGhpcy5mb2N1c09uU2hvdykge1xuICAgICAgICAgICAgdGhpcy5fdGFiYmFibGVMaXN0LmZvY3VzS2V5TWFuYWdlci5zZXRGaXJzdEl0ZW1BY3RpdmUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5yZXR1cm5Gb2N1cyAmJiB0aGlzLl9mb2N1c2VkRWxlbWVudCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuX2ZvY3VzZWRFbGVtZW50LmZvY3VzKCkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZm9jdXMoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLl90YWJiYWJsZUxpc3QuZm9jdXNLZXlNYW5hZ2VyICYmIHRoaXMuX3RhYmJhYmxlTGlzdC5mb2N1c0tleU1hbmFnZXIuYWN0aXZlSXRlbSkge1xuICAgICAgICAgICAgdGhpcy5fdGFiYmFibGVMaXN0LmZvY3VzS2V5TWFuYWdlci5hY3RpdmVJdGVtLmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmb2N1c1RhYmJhYmxlSXRlbSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fdGFiYmFibGVMaXN0LmZvY3VzVGFiYmFibGVJdGVtKCk7XG4gICAgfVxufSJdfQ==