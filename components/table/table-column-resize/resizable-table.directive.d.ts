import { AfterViewInit, ElementRef, QueryList } from '@angular/core';
import { ResizableTableColumnComponent } from './resizable-table-column.component';
import { ResizableTableService } from './resizable-table.service';
export declare class ResizableTableDirective implements AfterViewInit {
    private _elementRef;
    private _table;
    columns: QueryList<ResizableTableColumnComponent>;
    constructor(_elementRef: ElementRef, _table: ResizableTableService);
    ngAfterViewInit(): void;
}
