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
    Object.defineProperty(TabbableListDirective.prototype, "allowBoundaryKeys", {
        /** Focus the first or last item when Home or End keys are pressed */
        set: /**
         * Focus the first or last item when Home or End keys are pressed
         * @param {?} value
         * @return {?}
         */
        function (value) { this._tabbableList.allowBoundaryKeys = value; },
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
        allowBoundaryKeys: [{ type: Input }],
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiYmFibGUtbGlzdC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlcy9hY2Nlc3NpYmlsaXR5L3RhYmJhYmxlLWxpc3QvdGFiYmFibGUtbGlzdC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBb0IsZUFBZSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQWEsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFHLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDOztJQTJDMUQsK0JBQW9CLGFBQWtDO1FBQWxDLGtCQUFhLEdBQWIsYUFBYSxDQUFxQjs7Ozt5QkFqQ04sVUFBVTs7OztvQkFHakMsSUFBSTs7OzsyQkFHRyxLQUFLOzs7OzJCQUdMLEtBQUs7S0F3QnNCO0lBckIzRCxzQkFBYSw0Q0FBUztRQUR0QiwwR0FBMEc7Ozs7OztRQUMxRyxVQUF1QixLQUFjLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLEVBQUU7OztPQUFBO0lBR2hGLHNCQUFhLG1EQUFnQjtRQUQ3QixvRUFBb0U7Ozs7OztRQUNwRSxVQUE4QixLQUFjLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUMsRUFBRTs7O09BQUE7SUFHOUYsc0JBQWEsb0RBQWlCO1FBRDlCLHFFQUFxRTs7Ozs7O1FBQ3JFLFVBQStCLEtBQWMsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQyxFQUFFOzs7T0FBQTtJQUdoRyxzQkFBYSxvREFBaUI7UUFEOUIscUVBQXFFOzs7Ozs7UUFDckUsVUFBK0IsS0FBYyxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxDQUFDLEVBQUU7OztPQUFBO0lBUWhHLHNCQUFJLGtEQUFlOzs7O1FBQW5CO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDO1NBQzdDOzs7T0FBQTs7OztJQUlELGtEQUFrQjs7O0lBQWxCO1FBQUEsaUJBOEJDOztRQTNCRyxJQUFJLENBQUMsZUFBZSxxQkFBRyxRQUFRLENBQUMsYUFBNEIsQ0FBQSxDQUFDO1FBRTdELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzs7WUFHL0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLFNBQVMsRUFBNkIsQ0FBQztZQUNoRSxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDOztZQUc5RSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUM7Z0JBQ3pCLEtBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLEtBQUksQ0FBQyxhQUFhLENBQUMsb0JBQW9CLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQzlFLEtBQUksQ0FBQyxhQUFhLENBQUMsZUFBZSxFQUFFLENBQUM7YUFDeEMsQ0FBQyxDQUFDO1NBRU47UUFBQyxJQUFJLENBQUMsQ0FBQzs7WUFHSixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7U0FDbkM7O1FBR0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzs7UUFHN0UsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDbkIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztTQUMzRDtLQUNKOzs7O0lBRUQsMkNBQVc7OztJQUFYO1FBQUEsaUJBSUM7UUFIRyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxlQUFlLFlBQVksV0FBVyxDQUFDLENBQUMsQ0FBQztZQUNsRSxVQUFVLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxFQUFFLEVBQTVCLENBQTRCLENBQUMsQ0FBQztTQUNsRDtLQUNKOzs7O0lBRUQscUNBQUs7OztJQUFMO1FBQ0ksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxlQUFlLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUN0RixJQUFJLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDekQ7S0FDSjs7OztJQUVELGlEQUFpQjs7O0lBQWpCO1FBQ0ksSUFBSSxDQUFDLGFBQWEsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0tBQzFDOztnQkF6RkosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxrQkFBa0I7b0JBQzVCLFFBQVEsRUFBRSxrQkFBa0I7b0JBQzVCLFNBQVMsRUFBRSxDQUFDLG1CQUFtQixDQUFDO2lCQUNuQzs7OztnQkFOUSxtQkFBbUI7Ozs0QkFVdkIsS0FBSzt1QkFHTCxLQUFLOzhCQUdMLEtBQUs7OEJBR0wsS0FBSzs0QkFHTCxLQUFLO21DQUdMLEtBQUs7b0NBR0wsS0FBSztvQ0FHTCxLQUFLO3dCQUdMLGVBQWUsU0FBQyx5QkFBeUIsRUFBRSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUU7O2dDQXJDckU7O1NBVWEscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRm9jdXNLZXlNYW5hZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgQWZ0ZXJDb250ZW50SW5pdCwgQ29udGVudENoaWxkcmVuLCBEaXJlY3RpdmUsIElucHV0LCBPbkRlc3Ryb3ksIFF1ZXJ5TGlzdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVGFiYmFibGVMaXN0SXRlbURpcmVjdGl2ZSB9IGZyb20gJy4vdGFiYmFibGUtbGlzdC1pdGVtLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBUYWJiYWJsZUxpc3RTZXJ2aWNlIH0gZnJvbSAnLi90YWJiYWJsZS1saXN0LnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1t1eFRhYmJhYmxlTGlzdF0nLFxuICAgIGV4cG9ydEFzOiAndXgtdGFiYmFibGUtbGlzdCcsXG4gICAgcHJvdmlkZXJzOiBbVGFiYmFibGVMaXN0U2VydmljZV1cbn0pXG5leHBvcnQgY2xhc3MgVGFiYmFibGVMaXN0RGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95IHtcblxuICAgIC8qKiBEZXRlcm1pbmUgd2hldGhlciB0aGUgdXAvZG93biBhcnJvd3Mgc2hvdWxkIGJlIHVzZWQgb3IgdGhlIGxlZnQvcmlnaHQgYXJyb3dzICovXG4gICAgQElucHV0KCkgZGlyZWN0aW9uOiAnaG9yaXpvbnRhbCcgfCAndmVydGljYWwnID0gJ3ZlcnRpY2FsJztcblxuICAgIC8qKiBJbmRpY2F0ZSB3aGV0aGVyIG9yIG5vdCBmb2N1cyBzaG91bGQgbG9vcCBiYWNrIHRvIHRoZSBmaXJzdCBlbGVtZW50IGFmdGVyIHRoZSBsYXN0ICovXG4gICAgQElucHV0KCkgd3JhcDogYm9vbGVhbiA9IHRydWU7XG5cbiAgICAvKiogSW5kaWNhdGUgd2hldGhlciBvciBub3QgdGhlIGZpcnN0IGl0ZW0gc2hvdWxkIHJlY2VpdmUgZm9jdXMgb24gc2hvdyAtIHVzZWZ1bCBmb3IgbW9kYWxzIGFuZCBwb3BvdmVycyAqL1xuICAgIEBJbnB1dCgpIGZvY3VzT25TaG93OiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKiogSW5kaWNhdGUgd2hldGhlciBvciBub3QgZm9jdXMgc2hvdWxkIGJlIHJldHVybmVkIHRvIHRoZSBwcmV2aW91cyBlbGVtZW50IChvbmx5IGFwcGxpY2FibGUgd2hlbiB1c2luZyBmb2N1c09uU2hvdykgKi9cbiAgICBASW5wdXQoKSByZXR1cm5Gb2N1czogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqIEVuYWJsaW5nIGhhbmRsaW5nIG9mIGhpZXJhcmNoaWNhbCBsaXN0cyB2aWEgdXNlIG9mIHRoZSBgVGFiYmFibGVMaXN0SXRlbURpcmVjdGl2ZS5wYXJlbnRgIHByb3BlcnR5LiAqL1xuICAgIEBJbnB1dCgpIHNldCBoaWVyYXJjaHkodmFsdWU6IGJvb2xlYW4pIHsgdGhpcy5fdGFiYmFibGVMaXN0LmhpZXJhcmNoeSA9IHZhbHVlOyB9XG5cbiAgICAvKiogUHJldmVudCBrZXlib2FyZCBpbnRlcmFjdGlvbiB3aGVuIGFsdCBtb2RpZmllciBrZXkgaXMgcHJlc3NlZCAqL1xuICAgIEBJbnB1dCgpIHNldCBhbGxvd0FsdE1vZGlmaWVyKHZhbHVlOiBib29sZWFuKSB7IHRoaXMuX3RhYmJhYmxlTGlzdC5hbGxvd0FsdE1vZGlmaWVyID0gdmFsdWU7IH1cblxuICAgIC8qKiBQcmV2ZW50IGtleWJvYXJkIGludGVyYWN0aW9uIHdoZW4gY3RybCBtb2RpZmllciBrZXkgaXMgcHJlc3NlZCAqL1xuICAgIEBJbnB1dCgpIHNldCBhbGxvd0N0cmxNb2RpZmllcih2YWx1ZTogYm9vbGVhbikgeyB0aGlzLl90YWJiYWJsZUxpc3QuYWxsb3dDdHJsTW9kaWZpZXIgPSB2YWx1ZTsgfVxuXG4gICAgLyoqIEZvY3VzIHRoZSBmaXJzdCBvciBsYXN0IGl0ZW0gd2hlbiBIb21lIG9yIEVuZCBrZXlzIGFyZSBwcmVzc2VkICovXG4gICAgQElucHV0KCkgc2V0IGFsbG93Qm91bmRhcnlLZXlzKHZhbHVlOiBib29sZWFuKSB7IHRoaXMuX3RhYmJhYmxlTGlzdC5hbGxvd0JvdW5kYXJ5S2V5cyA9IHZhbHVlOyB9XG5cbiAgICAvKiogRmluZCBhbGwgdGFiYmFibGUgbGlzdCBpdGVtcyAqL1xuICAgIEBDb250ZW50Q2hpbGRyZW4oVGFiYmFibGVMaXN0SXRlbURpcmVjdGl2ZSwgeyBkZXNjZW5kYW50czogdHJ1ZSB9KSBpdGVtczogUXVlcnlMaXN0PFRhYmJhYmxlTGlzdEl0ZW1EaXJlY3RpdmU+O1xuXG4gICAgcHJpdmF0ZSBfZm9jdXNlZEVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICAgIHByaXZhdGUgX29yZGVyZWRJdGVtczogUXVlcnlMaXN0PFRhYmJhYmxlTGlzdEl0ZW1EaXJlY3RpdmU+O1xuXG4gICAgZ2V0IGZvY3VzS2V5TWFuYWdlcigpOiBGb2N1c0tleU1hbmFnZXI8VGFiYmFibGVMaXN0SXRlbURpcmVjdGl2ZT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fdGFiYmFibGVMaXN0LmZvY3VzS2V5TWFuYWdlcjtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF90YWJiYWJsZUxpc3Q6IFRhYmJhYmxlTGlzdFNlcnZpY2UpIHsgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xuXG4gICAgICAgIC8vIHN0b3JlIHRoZSBjdXJyZW50bHkgZm9jdXNlZCBlbGVtZW50XG4gICAgICAgIHRoaXMuX2ZvY3VzZWRFbGVtZW50ID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCBhcyBIVE1MRWxlbWVudDtcblxuICAgICAgICBpZiAodGhpcy5fdGFiYmFibGVMaXN0LmhpZXJhcmNoeSkge1xuXG4gICAgICAgICAgICAvLyBTb3J0IGl0ZW1zIGluIGEgaGllcmFyY2h5XG4gICAgICAgICAgICB0aGlzLl9vcmRlcmVkSXRlbXMgPSBuZXcgUXVlcnlMaXN0PFRhYmJhYmxlTGlzdEl0ZW1EaXJlY3RpdmU+KCk7XG4gICAgICAgICAgICB0aGlzLl9vcmRlcmVkSXRlbXMucmVzZXQodGhpcy5fdGFiYmFibGVMaXN0LnNvcnRJdGVtc0J5SGllcmFyY2h5KHRoaXMuaXRlbXMpKTtcblxuICAgICAgICAgICAgLy8gRW5zdXJlIHRoYXQgdGhlIGNoaWxkIGl0ZW1zIHJlbWFpbiBzb3J0ZWRcbiAgICAgICAgICAgIHRoaXMuaXRlbXMuY2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX29yZGVyZWRJdGVtcy5yZXNldCh0aGlzLl90YWJiYWJsZUxpc3Quc29ydEl0ZW1zQnlIaWVyYXJjaHkodGhpcy5pdGVtcykpO1xuICAgICAgICAgICAgICAgIHRoaXMuX29yZGVyZWRJdGVtcy5ub3RpZnlPbkNoYW5nZXMoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIC8vIEl0ZW1zIGFyZSBhbHJlYWR5IGluIG9yZGVyXG4gICAgICAgICAgICB0aGlzLl9vcmRlcmVkSXRlbXMgPSB0aGlzLml0ZW1zO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gU2V0IHVwIHRoZSBmb2N1cyBtb25pdG9yaW5nXG4gICAgICAgIHRoaXMuX3RhYmJhYmxlTGlzdC5pbml0aWFsaXplKHRoaXMuX29yZGVyZWRJdGVtcywgdGhpcy5kaXJlY3Rpb24sIHRoaXMud3JhcCk7XG5cbiAgICAgICAgLy8gZm9jdXMgdGhlIGZpcnN0IGVsZW1lbnQgaWYgc3BlY2lmaWVkXG4gICAgICAgIGlmICh0aGlzLmZvY3VzT25TaG93KSB7XG4gICAgICAgICAgICB0aGlzLl90YWJiYWJsZUxpc3QuZm9jdXNLZXlNYW5hZ2VyLnNldEZpcnN0SXRlbUFjdGl2ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnJldHVybkZvY3VzICYmIHRoaXMuX2ZvY3VzZWRFbGVtZW50IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5fZm9jdXNlZEVsZW1lbnQuZm9jdXMoKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmb2N1cygpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX3RhYmJhYmxlTGlzdC5mb2N1c0tleU1hbmFnZXIgJiYgdGhpcy5fdGFiYmFibGVMaXN0LmZvY3VzS2V5TWFuYWdlci5hY3RpdmVJdGVtKSB7XG4gICAgICAgICAgICB0aGlzLl90YWJiYWJsZUxpc3QuZm9jdXNLZXlNYW5hZ2VyLmFjdGl2ZUl0ZW0uZm9jdXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZvY3VzVGFiYmFibGVJdGVtKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl90YWJiYWJsZUxpc3QuZm9jdXNUYWJiYWJsZUl0ZW0oKTtcbiAgICB9XG59XG4iXX0=