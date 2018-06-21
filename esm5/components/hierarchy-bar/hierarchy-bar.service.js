/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { first } from 'rxjs/operators';
var HierarchyBarService = (function () {
    function HierarchyBarService() {
        this.nodes$ = new BehaviorSubject([]);
        this._nodes = [];
    }
    /**
     * Store the root node of the hierarchy tree
     */
    /**
     * Store the root node of the hierarchy tree
     * @param {?} root
     * @return {?}
     */
    HierarchyBarService.prototype.setRootNode = /**
     * Store the root node of the hierarchy tree
     * @param {?} root
     * @return {?}
     */
    function (root) {
        // store the root node
        this._root = root;
        // create a flat structure of nodes
        this._nodes = this.getNodeList(root);
        // flatten the array - based on the selected node
        this.nodes$.next(this.getSelectedChildren(root));
    };
    /**
     * Select a node. This causes all nodes to be
     * deselected and the path to the selected node
     * to be selected
     */
    /**
     * Select a node. This causes all nodes to be
     * deselected and the path to the selected node
     * to be selected
     * @param {?} node
     * @return {?}
     */
    HierarchyBarService.prototype.selectNode = /**
     * Select a node. This causes all nodes to be
     * deselected and the path to the selected node
     * to be selected
     * @param {?} node
     * @return {?}
     */
    function (node) {
        // deselect all nodes
        this.deselectAll();
        // ensure the current node is selected and its parents
        this.select(node);
        // emit a new node list to trigger change detection
        this.nodes$.next(this.getSelectedChildren(this._root));
    };
    /**
     * Handles getting children with support for both arrays and observables
     */
    /**
     * Handles getting children with support for both arrays and observables
     * @param {?} node
     * @return {?}
     */
    HierarchyBarService.prototype.getChildren = /**
     * Handles getting children with support for both arrays and observables
     * @param {?} node
     * @return {?}
     */
    function (node) {
        var _this = this;
        if (Array.isArray(node.children)) {
            return of({ loading: false, children: node.children });
        }
        var /** @type {?} */ children$ = node.children;
        // if it is an observable then handle loading
        return Observable.create(function (observer) {
            // emit initial value
            observer.next({ loading: true, children: [] });
            // now wait until the children observable completes
            children$.pipe(first()).subscribe(function (children) {
                // replace the observable with an array for future loading
                node.children = children;
                // rebuild the node tree
                // rebuild the node tree
                _this.setRootNode(_this._root);
                // emit the latest value
                observer.next({ loading: false, children: children });
                // close the observable stream
                observer.complete();
            });
        });
    };
    /**
     * Traverses all the parents to ensure they are selected
     * @param {?} node
     * @return {?}
     */
    HierarchyBarService.prototype.select = /**
     * Traverses all the parents to ensure they are selected
     * @param {?} node
     * @return {?}
     */
    function (node) {
        node.selected = true;
        if (node.parent) {
            this.select(node.parent);
        }
    };
    /**
     * Deselects all nodes
     * @return {?}
     */
    HierarchyBarService.prototype.deselectAll = /**
     * Deselects all nodes
     * @return {?}
     */
    function () {
        this._nodes.forEach(function (node) { return node.selected = false; });
    };
    /**
     * Gets all the nodes in the tree as a flat array.
     * It also stores the parent node in a parent property
     * on the node for easy traversal in both directions
     * @param {?} node
     * @return {?}
     */
    HierarchyBarService.prototype.getNodeList = /**
     * Gets all the nodes in the tree as a flat array.
     * It also stores the parent node in a parent property
     * on the node for easy traversal in both directions
     * @param {?} node
     * @return {?}
     */
    function (node) {
        var _this = this;
        // if there are no children then return only itself
        if (!node.children || node.children instanceof Observable || node.children.length === 0) {
            return [node];
        }
        // store the parent property
        node.children.forEach(function (child) { return child.parent = node; });
        // get all descendants of this node
        var /** @type {?} */ descendants = node.children.reduce(function (nodes, current) { return tslib_1.__spread(nodes, _this.getNodeList(current)); }, []);
        return tslib_1.__spread([node], descendants);
    };
    /**
     * Gets all selected nodes from the parent node.
     * @param {?} node
     * @return {?}
     */
    HierarchyBarService.prototype.getSelectedChildren = /**
     * Gets all selected nodes from the parent node.
     * @param {?} node
     * @return {?}
     */
    function (node) {
        if (node.children instanceof Observable) {
            return [node];
        }
        // get the children - and account for when there is none
        var /** @type {?} */ children = node.children || [];
        // check if any child is selected
        var /** @type {?} */ child = children.find(function (_child) { return _child.selected; });
        // return the remaining chain of selected items
        return child ? tslib_1.__spread([node], this.getSelectedChildren(child)) : [node];
    };
    HierarchyBarService.decorators = [
        { type: Injectable },
    ];
    return HierarchyBarService;
}());
export { HierarchyBarService };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGllcmFyY2h5LWJhci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvaGllcmFyY2h5LWJhci9oaWVyYXJjaHktYmFyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFN0MsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3hDLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7O3NCQUsxQixJQUFJLGVBQWUsQ0FBcUIsRUFBRSxDQUFDO3NCQUdmLEVBQUU7O0lBRXZDOztPQUVHOzs7Ozs7SUFDSCx5Q0FBVzs7Ozs7SUFBWCxVQUFZLElBQXNCOztRQUc5QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQzs7UUFHbEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDOztRQUdyQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztLQUNwRDtJQUVEOzs7O09BSUc7Ozs7Ozs7O0lBQ0gsd0NBQVU7Ozs7Ozs7SUFBVixVQUFXLElBQXNCOztRQUc3QixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7O1FBR25CLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7O1FBR2xCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztLQUMxRDtJQUVE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ZixDQUFlLENBQUMsQ0FBQzs7UUFHdkQsTUFBTSxDQUFDLEtBQUsscUJBQUksSUFBSSxHQUFLLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDOzs7Z0JBakkxRSxVQUFVOzs4QkFQWDs7U0FRYSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzL0JlaGF2aW9yU3ViamVjdCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IE9ic2VydmVyIH0gZnJvbSAncnhqcy9PYnNlcnZlcic7XG5pbXBvcnQgeyBvZiB9IGZyb20gJ3J4anMvb2JzZXJ2YWJsZS9vZic7XG5pbXBvcnQgeyBmaXJzdCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEhpZXJhcmNoeUJhclNlcnZpY2Uge1xuXG4gICAgbm9kZXMkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxIaWVyYXJjaHlCYXJOb2RlW10+KFtdKTtcblxuICAgIHByaXZhdGUgX3Jvb3Q6IEhpZXJhcmNoeUJhck5vZGU7XG4gICAgcHJpdmF0ZSBfbm9kZXM6IEhpZXJhcmNoeUJhck5vZGVbXSA9IFtdO1xuXG4gICAgLyoqXG4gICAgICogU3RvcmUgdGhlIHJvb3Qgbm9kZSBvZiB0aGUgaGllcmFyY2h5IHRyZWVcbiAgICAgKi9cbiAgICBzZXRSb290Tm9kZShyb290OiBIaWVyYXJjaHlCYXJOb2RlKSB7XG5cbiAgICAgICAgLy8gc3RvcmUgdGhlIHJvb3Qgbm9kZVxuICAgICAgICB0aGlzLl9yb290ID0gcm9vdDtcblxuICAgICAgICAvLyBjcmVhdGUgYSBmbGF0IHN0cnVjdHVyZSBvZiBub2Rlc1xuICAgICAgICB0aGlzLl9ub2RlcyA9IHRoaXMuZ2V0Tm9kZUxpc3Qocm9vdCk7XG5cbiAgICAgICAgLy8gZmxhdHRlbiB0aGUgYXJyYXkgLSBiYXNlZCBvbiB0aGUgc2VsZWN0ZWQgbm9kZVxuICAgICAgICB0aGlzLm5vZGVzJC5uZXh0KHRoaXMuZ2V0U2VsZWN0ZWRDaGlsZHJlbihyb290KSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2VsZWN0IGEgbm9kZS4gVGhpcyBjYXVzZXMgYWxsIG5vZGVzIHRvIGJlXG4gICAgICogZGVzZWxlY3RlZCBhbmQgdGhlIHBhdGggdG8gdGhlIHNlbGVjdGVkIG5vZGVcbiAgICAgKiB0byBiZSBzZWxlY3RlZFxuICAgICAqL1xuICAgIHNlbGVjdE5vZGUobm9kZTogSGllcmFyY2h5QmFyTm9kZSk6IHZvaWQge1xuXG4gICAgICAgIC8vIGRlc2VsZWN0IGFsbCBub2Rlc1xuICAgICAgICB0aGlzLmRlc2VsZWN0QWxsKCk7XG5cbiAgICAgICAgLy8gZW5zdXJlIHRoZSBjdXJyZW50IG5vZGUgaXMgc2VsZWN0ZWQgYW5kIGl0cyBwYXJlbnRzXG4gICAgICAgIHRoaXMuc2VsZWN0KG5vZGUpO1xuXG4gICAgICAgIC8vIGVtaXQgYSBuZXcgbm9kZSBsaXN0IHRvIHRyaWdnZXIgY2hhbmdlIGRldGVjdGlvblxuICAgICAgICB0aGlzLm5vZGVzJC5uZXh0KHRoaXMuZ2V0U2VsZWN0ZWRDaGlsZHJlbih0aGlzLl9yb290KSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGFuZGxlcyBnZXR0aW5nIGNoaWxkcmVuIHdpdGggc3VwcG9ydCBmb3IgYm90aCBhcnJheXMgYW5kIG9ic2VydmFibGVzXG4gICAgICovXG4gICAgZ2V0Q2hpbGRyZW4obm9kZTogSGllcmFyY2h5QmFyTm9kZSk6IE9ic2VydmFibGU8SGllcmFyY2h5QmFyTm9kZUNoaWxkcmVuPiB7XG5cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkobm9kZS5jaGlsZHJlbikpIHtcbiAgICAgICAgICAgIHJldHVybiBvZih7IGxvYWRpbmc6IGZhbHNlLCBjaGlsZHJlbjogbm9kZS5jaGlsZHJlbiB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNoaWxkcmVuJDogT2JzZXJ2YWJsZTxIaWVyYXJjaHlCYXJOb2RlW10+ID0gbm9kZS5jaGlsZHJlbjtcblxuICAgICAgICAvLyBpZiBpdCBpcyBhbiBvYnNlcnZhYmxlIHRoZW4gaGFuZGxlIGxvYWRpbmdcbiAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKChvYnNlcnZlcjogT2JzZXJ2ZXI8SGllcmFyY2h5QmFyTm9kZUNoaWxkcmVuPikgPT4ge1xuICAgICAgICAgICAgLy8gZW1pdCBpbml0aWFsIHZhbHVlXG4gICAgICAgICAgICBvYnNlcnZlci5uZXh0KHsgbG9hZGluZzogdHJ1ZSwgY2hpbGRyZW46IFtdIH0pO1xuXG4gICAgICAgICAgICAvLyBub3cgd2FpdCB1bnRpbCB0aGUgY2hpbGRyZW4gb2JzZXJ2YWJsZSBjb21wbGV0ZXNcbiAgICAgICAgICAgIGNoaWxkcmVuJC5waXBlKGZpcnN0KCkpLnN1YnNjcmliZShjaGlsZHJlbiA9PiB7XG5cbiAgICAgICAgICAgICAgICAvLyByZXBsYWNlIHRoZSBvYnNlcnZhYmxlIHdpdGggYW4gYXJyYXkgZm9yIGZ1dHVyZSBsb2FkaW5nXG4gICAgICAgICAgICAgICAgbm9kZS5jaGlsZHJlbiA9IGNoaWxkcmVuO1xuXG4gICAgICAgICAgICAgICAgLy8gcmVidWlsZCB0aGUgbm9kZSB0cmVlXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRSb290Tm9kZSh0aGlzLl9yb290KTtcblxuICAgICAgICAgICAgICAgIC8vIGVtaXQgdGhlIGxhdGVzdCB2YWx1ZVxuICAgICAgICAgICAgICAgIG9ic2VydmVyLm5leHQoeyBsb2FkaW5nOiBmYWxzZSwgY2hpbGRyZW46IGNoaWxkcmVuIH0pO1xuXG4gICAgICAgICAgICAgICAgLy8gY2xvc2UgdGhlIG9ic2VydmFibGUgc3RyZWFtXG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmF2ZXJzZXMgYWxsIHRoZSBwYXJlbnRzIHRvIGVuc3VyZSB0aGV5IGFyZSBzZWxlY3RlZFxuICAgICAqL1xuICAgIHByaXZhdGUgc2VsZWN0KG5vZGU6IEhpZXJhcmNoeUJhck5vZGUpOiB2b2lkIHtcbiAgICAgICAgbm9kZS5zZWxlY3RlZCA9IHRydWU7XG5cbiAgICAgICAgaWYgKG5vZGUucGFyZW50KSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdChub2RlLnBhcmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXNlbGVjdHMgYWxsIG5vZGVzXG4gICAgICovXG4gICAgcHJpdmF0ZSBkZXNlbGVjdEFsbCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fbm9kZXMuZm9yRWFjaChub2RlID0+IG5vZGUuc2VsZWN0ZWQgPSBmYWxzZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBhbGwgdGhlIG5vZGVzIGluIHRoZSB0cmVlIGFzIGEgZmxhdCBhcnJheS5cbiAgICAgKiBJdCBhbHNvIHN0b3JlcyB0aGUgcGFyZW50IG5vZGUgaW4gYSBwYXJlbnQgcHJvcGVydHlcbiAgICAgKiBvbiB0aGUgbm9kZSBmb3IgZWFzeSB0cmF2ZXJzYWwgaW4gYm90aCBkaXJlY3Rpb25zXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXROb2RlTGlzdChub2RlOiBIaWVyYXJjaHlCYXJOb2RlKTogSGllcmFyY2h5QmFyTm9kZVtdIHtcblxuICAgICAgICAvLyBpZiB0aGVyZSBhcmUgbm8gY2hpbGRyZW4gdGhlbiByZXR1cm4gb25seSBpdHNlbGZcbiAgICAgICAgaWYgKCFub2RlLmNoaWxkcmVuIHx8IG5vZGUuY2hpbGRyZW4gaW5zdGFuY2VvZiBPYnNlcnZhYmxlIHx8IG5vZGUuY2hpbGRyZW4ubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gW25vZGVdO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gc3RvcmUgdGhlIHBhcmVudCBwcm9wZXJ0eVxuICAgICAgICBub2RlLmNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4gY2hpbGQucGFyZW50ID0gbm9kZSk7XG5cbiAgICAgICAgLy8gZ2V0IGFsbCBkZXNjZW5kYW50cyBvZiB0aGlzIG5vZGVcbiAgICAgICAgY29uc3QgZGVzY2VuZGFudHMgPSBub2RlLmNoaWxkcmVuLnJlZHVjZTxIaWVyYXJjaHlCYXJOb2RlW10+KChub2RlcywgY3VycmVudCkgPT4gWy4uLm5vZGVzLCAuLi50aGlzLmdldE5vZGVMaXN0KGN1cnJlbnQpXSwgW10pO1xuXG4gICAgICAgIHJldHVybiBbbm9kZSwgLi4uZGVzY2VuZGFudHNdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgYWxsIHNlbGVjdGVkIG5vZGVzIGZyb20gdGhlIHBhcmVudCBub2RlLlxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0U2VsZWN0ZWRDaGlsZHJlbihub2RlOiBIaWVyYXJjaHlCYXJOb2RlKTogSGllcmFyY2h5QmFyTm9kZVtdIHtcblxuICAgICAgICBpZiAobm9kZS5jaGlsZHJlbiBpbnN0YW5jZW9mIE9ic2VydmFibGUpIHtcbiAgICAgICAgICAgIHJldHVybiBbbm9kZV07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBnZXQgdGhlIGNoaWxkcmVuIC0gYW5kIGFjY291bnQgZm9yIHdoZW4gdGhlcmUgaXMgbm9uZVxuICAgICAgICBjb25zdCBjaGlsZHJlbiA9IG5vZGUuY2hpbGRyZW4gfHwgW107XG5cbiAgICAgICAgLy8gY2hlY2sgaWYgYW55IGNoaWxkIGlzIHNlbGVjdGVkXG4gICAgICAgIGNvbnN0IGNoaWxkID0gY2hpbGRyZW4uZmluZChfY2hpbGQgPT4gX2NoaWxkLnNlbGVjdGVkKTtcblxuICAgICAgICAvLyByZXR1cm4gdGhlIHJlbWFpbmluZyBjaGFpbiBvZiBzZWxlY3RlZCBpdGVtc1xuICAgICAgICByZXR1cm4gY2hpbGQgPyBbbm9kZSwgLi4udGhpcy5nZXRTZWxlY3RlZENoaWxkcmVuKGNoaWxkKV0gOiBbbm9kZV07XG4gICAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEhpZXJhcmNoeUJhck5vZGUge1xuICAgIGljb24/OiBzdHJpbmc7XG4gICAgdGl0bGU6IHN0cmluZztcbiAgICBzZWxlY3RlZD86IGJvb2xlYW47XG4gICAgcGFyZW50PzogSGllcmFyY2h5QmFyTm9kZTtcbiAgICBjaGlsZHJlbj86IEhpZXJhcmNoeUJhck5vZGVbXSB8IE9ic2VydmFibGU8SGllcmFyY2h5QmFyTm9kZVtdPjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBIaWVyYXJjaHlCYXJOb2RlQ2hpbGRyZW4ge1xuICAgIGxvYWRpbmc6IGJvb2xlYW47XG4gICAgY2hpbGRyZW46IEhpZXJhcmNoeUJhck5vZGVbXTtcbn0iXX0=