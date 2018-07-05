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
        // do nothing if this item is already selected
        if (item === this.selected$.getValue()) {
            return;
        }
        // if we are in secondary navigation mode and we click a parent - dont deselect the child
        if (this.secondary$.getValue() === true && this.isParentOf(this.selected$.getValue(), item)) {
            return;
        }
        // deselect all current items
        this.deselectAll();
        // call the select function if present
        if (item.select) {
            item.select.call(item, item);
        }
        // store the selected state
        item.selected = true;
        // select all parent items too
        this.selectParents(item);
        // emit the new selected item
        this.selected$.next(item);
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
     * @param {?} item
     * @return {?}
     */
    PageHeaderService.prototype.selectParents = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        // if there is a parent then we want to set it to selected
        if (item.parent) {
            item.parent.selected = true;
            // check if it has any parents
            this.selectParents(item.parent);
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
    PageHeaderService.prototype._subscription;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1oZWFkZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3BhZ2UtaGVhZGVyL3BhZ2UtaGVhZGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDdEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRXZELE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7SUFlakM7UUFBQSxpQkFFQztzQkFWUSxJQUFJLGVBQWUsQ0FBNkIsRUFBRSxDQUFDO3lCQUNoRCxJQUFJLGVBQWUsQ0FBMkIsSUFBSSxDQUFDOzZCQUMvQyxJQUFJLGVBQWUsQ0FBMkIsSUFBSSxDQUFDOzBCQUN0RCxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUM7K0JBQzlCLElBQUksZUFBZSxDQUFxQixJQUFJLENBQUM7UUFLM0QsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBQSxRQUFRLElBQUksT0FBQSxLQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUF0QixDQUFzQixDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxLQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBN0IsQ0FBNkIsQ0FBQyxDQUFDO0tBQ3RJOzs7O0lBRUQsdUNBQVc7OztJQUFYO1FBQ0ksSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUNwQzs7Ozs7SUFFRCxrQ0FBTTs7OztJQUFOLFVBQU8sSUFBOEI7O1FBR2pDLEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FB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Y0FBQyxJQUEwQixFQUFFLE1BQTRCOztRQUd2RSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLE1BQU0sQ0FBQyxLQUFLLENBQUM7U0FDaEI7O1FBR0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLE1BQU0sQ0FBQyxJQUFJLENBQUM7U0FDZjs7UUFHRCxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDOzs7Z0JBaEhuRCxVQUFVOzs7OzRCQVBYOztTQVFhLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcy9CZWhhdmlvclN1YmplY3QnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcy9TdWJzY3JpcHRpb24nO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgUGFnZUhlYWRlckljb25NZW51IH0gZnJvbSAnLi9pbnRlcmZhY2VzJztcbmltcG9ydCB7IFBhZ2VIZWFkZXJOYXZpZ2F0aW9uRHJvcGRvd25JdGVtLCBQYWdlSGVhZGVyTmF2aWdhdGlvbkl0ZW0gfSBmcm9tICcuL25hdmlnYXRpb24vbmF2aWdhdGlvbi5jb21wb25lbnQnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUGFnZUhlYWRlclNlcnZpY2UgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gICAgaXRlbXMkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxQYWdlSGVhZGVyTmF2aWdhdGlvbkl0ZW1bXT4oW10pO1xuICAgIHNlbGVjdGVkJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8UGFnZUhlYWRlck5hdmlnYXRpb25JdGVtPihudWxsKTtcbiAgICBzZWxlY3RlZFJvb3QkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxQYWdlSGVhZGVyTmF2aWdhdGlvbkl0ZW0+KG51bGwpO1xuICAgIHNlY29uZGFyeSQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgICBhY3RpdmVJY29uTWVudSQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFBhZ2VIZWFkZXJJY29uTWVudT4obnVsbCk7XG5cbiAgICBwcml2YXRlIF9zdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb24gPSB0aGlzLnNlbGVjdGVkJC5waXBlKG1hcChzZWxlY3RlZCA9PiB0aGlzLmdldFJvb3Qoc2VsZWN0ZWQpKSkuc3Vic2NyaWJlKHJvb3QgPT4gdGhpcy5zZWxlY3RlZFJvb3QkLm5leHQocm9vdCkpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICBzZWxlY3QoaXRlbTogUGFnZUhlYWRlck5hdmlnYXRpb25JdGVtKTogdm9pZCB7XG5cbiAgICAgICAgLy8gZG8gbm90aGluZyBpZiB0aGlzIGl0ZW0gaXMgYWxyZWFkeSBzZWxlY3RlZFxuICAgICAgICBpZiAoaXRlbSA9PT0gdGhpcy5zZWxlY3RlZCQuZ2V0VmFsdWUoKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgd2UgYXJlIGluIHNlY29uZGFyeSBuYXZpZ2F0aW9uIG1vZGUgYW5kIHdlIGNsaWNrIGEgcGFyZW50IC0gZG9udCBkZXNlbGVjdCB0aGUgY2hpbGRcbiAgICAgICAgaWYgKHRoaXMuc2Vjb25kYXJ5JC5nZXRWYWx1ZSgpID09PSB0cnVlICYmIHRoaXMuaXNQYXJlbnRPZih0aGlzLnNlbGVjdGVkJC5nZXRWYWx1ZSgpLCBpdGVtKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZGVzZWxlY3QgYWxsIGN1cnJlbnQgaXRlbXNcbiAgICAgICAgdGhpcy5kZXNlbGVjdEFsbCgpO1xuXG4gICAgICAgIC8vIGNhbGwgdGhlIHNlbGVjdCBmdW5jdGlvbiBpZiBwcmVzZW50XG4gICAgICAgIGlmIChpdGVtLnNlbGVjdCkge1xuICAgICAgICAgICAgaXRlbS5zZWxlY3QuY2FsbChpdGVtLCBpdGVtKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHN0b3JlIHRoZSBzZWxlY3RlZCBzdGF0ZVxuICAgICAgICBpdGVtLnNlbGVjdGVkID0gdHJ1ZTtcblxuICAgICAgICAvLyBzZWxlY3QgYWxsIHBhcmVudCBpdGVtcyB0b29cbiAgICAgICAgdGhpcy5zZWxlY3RQYXJlbnRzKGl0ZW0pO1xuXG4gICAgICAgIC8vIGVtaXQgdGhlIG5ldyBzZWxlY3RlZCBpdGVtXG4gICAgICAgIHRoaXMuc2VsZWN0ZWQkLm5leHQoaXRlbSk7XG4gICAgfVxuXG4gICAgZGVzZWxlY3QoaXRlbTogUGFnZUhlYWRlck5hdmlnYXRpb25JdGVtIHwgUGFnZUhlYWRlck5hdmlnYXRpb25Ecm9wZG93bkl0ZW0pOiB2b2lkIHtcblxuICAgICAgICAvLyBkZXNlbGVjdCB0aGUgY3VycmVudCBpdGVtXG4gICAgICAgIGl0ZW0uc2VsZWN0ZWQgPSBmYWxzZTtcblxuICAgICAgICAvLyBpdGVyYXRlIGFueSBjaGlsZHJlbiBhbmQgZGVzZWxlY3QgdGhlbVxuICAgICAgICBpZiAoaXRlbS5jaGlsZHJlbikge1xuICAgICAgICAgICAgaXRlbS5jaGlsZHJlbi5mb3JFYWNoKF9pdGVtID0+IHRoaXMuZGVzZWxlY3QoX2l0ZW0pKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRlc2VsZWN0QWxsKCk6IHZvaWQge1xuICAgICAgICB0aGlzLml0ZW1zJC5nZXRWYWx1ZSgpLmZvckVhY2goaXRlbSA9PiB0aGlzLmRlc2VsZWN0KGl0ZW0pKTtcbiAgICB9XG5cbiAgICBzZXRJdGVtcyhpdGVtczogUGFnZUhlYWRlck5hdmlnYXRpb25JdGVtW10gPSBbXSk6IHZvaWQge1xuICAgICAgICAvLyBpZGVudGlmeSBhbGwgcGFyZW50IGVsZW1lbnRzXG4gICAgICAgIGl0ZW1zLmZvckVhY2goaXRlbSA9PiB0aGlzLnNldFBhcmVudChpdGVtKSk7XG5cbiAgICAgICAgdGhpcy5pdGVtcyQubmV4dChpdGVtcyk7XG4gICAgfVxuXG4gICAgc2V0U2Vjb25kYXJ5TmF2aWdhdGlvbihlbmFibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2Vjb25kYXJ5JC5uZXh0KGVuYWJsZWQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0Um9vdChpdGVtOiBQYWdlSGVhZGVyTmF2aWdhdGlvbik6IFBhZ2VIZWFkZXJOYXZpZ2F0aW9uIHtcbiAgICAgICAgcmV0dXJuIGl0ZW0gJiYgaXRlbS5wYXJlbnQgPyB0aGlzLmdldFJvb3QoaXRlbS5wYXJlbnQpIDogaXRlbTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldFBhcmVudChpdGVtOiBQYWdlSGVhZGVyTmF2aWdhdGlvbiwgcGFyZW50PzogUGFnZUhlYWRlck5hdmlnYXRpb24gfCBudWxsKTogdm9pZCB7XG4gICAgICAgIC8vIHNldCB0aGUgcGFyZW50IGZpZWxkXG4gICAgICAgIGl0ZW0ucGFyZW50ID0gcGFyZW50O1xuXG4gICAgICAgIC8vIGNhbGwgdGhpcyBmdW5jdGlvbiByZWN1cnNpdmVseSBvbiBhbGwgY2hpbGRyZW5cbiAgICAgICAgaWYgKGl0ZW0uY2hpbGRyZW4pIHtcbiAgICAgICAgICAgIGl0ZW0uY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB0aGlzLnNldFBhcmVudChjaGlsZCwgaXRlbSkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZWxlY3RQYXJlbnRzKGl0ZW06IFBhZ2VIZWFkZXJOYXZpZ2F0aW9uKTogdm9pZCB7XG4gICAgICAgIC8vIGlmIHRoZXJlIGlzIGEgcGFyZW50IHRoZW4gd2Ugd2FudCB0byBzZXQgaXQgdG8gc2VsZWN0ZWRcbiAgICAgICAgaWYgKGl0ZW0ucGFyZW50KSB7XG4gICAgICAgICAgICBpdGVtLnBhcmVudC5zZWxlY3RlZCA9IHRydWU7XG5cbiAgICAgICAgICAgIC8vIGNoZWNrIGlmIGl0IGhhcyBhbnkgcGFyZW50c1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RQYXJlbnRzKGl0ZW0ucGFyZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgaXNQYXJlbnRPZihub2RlOiBQYWdlSGVhZGVyTmF2aWdhdGlvbiwgcGFyZW50OiBQYWdlSGVhZGVyTmF2aWdhdGlvbik6IGJvb2xlYW4ge1xuXG4gICAgICAgIC8vIGlmIHRoZXJlIGFyZSBubyBwYXJlbnRzIHJldHVybiBmYWxzZVxuICAgICAgICBpZiAoIW5vZGUgfHwgIW5vZGUucGFyZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiB0aGUgcGFyZW50IGlzIHRoZSBtYXRjaCB3ZSBhcmUgbG9va2luZyBmb3IgcmV0dXJuIHRydWVcbiAgICAgICAgaWYgKG5vZGUucGFyZW50ID09PSBwYXJlbnQpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgdGhlcmUgYXJlIHBvdGVudGlhbGx5IGdyYW5kcGFyZW50cyB0aGVuIGNoZWNrIHRoZW0gdG9vXG4gICAgICAgIHJldHVybiB0aGlzLmlzUGFyZW50T2Yobm9kZS5wYXJlbnQsIHBhcmVudCk7XG4gICAgfVxufVxuXG5leHBvcnQgdHlwZSBQYWdlSGVhZGVyTmF2aWdhdGlvbiA9IFBhZ2VIZWFkZXJOYXZpZ2F0aW9uSXRlbSB8IFBhZ2VIZWFkZXJOYXZpZ2F0aW9uRHJvcGRvd25JdGVtOyJdfQ==