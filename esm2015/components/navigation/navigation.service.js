/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
export class NavigationService {
    constructor() {
        this.autoCollapse = true;
    }
    /**
     * @param {?} source
     * @param {?} expanded
     * @return {?}
     */
    setExpanded(source, expanded) {
        if (expanded && this.autoCollapse) {
            this.collapseSiblings(source);
        }
    }
    /**
     * @param {?} source
     * @return {?}
     */
    collapseSiblings(source) {
        let /** @type {?} */ siblings = this.items;
        for (let /** @type {?} */ item of this.items) {
            const /** @type {?} */ parent = this.getParent(source, item);
            if (parent) {
                siblings = parent.children;
                break;
            }
        }
        for (let /** @type {?} */ item of siblings) {
            if (item !== source) {
                this.collapseAll(item);
            }
        }
    }
    /**
     * @param {?} item
     * @return {?}
     */
    collapseAll(item) {
        item.expanded = false;
        if (item.children) {
            for (let /** @type {?} */ child of item.children) {
                this.collapseAll(child);
            }
        }
    }
    /**
     * @param {?} target
     * @param {?} item
     * @return {?}
     */
    getParent(target, item) {
        if (item.children) {
            for (let /** @type {?} */ child of item.children) {
                if (child === target) {
                    return item;
                }
            }
        }
        return null;
    }
}
NavigationService.decorators = [
    { type: Injectable }
];
function NavigationService_tsickle_Closure_declarations() {
    /** @type {?} */
    NavigationService.prototype.items;
    /** @type {?} */
    NavigationService.prototype.autoCollapse;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvbmF2aWdhdGlvbi9uYXZpZ2F0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFJM0MsTUFBTTs7NEJBSXNCLElBQUk7Ozs7Ozs7SUFFNUIsV0FBVyxDQUFDLE1BQXNCLEVBQUUsUUFBaUI7UUFDakQsRUFBRSxDQUFDLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNqQztLQUNKOzs7OztJQUVPLGdCQUFnQixDQUFDLE1BQXNCO1FBQzNDLHFCQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQzFCLEdBQUcsQ0FBQyxDQUFDLHFCQUFJLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUMxQix1QkFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDNUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDVCxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQztnQkFDM0IsS0FBSyxDQUFDO2FBQ1Q7U0FDSjtRQUVELEdBQUcsQ0FBQyxDQUFDLHFCQUFJLElBQUksSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNsQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQzFCO1NBQ0o7Ozs7OztJQUdHLFdBQVcsQ0FBQyxJQUFvQjtRQUNwQyxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUN0QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNoQixHQUFHLENBQUMsQ0FBQyxxQkFBSSxLQUFLLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQzlCLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDM0I7U0FDSjs7Ozs7OztJQUdHLFNBQVMsQ0FBQyxNQUFzQixFQUFFLElBQW9CO1FBQzFELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLEdBQUcsQ0FBQyxDQUFDLHFCQUFJLEtBQUssSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDOUIsRUFBRSxDQUFDLENBQUMsS0FBSyxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUM7b0JBQ25CLE1BQU0sQ0FBQyxJQUFJLENBQUM7aUJBQ2Y7YUFDSjtTQUNKO1FBRUQsTUFBTSxDQUFDLElBQUksQ0FBQzs7OztZQWhEbkIsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5hdmlnYXRpb25JdGVtIH0gZnJvbSAnLi9uYXZpZ2F0aW9uLWl0ZW0uaW5mZXJmYWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5hdmlnYXRpb25TZXJ2aWNlIHtcblxuICAgIGl0ZW1zOiBOYXZpZ2F0aW9uSXRlbVtdO1xuXG4gICAgYXV0b0NvbGxhcHNlOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIHNldEV4cGFuZGVkKHNvdXJjZTogTmF2aWdhdGlvbkl0ZW0sIGV4cGFuZGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIGlmIChleHBhbmRlZCAmJiB0aGlzLmF1dG9Db2xsYXBzZSkge1xuICAgICAgICAgICAgdGhpcy5jb2xsYXBzZVNpYmxpbmdzKHNvdXJjZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGNvbGxhcHNlU2libGluZ3Moc291cmNlOiBOYXZpZ2F0aW9uSXRlbSk6IHZvaWQge1xuICAgICAgICBsZXQgc2libGluZ3MgPSB0aGlzLml0ZW1zO1xuICAgICAgICBmb3IgKGxldCBpdGVtIG9mIHRoaXMuaXRlbXMpIHtcbiAgICAgICAgICAgIGNvbnN0IHBhcmVudCA9IHRoaXMuZ2V0UGFyZW50KHNvdXJjZSwgaXRlbSk7XG4gICAgICAgICAgICBpZiAocGFyZW50KSB7XG4gICAgICAgICAgICAgICAgc2libGluZ3MgPSBwYXJlbnQuY2hpbGRyZW47XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBpdGVtIG9mIHNpYmxpbmdzKSB7XG4gICAgICAgICAgICBpZiAoaXRlbSAhPT0gc291cmNlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb2xsYXBzZUFsbChpdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgY29sbGFwc2VBbGwoaXRlbTogTmF2aWdhdGlvbkl0ZW0pOiB2b2lkIHtcbiAgICAgICAgaXRlbS5leHBhbmRlZCA9IGZhbHNlO1xuICAgICAgICBpZiAoaXRlbS5jaGlsZHJlbikge1xuICAgICAgICAgICAgZm9yIChsZXQgY2hpbGQgb2YgaXRlbS5jaGlsZHJlbikge1xuICAgICAgICAgICAgICAgIHRoaXMuY29sbGFwc2VBbGwoY2hpbGQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRQYXJlbnQodGFyZ2V0OiBOYXZpZ2F0aW9uSXRlbSwgaXRlbTogTmF2aWdhdGlvbkl0ZW0pOiBOYXZpZ2F0aW9uSXRlbSB7XG4gICAgICAgIGlmIChpdGVtLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBjaGlsZCBvZiBpdGVtLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNoaWxkID09PSB0YXJnZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxufSJdfQ==