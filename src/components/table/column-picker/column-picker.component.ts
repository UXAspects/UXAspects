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

    /** Define a list of all selected columns */
    @Input() selected: ReadonlyArray<string> = [];

    /** Define a list of columns that must be selected */
    @Input() locked: ReadonlyArray<string> = [];

    /** Define a list of columns that are not selected or locked */
    @Input() deselected: ReadonlyArray<string | ColumnPickerGroupItem> = [];

    /** Define a custom selected title template */
    @Input() selectedTitleTemplate: TemplateRef<void>;

    /** Define a custom deselected title template */
    @Input() deselectedTitleTemplate: TemplateRef<void>;

    /** Define a custom template for deselected items */
    @Input() deselectedTemplate: TemplateRef<string>;

    /** Define a custom template for selected items */
    @Input() selectedTemplate: TemplateRef<string>;

    /** Define a custom template for locked items */
    @Input() lockedTemplate: TemplateRef<string>;

    /** Define a custom template for actions column */
    @Input() actionsTemplate: TemplateRef<ColumnPickerActionsContext>;

    /** Define a function to get the aria label of reorderable items */
    @Input() selectedAriaLabel: (column: string, index: number) => string = this.getSelectedAriaLabel;

    /** Define a function that return a column move announcement */
    @Input() columnMovedAnnouncement: (column: string, delta: number) => string = this.getColumnMovedAnnouncement;

    /** group settings for customising display */
    @Input() groupSettings: ReadonlyArray<ColumnPickerGroupSetting> = [];

    /** Emits when the selected items change */
    @Output() selectedChange = new EventEmitter<ReadonlyArray<string>>();

    /** Emits when the deselected items change */
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

    /** Store the list of deselected columns that can be moved */
    _deselectedSelection: ReadonlyArray<string | ColumnPickerGroupItem> = [];

    /** Store the list of selected columns that can be moved */
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
            this._rebuildDeselectTree();
        }
    }

    /** Parse data into suitable format for the FlatTreeComponent to understand and initialize deselect tree */
    _rebuildDeselectTree(): void {
        const treeData: ColumnPickerTreeNode[] = [];
        const allColumns = [...this.deselected, ...this.selected];
        const groupedColumns: (string | ColumnPickerGroupItem)[] = allColumns.filter(column => this._isColumnPickerItem(column) && column.group !== null);
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
            this._getColumnName(a) > this._getColumnName(b) ? 1 : -1);

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
                const groupSettings = this.groupSettings.find(setting => setting.group === column.group);
                const isExpanded = groupSettings && groupSettings.initiallyExpanded || false;

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
                name: this._getColumnName(column),
                level: 0,
                expandable: false
            });
        });

        this._treeData = treeData;
        this._treeDataSource = new ArrayDataSource(treeData);

        // set initial count for deselected values
        this._updateAvailableDeselectedColumns();
    }

    /** Select the currently selected columns */
    addColumns(columns: ReadonlyArray<string | ColumnPickerGroupItem> = this._deselectedSelection): void {
        // add each item to the selected columns list
        columns.forEach(column => this.selected = [...this.selected, this._getColumnName(column)]);

        // emit the selection changes
        this.selectedChange.emit(this.selected);
        this.deselectedChange.emit(this.deselected);

        // store the available deselected items
        this._updateAvailableDeselectedColumns();

        // clear the current selection
        this._deselectedSelection = [];
    }

    /** Deselect the currently selected columns */
    removeColumns(columns: ReadonlyArray<string | ColumnPickerGroupItem> = this._selectedSelection): void {

        // remove each item from the selected columns list
        this.selected = this.selected.filter(column => columns.indexOf(column) === -1);

        // add columns to deselected if not already there
        this.deselected = [
            ...this.deselected,
            ...columns.filter(column => !this.deselected.find(
                _column => this._getColumnName(_column) === column) && this.deselected.indexOf(column) === -1
            )
        ];

        // emit the selection changes
        this.selectedChange.emit(this.selected);
        this.deselectedChange.emit(this.deselected);

        // store the available deselected items
        this._updateAvailableDeselectedColumns();

        // clear the current selection
        this._selectedSelection = [];
    }

    /** Select all deselected columns */
    addAllColumns(): void {
        this.addColumns(this.deselected);
    }

    /** Deselect all selected columns */
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

    /** Get an aria label for reorderable items */
    getSelectedAriaLabel(column: string): string {
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
    _isColumnPickerItem(column: string | ColumnPickerGroupItem): column is ColumnPickerGroupItem {
        return typeof column === 'object';
    }

    /** Get the column name based on type */
    _getColumnName(item: string | ColumnPickerGroupItem): string {
        return this._isColumnPickerItem(item) ? item.name : item;
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
        const parent = this._getTreeParent(node);

        return (!parent || parent.isExpanded) && !this.selected.find(column => this._getColumnName(column) === node.name);
    }

    /** Work backwards from the index of the current node to find the parent node  */
    _getTreeParent(node: ColumnPickerTreeNode): ColumnPickerTreeNode {
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

    // Store the current count of nodes that are available for selection from the deselected list
    _updateAvailableDeselectedColumns(): void {
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
    addSelection: ReadonlyArray<string | ColumnPickerGroupItem>;
    removeSelection: ReadonlyArray<string | ColumnPickerGroupItem>;
    addColumns(columns?: ReadonlyArray<string | ColumnPickerGroupItem>): void;
    removeColumns(columns?: ReadonlyArray<string | ColumnPickerGroupItem>): void;
    addAllColumns(): void;
    removeAllColumns(): void;
}

/** An interface representing a grouped item */
export interface ColumnPickerGroupItem {
    group?: string;
    name: string;
}

/** An interface representing settings of groups defined in ColumnPickerGroupItem objects */
export interface ColumnPickerGroupSetting {
    group: string;
    initiallyExpanded?: boolean;
}

/** Interface representing a tree node item. This normalises data into one format */
export class ColumnPickerTreeNode {
    name: string;
    level?: number;
    children?: string[];
    expandable?: boolean;
    isExpanded?: boolean;
}
