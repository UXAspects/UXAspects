/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { FocusKeyManager } from '@angular/cdk/a11y';
import { Injectable } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { UP_ARROW, RIGHT_ARROW, DOWN_ARROW, LEFT_ARROW } from '@angular/cdk/keycodes';
export class TabbableListService {
    constructor() {
        this.hierarchy = false;
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
        this._direction = direction;
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
        if (!item) {
            return;
        }
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
        return this.focusKeyManager.activeItem.id === item.id;
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
    /**
     * @param {?} source
     * @param {?} event
     * @return {?}
     */
    onKeydown(source, event) {
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
    }
    /**
     * @param {?} list
     * @return {?}
     */
    sortItemsByHierarchy(list) {
        const /** @type {?} */ topLevel = [];
        // Populating children - clear previously generated collection
        list.forEach(item => item.children = []);
        // Populating children - map from child -> parent relationship
        list.forEach(item => {
            if (item.parent) {
                item.parent.children.push(item);
            }
            else {
                topLevel.push(item);
            }
        });
        // Flatten the tree to produce the cursor key order
        const /** @type {?} */ result = this.flattenHierarchy(topLevel);
        return result;
    }
    /**
     * @param {?} items
     * @return {?}
     */
    flattenHierarchy(items) {
        const /** @type {?} */ flatList = [];
        items.forEach(item => {
            item.children.sort((a, b) => a.rank - b.rank);
            const /** @type {?} */ descendants = this.flattenHierarchy(item.children);
            flatList.push(item, ...descendants);
        });
        return flatList;
    }
}
TabbableListService.decorators = [
    { type: Injectable }
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiYmFibGUtbGlzdC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvYWNjZXNzaWJpbGl0eS90YWJiYWJsZS1saXN0L3RhYmJhYmxlLWxpc3Quc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxVQUFVLEVBQXdCLE1BQU0sZUFBZSxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRXZDLE9BQU8sRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUd0RixNQUFNOzt5QkFFbUIsS0FBSztnQ0FDRSxJQUFJO2lDQUNILElBQUk7MEJBS1osSUFBSSxPQUFPLEVBQVE7Ozs7O0lBRXhDLFdBQVc7UUFDUCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7S0FDOUI7Ozs7Ozs7SUFFRCxVQUFVLENBQUMsS0FBMkMsRUFBRSxTQUFvQyxFQUFFLElBQWE7O1FBR3ZHLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDOztRQUdwQixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDOztRQUdsRCxTQUFTLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLHVCQUF1QixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMseUJBQXlCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbEksSUFBSSxDQUFDLFVBQVUs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bmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7IEluamVjdGFibGUsIE9uRGVzdHJveSwgUXVlcnlMaXN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcy9TdWJqZWN0JztcbmltcG9ydCB7IFRhYmJhYmxlTGlzdEl0ZW1EaXJlY3RpdmUgfSBmcm9tICcuL3RhYmJhYmxlLWxpc3QtaXRlbS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgVVBfQVJST1csIFJJR0hUX0FSUk9XLCBET1dOX0FSUk9XLCBMRUZUX0FSUk9XIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFRhYmJhYmxlTGlzdFNlcnZpY2UgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gICAgaGllcmFyY2h5OiBib29sZWFuID0gZmFsc2U7XG4gICAgYWxsb3dBbHRNb2RpZmllcjogYm9vbGVhbiA9IHRydWU7XG4gICAgYWxsb3dDdHJsTW9kaWZpZXI6IGJvb2xlYW4gPSB0cnVlO1xuICAgIGZvY3VzS2V5TWFuYWdlcjogRm9jdXNLZXlNYW5hZ2VyPFRhYmJhYmxlTGlzdEl0ZW1EaXJlY3RpdmU+O1xuXG4gICAgcHJpdmF0ZSBfaXRlbXM6IFF1ZXJ5TGlzdDxUYWJiYWJsZUxpc3RJdGVtRGlyZWN0aXZlPjtcbiAgICBwcml2YXRlIF9kaXJlY3Rpb246ICdob3Jpem9udGFsJyB8ICd2ZXJ0aWNhbCc7XG4gICAgcHJpdmF0ZSBfb25EZXN0cm95ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9vbkRlc3Ryb3kubmV4dCgpO1xuICAgICAgICB0aGlzLl9vbkRlc3Ryb3kuY29tcGxldGUoKTtcbiAgICB9XG5cbiAgICBpbml0aWFsaXplKGl0ZW1zOiBRdWVyeUxpc3Q8VGFiYmFibGVMaXN0SXRlbURpcmVjdGl2ZT4sIGRpcmVjdGlvbjogJ2hvcml6b250YWwnIHwgJ3ZlcnRpY2FsJywgd3JhcDogYm9vbGVhbik6IHZvaWQge1xuXG4gICAgICAgIC8vIHN0b3JlIHRoZSBpdGVtc1xuICAgICAgICB0aGlzLl9pdGVtcyA9IGl0ZW1zO1xuXG4gICAgICAgIC8vIGNyZWF0ZSB0aGUgbmV3IGZvY3VzIGtleSBtYW5hZ2VyXG4gICAgICAgIHRoaXMuZm9jdXNLZXlNYW5hZ2VyID0gbmV3IEZvY3VzS2V5TWFuYWdlcihpdGVtcyk7XG5cbiAgICAgICAgLy8gc2V0IHRoZSBkaXJlY3Rpb24gb2YgdGhlIGxpc3RcbiAgICAgICAgZGlyZWN0aW9uID09PSAndmVydGljYWwnID8gdGhpcy5mb2N1c0tleU1hbmFnZXIud2l0aFZlcnRpY2FsT3JpZW50YXRpb24oKSA6IHRoaXMuZm9jdXNLZXlNYW5hZ2VyLndpdGhIb3Jpem9udGFsT3JpZW50YXRpb24oJ2x0cicpO1xuICAgICAgICB0aGlzLl9kaXJlY3Rpb24gPSBkaXJlY3Rpb247XG5cbiAgICAgICAgLy8gZW5hYmxlIHdyYXBwaW5nIGlmIHJlcXVpcmVkXG4gICAgICAgIGlmICh3cmFwKSB7XG4gICAgICAgICAgICB0aGlzLmZvY3VzS2V5TWFuYWdlci53aXRoV3JhcCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gbWFrZSBzdXJlIHRoZSBmaXJzdCBpdGVtIGluIHRoZSBsaXN0IGlzIHRhYmJhYmxlXG4gICAgICAgIHRoaXMuc2V0Rmlyc3RJdGVtVGFiYmFibGUoKTtcblxuICAgICAgICAvLyBjYWxsIHRoZSBpbml0IGZ1bmN0aW9uIG9uIGVhY2ggaXRlbVxuICAgICAgICB0aGlzLl9pdGVtcy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5vbkluaXQoKSk7XG5cbiAgICAgICAgLy8gaWYgdGhlIGxpc3QgY2hhbmdlcyB3ZSBuZWVkIHRvIGVuc3VyZSB0aGVyZSBpcyBhbHdheXMgYXQgbGVhc3Qgb25lIHRhYmJhYmxlIGl0ZW1cbiAgICAgICAgdGhpcy5faXRlbXMuY2hhbmdlcy5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKS5zdWJzY3JpYmUoKCkgPT4ge1xuXG4gICAgICAgICAgICAvLyBjYWxsIHRoZSBvbiBpbml0IGZ1bmN0aW9uIG9uIGFueSBuZXcgaXRlbXNcbiAgICAgICAgICAgIHRoaXMuX2l0ZW1zLmZpbHRlcihpdGVtID0+ICFpdGVtLmluaXRpYWxpemVkKS5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5vbkluaXQoKSk7XG5cbiAgICAgICAgICAgIC8vIGVuc3VyZSB0aGVyZSBpcyBhdCBsZWFzdCBvbmUgaXRlbSB0YWJiYWJsZSBhdCBhbGwgdGltZXNcbiAgICAgICAgICAgIHRoaXMuZW5zdXJlVGFiYmFibGVJdGVtKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGFjdGl2YXRlKGl0ZW06IFRhYmJhYmxlTGlzdEl0ZW1EaXJlY3RpdmUpOiB2b2lkIHtcblxuICAgICAgICBpZiAoIWl0ZW0pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGdldCB0aGUgaXRlbSBpbmRleFxuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuX2l0ZW1zLnRvQXJyYXkoKS5pbmRleE9mKGl0ZW0pO1xuXG4gICAgICAgIC8vIGFjdGl2ZSB0aGUgaXRlbSBpZiBpdCBpcyBub3QgYWxyZWFkeSBhY3RpdmVcbiAgICAgICAgaWYgKHRoaXMuZm9jdXNLZXlNYW5hZ2VyLmFjdGl2ZUl0ZW1JbmRleCAhPT0gaW5kZXgpIHtcbiAgICAgICAgICAgIHRoaXMuZm9jdXNLZXlNYW5hZ2VyLnNldEFjdGl2ZUl0ZW0oaW5kZXgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaXNJdGVtQWN0aXZlKGl0ZW06IFRhYmJhYmxlTGlzdEl0ZW1EaXJlY3RpdmUpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9jdXNLZXlNYW5hZ2VyLmFjdGl2ZUl0ZW0uaWQgPT09IGl0ZW0uaWQ7XG4gICAgfVxuXG4gICAgc2V0Rmlyc3RJdGVtVGFiYmFibGUoKTogdm9pZCB7XG4gICAgICAgIC8vIGRlbGF5IHRvIHByZXZlbnQgZXhwcmVzc2lvbiBjaGFuZ2VkIGFmdGVyIGNoZWNrIGVycm9yXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2l0ZW1zLmZpcnN0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5faXRlbXMuZmlyc3QudGFiaW5kZXggPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBlbnN1cmVUYWJiYWJsZUl0ZW0oKTogdm9pZCB7XG4gICAgICAgIC8vIGNoZWNrIHRvIHNlZSBpZiBhbnkgaXRlbSBpcyB0YWJiYWJsZVxuICAgICAgICBjb25zdCBhY3RpdmUgPSB0aGlzLl9pdGVtcy5maW5kKGl0ZW0gPT4gaXRlbS50YWJpbmRleCA9PT0gMCk7XG5cbiAgICAgICAgaWYgKCFhY3RpdmUpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0Rmlyc3RJdGVtVGFiYmFibGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZvY3VzVGFiYmFibGVJdGVtKCk6IHZvaWQge1xuXG4gICAgICAgIGlmICghdGhpcy5faXRlbXMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGZpbmQgdGhlIGl0ZW0gaW4gdGhlIGxpc3Qgd2l0aCBhIHRhYiBpbmRleFxuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuX2l0ZW1zLnRvQXJyYXkoKS5maW5kSW5kZXgoaXRlbSA9PiBpdGVtLnRhYmluZGV4ID09PSAwKTtcblxuICAgICAgICAvLyBpZiBhbiBpdGVtIHdhcyBmb3VuZCB0aGVuIGZvY3VzIGl0XG4gICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuZm9jdXNLZXlNYW5hZ2VyLnNldEFjdGl2ZUl0ZW0oaW5kZXgpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBvbktleWRvd24oc291cmNlOiBUYWJiYWJsZUxpc3RJdGVtRGlyZWN0aXZlLCBldmVudDogS2V5Ym9hcmRFdmVudCk6IGFueSB7XG5cbiAgICAgICAgLy8gcHJldmVudCBhbnl0aGluZyBoYXBwZW5pbmcgd2hlbiBtb2RpZmllciBrZXlzIGFyZSBwcmVzc2VkIGlmIHRoZXkgaGF2ZSBiZWVuIGRpc2FibGVkXG4gICAgICAgIGlmICghdGhpcy5hbGxvd0FsdE1vZGlmaWVyICYmIGV2ZW50LmFsdEtleSB8fCAhdGhpcy5hbGxvd0N0cmxNb2RpZmllciAmJiBldmVudC5jdHJsS2V5KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmZvY3VzS2V5TWFuYWdlci5vbktleWRvd24oZXZlbnQpO1xuXG4gICAgICAgIGlmICh0aGlzLmhpZXJhcmNoeSkge1xuXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgKHRoaXMuX2RpcmVjdGlvbiA9PT0gJ2hvcml6b250YWwnICYmIGV2ZW50LmtleUNvZGUgPT09IERPV05fQVJST1cpIHx8XG4gICAgICAgICAgICAgICAgKHRoaXMuX2RpcmVjdGlvbiA9PT0gJ3ZlcnRpY2FsJyAmJiBldmVudC5rZXlDb2RlID09PSBSSUdIVF9BUlJPVylcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHNvdXJjZS5rZXlib2FyZEV4cGFuZGVkJC5uZXh0KHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgICAgICAodGhpcy5fZGlyZWN0aW9uID09PSAnaG9yaXpvbnRhbCcgJiYgZXZlbnQua2V5Q29kZSA9PT0gVVBfQVJST1cpIHx8XG4gICAgICAgICAgICAgICAgKHRoaXMuX2RpcmVjdGlvbiA9PT0gJ3ZlcnRpY2FsJyAmJiBldmVudC5rZXlDb2RlID09PSBMRUZUX0FSUk9XKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNvdXJjZS5jaGlsZHJlbi5sZW5ndGggPiAwICYmIHNvdXJjZS5leHBhbmRlZCkge1xuICAgICAgICAgICAgICAgICAgICBzb3VyY2Uua2V5Ym9hcmRFeHBhbmRlZCQubmV4dChmYWxzZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzb3VyY2UucGFyZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZS5wYXJlbnQua2V5Ym9hcmRFeHBhbmRlZCQubmV4dChmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc29ydEl0ZW1zQnlIaWVyYXJjaHkobGlzdDogUXVlcnlMaXN0PFRhYmJhYmxlTGlzdEl0ZW1EaXJlY3RpdmU+KTogVGFiYmFibGVMaXN0SXRlbURpcmVjdGl2ZVtdIHtcblxuICAgICAgICBjb25zdCB0b3BMZXZlbDogVGFiYmFibGVMaXN0SXRlbURpcmVjdGl2ZVtdID0gW107XG5cbiAgICAgICAgLy8gUG9wdWxhdGluZyBjaGlsZHJlbiAtIGNsZWFyIHByZXZpb3VzbHkgZ2VuZXJhdGVkIGNvbGxlY3Rpb25cbiAgICAgICAgbGlzdC5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jaGlsZHJlbiA9IFtdKTtcblxuICAgICAgICAvLyBQb3B1bGF0aW5nIGNoaWxkcmVuIC0gbWFwIGZyb20gY2hpbGQgLT4gcGFyZW50IHJlbGF0aW9uc2hpcFxuICAgICAgICBsaXN0LmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICBpZiAoaXRlbS5wYXJlbnQpIHtcbiAgICAgICAgICAgICAgICBpdGVtLnBhcmVudC5jaGlsZHJlbi5wdXNoKGl0ZW0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0b3BMZXZlbC5wdXNoKGl0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBGbGF0dGVuIHRoZSB0cmVlIHRvIHByb2R1Y2UgdGhlIGN1cnNvciBrZXkgb3JkZXJcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5mbGF0dGVuSGllcmFyY2h5KHRvcExldmVsKTtcblxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIHByaXZhdGUgZmxhdHRlbkhpZXJhcmNoeShpdGVtczogVGFiYmFibGVMaXN0SXRlbURpcmVjdGl2ZVtdKTogVGFiYmFibGVMaXN0SXRlbURpcmVjdGl2ZVtdIHtcbiAgICAgICAgY29uc3QgZmxhdExpc3Q6IFRhYmJhYmxlTGlzdEl0ZW1EaXJlY3RpdmVbXSA9IFtdO1xuICAgICAgICBpdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgaXRlbS5jaGlsZHJlbi5zb3J0KChhLCBiKSA9PiBhLnJhbmsgLSBiLnJhbmspO1xuICAgICAgICAgICAgY29uc3QgZGVzY2VuZGFudHMgPSB0aGlzLmZsYXR0ZW5IaWVyYXJjaHkoaXRlbS5jaGlsZHJlbik7XG4gICAgICAgICAgICBmbGF0TGlzdC5wdXNoKGl0ZW0sIC4uLmRlc2NlbmRhbnRzKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBmbGF0TGlzdDtcbiAgICB9XG59XG4iXX0=