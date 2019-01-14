import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Observer } from 'rxjs/Observer';
import { first } from 'rxjs/operators';
import { HierarchyBarNodeChildren } from './interfaces/hierarchy-bar-node-children.interface';
import { HierarchyBarNode } from './interfaces/hierarchy-bar-node.interface';

@Injectable()
export class HierarchyBarService {

    nodes$ = new BehaviorSubject<HierarchyBarNode[]>([]);

    private _root: HierarchyBarNode;
    private _nodes: HierarchyBarNode[] = [];

    /**
     * Store the root node of the hierarchy tree
     */
    setRootNode(root: HierarchyBarNode) {

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
     */
    selectNode(node: HierarchyBarNode): void {

        // deselect all nodes
        this.deselectAll();

        // ensure the current node is selected and its parents
        this.select(node);

        // emit a new node list to trigger change detection
        this.nodes$.next(this.getSelectedChildren(this._root));
    }

    /**
     * Handles getting children with support for both arrays and observables
     */
    getChildren(node: HierarchyBarNode): Observable<HierarchyBarNodeChildren> {

        if (Array.isArray(node.children)) {
            return of({ loading: false, children: node.children });
        }

        const children$: Observable<HierarchyBarNode[]> = node.children;

        // if it is an observable then handle loading
        return Observable.create((observer: Observer<HierarchyBarNodeChildren>) => {
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
     */
    private select(node: HierarchyBarNode): void {
        node.selected = true;

        if (node.parent) {
            this.select(node.parent);
        }
    }

    /**
     * Deselects all nodes
     */
    private deselectAll(): void {
        this._nodes.forEach(node => node.selected = false);
    }

    /**
     * Gets all the nodes in the tree as a flat array.
     * It also stores the parent node in a parent property
     * on the node for easy traversal in both directions
     */
    private getNodeList(node: HierarchyBarNode): HierarchyBarNode[] {

        // if there are no children then return only itself
        if (!node.children || node.children instanceof Observable || node.children.length === 0) {
            return [node];
        }

        // store the parent property
        node.children.forEach(child => child.parent = node);

        // get all descendants of this node
        const descendants = node.children.reduce<HierarchyBarNode[]>((nodes, current) => [...nodes, ...this.getNodeList(current)], []);

        return [node, ...descendants];
    }

    /**
     * Gets all selected nodes from the parent node.
     */
    private getSelectedChildren(node: HierarchyBarNode): HierarchyBarNode[] {

        if (node.children instanceof Observable) {
            return [node];
        }

        // get the children - and account for when there is none
        const children = node.children || [];

        // check if any child is selected
        const child = children.find(_child => _child.selected);

        // return the remaining chain of selected items
        return child ? [node, ...this.getSelectedChildren(child)] : [node];
    }
}