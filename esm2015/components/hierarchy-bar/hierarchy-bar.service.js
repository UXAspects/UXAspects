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
    { type: Injectable }
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGllcmFyY2h5LWJhci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvaGllcmFyY2h5LWJhci9oaWVyYXJjaHktYmFyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUU3QyxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDeEMsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBR3ZDLE1BQU07O3NCQUVPLElBQUksZUFBZSxDQUFxQixFQUFFLENBQUM7c0JBR2YsRUFBRTs7Ozs7OztJQUt2QyxXQUFXLENBQUMsSUFBc0I7O1FBRzlCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDOztRQUdsQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7O1FBR3JDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0tBQ3BEOzs7Ozs7OztJQU9ELFVBQVUsQ0FBQyxJQUFzQjs7UUFHN0IsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDOztRQUduQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDOztRQUdsQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7S0FDMUQ7Ozs7OztJQUtELFdBQVcsQ0FBQyxJQUFzQjtRQUU5QixFQUFFLENBQUMs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Q0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDOzs7O1lBakkxRSxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzL0JlaGF2aW9yU3ViamVjdCc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xyXG5pbXBvcnQgeyBPYnNlcnZlciB9IGZyb20gJ3J4anMvT2JzZXJ2ZXInO1xyXG5pbXBvcnQgeyBvZiB9IGZyb20gJ3J4anMvb2JzZXJ2YWJsZS9vZic7XHJcbmltcG9ydCB7IGZpcnN0IH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgSGllcmFyY2h5QmFyU2VydmljZSB7XHJcblxyXG4gICAgbm9kZXMkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxIaWVyYXJjaHlCYXJOb2RlW10+KFtdKTtcclxuXHJcbiAgICBwcml2YXRlIF9yb290OiBIaWVyYXJjaHlCYXJOb2RlO1xyXG4gICAgcHJpdmF0ZSBfbm9kZXM6IEhpZXJhcmNoeUJhck5vZGVbXSA9IFtdO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU3RvcmUgdGhlIHJvb3Qgbm9kZSBvZiB0aGUgaGllcmFyY2h5IHRyZWVcclxuICAgICAqL1xyXG4gICAgc2V0Um9vdE5vZGUocm9vdDogSGllcmFyY2h5QmFyTm9kZSkge1xyXG5cclxuICAgICAgICAvLyBzdG9yZSB0aGUgcm9vdCBub2RlXHJcbiAgICAgICAgdGhpcy5fcm9vdCA9IHJvb3Q7XHJcblxyXG4gICAgICAgIC8vIGNyZWF0ZSBhIGZsYXQgc3RydWN0dXJlIG9mIG5vZGVzXHJcbiAgICAgICAgdGhpcy5fbm9kZXMgPSB0aGlzLmdldE5vZGVMaXN0KHJvb3QpO1xyXG5cclxuICAgICAgICAvLyBmbGF0dGVuIHRoZSBhcnJheSAtIGJhc2VkIG9uIHRoZSBzZWxlY3RlZCBub2RlXHJcbiAgICAgICAgdGhpcy5ub2RlcyQubmV4dCh0aGlzLmdldFNlbGVjdGVkQ2hpbGRyZW4ocm9vdCkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2VsZWN0IGEgbm9kZS4gVGhpcyBjYXVzZXMgYWxsIG5vZGVzIHRvIGJlXHJcbiAgICAgKiBkZXNlbGVjdGVkIGFuZCB0aGUgcGF0aCB0byB0aGUgc2VsZWN0ZWQgbm9kZVxyXG4gICAgICogdG8gYmUgc2VsZWN0ZWRcclxuICAgICAqL1xyXG4gICAgc2VsZWN0Tm9kZShub2RlOiBIaWVyYXJjaHlCYXJOb2RlKTogdm9pZCB7XHJcblxyXG4gICAgICAgIC8vIGRlc2VsZWN0IGFsbCBub2Rlc1xyXG4gICAgICAgIHRoaXMuZGVzZWxlY3RBbGwoKTtcclxuXHJcbiAgICAgICAgLy8gZW5zdXJlIHRoZSBjdXJyZW50IG5vZGUgaXMgc2VsZWN0ZWQgYW5kIGl0cyBwYXJlbnRzXHJcbiAgICAgICAgdGhpcy5zZWxlY3Qobm9kZSk7XHJcblxyXG4gICAgICAgIC8vIGVtaXQgYSBuZXcgbm9kZSBsaXN0IHRvIHRyaWdnZXIgY2hhbmdlIGRldGVjdGlvblxyXG4gICAgICAgIHRoaXMubm9kZXMkLm5leHQodGhpcy5nZXRTZWxlY3RlZENoaWxkcmVuKHRoaXMuX3Jvb3QpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZXMgZ2V0dGluZyBjaGlsZHJlbiB3aXRoIHN1cHBvcnQgZm9yIGJvdGggYXJyYXlzIGFuZCBvYnNlcnZhYmxlc1xyXG4gICAgICovXHJcbiAgICBnZXRDaGlsZHJlbihub2RlOiBIaWVyYXJjaHlCYXJOb2RlKTogT2JzZXJ2YWJsZTxIaWVyYXJjaHlCYXJOb2RlQ2hpbGRyZW4+IHtcclxuXHJcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkobm9kZS5jaGlsZHJlbikpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG9mKHsgbG9hZGluZzogZmFsc2UsIGNoaWxkcmVuOiBub2RlLmNoaWxkcmVuIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgY2hpbGRyZW4kOiBPYnNlcnZhYmxlPEhpZXJhcmNoeUJhck5vZGVbXT4gPSBub2RlLmNoaWxkcmVuO1xyXG5cclxuICAgICAgICAvLyBpZiBpdCBpcyBhbiBvYnNlcnZhYmxlIHRoZW4gaGFuZGxlIGxvYWRpbmdcclxuICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUoKG9ic2VydmVyOiBPYnNlcnZlcjxIaWVyYXJjaHlCYXJOb2RlQ2hpbGRyZW4+KSA9PiB7XHJcbiAgICAgICAgICAgIC8vIGVtaXQgaW5pdGlhbCB2YWx1ZVxyXG4gICAgICAgICAgICBvYnNlcnZlci5uZXh0KHsgbG9hZGluZzogdHJ1ZSwgY2hpbGRyZW46IFtdIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gbm93IHdhaXQgdW50aWwgdGhlIGNoaWxkcmVuIG9ic2VydmFibGUgY29tcGxldGVzXHJcbiAgICAgICAgICAgIGNoaWxkcmVuJC5waXBlKGZpcnN0KCkpLnN1YnNjcmliZShjaGlsZHJlbiA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gcmVwbGFjZSB0aGUgb2JzZXJ2YWJsZSB3aXRoIGFuIGFycmF5IGZvciBmdXR1cmUgbG9hZGluZ1xyXG4gICAgICAgICAgICAgICAgbm9kZS5jaGlsZHJlbiA9IGNoaWxkcmVuO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIHJlYnVpbGQgdGhlIG5vZGUgdHJlZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRSb290Tm9kZSh0aGlzLl9yb290KTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBlbWl0IHRoZSBsYXRlc3QgdmFsdWVcclxuICAgICAgICAgICAgICAgIG9ic2VydmVyLm5leHQoeyBsb2FkaW5nOiBmYWxzZSwgY2hpbGRyZW46IGNoaWxkcmVuIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGNsb3NlIHRoZSBvYnNlcnZhYmxlIHN0cmVhbVxyXG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUcmF2ZXJzZXMgYWxsIHRoZSBwYXJlbnRzIHRvIGVuc3VyZSB0aGV5IGFyZSBzZWxlY3RlZFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNlbGVjdChub2RlOiBIaWVyYXJjaHlCYXJOb2RlKTogdm9pZCB7XHJcbiAgICAgICAgbm9kZS5zZWxlY3RlZCA9IHRydWU7XHJcblxyXG4gICAgICAgIGlmIChub2RlLnBhcmVudCkge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdChub2RlLnBhcmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVzZWxlY3RzIGFsbCBub2Rlc1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGRlc2VsZWN0QWxsKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX25vZGVzLmZvckVhY2gobm9kZSA9PiBub2RlLnNlbGVjdGVkID0gZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBhbGwgdGhlIG5vZGVzIGluIHRoZSB0cmVlIGFzIGEgZmxhdCBhcnJheS5cclxuICAgICAqIEl0IGFsc28gc3RvcmVzIHRoZSBwYXJlbnQgbm9kZSBpbiBhIHBhcmVudCBwcm9wZXJ0eVxyXG4gICAgICogb24gdGhlIG5vZGUgZm9yIGVhc3kgdHJhdmVyc2FsIGluIGJvdGggZGlyZWN0aW9uc1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldE5vZGVMaXN0KG5vZGU6IEhpZXJhcmNoeUJhck5vZGUpOiBIaWVyYXJjaHlCYXJOb2RlW10ge1xyXG5cclxuICAgICAgICAvLyBpZiB0aGVyZSBhcmUgbm8gY2hpbGRyZW4gdGhlbiByZXR1cm4gb25seSBpdHNlbGZcclxuICAgICAgICBpZiAoIW5vZGUuY2hpbGRyZW4gfHwgbm9kZS5jaGlsZHJlbiBpbnN0YW5jZW9mIE9ic2VydmFibGUgfHwgbm9kZS5jaGlsZHJlbi5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIFtub2RlXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHN0b3JlIHRoZSBwYXJlbnQgcHJvcGVydHlcclxuICAgICAgICBub2RlLmNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4gY2hpbGQucGFyZW50ID0gbm9kZSk7XHJcblxyXG4gICAgICAgIC8vIGdldCBhbGwgZGVzY2VuZGFudHMgb2YgdGhpcyBub2RlXHJcbiAgICAgICAgY29uc3QgZGVzY2VuZGFudHMgPSBub2RlLmNoaWxkcmVuLnJlZHVjZTxIaWVyYXJjaHlCYXJOb2RlW10+KChub2RlcywgY3VycmVudCkgPT4gWy4uLm5vZGVzLCAuLi50aGlzLmdldE5vZGVMaXN0KGN1cnJlbnQpXSwgW10pO1xyXG5cclxuICAgICAgICByZXR1cm4gW25vZGUsIC4uLmRlc2NlbmRhbnRzXTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgYWxsIHNlbGVjdGVkIG5vZGVzIGZyb20gdGhlIHBhcmVudCBub2RlLlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFNlbGVjdGVkQ2hpbGRyZW4obm9kZTogSGllcmFyY2h5QmFyTm9kZSk6IEhpZXJhcmNoeUJhck5vZGVbXSB7XHJcblxyXG4gICAgICAgIGlmIChub2RlLmNoaWxkcmVuIGluc3RhbmNlb2YgT2JzZXJ2YWJsZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gW25vZGVdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gZ2V0IHRoZSBjaGlsZHJlbiAtIGFuZCBhY2NvdW50IGZvciB3aGVuIHRoZXJlIGlzIG5vbmVcclxuICAgICAgICBjb25zdCBjaGlsZHJlbiA9IG5vZGUuY2hpbGRyZW4gfHwgW107XHJcblxyXG4gICAgICAgIC8vIGNoZWNrIGlmIGFueSBjaGlsZCBpcyBzZWxlY3RlZFxyXG4gICAgICAgIGNvbnN0IGNoaWxkID0gY2hpbGRyZW4uZmluZChfY2hpbGQgPT4gX2NoaWxkLnNlbGVjdGVkKTtcclxuXHJcbiAgICAgICAgLy8gcmV0dXJuIHRoZSByZW1haW5pbmcgY2hhaW4gb2Ygc2VsZWN0ZWQgaXRlbXNcclxuICAgICAgICByZXR1cm4gY2hpbGQgPyBbbm9kZSwgLi4udGhpcy5nZXRTZWxlY3RlZENoaWxkcmVuKGNoaWxkKV0gOiBbbm9kZV07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSGllcmFyY2h5QmFyTm9kZSB7XHJcbiAgICBpY29uPzogc3RyaW5nO1xyXG4gICAgdGl0bGU6IHN0cmluZztcclxuICAgIHNlbGVjdGVkPzogYm9vbGVhbjtcclxuICAgIHBhcmVudD86IEhpZXJhcmNoeUJhck5vZGU7XHJcbiAgICBjaGlsZHJlbj86IEhpZXJhcmNoeUJhck5vZGVbXSB8IE9ic2VydmFibGU8SGllcmFyY2h5QmFyTm9kZVtdPjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBIaWVyYXJjaHlCYXJOb2RlQ2hpbGRyZW4ge1xyXG4gICAgbG9hZGluZzogYm9vbGVhbjtcclxuICAgIGNoaWxkcmVuOiBIaWVyYXJjaHlCYXJOb2RlW107XHJcbn0iXX0=