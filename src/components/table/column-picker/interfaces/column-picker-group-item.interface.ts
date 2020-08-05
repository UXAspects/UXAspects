/** An interface representing a grouped item */
export interface ColumnPickerGroupItem {
    /**  The name of the group that this column belongs to. */
    group?: string;
    /**  The name of the column. */
    name: string;
}

export function isColumnPickerGroupItem(column: string | ColumnPickerGroupItem): column is ColumnPickerGroupItem {
    return (column as ColumnPickerGroupItem).name !== undefined;
}
