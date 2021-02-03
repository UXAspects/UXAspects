import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ArrayDataSource } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnChanges, Output, QueryList, SimpleChanges, TemplateRef, ViewChildren } from '@angular/core';
import { ColumnPickerService } from './column-picker.service';
import { ColumnPickerGroupItem, isColumnPickerGroupItem } from './interfaces/column-picker-group-item.interface';
import { ColumnPickerTreeNode } from './interfaces/column-picker-tree-node.interface';

@Component({
    selector: 'ux-column-picker',
    templateUrl: './column-picker.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ColumnPickerService]
})
export class ColumnPickerComponent implements OnChanges {

    /** Define a list of all selected columns. */
    @Input() selected: ReadonlyArray<string | ColumnPickerGroupItem> = [];

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
    @Input() set groups(groups: ColumnPickerGroup[]) {
        this._columnPicker.groups = groups;
    }

    get groups(): ColumnPickerGroup[] {
        return this._columnPicker.groups;
    }

    /** Define a comparator function used for sorting the deselected columns. */
    @Input() sort: (a: ColumnPickerGroupItem, b: ColumnPickerGroupItem) => number;

    /** Emits when the selected items change or the order of the selected items change. */
    @Output() selectedChange = new EventEmitter<ReadonlyArray<string | ColumnPickerGroupItem>>();

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
        private readonly _columnPicker: ColumnPickerService,
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
        const columns = this._columnPicker.getDeselectedColumnsInPresentationOrder(this.deselected.slice(), this.sort);

        const treeData = this._columnPicker.createTreeData(columns);
        this._treeData = treeData;
        this._treeDataSource = new ArrayDataSource(treeData);

        // set initial count for deselected values
        this.updateAvailableDeselectedColumns();
    }

    /** A function that can be called to add columns. If no columns are passed to the function, the items that are selected in the left column will be added. */
    addColumns(columns: ReadonlyArray<string | ColumnPickerGroupItem> = this._deselectedSelection): void {
        const deselectedSelection = columns.filter(column => this.selected.indexOf(column) === -1);

        // add each item to the selected columns list
        this.selected = [...this.selected, ...deselectedSelection];

        this.deselected = this.deselected.filter(column => deselectedSelection.indexOf(column) === -1);

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

        this.deselected = [
            ...this.deselected,
            ...columns
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
    selectedTrackBy(index: number, column: string | ColumnPickerGroupItem): string {
        return index + getColumnPickerGroupItemName(column);
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

    /** Get the column name based on type */
    _getColumnName(item: string | ColumnPickerGroupItem): string {
        return isColumnPickerGroupItem(item) ? item.name : item;
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

        return (!parent || parent.isExpanded) && !this.selected.find(column => this._getColumnName(column) === node.name);
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
        this._availableDeselectedColumns = this.deselected.length;
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

function getColumnPickerGroupItemName(column: string | ColumnPickerGroupItem) {
    return isColumnPickerGroupItem(column) ? column.name : column;
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

/** An interface representing settings of groups defined in ColumnPickerGroupItem objects */
export interface ColumnPickerGroup {
    /**  The name of the group this setting object is related to. */
    name: string;
    /**  Defines if this group will be expanded on load. This is an optional property. */
    expanded?: boolean;
}
