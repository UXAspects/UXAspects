import {
  TreeComponent,
  TreeNode,
  TreeNodeChildrenComponent,
  TreeNodeExpanderComponent,
} from '@ali-hm/angular-tree-component';
import { Component } from '@angular/core';
import {
  AccessibilityModule,
  AlertModule,
  FocusIfModule,
  IconModule,
  TabsetModule,
} from '@ux-aspects/ux-aspects';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { SnippetComponent } from '../../../../../components/snippet/snippet.component';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';

@Component({
  selector: 'uxd-components-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.less'],
  imports: [
    AlertModule,
    TreeComponent,
    AccessibilityModule,
    FocusIfModule,
    TreeNodeExpanderComponent,
    IconModule,
    TreeNodeChildrenComponent,
    TabsetModule,
    SnippetComponent,
  ],
})
@DocumentationSectionComponent('ComponentsTreeViewComponent')
export class ComponentsTreeViewComponent extends BaseDocumentationSection {
  nodes: TreeViewExampleNode[] = [
    {
      id: 1,
      name: 'Documents',
      children: [
        {
          id: 12,
          name: 'Profiles',
          children: [
            {
              name: 'Alcazar',
            },
            {
              name: 'Citadel',
            },
            {
              name: 'Donjon',
            },
          ],
        },
        {
          id: 11,
          name: 'Word files',
          children: [
            {
              id: 111,
              name: 'Accounts',
              children: [
                {
                  name: 'Castle',
                },
                {
                  name: 'Estate',
                },
                {
                  name: 'Manor',
                },
                {
                  name: 'Mansion',
                },
                {
                  name: 'Villa',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 2,
      name: 'Emails',
      children: [
        {
          id: 21,
          name: 'Inbox',
          children: [{ name: 'Invoice' }, { name: 'Order Confirmation' }],
        },
        {
          id: 22,
          name: 'Outbox',
          children: [{ name: 'Customer Support' }],
        },
      ],
    },
    {
      id: 3,
      name: 'Pictures',
      children: [{ name: 'IMG_001.jpg' }, { name: 'IMG_002.jpg' }, { name: 'IMG_003.jpg' }],
    },
  ];

  focused: TreeNode;

  constructor() {
    super(
      import.meta.webpackContext('./snippets/', {
        recursive: false,
        regExp: /\.(html|css|js|ts)$/,
      })
    );
  }

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
  isExpanded?: boolean;
}
