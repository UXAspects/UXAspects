/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { first } from 'rxjs/operators';
export class HierarchyBarService {
    constructor() {
        this.nodes$ = new BehaviorSubject([]);
        this._nodes = [];
    }
    /**
     * Store the root node of the hierarchy tree
     * @param {?} root
     * @return {?}
     */
    setRootNode(root) {
        // store the root node
        this._root = root;
        // create a flat structure of nodes
        this._nodes = this.getNodeList(root);
        // flatten the array - based on the selected node
        this.nodes$.next(this.getSelectedChildren(root));
    }
    /**
     * Select a node. This causes all nodes to be
     * deselected and the path to the selected node
     * to be selected
     * @param {?} node
     * @return {?}
     */
    selectNode(node) {
        // deselect all nodes
        this.deselectAll();
        // ensure the current node is selected and its parents
        this.select(node);
        // emit a new node list to trigger change detection
        this.nodes$.next(this.getSelectedChildren(this._root));
    }
    /**
     * Handles getting children with support for both arrays and observables
     * @param {?} node
     * @return {?}
     */
    getChildren(node) {
        if (Array.isArray(node.children)) {
            return of({ loading: false, children: node.children });
        }
        const /** @type {?} */ children$ = node.children;
        // if it is an observable then handle loading
        return Observable.create((observer) => {
            // emit initial value
            observer.next({ loading: true, children: [] });
            // now wait until the children observable completes
            children$.pipe(first()).subscribe(children => {
                // replace the observable with an array for future loading
                node.children = children;
                // rebuild the node tree
                this.setRootNode(this._root);
                // emit the latest value
                observer.next({ loading: false, children: children });
                // close the observable stream
                observer.complete();
            });
        });
    }
    /**
     * Traverses all the parents to ensure they are selected
     * @param {?} node
     * @return {?}
     */
    select(node) {
        node.selected = true;
        if (node.parent) {
            this.select(node.parent);
        }
    }
    /**
     * Deselects all nodes
     * @return {?}
     */
    deselectAll() {
        this._nodes.forEach(node => node.selected = false);
    }
    /**
     * Gets all the nodes in the tree as a flat array.
     * It also stores the parent node in a parent property
     * on the node for easy traversal in both directions
     * @param {?} node
     * @return {?}
     */
    getNodeList(node) {
        // if there are no children then return only itself
        if (!node.children || node.children instanceof Observable || node.children.length === 0) {
            return [node];
        }
        // store the parent property
        node.children.forEach(child => child.parent = node);
        // get all descendants of this node
        const /** @type {?} */ descendants = node.children.reduce((nodes, current) => [...nodes, ...this.getNodeList(current)], []);
        return [node, ...descendants];
    }
    /**
     * Gets all selected nodes from the parent node.
     * @param {?} node
     * @return {?}
     */
    getSelectedChildren(node) {
        if (node.children instanceof Observable) {
            return [node];
        }
        // get the children - and account for when there is none
        const /** @type {?} */ children = node.children || [];
        // check if any child is selected
        const /** @type {?} */ child = children.find(_child => _child.selected);
        // return the remaining chain of selected items
        return child ? [node, ...this.getSelectedChildren(child)] : [node];
    }
}
HierarchyBarService.decorators = [
    { type: Injectable },
];
function HierarchyBarService_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    HierarchyBarService.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    HierarchyBarService.ctorParameters;
    /** @type {?} */
    HierarchyBarService.prototype.nodes$;
    /** @type {?} */
    HierarchyBarService.prototype._root;
    /** @type {?} */
    HierarchyBarService.prototype._nodes;
}
/**
 * @record
 */
export function HierarchyBarNode() { }
function HierarchyBarNode_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    HierarchyBarNode.prototype.icon;
    /** @type {?} */
    HierarchyBarNode.prototype.title;
    /** @type {?|undefined} */
    HierarchyBarNode.prototype.selected;
    /** @type {?|undefined} */
    HierarchyBarNode.prototype.parent;
    /** @type {?|undefined} */
    HierarchyBarNode.prototype.children;
}
/**
 * @record
 */
