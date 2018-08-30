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
        const /** @type {?} */ selected = this.findActiveItem(this.items$.getValue());
        if (selected) {
            this.selected$.next(selected);
        }
    }
    /**
     * @param {?} items
     * @return {?}
     */
    findActiveItem(items) {
        for (var /** @type {?} */ item of items) {
            if (item.routerLink && this.isRouterLinkActive(item)) {
                return item;
            }
            if (item.children) {
                const /** @type {?} */ activeItem = this.findActiveItem(item.children);
                if (activeItem) {
                    return activeItem;
                }
            }
        }
        return null;
    }
    /**
     * @param {?} item
     * @return {?}
     */
    isRouterLinkActive(item) {
        const /** @type {?} */ routerLink = Array.isArray(item.routerLink) ? item.routerLink : [item.routerLink];
        const /** @type {?} */ urlTree = this._router.createUrlTree(routerLink, item.routerExtras);
        return this._router.isActive(urlTree, true);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1oZWFkZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3BhZ2UtaGVhZGVyL3BhZ2UtaGVhZGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDdEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDdkQsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUt2QyxNQUFNOzs7O0lBVUYsWUFBb0IsT0FBZTtRQUFmLFlBQU8sR0FBUCxPQUFPLENBQVE7c0JBVDFCLElBQUksZUFBZSxDQUE2QixFQUFFLENBQUM7eUJBQ2hELElBQUksZUFBZSxDQUEyQixJQUFJLENBQUM7NkJBQy9DLElBQUksZUFBZSxDQUEyQixJQUFJLENBQUM7MEJBQ3RELElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQzsrQkFDOUIsSUFBSSxlQUFlLENBQXFCLElBQUksQ0FBQzs2Q0FDL0IsS0FBSzswQkFFaEIsSUFBSSxPQUFPLEVBQUU7UUFJOUIsSUFBSSxDQUFDLFNBQVM7YUFDVCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7YUFDekUsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUV0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UixrQkFBa0IsQ0FBQyxJQUE4QjtRQUNyRCx1QkFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3hGLHVCQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBRTFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7Ozs7WUFoS25ELFVBQVU7Ozs7WUFQYSxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOYXZpZ2F0aW9uRW5kLCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcy9CZWhhdmlvclN1YmplY3QnO1xuaW1wb3J0IHsgZmlsdGVyLCBtYXAsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzL1N1YmplY3QnO1xuaW1wb3J0IHsgUGFnZUhlYWRlckljb25NZW51IH0gZnJvbSAnLi9pbnRlcmZhY2VzJztcbmltcG9ydCB7IFBhZ2VIZWFkZXJOYXZpZ2F0aW9uRHJvcGRvd25JdGVtLCBQYWdlSGVhZGVyTmF2aWdhdGlvbkl0ZW0gfSBmcm9tICcuL25hdmlnYXRpb24vbmF2aWdhdGlvbi5jb21wb25lbnQnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUGFnZUhlYWRlclNlcnZpY2UgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICAgIGl0ZW1zJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8UGFnZUhlYWRlck5hdmlnYXRpb25JdGVtW10+KFtdKTtcbiAgICBzZWxlY3RlZCQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFBhZ2VIZWFkZXJOYXZpZ2F0aW9uSXRlbT4obnVsbCk7XG4gICAgc2VsZWN0ZWRSb290JCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8UGFnZUhlYWRlck5hdmlnYXRpb25JdGVtPihudWxsKTtcbiAgICBzZWNvbmRhcnkkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gICAgYWN0aXZlSWNvbk1lbnUkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxQYWdlSGVhZGVySWNvbk1lbnU+KG51bGwpO1xuICAgIHNlY29uZGFyeU5hdmlnYXRpb25BdXRvc2VsZWN0ID0gZmFsc2U7XG5cbiAgICBwcml2YXRlIF9vbkRlc3Ryb3kgPSBuZXcgU3ViamVjdCgpO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfcm91dGVyOiBSb3V0ZXIpIHtcblxuICAgICAgICB0aGlzLnNlbGVjdGVkJFxuICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSksIG1hcChzZWxlY3RlZCA9PiB0aGlzLmdldFJvb3Qoc2VsZWN0ZWQpKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUocm9vdCA9PiB0aGlzLnNlbGVjdGVkUm9vdCQubmV4dChyb290KSk7XG5cbiAgICAgICAgdGhpcy5fcm91dGVyLmV2ZW50c1xuICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSksIGZpbHRlcihlID0+IGUgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRW5kKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUodGhpcy51cGRhdGVJdGVtc1dpdGhBY3RpdmVSb3V0ZS5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fb25EZXN0cm95Lm5leHQoKTtcbiAgICAgICAgdGhpcy5fb25EZXN0cm95LmNvbXBsZXRlKCk7XG4gICAgfVxuXG4gICAgc2VsZWN0KGl0ZW06IFBhZ2VIZWFkZXJOYXZpZ2F0aW9uSXRlbSk6IHZvaWQge1xuXG4gICAgICAgIGlmICghaXRlbSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGl0ZW0ucm91dGVyTGluaykge1xuXG4gICAgICAgICAgICAvLyBUcmlnZ2VyIHJvdXRlciBuYXZpZ2F0aW9uXG4gICAgICAgICAgICBjb25zdCByb3V0ZXJMaW5rID0gQXJyYXkuaXNBcnJheShpdGVtLnJvdXRlckxpbmspID8gaXRlbS5yb3V0ZXJMaW5rIDogW2l0ZW0ucm91dGVyTGlua107XG4gICAgICAgICAgICB0aGlzLl9yb3V0ZXIubmF2aWdhdGUocm91dGVyTGluaywgaXRlbS5yb3V0ZXJFeHRyYXMpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5zZWNvbmRhcnlOYXZpZ2F0aW9uQXV0b3NlbGVjdCAmJiBpdGVtLmNoaWxkcmVuICYmIGl0ZW0uY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuXG4gICAgICAgICAgICAvLyBTZWxlY3QgdGhlIGZpcnN0IGNoaWxkIGluIHNlY29uZGFyeU5hdmlnYXRpb25BdXRvc2VsZWN0IG1vZGVcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0KGl0ZW0uY2hpbGRyZW5bMF0pO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIC8vIGlmIHdlIGFyZSBpbiBzZWNvbmRhcnkgbmF2aWdhdGlvbiBtb2RlIGFuZCB3ZSBjbGljayBhIHBhcmVudCAtIGRvbnQgZGVzZWxlY3QgdGhlIGNoaWxkXG4gICAgICAgICAgICBpZiAodGhpcy5zZWNvbmRhcnkkLmdldFZhbHVlKCkgPT09IHRydWUgJiYgdGhpcy5pc1BhcmVudE9mKHRoaXMuc2VsZWN0ZWQkLmdldFZhbHVlKCksIGl0ZW0pKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBPdGhlcndpc2Ugc2VsZWN0IHRoZSBnaXZlbiBpdGVtXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkJC5uZXh0KGl0ZW0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGVzZWxlY3QoaXRlbTogUGFnZUhlYWRlck5hdmlnYXRpb25JdGVtIHwgUGFnZUhlYWRlck5hdmlnYXRpb25Ecm9wZG93bkl0ZW0pOiB2b2lkIHtcbiAgICAgICAgLy8gZGVzZWxlY3QgdGhlIGN1cnJlbnQgaXRlbVxuICAgICAgICBpdGVtLnNlbGVjdGVkID0gZmFsc2U7XG5cbiAgICAgICAgLy8gaXRlcmF0ZSBhbnkgY2hpbGRyZW4gYW5kIGRlc2VsZWN0IHRoZW1cbiAgICAgICAgaWYgKGl0ZW0uY2hpbGRyZW4pIHtcbiAgICAgICAgICAgIGl0ZW0uY2hpbGRyZW4uZm9yRWFjaChfaXRlbSA9PiB0aGlzLmRlc2VsZWN0KF9pdGVtKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkZXNlbGVjdEFsbCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pdGVtcyQuZ2V0VmFsdWUoKS5mb3JFYWNoKGl0ZW0gPT4gdGhpcy5kZXNlbGVjdChpdGVtKSk7XG4gICAgfVxuXG4gICAgdXBkYXRlSXRlbShpdGVtOiBQYWdlSGVhZGVyTmF2aWdhdGlvbkl0ZW0sIHNlbGVjdGVkOiBQYWdlSGVhZGVyTmF2aWdhdGlvbkl0ZW0pOiB2b2lkIHtcbiAgICAgICAgLy8gSXRlbSBpcyBzZWxlY3RlZCBpZiBpdCBpcyB0aGUgc2VsZWN0ZWQgaXRlbSwgb3Igb25lIG9mIHRoZSBzZWxlY3RlZCBpdGVtJ3MgYW5jZXN0b3JzLlxuICAgICAgICBpdGVtLnNlbGVjdGVkID0gaXRlbSA9PT0gc2VsZWN0ZWQgfHwgdGhpcy5pc1BhcmVudE9mKHNlbGVjdGVkLCBpdGVtKTtcblxuICAgICAgICBpZiAoaXRlbSA9PT0gc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIC8vIGNhbGwgdGhlIHNlbGVjdCBmdW5jdGlvbiBpZiBwcmVzZW50XG4gICAgICAgICAgICBpZiAoaXRlbS5zZWxlY3QpIHtcbiAgICAgICAgICAgICAgICBpdGVtLnNlbGVjdC5jYWxsKGl0ZW0sIGl0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0SXRlbXMoaXRlbXM6IFBhZ2VIZWFkZXJOYXZpZ2F0aW9uSXRlbVtdID0gW10pOiB2b2lkIHtcbiAgICAgICAgLy8gaWRlbnRpZnkgYWxsIHBhcmVudCBlbGVtZW50c1xuICAgICAgICBpdGVtcy5mb3JFYWNoKGl0ZW0gPT4gdGhpcy5zZXRQYXJlbnQoaXRlbSkpO1xuXG4gICAgICAgIHRoaXMuaXRlbXMkLm5leHQoaXRlbXMpO1xuXG4gICAgICAgIC8vIFNldCB1cCB0aGUgaW5pdGFsbHkgc2VsZWN0ZWQgaXRlbVxuICAgICAgICAvLyBJZiBub3RoaW5nIGlzIHNldCBhcyBzZWxlY3RlZCwgdXNpbmcgdGhlIGluaXRpYWwgcm91dGVcbiAgICAgICAgY29uc3QgaW5pdGlhbFNlbGVjdGVkSXRlbSA9IGl0ZW1zLmZpbmQoaXRlbSA9PiBpdGVtLnNlbGVjdGVkID09PSB0cnVlKTtcbiAgICAgICAgaWYgKGluaXRpYWxTZWxlY3RlZEl0ZW0pIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0KGluaXRpYWxTZWxlY3RlZEl0ZW0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVJdGVtc1dpdGhBY3RpdmVSb3V0ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0U2Vjb25kYXJ5TmF2aWdhdGlvbihlbmFibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2Vjb25kYXJ5JC5uZXh0KGVuYWJsZWQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0Um9vdChpdGVtOiBQYWdlSGVhZGVyTmF2aWdhdGlvbik6IFBhZ2VIZWFkZXJOYXZpZ2F0aW9uIHtcbiAgICAgICAgcmV0dXJuIGl0ZW0gJiYgaXRlbS5wYXJlbnQgPyB0aGlzLmdldFJvb3QoaXRlbS5wYXJlbnQpIDogaXRlbTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldFBhcmVudChpdGVtOiBQYWdlSGVhZGVyTmF2aWdhdGlvbiwgcGFyZW50PzogUGFnZUhlYWRlck5hdmlnYXRpb24gfCBudWxsKTogdm9pZCB7XG5cbiAgICAgICAgLy8gc2V0IHRoZSBwYXJlbnQgZmllbGRcbiAgICAgICAgaXRlbS5wYXJlbnQgPSBwYXJlbnQ7XG5cbiAgICAgICAgLy8gY2FsbCB0aGlzIGZ1bmN0aW9uIHJlY3Vyc2l2ZWx5IG9uIGFsbCBjaGlsZHJlblxuICAgICAgICBpZiAoaXRlbS5jaGlsZHJlbikge1xuICAgICAgICAgICAgaXRlbS5jaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IHRoaXMuc2V0UGFyZW50KGNoaWxkLCBpdGVtKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGlzUGFyZW50T2Yobm9kZTogUGFnZUhlYWRlck5hdmlnYXRpb24sIHBhcmVudDogUGFnZUhlYWRlck5hdmlnYXRpb24pOiBib29sZWFuIHtcblxuICAgICAgICAvLyBpZiB0aGVyZSBhcmUgbm8gcGFyZW50cyByZXR1cm4gZmFsc2VcbiAgICAgICAgaWYgKCFub2RlIHx8ICFub2RlLnBhcmVudCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgdGhlIHBhcmVudCBpcyB0aGUgbWF0Y2ggd2UgYXJlIGxvb2tpbmcgZm9yIHJldHVybiB0cnVlXG4gICAgICAgIGlmIChub2RlLnBhcmVudCA9PT0gcGFyZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIHRoZXJlIGFyZSBwb3RlbnRpYWxseSBncmFuZHBhcmVudHMgdGhlbiBjaGVjayB0aGVtIHRvb1xuICAgICAgICByZXR1cm4gdGhpcy5pc1BhcmVudE9mKG5vZGUucGFyZW50LCBwYXJlbnQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlSXRlbXNXaXRoQWN0aXZlUm91dGUoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkID0gdGhpcy5maW5kQWN0aXZlSXRlbSh0aGlzLml0ZW1zJC5nZXRWYWx1ZSgpKTtcbiAgICAgICAgaWYgKHNlbGVjdGVkKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkJC5uZXh0KHNlbGVjdGVkKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZmluZEFjdGl2ZUl0ZW0oaXRlbXM6IFBhZ2VIZWFkZXJOYXZpZ2F0aW9uSXRlbVtdKTogUGFnZUhlYWRlck5hdmlnYXRpb25JdGVtIHtcbiAgICAgICAgZm9yICh2YXIgaXRlbSBvZiBpdGVtcykge1xuICAgICAgICAgICAgaWYgKGl0ZW0ucm91dGVyTGluayAmJiB0aGlzLmlzUm91dGVyTGlua0FjdGl2ZShpdGVtKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGl0ZW0uY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICBjb25zdCBhY3RpdmVJdGVtID0gdGhpcy5maW5kQWN0aXZlSXRlbShpdGVtLmNoaWxkcmVuKTtcbiAgICAgICAgICAgICAgICBpZiAoYWN0aXZlSXRlbSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWN0aXZlSXRlbTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGlzUm91dGVyTGlua0FjdGl2ZShpdGVtOiBQYWdlSGVhZGVyTmF2aWdhdGlvbkl0ZW0pOiBib29sZWFuIHtcbiAgICAgICAgY29uc3Qgcm91dGVyTGluayA9IEFycmF5LmlzQXJyYXkoaXRlbS5yb3V0ZXJMaW5rKSA/IGl0ZW0ucm91dGVyTGluayA6IFtpdGVtLnJvdXRlckxpbmtdO1xuICAgICAgICBjb25zdCB1cmxUcmVlID0gdGhpcy5fcm91dGVyLmNyZWF0ZVVybFRyZWUocm91dGVyTGluaywgaXRlbS5yb3V0ZXJFeHRyYXMpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLl9yb3V0ZXIuaXNBY3RpdmUodXJsVHJlZSwgdHJ1ZSk7XG4gICAgfVxufVxuXG5leHBvcnQgdHlwZSBQYWdlSGVhZGVyTmF2aWdhdGlvbiA9IFBhZ2VIZWFkZXJOYXZpZ2F0aW9uSXRlbSB8IFBhZ2VIZWFkZXJOYXZpZ2F0aW9uRHJvcGRvd25JdGVtO1xuIl19