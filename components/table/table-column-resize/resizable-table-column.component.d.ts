import { ElementRef } from '@angular/core';
import { ResizableTableService } from './resizable-table.service';
export declare class ResizableTableColumnComponent {
    private _elementRef;
    private _table;
    /** Disabled the column resizing */
    disabled: boolean;
    /** The percentage width of the column */
    readonly width: string;
    /** The flex width of the column */
    readonly flex: string;
    /** Get the minimum width allowed by the column */
    readonly minWidth: number;
    /** Store the position of the mouse within the drag hanlde */
    private _offset;
    constructor(_elementRef: ElementRef, _table: ResizableTableService);
    /** Get the natural pixel width of the column */
    getNaturalWidth(): number;
    /** When the dragging starts */
    onDragStart(event: MouseEvent): void;
    /** When the mouse is moved */
    onDragMove(event: MouseEvent, handle: HTMLDivElement): void;
    /** When the dragging ends */
    onDragEnd(): void;
    /** Get the column index this cell is part of */
    private getCellIndex();
}
