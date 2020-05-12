import { FocusKeyManager, LiveAnnouncer } from '@angular/cdk/a11y';
import { ArrayDataSource } from '@angular/cdk/collections';
import { FlatTreeControl, CdkTreeNode } from '@angular/cdk/tree';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, Renderer2, TemplateRef, ViewChildren, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { KeyCodes } from '../../../common/utilities/key-events';

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

/** Unified type to handle string or group value types as component inputs */
export type ColumnPickerValue = string | ColumnPickerGroupItem;

/** Interface representing a tree node item. This normalises data into one format */
export interface ColumnPickerTreeNode {
    name: string;
    level?: number;
    children?: ColumnPickerTreeNode[];
    expandable?: boolean;
    isExpanded?: boolean;
}

@Component({
    selector: 'ux-column-picker',
    templateUrl: './column-picker.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColumnPickerComponent implements OnInit, AfterViewInit, OnDestroy {

    /** Define a list of all selected columns */
    @Input() selected: ReadonlyArray<string> = [];

    /** Define a list of columns that must be selected */
    @Input() locked: ReadonlyArray<string> = [];

    /** Define a list of columns that are not selected or locked */
    @Input() deselected: ReadonlyArray<ColumnPickerValue> = [];

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
    @Input() groupSettings: ColumnPickerGroupSetting[] = [];

    /** Emits when the selected items change */
    @Output() selectedChange = new EventEmitter<ReadonlyArray<ColumnPickerValue>>();

    /** Emits when the deselected items change */
    @Output() deselectedChange = new EventEmitter<ReadonlyArray<ColumnPickerValue>>();

    /** The Nested tree control used for the deselect tree */
    treeControl: FlatTreeControl<ColumnPickerTreeNode> = new FlatTreeControl<ColumnPickerTreeNode>(
        node => node.level,
        node => node.expandable
    );

    /** A tree-friendly representation of the deselected data */
    treeData: ColumnPickerTreeNode[];

    /** Data source observable bound to the tree control */
    treeDataSource: ArrayDataSource<ColumnPickerTreeNode>;

    /** Store the list of deselected columns that can be moved */
    _deselectedSelection: ReadonlyArray<ColumnPickerValue> = [];

    /** Store the list of selected columns that can be moved */
    _selectedSelection: ReadonlyArray<ColumnPickerValue> = [];

    /** Defines the index of the item currently in focus */
    activeIndex: number = 0;

    isFocused: boolean = false;

    /** Cache selection during reordering */
    private _selection: ReadonlyArray<ColumnPickerValue> = [];

    /** Focus manager for cycling through the tree nodes */
    private _focusKeyManager: FocusKeyManager<CdkTreeNode<ColumnPickerTreeNode>>;

    /** Trash collecting object for observables */
    private _onDestroy = new Subject<void>();

    /** Get the elements for the selected items */
    @ViewChildren('selectedColumn') selectedElements: QueryList<ElementRef>;

    @ViewChildren(CdkTreeNode)
    treeNodes: QueryList<CdkTreeNode<ColumnPickerTreeNode>>;

    constructor(
        /** Access the LiveAnnounce to provide accessibility on reordering */
        private readonly _liveAnnouncer: LiveAnnouncer,
        /** We are using OnPush change detection so we must manually trigger CD */
        private readonly _changeDetectorRef: ChangeDetectorRef
    ) { }

    /** Build the heirarchy of the deselect tree */
    ngOnInit(): void {
        let treeData: ColumnPickerTreeNode[] = [];

        // combine select and deselect into one list
        this.deselected = this.deselected.concat(this.selected);

        const groupedItems: ColumnPickerValue[] = this.deselected.filter(column => this.isColumnPickerItem(column) && (column as ColumnPickerGroupItem).group !== null);
        const ungroupedItems = this.deselected.filter(column => groupedItems.indexOf(column) === -1);
        groupedItems.sort((a: ColumnPickerGroupItem, b: ColumnPickerGroupItem) => {
            // sort by group first
            if (a.group > b.group) { return -1; }
            if (a.group < b.group) { return 1; }

            // sort by name after
            if (a.name > b.name) { return 1; }
            if (a.name < b.name) { return -1; }
        });

        ungroupedItems.sort((a: ColumnPickerValue, b: ColumnPickerValue) => {
            // get names and sort
            const aName = this.getColumnName(a);
            const bName = this.getColumnName(b);
            if (aName > bName) { return 1; }
            if (aName < bName) { return -1; }
        });

        let currentGroup: string = null;

        // create grouped items
        groupedItems.forEach((column: ColumnPickerGroupItem) => {
            // if new group create top level item
            if (!currentGroup || column.group !== currentGroup) {
                currentGroup = column.group;

                // check if settings present for the current group
                const groupSettings = this.groupSettings.find(setting => setting.group === column.group);
                const isExpanded = groupSettings && groupSettings.initiallyExpanded || false;

                treeData.push({
                    name: column.group,
                    level: 0,
                    expandable: true,
                    isExpanded
                });
            }

            treeData.push({
                name: column.name,
                level: 1,
                expandable: false
            });
        });

        // create ungrouped items
        ungroupedItems.forEach((column: ColumnPickerValue) => {
            treeData.push({
                name: this.getColumnName(column),
                level: 0,
                expandable: false
            });
        });

        this.treeData = treeData;
        this.treeDataSource = new ArrayDataSource(treeData);
    }

    ngAfterViewInit(): void {
        this._focusKeyManager = new FocusKeyManager(this.treeNodes).withVerticalOrientation();
        this._focusKeyManager.change.pipe(takeUntil(this._onDestroy)).subscribe(index => this.activeIndex = index);
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    onFocus(index: number): void {
        if (this._focusKeyManager.activeItemIndex === -1) {
            this._focusKeyManager.setActiveItem(index);
        }
    }

    onKeydown(node: ColumnPickerTreeNode, event: KeyboardEvent): void {
        this._focusKeyManager.onKeydown(event);

        switch (event.code) {
            case KeyCodes.ArrowRight:
                // expand node when it has children
                if (node.expandable && !node.isExpanded) {
                    node.isExpanded = true;
                }
                break;

            case KeyCodes.ArrowLeft:
                if (node.isExpanded) {
                    node.isExpanded = false;
                }
                break;

            // Select and deselect current item
            case KeyCodes.Enter:
                if (!this._deselectedSelection.find((deselectedSelectionItem: ColumnPickerTreeNode) => deselectedSelectionItem === node)) {
                    this._deselectedSelection = [...this._deselectedSelection, node];
                } else {
                    this._deselectedSelection = this._deselectedSelection.filter((deselectedSelectionItem: ColumnPickerTreeNode) => node !== deselectedSelectionItem);
                }
                // console.log('updated _deselectedSelection: ', this._deselectedSelection);
                break;
        }

        if (event) {
            event.preventDefault();
        }
    }

    /** Select the currently selected columns */
    addColumns(columns: ReadonlyArray<ColumnPickerValue> = this._deselectedSelection): void {
        // add each item to the selected columns list
        columns.forEach(column => this.selected = [...this.selected, this.getColumnName(column)]);

        // emit the selection changes
        this.selectedChange.emit(this.selected);
        this.deselectedChange.emit(this.deselected);

        // clear the current selection
        this._deselectedSelection = [];
    }

    /** Deselect the currently selected columns */
    removeColumns(columns: ReadonlyArray<ColumnPickerValue> = this._selectedSelection): void {
        // remove each item from the selected columns list
        this.selected = this.selected.filter(column => this.isColumnPickerItem(column) ?
            !columns.find(c => (c as ColumnPickerGroupItem).name === this.getColumnName(column))
            : columns.indexOf(column) === -1);

        // emit the selection changes
        this.selectedChange.emit(this.selected);
        this.deselectedChange.emit(this.deselected);

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

    /** Update when reordering has occured */
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
    isColumnPickerItem(column: ColumnPickerValue): column is ColumnPickerGroupItem {
        return (column as ColumnPickerGroupItem).name !== undefined;
    }

    /** Get the column name based on type */
    getColumnName(item: ColumnPickerValue) {
        return this.isColumnPickerItem(item) ? item.name : item;
    }

    /** Check if tree group has visible children */
    nodeHasChildren(index: number, node: ColumnPickerTreeNode): boolean {
        return node.expandable;
    }

    hasDeselectedItems(): boolean {
        return this.deselected.filter(column => !this.selected.find(c => this.getColumnName(column) === c)).length === 0;
    }

    /** Check to see if current item should display in deselect tree */
    shouldRenderNode(item: ColumnPickerTreeNode): boolean {
        const parent = this.getTreeParent(item);

        return Boolean(
            (!parent || parent.isExpanded) &&
            !this.selected.find(column => this.getColumnName(column) === item.name)
        );
    }

    /** Work backwards from the index of the current node to find the parent node  */
    getTreeParent(node: ColumnPickerTreeNode): ColumnPickerTreeNode {
        const nodeIndex = this.treeData.indexOf(node);

        if (node.level > 0) {
            for (let i = nodeIndex - 1; i >= 0; i--) {
                if (this.treeData[i].level === 0) {
                    return this.treeData[i];
                }
            }
        }

        return null;
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
}

/** Define a context for the column actions template */
export interface ColumnPickerActionsContext {
    addSelection: ReadonlyArray<ColumnPickerValue>;
    removeSelection: ReadonlyArray<ColumnPickerValue>;
    addColumns(columns?: ReadonlyArray<ColumnPickerValue>): void;
    removeColumns(columns?: ReadonlyArray<ColumnPickerValue>): void;
    addAllColumns(): void;
    removeAllColumns(): void;
}
