/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { map } from 'rxjs/operators';
var PageHeaderService = /** @class */ (function () {
    function PageHeaderService() {
        var _this = this;
        this.items$ = new BehaviorSubject([]);
        this.selected$ = new BehaviorSubject(null);
        this.selectedRoot$ = new BehaviorSubject(null);
        this.secondary$ = new BehaviorSubject(false);
        this.activeIconMenu$ = new BehaviorSubject(null);
        this.secondaryNavigationAutoselect = false;
        this._subscription = this.selected$.pipe(map(function (selected) { return _this.getRoot(selected); })).subscribe(function (root) { return _this.selectedRoot$.next(root); });
    }
    /**
     * @return {?}
     */
    PageHeaderService.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._subscription.unsubscribe();
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
        if (this.secondaryNavigationAutoselect && item && item.children && item.children.length > 0) {
            // Select the first child in secondaryNavigationAutoselect mode
            this.selected$.next(item.children[0]);
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
        item.selected = (item === selected) || this.isParentOf(selected, item);
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
        var /** @type {?} */ initialSelectedItem = items.find(function (item) { return item.selected === true; });
        this.select(initialSelectedItem);
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
    PageHeaderService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    PageHeaderService.ctorParameters = function () { return []; };
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
    PageHeaderService.prototype._subscription;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1oZWFkZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3BhZ2UtaGVhZGVyL3BhZ2UtaGVhZGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDdEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7SUFpQmpDO1FBQUEsaUJBRUM7c0JBWFEsSUFBSSxlQUFlLENBQTZCLEVBQUUsQ0FBQzt5QkFDaEQsSUFBSSxlQUFlLENBQTJCLElBQUksQ0FBQzs2QkFDL0MsSUFBSSxlQUFlLENBQTJCLElBQUksQ0FBQzswQkFDdEQsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDOytCQUM5QixJQUFJLGVBQWUsQ0FBcUIsSUFBSSxDQUFDOzZDQUMvQixLQUFLO1FBS2pDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQUEsUUFBUSxJQUFJLE9BQUEsS0FBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBdEIsQ0FBc0IsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsS0FBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQTdCLENBQTZCLENBQUMsQ0FBQztLQUN0STs7OztJQUVELHVDQUFXOzs7SUFBWDtRQUNJLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDcEM7Ozs7O0lBRUQsa0NBQU07Ozs7SUFBTixVQUFPLElBQThCO1FBRWpDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyw2QkFBNkIsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFD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b0M7OztRQUU5RSxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQzs7UUFHckIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDaEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsRUFBM0IsQ0FBMkIsQ0FBQyxDQUFDO1NBQy9EOzs7Ozs7O0lBR0csc0NBQVU7Ozs7O2NBQUMsSUFBMEIsRUFBRSxNQUE0Qjs7UUFHdkUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUN4QixNQUFNLENBQUMsS0FBSyxDQUFDO1NBQ2hCOztRQUdELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQztZQUN6QixNQUFNLENBQUMsSUFBSSxDQUFDO1NBQ2Y7O1FBR0QsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQzs7O2dCQTdHbkQsVUFBVTs7Ozs0QkFQWDs7U0FRYSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMvQmVoYXZpb3JTdWJqZWN0JztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMvU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7IFBhZ2VIZWFkZXJJY29uTWVudSB9IGZyb20gJy4vaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBQYWdlSGVhZGVyTmF2aWdhdGlvbkRyb3Bkb3duSXRlbSwgUGFnZUhlYWRlck5hdmlnYXRpb25JdGVtIH0gZnJvbSAnLi9uYXZpZ2F0aW9uL25hdmlnYXRpb24uY29tcG9uZW50JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFBhZ2VIZWFkZXJTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICAgIGl0ZW1zJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8UGFnZUhlYWRlck5hdmlnYXRpb25JdGVtW10+KFtdKTtcbiAgICBzZWxlY3RlZCQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFBhZ2VIZWFkZXJOYXZpZ2F0aW9uSXRlbT4obnVsbCk7XG4gICAgc2VsZWN0ZWRSb290JCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8UGFnZUhlYWRlck5hdmlnYXRpb25JdGVtPihudWxsKTtcbiAgICBzZWNvbmRhcnkkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gICAgYWN0aXZlSWNvbk1lbnUkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxQYWdlSGVhZGVySWNvbk1lbnU+KG51bGwpO1xuICAgIHNlY29uZGFyeU5hdmlnYXRpb25BdXRvc2VsZWN0ID0gZmFsc2U7XG5cbiAgICBwcml2YXRlIF9zdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb24gPSB0aGlzLnNlbGVjdGVkJC5waXBlKG1hcChzZWxlY3RlZCA9PiB0aGlzLmdldFJvb3Qoc2VsZWN0ZWQpKSkuc3Vic2NyaWJlKHJvb3QgPT4gdGhpcy5zZWxlY3RlZFJvb3QkLm5leHQocm9vdCkpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICBzZWxlY3QoaXRlbTogUGFnZUhlYWRlck5hdmlnYXRpb25JdGVtKTogdm9pZCB7XG5cbiAgICAgICAgaWYgKHRoaXMuc2Vjb25kYXJ5TmF2aWdhdGlvbkF1dG9zZWxlY3QgJiYgaXRlbSAmJiBpdGVtLmNoaWxkcmVuICYmIGl0ZW0uY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuXG4gICAgICAgICAgICAvLyBTZWxlY3QgdGhlIGZpcnN0IGNoaWxkIGluIHNlY29uZGFyeU5hdmlnYXRpb25BdXRvc2VsZWN0IG1vZGVcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQkLm5leHQoaXRlbS5jaGlsZHJlblswXSk7XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgLy8gaWYgd2UgYXJlIGluIHNlY29uZGFyeSBuYXZpZ2F0aW9uIG1vZGUgYW5kIHdlIGNsaWNrIGEgcGFyZW50IC0gZG9udCBkZXNlbGVjdCB0aGUgY2hpbGRcbiAgICAgICAgICAgIGlmICh0aGlzLnNlY29uZGFyeSQuZ2V0VmFsdWUoKSA9PT0gdHJ1ZSAmJiB0aGlzLmlzUGFyZW50T2YodGhpcy5zZWxlY3RlZCQuZ2V0VmFsdWUoKSwgaXRlbSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIE90aGVyd2lzZSBzZWxlY3QgdGhlIGdpdmVuIGl0ZW1cbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQkLm5leHQoaXRlbSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkZXNlbGVjdChpdGVtOiBQYWdlSGVhZGVyTmF2aWdhdGlvbkl0ZW0gfCBQYWdlSGVhZGVyTmF2aWdhdGlvbkRyb3Bkb3duSXRlbSk6IHZvaWQge1xuXG4gICAgICAgIC8vIGRlc2VsZWN0IHRoZSBjdXJyZW50IGl0ZW1cbiAgICAgICAgaXRlbS5zZWxlY3RlZCA9IGZhbHNlO1xuXG4gICAgICAgIC8vIGl0ZXJhdGUgYW55IGNoaWxkcmVuIGFuZCBkZXNlbGVjdCB0aGVtXG4gICAgICAgIGlmIChpdGVtLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICBpdGVtLmNoaWxkcmVuLmZvckVhY2goX2l0ZW0gPT4gdGhpcy5kZXNlbGVjdChfaXRlbSkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGVzZWxlY3RBbGwoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaXRlbXMkLmdldFZhbHVlKCkuZm9yRWFjaChpdGVtID0+IHRoaXMuZGVzZWxlY3QoaXRlbSkpO1xuICAgIH1cblxuICAgIHVwZGF0ZUl0ZW0oaXRlbTogUGFnZUhlYWRlck5hdmlnYXRpb25JdGVtLCBzZWxlY3RlZDogUGFnZUhlYWRlck5hdmlnYXRpb25JdGVtKTogdm9pZCB7XG5cbiAgICAgICAgLy8gSXRlbSBpcyBzZWxlY3RlZCBpZiBpdCBpcyB0aGUgc2VsZWN0ZWQgaXRlbSwgb3Igb25lIG9mIHRoZSBzZWxlY3RlZCBpdGVtJ3MgYW5jZXN0b3JzLlxuICAgICAgICBpdGVtLnNlbGVjdGVkID0gKGl0ZW0gPT09IHNlbGVjdGVkKSB8fCB0aGlzLmlzUGFyZW50T2Yoc2VsZWN0ZWQsIGl0ZW0pO1xuXG4gICAgICAgIGlmIChpdGVtID09PSBzZWxlY3RlZCkge1xuICAgICAgICAgICAgLy8gY2FsbCB0aGUgc2VsZWN0IGZ1bmN0aW9uIGlmIHByZXNlbnRcbiAgICAgICAgICAgIGlmIChpdGVtLnNlbGVjdCkge1xuICAgICAgICAgICAgICAgIGl0ZW0uc2VsZWN0LmNhbGwoaXRlbSwgaXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRJdGVtcyhpdGVtczogUGFnZUhlYWRlck5hdmlnYXRpb25JdGVtW10gPSBbXSk6IHZvaWQge1xuICAgICAgICAvLyBpZGVudGlmeSBhbGwgcGFyZW50IGVsZW1lbnRzXG4gICAgICAgIGl0ZW1zLmZvckVhY2goaXRlbSA9PiB0aGlzLnNldFBhcmVudChpdGVtKSk7XG5cbiAgICAgICAgdGhpcy5pdGVtcyQubmV4dChpdGVtcyk7XG5cbiAgICAgICAgLy8gU2V0IHVwIHRoZSBpbml0YWxseSBzZWxlY3RlZCBpdGVtXG4gICAgICAgIGNvbnN0IGluaXRpYWxTZWxlY3RlZEl0ZW0gPSBpdGVtcy5maW5kKGl0ZW0gPT4gaXRlbS5zZWxlY3RlZCA9PT0gdHJ1ZSk7XG4gICAgICAgIHRoaXMuc2VsZWN0KGluaXRpYWxTZWxlY3RlZEl0ZW0pO1xuICAgIH1cblxuICAgIHNldFNlY29uZGFyeU5hdmlnYXRpb24oZW5hYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICB0aGlzLnNlY29uZGFyeSQubmV4dChlbmFibGVkKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFJvb3QoaXRlbTogUGFnZUhlYWRlck5hdmlnYXRpb24pOiBQYWdlSGVhZGVyTmF2aWdhdGlvbiB7XG4gICAgICAgIHJldHVybiBpdGVtICYmIGl0ZW0ucGFyZW50ID8gdGhpcy5nZXRSb290KGl0ZW0ucGFyZW50KSA6IGl0ZW07XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRQYXJlbnQoaXRlbTogUGFnZUhlYWRlck5hdmlnYXRpb24sIHBhcmVudD86IFBhZ2VIZWFkZXJOYXZpZ2F0aW9uIHwgbnVsbCk6IHZvaWQge1xuICAgICAgICAvLyBzZXQgdGhlIHBhcmVudCBmaWVsZFxuICAgICAgICBpdGVtLnBhcmVudCA9IHBhcmVudDtcblxuICAgICAgICAvLyBjYWxsIHRoaXMgZnVuY3Rpb24gcmVjdXJzaXZlbHkgb24gYWxsIGNoaWxkcmVuXG4gICAgICAgIGlmIChpdGVtLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICBpdGVtLmNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4gdGhpcy5zZXRQYXJlbnQoY2hpbGQsIGl0ZW0pKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgaXNQYXJlbnRPZihub2RlOiBQYWdlSGVhZGVyTmF2aWdhdGlvbiwgcGFyZW50OiBQYWdlSGVhZGVyTmF2aWdhdGlvbik6IGJvb2xlYW4ge1xuXG4gICAgICAgIC8vIGlmIHRoZXJlIGFyZSBubyBwYXJlbnRzIHJldHVybiBmYWxzZVxuICAgICAgICBpZiAoIW5vZGUgfHwgIW5vZGUucGFyZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiB0aGUgcGFyZW50IGlzIHRoZSBtYXRjaCB3ZSBhcmUgbG9va2luZyBmb3IgcmV0dXJuIHRydWVcbiAgICAgICAgaWYgKG5vZGUucGFyZW50ID09PSBwYXJlbnQpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgdGhlcmUgYXJlIHBvdGVudGlhbGx5IGdyYW5kcGFyZW50cyB0aGVuIGNoZWNrIHRoZW0gdG9vXG4gICAgICAgIHJldHVybiB0aGlzLmlzUGFyZW50T2Yobm9kZS5wYXJlbnQsIHBhcmVudCk7XG4gICAgfVxufVxuXG5leHBvcnQgdHlwZSBQYWdlSGVhZGVyTmF2aWdhdGlvbiA9IFBhZ2VIZWFkZXJOYXZpZ2F0aW9uSXRlbSB8IFBhZ2VIZWFkZXJOYXZpZ2F0aW9uRHJvcGRvd25JdGVtOyJdfQ==