export function HierarchyBarNodeChildren() { }
function HierarchyBarNodeChildren_tsickle_Closure_declarations() {
    /** @type {?} */
    HierarchyBarNodeChildren.prototype.loading;
    /** @type {?} */
    HierarchyBarNodeChildren.prototype.children;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGllcmFyY2h5LWJhci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvaGllcmFyY2h5LWJhci9oaWVyYXJjaHktYmFyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUU3QyxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDeEMsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBR3ZDLE1BQU07O3NCQUVPLElBQUksZUFBZSxDQUFxQixFQUFFLENBQUM7c0JBR2YsRUFBRTs7Ozs7OztJQUt2QyxXQUFXLENBQUMsSUFBc0I7O1FBRzlCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDOztRQUdsQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7O1FBR3JDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0tBQ3BEOzs7Ozs7OztJQU9ELFVBQVUsQ0FBQyxJQUFzQjs7UUFHN0IsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDOztRQUduQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDOztRQUdsQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7S0FDMUQ7Ozs7OztJQUtELFdBQVcsQ0FBQyxJQUFzQjtRQUU5QixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0IsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1NBQzFEO1FBRUQsdUJBQU0sU0FBUyxHQUFtQyxJQUFJLENBQUMsUUFBUSxDQUFDOztRQUdoRSxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQTRDOztZQUVsRSxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQzs7WUFHL0MsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxRQUFROztnQkFHdEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7O2dCQUd6QixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzs7Z0JBRzdCLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDOztnQkFHdEQsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO2FBQ3ZCLENBQUMsQ0FBQztTQUNOLENBQUMsQ0FBQztLQUNOOzs7Ozs7SUFLTyxNQUFNLENBQUMsSUFBc0I7UUFDakMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFFckIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDZCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUM1Qjs7Ozs7O0lBTUcsV0FBVztRQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQyxDQUFDOzs7Ozs7Ozs7SUFRL0MsV0FBVyxDQUFDLElBQXNCOztRQUd0QyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFFBQVEsWUFBWSxVQUFVLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0RixNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNqQjs7UUFHRCxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsQ0FBQzs7UUFHcEQsdUJBQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFxQixDQUFDLEtBQUssRUFBRSxPQUFPLEtBQUssQ0FBQyxHQUFHLEtBQUssRUFBRSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUUvSCxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxXQUFXLENBQUMsQ0FBQzs7Ozs7OztJQU0xQixtQkFBbUIsQ0FBQyxJQUFzQjtRQUU5QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxZQUFZLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDdEMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDakI7O1FBR0QsdUJBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDOztRQUdyQyx1QkFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDOztRQUd2RCxNQUFNLENBQUMsS0FBSyxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7OztZQWpJMUUsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMvQmVoYXZpb3JTdWJqZWN0JztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgT2JzZXJ2ZXIgfSBmcm9tICdyeGpzL09ic2VydmVyJztcbmltcG9ydCB7IG9mIH0gZnJvbSAncnhqcy9vYnNlcnZhYmxlL29mJztcbmltcG9ydCB7IGZpcnN0IH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSGllcmFyY2h5QmFyU2VydmljZSB7XG5cbiAgICBub2RlcyQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEhpZXJhcmNoeUJhck5vZGVbXT4oW10pO1xuXG4gICAgcHJpdmF0ZSBfcm9vdDogSGllcmFyY2h5QmFyTm9kZTtcbiAgICBwcml2YXRlIF9ub2RlczogSGllcmFyY2h5QmFyTm9kZVtdID0gW107XG5cbiAgICAvKipcbiAgICAgKiBTdG9yZSB0aGUgcm9vdCBub2RlIG9mIHRoZSBoaWVyYXJjaHkgdHJlZVxuICAgICAqL1xuICAgIHNldFJvb3ROb2RlKHJvb3Q6IEhpZXJhcmNoeUJhck5vZGUpIHtcblxuICAgICAgICAvLyBzdG9yZSB0aGUgcm9vdCBub2RlXG4gICAgICAgIHRoaXMuX3Jvb3QgPSByb290O1xuXG4gICAgICAgIC8vIGNyZWF0ZSBhIGZsYXQgc3RydWN0dXJlIG9mIG5vZGVzXG4gICAgICAgIHRoaXMuX25vZGVzID0gdGhpcy5nZXROb2RlTGlzdChyb290KTtcblxuICAgICAgICAvLyBmbGF0dGVuIHRoZSBhcnJheSAtIGJhc2VkIG9uIHRoZSBzZWxlY3RlZCBub2RlXG4gICAgICAgIHRoaXMubm9kZXMkLm5leHQodGhpcy5nZXRTZWxlY3RlZENoaWxkcmVuKHJvb3QpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZWxlY3QgYSBub2RlLiBUaGlzIGNhdXNlcyBhbGwgbm9kZXMgdG8gYmVcbiAgICAgKiBkZXNlbGVjdGVkIGFuZCB0aGUgcGF0aCB0byB0aGUgc2VsZWN0ZWQgbm9kZVxuICAgICAqIHRvIGJlIHNlbGVjdGVkXG4gICAgICovXG4gICAgc2VsZWN0Tm9kZShub2RlOiBIaWVyYXJjaHlCYXJOb2RlKTogdm9pZCB7XG5cbiAgICAgICAgLy8gZGVzZWxlY3QgYWxsIG5vZGVzXG4gICAgICAgIHRoaXMuZGVzZWxlY3RBbGwoKTtcblxuICAgICAgICAvLyBlbnN1cmUgdGhlIGN1cnJlbnQgbm9kZSBpcyBzZWxlY3RlZCBhbmQgaXRzIHBhcmVudHNcbiAgICAgICAgdGhpcy5zZWxlY3Qobm9kZSk7XG5cbiAgICAgICAgLy8gZW1pdCBhIG5ldyBub2RlIGxpc3QgdG8gdHJpZ2dlciBjaGFuZ2UgZGV0ZWN0aW9uXG4gICAgICAgIHRoaXMubm9kZXMkLm5leHQodGhpcy5nZXRTZWxlY3RlZENoaWxkcmVuKHRoaXMuX3Jvb3QpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGVzIGdldHRpbmcgY2hpbGRyZW4gd2l0aCBzdXBwb3J0IGZvciBib3RoIGFycmF5cyBhbmQgb2JzZXJ2YWJsZXNcbiAgICAgKi9cbiAgICBnZXRDaGlsZHJlbihub2RlOiBIaWVyYXJjaHlCYXJOb2RlKTogT2JzZXJ2YWJsZTxIaWVyYXJjaHlCYXJOb2RlQ2hpbGRyZW4+IHtcblxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShub2RlLmNoaWxkcmVuKSkge1xuICAgICAgICAgICAgcmV0dXJuIG9mKHsgbG9hZGluZzogZmFsc2UsIGNoaWxkcmVuOiBub2RlLmNoaWxkcmVuIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY2hpbGRyZW4kOiBPYnNlcnZhYmxlPEhpZXJhcmNoeUJhck5vZGVbXT4gPSBub2RlLmNoaWxkcmVuO1xuXG4gICAgICAgIC8vIGlmIGl0IGlzIGFuIG9ic2VydmFibGUgdGhlbiBoYW5kbGUgbG9hZGluZ1xuICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUoKG9ic2VydmVyOiBPYnNlcnZlcjxIaWVyYXJjaHlCYXJOb2RlQ2hpbGRyZW4+KSA9PiB7XG4gICAgICAgICAgICAvLyBlbWl0IGluaXRpYWwgdmFsdWVcbiAgICAgICAgICAgIG9ic2VydmVyLm5leHQoeyBsb2FkaW5nOiB0cnVlLCBjaGlsZHJlbjogW10gfSk7XG5cbiAgICAgICAgICAgIC8vIG5vdyB3YWl0IHVudGlsIHRoZSBjaGlsZHJlbiBvYnNlcnZhYmxlIGNvbXBsZXRlc1xuICAgICAgICAgICAgY2hpbGRyZW4kLnBpcGUoZmlyc3QoKSkuc3Vic2NyaWJlKGNoaWxkcmVuID0+IHtcblxuICAgICAgICAgICAgICAgIC8vIHJlcGxhY2UgdGhlIG9ic2VydmFibGUgd2l0aCBhbiBhcnJheSBmb3IgZnV0dXJlIGxvYWRpbmdcbiAgICAgICAgICAgICAgICBub2RlLmNoaWxkcmVuID0gY2hpbGRyZW47XG5cbiAgICAgICAgICAgICAgICAvLyByZWJ1aWxkIHRoZSBub2RlIHRyZWVcbiAgICAgICAgICAgICAgICB0aGlzLnNldFJvb3ROb2RlKHRoaXMuX3Jvb3QpO1xuXG4gICAgICAgICAgICAgICAgLy8gZW1pdCB0aGUgbGF0ZXN0IHZhbHVlXG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dCh7IGxvYWRpbmc6IGZhbHNlLCBjaGlsZHJlbjogY2hpbGRyZW4gfSk7XG5cbiAgICAgICAgICAgICAgICAvLyBjbG9zZSB0aGUgb2JzZXJ2YWJsZSBzdHJlYW1cbiAgICAgICAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyYXZlcnNlcyBhbGwgdGhlIHBhcmVudHMgdG8gZW5zdXJlIHRoZXkgYXJlIHNlbGVjdGVkXG4gICAgICovXG4gICAgcHJpdmF0ZSBzZWxlY3Qobm9kZTogSGllcmFyY2h5QmFyTm9kZSk6IHZvaWQge1xuICAgICAgICBub2RlLnNlbGVjdGVkID0gdHJ1ZTtcblxuICAgICAgICBpZiAobm9kZS5wYXJlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0KG5vZGUucGFyZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERlc2VsZWN0cyBhbGwgbm9kZXNcbiAgICAgKi9cbiAgICBwcml2YXRlIGRlc2VsZWN0QWxsKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9ub2Rlcy5mb3JFYWNoKG5vZGUgPT4gbm9kZS5zZWxlY3RlZCA9IGZhbHNlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGFsbCB0aGUgbm9kZXMgaW4gdGhlIHRyZWUgYXMgYSBmbGF0IGFycmF5LlxuICAgICAqIEl0IGFsc28gc3RvcmVzIHRoZSBwYXJlbnQgbm9kZSBpbiBhIHBhcmVudCBwcm9wZXJ0eVxuICAgICAqIG9uIHRoZSBub2RlIGZvciBlYXN5IHRyYXZlcnNhbCBpbiBib3RoIGRpcmVjdGlvbnNcbiAgICAgKi9cbiAgICBwcml2YXRlIGdldE5vZGVMaXN0KG5vZGU6IEhpZXJhcmNoeUJhck5vZGUpOiBIaWVyYXJjaHlCYXJOb2RlW10ge1xuXG4gICAgICAgIC8vIGlmIHRoZXJlIGFyZSBubyBjaGlsZHJlbiB0aGVuIHJldHVybiBvbmx5IGl0c2VsZlxuICAgICAgICBpZiAoIW5vZGUuY2hpbGRyZW4gfHwgbm9kZS5jaGlsZHJlbiBpbnN0YW5jZW9mIE9ic2VydmFibGUgfHwgbm9kZS5jaGlsZHJlbi5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBbbm9kZV07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBzdG9yZSB0aGUgcGFyZW50IHByb3BlcnR5XG4gICAgICAgIG5vZGUuY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiBjaGlsZC5wYXJlbnQgPSBub2RlKTtcblxuICAgICAgICAvLyBnZXQgYWxsIGRlc2NlbmRhbnRzIG9mIHRoaXMgbm9kZVxuICAgICAgICBjb25zdCBkZXNjZW5kYW50cyA9IG5vZGUuY2hpbGRyZW4ucmVkdWNlPEhpZXJhcmNoeUJhck5vZGVbXT4oKG5vZGVzLCBjdXJyZW50KSA9PiBbLi4ubm9kZXMsIC4uLnRoaXMuZ2V0Tm9kZUxpc3QoY3VycmVudCldLCBbXSk7XG5cbiAgICAgICAgcmV0dXJuIFtub2RlLCAuLi5kZXNjZW5kYW50c107XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBhbGwgc2VsZWN0ZWQgbm9kZXMgZnJvbSB0aGUgcGFyZW50IG5vZGUuXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRTZWxlY3RlZENoaWxkcmVuKG5vZGU6IEhpZXJhcmNoeUJhck5vZGUpOiBIaWVyYXJjaHlCYXJOb2RlW10ge1xuXG4gICAgICAgIGlmIChub2RlLmNoaWxkcmVuIGluc3RhbmNlb2YgT2JzZXJ2YWJsZSkge1xuICAgICAgICAgICAgcmV0dXJuIFtub2RlXTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGdldCB0aGUgY2hpbGRyZW4gLSBhbmQgYWNjb3VudCBmb3Igd2hlbiB0aGVyZSBpcyBub25lXG4gICAgICAgIGNvbnN0IGNoaWxkcmVuID0gbm9kZS5jaGlsZHJlbiB8fCBbXTtcblxuICAgICAgICAvLyBjaGVjayBpZiBhbnkgY2hpbGQgaXMgc2VsZWN0ZWRcbiAgICAgICAgY29uc3QgY2hpbGQgPSBjaGlsZHJlbi5maW5kKF9jaGlsZCA9PiBfY2hpbGQuc2VsZWN0ZWQpO1xuXG4gICAgICAgIC8vIHJldHVybiB0aGUgcmVtYWluaW5nIGNoYWluIG9mIHNlbGVjdGVkIGl0ZW1zXG4gICAgICAgIHJldHVybiBjaGlsZCA/IFtub2RlLCAuLi50aGlzLmdldFNlbGVjdGVkQ2hpbGRyZW4oY2hpbGQpXSA6IFtub2RlXTtcbiAgICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSGllcmFyY2h5QmFyTm9kZSB7XG4gICAgaWNvbj86IHN0cmluZztcbiAgICB0aXRsZTogc3RyaW5nO1xuICAgIHNlbGVjdGVkPzogYm9vbGVhbjtcbiAgICBwYXJlbnQ/OiBIaWVyYXJjaHlCYXJOb2RlO1xuICAgIGNoaWxkcmVuPzogSGllcmFyY2h5QmFyTm9kZVtdIHwgT2JzZXJ2YWJsZTxIaWVyYXJjaHlCYXJOb2RlW10+O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEhpZXJhcmNoeUJhck5vZGVDaGlsZHJlbiB7XG4gICAgbG9hZGluZzogYm9vbGVhbjtcbiAgICBjaGlsZHJlbjogSGllcmFyY2h5QmFyTm9kZVtdO1xufSJdfQ==