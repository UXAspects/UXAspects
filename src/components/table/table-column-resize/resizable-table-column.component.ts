import { Component, ElementRef, HostBinding, Input } from '@angular/core';
import { ColumnUnit, ResizableTableService } from './resizable-table.service';

@Component({
  selector: '[uxResizableTableColumn]',
  templateUrl: './resizable-table-column.component.html',
  host: {
    class: 'ux-resizable-table-column'
  }
})
export class ResizableTableColumnComponent {

  /** Disabled the column resizing */
  @Input() disabled: boolean = false;

  /** The percentage width of the column */
  @HostBinding('style.width') get width(): string {

    if (!this._table.isInitialised.value) {
      return;
    }

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

  /** Get the minimum width allowed by the column */
  get minWidth(): number {
    // determine the minimum width of the column based on its computed CSS value
    const computed = parseFloat(getComputedStyle(this._elementRef.nativeElement).minWidth);

    // if it is disabled use its current width - otherwise use its CSS min width if it is valid
    return this.disabled ? this._elementRef.nativeElement.offsetWidth : isNaN(computed) ? 0 : computed;
  }

  /** Store the position of the mouse within the drag hanlde */
  private _offset: number;

  constructor(private _elementRef: ElementRef, private _table: ResizableTableService) { }

  /** Get the natural pixel width of the column */
  getNaturalWidth(): number {
    return this._elementRef.nativeElement.offsetWidth;
  }

  /** When the dragging starts */
  onDragStart(event: MouseEvent): void {

    // determine the mouse position within the handle
    this._offset = event.clientX - (event.target as HTMLElement).getBoundingClientRect().left;
  }

  /** When the mouse is moved */
  onDragMove(event: MouseEvent, handle: HTMLDivElement): void {

    // get the current mouse position
    const mouseX = event.pageX - pageXOffset;

    // position of the drag handle
    const { left } = handle.getBoundingClientRect();

    // determine how much the mouse has moved since the last update
    const delta = mouseX - (left + this._offset);

    // perform resizing
    this._table.resizeColumn(this.getCellIndex(), delta);

    this._table.setResizing(true);

  }

  /** When the dragging ends */
  onDragEnd(): void {
    this._table.setResizing(false);
  }

  /** Get the column index this cell is part of */
  private getCellIndex(): number {
    return (this._elementRef.nativeElement as HTMLTableCellElement).cellIndex;
  }
}
