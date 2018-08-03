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
var HierarchyBarService = /** @class */ (function () {
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
        { type: Injectable }
    ];
    return HierarchyBarService;
}());
export { HierarchyBarService };
function HierarchyBarService_tsickle_Closure_declarations() {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGllcmFyY2h5LWJhci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvaGllcmFyY2h5LWJhci9oaWVyYXJjaHktYmFyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFN0MsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3hDLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7O3NCQUsxQixJQUFJLGVBQWUsQ0FBcUIsRUFBRSxDQUFDO3NCQUdmLEVBQUU7O0lBRXZDOztPQUVHOzs7Ozs7SUFDSCx5Q0FBVzs7Ozs7SUFBWCxVQUFZLElBQXNCOztRQUc5QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQzs7UUFHbEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDOztRQUdyQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztLQUNwRDtJQUVEOzs7O09BSUc7Ozs7Ozs7O0lBQ0gsd0NBQVU7Ozs7Ozs7SUFBVixVQUFXLElBQXNCOztRQUc3QixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7O1FBR25CLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7O1FBR2xCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztLQUMxRDtJQUVEOztPQUVHOzs7Ozs7SUFDSCx5Q0FBVzs7Ozs7SUFBWCxVQUFZLElBQXNCO1FBQWxDLGlCQTZCQztRQTNCRyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0IsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1NBQzFEO1FBRUQscUJBQU0sU0FBUyxHQUFtQyxJQUFJLENBQUMsUUFBUSxDQUFDOztRQUdoRSxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxVQUFDLFFBQTRDOztZQUVsRSxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQzs7WUFHL0MsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLFFBQVE7O2dCQUd0QyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQzs7Z0JBR3pCLEFBREEsd0JBQXdCO2dCQUN4QixLQUFJLENBQUMsV0FBVyxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzs7Z0JBRzdCLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDOztnQkFHdEQsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO2FBQ3ZCLENBQUMsQ0FBQztTQUNOLENBQUMsQ0FBQztLQUNOOzs7Ozs7SUFLTyxvQ0FBTTs7Ozs7Y0FBQyxJQUFzQjtRQUNqQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUVyQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNkLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQzVCOzs7Ozs7SUFNRyx5Q0FBVzs7Ozs7UUFDZixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxFQUFyQixDQUFxQixDQUFDLENBQUM7Ozs7Ozs7OztJQVEvQyx5Q0FBVzs7Ozs7OztjQUFDLElBQXNCOzs7UUFHdEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLFlBQVksVUFBVSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEYsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDakI7O1FBR0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksRUFBbkIsQ0FBbUIsQ0FBQyxDQUFDOztRQUdwRCxxQkFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQXFCLFVBQUMsS0FBSyxFQUFFLE9BQU8sSUFBSyx3QkFBSSxLQUFLLEVBQUssS0FBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsR0FBdkMsQ0FBd0MsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUUvSCxNQUFNLG1CQUFFLElBQUksR0FBSyxXQUFXLEVBQUU7Ozs7Ozs7SUFNMUIsaURBQW1COzs7OztjQUFDLElBQXNCO1FBRTlDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLFlBQVksVUFBVSxDQUFDLENBQUMsQ0FBQztZQUN0QyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNqQjs7UUFHRCxxQkFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUM7O1FBR3JDLHFCQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQUEsTUFBTSxJQUFJLE9BQUEsTUFBTSxDQUFDLFFBQVEsRUFBZixDQUFlLENBQUMsQ0FBQzs7UUFHdkQsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLG1CQUFFLElBQUksR0FBSyxJQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7OztnQkFqSTFFLFVBQVU7OzhCQVBYOztTQVFhLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcy9CZWhhdmlvclN1YmplY3QnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcclxuaW1wb3J0IHsgT2JzZXJ2ZXIgfSBmcm9tICdyeGpzL09ic2VydmVyJztcclxuaW1wb3J0IHsgb2YgfSBmcm9tICdyeGpzL29ic2VydmFibGUvb2YnO1xyXG5pbXBvcnQgeyBmaXJzdCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEhpZXJhcmNoeUJhclNlcnZpY2Uge1xyXG5cclxuICAgIG5vZGVzJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8SGllcmFyY2h5QmFyTm9kZVtdPihbXSk7XHJcblxyXG4gICAgcHJpdmF0ZSBfcm9vdDogSGllcmFyY2h5QmFyTm9kZTtcclxuICAgIHByaXZhdGUgX25vZGVzOiBIaWVyYXJjaHlCYXJOb2RlW10gPSBbXTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFN0b3JlIHRoZSByb290IG5vZGUgb2YgdGhlIGhpZXJhcmNoeSB0cmVlXHJcbiAgICAgKi9cclxuICAgIHNldFJvb3ROb2RlKHJvb3Q6IEhpZXJhcmNoeUJhck5vZGUpIHtcclxuXHJcbiAgICAgICAgLy8gc3RvcmUgdGhlIHJvb3Qgbm9kZVxyXG4gICAgICAgIHRoaXMuX3Jvb3QgPSByb290O1xyXG5cclxuICAgICAgICAvLyBjcmVhdGUgYSBmbGF0IHN0cnVjdHVyZSBvZiBub2Rlc1xyXG4gICAgICAgIHRoaXMuX25vZGVzID0gdGhpcy5nZXROb2RlTGlzdChyb290KTtcclxuXHJcbiAgICAgICAgLy8gZmxhdHRlbiB0aGUgYXJyYXkgLSBiYXNlZCBvbiB0aGUgc2VsZWN0ZWQgbm9kZVxyXG4gICAgICAgIHRoaXMubm9kZXMkLm5leHQodGhpcy5nZXRTZWxlY3RlZENoaWxkcmVuKHJvb3QpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNlbGVjdCBhIG5vZGUuIFRoaXMgY2F1c2VzIGFsbCBub2RlcyB0byBiZVxyXG4gICAgICogZGVzZWxlY3RlZCBhbmQgdGhlIHBhdGggdG8gdGhlIHNlbGVjdGVkIG5vZGVcclxuICAgICAqIHRvIGJlIHNlbGVjdGVkXHJcbiAgICAgKi9cclxuICAgIHNlbGVjdE5vZGUobm9kZTogSGllcmFyY2h5QmFyTm9kZSk6IHZvaWQge1xyXG5cclxuICAgICAgICAvLyBkZXNlbGVjdCBhbGwgbm9kZXNcclxuICAgICAgICB0aGlzLmRlc2VsZWN0QWxsKCk7XHJcblxyXG4gICAgICAgIC8vIGVuc3VyZSB0aGUgY3VycmVudCBub2RlIGlzIHNlbGVjdGVkIGFuZCBpdHMgcGFyZW50c1xyXG4gICAgICAgIHRoaXMuc2VsZWN0KG5vZGUpO1xyXG5cclxuICAgICAgICAvLyBlbWl0IGEgbmV3IG5vZGUgbGlzdCB0byB0cmlnZ2VyIGNoYW5nZSBkZXRlY3Rpb25cclxuICAgICAgICB0aGlzLm5vZGVzJC5uZXh0KHRoaXMuZ2V0U2VsZWN0ZWRDaGlsZHJlbih0aGlzLl9yb290KSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIYW5kbGVzIGdldHRpbmcgY2hpbGRyZW4gd2l0aCBzdXBwb3J0IGZvciBib3RoIGFycmF5cyBhbmQgb2JzZXJ2YWJsZXNcclxuICAgICAqL1xyXG4gICAgZ2V0Q2hpbGRyZW4obm9kZTogSGllcmFyY2h5QmFyTm9kZSk6IE9ic2VydmFibGU8SGllcmFyY2h5QmFyTm9kZUNoaWxkcmVuPiB7XHJcblxyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KG5vZGUuY2hpbGRyZW4pKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBvZih7IGxvYWRpbmc6IGZhbHNlLCBjaGlsZHJlbjogbm9kZS5jaGlsZHJlbiB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGNoaWxkcmVuJDogT2JzZXJ2YWJsZTxIaWVyYXJjaHlCYXJOb2RlW10+ID0gbm9kZS5jaGlsZHJlbjtcclxuXHJcbiAgICAgICAgLy8gaWYgaXQgaXMgYW4gb2JzZXJ2YWJsZSB0aGVuIGhhbmRsZSBsb2FkaW5nXHJcbiAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKChvYnNlcnZlcjogT2JzZXJ2ZXI8SGllcmFyY2h5QmFyTm9kZUNoaWxkcmVuPikgPT4ge1xyXG4gICAgICAgICAgICAvLyBlbWl0IGluaXRpYWwgdmFsdWVcclxuICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dCh7IGxvYWRpbmc6IHRydWUsIGNoaWxkcmVuOiBbXSB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIG5vdyB3YWl0IHVudGlsIHRoZSBjaGlsZHJlbiBvYnNlcnZhYmxlIGNvbXBsZXRlc1xyXG4gICAgICAgICAgICBjaGlsZHJlbiQucGlwZShmaXJzdCgpKS5zdWJzY3JpYmUoY2hpbGRyZW4gPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIHJlcGxhY2UgdGhlIG9ic2VydmFibGUgd2l0aCBhbiBhcnJheSBmb3IgZnV0dXJlIGxvYWRpbmdcclxuICAgICAgICAgICAgICAgIG5vZGUuY2hpbGRyZW4gPSBjaGlsZHJlbjtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyByZWJ1aWxkIHRoZSBub2RlIHRyZWVcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0Um9vdE5vZGUodGhpcy5fcm9vdCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gZW1pdCB0aGUgbGF0ZXN0IHZhbHVlXHJcbiAgICAgICAgICAgICAgICBvYnNlcnZlci5uZXh0KHsgbG9hZGluZzogZmFsc2UsIGNoaWxkcmVuOiBjaGlsZHJlbiB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBjbG9zZSB0aGUgb2JzZXJ2YWJsZSBzdHJlYW1cclxuICAgICAgICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVHJhdmVyc2VzIGFsbCB0aGUgcGFyZW50cyB0byBlbnN1cmUgdGhleSBhcmUgc2VsZWN0ZWRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZWxlY3Qobm9kZTogSGllcmFyY2h5QmFyTm9kZSk6IHZvaWQge1xyXG4gICAgICAgIG5vZGUuc2VsZWN0ZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICBpZiAobm9kZS5wYXJlbnQpIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3Qobm9kZS5wYXJlbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERlc2VsZWN0cyBhbGwgbm9kZXNcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBkZXNlbGVjdEFsbCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9ub2Rlcy5mb3JFYWNoKG5vZGUgPT4gbm9kZS5zZWxlY3RlZCA9IGZhbHNlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgYWxsIHRoZSBub2RlcyBpbiB0aGUgdHJlZSBhcyBhIGZsYXQgYXJyYXkuXHJcbiAgICAgKiBJdCBhbHNvIHN0b3JlcyB0aGUgcGFyZW50IG5vZGUgaW4gYSBwYXJlbnQgcHJvcGVydHlcclxuICAgICAqIG9uIHRoZSBub2RlIGZvciBlYXN5IHRyYXZlcnNhbCBpbiBib3RoIGRpcmVjdGlvbnNcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXROb2RlTGlzdChub2RlOiBIaWVyYXJjaHlCYXJOb2RlKTogSGllcmFyY2h5QmFyTm9kZVtdIHtcclxuXHJcbiAgICAgICAgLy8gaWYgdGhlcmUgYXJlIG5vIGNoaWxkcmVuIHRoZW4gcmV0dXJuIG9ubHkgaXRzZWxmXHJcbiAgICAgICAgaWYgKCFub2RlLmNoaWxkcmVuIHx8IG5vZGUuY2hpbGRyZW4gaW5zdGFuY2VvZiBPYnNlcnZhYmxlIHx8IG5vZGUuY2hpbGRyZW4ubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbbm9kZV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBzdG9yZSB0aGUgcGFyZW50IHByb3BlcnR5XHJcbiAgICAgICAgbm9kZS5jaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IGNoaWxkLnBhcmVudCA9IG5vZGUpO1xyXG5cclxuICAgICAgICAvLyBnZXQgYWxsIGRlc2NlbmRhbnRzIG9mIHRoaXMgbm9kZVxyXG4gICAgICAgIGNvbnN0IGRlc2NlbmRhbnRzID0gbm9kZS5jaGlsZHJlbi5yZWR1Y2U8SGllcmFyY2h5QmFyTm9kZVtdPigobm9kZXMsIGN1cnJlbnQpID0+IFsuLi5ub2RlcywgLi4udGhpcy5nZXROb2RlTGlzdChjdXJyZW50KV0sIFtdKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIFtub2RlLCAuLi5kZXNjZW5kYW50c107XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIGFsbCBzZWxlY3RlZCBub2RlcyBmcm9tIHRoZSBwYXJlbnQgbm9kZS5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRTZWxlY3RlZENoaWxkcmVuKG5vZGU6IEhpZXJhcmNoeUJhck5vZGUpOiBIaWVyYXJjaHlCYXJOb2RlW10ge1xyXG5cclxuICAgICAgICBpZiAobm9kZS5jaGlsZHJlbiBpbnN0YW5jZW9mIE9ic2VydmFibGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFtub2RlXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGdldCB0aGUgY2hpbGRyZW4gLSBhbmQgYWNjb3VudCBmb3Igd2hlbiB0aGVyZSBpcyBub25lXHJcbiAgICAgICAgY29uc3QgY2hpbGRyZW4gPSBub2RlLmNoaWxkcmVuIHx8IFtdO1xyXG5cclxuICAgICAgICAvLyBjaGVjayBpZiBhbnkgY2hpbGQgaXMgc2VsZWN0ZWRcclxuICAgICAgICBjb25zdCBjaGlsZCA9IGNoaWxkcmVuLmZpbmQoX2NoaWxkID0+IF9jaGlsZC5zZWxlY3RlZCk7XHJcblxyXG4gICAgICAgIC8vIHJldHVybiB0aGUgcmVtYWluaW5nIGNoYWluIG9mIHNlbGVjdGVkIGl0ZW1zXHJcbiAgICAgICAgcmV0dXJuIGNoaWxkID8gW25vZGUsIC4uLnRoaXMuZ2V0U2VsZWN0ZWRDaGlsZHJlbihjaGlsZCldIDogW25vZGVdO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEhpZXJhcmNoeUJhck5vZGUge1xyXG4gICAgaWNvbj86IHN0cmluZztcclxuICAgIHRpdGxlOiBzdHJpbmc7XHJcbiAgICBzZWxlY3RlZD86IGJvb2xlYW47XHJcbiAgICBwYXJlbnQ/OiBIaWVyYXJjaHlCYXJOb2RlO1xyXG4gICAgY2hpbGRyZW4/OiBIaWVyYXJjaHlCYXJOb2RlW10gfCBPYnNlcnZhYmxlPEhpZXJhcmNoeUJhck5vZGVbXT47XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSGllcmFyY2h5QmFyTm9kZUNoaWxkcmVuIHtcclxuICAgIGxvYWRpbmc6IGJvb2xlYW47XHJcbiAgICBjaGlsZHJlbjogSGllcmFyY2h5QmFyTm9kZVtdO1xyXG59Il19