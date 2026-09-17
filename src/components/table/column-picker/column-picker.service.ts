///
/// Copyright 2015-2026 Micro Focus or one of its affiliates.
///
/// Licensed under the Apache License, Version 2.0 (the "License");
/// you may not use this file except in compliance with the License.
/// You may obtain a copy of the License at
///
///      http://www.apache.org/licenses/LICENSE-2.0
///
/// Unless required by applicable law or agreed to in writing, software
/// distributed under the License is distributed on an "AS IS" BASIS,
/// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
/// See the License for the specific language governing permissions and
/// limitations under the License.
///

import { Injectable } from '@angular/core';
import { ColumnPickerGroup } from './column-picker.component';
import {
  ColumnPickerGroupItem,
  isColumnPickerGroupItem,
} from './interfaces/column-picker-group-item.interface';
import { ColumnPickerTreeNode } from './interfaces/column-picker-tree-node.interface';

@Injectable()
export class ColumnPickerService {
  groups: ColumnPickerGroup[];

  getDeselectedColumnsInPresentationOrder(
    deselected: (string | ColumnPickerGroupItem)[],
    sort: (a: ColumnPickerGroupItem, b: ColumnPickerGroupItem) => number
  ): (string | ColumnPickerGroupItem)[] {
    let columns: (string | ColumnPickerGroupItem)[];

    if (sort) {
      const normalizedColumns = this.normalizeColumns(deselected);
      normalizedColumns.sort(sort);
      columns = this.denormalizeColumns(normalizedColumns, deselected);
    } else {
      const grouped = deselected.filter(
        column => isColumnPickerGroupItem(column) && column.group !== undefined
      );
      columns = [...grouped, ...deselected.filter(column => grouped.indexOf(column) === -1)];
    }

    return columns;
  }

  createTreeData(columns: (string | ColumnPickerGroupItem)[]): ColumnPickerTreeNode[] {
    const treeData: ColumnPickerTreeNode[] = [];
    const groupedColumns = columns.filter(
      column => isColumnPickerGroupItem(column) && column.group !== undefined
    );

    columns.forEach((column: string | ColumnPickerGroupItem) => {
      if (groupedColumns.indexOf(column) !== -1 && isColumnPickerGroupItem(column)) {
        const groupNode = this.createOrFindGroupNode(column, treeData);
        groupNode.children.push(column.name);
        this.createColumnTreeNode(column, treeData, 1);
      } else if (!isColumnPickerGroupItem(column)) {
        this.createColumnTreeNode(column, treeData, 0);
      }
    });

    return treeData;
  }

  private normalizeColumns(columns: (string | ColumnPickerGroupItem)[]): ColumnPickerGroupItem[] {
    return columns.map(column => ({
      name: isColumnPickerGroupItem(column) ? column.name : column,
      group: isColumnPickerGroupItem(column) ? column.group : undefined,
    }));
  }

  private denormalizeColumns(
    normalizedColumns: ColumnPickerGroupItem[],
    originalColumns: (string | ColumnPickerGroupItem)[]
  ): (string | ColumnPickerGroupItem)[] {
    return normalizedColumns.map(normalized => {
      const original = originalColumns.find(originalColumn => {
        if (isColumnPickerGroupItem(originalColumn)) {
          return (
            originalColumn.group === normalized.group && originalColumn.name === normalized.name
          );
        }
        return false;
      });
      // Anything not found in the original array must have been normalized from a string
      return original ? original : normalized.name;
    });
  }

  private createOrFindGroupNode(
    column: ColumnPickerGroupItem,
    treeData: ColumnPickerTreeNode[]
  ): ColumnPickerTreeNode {
    let groupNode = treeData.find(node => node.name === column.group && node.expandable);
    if (!groupNode) {
      groupNode = this.createGroupTreeNode(column, treeData);
    }

    return groupNode;
  }

  private createGroupTreeNode(
    column: ColumnPickerGroupItem,
    treeData: ColumnPickerTreeNode[]
  ): ColumnPickerTreeNode {
    treeData.push({
      name: column.group,
      level: 0,
      expandable: true,
      isExpanded: this.isGroupTreeNodeExpanded(column.group),
      column,
      children: [],
    });

    return treeData[treeData.length - 1];
  }

  private createColumnTreeNode(
    column: string | ColumnPickerGroupItem,
    treeData: ColumnPickerTreeNode[],
    level: number
  ): void {
    treeData.push({
      name: isColumnPickerGroupItem(column) ? column.name : column,
      level,
      expandable: false,
      column,
    });
  }

  private isGroupTreeNodeExpanded(groupName: string): boolean {
    const groupTreeNode = this.groups.find(group => group.name === groupName);
    return groupTreeNode ? groupTreeNode.expanded : false;
  }
}
