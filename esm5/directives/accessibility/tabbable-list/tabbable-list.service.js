/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { FocusKeyManager } from '@angular/cdk/a11y';
import { DOWN_ARROW, END, HOME, LEFT_ARROW, RIGHT_ARROW, UP_ARROW } from '@angular/cdk/keycodes';
import { Injectable } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
var TabbableListService = /** @class */ (function () {
    function TabbableListService() {
        this.hierarchy = false;
        this.allowAltModifier = true;
        this.allowCtrlModifier = true;
        this.allowBoundaryKeys = false;
        this._onDestroy = new Subject();
    }
    /**
     * @return {?}
     */
    TabbableListService.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._onDestroy.next();
        this._onDestroy.complete();
    };
    /**
     * @param {?} items
     * @param {?} direction
     * @param {?} wrap
     * @return {?}
     */
    TabbableListService.prototype.initialize = /**
     * @param {?} items
     * @param {?} direction
     * @param {?} wrap
     * @return {?}
     */
    function (items, direction, wrap) {
        var _this = this;
        // store the items
        this._items = items;
        // create the new focus key manager
        this.focusKeyManager = new FocusKeyManager(items);
        // set the direction of the list
        direction === 'vertical' ? this.focusKeyManager.withVerticalOrientation() : this.focusKeyManager.withHorizontalOrientation('ltr');
        this._direction = direction;
        // enable wrapping if required
        if (wrap) {
            this.focusKeyManager.withWrap();
        }
        // make sure the first item in the list is tabbable
        this.setFirstItemTabbable();
        // call the init function on each item
        this._items.forEach(function (item) { return item.onInit(); });
        // if the list changes we need to ensure there is always at least one tabbable item
        this._items.changes.pipe(takeUntil(this._onDestroy)).subscribe(function () {
            // call the on init function on any new items
            // call the on init function on any new items
            _this._items.filter(function (item) { return !item.initialized; }).forEach(function (item) { return item.onInit(); });
            // ensure there is at least one item tabbable at all times
            // ensure there is at least one item tabbable at all times
            _this.ensureTabbableItem();
        });
    };
    /**
     * @param {?} item
     * @return {?}
     */
    TabbableListService.prototype.activate = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        if (!item) {
            return;
        }
        // get the item index
        var /** @type {?} */ index = this._items.toArray().indexOf(item);
        // active the item if it is not already active
        if (this.focusKeyManager.activeItemIndex !== index) {
            this.focusKeyManager.setActiveItem(index);
        }
    };
    /**
     * @param {?} item
     * @return {?}
     */
    TabbableListService.prototype.isItemActive = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        return this.focusKeyManager.activeItem.id === item.id;
    };
    /**
     * @return {?}
     */
    TabbableListService.prototype.setFirstItemTabbable = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // delay to prevent expression changed after check error
        requestAnimationFrame(function () {
            // find the first item that is not disabled
            var /** @type {?} */ first = _this._items.find(function (item) { return !item.disabled; });
            if (first) {
                first.tabindex = 0;
            }
        });
    };
    /**
     * @return {?}
     */
    TabbableListService.prototype.ensureTabbableItem = /**
     * @return {?}
     */
    function () {
        // check to see if any item is tabbable
        var /** @type {?} */ active = this._items.find(function (item) { return item.tabindex === 0; });
        if (!active) {
            this.setFirstItemTabbable();
        }
    };
    /**
     * @return {?}
     */
    TabbableListService.prototype.focusTabbableItem = /**
     * @return {?}
     */
    function () {
        if (!this._items) {
            return;
        }
        // find the item in the list with a tab index
        var /** @type {?} */ index = this._items.toArray().findIndex(function (item) { return item.tabindex === 0; });
        // if an item was found then focus it
        if (index !== -1) {
            this.focusKeyManager.setActiveItem(index);
        }
    };
    /**
     * @param {?} source
     * @param {?} event
     * @return {?}
     */
    TabbableListService.prototype.onKeydown = /**
     * @param {?} source
     * @param {?} event
     * @return {?}
     */
    function (source, event) {
        // prevent anything happening when modifier keys are pressed if they have been disabled
        if (!this.allowAltModifier && event.altKey || !this.allowCtrlModifier && event.ctrlKey) {
            return;
        }
        this.focusKeyManager.onKeydown(event);
        // if the key is a boundary key and boundary keys are enabled
        if (this.allowBoundaryKeys) {
            switch (event.which) {
                case HOME:
                    this.focusKeyManager.setFirstItemActive();
                    event.preventDefault();
                    break;
                case END:
                    this.focusKeyManager.setLastItemActive();
                    event.preventDefault();
                    break;
            }
        }
        if (this.hierarchy) {
            if ((this._direction === 'horizontal' && event.keyCode === DOWN_ARROW) ||
                (this._direction === 'vertical' && event.keyCode === RIGHT_ARROW)) {
                source.keyboardExpanded$.next(true);
            }
            else if ((this._direction === 'horizontal' && event.keyCode === UP_ARROW) ||
                (this._direction === 'vertical' && event.keyCode === LEFT_ARROW)) {
                if (source.children.length > 0 && source.expanded) {
                    source.keyboardExpanded$.next(false);
                }
                else if (source.parent) {
                    source.parent.keyboardExpanded$.next(false);
                }
            }
        }
    };
    /**
     * @param {?} list
     * @return {?}
     */
    TabbableListService.prototype.sortItemsByHierarchy = /**
     * @param {?} list
     * @return {?}
     */
    function (list) {
        var /** @type {?} */ topLevel = [];
        // Populating children - clear previously generated collection
        list.forEach(function (item) { return item.children = []; });
        // Populating children - map from child -> parent relationship
        list.forEach(function (item) {
            if (item.parent) {
                item.parent.children.push(item);
            }
            else {
                topLevel.push(item);
            }
        });
        // Flatten the tree to produce the cursor key order
        return this.flattenHierarchy(topLevel);
    };
    /**
     * @param {?} items
     * @return {?}
     */
    TabbableListService.prototype.flattenHierarchy = /**
     * @param {?} items
     * @return {?}
     */
    function (items) {
        var _this = this;
        var /** @type {?} */ flatList = [];
        items.forEach(function (item) {
            item.children.sort(function (a, b) { return a.rank - b.rank; });
            flatList.push.apply(flatList, tslib_1.__spread([item], _this.flattenHierarchy(item.children)));
        });
        return flatList;
    };
    TabbableListService.decorators = [
        { type: Injectable }
    ];
    return TabbableListService;
}());
export { TabbableListService };
function TabbableListService_tsickle_Closure_declarations() {
    /** @type {?} */
    TabbableListService.prototype.hierarchy;
    /** @type {?} */
    TabbableListService.prototype.allowAltModifier;
    /** @type {?} */
    TabbableListService.prototype.allowCtrlModifier;
    /** @type {?} */
    TabbableListService.prototype.allowBoundaryKeys;
    /** @type {?} */
    TabbableListService.prototype.focusKeyManager;
    /** @type {?} */
    TabbableListService.prototype._items;
    /** @type {?} */
    TabbableListService.prototype._direction;
    /** @type {?} */
    TabbableListService.prototype._onDestroy;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiYmFibGUtbGlzdC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvYWNjZXNzaWJpbGl0eS90YWJiYWJsZS1saXN0L3RhYmJhYmxlLWxpc3Quc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNqRyxPQUFPLEVBQUUsVUFBVSxFQUF3QixNQUFNLGVBQWUsQ0FBQztBQUNqRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGNBQWMsQ0FBQzs7O3lCQU1kLEtBQUs7Z0NBQ0UsSUFBSTtpQ0FDSCxJQUFJO2lDQUNKLEtBQUs7MEJBS2IsSUFBSSxPQUFPLEVBQVE7Ozs7O0lBRXhDLHlDQUFXOzs7SUFBWDtRQUNJLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUM5Qjs7Ozs7OztJQUVELHdDQUFVOzs7Ozs7SUFBVixVQUFXLEtBQTJDLEVBQUUsU0FBb0MsRUFBRSxJQUFhO1FBQTNHLGlCQWdDQzs7UUE3QkcsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7O1FBR3BCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7O1FBR2xELFNBQVMsS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsdUJBQXVCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUs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QUM7Z0JBQ0osUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUN2QjtTQUNKLENBQUMsQ0FBQzs7UUFHSCxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0tBQzFDOzs7OztJQUVPLDhDQUFnQjs7OztjQUFDLEtBQWtDOztRQUN2RCxxQkFBTSxRQUFRLEdBQWdDLEVBQUUsQ0FBQztRQUNqRCxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSTtZQUNkLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSyxPQUFBLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBZixDQUFlLENBQUMsQ0FBQztZQUM5QyxRQUFRLENBQUMsSUFBSSxPQUFiLFFBQVEsb0JBQU0sSUFBSSxHQUFLLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUU7U0FDaEUsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLFFBQVEsQ0FBQzs7O2dCQS9LdkIsVUFBVTs7OEJBUFg7O1NBUWEsbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRm9jdXNLZXlNYW5hZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgRE9XTl9BUlJPVywgRU5ELCBIT01FLCBMRUZUX0FSUk9XLCBSSUdIVF9BUlJPVywgVVBfQVJST1cgfSBmcm9tICdAYW5ndWxhci9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSwgT25EZXN0cm95LCBRdWVyeUxpc3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzL1N1YmplY3QnO1xuaW1wb3J0IHsgVGFiYmFibGVMaXN0SXRlbURpcmVjdGl2ZSB9IGZyb20gJy4vdGFiYmFibGUtbGlzdC1pdGVtLmRpcmVjdGl2ZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBUYWJiYWJsZUxpc3RTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICAgIGhpZXJhcmNoeTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGFsbG93QWx0TW9kaWZpZXI6IGJvb2xlYW4gPSB0cnVlO1xuICAgIGFsbG93Q3RybE1vZGlmaWVyOiBib29sZWFuID0gdHJ1ZTtcbiAgICBhbGxvd0JvdW5kYXJ5S2V5czogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGZvY3VzS2V5TWFuYWdlcjogRm9jdXNLZXlNYW5hZ2VyPFRhYmJhYmxlTGlzdEl0ZW1EaXJlY3RpdmU+O1xuXG4gICAgcHJpdmF0ZSBfaXRlbXM6IFF1ZXJ5TGlzdDxUYWJiYWJsZUxpc3RJdGVtRGlyZWN0aXZlPjtcbiAgICBwcml2YXRlIF9kaXJlY3Rpb246ICdob3Jpem9udGFsJyB8ICd2ZXJ0aWNhbCc7XG4gICAgcHJpdmF0ZSBfb25EZXN0cm95ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9vbkRlc3Ryb3kubmV4dCgpO1xuICAgICAgICB0aGlzLl9vbkRlc3Ryb3kuY29tcGxldGUoKTtcbiAgICB9XG5cbiAgICBpbml0aWFsaXplKGl0ZW1zOiBRdWVyeUxpc3Q8VGFiYmFibGVMaXN0SXRlbURpcmVjdGl2ZT4sIGRpcmVjdGlvbjogJ2hvcml6b250YWwnIHwgJ3ZlcnRpY2FsJywgd3JhcDogYm9vbGVhbik6IHZvaWQge1xuXG4gICAgICAgIC8vIHN0b3JlIHRoZSBpdGVtc1xuICAgICAgICB0aGlzLl9pdGVtcyA9IGl0ZW1zO1xuXG4gICAgICAgIC8vIGNyZWF0ZSB0aGUgbmV3IGZvY3VzIGtleSBtYW5hZ2VyXG4gICAgICAgIHRoaXMuZm9jdXNLZXlNYW5hZ2VyID0gbmV3IEZvY3VzS2V5TWFuYWdlcihpdGVtcyk7XG5cbiAgICAgICAgLy8gc2V0IHRoZSBkaXJlY3Rpb24gb2YgdGhlIGxpc3RcbiAgICAgICAgZGlyZWN0aW9uID09PSAndmVydGljYWwnID8gdGhpcy5mb2N1c0tleU1hbmFnZXIud2l0aFZlcnRpY2FsT3JpZW50YXRpb24oKSA6IHRoaXMuZm9jdXNLZXlNYW5hZ2VyLndpdGhIb3Jpem9udGFsT3JpZW50YXRpb24oJ2x0cicpO1xuICAgICAgICB0aGlzLl9kaXJlY3Rpb24gPSBkaXJlY3Rpb247XG5cbiAgICAgICAgLy8gZW5hYmxlIHdyYXBwaW5nIGlmIHJlcXVpcmVkXG4gICAgICAgIGlmICh3cmFwKSB7XG4gICAgICAgICAgICB0aGlzLmZvY3VzS2V5TWFuYWdlci53aXRoV3JhcCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gbWFrZSBzdXJlIHRoZSBmaXJzdCBpdGVtIGluIHRoZSBsaXN0IGlzIHRhYmJhYmxlXG4gICAgICAgIHRoaXMuc2V0Rmlyc3RJdGVtVGFiYmFibGUoKTtcblxuICAgICAgICAvLyBjYWxsIHRoZSBpbml0IGZ1bmN0aW9uIG9uIGVhY2ggaXRlbVxuICAgICAgICB0aGlzLl9pdGVtcy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5vbkluaXQoKSk7XG5cbiAgICAgICAgLy8gaWYgdGhlIGxpc3QgY2hhbmdlcyB3ZSBuZWVkIHRvIGVuc3VyZSB0aGVyZSBpcyBhbHdheXMgYXQgbGVhc3Qgb25lIHRhYmJhYmxlIGl0ZW1cbiAgICAgICAgdGhpcy5faXRlbXMuY2hhbmdlcy5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKS5zdWJzY3JpYmUoKCkgPT4ge1xuXG4gICAgICAgICAgICAvLyBjYWxsIHRoZSBvbiBpbml0IGZ1bmN0aW9uIG9uIGFueSBuZXcgaXRlbXNcbiAgICAgICAgICAgIHRoaXMuX2l0ZW1zLmZpbHRlcihpdGVtID0+ICFpdGVtLmluaXRpYWxpemVkKS5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5vbkluaXQoKSk7XG5cbiAgICAgICAgICAgIC8vIGVuc3VyZSB0aGVyZSBpcyBhdCBsZWFzdCBvbmUgaXRlbSB0YWJiYWJsZSBhdCBhbGwgdGltZXNcbiAgICAgICAgICAgIHRoaXMuZW5zdXJlVGFiYmFibGVJdGVtKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGFjdGl2YXRlKGl0ZW06IFRhYmJhYmxlTGlzdEl0ZW1EaXJlY3RpdmUpOiB2b2lkIHtcblxuICAgICAgICBpZiAoIWl0ZW0pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGdldCB0aGUgaXRlbSBpbmRleFxuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuX2l0ZW1zLnRvQXJyYXkoKS5pbmRleE9mKGl0ZW0pO1xuXG4gICAgICAgIC8vIGFjdGl2ZSB0aGUgaXRlbSBpZiBpdCBpcyBub3QgYWxyZWFkeSBhY3RpdmVcbiAgICAgICAgaWYgKHRoaXMuZm9jdXNLZXlNYW5hZ2VyLmFjdGl2ZUl0ZW1JbmRleCAhPT0gaW5kZXgpIHtcbiAgICAgICAgICAgIHRoaXMuZm9jdXNLZXlNYW5hZ2VyLnNldEFjdGl2ZUl0ZW0oaW5kZXgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaXNJdGVtQWN0aXZlKGl0ZW06IFRhYmJhYmxlTGlzdEl0ZW1EaXJlY3RpdmUpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9jdXNLZXlNYW5hZ2VyLmFjdGl2ZUl0ZW0uaWQgPT09IGl0ZW0uaWQ7XG4gICAgfVxuXG4gICAgc2V0Rmlyc3RJdGVtVGFiYmFibGUoKTogdm9pZCB7XG4gICAgICAgIC8vIGRlbGF5IHRvIHByZXZlbnQgZXhwcmVzc2lvbiBjaGFuZ2VkIGFmdGVyIGNoZWNrIGVycm9yXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgICAgICAvLyBmaW5kIHRoZSBmaXJzdCBpdGVtIHRoYXQgaXMgbm90IGRpc2FibGVkXG4gICAgICAgICAgICBjb25zdCBmaXJzdCA9IHRoaXMuX2l0ZW1zLmZpbmQoaXRlbSA9PiAhaXRlbS5kaXNhYmxlZCk7XG5cbiAgICAgICAgICAgIGlmIChmaXJzdCkge1xuICAgICAgICAgICAgICAgIGZpcnN0LnRhYmluZGV4ID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZW5zdXJlVGFiYmFibGVJdGVtKCk6IHZvaWQge1xuICAgICAgICAvLyBjaGVjayB0byBzZWUgaWYgYW55IGl0ZW0gaXMgdGFiYmFibGVcbiAgICAgICAgY29uc3QgYWN0aXZlID0gdGhpcy5faXRlbXMuZmluZChpdGVtID0+IGl0ZW0udGFiaW5kZXggPT09IDApO1xuXG4gICAgICAgIGlmICghYWN0aXZlKSB7XG4gICAgICAgICAgICB0aGlzLnNldEZpcnN0SXRlbVRhYmJhYmxlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmb2N1c1RhYmJhYmxlSXRlbSgpOiB2b2lkIHtcblxuICAgICAgICBpZiAoIXRoaXMuX2l0ZW1zKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBmaW5kIHRoZSBpdGVtIGluIHRoZSBsaXN0IHdpdGggYSB0YWIgaW5kZXhcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLl9pdGVtcy50b0FycmF5KCkuZmluZEluZGV4KGl0ZW0gPT4gaXRlbS50YWJpbmRleCA9PT0gMCk7XG5cbiAgICAgICAgLy8gaWYgYW4gaXRlbSB3YXMgZm91bmQgdGhlbiBmb2N1cyBpdFxuICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLmZvY3VzS2V5TWFuYWdlci5zZXRBY3RpdmVJdGVtKGluZGV4KTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgb25LZXlkb3duKHNvdXJjZTogVGFiYmFibGVMaXN0SXRlbURpcmVjdGl2ZSwgZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiBhbnkge1xuXG4gICAgICAgIC8vIHByZXZlbnQgYW55dGhpbmcgaGFwcGVuaW5nIHdoZW4gbW9kaWZpZXIga2V5cyBhcmUgcHJlc3NlZCBpZiB0aGV5IGhhdmUgYmVlbiBkaXNhYmxlZFxuICAgICAgICBpZiAoIXRoaXMuYWxsb3dBbHRNb2RpZmllciAmJiBldmVudC5hbHRLZXkgfHwgIXRoaXMuYWxsb3dDdHJsTW9kaWZpZXIgJiYgZXZlbnQuY3RybEtleSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5mb2N1c0tleU1hbmFnZXIub25LZXlkb3duKGV2ZW50KTtcblxuICAgICAgICAvLyBpZiB0aGUga2V5IGlzIGEgYm91bmRhcnkga2V5IGFuZCBib3VuZGFyeSBrZXlzIGFyZSBlbmFibGVkXG4gICAgICAgIGlmICh0aGlzLmFsbG93Qm91bmRhcnlLZXlzKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKGV2ZW50LndoaWNoKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBIT01FOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZvY3VzS2V5TWFuYWdlci5zZXRGaXJzdEl0ZW1BY3RpdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlIEVORDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mb2N1c0tleU1hbmFnZXIuc2V0TGFzdEl0ZW1BY3RpdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5oaWVyYXJjaHkpIHtcblxuICAgICAgICAgICAgaWYgKCh0aGlzLl9kaXJlY3Rpb24gPT09ICdob3Jpem9udGFsJyAmJiBldmVudC5rZXlDb2RlID09PSBET1dOX0FSUk9XKSB8fFxuICAgICAgICAgICAgICAgICh0aGlzLl9kaXJlY3Rpb24gPT09ICd2ZXJ0aWNhbCcgJiYgZXZlbnQua2V5Q29kZSA9PT0gUklHSFRfQVJST1cpKSB7XG4gICAgICAgICAgICAgICAgc291cmNlLmtleWJvYXJkRXhwYW5kZWQkLm5leHQodHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCh0aGlzLl9kaXJlY3Rpb24gPT09ICdob3Jpem9udGFsJyAmJiBldmVudC5rZXlDb2RlID09PSBVUF9BUlJPVykgfHxcbiAgICAgICAgICAgICAgICAodGhpcy5fZGlyZWN0aW9uID09PSAndmVydGljYWwnICYmIGV2ZW50LmtleUNvZGUgPT09IExFRlRfQVJST1cpKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoc291cmNlLmNoaWxkcmVuLmxlbmd0aCA+IDAgJiYgc291cmNlLmV4cGFuZGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZS5rZXlib2FyZEV4cGFuZGVkJC5uZXh0KGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHNvdXJjZS5wYXJlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgc291cmNlLnBhcmVudC5rZXlib2FyZEV4cGFuZGVkJC5uZXh0KGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzb3J0SXRlbXNCeUhpZXJhcmNoeShsaXN0OiBRdWVyeUxpc3Q8VGFiYmFibGVMaXN0SXRlbURpcmVjdGl2ZT4pOiBUYWJiYWJsZUxpc3RJdGVtRGlyZWN0aXZlW10ge1xuXG4gICAgICAgIGNvbnN0IHRvcExldmVsOiBUYWJiYWJsZUxpc3RJdGVtRGlyZWN0aXZlW10gPSBbXTtcblxuICAgICAgICAvLyBQb3B1bGF0aW5nIGNoaWxkcmVuIC0gY2xlYXIgcHJldmlvdXNseSBnZW5lcmF0ZWQgY29sbGVjdGlvblxuICAgICAgICBsaXN0LmZvckVhY2goaXRlbSA9PiBpdGVtLmNoaWxkcmVuID0gW10pO1xuXG4gICAgICAgIC8vIFBvcHVsYXRpbmcgY2hpbGRyZW4gLSBtYXAgZnJvbSBjaGlsZCAtPiBwYXJlbnQgcmVsYXRpb25zaGlwXG4gICAgICAgIGxpc3QuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgIGlmIChpdGVtLnBhcmVudCkge1xuICAgICAgICAgICAgICAgIGl0ZW0ucGFyZW50LmNoaWxkcmVuLnB1c2goaXRlbSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRvcExldmVsLnB1c2goaXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIEZsYXR0ZW4gdGhlIHRyZWUgdG8gcHJvZHVjZSB0aGUgY3Vyc29yIGtleSBvcmRlclxuICAgICAgICByZXR1cm4gdGhpcy5mbGF0dGVuSGllcmFyY2h5KHRvcExldmVsKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGZsYXR0ZW5IaWVyYXJjaHkoaXRlbXM6IFRhYmJhYmxlTGlzdEl0ZW1EaXJlY3RpdmVbXSk6IFRhYmJhYmxlTGlzdEl0ZW1EaXJlY3RpdmVbXSB7XG4gICAgICAgIGNvbnN0IGZsYXRMaXN0OiBUYWJiYWJsZUxpc3RJdGVtRGlyZWN0aXZlW10gPSBbXTtcbiAgICAgICAgaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgIGl0ZW0uY2hpbGRyZW4uc29ydCgoYSwgYikgPT4gYS5yYW5rIC0gYi5yYW5rKTtcbiAgICAgICAgICAgIGZsYXRMaXN0LnB1c2goaXRlbSwgLi4udGhpcy5mbGF0dGVuSGllcmFyY2h5KGl0ZW0uY2hpbGRyZW4pKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBmbGF0TGlzdDtcbiAgICB9XG59XG4iXX0=