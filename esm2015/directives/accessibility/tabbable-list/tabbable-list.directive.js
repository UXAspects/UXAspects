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
     * Enabling handling of hierarchical lists via use of the `TabbableListItemDirective.parent` property.
     * @param {?} value
     * @return {?}
     */
    set hierarchy(value) { this._tabbableList.hierarchy = value; }
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
        if (this._tabbableList.hierarchy) {
            // Sort items in a hierarchy
            this._orderedItems = new QueryList();
            this._orderedItems.reset(this._tabbableList.sortItemsByHierarchy(this.items));
            // Ensure that the child items remain sorted
            this.items.changes.subscribe(() => {
                this._orderedItems.reset(this._tabbableList.sortItemsByHierarchy(this.items));
                this._orderedItems.notifyOnChanges();
            });
        }
        else {
            // Items are already in order
            this._orderedItems = this.items;
        }
        // Set up the focus monitoring
        this._tabbableList.initialize(this._orderedItems, this.direction, this.wrap);
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
    hierarchy: [{ type: Input }],
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
    TabbableListDirective.prototype._orderedItems;
    /** @type {?} */
    TabbableListDirective.prototype._tabbableList;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiYmFibGUtbGlzdC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlcy9hY2Nlc3NpYmlsaXR5L3RhYmJhYmxlLWxpc3QvdGFiYmFibGUtbGlzdC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBb0IsZUFBZSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQWEsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFHLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBTzlELE1BQU07Ozs7SUFpQ0YsWUFBb0IsYUFBa0M7UUFBbEMsa0JBQWEsR0FBYixhQUFhLENBQXFCOzs7O3lCQTlCTixVQUFVOzs7O29CQUdqQyxJQUFJOzs7OzJCQUdHLEtBQUs7Ozs7MkJBR0wsS0FBSztLQXFCc0I7Ozs7OztJQWxCM0QsSUFBYSxTQUFTLENBQUMsS0FBYyxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxFQUFFOzs7Ozs7SUFHaEYsSUFBYSxnQkFBZ0IsQ0FBQyxLQUFjLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUMsRUFBRTs7Ozs7O0lBRzlGLElBQWEsaUJBQWlCLENBQUMsS0FBYyxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxDQUFDLEVBQUU7Ozs7SUFRaEcsSUFBSSxlQUFlO1FBQ2YsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDO0tBQzdDOzs7O0lBSUQsa0JBQWtCOztRQUdkLElBQUksQ0FBQyxlQUFlLHFCQUFHLFFBQVEsQ0FBQyxhQUE0QixDQUFBLENBQUM7UUFFN0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDOztZQUcvQixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksU0FBUyxFQUE2QixDQUFDO1lBQ2hFLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7O1lBRzlFLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7Z0JBQzlCLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQzlFLElBQUksQ0FBQyxhQUFhLENBQUMsZUFBZSxFQUFFLENBQUM7YUFDeEMsQ0FBQyxDQUFDO1NBRU47UUFBQyxJQUFJLENBQUMsQ0FBQzs7WUFHSixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7U0FDbkM7O1FBR0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzs7UUFHN0UsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDbkIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztTQUMzRDtLQUNKOzs7O0lBRUQsV0FBVztRQUNQLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLGVBQWUsWUFBWSxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ2xFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7U0FDbEQ7S0FDSjs7OztJQUVELEtBQUs7UUFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLGVBQWUsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ3RGLElBQUksQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUN6RDtLQUNKOzs7O0lBRUQsaUJBQWlCO1FBQ2IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0tBQzFDOzs7WUF0RkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLFNBQVMsRUFBRSxDQUFDLG1CQUFtQixDQUFDO2FBQ25DOzs7O1lBTlEsbUJBQW1COzs7d0JBVXZCLEtBQUs7bUJBR0wsS0FBSzswQkFHTCxLQUFLOzBCQUdMLEtBQUs7d0JBR0wsS0FBSzsrQkFHTCxLQUFLO2dDQUdMLEtBQUs7b0JBR0wsZUFBZSxTQUFDLHlCQUF5QixFQUFFLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZvY3VzS2V5TWFuYWdlciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7IEFmdGVyQ29udGVudEluaXQsIENvbnRlbnRDaGlsZHJlbiwgRGlyZWN0aXZlLCBJbnB1dCwgT25EZXN0cm95LCBRdWVyeUxpc3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRhYmJhYmxlTGlzdEl0ZW1EaXJlY3RpdmUgfSBmcm9tICcuL3RhYmJhYmxlLWxpc3QtaXRlbS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgVGFiYmFibGVMaXN0U2VydmljZSB9IGZyb20gJy4vdGFiYmFibGUtbGlzdC5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbdXhUYWJiYWJsZUxpc3RdJyxcbiAgICBleHBvcnRBczogJ3V4LXRhYmJhYmxlLWxpc3QnLFxuICAgIHByb3ZpZGVyczogW1RhYmJhYmxlTGlzdFNlcnZpY2VdXG59KVxuZXhwb3J0IGNsYXNzIFRhYmJhYmxlTGlzdERpcmVjdGl2ZSBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSB7XG5cbiAgICAvKiogRGV0ZXJtaW5lIHdoZXRoZXIgdGhlIHVwL2Rvd24gYXJyb3dzIHNob3VsZCBiZSB1c2VkIG9yIHRoZSBsZWZ0L3JpZ2h0IGFycm93cyAqL1xuICAgIEBJbnB1dCgpIGRpcmVjdGlvbjogJ2hvcml6b250YWwnIHwgJ3ZlcnRpY2FsJyA9ICd2ZXJ0aWNhbCc7XG5cbiAgICAvKiogSW5kaWNhdGUgd2hldGhlciBvciBub3QgZm9jdXMgc2hvdWxkIGxvb3AgYmFjayB0byB0aGUgZmlyc3QgZWxlbWVudCBhZnRlciB0aGUgbGFzdCAqL1xuICAgIEBJbnB1dCgpIHdyYXA6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLyoqIEluZGljYXRlIHdoZXRoZXIgb3Igbm90IHRoZSBmaXJzdCBpdGVtIHNob3VsZCByZWNlaXZlIGZvY3VzIG9uIHNob3cgLSB1c2VmdWwgZm9yIG1vZGFscyBhbmQgcG9wb3ZlcnMgKi9cbiAgICBASW5wdXQoKSBmb2N1c09uU2hvdzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqIEluZGljYXRlIHdoZXRoZXIgb3Igbm90IGZvY3VzIHNob3VsZCBiZSByZXR1cm5lZCB0byB0aGUgcHJldmlvdXMgZWxlbWVudCAob25seSBhcHBsaWNhYmxlIHdoZW4gdXNpbmcgZm9jdXNPblNob3cpICovXG4gICAgQElucHV0KCkgcmV0dXJuRm9jdXM6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKiBFbmFibGluZyBoYW5kbGluZyBvZiBoaWVyYXJjaGljYWwgbGlzdHMgdmlhIHVzZSBvZiB0aGUgYFRhYmJhYmxlTGlzdEl0ZW1EaXJlY3RpdmUucGFyZW50YCBwcm9wZXJ0eS4gKi9cbiAgICBASW5wdXQoKSBzZXQgaGllcmFyY2h5KHZhbHVlOiBib29sZWFuKSB7IHRoaXMuX3RhYmJhYmxlTGlzdC5oaWVyYXJjaHkgPSB2YWx1ZTsgfVxuXG4gICAgLyoqIFByZXZlbnQga2V5Ym9hcmQgaW50ZXJhY3Rpb24gd2hlbiBhbHQgbW9kaWZpZXIga2V5IGlzIHByZXNzZWQgKi9cbiAgICBASW5wdXQoKSBzZXQgYWxsb3dBbHRNb2RpZmllcih2YWx1ZTogYm9vbGVhbikgeyB0aGlzLl90YWJiYWJsZUxpc3QuYWxsb3dBbHRNb2RpZmllciA9IHZhbHVlOyB9XG5cbiAgICAvKiogUHJldmVudCBrZXlib2FyZCBpbnRlcmFjdGlvbiB3aGVuIGN0cmwgbW9kaWZpZXIga2V5IGlzIHByZXNzZWQgKi9cbiAgICBASW5wdXQoKSBzZXQgYWxsb3dDdHJsTW9kaWZpZXIodmFsdWU6IGJvb2xlYW4pIHsgdGhpcy5fdGFiYmFibGVMaXN0LmFsbG93Q3RybE1vZGlmaWVyID0gdmFsdWU7IH1cblxuICAgIC8qKiBGaW5kIGFsbCB0YWJiYWJsZSBsaXN0IGl0ZW1zICovXG4gICAgQENvbnRlbnRDaGlsZHJlbihUYWJiYWJsZUxpc3RJdGVtRGlyZWN0aXZlLCB7IGRlc2NlbmRhbnRzOiB0cnVlIH0pIGl0ZW1zOiBRdWVyeUxpc3Q8VGFiYmFibGVMaXN0SXRlbURpcmVjdGl2ZT47XG5cbiAgICBwcml2YXRlIF9mb2N1c2VkRWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gICAgcHJpdmF0ZSBfb3JkZXJlZEl0ZW1zOiBRdWVyeUxpc3Q8VGFiYmFibGVMaXN0SXRlbURpcmVjdGl2ZT47XG5cbiAgICBnZXQgZm9jdXNLZXlNYW5hZ2VyKCk6IEZvY3VzS2V5TWFuYWdlcjxUYWJiYWJsZUxpc3RJdGVtRGlyZWN0aXZlPiB7XG4gICAgICAgIHJldHVybiB0aGlzLl90YWJiYWJsZUxpc3QuZm9jdXNLZXlNYW5hZ2VyO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX3RhYmJhYmxlTGlzdDogVGFiYmFibGVMaXN0U2VydmljZSkgeyB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG5cbiAgICAgICAgLy8gc3RvcmUgdGhlIGN1cnJlbnRseSBmb2N1c2VkIGVsZW1lbnRcbiAgICAgICAgdGhpcy5fZm9jdXNlZEVsZW1lbnQgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50IGFzIEhUTUxFbGVtZW50O1xuXG4gICAgICAgIGlmICh0aGlzLl90YWJiYWJsZUxpc3QuaGllcmFyY2h5KSB7XG5cbiAgICAgICAgICAgIC8vIFNvcnQgaXRlbXMgaW4gYSBoaWVyYXJjaHlcbiAgICAgICAgICAgIHRoaXMuX29yZGVyZWRJdGVtcyA9IG5ldyBRdWVyeUxpc3Q8VGFiYmFibGVMaXN0SXRlbURpcmVjdGl2ZT4oKTtcbiAgICAgICAgICAgIHRoaXMuX29yZGVyZWRJdGVtcy5yZXNldCh0aGlzLl90YWJiYWJsZUxpc3Quc29ydEl0ZW1zQnlIaWVyYXJjaHkodGhpcy5pdGVtcykpO1xuXG4gICAgICAgICAgICAvLyBFbnN1cmUgdGhhdCB0aGUgY2hpbGQgaXRlbXMgcmVtYWluIHNvcnRlZFxuICAgICAgICAgICAgdGhpcy5pdGVtcy5jaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fb3JkZXJlZEl0ZW1zLnJlc2V0KHRoaXMuX3RhYmJhYmxlTGlzdC5zb3J0SXRlbXNCeUhpZXJhcmNoeSh0aGlzLml0ZW1zKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fb3JkZXJlZEl0ZW1zLm5vdGlmeU9uQ2hhbmdlcygpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgLy8gSXRlbXMgYXJlIGFscmVhZHkgaW4gb3JkZXJcbiAgICAgICAgICAgIHRoaXMuX29yZGVyZWRJdGVtcyA9IHRoaXMuaXRlbXM7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTZXQgdXAgdGhlIGZvY3VzIG1vbml0b3JpbmdcbiAgICAgICAgdGhpcy5fdGFiYmFibGVMaXN0LmluaXRpYWxpemUodGhpcy5fb3JkZXJlZEl0ZW1zLCB0aGlzLmRpcmVjdGlvbiwgdGhpcy53cmFwKTtcblxuICAgICAgICAvLyBmb2N1cyB0aGUgZmlyc3QgZWxlbWVudCBpZiBzcGVjaWZpZWRcbiAgICAgICAgaWYgKHRoaXMuZm9jdXNPblNob3cpIHtcbiAgICAgICAgICAgIHRoaXMuX3RhYmJhYmxlTGlzdC5mb2N1c0tleU1hbmFnZXIuc2V0Rmlyc3RJdGVtQWN0aXZlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMucmV0dXJuRm9jdXMgJiYgdGhpcy5fZm9jdXNlZEVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLl9mb2N1c2VkRWxlbWVudC5mb2N1cygpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZvY3VzKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5fdGFiYmFibGVMaXN0LmZvY3VzS2V5TWFuYWdlciAmJiB0aGlzLl90YWJiYWJsZUxpc3QuZm9jdXNLZXlNYW5hZ2VyLmFjdGl2ZUl0ZW0pIHtcbiAgICAgICAgICAgIHRoaXMuX3RhYmJhYmxlTGlzdC5mb2N1c0tleU1hbmFnZXIuYWN0aXZlSXRlbS5mb2N1cygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZm9jdXNUYWJiYWJsZUl0ZW0oKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3RhYmJhYmxlTGlzdC5mb2N1c1RhYmJhYmxlSXRlbSgpO1xuICAgIH1cbn1cbiJdfQ==