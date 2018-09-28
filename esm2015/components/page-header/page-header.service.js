/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { filter, map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
export class PageHeaderService {
    /**
     * @param {?} _router
     */
    constructor(_router) {
        this._router = _router;
        this.items$ = new BehaviorSubject([]);
        this.selected$ = new BehaviorSubject(null);
        this.selectedRoot$ = new BehaviorSubject(null);
        this.secondary$ = new BehaviorSubject(false);
        this.activeIconMenu$ = new BehaviorSubject(null);
        this.secondaryNavigationAutoselect = false;
        this._onDestroy = new Subject();
        this.selected$
            .pipe(takeUntil(this._onDestroy), map(selected => this.getRoot(selected)))
            .subscribe(root => this.selectedRoot$.next(root));
        this._router.events
            .pipe(takeUntil(this._onDestroy), filter(e => e instanceof NavigationEnd))
            .subscribe(this.updateItemsWithActiveRoute.bind(this));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
    /**
     * @param {?} item
     * @return {?}
     */
    select(item) {
        if (!item) {
            return;
        }
        if (item.routerLink) {
            // Trigger router navigation
            const /** @type {?} */ routerLink = Array.isArray(item.routerLink) ? item.routerLink : [item.routerLink];
            this._router.navigate(routerLink, item.routerExtras);
        }
        else if (this.secondaryNavigationAutoselect && item.children && item.children.length > 0) {
            // Select the first child in secondaryNavigationAutoselect mode
            this.select(item.children[0]);
        }
        else {
            // if we are in secondary navigation mode and we click a parent - dont deselect the child
            if (this.secondary$.getValue() === true && this.isParentOf(this.selected$.getValue(), item)) {
                return;
            }
            // Otherwise select the given item
            this.selected$.next(item);
        }
    }
    /**
     * @param {?} item
     * @return {?}
     */
    deselect(item) {
        // deselect the current item
        item.selected = false;
        // iterate any children and deselect them
        if (item.children) {
            item.children.forEach(_item => this.deselect(_item));
        }
    }
    /**
     * @return {?}
     */
    deselectAll() {
        this.items$.getValue().forEach(item => this.deselect(item));
    }
    /**
     * @param {?} item
     * @param {?} selected
     * @return {?}
     */
    updateItem(item, selected) {
        // Item is selected if it is the selected item, or one of the selected item's ancestors.
        item.selected = item === selected || this.isParentOf(selected, item);
        if (item === selected) {
            // call the select function if present
            if (item.select) {
                item.select.call(item, item);
            }
        }
    }
    /**
     * @param {?=} items
     * @return {?}
     */
    setItems(items = []) {
        // identify all parent elements
        items.forEach(item => this.setParent(item));
        this.items$.next(items);
        // Set up the initally selected item
        // If nothing is set as selected, using the initial route
        const /** @type {?} */ initialSelectedItem = items.find(item => item.selected === true);
        if (initialSelectedItem) {
            this.select(initialSelectedItem);
        }
        else {
            this.updateItemsWithActiveRoute();
        }
    }
    /**
     * @param {?} enabled
     * @return {?}
     */
    setSecondaryNavigation(enabled) {
        this.secondary$.next(enabled);
    }
    /**
     * @param {?} item
     * @return {?}
     */
    getRoot(item) {
        return item && item.parent ? this.getRoot(item.parent) : item;
    }
    /**
     * @param {?} item
     * @param {?=} parent
     * @return {?}
     */
    setParent(item, parent) {
        // set the parent field
        item.parent = parent;
        // call this function recursively on all children
        if (item.children) {
            item.children.forEach(child => this.setParent(child, item));
        }
    }
    /**
     * @param {?} node
     * @param {?} parent
     * @return {?}
     */
    isParentOf(node, parent) {
        // if there are no parents return false
        if (!node || !node.parent) {
            return false;
        }
        // if the parent is the match we are looking for return true
        if (node.parent === parent) {
            return true;
        }
        // if there are potentially grandparents then check them too
        return this.isParentOf(node.parent, parent);
    }
    /**
     * @return {?}
     */
    updateItemsWithActiveRoute() {
        const /** @type {?} */ activeItem = new PageHeaderActiveNavigationItem();
        for (var /** @type {?} */ item of this.items$.getValue()) {
            this.findActiveItem(item, activeItem);
            if (activeItem.exact) {
                break;
            }
        }
        if (activeItem.item) {
            this.selected$.next(activeItem.item);
        }
    }
    /**
     * @param {?} item
     * @param {?} activeItem
     * @return {?}
     */
    findActiveItem(item, activeItem) {
        if (item.routerLink) {
            const /** @type {?} */ routerLink = Array.isArray(item.routerLink) ? item.routerLink : [item.routerLink];
            const /** @type {?} */ urlTree = this._router.createUrlTree(routerLink, item.routerExtras);
            if (this._router.isActive(urlTree, true) && !activeItem.exact) {
                // When the item route is an exact match, no need to look any further
                activeItem.item = item;
                activeItem.exact = true;
                return;
            }
            if (this._router.isActive(urlTree, false)) {
                // Store an inexact match and continue looking
                activeItem.item = item;
                activeItem.exact = false;
            }
        }
        if (item.children) {
            for (let /** @type {?} */ childItem of item.children) {
                this.findActiveItem(childItem, activeItem);
                if (activeItem.exact) {
                    return;
                }
            }
        }
    }
}
PageHeaderService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
PageHeaderService.ctorParameters = () => [
    { type: Router }
];
function PageHeaderService_tsickle_Closure_declarations() {
    /** @type {?} */
    PageHeaderService.prototype.items$;
    /** @type {?} */
    PageHeaderService.prototype.selected$;
    /** @type {?} */
    PageHeaderService.prototype.selectedRoot$;
    /** @type {?} */
    PageHeaderService.prototype.secondary$;
    /** @type {?} */
    PageHeaderService.prototype.activeIconMenu$;
    /** @type {?} */
    PageHeaderService.prototype.secondaryNavigationAutoselect;
    /** @type {?} */
    PageHeaderService.prototype._onDestroy;
    /** @type {?} */
    PageHeaderService.prototype._router;
}
class PageHeaderActiveNavigationItem {
}
function PageHeaderActiveNavigationItem_tsickle_Closure_declarations() {
    /** @type {?} */
    PageHeaderActiveNavigationItem.prototype.item;
    /** @type {?} */
    PageHeaderActiveNavigationItem.prototype.exact;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1oZWFkZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3BhZ2UtaGVhZGVyL3BhZ2UtaGVhZGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDdEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDdkQsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUt2QyxNQUFNOzs7O0lBVUYsWUFBb0IsT0FBZTtRQUFmLFlBQU8sR0FBUCxPQUFPLENBQVE7c0JBVDFCLElBQUksZUFBZSxDQUE2QixFQUFFLENBQUM7eUJBQ2hELElBQUksZUFBZSxDQUEyQixJQUFJLENBQUM7NkJBQy9DLElBQUksZUFBZSxDQUEyQixJQUFJLENBQUM7MEJBQ3RELElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQzsrQkFDOUIsSUFBSSxlQUFlLENBQXFCLElBQUksQ0FBQzs2Q0FDL0IsS0FBSzswQkFFaEIsSUFBSSxPQUFPLEVBQUU7UUFJOUIsSUFBSSxDQUFDLFNBQVM7YUFDVCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7YUFDekUsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUV0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RyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBRTFFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDOztnQkFHNUQsVUFBVSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7Z0JBQ3ZCLFVBQVUsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO2dCQUV4QixNQUFNLENBQUM7YUFDVjtZQUVELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7O2dCQUd4QyxVQUFVLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztnQkFDdkIsVUFBVSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7YUFDNUI7U0FDSjtRQUVELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLEdBQUcsQ0FBQyxDQUFDLHFCQUFJLFNBQVMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDbEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUM7Z0JBQzNDLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUNuQixNQUFNLENBQUM7aUJBQ1Y7YUFDSjtTQUNKOzs7O1lBbExSLFVBQVU7Ozs7WUFQYSxNQUFNOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQStMOUI7Q0FHQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmF2aWdhdGlvbkVuZCwgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMvQmVoYXZpb3JTdWJqZWN0JztcbmltcG9ydCB7IGZpbHRlciwgbWFwLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcy9TdWJqZWN0JztcbmltcG9ydCB7IFBhZ2VIZWFkZXJJY29uTWVudSB9IGZyb20gJy4vaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBQYWdlSGVhZGVyTmF2aWdhdGlvbkRyb3Bkb3duSXRlbSwgUGFnZUhlYWRlck5hdmlnYXRpb25JdGVtIH0gZnJvbSAnLi9uYXZpZ2F0aW9uL25hdmlnYXRpb24uY29tcG9uZW50JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFBhZ2VIZWFkZXJTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgICBpdGVtcyQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFBhZ2VIZWFkZXJOYXZpZ2F0aW9uSXRlbVtdPihbXSk7XG4gICAgc2VsZWN0ZWQkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxQYWdlSGVhZGVyTmF2aWdhdGlvbkl0ZW0+KG51bGwpO1xuICAgIHNlbGVjdGVkUm9vdCQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFBhZ2VIZWFkZXJOYXZpZ2F0aW9uSXRlbT4obnVsbCk7XG4gICAgc2Vjb25kYXJ5JCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICAgIGFjdGl2ZUljb25NZW51JCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8UGFnZUhlYWRlckljb25NZW51PihudWxsKTtcbiAgICBzZWNvbmRhcnlOYXZpZ2F0aW9uQXV0b3NlbGVjdCA9IGZhbHNlO1xuXG4gICAgcHJpdmF0ZSBfb25EZXN0cm95ID0gbmV3IFN1YmplY3QoKTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX3JvdXRlcjogUm91dGVyKSB7XG5cbiAgICAgICAgdGhpcy5zZWxlY3RlZCRcbiAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpLCBtYXAoc2VsZWN0ZWQgPT4gdGhpcy5nZXRSb290KHNlbGVjdGVkKSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKHJvb3QgPT4gdGhpcy5zZWxlY3RlZFJvb3QkLm5leHQocm9vdCkpO1xuXG4gICAgICAgIHRoaXMuX3JvdXRlci5ldmVudHNcbiAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpLCBmaWx0ZXIoZSA9PiBlIGluc3RhbmNlb2YgTmF2aWdhdGlvbkVuZCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKHRoaXMudXBkYXRlSXRlbXNXaXRoQWN0aXZlUm91dGUuYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX29uRGVzdHJveS5uZXh0KCk7XG4gICAgICAgIHRoaXMuX29uRGVzdHJveS5jb21wbGV0ZSgpO1xuICAgIH1cblxuICAgIHNlbGVjdChpdGVtOiBQYWdlSGVhZGVyTmF2aWdhdGlvbkl0ZW0pOiB2b2lkIHtcblxuICAgICAgICBpZiAoIWl0ZW0pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpdGVtLnJvdXRlckxpbmspIHtcblxuICAgICAgICAgICAgLy8gVHJpZ2dlciByb3V0ZXIgbmF2aWdhdGlvblxuICAgICAgICAgICAgY29uc3Qgcm91dGVyTGluayA9IEFycmF5LmlzQXJyYXkoaXRlbS5yb3V0ZXJMaW5rKSA/IGl0ZW0ucm91dGVyTGluayA6IFtpdGVtLnJvdXRlckxpbmtdO1xuICAgICAgICAgICAgdGhpcy5fcm91dGVyLm5hdmlnYXRlKHJvdXRlckxpbmssIGl0ZW0ucm91dGVyRXh0cmFzKTtcblxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc2Vjb25kYXJ5TmF2aWdhdGlvbkF1dG9zZWxlY3QgJiYgaXRlbS5jaGlsZHJlbiAmJiBpdGVtLmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcblxuICAgICAgICAgICAgLy8gU2VsZWN0IHRoZSBmaXJzdCBjaGlsZCBpbiBzZWNvbmRhcnlOYXZpZ2F0aW9uQXV0b3NlbGVjdCBtb2RlXG4gICAgICAgICAgICB0aGlzLnNlbGVjdChpdGVtLmNoaWxkcmVuWzBdKTtcblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAvLyBpZiB3ZSBhcmUgaW4gc2Vjb25kYXJ5IG5hdmlnYXRpb24gbW9kZSBhbmQgd2UgY2xpY2sgYSBwYXJlbnQgLSBkb250IGRlc2VsZWN0IHRoZSBjaGlsZFxuICAgICAgICAgICAgaWYgKHRoaXMuc2Vjb25kYXJ5JC5nZXRWYWx1ZSgpID09PSB0cnVlICYmIHRoaXMuaXNQYXJlbnRPZih0aGlzLnNlbGVjdGVkJC5nZXRWYWx1ZSgpLCBpdGVtKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gT3RoZXJ3aXNlIHNlbGVjdCB0aGUgZ2l2ZW4gaXRlbVxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCQubmV4dChpdGVtKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRlc2VsZWN0KGl0ZW06IFBhZ2VIZWFkZXJOYXZpZ2F0aW9uSXRlbSB8IFBhZ2VIZWFkZXJOYXZpZ2F0aW9uRHJvcGRvd25JdGVtKTogdm9pZCB7XG4gICAgICAgIC8vIGRlc2VsZWN0IHRoZSBjdXJyZW50IGl0ZW1cbiAgICAgICAgaXRlbS5zZWxlY3RlZCA9IGZhbHNlO1xuXG4gICAgICAgIC8vIGl0ZXJhdGUgYW55IGNoaWxkcmVuIGFuZCBkZXNlbGVjdCB0aGVtXG4gICAgICAgIGlmIChpdGVtLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICBpdGVtLmNoaWxkcmVuLmZvckVhY2goX2l0ZW0gPT4gdGhpcy5kZXNlbGVjdChfaXRlbSkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGVzZWxlY3RBbGwoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaXRlbXMkLmdldFZhbHVlKCkuZm9yRWFjaChpdGVtID0+IHRoaXMuZGVzZWxlY3QoaXRlbSkpO1xuICAgIH1cblxuICAgIHVwZGF0ZUl0ZW0oaXRlbTogUGFnZUhlYWRlck5hdmlnYXRpb25JdGVtLCBzZWxlY3RlZDogUGFnZUhlYWRlck5hdmlnYXRpb25JdGVtKTogdm9pZCB7XG4gICAgICAgIC8vIEl0ZW0gaXMgc2VsZWN0ZWQgaWYgaXQgaXMgdGhlIHNlbGVjdGVkIGl0ZW0sIG9yIG9uZSBvZiB0aGUgc2VsZWN0ZWQgaXRlbSdzIGFuY2VzdG9ycy5cbiAgICAgICAgaXRlbS5zZWxlY3RlZCA9IGl0ZW0gPT09IHNlbGVjdGVkIHx8IHRoaXMuaXNQYXJlbnRPZihzZWxlY3RlZCwgaXRlbSk7XG5cbiAgICAgICAgaWYgKGl0ZW0gPT09IHNlbGVjdGVkKSB7XG4gICAgICAgICAgICAvLyBjYWxsIHRoZSBzZWxlY3QgZnVuY3Rpb24gaWYgcHJlc2VudFxuICAgICAgICAgICAgaWYgKGl0ZW0uc2VsZWN0KSB7XG4gICAgICAgICAgICAgICAgaXRlbS5zZWxlY3QuY2FsbChpdGVtLCBpdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldEl0ZW1zKGl0ZW1zOiBQYWdlSGVhZGVyTmF2aWdhdGlvbkl0ZW1bXSA9IFtdKTogdm9pZCB7XG4gICAgICAgIC8vIGlkZW50aWZ5IGFsbCBwYXJlbnQgZWxlbWVudHNcbiAgICAgICAgaXRlbXMuZm9yRWFjaChpdGVtID0+IHRoaXMuc2V0UGFyZW50KGl0ZW0pKTtcblxuICAgICAgICB0aGlzLml0ZW1zJC5uZXh0KGl0ZW1zKTtcblxuICAgICAgICAvLyBTZXQgdXAgdGhlIGluaXRhbGx5IHNlbGVjdGVkIGl0ZW1cbiAgICAgICAgLy8gSWYgbm90aGluZyBpcyBzZXQgYXMgc2VsZWN0ZWQsIHVzaW5nIHRoZSBpbml0aWFsIHJvdXRlXG4gICAgICAgIGNvbnN0IGluaXRpYWxTZWxlY3RlZEl0ZW0gPSBpdGVtcy5maW5kKGl0ZW0gPT4gaXRlbS5zZWxlY3RlZCA9PT0gdHJ1ZSk7XG4gICAgICAgIGlmIChpbml0aWFsU2VsZWN0ZWRJdGVtKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdChpbml0aWFsU2VsZWN0ZWRJdGVtKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSXRlbXNXaXRoQWN0aXZlUm91dGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldFNlY29uZGFyeU5hdmlnYXRpb24oZW5hYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICB0aGlzLnNlY29uZGFyeSQubmV4dChlbmFibGVkKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFJvb3QoaXRlbTogUGFnZUhlYWRlck5hdmlnYXRpb24pOiBQYWdlSGVhZGVyTmF2aWdhdGlvbiB7XG4gICAgICAgIHJldHVybiBpdGVtICYmIGl0ZW0ucGFyZW50ID8gdGhpcy5nZXRSb290KGl0ZW0ucGFyZW50KSA6IGl0ZW07XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRQYXJlbnQoaXRlbTogUGFnZUhlYWRlck5hdmlnYXRpb24sIHBhcmVudD86IFBhZ2VIZWFkZXJOYXZpZ2F0aW9uIHwgbnVsbCk6IHZvaWQge1xuXG4gICAgICAgIC8vIHNldCB0aGUgcGFyZW50IGZpZWxkXG4gICAgICAgIGl0ZW0ucGFyZW50ID0gcGFyZW50O1xuXG4gICAgICAgIC8vIGNhbGwgdGhpcyBmdW5jdGlvbiByZWN1cnNpdmVseSBvbiBhbGwgY2hpbGRyZW5cbiAgICAgICAgaWYgKGl0ZW0uY2hpbGRyZW4pIHtcbiAgICAgICAgICAgIGl0ZW0uY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB0aGlzLnNldFBhcmVudChjaGlsZCwgaXRlbSkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc1BhcmVudE9mKG5vZGU6IFBhZ2VIZWFkZXJOYXZpZ2F0aW9uLCBwYXJlbnQ6IFBhZ2VIZWFkZXJOYXZpZ2F0aW9uKTogYm9vbGVhbiB7XG5cbiAgICAgICAgLy8gaWYgdGhlcmUgYXJlIG5vIHBhcmVudHMgcmV0dXJuIGZhbHNlXG4gICAgICAgIGlmICghbm9kZSB8fCAhbm9kZS5wYXJlbnQpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIHRoZSBwYXJlbnQgaXMgdGhlIG1hdGNoIHdlIGFyZSBsb29raW5nIGZvciByZXR1cm4gdHJ1ZVxuICAgICAgICBpZiAobm9kZS5wYXJlbnQgPT09IHBhcmVudCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiB0aGVyZSBhcmUgcG90ZW50aWFsbHkgZ3JhbmRwYXJlbnRzIHRoZW4gY2hlY2sgdGhlbSB0b29cbiAgICAgICAgcmV0dXJuIHRoaXMuaXNQYXJlbnRPZihub2RlLnBhcmVudCwgcGFyZW50KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZUl0ZW1zV2l0aEFjdGl2ZVJvdXRlKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBhY3RpdmVJdGVtID0gbmV3IFBhZ2VIZWFkZXJBY3RpdmVOYXZpZ2F0aW9uSXRlbSgpO1xuICAgICAgICBmb3IgKHZhciBpdGVtIG9mIHRoaXMuaXRlbXMkLmdldFZhbHVlKCkpIHtcbiAgICAgICAgICAgIHRoaXMuZmluZEFjdGl2ZUl0ZW0oaXRlbSwgYWN0aXZlSXRlbSk7XG4gICAgICAgICAgICBpZiAoYWN0aXZlSXRlbS5leGFjdCkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGFjdGl2ZUl0ZW0uaXRlbSkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCQubmV4dChhY3RpdmVJdGVtLml0ZW0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBmaW5kQWN0aXZlSXRlbShpdGVtOiBQYWdlSGVhZGVyTmF2aWdhdGlvbkl0ZW0sIGFjdGl2ZUl0ZW06IFBhZ2VIZWFkZXJBY3RpdmVOYXZpZ2F0aW9uSXRlbSk6IHZvaWQge1xuXG4gICAgICAgIGlmIChpdGVtLnJvdXRlckxpbmspIHtcblxuICAgICAgICAgICAgY29uc3Qgcm91dGVyTGluayA9IEFycmF5LmlzQXJyYXkoaXRlbS5yb3V0ZXJMaW5rKSA/IGl0ZW0ucm91dGVyTGluayA6IFtpdGVtLnJvdXRlckxpbmtdO1xuICAgICAgICAgICAgY29uc3QgdXJsVHJlZSA9IHRoaXMuX3JvdXRlci5jcmVhdGVVcmxUcmVlKHJvdXRlckxpbmssIGl0ZW0ucm91dGVyRXh0cmFzKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuX3JvdXRlci5pc0FjdGl2ZSh1cmxUcmVlLCB0cnVlKSAmJiAhYWN0aXZlSXRlbS5leGFjdCkge1xuXG4gICAgICAgICAgICAgICAgLy8gV2hlbiB0aGUgaXRlbSByb3V0ZSBpcyBhbiBleGFjdCBtYXRjaCwgbm8gbmVlZCB0byBsb29rIGFueSBmdXJ0aGVyXG4gICAgICAgICAgICAgICAgYWN0aXZlSXRlbS5pdGVtID0gaXRlbTtcbiAgICAgICAgICAgICAgICBhY3RpdmVJdGVtLmV4YWN0ID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuX3JvdXRlci5pc0FjdGl2ZSh1cmxUcmVlLCBmYWxzZSkpIHtcblxuICAgICAgICAgICAgICAgIC8vIFN0b3JlIGFuIGluZXhhY3QgbWF0Y2ggYW5kIGNvbnRpbnVlIGxvb2tpbmdcbiAgICAgICAgICAgICAgICBhY3RpdmVJdGVtLml0ZW0gPSBpdGVtO1xuICAgICAgICAgICAgICAgIGFjdGl2ZUl0ZW0uZXhhY3QgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpdGVtLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBjaGlsZEl0ZW0gb2YgaXRlbS5jaGlsZHJlbikge1xuICAgICAgICAgICAgICAgIHRoaXMuZmluZEFjdGl2ZUl0ZW0oY2hpbGRJdGVtLCBhY3RpdmVJdGVtKTtcbiAgICAgICAgICAgICAgICBpZiAoYWN0aXZlSXRlbS5leGFjdCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgdHlwZSBQYWdlSGVhZGVyTmF2aWdhdGlvbiA9IFBhZ2VIZWFkZXJOYXZpZ2F0aW9uSXRlbSB8IFBhZ2VIZWFkZXJOYXZpZ2F0aW9uRHJvcGRvd25JdGVtO1xuXG5jbGFzcyBQYWdlSGVhZGVyQWN0aXZlTmF2aWdhdGlvbkl0ZW0ge1xuICAgIGl0ZW06IFBhZ2VIZWFkZXJOYXZpZ2F0aW9uSXRlbTtcbiAgICBleGFjdDogYm9vbGVhbjtcbn1cbiJdfQ==