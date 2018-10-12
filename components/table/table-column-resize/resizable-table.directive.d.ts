import { AfterViewInit, ElementRef, OnDestroy, QueryList } from '@angular/core';
import { ResizableTableColumnComponent } from './resizable-table-column.component';
import { ResizableTableService } from './resizable-table.service';
import { ResizeService } from '../../../directives/resize/index';
export declare class ResizableTableDirective implements AfterViewInit, OnDestroy {
    private _elementRef;
    private _table;
    /** Get all the column headers */
    columns: QueryList<ResizableTableColumnComponent>;
    /** Unsubscribe from the observables */
    private _onDestroy;
    constructor(_elementRef: ElementRef, _table: ResizableTableService, resize: ResizeService);
    /** Once we have the columns make them resizable and watch for changes to columns */
    ngAfterViewInit(): void;
    /** Cleanup after the component is destroyed */
    ngOnDestroy(): void;
    /** Get the smallest tbody width taking into account scrollbars (uxFixedHeaderTable) */
    private getScrollWidth();
}
