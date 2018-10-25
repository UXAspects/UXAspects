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
     * Focus the first or last item when Home or End keys are pressed
     * @param {?} value
     * @return {?}
     */
    set allowBoundaryKeys(value) { this._tabbableList.allowBoundaryKeys = value; }
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
    allowBoundaryKeys: [{ type: Input }],
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiYmFibGUtbGlzdC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlcy9hY2Nlc3NpYmlsaXR5L3RhYmJhYmxlLWxpc3QvdGFiYmFibGUtbGlzdC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBb0IsZUFBZSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQWEsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFHLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBTzlELE1BQU07Ozs7SUFvQ0YsWUFBb0IsYUFBa0M7UUFBbEMsa0JBQWEsR0FBYixhQUFhLENBQXFCOzs7O3lCQWpDTixVQUFVOzs7O29CQUdqQyxJQUFJOzs7OzJCQUdHLEtBQUs7Ozs7MkJBR0wsS0FBSztLQXdCc0I7Ozs7OztJQXJCM0QsSUFBYSxTQUFTLENBQUMsS0FBYyxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxFQUFFOzs7Ozs7SUFHaEYsSUFBYSxnQkFBZ0IsQ0FBQyxLQUFjLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUMsRUFBRTs7Ozs7O0lBRzlGLElBQWEsaUJBQWlCLENBQUMsS0FBYyxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxDQUFDLEVBQUU7Ozs7OztJQUdoRyxJQUFhLGlCQUFpQixDQUFDLEtBQWMsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQyxFQUFFOzs7O0lBUWhHLElBQUksZUFBZTtRQUNmLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQztLQUM3Qzs7OztJQUlELGtCQUFrQjs7UUFHZCxJQUFJLENBQUMsZUFBZSxxQkFBRyxRQUFRLENBQUMsYUFBNEIsQ0FBQSxDQUFDO1FBRTdELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzs7WUFHL0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLFNBQVMsRUFBNkIsQ0FBQztZQUNoRSxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDOztZQUc5RSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO2dCQUM5QixJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUM5RSxJQUFJLENBQUMsYUFBYSxDQUFDLGVBQWUsRUFBRSxDQUFDO2FBQ3hDLENBQUMsQ0FBQztTQUVOO1FBQUMsSUFBSSxDQUFDLENBQUM7O1lBR0osSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1NBQ25DOztRQUdELElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7O1FBRzdFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ25CLElBQUksQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLGtCQUFrQixFQUFFLENBQUM7U0FDM0Q7S0FDSjs7OztJQUVELFdBQVc7UUFDUCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxlQUFlLFlBQVksV0FBVyxDQUFDLENBQUMsQ0FBQztZQUNsRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1NBQ2xEO0tBQ0o7Ozs7SUFFRCxLQUFLO1FBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxlQUFlLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUN0RixJQUFJLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDekQ7S0FDSjs7OztJQUVELGlCQUFpQjtRQUNiLElBQUksQ0FBQyxhQUFhLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztLQUMxQzs7O1lBekZKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixTQUFTLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQzthQUNuQzs7OztZQU5RLG1CQUFtQjs7O3dCQVV2QixLQUFLO21CQUdMLEtBQUs7MEJBR0wsS0FBSzswQkFHTCxLQUFLO3dCQUdMLEtBQUs7K0JBR0wsS0FBSztnQ0FHTCxLQUFLO2dDQUdMLEtBQUs7b0JBR0wsZUFBZSxTQUFDLHlCQUF5QixFQUFFLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZvY3VzS2V5TWFuYWdlciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7IEFmdGVyQ29udGVudEluaXQsIENvbnRlbnRDaGlsZHJlbiwgRGlyZWN0aXZlLCBJbnB1dCwgT25EZXN0cm95LCBRdWVyeUxpc3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRhYmJhYmxlTGlzdEl0ZW1EaXJlY3RpdmUgfSBmcm9tICcuL3RhYmJhYmxlLWxpc3QtaXRlbS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgVGFiYmFibGVMaXN0U2VydmljZSB9IGZyb20gJy4vdGFiYmFibGUtbGlzdC5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbdXhUYWJiYWJsZUxpc3RdJyxcbiAgICBleHBvcnRBczogJ3V4LXRhYmJhYmxlLWxpc3QnLFxuICAgIHByb3ZpZGVyczogW1RhYmJhYmxlTGlzdFNlcnZpY2VdXG59KVxuZXhwb3J0IGNsYXNzIFRhYmJhYmxlTGlzdERpcmVjdGl2ZSBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSB7XG5cbiAgICAvKiogRGV0ZXJtaW5lIHdoZXRoZXIgdGhlIHVwL2Rvd24gYXJyb3dzIHNob3VsZCBiZSB1c2VkIG9yIHRoZSBsZWZ0L3JpZ2h0IGFycm93cyAqL1xuICAgIEBJbnB1dCgpIGRpcmVjdGlvbjogJ2hvcml6b250YWwnIHwgJ3ZlcnRpY2FsJyA9ICd2ZXJ0aWNhbCc7XG5cbiAgICAvKiogSW5kaWNhdGUgd2hldGhlciBvciBub3QgZm9jdXMgc2hvdWxkIGxvb3AgYmFjayB0byB0aGUgZmlyc3QgZWxlbWVudCBhZnRlciB0aGUgbGFzdCAqL1xuICAgIEBJbnB1dCgpIHdyYXA6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLyoqIEluZGljYXRlIHdoZXRoZXIgb3Igbm90IHRoZSBmaXJzdCBpdGVtIHNob3VsZCByZWNlaXZlIGZvY3VzIG9uIHNob3cgLSB1c2VmdWwgZm9yIG1vZGFscyBhbmQgcG9wb3ZlcnMgKi9cbiAgICBASW5wdXQoKSBmb2N1c09uU2hvdzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqIEluZGljYXRlIHdoZXRoZXIgb3Igbm90IGZvY3VzIHNob3VsZCBiZSByZXR1cm5lZCB0byB0aGUgcHJldmlvdXMgZWxlbWVudCAob25seSBhcHBsaWNhYmxlIHdoZW4gdXNpbmcgZm9jdXNPblNob3cpICovXG4gICAgQElucHV0KCkgcmV0dXJuRm9jdXM6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKiBFbmFibGluZyBoYW5kbGluZyBvZiBoaWVyYXJjaGljYWwgbGlzdHMgdmlhIHVzZSBvZiB0aGUgYFRhYmJhYmxlTGlzdEl0ZW1EaXJlY3RpdmUucGFyZW50YCBwcm9wZXJ0eS4gKi9cbiAgICBASW5wdXQoKSBzZXQgaGllcmFyY2h5KHZhbHVlOiBib29sZWFuKSB7IHRoaXMuX3RhYmJhYmxlTGlzdC5oaWVyYXJjaHkgPSB2YWx1ZTsgfVxuXG4gICAgLyoqIFByZXZlbnQga2V5Ym9hcmQgaW50ZXJhY3Rpb24gd2hlbiBhbHQgbW9kaWZpZXIga2V5IGlzIHByZXNzZWQgKi9cbiAgICBASW5wdXQoKSBzZXQgYWxsb3dBbHRNb2RpZmllcih2YWx1ZTogYm9vbGVhbikgeyB0aGlzLl90YWJiYWJsZUxpc3QuYWxsb3dBbHRNb2RpZmllciA9IHZhbHVlOyB9XG5cbiAgICAvKiogUHJldmVudCBrZXlib2FyZCBpbnRlcmFjdGlvbiB3aGVuIGN0cmwgbW9kaWZpZXIga2V5IGlzIHByZXNzZWQgKi9cbiAgICBASW5wdXQoKSBzZXQgYWxsb3dDdHJsTW9kaWZpZXIodmFsdWU6IGJvb2xlYW4pIHsgdGhpcy5fdGFiYmFibGVMaXN0LmFsbG93Q3RybE1vZGlmaWVyID0gdmFsdWU7IH1cblxuICAgIC8qKiBGb2N1cyB0aGUgZmlyc3Qgb3IgbGFzdCBpdGVtIHdoZW4gSG9tZSBvciBFbmQga2V5cyBhcmUgcHJlc3NlZCAqL1xuICAgIEBJbnB1dCgpIHNldCBhbGxvd0JvdW5kYXJ5S2V5cyh2YWx1ZTogYm9vbGVhbikgeyB0aGlzLl90YWJiYWJsZUxpc3QuYWxsb3dCb3VuZGFyeUtleXMgPSB2YWx1ZTsgfVxuXG4gICAgLyoqIEZpbmQgYWxsIHRhYmJhYmxlIGxpc3QgaXRlbXMgKi9cbiAgICBAQ29udGVudENoaWxkcmVuKFRhYmJhYmxlTGlzdEl0ZW1EaXJlY3RpdmUsIHsgZGVzY2VuZGFudHM6IHRydWUgfSkgaXRlbXM6IFF1ZXJ5TGlzdDxUYWJiYWJsZUxpc3RJdGVtRGlyZWN0aXZlPjtcblxuICAgIHByaXZhdGUgX2ZvY3VzZWRFbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgICBwcml2YXRlIF9vcmRlcmVkSXRlbXM6IFF1ZXJ5TGlzdDxUYWJiYWJsZUxpc3RJdGVtRGlyZWN0aXZlPjtcblxuICAgIGdldCBmb2N1c0tleU1hbmFnZXIoKTogRm9jdXNLZXlNYW5hZ2VyPFRhYmJhYmxlTGlzdEl0ZW1EaXJlY3RpdmU+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RhYmJhYmxlTGlzdC5mb2N1c0tleU1hbmFnZXI7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfdGFiYmFibGVMaXN0OiBUYWJiYWJsZUxpc3RTZXJ2aWNlKSB7IH1cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcblxuICAgICAgICAvLyBzdG9yZSB0aGUgY3VycmVudGx5IGZvY3VzZWQgZWxlbWVudFxuICAgICAgICB0aGlzLl9mb2N1c2VkRWxlbWVudCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgYXMgSFRNTEVsZW1lbnQ7XG5cbiAgICAgICAgaWYgKHRoaXMuX3RhYmJhYmxlTGlzdC5oaWVyYXJjaHkpIHtcblxuICAgICAgICAgICAgLy8gU29ydCBpdGVtcyBpbiBhIGhpZXJhcmNoeVxuICAgICAgICAgICAgdGhpcy5fb3JkZXJlZEl0ZW1zID0gbmV3IFF1ZXJ5TGlzdDxUYWJiYWJsZUxpc3RJdGVtRGlyZWN0aXZlPigpO1xuICAgICAgICAgICAgdGhpcy5fb3JkZXJlZEl0ZW1zLnJlc2V0KHRoaXMuX3RhYmJhYmxlTGlzdC5zb3J0SXRlbXNCeUhpZXJhcmNoeSh0aGlzLml0ZW1zKSk7XG5cbiAgICAgICAgICAgIC8vIEVuc3VyZSB0aGF0IHRoZSBjaGlsZCBpdGVtcyByZW1haW4gc29ydGVkXG4gICAgICAgICAgICB0aGlzLml0ZW1zLmNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9vcmRlcmVkSXRlbXMucmVzZXQodGhpcy5fdGFiYmFibGVMaXN0LnNvcnRJdGVtc0J5SGllcmFyY2h5KHRoaXMuaXRlbXMpKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9vcmRlcmVkSXRlbXMubm90aWZ5T25DaGFuZ2VzKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAvLyBJdGVtcyBhcmUgYWxyZWFkeSBpbiBvcmRlclxuICAgICAgICAgICAgdGhpcy5fb3JkZXJlZEl0ZW1zID0gdGhpcy5pdGVtcztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFNldCB1cCB0aGUgZm9jdXMgbW9uaXRvcmluZ1xuICAgICAgICB0aGlzLl90YWJiYWJsZUxpc3QuaW5pdGlhbGl6ZSh0aGlzLl9vcmRlcmVkSXRlbXMsIHRoaXMuZGlyZWN0aW9uLCB0aGlzLndyYXApO1xuXG4gICAgICAgIC8vIGZvY3VzIHRoZSBmaXJzdCBlbGVtZW50IGlmIHNwZWNpZmllZFxuICAgICAgICBpZiAodGhpcy5mb2N1c09uU2hvdykge1xuICAgICAgICAgICAgdGhpcy5fdGFiYmFibGVMaXN0LmZvY3VzS2V5TWFuYWdlci5zZXRGaXJzdEl0ZW1BY3RpdmUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5yZXR1cm5Gb2N1cyAmJiB0aGlzLl9mb2N1c2VkRWxlbWVudCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuX2ZvY3VzZWRFbGVtZW50LmZvY3VzKCkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZm9jdXMoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLl90YWJiYWJsZUxpc3QuZm9jdXNLZXlNYW5hZ2VyICYmIHRoaXMuX3RhYmJhYmxlTGlzdC5mb2N1c0tleU1hbmFnZXIuYWN0aXZlSXRlbSkge1xuICAgICAgICAgICAgdGhpcy5fdGFiYmFibGVMaXN0LmZvY3VzS2V5TWFuYWdlci5hY3RpdmVJdGVtLmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmb2N1c1RhYmJhYmxlSXRlbSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fdGFiYmFibGVMaXN0LmZvY3VzVGFiYmFibGVJdGVtKCk7XG4gICAgfVxufVxuIl19