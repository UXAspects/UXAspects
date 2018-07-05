/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { map } from 'rxjs/operators';
export class PageHeaderService {
    constructor() {
        this.items$ = new BehaviorSubject([]);
        this.selected$ = new BehaviorSubject(null);
        this.selectedRoot$ = new BehaviorSubject(null);
        this.secondary$ = new BehaviorSubject(false);
        this.activeIconMenu$ = new BehaviorSubject(null);
        this._subscription = this.selected$.pipe(map(selected => this.getRoot(selected))).subscribe(root => this.selectedRoot$.next(root));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._subscription.unsubscribe();
    }
    /**
     * @param {?} item
     * @return {?}
     */
    select(item) {
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
     * @param {?=} items
     * @return {?}
     */
    setItems(items = []) {
        // identify all parent elements
        items.forEach(item => this.setParent(item));
        this.items$.next(items);
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
     * @param {?} item
     * @return {?}
     */
    selectParents(item) {
        // if there is a parent then we want to set it to selected
        if (item.parent) {
            item.parent.selected = true;
            // check if it has any parents
            this.selectParents(item.parent);
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
}
PageHeaderService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
PageHeaderService.ctorParameters = () => [];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1oZWFkZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3BhZ2UtaGVhZGVyL3BhZ2UtaGVhZGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDdEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRXZELE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUtyQyxNQUFNO0lBVUY7c0JBUlMsSUFBSSxlQUFlLENBQTZCLEVBQUUsQ0FBQzt5QkFDaEQsSUFBSSxlQUFlLENBQTJCLElBQUksQ0FBQzs2QkFDL0MsSUFBSSxlQUFlLENBQTJCLElBQUksQ0FBQzswQkFDdEQsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDOytCQUM5QixJQUFJLGVBQWUsQ0FBcUIsSUFBSSxDQUFDO1FBSzNELElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7S0FDdEk7Ozs7SUFFRCxXQUFXO1FBQ1AsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUNwQzs7Ozs7SUFFRCxNQUFNLENBQUMsSUFBOEI7O1FBR2pDLEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNyQyxNQUFNLENBQUM7U0FDVjs7UUFHRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFD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SSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQzs7OztZQWhIbkQsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcy9CZWhhdmlvclN1YmplY3QnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcy9TdWJzY3JpcHRpb24nO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgUGFnZUhlYWRlckljb25NZW51IH0gZnJvbSAnLi9pbnRlcmZhY2VzJztcbmltcG9ydCB7IFBhZ2VIZWFkZXJOYXZpZ2F0aW9uRHJvcGRvd25JdGVtLCBQYWdlSGVhZGVyTmF2aWdhdGlvbkl0ZW0gfSBmcm9tICcuL25hdmlnYXRpb24vbmF2aWdhdGlvbi5jb21wb25lbnQnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUGFnZUhlYWRlclNlcnZpY2UgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gICAgaXRlbXMkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxQYWdlSGVhZGVyTmF2aWdhdGlvbkl0ZW1bXT4oW10pO1xuICAgIHNlbGVjdGVkJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8UGFnZUhlYWRlck5hdmlnYXRpb25JdGVtPihudWxsKTtcbiAgICBzZWxlY3RlZFJvb3QkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxQYWdlSGVhZGVyTmF2aWdhdGlvbkl0ZW0+KG51bGwpO1xuICAgIHNlY29uZGFyeSQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgICBhY3RpdmVJY29uTWVudSQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFBhZ2VIZWFkZXJJY29uTWVudT4obnVsbCk7XG5cbiAgICBwcml2YXRlIF9zdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb24gPSB0aGlzLnNlbGVjdGVkJC5waXBlKG1hcChzZWxlY3RlZCA9PiB0aGlzLmdldFJvb3Qoc2VsZWN0ZWQpKSkuc3Vic2NyaWJlKHJvb3QgPT4gdGhpcy5zZWxlY3RlZFJvb3QkLm5leHQocm9vdCkpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICBzZWxlY3QoaXRlbTogUGFnZUhlYWRlck5hdmlnYXRpb25JdGVtKTogdm9pZCB7XG5cbiAgICAgICAgLy8gZG8gbm90aGluZyBpZiB0aGlzIGl0ZW0gaXMgYWxyZWFkeSBzZWxlY3RlZFxuICAgICAgICBpZiAoaXRlbSA9PT0gdGhpcy5zZWxlY3RlZCQuZ2V0VmFsdWUoKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgd2UgYXJlIGluIHNlY29uZGFyeSBuYXZpZ2F0aW9uIG1vZGUgYW5kIHdlIGNsaWNrIGEgcGFyZW50IC0gZG9udCBkZXNlbGVjdCB0aGUgY2hpbGRcbiAgICAgICAgaWYgKHRoaXMuc2Vjb25kYXJ5JC5nZXRWYWx1ZSgpID09PSB0cnVlICYmIHRoaXMuaXNQYXJlbnRPZih0aGlzLnNlbGVjdGVkJC5nZXRWYWx1ZSgpLCBpdGVtKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZGVzZWxlY3QgYWxsIGN1cnJlbnQgaXRlbXNcbiAgICAgICAgdGhpcy5kZXNlbGVjdEFsbCgpO1xuXG4gICAgICAgIC8vIGNhbGwgdGhlIHNlbGVjdCBmdW5jdGlvbiBpZiBwcmVzZW50XG4gICAgICAgIGlmIChpdGVtLnNlbGVjdCkge1xuICAgICAgICAgICAgaXRlbS5zZWxlY3QuY2FsbChpdGVtLCBpdGVtKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHN0b3JlIHRoZSBzZWxlY3RlZCBzdGF0ZVxuICAgICAgICBpdGVtLnNlbGVjdGVkID0gdHJ1ZTtcblxuICAgICAgICAvLyBzZWxlY3QgYWxsIHBhcmVudCBpdGVtcyB0b29cbiAgICAgICAgdGhpcy5zZWxlY3RQYXJlbnRzKGl0ZW0pO1xuXG4gICAgICAgIC8vIGVtaXQgdGhlIG5ldyBzZWxlY3RlZCBpdGVtXG4gICAgICAgIHRoaXMuc2VsZWN0ZWQkLm5leHQoaXRlbSk7XG4gICAgfVxuXG4gICAgZGVzZWxlY3QoaXRlbTogUGFnZUhlYWRlck5hdmlnYXRpb25JdGVtIHwgUGFnZUhlYWRlck5hdmlnYXRpb25Ecm9wZG93bkl0ZW0pOiB2b2lkIHtcblxuICAgICAgICAvLyBkZXNlbGVjdCB0aGUgY3VycmVudCBpdGVtXG4gICAgICAgIGl0ZW0uc2VsZWN0ZWQgPSBmYWxzZTtcblxuICAgICAgICAvLyBpdGVyYXRlIGFueSBjaGlsZHJlbiBhbmQgZGVzZWxlY3QgdGhlbVxuICAgICAgICBpZiAoaXRlbS5jaGlsZHJlbikge1xuICAgICAgICAgICAgaXRlbS5jaGlsZHJlbi5mb3JFYWNoKF9pdGVtID0+IHRoaXMuZGVzZWxlY3QoX2l0ZW0pKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRlc2VsZWN0QWxsKCk6IHZvaWQge1xuICAgICAgICB0aGlzLml0ZW1zJC5nZXRWYWx1ZSgpLmZvckVhY2goaXRlbSA9PiB0aGlzLmRlc2VsZWN0KGl0ZW0pKTtcbiAgICB9XG5cbiAgICBzZXRJdGVtcyhpdGVtczogUGFnZUhlYWRlck5hdmlnYXRpb25JdGVtW10gPSBbXSk6IHZvaWQge1xuICAgICAgICAvLyBpZGVudGlmeSBhbGwgcGFyZW50IGVsZW1lbnRzXG4gICAgICAgIGl0ZW1zLmZvckVhY2goaXRlbSA9PiB0aGlzLnNldFBhcmVudChpdGVtKSk7XG5cbiAgICAgICAgdGhpcy5pdGVtcyQubmV4dChpdGVtcyk7XG4gICAgfVxuXG4gICAgc2V0U2Vjb25kYXJ5TmF2aWdhdGlvbihlbmFibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2Vjb25kYXJ5JC5uZXh0KGVuYWJsZWQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0Um9vdChpdGVtOiBQYWdlSGVhZGVyTmF2aWdhdGlvbik6IFBhZ2VIZWFkZXJOYXZpZ2F0aW9uIHtcbiAgICAgICAgcmV0dXJuIGl0ZW0gJiYgaXRlbS5wYXJlbnQgPyB0aGlzLmdldFJvb3QoaXRlbS5wYXJlbnQpIDogaXRlbTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldFBhcmVudChpdGVtOiBQYWdlSGVhZGVyTmF2aWdhdGlvbiwgcGFyZW50PzogUGFnZUhlYWRlck5hdmlnYXRpb24gfCBudWxsKTogdm9pZCB7XG4gICAgICAgIC8vIHNldCB0aGUgcGFyZW50IGZpZWxkXG4gICAgICAgIGl0ZW0ucGFyZW50ID0gcGFyZW50O1xuXG4gICAgICAgIC8vIGNhbGwgdGhpcyBmdW5jdGlvbiByZWN1cnNpdmVseSBvbiBhbGwgY2hpbGRyZW5cbiAgICAgICAgaWYgKGl0ZW0uY2hpbGRyZW4pIHtcbiAgICAgICAgICAgIGl0ZW0uY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB0aGlzLnNldFBhcmVudChjaGlsZCwgaXRlbSkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZWxlY3RQYXJlbnRzKGl0ZW06IFBhZ2VIZWFkZXJOYXZpZ2F0aW9uKTogdm9pZCB7XG4gICAgICAgIC8vIGlmIHRoZXJlIGlzIGEgcGFyZW50IHRoZW4gd2Ugd2FudCB0byBzZXQgaXQgdG8gc2VsZWN0ZWRcbiAgICAgICAgaWYgKGl0ZW0ucGFyZW50KSB7XG4gICAgICAgICAgICBpdGVtLnBhcmVudC5zZWxlY3RlZCA9IHRydWU7XG5cbiAgICAgICAgICAgIC8vIGNoZWNrIGlmIGl0IGhhcyBhbnkgcGFyZW50c1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RQYXJlbnRzKGl0ZW0ucGFyZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgaXNQYXJlbnRPZihub2RlOiBQYWdlSGVhZGVyTmF2aWdhdGlvbiwgcGFyZW50OiBQYWdlSGVhZGVyTmF2aWdhdGlvbik6IGJvb2xlYW4ge1xuXG4gICAgICAgIC8vIGlmIHRoZXJlIGFyZSBubyBwYXJlbnRzIHJldHVybiBmYWxzZVxuICAgICAgICBpZiAoIW5vZGUgfHwgIW5vZGUucGFyZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiB0aGUgcGFyZW50IGlzIHRoZSBtYXRjaCB3ZSBhcmUgbG9va2luZyBmb3IgcmV0dXJuIHRydWVcbiAgICAgICAgaWYgKG5vZGUucGFyZW50ID09PSBwYXJlbnQpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgdGhlcmUgYXJlIHBvdGVudGlhbGx5IGdyYW5kcGFyZW50cyB0aGVuIGNoZWNrIHRoZW0gdG9vXG4gICAgICAgIHJldHVybiB0aGlzLmlzUGFyZW50T2Yobm9kZS5wYXJlbnQsIHBhcmVudCk7XG4gICAgfVxufVxuXG5leHBvcnQgdHlwZSBQYWdlSGVhZGVyTmF2aWdhdGlvbiA9IFBhZ2VIZWFkZXJOYXZpZ2F0aW9uSXRlbSB8IFBhZ2VIZWFkZXJOYXZpZ2F0aW9uRHJvcGRvd25JdGVtOyJdfQ==