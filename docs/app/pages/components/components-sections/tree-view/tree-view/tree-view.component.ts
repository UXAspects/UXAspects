import { Component } from '@angular/core';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { TreeModel, TreeNode, TreeComponent } from 'angular5-tree-component';

@Component({
    selector: 'uxd-components-tree-view',
    templateUrl: './tree-view.component.html',
    styleUrls: ['./tree-view.component.less']
})
@DocumentationSectionComponent('ComponentsTreeViewComponent')
export class ComponentsTreeViewComponent extends BaseDocumentationSection {

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

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}

export interface TreeViewExampleNode {
    id?: number;
    name: string;
    children?: TreeViewExampleNode[];
}