/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { filter, map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
var PageHeaderService = /** @class */ (function () {
    function PageHeaderService(_router) {
        var _this = this;
        this._router = _router;
        this.items$ = new BehaviorSubject([]);
        this.selected$ = new BehaviorSubject(null);
        this.selectedRoot$ = new BehaviorSubject(null);
        this.secondary$ = new BehaviorSubject(false);
        this.activeIconMenu$ = new BehaviorSubject(null);
        this.secondaryNavigationAutoselect = false;
        this._onDestroy = new Subject();
        this.selected$
            .pipe(takeUntil(this._onDestroy), map(function (selected) { return _this.getRoot(selected); }))
            .subscribe(function (root) { return _this.selectedRoot$.next(root); });
        this._router.events
            .pipe(takeUntil(this._onDestroy), filter(function (e) { return e instanceof NavigationEnd; }))
            .subscribe(this.updateItemsWithActiveRoute.bind(this));
    }
    /**
     * @return {?}
     */
    PageHeaderService.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._onDestroy.next();
        this._onDestroy.complete();
    };
    /**
     * @param {?} item
     * @return {?}
     */
    PageHeaderService.prototype.select = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        if (!item) {
            return;
        }
        if (item.routerLink) {
            // Trigger router navigation
            var /** @type {?} */ routerLink = Array.isArray(item.routerLink) ? item.routerLink : [item.routerLink];
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
    };
    /**
     * @param {?} item
     * @return {?}
     */
    PageHeaderService.prototype.deselect = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        var _this = this;
        // deselect the current item
        item.selected = false;
        // iterate any children and deselect them
        if (item.children) {
            item.children.forEach(function (_item) { return _this.deselect(_item); });
        }
    };
    /**
     * @return {?}
     */
    PageHeaderService.prototype.deselectAll = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.items$.getValue().forEach(function (item) { return _this.deselect(item); });
    };
    /**
     * @param {?} item
     * @param {?} selected
     * @return {?}
     */
    PageHeaderService.prototype.updateItem = /**
     * @param {?} item
     * @param {?} selected
     * @return {?}
     */
    function (item, selected) {
        // Item is selected if it is the selected item, or one of the selected item's ancestors.
        item.selected = item === selected || this.isParentOf(selected, item);
        if (item === selected) {
            // call the select function if present
            if (item.select) {
                item.select.call(item, item);
            }
        }
    };
    /**
     * @param {?=} items
     * @return {?}
     */
    PageHeaderService.prototype.setItems = /**
     * @param {?=} items
     * @return {?}
     */
    function (items) {
        var _this = this;
        if (items === void 0) { items = []; }
        // identify all parent elements
        items.forEach(function (item) { return _this.setParent(item); });
        this.items$.next(items);
        // Set up the initally selected item
        // If nothing is set as selected, using the initial route
        var /** @type {?} */ initialSelectedItem = items.find(function (item) { return item.selected === true; });
        if (initialSelectedItem) {
            this.select(initialSelectedItem);
        }
        else {
            this.updateItemsWithActiveRoute();
        }
    };
    /**
     * @param {?} enabled
     * @return {?}
     */
    PageHeaderService.prototype.setSecondaryNavigation = /**
     * @param {?} enabled
     * @return {?}
     */
    function (enabled) {
        this.secondary$.next(enabled);
    };
    /**
     * @param {?} item
     * @return {?}
     */
    PageHeaderService.prototype.getRoot = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        return item && item.parent ? this.getRoot(item.parent) : item;
    };
    /**
     * @param {?} item
     * @param {?=} parent
     * @return {?}
     */
    PageHeaderService.prototype.setParent = /**
     * @param {?} item
     * @param {?=} parent
     * @return {?}
     */
    function (item, parent) {
        var _this = this;
        // set the parent field
        item.parent = parent;
        // call this function recursively on all children
        if (item.children) {
            item.children.forEach(function (child) { return _this.setParent(child, item); });
        }
    };
    /**
     * @param {?} node
     * @param {?} parent
     * @return {?}
     */
    PageHeaderService.prototype.isParentOf = /**
     * @param {?} node
     * @param {?} parent
     * @return {?}
     */
    function (node, parent) {
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
    };
    /**
     * @return {?}
     */
    PageHeaderService.prototype.updateItemsWithActiveRoute = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ selected = this.findActiveItem(this.items$.getValue());
        if (selected) {
            this.selected$.next(selected);
        }
    };
    /**
     * @param {?} items
     * @return {?}
     */
    PageHeaderService.prototype.findActiveItem = /**
     * @param {?} items
     * @return {?}
     */
    function (items) {
        try {
            for (var items_1 = tslib_1.__values(items), items_1_1 = items_1.next(); !items_1_1.done; items_1_1 = items_1.next()) {
                var item = items_1_1.value;
                if (item.routerLink && this.isRouterLinkActive(item)) {
                    return item;
                }
                if (item.children) {
                    var /** @type {?} */ activeItem = this.findActiveItem(item.children);
                    if (activeItem) {
                        return activeItem;
                    }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (items_1_1 && !items_1_1.done && (_a = items_1.return)) _a.call(items_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return null;
        var e_1, _a;
    };
    /**
     * @param {?} item
     * @return {?}
     */
    PageHeaderService.prototype.isRouterLinkActive = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        var /** @type {?} */ routerLink = Array.isArray(item.routerLink) ? item.routerLink : [item.routerLink];
        var /** @type {?} */ urlTree = this._router.createUrlTree(routerLink, item.routerExtras);
        return this._router.isActive(urlTree, true);
    };
    PageHeaderService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    PageHeaderService.ctorParameters = function () { return [
        { type: Router }
    ]; };
    return PageHeaderService;
}());
export { PageHeaderService };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1oZWFkZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3BhZ2UtaGVhZGVyL3BhZ2UtaGVhZGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQ3RELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxjQUFjLENBQUM7O0lBZW5DLDJCQUFvQixPQUFlO1FBQW5DLGlCQVNDO1FBVG1CLFlBQU8sR0FBUCxPQUFPLENBQVE7c0JBVDFCLElBQUksZUFBZSxDQUE2QixFQUFFLENBQUM7eUJBQ2hELElBQUksZUFBZSxDQUEyQixJQUFJLENBQUM7NkJBQy9DLElBQUksZUFBZSxDQUEyQixJQUFJLENBQUM7MEJBQ3RELElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQzsrQkFDOUIsSUFBSSxlQUFlLENBQXFCLElBQUksQ0FBQzs2Q0FDL0IsS0FBSzswQkFFaEIsSUFBSSxPQUFPLEVBQUU7UUFJOUIsSUFBSSxDQUFDLFNBQVM7YUFDVCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxHQUFHLENBQUMsVUFBQSxRQUFRLElBQUksT0FBQSxLQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUF0QixDQUFzQixDQUFDLENBQUM7YUFDekUsU0FBUyxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsS0FBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFD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QUFDLElBQUksQ0FBQztpQkFDZjtnQkFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztvQkFDaEIscUJBQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUN0RCxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO3dCQUNiLE1BQU0sQ0FBQyxVQUFVLENBQUM7cUJBQ3JCO2lCQUNKO2FBQ0o7Ozs7Ozs7OztRQUVELE1BQU0sQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7SUFHUiw4Q0FBa0I7Ozs7Y0FBQyxJQUE4QjtRQUNyRCxxQkFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3hGLHFCQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBRTFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7OztnQkFoS25ELFVBQVU7Ozs7Z0JBUGEsTUFBTTs7NEJBRDlCOztTQVNhLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmF2aWdhdGlvbkVuZCwgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMvQmVoYXZpb3JTdWJqZWN0JztcbmltcG9ydCB7IGZpbHRlciwgbWFwLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcy9TdWJqZWN0JztcbmltcG9ydCB7IFBhZ2VIZWFkZXJJY29uTWVudSB9IGZyb20gJy4vaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBQYWdlSGVhZGVyTmF2aWdhdGlvbkRyb3Bkb3duSXRlbSwgUGFnZUhlYWRlck5hdmlnYXRpb25JdGVtIH0gZnJvbSAnLi9uYXZpZ2F0aW9uL25hdmlnYXRpb24uY29tcG9uZW50JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFBhZ2VIZWFkZXJTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgICBpdGVtcyQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFBhZ2VIZWFkZXJOYXZpZ2F0aW9uSXRlbVtdPihbXSk7XG4gICAgc2VsZWN0ZWQkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxQYWdlSGVhZGVyTmF2aWdhdGlvbkl0ZW0+KG51bGwpO1xuICAgIHNlbGVjdGVkUm9vdCQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFBhZ2VIZWFkZXJOYXZpZ2F0aW9uSXRlbT4obnVsbCk7XG4gICAgc2Vjb25kYXJ5JCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICAgIGFjdGl2ZUljb25NZW51JCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8UGFnZUhlYWRlckljb25NZW51PihudWxsKTtcbiAgICBzZWNvbmRhcnlOYXZpZ2F0aW9uQXV0b3NlbGVjdCA9IGZhbHNlO1xuXG4gICAgcHJpdmF0ZSBfb25EZXN0cm95ID0gbmV3IFN1YmplY3QoKTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX3JvdXRlcjogUm91dGVyKSB7XG5cbiAgICAgICAgdGhpcy5zZWxlY3RlZCRcbiAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpLCBtYXAoc2VsZWN0ZWQgPT4gdGhpcy5nZXRSb290KHNlbGVjdGVkKSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKHJvb3QgPT4gdGhpcy5zZWxlY3RlZFJvb3QkLm5leHQocm9vdCkpO1xuXG4gICAgICAgIHRoaXMuX3JvdXRlci5ldmVudHNcbiAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpLCBmaWx0ZXIoZSA9PiBlIGluc3RhbmNlb2YgTmF2aWdhdGlvbkVuZCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKHRoaXMudXBkYXRlSXRlbXNXaXRoQWN0aXZlUm91dGUuYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX29uRGVzdHJveS5uZXh0KCk7XG4gICAgICAgIHRoaXMuX29uRGVzdHJveS5jb21wbGV0ZSgpO1xuICAgIH1cblxuICAgIHNlbGVjdChpdGVtOiBQYWdlSGVhZGVyTmF2aWdhdGlvbkl0ZW0pOiB2b2lkIHtcblxuICAgICAgICBpZiAoIWl0ZW0pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpdGVtLnJvdXRlckxpbmspIHtcblxuICAgICAgICAgICAgLy8gVHJpZ2dlciByb3V0ZXIgbmF2aWdhdGlvblxuICAgICAgICAgICAgY29uc3Qgcm91dGVyTGluayA9IEFycmF5LmlzQXJyYXkoaXRlbS5yb3V0ZXJMaW5rKSA/IGl0ZW0ucm91dGVyTGluayA6IFtpdGVtLnJvdXRlckxpbmtdO1xuICAgICAgICAgICAgdGhpcy5fcm91dGVyLm5hdmlnYXRlKHJvdXRlckxpbmssIGl0ZW0ucm91dGVyRXh0cmFzKTtcblxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc2Vjb25kYXJ5TmF2aWdhdGlvbkF1dG9zZWxlY3QgJiYgaXRlbS5jaGlsZHJlbiAmJiBpdGVtLmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcblxuICAgICAgICAgICAgLy8gU2VsZWN0IHRoZSBmaXJzdCBjaGlsZCBpbiBzZWNvbmRhcnlOYXZpZ2F0aW9uQXV0b3NlbGVjdCBtb2RlXG4gICAgICAgICAgICB0aGlzLnNlbGVjdChpdGVtLmNoaWxkcmVuWzBdKTtcblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAvLyBpZiB3ZSBhcmUgaW4gc2Vjb25kYXJ5IG5hdmlnYXRpb24gbW9kZSBhbmQgd2UgY2xpY2sgYSBwYXJlbnQgLSBkb250IGRlc2VsZWN0IHRoZSBjaGlsZFxuICAgICAgICAgICAgaWYgKHRoaXMuc2Vjb25kYXJ5JC5nZXRWYWx1ZSgpID09PSB0cnVlICYmIHRoaXMuaXNQYXJlbnRPZih0aGlzLnNlbGVjdGVkJC5nZXRWYWx1ZSgpLCBpdGVtKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gT3RoZXJ3aXNlIHNlbGVjdCB0aGUgZ2l2ZW4gaXRlbVxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCQubmV4dChpdGVtKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRlc2VsZWN0KGl0ZW06IFBhZ2VIZWFkZXJOYXZpZ2F0aW9uSXRlbSB8IFBhZ2VIZWFkZXJOYXZpZ2F0aW9uRHJvcGRvd25JdGVtKTogdm9pZCB7XG4gICAgICAgIC8vIGRlc2VsZWN0IHRoZSBjdXJyZW50IGl0ZW1cbiAgICAgICAgaXRlbS5zZWxlY3RlZCA9IGZhbHNlO1xuXG4gICAgICAgIC8vIGl0ZXJhdGUgYW55IGNoaWxkcmVuIGFuZCBkZXNlbGVjdCB0aGVtXG4gICAgICAgIGlmIChpdGVtLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICBpdGVtLmNoaWxkcmVuLmZvckVhY2goX2l0ZW0gPT4gdGhpcy5kZXNlbGVjdChfaXRlbSkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGVzZWxlY3RBbGwoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaXRlbXMkLmdldFZhbHVlKCkuZm9yRWFjaChpdGVtID0+IHRoaXMuZGVzZWxlY3QoaXRlbSkpO1xuICAgIH1cblxuICAgIHVwZGF0ZUl0ZW0oaXRlbTogUGFnZUhlYWRlck5hdmlnYXRpb25JdGVtLCBzZWxlY3RlZDogUGFnZUhlYWRlck5hdmlnYXRpb25JdGVtKTogdm9pZCB7XG4gICAgICAgIC8vIEl0ZW0gaXMgc2VsZWN0ZWQgaWYgaXQgaXMgdGhlIHNlbGVjdGVkIGl0ZW0sIG9yIG9uZSBvZiB0aGUgc2VsZWN0ZWQgaXRlbSdzIGFuY2VzdG9ycy5cbiAgICAgICAgaXRlbS5zZWxlY3RlZCA9IGl0ZW0gPT09IHNlbGVjdGVkIHx8IHRoaXMuaXNQYXJlbnRPZihzZWxlY3RlZCwgaXRlbSk7XG5cbiAgICAgICAgaWYgKGl0ZW0gPT09IHNlbGVjdGVkKSB7XG4gICAgICAgICAgICAvLyBjYWxsIHRoZSBzZWxlY3QgZnVuY3Rpb24gaWYgcHJlc2VudFxuICAgICAgICAgICAgaWYgKGl0ZW0uc2VsZWN0KSB7XG4gICAgICAgICAgICAgICAgaXRlbS5zZWxlY3QuY2FsbChpdGVtLCBpdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldEl0ZW1zKGl0ZW1zOiBQYWdlSGVhZGVyTmF2aWdhdGlvbkl0ZW1bXSA9IFtdKTogdm9pZCB7XG4gICAgICAgIC8vIGlkZW50aWZ5IGFsbCBwYXJlbnQgZWxlbWVudHNcbiAgICAgICAgaXRlbXMuZm9yRWFjaChpdGVtID0+IHRoaXMuc2V0UGFyZW50KGl0ZW0pKTtcblxuICAgICAgICB0aGlzLml0ZW1zJC5uZXh0KGl0ZW1zKTtcblxuICAgICAgICAvLyBTZXQgdXAgdGhlIGluaXRhbGx5IHNlbGVjdGVkIGl0ZW1cbiAgICAgICAgLy8gSWYgbm90aGluZyBpcyBzZXQgYXMgc2VsZWN0ZWQsIHVzaW5nIHRoZSBpbml0aWFsIHJvdXRlXG4gICAgICAgIGNvbnN0IGluaXRpYWxTZWxlY3RlZEl0ZW0gPSBpdGVtcy5maW5kKGl0ZW0gPT4gaXRlbS5zZWxlY3RlZCA9PT0gdHJ1ZSk7XG4gICAgICAgIGlmIChpbml0aWFsU2VsZWN0ZWRJdGVtKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdChpbml0aWFsU2VsZWN0ZWRJdGVtKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSXRlbXNXaXRoQWN0aXZlUm91dGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldFNlY29uZGFyeU5hdmlnYXRpb24oZW5hYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICB0aGlzLnNlY29uZGFyeSQubmV4dChlbmFibGVkKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFJvb3QoaXRlbTogUGFnZUhlYWRlck5hdmlnYXRpb24pOiBQYWdlSGVhZGVyTmF2aWdhdGlvbiB7XG4gICAgICAgIHJldHVybiBpdGVtICYmIGl0ZW0ucGFyZW50ID8gdGhpcy5nZXRSb290KGl0ZW0ucGFyZW50KSA6IGl0ZW07XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRQYXJlbnQoaXRlbTogUGFnZUhlYWRlck5hdmlnYXRpb24sIHBhcmVudD86IFBhZ2VIZWFkZXJOYXZpZ2F0aW9uIHwgbnVsbCk6IHZvaWQge1xuXG4gICAgICAgIC8vIHNldCB0aGUgcGFyZW50IGZpZWxkXG4gICAgICAgIGl0ZW0ucGFyZW50ID0gcGFyZW50O1xuXG4gICAgICAgIC8vIGNhbGwgdGhpcyBmdW5jdGlvbiByZWN1cnNpdmVseSBvbiBhbGwgY2hpbGRyZW5cbiAgICAgICAgaWYgKGl0ZW0uY2hpbGRyZW4pIHtcbiAgICAgICAgICAgIGl0ZW0uY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB0aGlzLnNldFBhcmVudChjaGlsZCwgaXRlbSkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc1BhcmVudE9mKG5vZGU6IFBhZ2VIZWFkZXJOYXZpZ2F0aW9uLCBwYXJlbnQ6IFBhZ2VIZWFkZXJOYXZpZ2F0aW9uKTogYm9vbGVhbiB7XG5cbiAgICAgICAgLy8gaWYgdGhlcmUgYXJlIG5vIHBhcmVudHMgcmV0dXJuIGZhbHNlXG4gICAgICAgIGlmICghbm9kZSB8fCAhbm9kZS5wYXJlbnQpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIHRoZSBwYXJlbnQgaXMgdGhlIG1hdGNoIHdlIGFyZSBsb29raW5nIGZvciByZXR1cm4gdHJ1ZVxuICAgICAgICBpZiAobm9kZS5wYXJlbnQgPT09IHBhcmVudCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiB0aGVyZSBhcmUgcG90ZW50aWFsbHkgZ3JhbmRwYXJlbnRzIHRoZW4gY2hlY2sgdGhlbSB0b29cbiAgICAgICAgcmV0dXJuIHRoaXMuaXNQYXJlbnRPZihub2RlLnBhcmVudCwgcGFyZW50KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZUl0ZW1zV2l0aEFjdGl2ZVJvdXRlKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBzZWxlY3RlZCA9IHRoaXMuZmluZEFjdGl2ZUl0ZW0odGhpcy5pdGVtcyQuZ2V0VmFsdWUoKSk7XG4gICAgICAgIGlmIChzZWxlY3RlZCkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCQubmV4dChzZWxlY3RlZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGZpbmRBY3RpdmVJdGVtKGl0ZW1zOiBQYWdlSGVhZGVyTmF2aWdhdGlvbkl0ZW1bXSk6IFBhZ2VIZWFkZXJOYXZpZ2F0aW9uSXRlbSB7XG4gICAgICAgIGZvciAodmFyIGl0ZW0gb2YgaXRlbXMpIHtcbiAgICAgICAgICAgIGlmIChpdGVtLnJvdXRlckxpbmsgJiYgdGhpcy5pc1JvdXRlckxpbmtBY3RpdmUoaXRlbSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpdGVtLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYWN0aXZlSXRlbSA9IHRoaXMuZmluZEFjdGl2ZUl0ZW0oaXRlbS5jaGlsZHJlbik7XG4gICAgICAgICAgICAgICAgaWYgKGFjdGl2ZUl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjdGl2ZUl0ZW07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc1JvdXRlckxpbmtBY3RpdmUoaXRlbTogUGFnZUhlYWRlck5hdmlnYXRpb25JdGVtKTogYm9vbGVhbiB7XG4gICAgICAgIGNvbnN0IHJvdXRlckxpbmsgPSBBcnJheS5pc0FycmF5KGl0ZW0ucm91dGVyTGluaykgPyBpdGVtLnJvdXRlckxpbmsgOiBbaXRlbS5yb3V0ZXJMaW5rXTtcbiAgICAgICAgY29uc3QgdXJsVHJlZSA9IHRoaXMuX3JvdXRlci5jcmVhdGVVcmxUcmVlKHJvdXRlckxpbmssIGl0ZW0ucm91dGVyRXh0cmFzKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5fcm91dGVyLmlzQWN0aXZlKHVybFRyZWUsIHRydWUpO1xuICAgIH1cbn1cblxuZXhwb3J0IHR5cGUgUGFnZUhlYWRlck5hdmlnYXRpb24gPSBQYWdlSGVhZGVyTmF2aWdhdGlvbkl0ZW0gfCBQYWdlSGVhZGVyTmF2aWdhdGlvbkRyb3Bkb3duSXRlbTtcbiJdfQ==