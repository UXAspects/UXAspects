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
        this.secondaryNavigationAutoselect = false;
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
        item.selected = (item === selected) || this.isParentOf(selected, item);
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
        const /** @type {?} */ initialSelectedItem = items.find(item => item.selected === true);
        this.select(initialSelectedItem);
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
}
PageHeaderService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
PageHeaderService.ctorParameters = () => [];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1oZWFkZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3BhZ2UtaGVhZGVyL3BhZ2UtaGVhZGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDdEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQU1yQyxNQUFNO0lBV0Y7c0JBVFMsSUFBSSxlQUFlLENBQTZCLEVBQUUsQ0FBQzt5QkFDaEQsSUFBSSxlQUFlLENBQTJCLElBQUksQ0FBQzs2QkFDL0MsSUFBSSxlQUFlLENBQTJCLElBQUksQ0FBQzswQkFDdEQsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDOytCQUM5QixJQUFJLGVBQWUsQ0FBcUIsSUFBSSxDQUFDOzZDQUMvQixLQUFLO1FBS2pDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztLQUN0STs7OztJQUVELFdBQVc7UUFDUCxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQ3BDOzs7OztJQUVELE1BQU0sQ0FBQyxJQUE4QjtRQUVqQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsNkJBQTZCLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FB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U0FDL0Q7Ozs7Ozs7SUFHRyxVQUFVLENBQUMsSUFBMEIsRUFBRSxNQUE0Qjs7UUFHdkUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUN4QixNQUFNLENBQUMsS0FBSyxDQUFDO1NBQ2hCOztRQUdELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQztZQUN6QixNQUFNLENBQUMsSUFBSSxDQUFDO1NBQ2Y7O1FBR0QsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQzs7OztZQTdHbkQsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcy9CZWhhdmlvclN1YmplY3QnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcy9TdWJzY3JpcHRpb24nO1xuaW1wb3J0IHsgUGFnZUhlYWRlckljb25NZW51IH0gZnJvbSAnLi9pbnRlcmZhY2VzJztcbmltcG9ydCB7IFBhZ2VIZWFkZXJOYXZpZ2F0aW9uRHJvcGRvd25JdGVtLCBQYWdlSGVhZGVyTmF2aWdhdGlvbkl0ZW0gfSBmcm9tICcuL25hdmlnYXRpb24vbmF2aWdhdGlvbi5jb21wb25lbnQnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUGFnZUhlYWRlclNlcnZpY2UgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gICAgaXRlbXMkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxQYWdlSGVhZGVyTmF2aWdhdGlvbkl0ZW1bXT4oW10pO1xuICAgIHNlbGVjdGVkJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8UGFnZUhlYWRlck5hdmlnYXRpb25JdGVtPihudWxsKTtcbiAgICBzZWxlY3RlZFJvb3QkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxQYWdlSGVhZGVyTmF2aWdhdGlvbkl0ZW0+KG51bGwpO1xuICAgIHNlY29uZGFyeSQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgICBhY3RpdmVJY29uTWVudSQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFBhZ2VIZWFkZXJJY29uTWVudT4obnVsbCk7XG4gICAgc2Vjb25kYXJ5TmF2aWdhdGlvbkF1dG9zZWxlY3QgPSBmYWxzZTtcblxuICAgIHByaXZhdGUgX3N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbiA9IHRoaXMuc2VsZWN0ZWQkLnBpcGUobWFwKHNlbGVjdGVkID0+IHRoaXMuZ2V0Um9vdChzZWxlY3RlZCkpKS5zdWJzY3JpYmUocm9vdCA9PiB0aGlzLnNlbGVjdGVkUm9vdCQubmV4dChyb290KSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIHNlbGVjdChpdGVtOiBQYWdlSGVhZGVyTmF2aWdhdGlvbkl0ZW0pOiB2b2lkIHtcblxuICAgICAgICBpZiAodGhpcy5zZWNvbmRhcnlOYXZpZ2F0aW9uQXV0b3NlbGVjdCAmJiBpdGVtICYmIGl0ZW0uY2hpbGRyZW4gJiYgaXRlbS5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG5cbiAgICAgICAgICAgIC8vIFNlbGVjdCB0aGUgZmlyc3QgY2hpbGQgaW4gc2Vjb25kYXJ5TmF2aWdhdGlvbkF1dG9zZWxlY3QgbW9kZVxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCQubmV4dChpdGVtLmNoaWxkcmVuWzBdKTtcblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAvLyBpZiB3ZSBhcmUgaW4gc2Vjb25kYXJ5IG5hdmlnYXRpb24gbW9kZSBhbmQgd2UgY2xpY2sgYSBwYXJlbnQgLSBkb250IGRlc2VsZWN0IHRoZSBjaGlsZFxuICAgICAgICAgICAgaWYgKHRoaXMuc2Vjb25kYXJ5JC5nZXRWYWx1ZSgpID09PSB0cnVlICYmIHRoaXMuaXNQYXJlbnRPZih0aGlzLnNlbGVjdGVkJC5nZXRWYWx1ZSgpLCBpdGVtKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gT3RoZXJ3aXNlIHNlbGVjdCB0aGUgZ2l2ZW4gaXRlbVxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCQubmV4dChpdGVtKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRlc2VsZWN0KGl0ZW06IFBhZ2VIZWFkZXJOYXZpZ2F0aW9uSXRlbSB8IFBhZ2VIZWFkZXJOYXZpZ2F0aW9uRHJvcGRvd25JdGVtKTogdm9pZCB7XG5cbiAgICAgICAgLy8gZGVzZWxlY3QgdGhlIGN1cnJlbnQgaXRlbVxuICAgICAgICBpdGVtLnNlbGVjdGVkID0gZmFsc2U7XG5cbiAgICAgICAgLy8gaXRlcmF0ZSBhbnkgY2hpbGRyZW4gYW5kIGRlc2VsZWN0IHRoZW1cbiAgICAgICAgaWYgKGl0ZW0uY2hpbGRyZW4pIHtcbiAgICAgICAgICAgIGl0ZW0uY2hpbGRyZW4uZm9yRWFjaChfaXRlbSA9PiB0aGlzLmRlc2VsZWN0KF9pdGVtKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkZXNlbGVjdEFsbCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pdGVtcyQuZ2V0VmFsdWUoKS5mb3JFYWNoKGl0ZW0gPT4gdGhpcy5kZXNlbGVjdChpdGVtKSk7XG4gICAgfVxuXG4gICAgdXBkYXRlSXRlbShpdGVtOiBQYWdlSGVhZGVyTmF2aWdhdGlvbkl0ZW0sIHNlbGVjdGVkOiBQYWdlSGVhZGVyTmF2aWdhdGlvbkl0ZW0pOiB2b2lkIHtcblxuICAgICAgICAvLyBJdGVtIGlzIHNlbGVjdGVkIGlmIGl0IGlzIHRoZSBzZWxlY3RlZCBpdGVtLCBvciBvbmUgb2YgdGhlIHNlbGVjdGVkIGl0ZW0ncyBhbmNlc3RvcnMuXG4gICAgICAgIGl0ZW0uc2VsZWN0ZWQgPSAoaXRlbSA9PT0gc2VsZWN0ZWQpIHx8IHRoaXMuaXNQYXJlbnRPZihzZWxlY3RlZCwgaXRlbSk7XG5cbiAgICAgICAgaWYgKGl0ZW0gPT09IHNlbGVjdGVkKSB7XG4gICAgICAgICAgICAvLyBjYWxsIHRoZSBzZWxlY3QgZnVuY3Rpb24gaWYgcHJlc2VudFxuICAgICAgICAgICAgaWYgKGl0ZW0uc2VsZWN0KSB7XG4gICAgICAgICAgICAgICAgaXRlbS5zZWxlY3QuY2FsbChpdGVtLCBpdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldEl0ZW1zKGl0ZW1zOiBQYWdlSGVhZGVyTmF2aWdhdGlvbkl0ZW1bXSA9IFtdKTogdm9pZCB7XG4gICAgICAgIC8vIGlkZW50aWZ5IGFsbCBwYXJlbnQgZWxlbWVudHNcbiAgICAgICAgaXRlbXMuZm9yRWFjaChpdGVtID0+IHRoaXMuc2V0UGFyZW50KGl0ZW0pKTtcblxuICAgICAgICB0aGlzLml0ZW1zJC5uZXh0KGl0ZW1zKTtcblxuICAgICAgICAvLyBTZXQgdXAgdGhlIGluaXRhbGx5IHNlbGVjdGVkIGl0ZW1cbiAgICAgICAgY29uc3QgaW5pdGlhbFNlbGVjdGVkSXRlbSA9IGl0ZW1zLmZpbmQoaXRlbSA9PiBpdGVtLnNlbGVjdGVkID09PSB0cnVlKTtcbiAgICAgICAgdGhpcy5zZWxlY3QoaW5pdGlhbFNlbGVjdGVkSXRlbSk7XG4gICAgfVxuXG4gICAgc2V0U2Vjb25kYXJ5TmF2aWdhdGlvbihlbmFibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2Vjb25kYXJ5JC5uZXh0KGVuYWJsZWQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0Um9vdChpdGVtOiBQYWdlSGVhZGVyTmF2aWdhdGlvbik6IFBhZ2VIZWFkZXJOYXZpZ2F0aW9uIHtcbiAgICAgICAgcmV0dXJuIGl0ZW0gJiYgaXRlbS5wYXJlbnQgPyB0aGlzLmdldFJvb3QoaXRlbS5wYXJlbnQpIDogaXRlbTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldFBhcmVudChpdGVtOiBQYWdlSGVhZGVyTmF2aWdhdGlvbiwgcGFyZW50PzogUGFnZUhlYWRlck5hdmlnYXRpb24gfCBudWxsKTogdm9pZCB7XG4gICAgICAgIC8vIHNldCB0aGUgcGFyZW50IGZpZWxkXG4gICAgICAgIGl0ZW0ucGFyZW50ID0gcGFyZW50O1xuXG4gICAgICAgIC8vIGNhbGwgdGhpcyBmdW5jdGlvbiByZWN1cnNpdmVseSBvbiBhbGwgY2hpbGRyZW5cbiAgICAgICAgaWYgKGl0ZW0uY2hpbGRyZW4pIHtcbiAgICAgICAgICAgIGl0ZW0uY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB0aGlzLnNldFBhcmVudChjaGlsZCwgaXRlbSkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc1BhcmVudE9mKG5vZGU6IFBhZ2VIZWFkZXJOYXZpZ2F0aW9uLCBwYXJlbnQ6IFBhZ2VIZWFkZXJOYXZpZ2F0aW9uKTogYm9vbGVhbiB7XG5cbiAgICAgICAgLy8gaWYgdGhlcmUgYXJlIG5vIHBhcmVudHMgcmV0dXJuIGZhbHNlXG4gICAgICAgIGlmICghbm9kZSB8fCAhbm9kZS5wYXJlbnQpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIHRoZSBwYXJlbnQgaXMgdGhlIG1hdGNoIHdlIGFyZSBsb29raW5nIGZvciByZXR1cm4gdHJ1ZVxuICAgICAgICBpZiAobm9kZS5wYXJlbnQgPT09IHBhcmVudCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiB0aGVyZSBhcmUgcG90ZW50aWFsbHkgZ3JhbmRwYXJlbnRzIHRoZW4gY2hlY2sgdGhlbSB0b29cbiAgICAgICAgcmV0dXJuIHRoaXMuaXNQYXJlbnRPZihub2RlLnBhcmVudCwgcGFyZW50KTtcbiAgICB9XG59XG5cbmV4cG9ydCB0eXBlIFBhZ2VIZWFkZXJOYXZpZ2F0aW9uID0gUGFnZUhlYWRlck5hdmlnYXRpb25JdGVtIHwgUGFnZUhlYWRlck5hdmlnYXRpb25Ecm9wZG93bkl0ZW07Il19