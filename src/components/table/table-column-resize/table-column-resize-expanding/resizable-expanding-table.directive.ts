import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, ContentChildren, Directive, ElementRef, Inject, PLATFORM_ID, QueryList, Renderer2 } from '@angular/core';
import { fromEvent, merge } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ResizeService } from '../../../../directives/resize/index';
import { BaseResizableTableDirective } from '../resizable-table-base.directive';
import { ResizableTableColumnComponent } from '../resizable-table-column.component';
import { RESIZABLE_TABLE_SERVICE_TOKEN } from '../resizable-table-service.token';
import { ResizableExpandingTableService } from './resizable-expanding-table.service';

@Directive({
    selector: '[uxResizableExpandingTable]',
    exportAs: 'ux-resizable-expanding-table',
    providers: [
        {
            provide: RESIZABLE_TABLE_SERVICE_TOKEN,
            useClass: ResizableExpandingTableService
        }
    ],
    host: {
        'class': 'ux-resizable-expanding-table',
        '[class.ux-resizable-expanding-table-overflow]': '_overflowX'
    }
})
export class ResizableExpandingTableDirective extends BaseResizableTableDirective implements AfterViewInit {

    /** Get all the column headers */
    @ContentChildren(ResizableTableColumnComponent, { descendants: true }) columns: QueryList<ResizableTableColumnComponent>;

    /** Has horizontal overflow */
    _overflowX: boolean = false;

    constructor(elementRef: ElementRef<HTMLTableElement>, @Inject(RESIZABLE_TABLE_SERVICE_TOKEN) table: ResizableExpandingTableService, renderer: Renderer2, resize: ResizeService, @Inject(PLATFORM_ID) private _platformId: Object) {
        super(elementRef, table, renderer, resize);
    }

    ngAfterViewInit(): void {

        if (isPlatformBrowser(this._platformId)) {

            const tableHeaders = this._elementRef.nativeElement.querySelectorAll('thead > tr');

            for (const body of Array.from(this._elementRef.nativeElement.tBodies)) {
                fromEvent(body, 'scroll').pipe(takeUntil(this._onDestroy)).subscribe(() => {
                    Array.from(tableHeaders).forEach(thead => this._renderer.setStyle(thead, 'margin-left', `-${body.scrollLeft}px`));
                });
            }

            /** checks if the table is resizing and allows for a class to be added for when moving from
             overflow to no overflow */
            merge(this._table.onResize$, this.columns.changes).pipe(takeUntil(this._onDestroy)).subscribe(() => {
                this._overflowX = this._elementRef.nativeElement.tBodies[0].scrollWidth > this._elementRef.nativeElement.tBodies[0].offsetWidth;
            });
        }
    }

    /**
     * If this is being used within a modal the table width may initially be zero. This can cause some issues when it does actually appear
     * visibily on screen. We should only setup the table once we actually have a width/
     */
    onTableReady(): void {

        // if we have already initialised or the table width is currently 0 then do nothing
        if (this._initialised || this.getScrollWidth() === 0) {

            // if the table has been initialized but the width is now 0
            // for example, due to the element being hidden (eg. in a collapsed accordion)
            // we would need to re-run this logic whenever the width is back over 0
            // to do this we can mark the table as not having been initialized
            if (this._initialised && this.getScrollWidth() === 0) {
                this._initialised = false;
            }

            return;
        }

        // ensure we initially set the table width
        this._table.tableWidth = this.getScrollWidth();

        // set the columns - prevent expression changed error
        Promise.resolve().then(() => {
            // initially set the columns
            this._table.setColumns(this.columns);

            // force relayout to occur to ensure the UI is consistent with the internal state
            this.updateLayout();
        });

        // watch for any future changes to the columns
        this.columns.changes.pipe(takeUntil(this._onDestroy)).subscribe(() =>
            Promise.resolve().then(() => this._table.setColumns(this.columns))
        );

        this._initialised = true;
    }

    /** Force the layout to recalculate */
    updateLayout(): void {
        Promise.resolve().then(() => this.columns.forEach((_column, index) => this._table.resizeColumn(index, 0)));
    }

}
