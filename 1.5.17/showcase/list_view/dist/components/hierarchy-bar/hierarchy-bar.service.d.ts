import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
export declare class HierarchyBarService {
    nodes$: BehaviorSubject<HierarchyBarNode[]>;
    private _root;
    private _nodes;
    /**
     * Store the root node of the hierarchy tree
     */
    setRootNode(root: HierarchyBarNode): void;
    /**
     * Select a node. This causes all nodes to be
     * deselected and the path to the selected node
     * to be selected
     */
    selectNode(node: HierarchyBarNode): void;
    /**
     * Handles getting children with support for both arrays and observables
     */
    getChildren(node: HierarchyBarNode): Observable<HierarchyBarNodeChildren>;
    /**
     * Traverses all the parents to ensure they are selected
     */
    private select(node);
    /**
     * Deselects all nodes
     */
    private deselectAll();
    /**
     * Gets all the nodes in the tree as a flat array.
     * It also stores the parent node in a parent property
     * on the node for easy traversal in both directions
     */
    private getNodeList(node);
    /**
     * Gets all selected nodes from the parent node.
     */
    private getSelectedChildren(node);
}
export interface HierarchyBarNode {
    icon?: string;
    title: string;
    selected?: boolean;
    parent?: HierarchyBarNode;
    children?: HierarchyBarNode[] | Observable<HierarchyBarNode[]>;
}
export interface HierarchyBarNodeChildren {
    loading: boolean;
    children: HierarchyBarNode[];
}
