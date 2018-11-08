import { ElementRef, EventEmitter, OnDestroy, Renderer2 } from '@angular/core';
import { ResizableTableService } from './resizable-table.service';
export declare class ResizableTableColumnComponent implements OnDestroy {
    private _elementRef;
    private _table;
    private _renderer;
    /** Disabled the column resizing */
    disabled: boolean;
    /** Define the width of a column */
    width: number;
    /** Emit the current column width */
    widthChange: EventEmitter<number>;
    /** The percentage width of the column */
    readonly columnWidth: string;
    /** The flex width of the column */
    readonly flex: string;
    /** Get the minimum width allowed by the column */
    readonly minWidth: number;
    /** Determine if this column is a variable width column */
    isFixedWidth: boolean;
    /** Store the width specifically set by the input */
    private _width;
    /** Store the position of the mouse within the drag hanlde */
    private _offset;
    /** Emit when all observables should be unsubscribed */
    private _onDestroy;
    constructor(_elementRef: ElementRef, _table: ResizableTableService, _renderer: Renderer2);
    /** Cleanup when component is destroyed */
    ngOnDestroy(): void;
    /** Get the natural pixel width of the column */
    getNaturalWidth(): number;
    /** When the dragging starts */
    onDragStart(event: MouseEvent): void;
    /** When the mouse is moved */
    onDragMove(event: MouseEvent, handle: HTMLDivElement): void;
    /** When the dragging ends */
    onDragEnd(): void;
    /** Shrink the column when the left arrow key is pressed */
    onMoveLeft(): void;
    /** Grow the column when the right arrow key is pressed */
    onMoveRight(): void;
    /** Get the column index this cell is part of */
    getCellIndex(): number;
}
