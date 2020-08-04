import { Injectable } from '@angular/core';
import { ColumnPickerGroupItem, ColumnPickerTreeNode, ColumnPickerGroup } from './column-picker.component';

@Injectable()
export class ColumnPickerService {

    getDeselectedColumns(
        deselected: (string | ColumnPickerGroupItem)[],
        sort: (a: ColumnPickerGroupItem, b: ColumnPickerGroupItem) => number
    ): ColumnPickerGroupItem[] {

        let columns: ColumnPickerGroupItem[] = deselected.map(column => ({
            name: this.isColumnPickerGroupItem(column) ? column.name : column,
            group: this.isColumnPickerGroupItem(column) ? column.group : undefined
        }));

        if (sort) {
            columns.sort(sort);
        } else {
            const grouped = columns.filter(column => this.isColumnPickerGroupItem(column) && column.group !== undefined);
            columns = [
                ...grouped,
                ...columns.filter(column => grouped.indexOf(column) === -1)
            ];
        }

        return columns;
    }

    createTreeData(columns: ColumnPickerGroupItem[], deselectedGroups: ColumnPickerGroup[]): ColumnPickerTreeNode[] {
        const treeData: ColumnPickerTreeNode[] = [];
        const groupedColumns: ColumnPickerGroupItem[] = columns.filter(column => this.isColumnPickerGroupItem(column) && column.group !== undefined);

        columns.forEach((column: ColumnPickerGroupItem) => {
            if (groupedColumns.indexOf(column) !== -1) {
                const groupNode = this.createOrFindGroupNode(column, treeData, deselectedGroups);
                groupNode.children.push(column.name);
                this.createTreeNode(column, treeData, 1);
            } else {
                this.createTreeNode(column, treeData, 0);
            }
        });

        return treeData;
    }

    private createOrFindGroupNode(column: ColumnPickerGroupItem, treeData: ColumnPickerTreeNode[], groups: ColumnPickerGroup[]): ColumnPickerTreeNode {
        const groupNode = treeData.find(node => node.name === column.group && node.expandable);
        if (groupNode) {
            return groupNode;
        } else {
            treeData.push({
                name: column.group,
                level: 0,
                expandable: true,
                isExpanded: !!groups.find(group => group.name === column.group)?.expanded,
                column,
                children: []
            });

            return treeData[treeData.length - 1];
        }
    }

    private createTreeNode(column: ColumnPickerGroupItem, treeData: ColumnPickerTreeNode[], level: number): void {
        treeData.push({
            name: column.name,
            level,
            expandable: false,
            column
        });
    }

    private isColumnPickerGroupItem(column: string | ColumnPickerGroupItem): column is ColumnPickerGroupItem {
        return typeof column === 'object';
    }
}
