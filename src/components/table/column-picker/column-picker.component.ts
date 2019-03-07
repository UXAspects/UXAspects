import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, QueryList, TemplateRef, ViewChildren } from '@angular/core';

@Component({
    selector: 'ux-column-picker',
    templateUrl: './column-picker.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColumnPickerComponent {

    /** Define a list of all selected columns */
    @Input() selected: ReadonlyArray<string> = [];

    /** Define a list of columns that must be selected */
    @Input() locked: ReadonlyArray<string> = [];

    /** Define a list of columns that are not selected or locked */
    @Input() deselected: ReadonlyArray<string> = [];

    /** Define a custom selected title template */
    @Input() selectedTitleTemplate: TemplateRef<any>;

    /** Define a custom deselected title template */
    @Input() deselectedTitleTemplate: TemplateRef<any>;

    /** Define a custom template for deselected items */
    @Input() deselectedTemplate: TemplateRef<any>;

    /** Define a custom template for selected items */
    @Input() selectedTemplate: TemplateRef<any>;

    /** Define a custom template for locked items */
    @Input() lockedTemplate: TemplateRef<any>;

    /** Define a function to get the aria label of reorderable items */
    @Input() selectedAriaLabel: (column: string, index: number) => string = this.getSelectedAriaLabel;

    /** Define a function that return a column move announcement */
    @Input() columnMovedAnnouncement: (column: string, delta: number) => string = this.getColumnMovedAnnouncement;

    /** Emits when the selected items change */
    @Output() selectedChange = new EventEmitter<ReadonlyArray<string>>();

    /** Emits when the deselected items change */
    @Output() deselectedChange = new EventEmitter<ReadonlyArray<string>>();

    /** Store the list of deselected columns that can be moved */
    _deselectedSelection: ReadonlyArray<string> = [];

    /** Store the list of selected columns that can be moved */
    _selectedSelection: ReadonlyArray<string> = [];

    /** Cache selection during reordering */
    private _selection: ReadonlyArray<string> = [];

    /** Get the elements for the selected items */
    @ViewChildren('selectedColumn') selectedElements: QueryList<ElementRef>;

    constructor(
        /** Access the LiveAnnounce to provide accessibility on reordering */
        private _liveAnnouncer: LiveAnnouncer,
        /** We are using OnPush change detection so we must manually trigger CD */
        private _changeDetectorRef: ChangeDetectorRef
    ) { }

    /** Select the currently selected columns */
    addColumns(columns: ReadonlyArray<string> = this._deselectedSelection): void {

        // add each item to the selected columns list
        columns.forEach(column => this.selected = [...this.selected, column]);

        // remove each item from the deselected columns list
        this.deselected = this.deselected.filter(column => columns.indexOf(column) === -1);

        // emit the selection changes
        this.selectedChange.emit(this.selected);
        this.deselectedChange.emit(this.deselected);

        // clear the current selection
        this._deselectedSelection = [];
    }

    /** Deselect the currently selected columns */
    removeColumns(columns: ReadonlyArray<string> = this._selectedSelection): void {
        // add each item to the deselected columns list
        columns.forEach(column => this.deselected = [...this.deselected, column]);

        // remove each item from the selected columns list
        this.selected = this.selected.filter(column => columns.indexOf(column) === -1);

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

    /** Update the order of the items when reordering has changed */
    onReorderChange(model: string[]): void {
        this.selected = [...model];
    }
}