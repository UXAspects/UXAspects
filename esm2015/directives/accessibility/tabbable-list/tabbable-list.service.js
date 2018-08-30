/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { FocusKeyManager } from '@angular/cdk/a11y';
import { Injectable } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
export class TabbableListService {
    constructor() {
        this.allowAltModifier = true;
        this.allowCtrlModifier = true;
        this._onDestroy = new Subject();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
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
        this.setFirstItemTabbable();
        // call the init function on each item
        this._items.forEach(item => item.onInit());
        // if the list changes we need to ensure there is always at least one tabbable item
        this._items.changes.pipe(takeUntil(this._onDestroy)).subscribe(() => {
            // call the on init function on any new items
            this._items.filter(item => !item.initialized).forEach(item => item.onInit());
            // ensure there is at least one item tabbable at all times
            this.ensureTabbableItem();
        });
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
    /**
     * @return {?}
     */
    setFirstItemTabbable() {
        // delay to prevent expression changed after check error
        setTimeout(() => {
            if (this._items.first) {
                this._items.first.tabindex = 0;
            }
        });
    }
    /**
     * @return {?}
     */
    ensureTabbableItem() {
        // check to see if any item is tabbable
        const /** @type {?} */ active = this._items.find(item => item.tabindex === 0);
        if (!active) {
            this.setFirstItemTabbable();
        }
    }
    /**
     * @return {?}
     */
    focusTabbableItem() {
        if (!this._items) {
            return;
        }
        // find the item in the list with a tab index
        const /** @type {?} */ index = this._items.toArray().findIndex(item => item.tabindex === 0);
        // if an item was found then focus it
        if (index !== -1) {
            this.focusKeyManager.setActiveItem(index);
        }
    }
}
TabbableListService.decorators = [
    { type: Injectable }
];
function TabbableListService_tsickle_Closure_declarations() {
    /** @type {?} */
    TabbableListService.prototype.allowAltModifier;
    /** @type {?} */
    TabbableListService.prototype.allowCtrlModifier;
    /** @type {?} */
    TabbableListService.prototype.focusKeyManager;
    /** @type {?} */
    TabbableListService.prototype._items;
    /** @type {?} */
    TabbableListService.prototype._onDestroy;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiYmFibGUtbGlzdC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvYWNjZXNzaWJpbGl0eS90YWJiYWJsZS1saXN0L3RhYmJhYmxlLWxpc3Quc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxVQUFVLEVBQXdCLE1BQU0sZUFBZSxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBSXZDLE1BQU07O2dDQUUwQixJQUFJO2lDQUNILElBQUk7MEJBSVosSUFBSSxPQUFPLEVBQVE7Ozs7O0lBRXhDLFdBQVc7UUFDUCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7S0FDOUI7Ozs7Ozs7SUFFRCxVQUFVLENBQUMsS0FBMkMsRUFBRSxTQUFvQyxFQUFFLElBQWE7O1FBR3ZHLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDOztRQUdwQixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDOztRQUdsRCxTQUFTLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLHVCQUF1QixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMseUJBQXlCLENBQUMsS0FBSyxDQUFDLENBQUM7O1FBR2xJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDUCxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ25DOztRQUdELElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDOztRQUc1QixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDOztRQUczQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7O1lBR2hFLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7O1lBRzdFLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1NBQzdCLENBQUMsQ0FBQztLQUNOOzs7OztJQUVELFFBQVEsQ0FBQyxJQUErQjs7UUFHcEMsdUJBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDOztRQUdsRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ2pELElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzdDO0tBQ0o7Ozs7O0lBRUQsWUFBWSxDQUFDLElBQStCOztRQUd4Qyx1QkFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7O1FBR2xELE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsS0FBSyxLQUFLLENBQUM7S0FDekQ7Ozs7SUFFRCxvQkFBb0I7O1FBRWhCLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDWixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ3BCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7YUFDbEM7U0FDSixDQUFDLENBQUM7S0FDTjs7OztJQUVELGtCQUFrQjs7UUFFZCx1QkFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBRTdELEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNWLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1NBQy9CO0tBQ0o7Ozs7SUFFRCxpQkFBaUI7UUFFYixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ2YsTUFBTSxDQUFDO1NBQ1Y7O1FBR0QsdUJBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsS0FBSyxDQUFDLENBQUMsQ0FBQzs7UUFHM0UsRUFBRSxDQUFDLENBQUMsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNmLElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzdDO0tBQ0o7OztZQW5HSixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRm9jdXNLZXlNYW5hZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSwgT25EZXN0cm95LCBRdWVyeUxpc3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzL1N1YmplY3QnO1xuaW1wb3J0IHsgVGFiYmFibGVMaXN0SXRlbURpcmVjdGl2ZSB9IGZyb20gJy4vdGFiYmFibGUtbGlzdC1pdGVtLmRpcmVjdGl2ZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBUYWJiYWJsZUxpc3RTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICAgIGFsbG93QWx0TW9kaWZpZXI6IGJvb2xlYW4gPSB0cnVlO1xuICAgIGFsbG93Q3RybE1vZGlmaWVyOiBib29sZWFuID0gdHJ1ZTtcbiAgICBmb2N1c0tleU1hbmFnZXI6IEZvY3VzS2V5TWFuYWdlcjxUYWJiYWJsZUxpc3RJdGVtRGlyZWN0aXZlPjtcblxuICAgIHByaXZhdGUgX2l0ZW1zOiBRdWVyeUxpc3Q8VGFiYmFibGVMaXN0SXRlbURpcmVjdGl2ZT47XG4gICAgcHJpdmF0ZSBfb25EZXN0cm95ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9vbkRlc3Ryb3kubmV4dCgpO1xuICAgICAgICB0aGlzLl9vbkRlc3Ryb3kuY29tcGxldGUoKTtcbiAgICB9XG5cbiAgICBpbml0aWFsaXplKGl0ZW1zOiBRdWVyeUxpc3Q8VGFiYmFibGVMaXN0SXRlbURpcmVjdGl2ZT4sIGRpcmVjdGlvbjogJ2hvcml6b250YWwnIHwgJ3ZlcnRpY2FsJywgd3JhcDogYm9vbGVhbik6IHZvaWQge1xuXG4gICAgICAgIC8vIHN0b3JlIHRoZSBpdGVtc1xuICAgICAgICB0aGlzLl9pdGVtcyA9IGl0ZW1zO1xuXG4gICAgICAgIC8vIGNyZWF0ZSB0aGUgbmV3IGZvY3VzIGtleSBtYW5hZ2VyXG4gICAgICAgIHRoaXMuZm9jdXNLZXlNYW5hZ2VyID0gbmV3IEZvY3VzS2V5TWFuYWdlcihpdGVtcyk7XG5cbiAgICAgICAgLy8gc2V0IHRoZSBkaXJlY3Rpb24gb2YgdGhlIGxpc3RcbiAgICAgICAgZGlyZWN0aW9uID09PSAndmVydGljYWwnID8gdGhpcy5mb2N1c0tleU1hbmFnZXIud2l0aFZlcnRpY2FsT3JpZW50YXRpb24oKSA6IHRoaXMuZm9jdXNLZXlNYW5hZ2VyLndpdGhIb3Jpem9udGFsT3JpZW50YXRpb24oJ2x0cicpO1xuXG4gICAgICAgIC8vIGVuYWJsZSB3cmFwcGluZyBpZiByZXF1aXJlZFxuICAgICAgICBpZiAod3JhcCkge1xuICAgICAgICAgICAgdGhpcy5mb2N1c0tleU1hbmFnZXIud2l0aFdyYXAoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG1ha2Ugc3VyZSB0aGUgZmlyc3QgaXRlbSBpbiB0aGUgbGlzdCBpcyB0YWJiYWJsZVxuICAgICAgICB0aGlzLnNldEZpcnN0SXRlbVRhYmJhYmxlKCk7XG5cbiAgICAgICAgLy8gY2FsbCB0aGUgaW5pdCBmdW5jdGlvbiBvbiBlYWNoIGl0ZW1cbiAgICAgICAgdGhpcy5faXRlbXMuZm9yRWFjaChpdGVtID0+IGl0ZW0ub25Jbml0KCkpO1xuXG4gICAgICAgIC8vIGlmIHRoZSBsaXN0IGNoYW5nZXMgd2UgbmVlZCB0byBlbnN1cmUgdGhlcmUgaXMgYWx3YXlzIGF0IGxlYXN0IG9uZSB0YWJiYWJsZSBpdGVtXG4gICAgICAgIHRoaXMuX2l0ZW1zLmNoYW5nZXMucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSkuc3Vic2NyaWJlKCgpID0+IHtcblxuICAgICAgICAgICAgLy8gY2FsbCB0aGUgb24gaW5pdCBmdW5jdGlvbiBvbiBhbnkgbmV3IGl0ZW1zXG4gICAgICAgICAgICB0aGlzLl9pdGVtcy5maWx0ZXIoaXRlbSA9PiAhaXRlbS5pbml0aWFsaXplZCkuZm9yRWFjaChpdGVtID0+IGl0ZW0ub25Jbml0KCkpO1xuXG4gICAgICAgICAgICAvLyBlbnN1cmUgdGhlcmUgaXMgYXQgbGVhc3Qgb25lIGl0ZW0gdGFiYmFibGUgYXQgYWxsIHRpbWVzXG4gICAgICAgICAgICB0aGlzLmVuc3VyZVRhYmJhYmxlSXRlbSgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBhY3RpdmF0ZShpdGVtOiBUYWJiYWJsZUxpc3RJdGVtRGlyZWN0aXZlKTogdm9pZCB7XG5cbiAgICAgICAgLy8gZ2V0IHRoZSBpdGVtIGluZGV4XG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5faXRlbXMudG9BcnJheSgpLmluZGV4T2YoaXRlbSk7XG5cbiAgICAgICAgLy8gYWN0aXZlIHRoZSBpdGVtIGlmIGl0IGlzIG5vdCBhbHJlYWR5IGFjdGl2ZVxuICAgICAgICBpZiAodGhpcy5mb2N1c0tleU1hbmFnZXIuYWN0aXZlSXRlbUluZGV4ICE9PSBpbmRleCkge1xuICAgICAgICAgICAgdGhpcy5mb2N1c0tleU1hbmFnZXIuc2V0QWN0aXZlSXRlbShpbmRleCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpc0l0ZW1BY3RpdmUoaXRlbTogVGFiYmFibGVMaXN0SXRlbURpcmVjdGl2ZSk6IGJvb2xlYW4ge1xuXG4gICAgICAgIC8vIGdldCB0aGUgaXRlbSBpbmRleFxuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuX2l0ZW1zLnRvQXJyYXkoKS5pbmRleE9mKGl0ZW0pO1xuXG4gICAgICAgIC8vIGFjdGl2ZSB0aGUgaXRlbSBpZiBpdCBpcyBub3QgYWxyZWFkeSBhY3RpdmVcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9jdXNLZXlNYW5hZ2VyLmFjdGl2ZUl0ZW1JbmRleCA9PT0gaW5kZXg7XG4gICAgfVxuXG4gICAgc2V0Rmlyc3RJdGVtVGFiYmFibGUoKTogdm9pZCB7XG4gICAgICAgIC8vIGRlbGF5IHRvIHByZXZlbnQgZXhwcmVzc2lvbiBjaGFuZ2VkIGFmdGVyIGNoZWNrIGVycm9yXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2l0ZW1zLmZpcnN0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5faXRlbXMuZmlyc3QudGFiaW5kZXggPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBlbnN1cmVUYWJiYWJsZUl0ZW0oKTogdm9pZCB7XG4gICAgICAgIC8vIGNoZWNrIHRvIHNlZSBpZiBhbnkgaXRlbSBpcyB0YWJiYWJsZVxuICAgICAgICBjb25zdCBhY3RpdmUgPSB0aGlzLl9pdGVtcy5maW5kKGl0ZW0gPT4gaXRlbS50YWJpbmRleCA9PT0gMCk7XG5cbiAgICAgICAgaWYgKCFhY3RpdmUpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0Rmlyc3RJdGVtVGFiYmFibGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZvY3VzVGFiYmFibGVJdGVtKCk6IHZvaWQge1xuXG4gICAgICAgIGlmICghdGhpcy5faXRlbXMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGZpbmQgdGhlIGl0ZW0gaW4gdGhlIGxpc3Qgd2l0aCBhIHRhYiBpbmRleFxuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuX2l0ZW1zLnRvQXJyYXkoKS5maW5kSW5kZXgoaXRlbSA9PiBpdGVtLnRhYmluZGV4ID09PSAwKTtcblxuICAgICAgICAvLyBpZiBhbiBpdGVtIHdhcyBmb3VuZCB0aGVuIGZvY3VzIGl0XG4gICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuZm9jdXNLZXlNYW5hZ2VyLnNldEFjdGl2ZUl0ZW0oaW5kZXgpO1xuICAgICAgICB9XG4gICAgfVxufSJdfQ==