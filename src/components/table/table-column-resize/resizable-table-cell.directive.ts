import { Directive, ElementRef, HostBinding } from '@angular/core';
import { ColumnUnit, ResizableTableService } from './resizable-table.service';

@Directive({
  selector: '[uxResizableTableCell]'
})
export class ResizableTableCellDirective {


  /** The percentage width of the column */
  @HostBinding('style.width') get width(): string {
    return this._table.isResizing ?
      `${this._table.getColumnWidth(this.getCellIndex(), ColumnUnit.Pixel)}px` :
      `${this._table.getColumnWidth(this.getCellIndex(), ColumnUnit.Percentage)}%`;
  }

  /** The flex width of the column */
  @HostBinding('style.flex') get flex(): string {

    // if we are resizing then always return 'none' to allow free movement
    if (this._table.isResizing) {
      return 'none';
    }

    return this._table.isInitialised.value ? `0 1 ${this._table.getColumnWidth(this.getCellIndex(), ColumnUnit.Percentage)}%` : '';
  }

  constructor(private _elementRef: ElementRef, private _table: ResizableTableService) { }

  /** Get the column index this cell is part of */
  private getCellIndex(): number {
    return (this._elementRef.nativeElement as HTMLTableCellElement).cellIndex;
  }
}
