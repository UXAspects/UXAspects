import { Directive, ElementRef, inject, OnDestroy, QueryList, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ResizeService } from '../../../directives/resize';
import { BaseResizableTableService } from './resizable-table-base.service';
import { ResizableTableColumnComponent } from './resizable-table-column.component';
import { RESIZABLE_TABLE_SERVICE_TOKEN } from './resizable-table-service.token';

@Directive()
export abstract class BaseResizableTableDirective implements OnDestroy {
    protected readonly _table = inject<BaseResizableTableService>(RESIZABLE_TABLE_SERVICE_TOKEN);

    protected readonly _elementRef = inject<ElementRef<HTMLTableElement>>(ElementRef);

    protected readonly _renderer = inject(Renderer2);

    readonly resize = inject(ResizeService);

    columns: QueryList<ResizableTableColumnComponent>;

    /** Unsubscribe from the observables */
    protected _onDestroy = new Subject<void>();

    /** Store the initialised state of the table */
    protected _initialised: boolean = false;

    constructor() {
        // watch for the table being resized
        this.resize.addResizeListener(this._elementRef.nativeElement).pipe(takeUntil(this._onDestroy)).subscribe(() => {
            // store the latest table size
            this._table.tableWidth = this.getScrollWidth();

            // run the initial logic if the table is fully visible
            this.onTableReady();
        });
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
