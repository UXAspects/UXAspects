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
}
TabbableListDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxTabbableList]',
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
    items: [{ type: ContentChildren, args: [TabbableListItemDirective,] }]
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiYmFibGUtbGlzdC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlcy9hY2Nlc3NpYmlsaXR5L3RhYmJhYmxlLWxpc3QvdGFiYmFibGUtbGlzdC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBb0IsZUFBZSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQWEsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFHLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBTTlELE1BQU07Ozs7SUFtQkYsWUFBb0IsYUFBa0M7UUFBbEMsa0JBQWEsR0FBYixhQUFhLENBQXFCOzs7O3lCQWhCTixVQUFVOzs7O29CQUdqQyxJQUFJOzs7OzJCQUdHLEtBQUs7Ozs7MkJBR0wsS0FBSztLQU9xQjs7OztJQUUxRCxrQkFBa0I7O1FBR2QsSUFBSSxDQUFDLGVBQWUscUJBQUcsUUFBUSxDQUFDLGFBQTRCLENBQUEsQ0FBQzs7UUFHN0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzs7UUFHckUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDbkIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztTQUMzRDtLQUNKOzs7O0lBRUQsV0FBVztRQUNQLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLGVBQWUsWUFBWSxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ2xFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7U0FDbEQ7S0FDSjs7O1lBM0NKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixTQUFTLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQzthQUNuQzs7OztZQUxRLG1CQUFtQjs7O3dCQVN2QixLQUFLO21CQUdMLEtBQUs7MEJBR0wsS0FBSzswQkFHTCxLQUFLO29CQUdMLGVBQWUsU0FBQyx5QkFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlckNvbnRlbnRJbml0LCBDb250ZW50Q2hpbGRyZW4sIERpcmVjdGl2ZSwgSW5wdXQsIE9uRGVzdHJveSwgUXVlcnlMaXN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUYWJiYWJsZUxpc3RJdGVtRGlyZWN0aXZlIH0gZnJvbSAnLi90YWJiYWJsZS1saXN0LWl0ZW0uZGlyZWN0aXZlJztcbmltcG9ydCB7IFRhYmJhYmxlTGlzdFNlcnZpY2UgfSBmcm9tICcuL3RhYmJhYmxlLWxpc3Quc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3V4VGFiYmFibGVMaXN0XScsXG4gICAgcHJvdmlkZXJzOiBbVGFiYmFibGVMaXN0U2VydmljZV1cbn0pXG5leHBvcnQgY2xhc3MgVGFiYmFibGVMaXN0RGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95IHtcblxuICAgIC8qKiBEZXRlcm1pbmUgd2hldGhlciB0aGUgdXAvZG93biBhcnJvd3Mgc2hvdWxkIGJlIHVzZWQgb3IgdGhlIGxlZnQvcmlnaHQgYXJyb3dzICovXG4gICAgQElucHV0KCkgZGlyZWN0aW9uOiAnaG9yaXpvbnRhbCcgfCAndmVydGljYWwnID0gJ3ZlcnRpY2FsJztcblxuICAgIC8qKiBJbmRpY2F0ZSB3aGV0aGVyIG9yIG5vdCBmb2N1cyBzaG91bGQgbG9vcCBiYWNrIHRvIHRoZSBmaXJzdCBlbGVtZW50IGFmdGVyIHRoZSBsYXN0ICovXG4gICAgQElucHV0KCkgd3JhcDogYm9vbGVhbiA9IHRydWU7XG5cbiAgICAvKiogSW5kaWNhdGUgd2hldGhlciBvciBub3QgdGhlIGZpcnN0IGl0ZW0gc2hvdWxkIHJlY2VpdmUgZm9jdXMgb24gc2hvdyAtIHVzZWZ1bCBmb3IgbW9kYWxzIGFuZCBwb3BvdmVycyAqL1xuICAgIEBJbnB1dCgpIGZvY3VzT25TaG93OiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKiogSW5kaWNhdGUgd2hldGhlciBvciBub3QgZm9jdXMgc2hvdWxkIGJlIHJldHVybmVkIHRvIHRoZSBwcmV2aW91cyBlbGVtZW50IChvbmx5IGFwcGxpY2FibGUgd2hlbiB1c2luZyBmb2N1c09uU2hvdykgKi9cbiAgICBASW5wdXQoKSByZXR1cm5Gb2N1czogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqIEZpbmQgYWxsIHRhYmJhYmxlIGxpc3QgaXRlbXMgKi9cbiAgICBAQ29udGVudENoaWxkcmVuKFRhYmJhYmxlTGlzdEl0ZW1EaXJlY3RpdmUpIGl0ZW1zOiBRdWVyeUxpc3Q8VGFiYmFibGVMaXN0SXRlbURpcmVjdGl2ZT47XG5cbiAgICBwcml2YXRlIF9mb2N1c2VkRWxlbWVudDogSFRNTEVsZW1lbnQ7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF90YWJiYWJsZUxpc3Q6IFRhYmJhYmxlTGlzdFNlcnZpY2UpIHt9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG5cbiAgICAgICAgLy8gc3RvcmUgdGhlIGN1cnJlbnRseSBmb2N1c2VkIGVsZW1lbnRcbiAgICAgICAgdGhpcy5fZm9jdXNlZEVsZW1lbnQgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50IGFzIEhUTUxFbGVtZW50O1xuXG4gICAgICAgIC8vIFNldCB1cCB0aGUgZm9jdXMgbW9uaXRvcmluZ1xuICAgICAgICB0aGlzLl90YWJiYWJsZUxpc3QuaW5pdGlhbGl6ZSh0aGlzLml0ZW1zLCB0aGlzLmRpcmVjdGlvbiwgdGhpcy53cmFwKTtcblxuICAgICAgICAvLyBmb2N1cyB0aGUgZmlyc3QgZWxlbWVudCBpZiBzcGVjaWZpZWRcbiAgICAgICAgaWYgKHRoaXMuZm9jdXNPblNob3cpIHtcbiAgICAgICAgICAgIHRoaXMuX3RhYmJhYmxlTGlzdC5mb2N1c0tleU1hbmFnZXIuc2V0Rmlyc3RJdGVtQWN0aXZlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMucmV0dXJuRm9jdXMgJiYgdGhpcy5fZm9jdXNlZEVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLl9mb2N1c2VkRWxlbWVudC5mb2N1cygpKTtcbiAgICAgICAgfVxuICAgIH1cbn0iXX0=