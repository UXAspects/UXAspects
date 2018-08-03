/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { FocusKeyManager } from '@angular/cdk/a11y';
import { Injectable } from '@angular/core';
export class TabbableListService {
    /**
     * @param {?} items
     * @param {?} direction
     * @param {?} wrap
     * @return {?}
     */
    initialize(items, direction, wrap) {
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
        this._items.forEach(item => item.onInit());
    }
    /**
     * @param {?} item
     * @return {?}
     */
    activate(item) {
        // get the item index
        const /** @type {?} */ index = this._items.toArray().indexOf(item);
        // active the item if it is not already active
        if (this.focusKeyManager.activeItemIndex !== index) {
            this.focusKeyManager.setActiveItem(index);
        }
    }
    /**
     * @param {?} item
     * @return {?}
     */
    isItemActive(item) {
        // get the item index
        const /** @type {?} */ index = this._items.toArray().indexOf(item);
        // active the item if it is not already active
        return this.focusKeyManager.activeItemIndex === index;
    }
}
TabbableListService.decorators = [
    { type: Injectable }
];
function TabbableListService_tsickle_Closure_declarations() {
    /** @type {?} */
    TabbableListService.prototype.focusKeyManager;
    /** @type {?} */
    TabbableListService.prototype._items;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiYmFibGUtbGlzdC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvYWNjZXNzaWJpbGl0eS90YWJiYWJsZS1saXN0L3RhYmJhYmxlLWxpc3Quc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxVQUFVLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFJdEQsTUFBTTs7Ozs7OztJQU1GLFVBQVUsQ0FBQyxLQUEyQyxFQUFFLFNBQW9DLEVBQUUsSUFBYTs7UUFHdkcsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7O1FBR3BCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7O1FBR2xELFNBQVMsS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsdUJBQXVCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyx5QkFBeUIsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7UUFHbEksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNQLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDbkM7O1FBR0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7U0FDbEM7O1FBR0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztLQUM5Qzs7Ozs7SUFFRCxRQUFRLENBQUMsSUFBK0I7O1FBR3BDLHVCQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzs7UUFHbEQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxlQUFlLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNqRCxJQUFJLENBQUMsZUFBZSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUM3QztLQUNKOzs7OztJQUVELFlBQVksQ0FBQyxJQUErQjs7UUFHeEMsdUJBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDOztRQUdsRCxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxlQUFlLEtBQUssS0FBSyxDQUFDO0tBQ3pEOzs7WUFsREosVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZvY3VzS2V5TWFuYWdlciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7IEluamVjdGFibGUsIFF1ZXJ5TGlzdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVGFiYmFibGVMaXN0SXRlbURpcmVjdGl2ZSB9IGZyb20gJy4vdGFiYmFibGUtbGlzdC1pdGVtLmRpcmVjdGl2ZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBUYWJiYWJsZUxpc3RTZXJ2aWNlIHtcblxuICAgIGZvY3VzS2V5TWFuYWdlcjogRm9jdXNLZXlNYW5hZ2VyPFRhYmJhYmxlTGlzdEl0ZW1EaXJlY3RpdmU+O1xuXG4gICAgcHJpdmF0ZSBfaXRlbXM6IFF1ZXJ5TGlzdDxUYWJiYWJsZUxpc3RJdGVtRGlyZWN0aXZlPjtcblxuICAgIGluaXRpYWxpemUoaXRlbXM6IFF1ZXJ5TGlzdDxUYWJiYWJsZUxpc3RJdGVtRGlyZWN0aXZlPiwgZGlyZWN0aW9uOiAnaG9yaXpvbnRhbCcgfCAndmVydGljYWwnLCB3cmFwOiBib29sZWFuKTogdm9pZCB7XG5cbiAgICAgICAgLy8gc3RvcmUgdGhlIGl0ZW1zXG4gICAgICAgIHRoaXMuX2l0ZW1zID0gaXRlbXM7XG5cbiAgICAgICAgLy8gY3JlYXRlIHRoZSBuZXcgZm9jdXMga2V5IG1hbmFnZXJcbiAgICAgICAgdGhpcy5mb2N1c0tleU1hbmFnZXIgPSBuZXcgRm9jdXNLZXlNYW5hZ2VyKGl0ZW1zKTtcblxuICAgICAgICAvLyBzZXQgdGhlIGRpcmVjdGlvbiBvZiB0aGUgbGlzdFxuICAgICAgICBkaXJlY3Rpb24gPT09ICd2ZXJ0aWNhbCcgPyB0aGlzLmZvY3VzS2V5TWFuYWdlci53aXRoVmVydGljYWxPcmllbnRhdGlvbigpIDogdGhpcy5mb2N1c0tleU1hbmFnZXIud2l0aEhvcml6b250YWxPcmllbnRhdGlvbignbHRyJyk7XG5cbiAgICAgICAgLy8gZW5hYmxlIHdyYXBwaW5nIGlmIHJlcXVpcmVkXG4gICAgICAgIGlmICh3cmFwKSB7XG4gICAgICAgICAgICB0aGlzLmZvY3VzS2V5TWFuYWdlci53aXRoV3JhcCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gbWFrZSBzdXJlIHRoZSBmaXJzdCBpdGVtIGluIHRoZSBsaXN0IGlzIHRhYmJhYmxlXG4gICAgICAgIGlmICh0aGlzLl9pdGVtcy5maXJzdCkge1xuICAgICAgICAgICAgdGhpcy5faXRlbXMuZmlyc3QudGFiaW5kZXggPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY2FsbCB0aGUgaW5pdCBmdW5jdGlvbiBvbiBlYWNoIGl0ZW1cbiAgICAgICAgdGhpcy5faXRlbXMuZm9yRWFjaChpdGVtID0+IGl0ZW0ub25Jbml0KCkpO1xuICAgIH1cblxuICAgIGFjdGl2YXRlKGl0ZW06IFRhYmJhYmxlTGlzdEl0ZW1EaXJlY3RpdmUpOiB2b2lkIHtcblxuICAgICAgICAvLyBnZXQgdGhlIGl0ZW0gaW5kZXhcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLl9pdGVtcy50b0FycmF5KCkuaW5kZXhPZihpdGVtKTtcblxuICAgICAgICAvLyBhY3RpdmUgdGhlIGl0ZW0gaWYgaXQgaXMgbm90IGFscmVhZHkgYWN0aXZlXG4gICAgICAgIGlmICh0aGlzLmZvY3VzS2V5TWFuYWdlci5hY3RpdmVJdGVtSW5kZXggIT09IGluZGV4KSB7XG4gICAgICAgICAgICB0aGlzLmZvY3VzS2V5TWFuYWdlci5zZXRBY3RpdmVJdGVtKGluZGV4KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlzSXRlbUFjdGl2ZShpdGVtOiBUYWJiYWJsZUxpc3RJdGVtRGlyZWN0aXZlKTogYm9vbGVhbiB7XG5cbiAgICAgICAgLy8gZ2V0IHRoZSBpdGVtIGluZGV4XG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5faXRlbXMudG9BcnJheSgpLmluZGV4T2YoaXRlbSk7XG5cbiAgICAgICAgLy8gYWN0aXZlIHRoZSBpdGVtIGlmIGl0IGlzIG5vdCBhbHJlYWR5IGFjdGl2ZVxuICAgICAgICByZXR1cm4gdGhpcy5mb2N1c0tleU1hbmFnZXIuYWN0aXZlSXRlbUluZGV4ID09PSBpbmRleDtcbiAgICB9XG59Il19