import { AfterViewInit, ContentChildren, Directive, ElementRef, OnDestroy, QueryList } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { ResizeService } from '../../../directives/resize/index';
import { ResizableTableColumnComponent } from './resizable-table-column.component';
import { ResizableTableService } from './resizable-table.service';

@Directive({
    selector: '[uxResizableTable]',
    providers: [ResizableTableService],
    host: {
        class: 'ux-resizable-table'
    }
})
export class ResizableTableDirective implements AfterViewInit, OnDestroy {

    /** Get all the column headers */
    @ContentChildren(ResizableTableColumnComponent, { descendants: true }) columns: QueryList<ResizableTableColumnComponent>;

    /** Unsubscribe from the observables */
    private _onDestroy = new Subject<void>();

    constructor(private _elementRef: ElementRef, private _table: ResizableTableService, resize: ResizeService) {
        // watch for the table being resized
        resize.addResizeListener(this._elementRef.nativeElement)
            .pipe(takeUntil(this._onDestroy))
            .subscribe(() => _table.tableWidth = this.getScrollWidth());
    }

    /** Once we have the columns make them resizable and watch for changes to columns */
    ngAfterViewInit(): void {

        // ensure we initially set the table width
        this._table.tableWidth = this.getScrollWidth();

        // set the columns - prevent expression changed error
        requestAnimationFrame(() => this._table.setColumns(this.columns));

        // watch for any future changes to the columns
        this.columns.changes.pipe(takeUntil(this._onDestroy)).subscribe(() =>
            requestAnimationFrame(() => this._table.setColumns(this.columns))
        );
    }

    /** Cleanup after the component is destroyed */
    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    /** Get the smallest tbody width taking into account scrollbars (uxFixedHeaderTable) */
    private getScrollWidth(): number {
        return Array.from((this._elementRef.nativeElement as HTMLTableElement).tBodies)
            .reduce((width, tbody) => Math.min(width, tbody.scrollWidth), (this._elementRef.nativeElement as HTMLTableElement).offsetWidth);
    }
}
