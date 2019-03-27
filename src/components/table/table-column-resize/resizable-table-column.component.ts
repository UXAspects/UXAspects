import { coerceNumberProperty } from '@angular/cdk/coercion';
import { Component, ElementRef, EventEmitter, Input, OnDestroy, Output, Renderer2 } from '@angular/core';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { ColumnUnit, ResizableTableService } from './resizable-table.service';

@Component({
    selector: '[uxResizableTableColumn]',
    templateUrl: './resizable-table-column.component.html',
    host: {
        class: 'ux-resizable-table-column'
    }
})
export class ResizableTableColumnComponent implements OnDestroy {

    /** Disabled the column resizing */
    @Input() disabled: boolean = false;

    /** Define the width of a column */
    @Input() set width(width: number) {

        // ensure width is a valid number
        this._width = coerceNumberProperty(width);

        // note that this column has a fixed width
        this.isFixedWidth = true;

        // if we have not initialised then set the element width
        if (!this._table.isInitialised$.value) {
            this._renderer.setStyle(this._elementRef.nativeElement, 'width', `${this._width}px`);
        } else {

            // if it is initialised then resize the column
            const currentWidth = this._table.getColumnWidth(this.getCellIndex(), ColumnUnit.Pixel);

            // resize the column by the difference in size
            this._table.resizeColumn(this.getCellIndex(), this._width - currentWidth, false);
        }
    }

    get width(): number {
        return this._width;
    }

    /** Emit the current column width */
    @Output() widthChange = new EventEmitter<number>();

    /** Get the minimum width allowed by the column */
    get minWidth(): number {
        // determine the minimum width of the column based on its computed CSS value
        const computed = parseFloat(getComputedStyle(this._elementRef.nativeElement).minWidth);

        // if it is disabled use its current width - otherwise use its CSS min width if it is valid
        return this.disabled ? this._elementRef.nativeElement.offsetWidth : isNaN(computed) ? 0 : computed;
    }

    /** Determine if this column is a variable width column */
    isFixedWidth: boolean = false;

    /** Store the width specifically set by the input */
    private _width: number;

    /** Store the position of the mouse within the drag hanlde */
    private _offset: number;

    /** Emit when all observables should be unsubscribed */
    private _onDestroy = new Subject<void>();

    constructor(private _elementRef: ElementRef, private _table: ResizableTableService, private _renderer: Renderer2) {

        // initially emit the size when we have initialised
        _table.isInitialised$.pipe(takeUntil(this._onDestroy), filter(isInitialised => isInitialised))
            .subscribe(() => this.widthChange.emit(_table.getColumnWidth(this.getCellIndex(), ColumnUnit.Pixel)));

        // ensure the correct width gets emitted on column size change
        _table.onResize$.pipe(takeUntil(this._onDestroy)).subscribe(() => {
            this.setColumnWidth();
            this.setColumnFlex();

            // get the current table width
            const width = _table.getColumnWidth(this.getCellIndex(), ColumnUnit.Pixel);

            // check if the width actually changed - otherwise don't emit
            if (this._width === undefined || Math.max(width, this._width) - Math.min(width, this._width) >= 1) {
                this.widthChange.emit(width);
            }
        });
    }

    /** Cleanup when component is destroyed */
    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    /** Get the natural pixel width of the column */
    getNaturalWidth(): number {
        return this._width || this._elementRef.nativeElement.offsetWidth;
    }

    /** When the dragging starts */
    onDragStart(event: MouseEvent): void {
        // determine the mouse position within the handle
        this._offset = event.clientX - (event.target as HTMLElement).getBoundingClientRect().left;
    }

    /** When the mouse is moved */
    onDragMove(event: MouseEvent, handle: HTMLDivElement): void {

        // get the current mouse position
        const mouseX = event.pageX - pageXOffset;

        // position of the drag handle
        const { left } = handle.getBoundingClientRect();

        // determine how much the mouse has moved since the last update
        const delta = mouseX - (left + this._offset);

        // perform resizing
        this._table.resizeColumn(this.getCellIndex(), delta);

        // set the resizing state
        this._table.setResizing(true);
    }

    /** When the dragging ends */
    onDragEnd(): void {
        this._table.setResizing(false);
    }

    /** Shrink the column when the left arrow key is pressed */
    onMoveLeft(): void {
        this._table.resizeColumn(this.getCellIndex(), -10);
    }

    /** Grow the column when the right arrow key is pressed */
    onMoveRight(): void {
        this._table.resizeColumn(this.getCellIndex(), 10);
    }

    /** Get the column index this cell is part of */
    getCellIndex(): number {
        return (this._elementRef.nativeElement as HTMLTableCellElement).cellIndex;
    }

    /** The percentage width of the column */
    private setColumnWidth(): void {

        if (this.disabled && this._width !== undefined) {
            this._renderer.setStyle(this._elementRef.nativeElement, 'width', `${this._width}px`);
            this._renderer.setStyle(this._elementRef.nativeElement, 'max-width', `${this._width}px`);
            return;
        }

        if (!this._table.isInitialised$.value) {
            return;
        }


        const width = this._table.isResizing ?
            `${this._table.getColumnWidth(this.getCellIndex(), ColumnUnit.Pixel)}px` :
            `${this._table.getColumnWidth(this.getCellIndex(), ColumnUnit.Percentage)}%`;

        this._renderer.setStyle(this._elementRef.nativeElement, 'width', width);
        this._renderer.setStyle(this._elementRef.nativeElement, 'max-width', null);
    }

    /** The flex width of the column */
    private setColumnFlex(): void {

        // if we are resizing then always return 'none' to allow free movement
        if (this._table.isResizing || this.disabled) {
            this._renderer.setStyle(this._elementRef.nativeElement, 'flex', 'none');
        }

        const flex = this._table.isInitialised$.value ? `0 1 ${this._table.getColumnWidth(this.getCellIndex(), ColumnUnit.Percentage)}%` : '';
        this._renderer.setStyle(this._elementRef.nativeElement, 'flex', flex);
    }
}
