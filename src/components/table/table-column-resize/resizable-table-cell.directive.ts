import { Directive, ElementRef, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { combineLatest, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ColumnUnit } from './table-column-resize-standard/resizable-table.service';
import { RESIZEABLE_TABLE_SERVICE_TOKEN } from './resizable-table-service.token';
import { BaseResizableTableService, ResizableTableType } from './resizable-table-base.service';

@Directive({
    selector: '[uxResizableTableCell]'
})
export class ResizableTableCellDirective implements OnInit, OnDestroy {

    /** Unsubscribe from all subscriptions on destroy */
    private readonly _onDestroy = new Subject<void>();

    constructor(private _elementRef: ElementRef, private _renderer: Renderer2, @Inject(RESIZEABLE_TABLE_SERVICE_TOKEN) private _table: BaseResizableTableService) { }

    ngOnInit(): void {
        // update the sizes when columns are resized
        combineLatest([this._table.onResize$, this._table.isResizing$]).pipe(takeUntil(this._onDestroy)).subscribe(() => {
            this.setColumnWidth();
            this.setColumnFlex();
        });
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    /** Get the column index this cell is part of */
    private getCellIndex(): number {
        return (this._elementRef.nativeElement as HTMLTableCellElement).cellIndex;
    }

    /** Set the width of the column */
    private setColumnWidth(): void {
        const width = this._table.isResizing$.value || this._table.getColumnDisabled(this.getCellIndex()) ?
            `${this._table.getColumnWidth(this.getCellIndex(), ColumnUnit.Pixel)}px` :
            `${this._table.getColumnWidth(this.getCellIndex(), ColumnUnit.Percentage)}%`;

        if (this._table.type === ResizableTableType.Alt) {
            this._renderer.setStyle(this._elementRef.nativeElement, 'min-width', `${this._table.getColumnWidth(this.getCellIndex(), ColumnUnit.Pixel)}px`);
        }

        this._renderer.setStyle(this._elementRef.nativeElement, 'width', width);
    }

    /** Set the flex value of the column */
    private setColumnFlex(): void {
        // if we are resizing then always return 'none' to allow free movement
        if (this._table.isResizing$.value || this._table.getColumnDisabled(this.getCellIndex())) {
            this._renderer.setStyle(this._elementRef.nativeElement, 'flex', 'none');
            return;
        }

        const flex = this._table.isInitialised$.value ? `0 1 ${this._table.getColumnWidth(this.getCellIndex(), ColumnUnit.Percentage)}%` : '';

        this._renderer.setStyle(this._elementRef.nativeElement, 'flex', flex);
    }
}
