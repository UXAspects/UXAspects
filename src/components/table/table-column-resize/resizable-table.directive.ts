import { AfterViewInit, ContentChildren, Directive, ElementRef, OnDestroy, QueryList } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { ResizeService } from '../../../directives/resize/index';
import { ResizableTableColumnComponent } from './resizable-table-column.component';
import { ResizableTableService } from './resizable-table.service';

@Directive({
    selector: '[uxResizableTable]',
    exportAs: 'ux-resizable-table',
    providers: [ResizableTableService],
    host: {
        class: 'ux-resizable-table'
    }
})
export class ResizableTableDirective implements AfterViewInit, OnDestroy {

    /** Get all the column headers */
    @ContentChildren(ResizableTableColumnComponent, { descendants: true }) columns: QueryList<ResizableTableColumnComponent>;

    /** Store the initialised state of the table */
    private _initialised: boolean = false;

    /** Unsubscribe from the observables */
    private _onDestroy = new Subject<void>();

    constructor(private _elementRef: ElementRef, private _table: ResizableTableService, resize: ResizeService) {
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

    /**
     * If this is being used within a modal the table width may initially be zero. This can cause some issues when it does actually appear
     * visibily on screen. We should only setup the table once we actually have a width/
     */
    onTableReady(): void {

        // if we have already initialised or the table width is currently 0 then do nothing
        if (this._initialised || this.getScrollWidth() === 0) {
            return;
        }

        // ensure we initially set the table width
        this._table.tableWidth = this.getScrollWidth();

        // set the columns - prevent expression changed error
        requestAnimationFrame(() => {
            // initially set the columns
            this._table.setColumns(this.columns);

            // force relayout to occur to ensure the UI is consistent with the internal state
            this.updateLayout();
        });

        // watch for any future changes to the columns
        this.columns.changes.pipe(takeUntil(this._onDestroy)).subscribe(() =>
            requestAnimationFrame(() => this._table.setColumns(this.columns))
        );

        this._initialised = true;
    }

    /** Force the layout to recalculate */
    updateLayout(): void {
        requestAnimationFrame(() => this.columns.forEach((_column, index) => this._table.resizeColumn(index, 0)));
    }

    /** Set all resizable columns to the same width */
    setUniformWidths(): void {
        this._table.setUniformWidths();
    }

    /** Get the smallest tbody width taking into account scrollbars (uxFixedHeaderTable) */
    private getScrollWidth(): number {
        return Array.from((this._elementRef.nativeElement as HTMLTableElement).tBodies)
            .reduce((width, tbody) => Math.min(width, tbody.scrollWidth), (this._elementRef.nativeElement as HTMLTableElement).offsetWidth);
    }
}
