/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { FocusKeyManager } from '@angular/cdk/a11y';
import { Injectable } from '@angular/core';
var TabbableListService = /** @class */ (function () {
    function TabbableListService() {
    }
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
        // store the items
        this._items = items;
        // create the new focus key manager
        this.focusKeyManager = new FocusKeyManager(items);
        // set the direction of the list
        direction === 'vertical' ? this.focusKeyManager.withVerticalOrientation() : this.focusKeyManager.withHorizontalOrientation('ltr');
        // enable wrapping if required
        if (wrap) {
            this.focusKeyManager.withWrap();
        }
        // make sure the first item in the list is tabbable
        if (this._items.first) {
            this._items.first.tabindex = 0;
        }
        // call the init function on each item
        this._items.forEach(function (item) { return item.onInit(); });
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
        // get the item index
        var /** @type {?} */ index = this._items.toArray().indexOf(item);
        // active the item if it is not already active
        return this.focusKeyManager.activeItemIndex === index;
    };
    TabbableListService.decorators = [
        { type: Injectable }
    ];
    return TabbableListService;
}());
export { TabbableListService };
function TabbableListService_tsickle_Closure_declarations() {
    /** @type {?} */
    TabbableListService.prototype.focusKeyManager;
    /** @type {?} */
    TabbableListService.prototype._items;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiYmFibGUtbGlzdC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvYWNjZXNzaWJpbGl0eS90YWJiYWJsZS1saXN0L3RhYmJhYmxlLWxpc3Quc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxVQUFVLEVBQWEsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7Ozs7SUFVbEQsd0NBQVU7Ozs7OztJQUFWLFVBQVcsS0FBMkMsRUFBRSxTQUFvQyxFQUFFLElBQWE7O1FBR3ZHLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDOztRQUdwQixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDOztRQUdsRCxTQUFTLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLHVCQUF1QixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMseUJBQXlCLENBQUMsS0FBSyxDQUFDLENBQUM7O1FBR2xJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDUCxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ25DOztRQUdELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNwQixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO1NBQ2xDOztRQUdELElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFiLENBQWEsQ0FBQyxDQUFDO0tBQzlDOzs7OztJQUVELHNDQUFROzs7O0lBQVIsVUFBUyxJQUErQjs7UUFHcEMscUJBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDOztRQUdsRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ2pELElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzdDO0tBQ0o7Ozs7O0lBRUQsMENBQVk7Ozs7SUFBWixVQUFhLElBQStCOztRQUd4QyxxQkFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7O1FBR2xELE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsS0FBSyxLQUFLLENBQUM7S0FDekQ7O2dCQWxESixVQUFVOzs4QkFKWDs7U0FLYSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGb2N1c0tleU1hbmFnZXIgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQgeyBJbmplY3RhYmxlLCBRdWVyeUxpc3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRhYmJhYmxlTGlzdEl0ZW1EaXJlY3RpdmUgfSBmcm9tICcuL3RhYmJhYmxlLWxpc3QtaXRlbS5kaXJlY3RpdmUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVGFiYmFibGVMaXN0U2VydmljZSB7XG5cbiAgICBmb2N1c0tleU1hbmFnZXI6IEZvY3VzS2V5TWFuYWdlcjxUYWJiYWJsZUxpc3RJdGVtRGlyZWN0aXZlPjtcblxuICAgIHByaXZhdGUgX2l0ZW1zOiBRdWVyeUxpc3Q8VGFiYmFibGVMaXN0SXRlbURpcmVjdGl2ZT47XG5cbiAgICBpbml0aWFsaXplKGl0ZW1zOiBRdWVyeUxpc3Q8VGFiYmFibGVMaXN0SXRlbURpcmVjdGl2ZT4sIGRpcmVjdGlvbjogJ2hvcml6b250YWwnIHwgJ3ZlcnRpY2FsJywgd3JhcDogYm9vbGVhbik6IHZvaWQge1xuXG4gICAgICAgIC8vIHN0b3JlIHRoZSBpdGVtc1xuICAgICAgICB0aGlzLl9pdGVtcyA9IGl0ZW1zO1xuXG4gICAgICAgIC8vIGNyZWF0ZSB0aGUgbmV3IGZvY3VzIGtleSBtYW5hZ2VyXG4gICAgICAgIHRoaXMuZm9jdXNLZXlNYW5hZ2VyID0gbmV3IEZvY3VzS2V5TWFuYWdlcihpdGVtcyk7XG5cbiAgICAgICAgLy8gc2V0IHRoZSBkaXJlY3Rpb24gb2YgdGhlIGxpc3RcbiAgICAgICAgZGlyZWN0aW9uID09PSAndmVydGljYWwnID8gdGhpcy5mb2N1c0tleU1hbmFnZXIud2l0aFZlcnRpY2FsT3JpZW50YXRpb24oKSA6IHRoaXMuZm9jdXNLZXlNYW5hZ2VyLndpdGhIb3Jpem9udGFsT3JpZW50YXRpb24oJ2x0cicpO1xuXG4gICAgICAgIC8vIGVuYWJsZSB3cmFwcGluZyBpZiByZXF1aXJlZFxuICAgICAgICBpZiAod3JhcCkge1xuICAgICAgICAgICAgdGhpcy5mb2N1c0tleU1hbmFnZXIud2l0aFdyYXAoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG1ha2Ugc3VyZSB0aGUgZmlyc3QgaXRlbSBpbiB0aGUgbGlzdCBpcyB0YWJiYWJsZVxuICAgICAgICBpZiAodGhpcy5faXRlbXMuZmlyc3QpIHtcbiAgICAgICAgICAgIHRoaXMuX2l0ZW1zLmZpcnN0LnRhYmluZGV4ID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNhbGwgdGhlIGluaXQgZnVuY3Rpb24gb24gZWFjaCBpdGVtXG4gICAgICAgIHRoaXMuX2l0ZW1zLmZvckVhY2goaXRlbSA9PiBpdGVtLm9uSW5pdCgpKTtcbiAgICB9XG5cbiAgICBhY3RpdmF0ZShpdGVtOiBUYWJiYWJsZUxpc3RJdGVtRGlyZWN0aXZlKTogdm9pZCB7XG5cbiAgICAgICAgLy8gZ2V0IHRoZSBpdGVtIGluZGV4XG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5faXRlbXMudG9BcnJheSgpLmluZGV4T2YoaXRlbSk7XG5cbiAgICAgICAgLy8gYWN0aXZlIHRoZSBpdGVtIGlmIGl0IGlzIG5vdCBhbHJlYWR5IGFjdGl2ZVxuICAgICAgICBpZiAodGhpcy5mb2N1c0tleU1hbmFnZXIuYWN0aXZlSXRlbUluZGV4ICE9PSBpbmRleCkge1xuICAgICAgICAgICAgdGhpcy5mb2N1c0tleU1hbmFnZXIuc2V0QWN0aXZlSXRlbShpbmRleCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpc0l0ZW1BY3RpdmUoaXRlbTogVGFiYmFibGVMaXN0SXRlbURpcmVjdGl2ZSk6IGJvb2xlYW4ge1xuXG4gICAgICAgIC8vIGdldCB0aGUgaXRlbSBpbmRleFxuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuX2l0ZW1zLnRvQXJyYXkoKS5pbmRleE9mKGl0ZW0pO1xuXG4gICAgICAgIC8vIGFjdGl2ZSB0aGUgaXRlbSBpZiBpdCBpcyBub3QgYWxyZWFkeSBhY3RpdmVcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9jdXNLZXlNYW5hZ2VyLmFjdGl2ZUl0ZW1JbmRleCA9PT0gaW5kZXg7XG4gICAgfVxufSJdfQ==