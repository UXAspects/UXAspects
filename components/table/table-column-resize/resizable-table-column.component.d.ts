import { ElementRef, OnDestroy } from '@angular/core';
import { ResizableTableService } from './resizable-table.service';
export declare class ResizableTableColumnComponent implements OnDestroy {
    table: ResizableTableService;
    private _elementRef;
    disabled: boolean;
    /** The percentage width of the column */
    readonly width: string;
    readonly minWidth: number;
    private _width;
    /** Ensure observables get destroyed correctly */
    private _onDestroy;
    constructor(table: ResizableTableService, _elementRef: ElementRef);
    getColumnWidth(): number;
    ngOnInit(): void;
    ngOnDestroy(): void;
    dragstart(): void;
    drag(event: MouseEvent, handle: HTMLDivElement): void;
    dragend(): void;
}
