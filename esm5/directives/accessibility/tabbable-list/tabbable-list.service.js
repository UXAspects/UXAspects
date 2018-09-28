/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { FocusKeyManager } from '@angular/cdk/a11y';
import { Injectable } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { UP_ARROW, RIGHT_ARROW, DOWN_ARROW, LEFT_ARROW } from '@angular/cdk/keycodes';
var TabbableListService = /** @class */ (function () {
    function TabbableListService() {
        this.hierarchy = false;
        this.allowAltModifier = true;
        this.allowCtrlModifier = true;
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
        setTimeout(function () {
            if (_this._items.first) {
                _this._items.first.tabindex = 0;
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
        var /** @type {?} */ result = this.flattenHierarchy(topLevel);
        return result;
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
            var /** @type {?} */ descendants = _this.flattenHierarchy(item.children);
            flatList.push.apply(flatList, tslib_1.__spread([item], descendants));
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
    TabbableListService.prototype.focusKeyManager;
    /** @type {?} */
    TabbableListService.prototype._items;
    /** @type {?} */
    TabbableListService.prototype._direction;
    /** @type {?} */
    TabbableListService.prototype._onDestroy;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiYmFibGUtbGlzdC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvYWNjZXNzaWJpbGl0eS90YWJiYWJsZS1saXN0L3RhYmJhYmxlLWxpc3Quc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsVUFBVSxFQUF3QixNQUFNLGVBQWUsQ0FBQztBQUNqRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUV2QyxPQUFPLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7Ozt5QkFLN0QsS0FBSztnQ0FDRSxJQUFJO2lDQUNILElBQUk7MEJBS1osSUFBSSxPQUFPLEVBQVE7Ozs7O0lBRXhDLHlDQUFXOzs7SUFBWDtRQUNJLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUM5Qjs7Ozs7OztJQUVELHdDQUFVOzs7Ozs7SUFBVixVQUFXLEtBQTJDLEVBQUUsU0FBb0MsRUFBRSxJQUFhO1FBQTNHLGlCQWdDQzs7UUE3QkcsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7O1FBR3BCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7O1FBR2xELFNBQVMsS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsdUJBQXVCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyx5QkFBeUIsQ0FBQyxLQUFLLENBQUMsQ0FB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QUFDLENBQUM7WUFDekQsUUFBUSxDQUFDLElBQUksT0FBYixRQUFRLG9CQUFNLElBQUksR0FBSyxXQUFXLEdBQUU7U0FDdkMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLFFBQVEsQ0FBQzs7O2dCQWxLdkIsVUFBVTs7OEJBUFg7O1NBUWEsbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRm9jdXNLZXlNYW5hZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSwgT25EZXN0cm95LCBRdWVyeUxpc3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzL1N1YmplY3QnO1xuaW1wb3J0IHsgVGFiYmFibGVMaXN0SXRlbURpcmVjdGl2ZSB9IGZyb20gJy4vdGFiYmFibGUtbGlzdC1pdGVtLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBVUF9BUlJPVywgUklHSFRfQVJST1csIERPV05fQVJST1csIExFRlRfQVJST1cgfSBmcm9tICdAYW5ndWxhci9jZGsva2V5Y29kZXMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVGFiYmFibGVMaXN0U2VydmljZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG5cbiAgICBoaWVyYXJjaHk6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBhbGxvd0FsdE1vZGlmaWVyOiBib29sZWFuID0gdHJ1ZTtcbiAgICBhbGxvd0N0cmxNb2RpZmllcjogYm9vbGVhbiA9IHRydWU7XG4gICAgZm9jdXNLZXlNYW5hZ2VyOiBGb2N1c0tleU1hbmFnZXI8VGFiYmFibGVMaXN0SXRlbURpcmVjdGl2ZT47XG5cbiAgICBwcml2YXRlIF9pdGVtczogUXVlcnlMaXN0PFRhYmJhYmxlTGlzdEl0ZW1EaXJlY3RpdmU+O1xuICAgIHByaXZhdGUgX2RpcmVjdGlvbjogJ2hvcml6b250YWwnIHwgJ3ZlcnRpY2FsJztcbiAgICBwcml2YXRlIF9vbkRlc3Ryb3kgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX29uRGVzdHJveS5uZXh0KCk7XG4gICAgICAgIHRoaXMuX29uRGVzdHJveS5jb21wbGV0ZSgpO1xuICAgIH1cblxuICAgIGluaXRpYWxpemUoaXRlbXM6IFF1ZXJ5TGlzdDxUYWJiYWJsZUxpc3RJdGVtRGlyZWN0aXZlPiwgZGlyZWN0aW9uOiAnaG9yaXpvbnRhbCcgfCAndmVydGljYWwnLCB3cmFwOiBib29sZWFuKTogdm9pZCB7XG5cbiAgICAgICAgLy8gc3RvcmUgdGhlIGl0ZW1zXG4gICAgICAgIHRoaXMuX2l0ZW1zID0gaXRlbXM7XG5cbiAgICAgICAgLy8gY3JlYXRlIHRoZSBuZXcgZm9jdXMga2V5IG1hbmFnZXJcbiAgICAgICAgdGhpcy5mb2N1c0tleU1hbmFnZXIgPSBuZXcgRm9jdXNLZXlNYW5hZ2VyKGl0ZW1zKTtcblxuICAgICAgICAvLyBzZXQgdGhlIGRpcmVjdGlvbiBvZiB0aGUgbGlzdFxuICAgICAgICBkaXJlY3Rpb24gPT09ICd2ZXJ0aWNhbCcgPyB0aGlzLmZvY3VzS2V5TWFuYWdlci53aXRoVmVydGljYWxPcmllbnRhdGlvbigpIDogdGhpcy5mb2N1c0tleU1hbmFnZXIud2l0aEhvcml6b250YWxPcmllbnRhdGlvbignbHRyJyk7XG4gICAgICAgIHRoaXMuX2RpcmVjdGlvbiA9IGRpcmVjdGlvbjtcblxuICAgICAgICAvLyBlbmFibGUgd3JhcHBpbmcgaWYgcmVxdWlyZWRcbiAgICAgICAgaWYgKHdyYXApIHtcbiAgICAgICAgICAgIHRoaXMuZm9jdXNLZXlNYW5hZ2VyLndpdGhXcmFwKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBtYWtlIHN1cmUgdGhlIGZpcnN0IGl0ZW0gaW4gdGhlIGxpc3QgaXMgdGFiYmFibGVcbiAgICAgICAgdGhpcy5zZXRGaXJzdEl0ZW1UYWJiYWJsZSgpO1xuXG4gICAgICAgIC8vIGNhbGwgdGhlIGluaXQgZnVuY3Rpb24gb24gZWFjaCBpdGVtXG4gICAgICAgIHRoaXMuX2l0ZW1zLmZvckVhY2goaXRlbSA9PiBpdGVtLm9uSW5pdCgpKTtcblxuICAgICAgICAvLyBpZiB0aGUgbGlzdCBjaGFuZ2VzIHdlIG5lZWQgdG8gZW5zdXJlIHRoZXJlIGlzIGFsd2F5cyBhdCBsZWFzdCBvbmUgdGFiYmFibGUgaXRlbVxuICAgICAgICB0aGlzLl9pdGVtcy5jaGFuZ2VzLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpLnN1YnNjcmliZSgoKSA9PiB7XG5cbiAgICAgICAgICAgIC8vIGNhbGwgdGhlIG9uIGluaXQgZnVuY3Rpb24gb24gYW55IG5ldyBpdGVtc1xuICAgICAgICAgICAgdGhpcy5faXRlbXMuZmlsdGVyKGl0ZW0gPT4gIWl0ZW0uaW5pdGlhbGl6ZWQpLmZvckVhY2goaXRlbSA9PiBpdGVtLm9uSW5pdCgpKTtcblxuICAgICAgICAgICAgLy8gZW5zdXJlIHRoZXJlIGlzIGF0IGxlYXN0IG9uZSBpdGVtIHRhYmJhYmxlIGF0IGFsbCB0aW1lc1xuICAgICAgICAgICAgdGhpcy5lbnN1cmVUYWJiYWJsZUl0ZW0oKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYWN0aXZhdGUoaXRlbTogVGFiYmFibGVMaXN0SXRlbURpcmVjdGl2ZSk6IHZvaWQge1xuXG4gICAgICAgIGlmICghaXRlbSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZ2V0IHRoZSBpdGVtIGluZGV4XG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5faXRlbXMudG9BcnJheSgpLmluZGV4T2YoaXRlbSk7XG5cbiAgICAgICAgLy8gYWN0aXZlIHRoZSBpdGVtIGlmIGl0IGlzIG5vdCBhbHJlYWR5IGFjdGl2ZVxuICAgICAgICBpZiAodGhpcy5mb2N1c0tleU1hbmFnZXIuYWN0aXZlSXRlbUluZGV4ICE9PSBpbmRleCkge1xuICAgICAgICAgICAgdGhpcy5mb2N1c0tleU1hbmFnZXIuc2V0QWN0aXZlSXRlbShpbmRleCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpc0l0ZW1BY3RpdmUoaXRlbTogVGFiYmFibGVMaXN0SXRlbURpcmVjdGl2ZSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5mb2N1c0tleU1hbmFnZXIuYWN0aXZlSXRlbS5pZCA9PT0gaXRlbS5pZDtcbiAgICB9XG5cbiAgICBzZXRGaXJzdEl0ZW1UYWJiYWJsZSgpOiB2b2lkIHtcbiAgICAgICAgLy8gZGVsYXkgdG8gcHJldmVudCBleHByZXNzaW9uIGNoYW5nZWQgYWZ0ZXIgY2hlY2sgZXJyb3JcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5faXRlbXMuZmlyc3QpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9pdGVtcy5maXJzdC50YWJpbmRleCA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGVuc3VyZVRhYmJhYmxlSXRlbSgpOiB2b2lkIHtcbiAgICAgICAgLy8gY2hlY2sgdG8gc2VlIGlmIGFueSBpdGVtIGlzIHRhYmJhYmxlXG4gICAgICAgIGNvbnN0IGFjdGl2ZSA9IHRoaXMuX2l0ZW1zLmZpbmQoaXRlbSA9PiBpdGVtLnRhYmluZGV4ID09PSAwKTtcblxuICAgICAgICBpZiAoIWFjdGl2ZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRGaXJzdEl0ZW1UYWJiYWJsZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZm9jdXNUYWJiYWJsZUl0ZW0oKTogdm9pZCB7XG5cbiAgICAgICAgaWYgKCF0aGlzLl9pdGVtcykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZmluZCB0aGUgaXRlbSBpbiB0aGUgbGlzdCB3aXRoIGEgdGFiIGluZGV4XG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5faXRlbXMudG9BcnJheSgpLmZpbmRJbmRleChpdGVtID0+IGl0ZW0udGFiaW5kZXggPT09IDApO1xuXG4gICAgICAgIC8vIGlmIGFuIGl0ZW0gd2FzIGZvdW5kIHRoZW4gZm9jdXMgaXRcbiAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgdGhpcy5mb2N1c0tleU1hbmFnZXIuc2V0QWN0aXZlSXRlbShpbmRleCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIG9uS2V5ZG93bihzb3VyY2U6IFRhYmJhYmxlTGlzdEl0ZW1EaXJlY3RpdmUsIGV2ZW50OiBLZXlib2FyZEV2ZW50KTogYW55IHtcblxuICAgICAgICAvLyBwcmV2ZW50IGFueXRoaW5nIGhhcHBlbmluZyB3aGVuIG1vZGlmaWVyIGtleXMgYXJlIHByZXNzZWQgaWYgdGhleSBoYXZlIGJlZW4gZGlzYWJsZWRcbiAgICAgICAgaWYgKCF0aGlzLmFsbG93QWx0TW9kaWZpZXIgJiYgZXZlbnQuYWx0S2V5IHx8ICF0aGlzLmFsbG93Q3RybE1vZGlmaWVyICYmIGV2ZW50LmN0cmxLZXkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZm9jdXNLZXlNYW5hZ2VyLm9uS2V5ZG93bihldmVudCk7XG5cbiAgICAgICAgaWYgKHRoaXMuaGllcmFyY2h5KSB7XG5cbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAodGhpcy5fZGlyZWN0aW9uID09PSAnaG9yaXpvbnRhbCcgJiYgZXZlbnQua2V5Q29kZSA9PT0gRE9XTl9BUlJPVykgfHxcbiAgICAgICAgICAgICAgICAodGhpcy5fZGlyZWN0aW9uID09PSAndmVydGljYWwnICYmIGV2ZW50LmtleUNvZGUgPT09IFJJR0hUX0FSUk9XKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgc291cmNlLmtleWJvYXJkRXhwYW5kZWQkLm5leHQodHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgICAgICh0aGlzLl9kaXJlY3Rpb24gPT09ICdob3Jpem9udGFsJyAmJiBldmVudC5rZXlDb2RlID09PSBVUF9BUlJPVykgfHxcbiAgICAgICAgICAgICAgICAodGhpcy5fZGlyZWN0aW9uID09PSAndmVydGljYWwnICYmIGV2ZW50LmtleUNvZGUgPT09IExFRlRfQVJST1cpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBpZiAoc291cmNlLmNoaWxkcmVuLmxlbmd0aCA+IDAgJiYgc291cmNlLmV4cGFuZGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZS5rZXlib2FyZEV4cGFuZGVkJC5uZXh0KGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHNvdXJjZS5wYXJlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgc291cmNlLnBhcmVudC5rZXlib2FyZEV4cGFuZGVkJC5uZXh0KGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzb3J0SXRlbXNCeUhpZXJhcmNoeShsaXN0OiBRdWVyeUxpc3Q8VGFiYmFibGVMaXN0SXRlbURpcmVjdGl2ZT4pOiBUYWJiYWJsZUxpc3RJdGVtRGlyZWN0aXZlW10ge1xuXG4gICAgICAgIGNvbnN0IHRvcExldmVsOiBUYWJiYWJsZUxpc3RJdGVtRGlyZWN0aXZlW10gPSBbXTtcblxuICAgICAgICAvLyBQb3B1bGF0aW5nIGNoaWxkcmVuIC0gY2xlYXIgcHJldmlvdXNseSBnZW5lcmF0ZWQgY29sbGVjdGlvblxuICAgICAgICBsaXN0LmZvckVhY2goaXRlbSA9PiBpdGVtLmNoaWxkcmVuID0gW10pO1xuXG4gICAgICAgIC8vIFBvcHVsYXRpbmcgY2hpbGRyZW4gLSBtYXAgZnJvbSBjaGlsZCAtPiBwYXJlbnQgcmVsYXRpb25zaGlwXG4gICAgICAgIGxpc3QuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgIGlmIChpdGVtLnBhcmVudCkge1xuICAgICAgICAgICAgICAgIGl0ZW0ucGFyZW50LmNoaWxkcmVuLnB1c2goaXRlbSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRvcExldmVsLnB1c2goaXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIEZsYXR0ZW4gdGhlIHRyZWUgdG8gcHJvZHVjZSB0aGUgY3Vyc29yIGtleSBvcmRlclxuICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLmZsYXR0ZW5IaWVyYXJjaHkodG9wTGV2ZWwpO1xuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBmbGF0dGVuSGllcmFyY2h5KGl0ZW1zOiBUYWJiYWJsZUxpc3RJdGVtRGlyZWN0aXZlW10pOiBUYWJiYWJsZUxpc3RJdGVtRGlyZWN0aXZlW10ge1xuICAgICAgICBjb25zdCBmbGF0TGlzdDogVGFiYmFibGVMaXN0SXRlbURpcmVjdGl2ZVtdID0gW107XG4gICAgICAgIGl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICBpdGVtLmNoaWxkcmVuLnNvcnQoKGEsIGIpID0+IGEucmFuayAtIGIucmFuayk7XG4gICAgICAgICAgICBjb25zdCBkZXNjZW5kYW50cyA9IHRoaXMuZmxhdHRlbkhpZXJhcmNoeShpdGVtLmNoaWxkcmVuKTtcbiAgICAgICAgICAgIGZsYXRMaXN0LnB1c2goaXRlbSwgLi4uZGVzY2VuZGFudHMpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGZsYXRMaXN0O1xuICAgIH1cbn1cbiJdfQ==