/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { map } from 'rxjs/operators';
var PageHeaderService = (function () {
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
        { type: Injectable },
    ];
    /** @nocollapse */
    PageHeaderService.ctorParameters = function () { return []; };
    return PageHeaderService;
}());
export { PageHeaderService };
function PageHeaderService_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    PageHeaderService.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    PageHeaderService.ctorParameters;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1oZWFkZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3BhZ2UtaGVhZGVyL3BhZ2UtaGVhZGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDdEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7SUFpQmpDO1FBQUEsaUJBRUM7c0JBWFEsSUFBSSxlQUFlLENBQTZCLEVBQUUsQ0FBQzt5QkFDaEQsSUFBSSxlQUFlLENBQTJCLElBQUksQ0FBQzs2QkFDL0MsSUFBSSxlQUFlLENBQTJCLElBQUksQ0FBQzswQkFDdEQsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDOytCQUM5QixJQUFJLGVBQWUsQ0FBcUIsSUFBSSxDQUFDOzZDQUMvQixLQUFLO1FBS2pDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQUEsUUFBUSxJQUFJLE9BQUEsS0FBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBdEIsQ0FBc0IsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsS0FBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQTdCLENBQTZCLENBQUMsQ0FBQztLQUN0STs7OztJQUVELHVDQUFXOzs7SUFBWDtRQUNJLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDcEM7Ozs7O0lBRUQsa0NBQU07Ozs7SUFBTixVQUFPLElBQThCO1FBRWpDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyw2QkFBNkIsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFD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LE1BQU0sR0FBRyxNQUFNLENBQUM7O1FBR3JCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEVBQTNCLENBQTJCLENBQUMsQ0FBQztTQUMvRDs7Ozs7OztJQUdHLHNDQUFVOzs7OztjQUFDLElBQTBCLEVBQUUsTUFBNEI7O1FBR3ZFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDeEIsTUFBTSxDQUFDLEtBQUssQ0FBQztTQUNoQjs7UUFHRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDekIsTUFBTSxDQUFDLElBQUksQ0FBQztTQUNmOztRQUdELE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7OztnQkE3R25ELFVBQVU7Ozs7NEJBUFg7O1NBUWEsaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzL0JlaGF2aW9yU3ViamVjdCc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgeyBQYWdlSGVhZGVySWNvbk1lbnUgfSBmcm9tICcuL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgUGFnZUhlYWRlck5hdmlnYXRpb25Ecm9wZG93bkl0ZW0sIFBhZ2VIZWFkZXJOYXZpZ2F0aW9uSXRlbSB9IGZyb20gJy4vbmF2aWdhdGlvbi9uYXZpZ2F0aW9uLmNvbXBvbmVudCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBQYWdlSGVhZGVyU2VydmljZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG5cbiAgICBpdGVtcyQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFBhZ2VIZWFkZXJOYXZpZ2F0aW9uSXRlbVtdPihbXSk7XG4gICAgc2VsZWN0ZWQkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxQYWdlSGVhZGVyTmF2aWdhdGlvbkl0ZW0+KG51bGwpO1xuICAgIHNlbGVjdGVkUm9vdCQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFBhZ2VIZWFkZXJOYXZpZ2F0aW9uSXRlbT4obnVsbCk7XG4gICAgc2Vjb25kYXJ5JCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICAgIGFjdGl2ZUljb25NZW51JCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8UGFnZUhlYWRlckljb25NZW51PihudWxsKTtcbiAgICBzZWNvbmRhcnlOYXZpZ2F0aW9uQXV0b3NlbGVjdCA9IGZhbHNlO1xuXG4gICAgcHJpdmF0ZSBfc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9uID0gdGhpcy5zZWxlY3RlZCQucGlwZShtYXAoc2VsZWN0ZWQgPT4gdGhpcy5nZXRSb290KHNlbGVjdGVkKSkpLnN1YnNjcmliZShyb290ID0+IHRoaXMuc2VsZWN0ZWRSb290JC5uZXh0KHJvb3QpKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgc2VsZWN0KGl0ZW06IFBhZ2VIZWFkZXJOYXZpZ2F0aW9uSXRlbSk6IHZvaWQge1xuXG4gICAgICAgIGlmICh0aGlzLnNlY29uZGFyeU5hdmlnYXRpb25BdXRvc2VsZWN0ICYmIGl0ZW0gJiYgaXRlbS5jaGlsZHJlbiAmJiBpdGVtLmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcblxuICAgICAgICAgICAgLy8gU2VsZWN0IHRoZSBmaXJzdCBjaGlsZCBpbiBzZWNvbmRhcnlOYXZpZ2F0aW9uQXV0b3NlbGVjdCBtb2RlXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkJC5uZXh0KGl0ZW0uY2hpbGRyZW5bMF0pO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIC8vIGlmIHdlIGFyZSBpbiBzZWNvbmRhcnkgbmF2aWdhdGlvbiBtb2RlIGFuZCB3ZSBjbGljayBhIHBhcmVudCAtIGRvbnQgZGVzZWxlY3QgdGhlIGNoaWxkXG4gICAgICAgICAgICBpZiAodGhpcy5zZWNvbmRhcnkkLmdldFZhbHVlKCkgPT09IHRydWUgJiYgdGhpcy5pc1BhcmVudE9mKHRoaXMuc2VsZWN0ZWQkLmdldFZhbHVlKCksIGl0ZW0pKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBPdGhlcndpc2Ugc2VsZWN0IHRoZSBnaXZlbiBpdGVtXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkJC5uZXh0KGl0ZW0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGVzZWxlY3QoaXRlbTogUGFnZUhlYWRlck5hdmlnYXRpb25JdGVtIHwgUGFnZUhlYWRlck5hdmlnYXRpb25Ecm9wZG93bkl0ZW0pOiB2b2lkIHtcblxuICAgICAgICAvLyBkZXNlbGVjdCB0aGUgY3VycmVudCBpdGVtXG4gICAgICAgIGl0ZW0uc2VsZWN0ZWQgPSBmYWxzZTtcblxuICAgICAgICAvLyBpdGVyYXRlIGFueSBjaGlsZHJlbiBhbmQgZGVzZWxlY3QgdGhlbVxuICAgICAgICBpZiAoaXRlbS5jaGlsZHJlbikge1xuICAgICAgICAgICAgaXRlbS5jaGlsZHJlbi5mb3JFYWNoKF9pdGVtID0+IHRoaXMuZGVzZWxlY3QoX2l0ZW0pKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRlc2VsZWN0QWxsKCk6IHZvaWQge1xuICAgICAgICB0aGlzLml0ZW1zJC5nZXRWYWx1ZSgpLmZvckVhY2goaXRlbSA9PiB0aGlzLmRlc2VsZWN0KGl0ZW0pKTtcbiAgICB9XG5cbiAgICB1cGRhdGVJdGVtKGl0ZW06IFBhZ2VIZWFkZXJOYXZpZ2F0aW9uSXRlbSwgc2VsZWN0ZWQ6IFBhZ2VIZWFkZXJOYXZpZ2F0aW9uSXRlbSk6IHZvaWQge1xuXG4gICAgICAgIC8vIEl0ZW0gaXMgc2VsZWN0ZWQgaWYgaXQgaXMgdGhlIHNlbGVjdGVkIGl0ZW0sIG9yIG9uZSBvZiB0aGUgc2VsZWN0ZWQgaXRlbSdzIGFuY2VzdG9ycy5cbiAgICAgICAgaXRlbS5zZWxlY3RlZCA9IChpdGVtID09PSBzZWxlY3RlZCkgfHwgdGhpcy5pc1BhcmVudE9mKHNlbGVjdGVkLCBpdGVtKTtcblxuICAgICAgICBpZiAoaXRlbSA9PT0gc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIC8vIGNhbGwgdGhlIHNlbGVjdCBmdW5jdGlvbiBpZiBwcmVzZW50XG4gICAgICAgICAgICBpZiAoaXRlbS5zZWxlY3QpIHtcbiAgICAgICAgICAgICAgICBpdGVtLnNlbGVjdC5jYWxsKGl0ZW0sIGl0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0SXRlbXMoaXRlbXM6IFBhZ2VIZWFkZXJOYXZpZ2F0aW9uSXRlbVtdID0gW10pOiB2b2lkIHtcbiAgICAgICAgLy8gaWRlbnRpZnkgYWxsIHBhcmVudCBlbGVtZW50c1xuICAgICAgICBpdGVtcy5mb3JFYWNoKGl0ZW0gPT4gdGhpcy5zZXRQYXJlbnQoaXRlbSkpO1xuXG4gICAgICAgIHRoaXMuaXRlbXMkLm5leHQoaXRlbXMpO1xuXG4gICAgICAgIC8vIFNldCB1cCB0aGUgaW5pdGFsbHkgc2VsZWN0ZWQgaXRlbVxuICAgICAgICBjb25zdCBpbml0aWFsU2VsZWN0ZWRJdGVtID0gaXRlbXMuZmluZChpdGVtID0+IGl0ZW0uc2VsZWN0ZWQgPT09IHRydWUpO1xuICAgICAgICB0aGlzLnNlbGVjdChpbml0aWFsU2VsZWN0ZWRJdGVtKTtcbiAgICB9XG5cbiAgICBzZXRTZWNvbmRhcnlOYXZpZ2F0aW9uKGVuYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZWNvbmRhcnkkLm5leHQoZW5hYmxlZCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRSb290KGl0ZW06IFBhZ2VIZWFkZXJOYXZpZ2F0aW9uKTogUGFnZUhlYWRlck5hdmlnYXRpb24ge1xuICAgICAgICByZXR1cm4gaXRlbSAmJiBpdGVtLnBhcmVudCA/IHRoaXMuZ2V0Um9vdChpdGVtLnBhcmVudCkgOiBpdGVtO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0UGFyZW50KGl0ZW06IFBhZ2VIZWFkZXJOYXZpZ2F0aW9uLCBwYXJlbnQ/OiBQYWdlSGVhZGVyTmF2aWdhdGlvbiB8IG51bGwpOiB2b2lkIHtcbiAgICAgICAgLy8gc2V0IHRoZSBwYXJlbnQgZmllbGRcbiAgICAgICAgaXRlbS5wYXJlbnQgPSBwYXJlbnQ7XG5cbiAgICAgICAgLy8gY2FsbCB0aGlzIGZ1bmN0aW9uIHJlY3Vyc2l2ZWx5IG9uIGFsbCBjaGlsZHJlblxuICAgICAgICBpZiAoaXRlbS5jaGlsZHJlbikge1xuICAgICAgICAgICAgaXRlbS5jaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IHRoaXMuc2V0UGFyZW50KGNoaWxkLCBpdGVtKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGlzUGFyZW50T2Yobm9kZTogUGFnZUhlYWRlck5hdmlnYXRpb24sIHBhcmVudDogUGFnZUhlYWRlck5hdmlnYXRpb24pOiBib29sZWFuIHtcblxuICAgICAgICAvLyBpZiB0aGVyZSBhcmUgbm8gcGFyZW50cyByZXR1cm4gZmFsc2VcbiAgICAgICAgaWYgKCFub2RlIHx8ICFub2RlLnBhcmVudCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgdGhlIHBhcmVudCBpcyB0aGUgbWF0Y2ggd2UgYXJlIGxvb2tpbmcgZm9yIHJldHVybiB0cnVlXG4gICAgICAgIGlmIChub2RlLnBhcmVudCA9PT0gcGFyZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIHRoZXJlIGFyZSBwb3RlbnRpYWxseSBncmFuZHBhcmVudHMgdGhlbiBjaGVjayB0aGVtIHRvb1xuICAgICAgICByZXR1cm4gdGhpcy5pc1BhcmVudE9mKG5vZGUucGFyZW50LCBwYXJlbnQpO1xuICAgIH1cbn1cblxuZXhwb3J0IHR5cGUgUGFnZUhlYWRlck5hdmlnYXRpb24gPSBQYWdlSGVhZGVyTmF2aWdhdGlvbkl0ZW0gfCBQYWdlSGVhZGVyTmF2aWdhdGlvbkRyb3Bkb3duSXRlbTsiXX0=