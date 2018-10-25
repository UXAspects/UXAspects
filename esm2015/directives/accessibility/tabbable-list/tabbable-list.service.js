/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { FocusKeyManager } from '@angular/cdk/a11y';
import { DOWN_ARROW, END, HOME, LEFT_ARROW, RIGHT_ARROW, UP_ARROW } from '@angular/cdk/keycodes';
import { Injectable } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
export class TabbableListService {
    constructor() {
        this.hierarchy = false;
        this.allowAltModifier = true;
        this.allowCtrlModifier = true;
        this.allowBoundaryKeys = false;
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
        requestAnimationFrame(() => {
            // find the first item that is not disabled
            const /** @type {?} */ first = this._items.find(item => !item.disabled);
            if (first) {
                first.tabindex = 0;
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
        return this.flattenHierarchy(topLevel);
    }
    /**
     * @param {?} items
     * @return {?}
     */
    flattenHierarchy(items) {
        const /** @type {?} */ flatList = [];
        items.forEach(item => {
            item.children.sort((a, b) => a.rank - b.rank);
            flatList.push(item, ...this.flattenHierarchy(item.children));
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiYmFibGUtbGlzdC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvYWNjZXNzaWJpbGl0eS90YWJiYWJsZS1saXN0L3RhYmJhYmxlLWxpc3Quc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2pHLE9BQU8sRUFBRSxVQUFVLEVBQXdCLE1BQU0sZUFBZSxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBSXZDLE1BQU07O3lCQUVtQixLQUFLO2dDQUNFLElBQUk7aUNBQ0gsSUFBSTtpQ0FDSixLQUFLOzBCQUtiLElBQUksT0FBTyxFQUFROzs7OztJQUV4QyxXQUFXO1FBQ1AsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO0tBQzlCOzs7Ozs7O0lBRUQsVUFBVSxDQUFDLEtBQTJDLEVBQUUsU0FBb0MsRUFBRSxJQUFhOztRQUd2RyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQzs7UUFHcEIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7UUFHbEQsU0FBUyxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyx1QkFBdUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLHlCQUF5QixDQUFDLEtBQUss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QztRQUNqRCxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ2pCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDOUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7U0FDaEUsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLFFBQVEsQ0FBQzs7OztZQS9LdkIsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZvY3VzS2V5TWFuYWdlciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7IERPV05fQVJST1csIEVORCwgSE9NRSwgTEVGVF9BUlJPVywgUklHSFRfQVJST1csIFVQX0FSUk9XIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7IEluamVjdGFibGUsIE9uRGVzdHJveSwgUXVlcnlMaXN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcy9TdWJqZWN0JztcbmltcG9ydCB7IFRhYmJhYmxlTGlzdEl0ZW1EaXJlY3RpdmUgfSBmcm9tICcuL3RhYmJhYmxlLWxpc3QtaXRlbS5kaXJlY3RpdmUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVGFiYmFibGVMaXN0U2VydmljZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG5cbiAgICBoaWVyYXJjaHk6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBhbGxvd0FsdE1vZGlmaWVyOiBib29sZWFuID0gdHJ1ZTtcbiAgICBhbGxvd0N0cmxNb2RpZmllcjogYm9vbGVhbiA9IHRydWU7XG4gICAgYWxsb3dCb3VuZGFyeUtleXM6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBmb2N1c0tleU1hbmFnZXI6IEZvY3VzS2V5TWFuYWdlcjxUYWJiYWJsZUxpc3RJdGVtRGlyZWN0aXZlPjtcblxuICAgIHByaXZhdGUgX2l0ZW1zOiBRdWVyeUxpc3Q8VGFiYmFibGVMaXN0SXRlbURpcmVjdGl2ZT47XG4gICAgcHJpdmF0ZSBfZGlyZWN0aW9uOiAnaG9yaXpvbnRhbCcgfCAndmVydGljYWwnO1xuICAgIHByaXZhdGUgX29uRGVzdHJveSA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fb25EZXN0cm95Lm5leHQoKTtcbiAgICAgICAgdGhpcy5fb25EZXN0cm95LmNvbXBsZXRlKCk7XG4gICAgfVxuXG4gICAgaW5pdGlhbGl6ZShpdGVtczogUXVlcnlMaXN0PFRhYmJhYmxlTGlzdEl0ZW1EaXJlY3RpdmU+LCBkaXJlY3Rpb246ICdob3Jpem9udGFsJyB8ICd2ZXJ0aWNhbCcsIHdyYXA6IGJvb2xlYW4pOiB2b2lkIHtcblxuICAgICAgICAvLyBzdG9yZSB0aGUgaXRlbXNcbiAgICAgICAgdGhpcy5faXRlbXMgPSBpdGVtcztcblxuICAgICAgICAvLyBjcmVhdGUgdGhlIG5ldyBmb2N1cyBrZXkgbWFuYWdlclxuICAgICAgICB0aGlzLmZvY3VzS2V5TWFuYWdlciA9IG5ldyBGb2N1c0tleU1hbmFnZXIoaXRlbXMpO1xuXG4gICAgICAgIC8vIHNldCB0aGUgZGlyZWN0aW9uIG9mIHRoZSBsaXN0XG4gICAgICAgIGRpcmVjdGlvbiA9PT0gJ3ZlcnRpY2FsJyA/IHRoaXMuZm9jdXNLZXlNYW5hZ2VyLndpdGhWZXJ0aWNhbE9yaWVudGF0aW9uKCkgOiB0aGlzLmZvY3VzS2V5TWFuYWdlci53aXRoSG9yaXpvbnRhbE9yaWVudGF0aW9uKCdsdHInKTtcbiAgICAgICAgdGhpcy5fZGlyZWN0aW9uID0gZGlyZWN0aW9uO1xuXG4gICAgICAgIC8vIGVuYWJsZSB3cmFwcGluZyBpZiByZXF1aXJlZFxuICAgICAgICBpZiAod3JhcCkge1xuICAgICAgICAgICAgdGhpcy5mb2N1c0tleU1hbmFnZXIud2l0aFdyYXAoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG1ha2Ugc3VyZSB0aGUgZmlyc3QgaXRlbSBpbiB0aGUgbGlzdCBpcyB0YWJiYWJsZVxuICAgICAgICB0aGlzLnNldEZpcnN0SXRlbVRhYmJhYmxlKCk7XG5cbiAgICAgICAgLy8gY2FsbCB0aGUgaW5pdCBmdW5jdGlvbiBvbiBlYWNoIGl0ZW1cbiAgICAgICAgdGhpcy5faXRlbXMuZm9yRWFjaChpdGVtID0+IGl0ZW0ub25Jbml0KCkpO1xuXG4gICAgICAgIC8vIGlmIHRoZSBsaXN0IGNoYW5nZXMgd2UgbmVlZCB0byBlbnN1cmUgdGhlcmUgaXMgYWx3YXlzIGF0IGxlYXN0IG9uZSB0YWJiYWJsZSBpdGVtXG4gICAgICAgIHRoaXMuX2l0ZW1zLmNoYW5nZXMucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSkuc3Vic2NyaWJlKCgpID0+IHtcblxuICAgICAgICAgICAgLy8gY2FsbCB0aGUgb24gaW5pdCBmdW5jdGlvbiBvbiBhbnkgbmV3IGl0ZW1zXG4gICAgICAgICAgICB0aGlzLl9pdGVtcy5maWx0ZXIoaXRlbSA9PiAhaXRlbS5pbml0aWFsaXplZCkuZm9yRWFjaChpdGVtID0+IGl0ZW0ub25Jbml0KCkpO1xuXG4gICAgICAgICAgICAvLyBlbnN1cmUgdGhlcmUgaXMgYXQgbGVhc3Qgb25lIGl0ZW0gdGFiYmFibGUgYXQgYWxsIHRpbWVzXG4gICAgICAgICAgICB0aGlzLmVuc3VyZVRhYmJhYmxlSXRlbSgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBhY3RpdmF0ZShpdGVtOiBUYWJiYWJsZUxpc3RJdGVtRGlyZWN0aXZlKTogdm9pZCB7XG5cbiAgICAgICAgaWYgKCFpdGVtKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBnZXQgdGhlIGl0ZW0gaW5kZXhcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLl9pdGVtcy50b0FycmF5KCkuaW5kZXhPZihpdGVtKTtcblxuICAgICAgICAvLyBhY3RpdmUgdGhlIGl0ZW0gaWYgaXQgaXMgbm90IGFscmVhZHkgYWN0aXZlXG4gICAgICAgIGlmICh0aGlzLmZvY3VzS2V5TWFuYWdlci5hY3RpdmVJdGVtSW5kZXggIT09IGluZGV4KSB7XG4gICAgICAgICAgICB0aGlzLmZvY3VzS2V5TWFuYWdlci5zZXRBY3RpdmVJdGVtKGluZGV4KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlzSXRlbUFjdGl2ZShpdGVtOiBUYWJiYWJsZUxpc3RJdGVtRGlyZWN0aXZlKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmZvY3VzS2V5TWFuYWdlci5hY3RpdmVJdGVtLmlkID09PSBpdGVtLmlkO1xuICAgIH1cblxuICAgIHNldEZpcnN0SXRlbVRhYmJhYmxlKCk6IHZvaWQge1xuICAgICAgICAvLyBkZWxheSB0byBwcmV2ZW50IGV4cHJlc3Npb24gY2hhbmdlZCBhZnRlciBjaGVjayBlcnJvclxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICAgICAgLy8gZmluZCB0aGUgZmlyc3QgaXRlbSB0aGF0IGlzIG5vdCBkaXNhYmxlZFxuICAgICAgICAgICAgY29uc3QgZmlyc3QgPSB0aGlzLl9pdGVtcy5maW5kKGl0ZW0gPT4gIWl0ZW0uZGlzYWJsZWQpO1xuXG4gICAgICAgICAgICBpZiAoZmlyc3QpIHtcbiAgICAgICAgICAgICAgICBmaXJzdC50YWJpbmRleCA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGVuc3VyZVRhYmJhYmxlSXRlbSgpOiB2b2lkIHtcbiAgICAgICAgLy8gY2hlY2sgdG8gc2VlIGlmIGFueSBpdGVtIGlzIHRhYmJhYmxlXG4gICAgICAgIGNvbnN0IGFjdGl2ZSA9IHRoaXMuX2l0ZW1zLmZpbmQoaXRlbSA9PiBpdGVtLnRhYmluZGV4ID09PSAwKTtcblxuICAgICAgICBpZiAoIWFjdGl2ZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRGaXJzdEl0ZW1UYWJiYWJsZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZm9jdXNUYWJiYWJsZUl0ZW0oKTogdm9pZCB7XG5cbiAgICAgICAgaWYgKCF0aGlzLl9pdGVtcykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZmluZCB0aGUgaXRlbSBpbiB0aGUgbGlzdCB3aXRoIGEgdGFiIGluZGV4XG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5faXRlbXMudG9BcnJheSgpLmZpbmRJbmRleChpdGVtID0+IGl0ZW0udGFiaW5kZXggPT09IDApO1xuXG4gICAgICAgIC8vIGlmIGFuIGl0ZW0gd2FzIGZvdW5kIHRoZW4gZm9jdXMgaXRcbiAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgdGhpcy5mb2N1c0tleU1hbmFnZXIuc2V0QWN0aXZlSXRlbShpbmRleCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIG9uS2V5ZG93bihzb3VyY2U6IFRhYmJhYmxlTGlzdEl0ZW1EaXJlY3RpdmUsIGV2ZW50OiBLZXlib2FyZEV2ZW50KTogYW55IHtcblxuICAgICAgICAvLyBwcmV2ZW50IGFueXRoaW5nIGhhcHBlbmluZyB3aGVuIG1vZGlmaWVyIGtleXMgYXJlIHByZXNzZWQgaWYgdGhleSBoYXZlIGJlZW4gZGlzYWJsZWRcbiAgICAgICAgaWYgKCF0aGlzLmFsbG93QWx0TW9kaWZpZXIgJiYgZXZlbnQuYWx0S2V5IHx8ICF0aGlzLmFsbG93Q3RybE1vZGlmaWVyICYmIGV2ZW50LmN0cmxLZXkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZm9jdXNLZXlNYW5hZ2VyLm9uS2V5ZG93bihldmVudCk7XG5cbiAgICAgICAgLy8gaWYgdGhlIGtleSBpcyBhIGJvdW5kYXJ5IGtleSBhbmQgYm91bmRhcnkga2V5cyBhcmUgZW5hYmxlZFxuICAgICAgICBpZiAodGhpcy5hbGxvd0JvdW5kYXJ5S2V5cykge1xuICAgICAgICAgICAgc3dpdGNoIChldmVudC53aGljaCkge1xuICAgICAgICAgICAgICAgIGNhc2UgSE9NRTpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mb2N1c0tleU1hbmFnZXIuc2V0Rmlyc3RJdGVtQWN0aXZlKCk7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSBFTkQ6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZm9jdXNLZXlNYW5hZ2VyLnNldExhc3RJdGVtQWN0aXZlKCk7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaGllcmFyY2h5KSB7XG5cbiAgICAgICAgICAgIGlmICgodGhpcy5fZGlyZWN0aW9uID09PSAnaG9yaXpvbnRhbCcgJiYgZXZlbnQua2V5Q29kZSA9PT0gRE9XTl9BUlJPVykgfHxcbiAgICAgICAgICAgICAgICAodGhpcy5fZGlyZWN0aW9uID09PSAndmVydGljYWwnICYmIGV2ZW50LmtleUNvZGUgPT09IFJJR0hUX0FSUk9XKSkge1xuICAgICAgICAgICAgICAgIHNvdXJjZS5rZXlib2FyZEV4cGFuZGVkJC5uZXh0KHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICgodGhpcy5fZGlyZWN0aW9uID09PSAnaG9yaXpvbnRhbCcgJiYgZXZlbnQua2V5Q29kZSA9PT0gVVBfQVJST1cpIHx8XG4gICAgICAgICAgICAgICAgKHRoaXMuX2RpcmVjdGlvbiA9PT0gJ3ZlcnRpY2FsJyAmJiBldmVudC5rZXlDb2RlID09PSBMRUZUX0FSUk9XKSkge1xuXG4gICAgICAgICAgICAgICAgaWYgKHNvdXJjZS5jaGlsZHJlbi5sZW5ndGggPiAwICYmIHNvdXJjZS5leHBhbmRlZCkge1xuICAgICAgICAgICAgICAgICAgICBzb3VyY2Uua2V5Ym9hcmRFeHBhbmRlZCQubmV4dChmYWxzZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzb3VyY2UucGFyZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZS5wYXJlbnQua2V5Ym9hcmRFeHBhbmRlZCQubmV4dChmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc29ydEl0ZW1zQnlIaWVyYXJjaHkobGlzdDogUXVlcnlMaXN0PFRhYmJhYmxlTGlzdEl0ZW1EaXJlY3RpdmU+KTogVGFiYmFibGVMaXN0SXRlbURpcmVjdGl2ZVtdIHtcblxuICAgICAgICBjb25zdCB0b3BMZXZlbDogVGFiYmFibGVMaXN0SXRlbURpcmVjdGl2ZVtdID0gW107XG5cbiAgICAgICAgLy8gUG9wdWxhdGluZyBjaGlsZHJlbiAtIGNsZWFyIHByZXZpb3VzbHkgZ2VuZXJhdGVkIGNvbGxlY3Rpb25cbiAgICAgICAgbGlzdC5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jaGlsZHJlbiA9IFtdKTtcblxuICAgICAgICAvLyBQb3B1bGF0aW5nIGNoaWxkcmVuIC0gbWFwIGZyb20gY2hpbGQgLT4gcGFyZW50IHJlbGF0aW9uc2hpcFxuICAgICAgICBsaXN0LmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICBpZiAoaXRlbS5wYXJlbnQpIHtcbiAgICAgICAgICAgICAgICBpdGVtLnBhcmVudC5jaGlsZHJlbi5wdXNoKGl0ZW0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0b3BMZXZlbC5wdXNoKGl0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBGbGF0dGVuIHRoZSB0cmVlIHRvIHByb2R1Y2UgdGhlIGN1cnNvciBrZXkgb3JkZXJcbiAgICAgICAgcmV0dXJuIHRoaXMuZmxhdHRlbkhpZXJhcmNoeSh0b3BMZXZlbCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBmbGF0dGVuSGllcmFyY2h5KGl0ZW1zOiBUYWJiYWJsZUxpc3RJdGVtRGlyZWN0aXZlW10pOiBUYWJiYWJsZUxpc3RJdGVtRGlyZWN0aXZlW10ge1xuICAgICAgICBjb25zdCBmbGF0TGlzdDogVGFiYmFibGVMaXN0SXRlbURpcmVjdGl2ZVtdID0gW107XG4gICAgICAgIGl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICBpdGVtLmNoaWxkcmVuLnNvcnQoKGEsIGIpID0+IGEucmFuayAtIGIucmFuayk7XG4gICAgICAgICAgICBmbGF0TGlzdC5wdXNoKGl0ZW0sIC4uLnRoaXMuZmxhdHRlbkhpZXJhcmNoeShpdGVtLmNoaWxkcmVuKSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZmxhdExpc3Q7XG4gICAgfVxufVxuIl19