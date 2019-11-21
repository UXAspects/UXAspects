import { AfterViewInit, ElementRef, Inject, OnDestroy, QueryList, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ResizeService } from '../../../directives/resize';
import { BaseResizableTableService } from './resizable-table-base.service';
import { ResizableTableColumnComponent } from './resizable-table-column.component';
import { RESIZABLE_TABLE_SERVICE_TOKEN } from './resizable-table-service.token';

export abstract class BaseResizableTableDirective implements AfterViewInit, OnDestroy {

    columns: QueryList<ResizableTableColumnComponent>;

    /** Unsubscribe from the observables */
    protected _onDestroy = new Subject<void>();

    /** Store the initialised state of the table */
    protected _initialised: boolean = false;

    constructor(protected _elementRef: ElementRef<HTMLTableElement>, @Inject(RESIZABLE_TABLE_SERVICE_TOKEN) protected _table: BaseResizableTableService, protected _renderer: Renderer2, resize: ResizeService) {
        // watch for the table being resized
        resize.addResizeListener(this._elementRef.nativeElement).pipe(takeUntil(this._onDestroy)).subscribe(() => {
            // store the latest table size
            _table.tableWidth = this.getScrollWidth();

            // run the initial logic if the table is fully visible
            this.onTableReady();
        });
    }

    /** Once we have the columns make them resizable and watch for changes to columns */
    ngAfterViewInit(): void {
        this.onTableReady();
    }

    /** Cleanup after the component is destroyed */
    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    /** Set all resizable columns to the same width */
    setUniformWidths(): void {
        this._table.setUniformWidths();
    }

    /** Get the smallest tbody width taking into account scrollbars (uxFixedHeaderTable) */
    protected getScrollWidth(): number {
        return Array.from((this._elementRef.nativeElement as HTMLTableElement).tBodies)
            .reduce((width, tbody) => Math.min(width, tbody.scrollWidth), (this._elementRef.nativeElement as HTMLTableElement).offsetWidth);
    }

    abstract onTableReady(): void;
}