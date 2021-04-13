import { Component } from '@angular/core';
import { TreeNode } from '@circlon/angular-tree-component';

@Component({
    selector: 'app',
    templateUrl: './app.component.html'
})
export class AppComponent {

    nodes: TreeViewExampleNode[] = [{
        id: 1,
        name: 'Documents',
        children: [{
            id: 12,
            name: 'Profiles',
            children: [{
                name: 'Alcazar'
            }, {
                name: 'Citadel'
            }, {
                name: 'Donjon'
            }]
        }, {
            id: 11,
            name: 'Word files',
            children: [{
                id: 111,
                name: 'Accounts',
                children: [{
                    name: 'Castle'
                }, {
                    name: 'Estate'
                }, {
                    name: 'Manor'
                }, {
                    name: 'Mansion'
                }, {
                    name: 'Villa'
                }]
            }]
        }]
    }, {
        id: 2,
        name: 'Emails',
        children: [{
            id: 21,
            name: 'Inbox',
            children: [
                { name: 'Invoice' },
                { name: 'Order Confirmation' }
            ]
        }, {
            id: 22,
            name: 'Outbox',
            children: [
                { name: 'Customer Support' }
            ]
        }]
    }, {
        id: 3,
        name: 'Pictures',
        children: [
            { name: 'IMG_001.jpg' },
            { name: 'IMG_002.jpg' },
            { name: 'IMG_003.jpg' }
        ]
    }];

    focused: TreeNode;

    /**
     * If tree view is tabbed to, focus the node
     */
    focus(node: TreeNode): void {
        node.focus();
        node.treeModel.setFocus(true);
    }

    /** Ensure the blur state is updated consistently */
    blur(node: TreeNode): void {
        if (this.focused === node) {
            node.blur();
            node.treeModel.setFocus(false);
        }
    }

    getIcon(node: TreeNode): string {
        if (node.hasChildren && !node.isExpanded) {
            return 'folder';
        }
        if (node.hasChildren && node.isExpanded) {
            return 'folder-open';
        }

        if (!node.hasChildren) {
            return 'document';
        }
    }
}

export interface TreeViewExampleNode {
    id?: number;
    name: string;
    children?: TreeViewExampleNode[];
}
