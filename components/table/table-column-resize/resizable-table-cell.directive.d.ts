import { ElementRef } from '@angular/core';
import { ResizableTableService } from './resizable-table.service';
export declare class ResizableTableCellDirective {
    private _elementRef;
    private _table;
    /** The percentage width of the column */
    readonly width: string;
    /** The flex width of the column */
    readonly flex: string;
    constructor(_elementRef: ElementRef, _table: ResizableTableService);
    /** Get the column index this cell is part of */
    private getCellIndex();
}
