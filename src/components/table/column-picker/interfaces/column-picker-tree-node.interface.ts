import { ColumnPickerGroupItem } from '../interfaces/column-picker-group-item.interface';

/** Represents a tree node item. Normalises data for both groups and columns into one format */
export interface ColumnPickerTreeNode {
    /** The name of the column or group. */
    name: string;
    /** The original ColumnPickerGroupItem or string */
    column: ColumnPickerGroupItem | string;
    /**  The level this node exists in the tree hierarchy (top level nodes are 0, grouped nodes are 1). */
    level?: number;
    /**  The names of the columns that are children of this node (if this node is a group). */
    children?: string[];
    /**  A flag to identify group nodes. */
    expandable?: boolean;
    /**  A flag to track the current state of a group node (if this node is a group). */
    isExpanded?: boolean;
}
