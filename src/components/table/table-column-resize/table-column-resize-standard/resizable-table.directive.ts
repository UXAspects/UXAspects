import { ContentChildren, Directive, ElementRef, Inject, QueryList, Renderer2 } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { ResizeService } from '../../../../directives/resize/index';
import { ResizableTableColumnComponent } from '../resizable-table-column.component';
import { ResizableTableService } from './resizable-table.service';
import { RESIZEABLE_TABLE_SERVICE_TOKEN } from '../resizable-table-service.token';
import { BaseResizableTableDirective } from '../resizable-table-base.directive';

@Directive({
    selector: '[uxResizableTable]',
    exportAs: 'ux-resizable-table',
    providers: [
        {
            provide: RESIZEABLE_TABLE_SERVICE_TOKEN,
            useClass: ResizableTableService
        }
    ],
    host: {
        class: 'ux-resizable-table'
    }
})

export class ResizableTableDirective extends BaseResizableTableDirective {

    /** Get all the column headers */
    @ContentChildren(ResizableTableColumnComponent, { descendants: true }) columns: QueryList<ResizableTableColumnComponent>;

    constructor(elementRef: ElementRef<HTMLTableElement>, @Inject(RESIZEABLE_TABLE_SERVICE_TOKEN) table: ResizableTableService, renderer: Renderer2, resize: ResizeService) {
        super(elementRef, table, renderer, resize);
        // we should hide any horizontal overflow when we are resizing
        this._table.isResizing$.pipe(takeUntil(this._onDestroy)).subscribe(this.setOverflow.bind(this));
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

    /**
     * We should hide any horizontal overflow whenever we are resizing, this is because when we are dragging a column
     * we must set the column widths in pixel values as percentages cause some jankiness when moving them. However pixel
     * values are less precise and can in some cases cause overflow, so we should hide overflow when we are resizing
     */
    private setOverflow(isResizing: boolean): void {
        Array.from((this._elementRef.nativeElement as HTMLTableElement).tBodies)
            .forEach(tbody => this._renderer.setStyle(tbody, 'overflow-x', isResizing ? 'hidden' : null));
    }
}
