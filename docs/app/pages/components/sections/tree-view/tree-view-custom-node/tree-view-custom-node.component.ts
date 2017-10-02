import { Component } from '@angular/core';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { TreeModel, TreeNode, TreeComponent } from 'angular-tree-component';
import { TreeViewService } from './tree-view-custom-node.service';

@Component({
    selector: 'uxd-components-tree-view-custom-node',
    templateUrl: './tree-view-custom-node.component.html',
    styleUrls: ['./tree-view-custom-node.component.less']
})
@DocumentationSectionComponent('ComponentsTreeViewCustomNodeComponent')
export class ComponentsTreeViewCustomNodeComponent extends BaseDocumentationSection {

    nodes: TreeViewExampleNode[] = [
        {
            name: 'Documents',
            hasChildren: true,
            source: this._treeViewService.getDocuments
        },
        {
            name: 'Pictures',
            hasChildren: true,
            source: this._treeViewService.getPictures
        }
    ];

    options = {
        getChildren: (node: TreeNode) => node.data.source ? node.data.source() : [],
    };

    constructor(private _treeViewService: TreeViewService) {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }

    /**
     * When a node is checked the state of it's children should be updated (if there are any)
     * and the state of all parent nodes should also be updated (if there are any).
     */
    setChecked(node: TreeNode, checked: boolean = node.data.checked) {

        // if the value of the node has not changed then do nothing
        if (node.data.checked === checked) {
            return;
        }

        this.setChildrenState(node, checked);
        this.setParentNodeState(node.realParent);
    }

    /**
     * Update the checked state of a nodes children, eg.
     * If the node is checked then all children should also be checked
     * If the node is unchecked then all children should be unchecked
     */
    setChildrenState(node: TreeNode, checked: boolean = node.data.checked) {
        node.data.checked = checked;

        if (node.children) {
            node.children.forEach((child) => this.setChildrenState(child, checked));
        }
    }

    /**
     * Update a nodes checked state to reflect the state of it's children, eg.
     * If all child nodes are checked then the parent should be selected
     * If all child nodes are unchecked then the parent node should also be deselected
     * If some nodes are checked then the checkbox should show an indeterminate state
     */
    setParentNodeState(node: TreeNode) {

        if (!node) {
            return; 
        }

        let allChildrenChecked = node.children.every(child => child.data.checked);
        let noChildrenChecked = node.children.every(child => !child.data.checked);

        if (allChildrenChecked) {
            node.data.checked = true;
        } else if (noChildrenChecked) {
            node.data.checked = false;
        } else {
            node.data.checked = -1;
        }

        this.setParentNodeState(node.parent);
    }

    /**
     * When a node lazy loads it's children, update their checkboxes to reflect 
     * the current state of the parent node.
     */
    onChildrenLoaded(node: TreeNode): void {
        this.setChildrenState(node);
    }

}

export interface TreeViewExampleNode {
    name: string;
    children?: TreeViewExampleNode[];
    hasChildren?: boolean;
    source?: Function;
}