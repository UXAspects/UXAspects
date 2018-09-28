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
        var /** @type {?} */ activeItem = new PageHeaderActiveNavigationItem();
        try {
            for (var _a = tslib_1.__values(this.items$.getValue()), _b = _a.next(); !_b.done; _b = _a.next()) {
                var item = _b.value;
                this.findActiveItem(item, activeItem);
                if (activeItem.exact) {
                    break;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
        }
        if (activeItem.item) {
            this.selected$.next(activeItem.item);
        }
        var e_1, _c;
    };
    /**
     * @param {?} item
     * @param {?} activeItem
     * @return {?}
     */
    PageHeaderService.prototype.findActiveItem = /**
     * @param {?} item
     * @param {?} activeItem
     * @return {?}
     */
    function (item, activeItem) {
        if (item.routerLink) {
            var /** @type {?} */ routerLink = Array.isArray(item.routerLink) ? item.routerLink : [item.routerLink];
            var /** @type {?} */ urlTree = this._router.createUrlTree(routerLink, item.routerExtras);
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
            try {
                for (var _a = tslib_1.__values(item.children), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var childItem = _b.value;
                    this.findActiveItem(childItem, activeItem);
                    if (activeItem.exact) {
                        return;
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
        var e_2, _c;
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
var PageHeaderActiveNavigationItem = /** @class */ (function () {
    function PageHeaderActiveNavigationItem() {
    }
    return PageHeaderActiveNavigationItem;
}());
function PageHeaderActiveNavigationItem_tsickle_Closure_declarations() {
    /** @type {?} */
    PageHeaderActiveNavigationItem.prototype.item;
    /** @type {?} */
    PageHeaderActiveNavigationItem.prototype.exact;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1oZWFkZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3BhZ2UtaGVhZGVyL3BhZ2UtaGVhZGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQ3RELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxjQUFjLENBQUM7O0lBZW5DLDJCQUFvQixPQUFlO1FBQW5DLGlCQVNDO1FBVG1CLFlBQU8sR0FBUCxPQUFPLENBQVE7c0JBVDFCLElBQUksZUFBZSxDQUE2QixFQUFFLENBQUM7eUJBQ2hELElBQUksZUFBZSxDQUEyQixJQUFJLENBQUM7NkJBQy9DLElBQUksZUFBZSxDQUEyQixJQUFJLENBQUM7MEJBQ3RELElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQzsrQkFDOUIsSUFBSSxlQUFlLENBQXFCLElBQUksQ0FBQzs2Q0FDL0IsS0FBSzswQkFFaEIsSUFBSSxPQUFPLEVBQUU7UUFJOUIsSUFBSSxDQUFDLFNBQVM7YUFDVCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxHQUFHLENBQUMsVUFBQSxRQUFRLElBQUksT0FBQSxLQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUF0QixDQUFzQixDQUFDLENBQUM7YUFDekUsU0FBUyxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsS0FBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFD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O29CQUMzQyxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzt3QkFDbkIsTUFBTSxDQUFDO3FCQUNWO2lCQUNKOzs7Ozs7Ozs7U0FDSjs7OztnQkFsTFIsVUFBVTs7OztnQkFQYSxNQUFNOzs0QkFEOUI7O1NBU2EsaUJBQWlCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBdUw5QixJQUFBOzs7eUNBaE1BO0lBbU1DLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5hdmlnYXRpb25FbmQsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzL0JlaGF2aW9yU3ViamVjdCc7XG5pbXBvcnQgeyBmaWx0ZXIsIG1hcCwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMvU3ViamVjdCc7XG5pbXBvcnQgeyBQYWdlSGVhZGVySWNvbk1lbnUgfSBmcm9tICcuL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgUGFnZUhlYWRlck5hdmlnYXRpb25Ecm9wZG93bkl0ZW0sIFBhZ2VIZWFkZXJOYXZpZ2F0aW9uSXRlbSB9IGZyb20gJy4vbmF2aWdhdGlvbi9uYXZpZ2F0aW9uLmNvbXBvbmVudCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBQYWdlSGVhZGVyU2VydmljZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gICAgaXRlbXMkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxQYWdlSGVhZGVyTmF2aWdhdGlvbkl0ZW1bXT4oW10pO1xuICAgIHNlbGVjdGVkJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8UGFnZUhlYWRlck5hdmlnYXRpb25JdGVtPihudWxsKTtcbiAgICBzZWxlY3RlZFJvb3QkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxQYWdlSGVhZGVyTmF2aWdhdGlvbkl0ZW0+KG51bGwpO1xuICAgIHNlY29uZGFyeSQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgICBhY3RpdmVJY29uTWVudSQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFBhZ2VIZWFkZXJJY29uTWVudT4obnVsbCk7XG4gICAgc2Vjb25kYXJ5TmF2aWdhdGlvbkF1dG9zZWxlY3QgPSBmYWxzZTtcblxuICAgIHByaXZhdGUgX29uRGVzdHJveSA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9yb3V0ZXI6IFJvdXRlcikge1xuXG4gICAgICAgIHRoaXMuc2VsZWN0ZWQkXG4gICAgICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSwgbWFwKHNlbGVjdGVkID0+IHRoaXMuZ2V0Um9vdChzZWxlY3RlZCkpKVxuICAgICAgICAgICAgLnN1YnNjcmliZShyb290ID0+IHRoaXMuc2VsZWN0ZWRSb290JC5uZXh0KHJvb3QpKTtcblxuICAgICAgICB0aGlzLl9yb3V0ZXIuZXZlbnRzXG4gICAgICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSwgZmlsdGVyKGUgPT4gZSBpbnN0YW5jZW9mIE5hdmlnYXRpb25FbmQpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSh0aGlzLnVwZGF0ZUl0ZW1zV2l0aEFjdGl2ZVJvdXRlLmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9vbkRlc3Ryb3kubmV4dCgpO1xuICAgICAgICB0aGlzLl9vbkRlc3Ryb3kuY29tcGxldGUoKTtcbiAgICB9XG5cbiAgICBzZWxlY3QoaXRlbTogUGFnZUhlYWRlck5hdmlnYXRpb25JdGVtKTogdm9pZCB7XG5cbiAgICAgICAgaWYgKCFpdGVtKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXRlbS5yb3V0ZXJMaW5rKSB7XG5cbiAgICAgICAgICAgIC8vIFRyaWdnZXIgcm91dGVyIG5hdmlnYXRpb25cbiAgICAgICAgICAgIGNvbnN0IHJvdXRlckxpbmsgPSBBcnJheS5pc0FycmF5KGl0ZW0ucm91dGVyTGluaykgPyBpdGVtLnJvdXRlckxpbmsgOiBbaXRlbS5yb3V0ZXJMaW5rXTtcbiAgICAgICAgICAgIHRoaXMuX3JvdXRlci5uYXZpZ2F0ZShyb3V0ZXJMaW5rLCBpdGVtLnJvdXRlckV4dHJhcyk7XG5cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnNlY29uZGFyeU5hdmlnYXRpb25BdXRvc2VsZWN0ICYmIGl0ZW0uY2hpbGRyZW4gJiYgaXRlbS5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG5cbiAgICAgICAgICAgIC8vIFNlbGVjdCB0aGUgZmlyc3QgY2hpbGQgaW4gc2Vjb25kYXJ5TmF2aWdhdGlvbkF1dG9zZWxlY3QgbW9kZVxuICAgICAgICAgICAgdGhpcy5zZWxlY3QoaXRlbS5jaGlsZHJlblswXSk7XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgLy8gaWYgd2UgYXJlIGluIHNlY29uZGFyeSBuYXZpZ2F0aW9uIG1vZGUgYW5kIHdlIGNsaWNrIGEgcGFyZW50IC0gZG9udCBkZXNlbGVjdCB0aGUgY2hpbGRcbiAgICAgICAgICAgIGlmICh0aGlzLnNlY29uZGFyeSQuZ2V0VmFsdWUoKSA9PT0gdHJ1ZSAmJiB0aGlzLmlzUGFyZW50T2YodGhpcy5zZWxlY3RlZCQuZ2V0VmFsdWUoKSwgaXRlbSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIE90aGVyd2lzZSBzZWxlY3QgdGhlIGdpdmVuIGl0ZW1cbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQkLm5leHQoaXRlbSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkZXNlbGVjdChpdGVtOiBQYWdlSGVhZGVyTmF2aWdhdGlvbkl0ZW0gfCBQYWdlSGVhZGVyTmF2aWdhdGlvbkRyb3Bkb3duSXRlbSk6IHZvaWQge1xuICAgICAgICAvLyBkZXNlbGVjdCB0aGUgY3VycmVudCBpdGVtXG4gICAgICAgIGl0ZW0uc2VsZWN0ZWQgPSBmYWxzZTtcblxuICAgICAgICAvLyBpdGVyYXRlIGFueSBjaGlsZHJlbiBhbmQgZGVzZWxlY3QgdGhlbVxuICAgICAgICBpZiAoaXRlbS5jaGlsZHJlbikge1xuICAgICAgICAgICAgaXRlbS5jaGlsZHJlbi5mb3JFYWNoKF9pdGVtID0+IHRoaXMuZGVzZWxlY3QoX2l0ZW0pKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRlc2VsZWN0QWxsKCk6IHZvaWQge1xuICAgICAgICB0aGlzLml0ZW1zJC5nZXRWYWx1ZSgpLmZvckVhY2goaXRlbSA9PiB0aGlzLmRlc2VsZWN0KGl0ZW0pKTtcbiAgICB9XG5cbiAgICB1cGRhdGVJdGVtKGl0ZW06IFBhZ2VIZWFkZXJOYXZpZ2F0aW9uSXRlbSwgc2VsZWN0ZWQ6IFBhZ2VIZWFkZXJOYXZpZ2F0aW9uSXRlbSk6IHZvaWQge1xuICAgICAgICAvLyBJdGVtIGlzIHNlbGVjdGVkIGlmIGl0IGlzIHRoZSBzZWxlY3RlZCBpdGVtLCBvciBvbmUgb2YgdGhlIHNlbGVjdGVkIGl0ZW0ncyBhbmNlc3RvcnMuXG4gICAgICAgIGl0ZW0uc2VsZWN0ZWQgPSBpdGVtID09PSBzZWxlY3RlZCB8fCB0aGlzLmlzUGFyZW50T2Yoc2VsZWN0ZWQsIGl0ZW0pO1xuXG4gICAgICAgIGlmIChpdGVtID09PSBzZWxlY3RlZCkge1xuICAgICAgICAgICAgLy8gY2FsbCB0aGUgc2VsZWN0IGZ1bmN0aW9uIGlmIHByZXNlbnRcbiAgICAgICAgICAgIGlmIChpdGVtLnNlbGVjdCkge1xuICAgICAgICAgICAgICAgIGl0ZW0uc2VsZWN0LmNhbGwoaXRlbSwgaXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRJdGVtcyhpdGVtczogUGFnZUhlYWRlck5hdmlnYXRpb25JdGVtW10gPSBbXSk6IHZvaWQge1xuICAgICAgICAvLyBpZGVudGlmeSBhbGwgcGFyZW50IGVsZW1lbnRzXG4gICAgICAgIGl0ZW1zLmZvckVhY2goaXRlbSA9PiB0aGlzLnNldFBhcmVudChpdGVtKSk7XG5cbiAgICAgICAgdGhpcy5pdGVtcyQubmV4dChpdGVtcyk7XG5cbiAgICAgICAgLy8gU2V0IHVwIHRoZSBpbml0YWxseSBzZWxlY3RlZCBpdGVtXG4gICAgICAgIC8vIElmIG5vdGhpbmcgaXMgc2V0IGFzIHNlbGVjdGVkLCB1c2luZyB0aGUgaW5pdGlhbCByb3V0ZVxuICAgICAgICBjb25zdCBpbml0aWFsU2VsZWN0ZWRJdGVtID0gaXRlbXMuZmluZChpdGVtID0+IGl0ZW0uc2VsZWN0ZWQgPT09IHRydWUpO1xuICAgICAgICBpZiAoaW5pdGlhbFNlbGVjdGVkSXRlbSkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3QoaW5pdGlhbFNlbGVjdGVkSXRlbSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUl0ZW1zV2l0aEFjdGl2ZVJvdXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRTZWNvbmRhcnlOYXZpZ2F0aW9uKGVuYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZWNvbmRhcnkkLm5leHQoZW5hYmxlZCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRSb290KGl0ZW06IFBhZ2VIZWFkZXJOYXZpZ2F0aW9uKTogUGFnZUhlYWRlck5hdmlnYXRpb24ge1xuICAgICAgICByZXR1cm4gaXRlbSAmJiBpdGVtLnBhcmVudCA/IHRoaXMuZ2V0Um9vdChpdGVtLnBhcmVudCkgOiBpdGVtO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0UGFyZW50KGl0ZW06IFBhZ2VIZWFkZXJOYXZpZ2F0aW9uLCBwYXJlbnQ/OiBQYWdlSGVhZGVyTmF2aWdhdGlvbiB8IG51bGwpOiB2b2lkIHtcblxuICAgICAgICAvLyBzZXQgdGhlIHBhcmVudCBmaWVsZFxuICAgICAgICBpdGVtLnBhcmVudCA9IHBhcmVudDtcblxuICAgICAgICAvLyBjYWxsIHRoaXMgZnVuY3Rpb24gcmVjdXJzaXZlbHkgb24gYWxsIGNoaWxkcmVuXG4gICAgICAgIGlmIChpdGVtLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICBpdGVtLmNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4gdGhpcy5zZXRQYXJlbnQoY2hpbGQsIGl0ZW0pKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgaXNQYXJlbnRPZihub2RlOiBQYWdlSGVhZGVyTmF2aWdhdGlvbiwgcGFyZW50OiBQYWdlSGVhZGVyTmF2aWdhdGlvbik6IGJvb2xlYW4ge1xuXG4gICAgICAgIC8vIGlmIHRoZXJlIGFyZSBubyBwYXJlbnRzIHJldHVybiBmYWxzZVxuICAgICAgICBpZiAoIW5vZGUgfHwgIW5vZGUucGFyZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiB0aGUgcGFyZW50IGlzIHRoZSBtYXRjaCB3ZSBhcmUgbG9va2luZyBmb3IgcmV0dXJuIHRydWVcbiAgICAgICAgaWYgKG5vZGUucGFyZW50ID09PSBwYXJlbnQpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgdGhlcmUgYXJlIHBvdGVudGlhbGx5IGdyYW5kcGFyZW50cyB0aGVuIGNoZWNrIHRoZW0gdG9vXG4gICAgICAgIHJldHVybiB0aGlzLmlzUGFyZW50T2Yobm9kZS5wYXJlbnQsIHBhcmVudCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGRhdGVJdGVtc1dpdGhBY3RpdmVSb3V0ZSgpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgYWN0aXZlSXRlbSA9IG5ldyBQYWdlSGVhZGVyQWN0aXZlTmF2aWdhdGlvbkl0ZW0oKTtcbiAgICAgICAgZm9yICh2YXIgaXRlbSBvZiB0aGlzLml0ZW1zJC5nZXRWYWx1ZSgpKSB7XG4gICAgICAgICAgICB0aGlzLmZpbmRBY3RpdmVJdGVtKGl0ZW0sIGFjdGl2ZUl0ZW0pO1xuICAgICAgICAgICAgaWYgKGFjdGl2ZUl0ZW0uZXhhY3QpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChhY3RpdmVJdGVtLml0ZW0pIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQkLm5leHQoYWN0aXZlSXRlbS5pdGVtKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZmluZEFjdGl2ZUl0ZW0oaXRlbTogUGFnZUhlYWRlck5hdmlnYXRpb25JdGVtLCBhY3RpdmVJdGVtOiBQYWdlSGVhZGVyQWN0aXZlTmF2aWdhdGlvbkl0ZW0pOiB2b2lkIHtcblxuICAgICAgICBpZiAoaXRlbS5yb3V0ZXJMaW5rKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IHJvdXRlckxpbmsgPSBBcnJheS5pc0FycmF5KGl0ZW0ucm91dGVyTGluaykgPyBpdGVtLnJvdXRlckxpbmsgOiBbaXRlbS5yb3V0ZXJMaW5rXTtcbiAgICAgICAgICAgIGNvbnN0IHVybFRyZWUgPSB0aGlzLl9yb3V0ZXIuY3JlYXRlVXJsVHJlZShyb3V0ZXJMaW5rLCBpdGVtLnJvdXRlckV4dHJhcyk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl9yb3V0ZXIuaXNBY3RpdmUodXJsVHJlZSwgdHJ1ZSkgJiYgIWFjdGl2ZUl0ZW0uZXhhY3QpIHtcblxuICAgICAgICAgICAgICAgIC8vIFdoZW4gdGhlIGl0ZW0gcm91dGUgaXMgYW4gZXhhY3QgbWF0Y2gsIG5vIG5lZWQgdG8gbG9vayBhbnkgZnVydGhlclxuICAgICAgICAgICAgICAgIGFjdGl2ZUl0ZW0uaXRlbSA9IGl0ZW07XG4gICAgICAgICAgICAgICAgYWN0aXZlSXRlbS5leGFjdCA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl9yb3V0ZXIuaXNBY3RpdmUodXJsVHJlZSwgZmFsc2UpKSB7XG5cbiAgICAgICAgICAgICAgICAvLyBTdG9yZSBhbiBpbmV4YWN0IG1hdGNoIGFuZCBjb250aW51ZSBsb29raW5nXG4gICAgICAgICAgICAgICAgYWN0aXZlSXRlbS5pdGVtID0gaXRlbTtcbiAgICAgICAgICAgICAgICBhY3RpdmVJdGVtLmV4YWN0ID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXRlbS5jaGlsZHJlbikge1xuICAgICAgICAgICAgZm9yIChsZXQgY2hpbGRJdGVtIG9mIGl0ZW0uY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZpbmRBY3RpdmVJdGVtKGNoaWxkSXRlbSwgYWN0aXZlSXRlbSk7XG4gICAgICAgICAgICAgICAgaWYgKGFjdGl2ZUl0ZW0uZXhhY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IHR5cGUgUGFnZUhlYWRlck5hdmlnYXRpb24gPSBQYWdlSGVhZGVyTmF2aWdhdGlvbkl0ZW0gfCBQYWdlSGVhZGVyTmF2aWdhdGlvbkRyb3Bkb3duSXRlbTtcblxuY2xhc3MgUGFnZUhlYWRlckFjdGl2ZU5hdmlnYXRpb25JdGVtIHtcbiAgICBpdGVtOiBQYWdlSGVhZGVyTmF2aWdhdGlvbkl0ZW07XG4gICAgZXhhY3Q6IGJvb2xlYW47XG59XG4iXX0=