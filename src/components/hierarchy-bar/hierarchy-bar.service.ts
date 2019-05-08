import { Injectable, TemplateRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Observer } from 'rxjs/Observer';
import { first } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { OverlayTrigger } from '../tooltip/index';
import { HierarchyBarNodeChildren } from './interfaces/hierarchy-bar-node-children.interface';
import { HierarchyBarIconContext } from './interfaces/hierarchy-bar-node-icon-context.interface';
import { HierarchyBarNode } from './interfaces/hierarchy-bar-node.interface';

@Injectable()
export class HierarchyBarService {

    /** Define the list of selected nodes */
    nodes$ = new BehaviorSubject<HierarchyBarNode[]>([]);

    /** Define a custom loading indicator */
    loadingIndicator: TemplateRef<any>;

    /** Define a custom overflow template */
    overflowTemplate: TemplateRef<any>;

    /** Define the events that show the popover when interacting with the arrows */
    popoverShowTriggers: OverlayTrigger[] = ['click'];

    /** Define the events that hide the popover when interacting with the arrows */
    popoverHideTriggers: OverlayTrigger[] = ['click', 'clickoutside', 'escape'];

    /** Emit the selected node when it changes */
    selection$ = new Subject<HierarchyBarNode>();

    /** Define the aria label for the show siblings popover button */
    showSiblingsAriaLabel: string = 'Show Siblings';

    /** Allow a custom icon template to be specified */
    icon: TemplateRef<HierarchyBarIconContext>;

    /** Store the root node */
    private _root: HierarchyBarNode;

    /** Store nodes as a flattened list */
    private _nodes: HierarchyBarNode[] = [];

    /**
     * Store the root node of the hierarchy tree
     */
    setRootNode(root: HierarchyBarNode) {

        // if the node is null or undefined then do nothing
        if (!root) {
            return;
        }

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

        // if the node is undefined then do nothing
        if (!node) {
            return;
        }

        // ensure the current node is selected and its parents
        this.select(node);

        // emit a new node list to trigger change detection
        this.nodes$.next(this.getSelectedChildren(this._root));

        // emit the new selection
        this.selection$.next(node);
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
     * Utility function to get the sibling nodes, taking into account that
     * a node may be a root node and may not have a parent.
     */
    getSiblings(node: HierarchyBarNode): Observable<HierarchyBarNodeChildren> {
        return node.parent ? this.getChildren(node.parent) : of({ loading: false, children: [] });
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