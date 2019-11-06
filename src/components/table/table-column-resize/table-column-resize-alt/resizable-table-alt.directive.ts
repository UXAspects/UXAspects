import { AfterViewInit, ContentChildren, Directive, ElementRef, Inject, OnDestroy, PLATFORM_ID, QueryList, Renderer2 } from '@angular/core';
import { ResizeService } from '../../../../directives/resize/index';
import { RESIZEABLE_TABLE_SERVICE_TOKEN } from '../resizable-table-service.token';
import { ResizableTableAltService } from './resizable-table-alt.service';
import { ResizableTableColumnComponent } from '../resizable-table-column.component';
import { BaseResizableTableDirective } from '../resizable-table-base.directive';
import { takeUntil } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Directive({
    selector: '[uxResizableTableAlt]',
    exportAs: 'ux-resizable-table-alt',
    providers: [
        {
            provide: RESIZEABLE_TABLE_SERVICE_TOKEN,
            useClass: ResizableTableAltService
        }
    ],
    host: {
        'class': 'ux-resizable-table-alt',
        '[class.ux-resizable-table-alt-overflow]': '_overflowX'
    }
})
export class ResizableTableAltDirective extends BaseResizableTableDirective implements AfterViewInit, OnDestroy {

    /** Get all the column headers */
    @ContentChildren(ResizableTableColumnComponent, { descendants: true }) columns: QueryList<ResizableTableColumnComponent>;

    /** Has horizontal overflow */
    _overflowX: boolean = false;

    constructor(elementRef: ElementRef<HTMLTableElement>, @Inject(RESIZEABLE_TABLE_SERVICE_TOKEN) table: ResizableTableAltService, renderer: Renderer2, resize: ResizeService, @Inject(PLATFORM_ID) private _platformId: Object) {
        super(elementRef, table, renderer, resize);
    }

    ngAfterViewInit(): void {
        super.ngAfterViewInit();

        if (isPlatformBrowser(this._platformId)) {

            const tableHeaders = this._elementRef.nativeElement.querySelectorAll('thead > tr');

            for (const body of Array.from(this._elementRef.nativeElement.tBodies)) {
                fromEvent(body, 'scroll').pipe(takeUntil(this._onDestroy)).subscribe(() => {
                    Array.from(tableHeaders).forEach(thead => this._renderer.setStyle(thead, 'margin-left', `-${body.scrollLeft}px`));
                });
            }

            /** checks if the table is resizing and allows for a class to be added for when moving from
             overflow to no overflow */
            this._table.onResize$.pipe(takeUntil(this._onDestroy)).subscribe(() => {
                this._overflowX = this._elementRef.nativeElement.tBodies[0].scrollWidth > this._elementRef.nativeElement.tBodies[0].offsetWidth;
            });

        }

    }

    ngOnDestroy(): void {
        /** destroying watching for resizing */
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

}