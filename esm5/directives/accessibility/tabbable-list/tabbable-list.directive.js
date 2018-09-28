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
    Object.defineProperty(TabbableListDirective.prototype, "hierarchy", {
        /** Enabling handling of hierarchical lists via use of the `TabbableListItemDirective.parent` property. */
        set: /**
         * Enabling handling of hierarchical lists via use of the `TabbableListItemDirective.parent` property.
         * @param {?} value
         * @return {?}
         */
        function (value) { this._tabbableList.hierarchy = value; },
        enumerable: true,
        configurable: true
    });
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
        var _this = this;
        // store the currently focused element
        this._focusedElement = /** @type {?} */ (document.activeElement);
        if (this._tabbableList.hierarchy) {
            // Sort items in a hierarchy
            this._orderedItems = new QueryList();
            this._orderedItems.reset(this._tabbableList.sortItemsByHierarchy(this.items));
            // Ensure that the child items remain sorted
            this.items.changes.subscribe(function () {
                _this._orderedItems.reset(_this._tabbableList.sortItemsByHierarchy(_this.items));
                _this._orderedItems.notifyOnChanges();
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
        hierarchy: [{ type: Input }],
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
    TabbableListDirective.prototype._orderedItems;
    /** @type {?} */
    TabbableListDirective.prototype._tabbableList;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiYmFibGUtbGlzdC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlcy9hY2Nlc3NpYmlsaXR5L3RhYmJhYmxlLWxpc3QvdGFiYmFibGUtbGlzdC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBb0IsZUFBZSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQWEsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFHLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDOztJQXdDMUQsK0JBQW9CLGFBQWtDO1FBQWxDLGtCQUFhLEdBQWIsYUFBYSxDQUFxQjs7Ozt5QkE5Qk4sVUFBVTs7OztvQkFHakMsSUFBSTs7OzsyQkFHRyxLQUFLOzs7OzJCQUdMLEtBQUs7S0FxQnNCO0lBbEIzRCxzQkFBYSw0Q0FBUztRQUR0QiwwR0FBMEc7Ozs7OztRQUMxRyxVQUF1QixLQUFjLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLEVBQUU7OztPQUFBO0lBR2hGLHNCQUFhLG1EQUFnQjtRQUQ3QixvRUFBb0U7Ozs7OztRQUNwRSxVQUE4QixLQUFjLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUMsRUFBRTs7O09BQUE7SUFHOUYsc0JBQWEsb0RBQWlCO1FBRDlCLHFFQUFxRTs7Ozs7O1FBQ3JFLFVBQStCLEtBQWMsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQyxFQUFFOzs7T0FBQTtJQVFoRyxzQkFBSSxrREFBZTs7OztRQUFuQjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQztTQUM3Qzs7O09BQUE7Ozs7SUFJRCxrREFBa0I7OztJQUFsQjtRQUFBLGlCQThCQzs7UUEzQkcsSUFBSSxDQUFDLGVBQWUscUJBQUcsUUFBUSxDQUFDLGFBQTRCLENBQUEsQ0FBQztRQUU3RCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7O1lBRy9CLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxTQUFTLEVBQTZCLENBQUM7WUFDaEUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzs7WUFHOUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDO2dCQUN6QixLQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxLQUFJLENBQUMsYUFBYSxDQUFDLG9CQUFvQixDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUM5RSxLQUFJLENBQUMsYUFBYSxDQUFDLGVBQWUsRUFBRSxDQUFDO2FBQ3hDLENBQUMsQ0FBQztTQUVOO1FBQUMsSUFBSSxDQUFDLENBQUM7O1lBR0osSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1NBQ25DOztRQUdELElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7O1FBRzdFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ25CLElBQUksQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLGtCQUFrQixFQUFFLENBQUM7U0FDM0Q7S0FDSjs7OztJQUVELDJDQUFXOzs7SUFBWDtRQUFBLGlCQUlDO1FBSEcsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsZUFBZSxZQUFZLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDbEUsVUFBVSxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssRUFBRSxFQUE1QixDQUE0QixDQUFDLENBQUM7U0FDbEQ7S0FDSjs7OztJQUVELHFDQUFLOzs7SUFBTDtRQUNJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsZUFBZSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDdEYsSUFBSSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ3pEO0tBQ0o7Ozs7SUFFRCxpREFBaUI7OztJQUFqQjtRQUNJLElBQUksQ0FBQyxhQUFhLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztLQUMxQzs7Z0JBdEZKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsa0JBQWtCO29CQUM1QixRQUFRLEVBQUUsa0JBQWtCO29CQUM1QixTQUFTLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQztpQkFDbkM7Ozs7Z0JBTlEsbUJBQW1COzs7NEJBVXZCLEtBQUs7dUJBR0wsS0FBSzs4QkFHTCxLQUFLOzhCQUdMLEtBQUs7NEJBR0wsS0FBSzttQ0FHTCxLQUFLO29DQUdMLEtBQUs7d0JBR0wsZUFBZSxTQUFDLHlCQUF5QixFQUFFLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRTs7Z0NBbENyRTs7U0FVYSxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGb2N1c0tleU1hbmFnZXIgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQgeyBBZnRlckNvbnRlbnRJbml0LCBDb250ZW50Q2hpbGRyZW4sIERpcmVjdGl2ZSwgSW5wdXQsIE9uRGVzdHJveSwgUXVlcnlMaXN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUYWJiYWJsZUxpc3RJdGVtRGlyZWN0aXZlIH0gZnJvbSAnLi90YWJiYWJsZS1saXN0LWl0ZW0uZGlyZWN0aXZlJztcbmltcG9ydCB7IFRhYmJhYmxlTGlzdFNlcnZpY2UgfSBmcm9tICcuL3RhYmJhYmxlLWxpc3Quc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3V4VGFiYmFibGVMaXN0XScsXG4gICAgZXhwb3J0QXM6ICd1eC10YWJiYWJsZS1saXN0JyxcbiAgICBwcm92aWRlcnM6IFtUYWJiYWJsZUxpc3RTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBUYWJiYWJsZUxpc3REaXJlY3RpdmUgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgLyoqIERldGVybWluZSB3aGV0aGVyIHRoZSB1cC9kb3duIGFycm93cyBzaG91bGQgYmUgdXNlZCBvciB0aGUgbGVmdC9yaWdodCBhcnJvd3MgKi9cbiAgICBASW5wdXQoKSBkaXJlY3Rpb246ICdob3Jpem9udGFsJyB8ICd2ZXJ0aWNhbCcgPSAndmVydGljYWwnO1xuXG4gICAgLyoqIEluZGljYXRlIHdoZXRoZXIgb3Igbm90IGZvY3VzIHNob3VsZCBsb29wIGJhY2sgdG8gdGhlIGZpcnN0IGVsZW1lbnQgYWZ0ZXIgdGhlIGxhc3QgKi9cbiAgICBASW5wdXQoKSB3cmFwOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIC8qKiBJbmRpY2F0ZSB3aGV0aGVyIG9yIG5vdCB0aGUgZmlyc3QgaXRlbSBzaG91bGQgcmVjZWl2ZSBmb2N1cyBvbiBzaG93IC0gdXNlZnVsIGZvciBtb2RhbHMgYW5kIHBvcG92ZXJzICovXG4gICAgQElucHV0KCkgZm9jdXNPblNob3c6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKiBJbmRpY2F0ZSB3aGV0aGVyIG9yIG5vdCBmb2N1cyBzaG91bGQgYmUgcmV0dXJuZWQgdG8gdGhlIHByZXZpb3VzIGVsZW1lbnQgKG9ubHkgYXBwbGljYWJsZSB3aGVuIHVzaW5nIGZvY3VzT25TaG93KSAqL1xuICAgIEBJbnB1dCgpIHJldHVybkZvY3VzOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKiogRW5hYmxpbmcgaGFuZGxpbmcgb2YgaGllcmFyY2hpY2FsIGxpc3RzIHZpYSB1c2Ugb2YgdGhlIGBUYWJiYWJsZUxpc3RJdGVtRGlyZWN0aXZlLnBhcmVudGAgcHJvcGVydHkuICovXG4gICAgQElucHV0KCkgc2V0IGhpZXJhcmNoeSh2YWx1ZTogYm9vbGVhbikgeyB0aGlzLl90YWJiYWJsZUxpc3QuaGllcmFyY2h5ID0gdmFsdWU7IH1cblxuICAgIC8qKiBQcmV2ZW50IGtleWJvYXJkIGludGVyYWN0aW9uIHdoZW4gYWx0IG1vZGlmaWVyIGtleSBpcyBwcmVzc2VkICovXG4gICAgQElucHV0KCkgc2V0IGFsbG93QWx0TW9kaWZpZXIodmFsdWU6IGJvb2xlYW4pIHsgdGhpcy5fdGFiYmFibGVMaXN0LmFsbG93QWx0TW9kaWZpZXIgPSB2YWx1ZTsgfVxuXG4gICAgLyoqIFByZXZlbnQga2V5Ym9hcmQgaW50ZXJhY3Rpb24gd2hlbiBjdHJsIG1vZGlmaWVyIGtleSBpcyBwcmVzc2VkICovXG4gICAgQElucHV0KCkgc2V0IGFsbG93Q3RybE1vZGlmaWVyKHZhbHVlOiBib29sZWFuKSB7IHRoaXMuX3RhYmJhYmxlTGlzdC5hbGxvd0N0cmxNb2RpZmllciA9IHZhbHVlOyB9XG5cbiAgICAvKiogRmluZCBhbGwgdGFiYmFibGUgbGlzdCBpdGVtcyAqL1xuICAgIEBDb250ZW50Q2hpbGRyZW4oVGFiYmFibGVMaXN0SXRlbURpcmVjdGl2ZSwgeyBkZXNjZW5kYW50czogdHJ1ZSB9KSBpdGVtczogUXVlcnlMaXN0PFRhYmJhYmxlTGlzdEl0ZW1EaXJlY3RpdmU+O1xuXG4gICAgcHJpdmF0ZSBfZm9jdXNlZEVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICAgIHByaXZhdGUgX29yZGVyZWRJdGVtczogUXVlcnlMaXN0PFRhYmJhYmxlTGlzdEl0ZW1EaXJlY3RpdmU+O1xuXG4gICAgZ2V0IGZvY3VzS2V5TWFuYWdlcigpOiBGb2N1c0tleU1hbmFnZXI8VGFiYmFibGVMaXN0SXRlbURpcmVjdGl2ZT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fdGFiYmFibGVMaXN0LmZvY3VzS2V5TWFuYWdlcjtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF90YWJiYWJsZUxpc3Q6IFRhYmJhYmxlTGlzdFNlcnZpY2UpIHsgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xuXG4gICAgICAgIC8vIHN0b3JlIHRoZSBjdXJyZW50bHkgZm9jdXNlZCBlbGVtZW50XG4gICAgICAgIHRoaXMuX2ZvY3VzZWRFbGVtZW50ID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCBhcyBIVE1MRWxlbWVudDtcblxuICAgICAgICBpZiAodGhpcy5fdGFiYmFibGVMaXN0LmhpZXJhcmNoeSkge1xuXG4gICAgICAgICAgICAvLyBTb3J0IGl0ZW1zIGluIGEgaGllcmFyY2h5XG4gICAgICAgICAgICB0aGlzLl9vcmRlcmVkSXRlbXMgPSBuZXcgUXVlcnlMaXN0PFRhYmJhYmxlTGlzdEl0ZW1EaXJlY3RpdmU+KCk7XG4gICAgICAgICAgICB0aGlzLl9vcmRlcmVkSXRlbXMucmVzZXQodGhpcy5fdGFiYmFibGVMaXN0LnNvcnRJdGVtc0J5SGllcmFyY2h5KHRoaXMuaXRlbXMpKTtcblxuICAgICAgICAgICAgLy8gRW5zdXJlIHRoYXQgdGhlIGNoaWxkIGl0ZW1zIHJlbWFpbiBzb3J0ZWRcbiAgICAgICAgICAgIHRoaXMuaXRlbXMuY2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX29yZGVyZWRJdGVtcy5yZXNldCh0aGlzLl90YWJiYWJsZUxpc3Quc29ydEl0ZW1zQnlIaWVyYXJjaHkodGhpcy5pdGVtcykpO1xuICAgICAgICAgICAgICAgIHRoaXMuX29yZGVyZWRJdGVtcy5ub3RpZnlPbkNoYW5nZXMoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIC8vIEl0ZW1zIGFyZSBhbHJlYWR5IGluIG9yZGVyXG4gICAgICAgICAgICB0aGlzLl9vcmRlcmVkSXRlbXMgPSB0aGlzLml0ZW1zO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gU2V0IHVwIHRoZSBmb2N1cyBtb25pdG9yaW5nXG4gICAgICAgIHRoaXMuX3RhYmJhYmxlTGlzdC5pbml0aWFsaXplKHRoaXMuX29yZGVyZWRJdGVtcywgdGhpcy5kaXJlY3Rpb24sIHRoaXMud3JhcCk7XG5cbiAgICAgICAgLy8gZm9jdXMgdGhlIGZpcnN0IGVsZW1lbnQgaWYgc3BlY2lmaWVkXG4gICAgICAgIGlmICh0aGlzLmZvY3VzT25TaG93KSB7XG4gICAgICAgICAgICB0aGlzLl90YWJiYWJsZUxpc3QuZm9jdXNLZXlNYW5hZ2VyLnNldEZpcnN0SXRlbUFjdGl2ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnJldHVybkZvY3VzICYmIHRoaXMuX2ZvY3VzZWRFbGVtZW50IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5fZm9jdXNlZEVsZW1lbnQuZm9jdXMoKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmb2N1cygpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX3RhYmJhYmxlTGlzdC5mb2N1c0tleU1hbmFnZXIgJiYgdGhpcy5fdGFiYmFibGVMaXN0LmZvY3VzS2V5TWFuYWdlci5hY3RpdmVJdGVtKSB7XG4gICAgICAgICAgICB0aGlzLl90YWJiYWJsZUxpc3QuZm9jdXNLZXlNYW5hZ2VyLmFjdGl2ZUl0ZW0uZm9jdXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZvY3VzVGFiYmFibGVJdGVtKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl90YWJiYWJsZUxpc3QuZm9jdXNUYWJiYWJsZUl0ZW0oKTtcbiAgICB9XG59XG4iXX0=