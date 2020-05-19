import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ArrayDataSource } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnChanges, Output, QueryList, SimpleChanges, TemplateRef, ViewChildren } from '@angular/core';

@Component({
    selector: 'ux-column-picker',
    templateUrl: './column-picker.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColumnPickerComponent implements OnChanges {

    /** Define a list of all selected columns. */
    @Input() selected: ReadonlyArray<string> = [];

    /** Define a list of columns that are always selected. The columns cannot be moved or reordered. */
    @Input() locked: ReadonlyArray<string> = [];

    /** Define a list of columns that are not selected or locked. All columns must have unique names, including columns in different groups. */
    @Input() deselected: ReadonlyArray<string | ColumnPickerGroupItem> = [];

    /** Define a custom selected title template. */
    @Input() selectedTitleTemplate: TemplateRef<void>;

    /** Define a custom deselected title template. */
    @Input() deselectedTitleTemplate: TemplateRef<void>;

    /** Define a custom template for deselected items. */
    @Input() deselectedTemplate: TemplateRef<string>;

    /** Define a custom template for selected items. */
    @Input() selectedTemplate: TemplateRef<string>;

    /** Define a custom template for locked items. */
    @Input() lockedTemplate: TemplateRef<string>;

    /** Define a custom template for the action buttons columns. */
    @Input() actionsTemplate: TemplateRef<ColumnPickerActionsContext>;

    /** Define a function to get the aria label of reorderable items in the selected column. */
    @Input() selectedAriaLabel: (column: string, index: number) => string = this.getDefaultSelectedAriaLabel;

    /** Define a function to get the aria label of a group in the deselected list. */
    @Input() deselectedGroupAriaLabel: (column: string, isExpanded: boolean) => string = this.getDefaultDeselectedGroupAriaLabel;

    /** Define a function that returns a column move announcement. */
    @Input() columnMovedAnnouncement: (column: string, delta: number) => string = this.getColumnMovedAnnouncement;

    /** Define settings for the grouped deselected items. */
    @Input() groups: ReadonlyArray<ColumnPickerGroup> = [];

    /** Emits when the selected items change or the order of the selected items change. */
    @Output() selectedChange = new EventEmitter<ReadonlyArray<string>>();

    /** Emits when the deselected items change. */
    @Output() deselectedChange = new EventEmitter<ReadonlyArray<string | ColumnPickerGroupItem>>();

    /** The Nested tree control used for the deselect tree */
    _treeControl: FlatTreeControl<ColumnPickerTreeNode> = new FlatTreeControl<ColumnPickerTreeNode>(
        node => node.level,
        node => node.expandable
    );

    /** A tree-friendly representation of the deselected data */
    _treeData: ColumnPickerTreeNode[];

    /** Data source observable bound to the tree control */
    _treeDataSource: ArrayDataSource<ColumnPickerTreeNode>;

    /** The remaining selectable columns in the deselected list */
    _availableDeselectedColumns: number = 0;

    /** An array of items that are currently selected in the left column. */
    _deselectedSelection: ReadonlyArray<string | ColumnPickerGroupItem> = [];

    /** An array of items that are currently selected in the right column. */
    _selectedSelection: ReadonlyArray<string | ColumnPickerGroupItem> = [];

    /** Cache selection during reordering */
    private _selection: ReadonlyArray<string | ColumnPickerGroupItem> = [];

    /** Get the elements for the selected items */
    @ViewChildren('selectedColumn') selectedElements: QueryList<ElementRef>;

    constructor(
        /** Access the LiveAnnounce to provide accessibility on reordering */
        private readonly _liveAnnouncer: LiveAnnouncer,
        /** We are using OnPush change detection so we must manually trigger CD */
        private readonly _changeDetectorRef: ChangeDetectorRef
    ) { }

    ngOnChanges(changes: SimpleChanges): void {
        // recreate tree when deselected changes
        if (changes.deselected && changes.deselected.currentValue !== changes.deselected.previousValue) {
            this.rebuildDeselectTree();
        }
    }

    /** Parse data into suitable format for the FlatTreeComponent to understand and initialize deselect tree */
    private rebuildDeselectTree(): void {
        const treeData: ColumnPickerTreeNode[] = [];
        const allColumns = [...this.deselected, ...this.selected];
        const groupedColumns: (string | ColumnPickerGroupItem)[] = allColumns.filter(column => this.isColumnPickerItem(column) && column.group !== null);
        const ungroupedColumns = allColumns.filter(column => groupedColumns.indexOf(column) === -1);

        // sort into alphabetical order, by group and name
        groupedColumns.sort((a: ColumnPickerGroupItem, b: ColumnPickerGroupItem) => {
            // sort by group first
            if (a.group > b.group) { return -1; }
            if (a.group < b.group) { return 1; }

            // sort by name after
            return a.name > b.name ? 1 : -1;
        });

        // sort into alphabetical order, by name
        ungroupedColumns.sort((a: string | ColumnPickerGroupItem, b: string | ColumnPickerGroupItem) =>
            this.getColumnName(a) > this.getColumnName(b) ? 1 : -1);

        let currentGroup: string = null;
        let children: string[] = [];

        // create grouped columns and their parent nodes
        groupedColumns.forEach((column: ColumnPickerGroupItem) => {
            // if new group create parent node
            if (!currentGroup || column.group !== currentGroup) {
                // set children for current group
                if (currentGroup != null) {
                    treeData.find(node => node.name === currentGroup).children = children;
                    children = [];
                }

                currentGroup = column.group;

                // check if settings present for the current group
                const groups = this.groups.find(setting => setting.name === column.group);
                const isExpanded = groups && groups.expanded || false;

                treeData.push({
                    name: column.group,
                    level: 0,
                    expandable: true,
                    isExpanded,
                });
            }

            treeData.push({
                name: column.name,
                level: 1,
                expandable: false
            });

            children.push(column.name);

            // set children for current group when last column
            if (currentGroup && groupedColumns.indexOf(column) === groupedColumns.length - 1) {
                treeData.find(node => node.name === currentGroup).children = children;
                children = [];
            }
        });

        // create ungrouped items
        ungroupedColumns.forEach((column: string | ColumnPickerGroupItem) => {
            treeData.push({
                name: this.getColumnName(column),
                level: 0,
                expandable: false
            });
        });

        this._treeData = treeData;
        this._treeDataSource = new ArrayDataSource(treeData);

        // set initial count for deselected values
        this.updateAvailableDeselectedColumns();
    }

    /** A function that can be called to add columns. If no columns are passed to the function, the items that are selected in the left column will be added. */
    addColumns(columns: ReadonlyArray<string | ColumnPickerGroupItem> = this._deselectedSelection): void {
        columns = columns.filter(column => this.selected.indexOf(this.getColumnName(column)) === -1);

        // add each item to the selected columns list
        columns.forEach(column => this.selected = [...this.selected, this.getColumnName(column)]);

        // emit the selection changes
        this.selectedChange.emit(this.selected);
        this.deselectedChange.emit(this.deselected);

        // store the available deselected items
        this.updateAvailableDeselectedColumns();

        // clear the current selection
        this._deselectedSelection = [];
    }

    /** A function that can be called to remove columns. If no columns are passed to the function, the items that are selected in the right column will be removed. */
    removeColumns(columns: ReadonlyArray<string | ColumnPickerGroupItem> = this._selectedSelection): void {

        // remove each item from the selected columns list
        this.selected = this.selected.filter(column => columns.indexOf(column) === -1);

        // add columns to deselected if not already there
        this.deselected = [
            ...this.deselected,
            ...columns.filter(column => !this.deselected.find(
                _column => this.getColumnName(_column) === column) && this.deselected.indexOf(column) === -1
            )
        ];

        // emit the selection changes
        this.selectedChange.emit(this.selected);
        this.deselectedChange.emit(this.deselected);

        // store the available deselected items
        this.updateAvailableDeselectedColumns();

        // clear the current selection
        this._selectedSelection = [];
    }

    /** A function that can be called to add all columns. */
    addAllColumns(): void {
        this.addColumns(this.deselected);
    }

    /** A function that can be called to remove all columns. */
    removeAllColumns(): void {
        this.removeColumns(this.selected);
    }

    /** Ensure we don't select while dragging */
    storeSelection(): void {
        this._selection = [...this._selectedSelection];
    }

    /** Restore the selection once dragging ends */
    restoreSelection(): void {
        this._selectedSelection = this._selection;
    }

    /** Update when reordering has occurred */
    onReorder(): void {
        this.selectedChange.emit(this.selected);
    }

    /** Get an aria label for deselected list groups */
    private getDefaultDeselectedGroupAriaLabel(column: string, isExpanded: boolean): string {
        return `Toggle ${column}`;
    }

    /** Get an aria label for reorderable items */
    private getDefaultSelectedAriaLabel(column: string, index: number): string {
        return `${column}. Press Alt up and alt down to reorder.`;
    }

    /** Get the announcement to read when a selected column is moved */
    getColumnMovedAnnouncement(column: string, delta: number): string {
        return `${column} column moved ${delta > 0 ? 'down' : 'up'}`;
    }

    /** Perform a reorder with the keyboard */
    move(column: string, delta: number): void {
        // perform the move
        const index = this.selected.indexOf(column);
        this.swap(index, index + delta);

        // Announce the move if the order has changed
        if (this.selected.indexOf(column) !== index) {
            this._liveAnnouncer.announce(`Column moved ${delta > 0 ? 'down' : 'up'}`);
        }

        // emit the changes
        this.selectedChange.emit(this.selected);

        // perform change detection
        this._changeDetectorRef.detectChanges();

        // after the UI has updated focus the element again (ngFor creates new DOM elements)
        setTimeout(() => {
            const columnIndex = this.selected.indexOf(column);
            const target = this.selectedElements.toArray()[columnIndex];

            if (target) {
                // focus the element
                target.nativeElement.focus();
            }
        });
    }

    /** Provide a trackBy function for the reorderable options */
    selectedTrackBy(index: number, column: string): string {
        return index + column;
    }

    /** Swap two elements in the selected columns array */
    private swap(source: number, target: number): void {

        // perform boundary checks
        if (target < 0 || target > this.selected.length - 1) {
            return;
        }

        // create a copy of the array to manipulate
        const selected = [...this.selected];

        // swap the array elements
        [selected[target], selected[source]] = [selected[source], selected[target]];

        // update the original array
        this.selected = [...selected];
    }

    /** Check if column value or string */
    private isColumnPickerItem(column: string | ColumnPickerGroupItem): column is ColumnPickerGroupItem {
        return typeof column === 'object';
    }

    /** Get the column name based on type */
    private getColumnName(item: string | ColumnPickerGroupItem): string {
        return this.isColumnPickerItem(item) ? item.name : item;
    }

    /** Check if tree group has visible children */
    _nodeHasChildren(_: number, node: ColumnPickerTreeNode): boolean {
        return node.expandable;
    }

    _nodeHasAvailableChildren(node: ColumnPickerTreeNode): boolean {
        return node.children.filter(column => this.selected.indexOf(column) === -1).length > 0;
    }

    /** Check to see if current item should display in deselect tree */
    _shouldRenderNode(node: ColumnPickerTreeNode): boolean {
        const parent = this.getTreeParent(node);

        return (!parent || parent.isExpanded) && !this.selected.find(column => this.getColumnName(column) === node.name);
    }

    /** Work backwards from the index of the current node to find the parent node  */
    private getTreeParent(node: ColumnPickerTreeNode): ColumnPickerTreeNode {
        const nodeIndex = this._treeData.indexOf(node);

        if (node.level > 0) {
            for (let i: number = nodeIndex - 1; i >= 0; i--) {
                if (this._treeData[i].level === 0) {
                    return this._treeData[i];
                }
            }
        }

        return null;
    }

    /** Store the current count of nodes that are available for selection from the deselected list */
    private updateAvailableDeselectedColumns(): void {
        this._availableDeselectedColumns = this._treeData.filter(node => !node.expandable && this.selected.indexOf(node.name) === -1).length;
    }

    /** Update the order of the items when reordering has changed */
    onReorderChange(model: string[]): void {
        this.selected = [...model];
    }

    /** Get the action context, ensuring that functions have a pre-bound context */
    _getActionContext(): ColumnPickerActionsContext {
        return {
            addSelection: this._deselectedSelection,
            removeSelection: this._selectedSelection,
            addColumns: this.addColumns.bind(this),
            removeColumns: this.removeColumns.bind(this),
            addAllColumns: this.addAllColumns.bind(this),
            removeAllColumns: this.removeAllColumns.bind(this)
        };
    }

    /** Change the expanded state of a node */
    _setNodeExpanded(node: ColumnPickerTreeNode, isExpanded: boolean): void {
        node.isExpanded = isExpanded;

        // the first change detection cycle will hide the elements but we need to trigger
        // a second change detection cycle on the next tick to ensure the ContentChildren
        // QueryList gets updated in the uxTabbableList directive
        requestAnimationFrame(() => this._changeDetectorRef.detectChanges());
    }
}

/** Define a context for the column actions template */
export interface ColumnPickerActionsContext {
    /** An array of items that are currently selected in the left column. */
    addSelection: ReadonlyArray<string | ColumnPickerGroupItem>;
    /** An array of items that are currently selected in the right column. */
    removeSelection: ReadonlyArray<string | ColumnPickerGroupItem>;
    /** A function that can be called to add columns. If no columns are passed to the function, the items that are selected in the left column will be added. */
    addColumns(columns?: ReadonlyArray<string | ColumnPickerGroupItem>): void;
    /** A function that can be called to remove columns. If no columns are passed to the function, the items that are selected in the right column will be removed. */
    removeColumns(columns?: ReadonlyArray<string | ColumnPickerGroupItem>): void;
    /** A function that can be called to add all columns. */
    addAllColumns(): void;
    /** A function that can be called to remove all columns. */
    removeAllColumns(): void;
}

/** An interface representing a grouped item */
export interface ColumnPickerGroupItem {
    /**  The name of the group that this column belongs to. */
    group?: string;
    /**  The name of the column. */
    name: string;
}

/** An interface representing settings of groups defined in ColumnPickerGroupItem objects */
export interface ColumnPickerGroup {
    /**  The name of the group this setting object is related to. */
    name: string;
    /**  Defines if this group will be expanded on load. This is an optional property. */
    expanded?: boolean;
}

/** Represents a tree node item. Normalises data for both groups and columns into one format */
interface ColumnPickerTreeNode {
    /** The name of the column or group. */
    name: string;
    /**  The level this node exists in the tree hierarchy (top level nodes are 0, grouped nodes are 1). */
    level?: number;
    /**  The names of the columns that are children of this node (if this node is a group). */
    children?: string[];
    /**  A flag to identify group nodes. */
    expandable?: boolean;
    /**  A flag to track the current state of a group node (if this node is a group). */
    isExpanded?: boolean;
}
