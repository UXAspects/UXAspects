import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { combineLatest, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ResizableTableType } from './resizable-table-base.service';
import { RESIZABLE_TABLE_SERVICE_TOKEN } from './resizable-table-service.token';
import { ColumnUnit } from './table-column-resize-standard/resizable-table.service';

@Component({
  selector: '[uxResizableTableCell]',
  templateUrl: './resizable-table-cell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ResizableTableCellComponent implements OnInit, OnDestroy {
  private readonly _table = inject(RESIZABLE_TABLE_SERVICE_TOKEN);

  private readonly _elementRef = inject(ElementRef);

  private readonly _renderer = inject(Renderer2);

  /** Unsubscribe from all subscriptions on destroy */
  private readonly _onDestroy = new Subject<void>();

  /** Min width of the column*/
  private _minWidth: number;

  ngOnInit(): void {
    this._minWidth = parseFloat(getComputedStyle(this._elementRef.nativeElement).minWidth);

    // if the table has already been initialised then we should set the initial size
    if (this._table.isInitialised$.value) {
      this.setColumnWidth();
      this.setColumnFlex();
    }

    // update the sizes when columns are resized
    combineLatest([this._table.onResize$, this._table.isResizing$])
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
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
    const width =
      this._table.isResizing$.value || this._table.getColumnDisabled(this.getCellIndex())
        ? `${this._table.getColumnWidth(this.getCellIndex(), ColumnUnit.Pixel)}px`
        : `${this._table.getColumnWidth(this.getCellIndex(), ColumnUnit.Percentage)}%`;

    if (this._table.type === ResizableTableType.Expand) {
      const minWidth = Math.max(
        this._table.getColumnWidth(this.getCellIndex(), ColumnUnit.Pixel),
        this._minWidth
      );
      this._renderer.setStyle(this._elementRef.nativeElement, 'min-width', `${minWidth}px`);
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

    const flex = this._table.isInitialised$.value
      ? `0 1 ${this._table.getColumnWidth(this.getCellIndex(), ColumnUnit.Percentage)}%`
      : '';

    this._renderer.setStyle(this._elementRef.nativeElement, 'flex', flex);
  }
}
