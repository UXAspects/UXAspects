import { Component, ElementRef, HostBinding, Input, OnDestroy } from '@angular/core';
import { distinctUntilChanged, pluck, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { ResizableTableService } from './resizable-table.service';

@Component({
  selector: '[uxResizableTableColumn]',
  templateUrl: './resizable-table-column.component.html',
  host: {
    class: 'ux-resizable-table-column'
  }
})
export class ResizableTableColumnComponent implements OnDestroy {

  /** The column identifier */
  @Input('uxResizableTableColumn') id: string;

  /** The percentage width of the column */
  @HostBinding('style.width.%') width: number = null;

  get minWidth(): number {
    return parseFloat(getComputedStyle(this._elementRef.nativeElement).minWidth);
  }

  /** Ensure observables get destroyed correctly */
  private _onDestroy = new Subject<void>();

  constructor(public table: ResizableTableService, private _elementRef: ElementRef<HTMLTableHeaderCellElement>) { }

  getColumnWidth(): number {
    return this._elementRef.nativeElement.offsetWidth;
  }

  ngOnInit(): void {
    this.table.sizes.pipe(
      pluck(this.id),
      distinctUntilChanged(),
      takeUntil(this._onDestroy)
    ).subscribe((width: number) => this.width = width);
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  drag(event: MouseEvent, handle: HTMLDivElement): void {

    // get the current mouse position
    const mouseX = event.pageX - pageXOffset;

    // position of the drag handle
    const { left, width } = handle.getBoundingClientRect();

    // determine how much the mouse has moved since the last update
    const movement = mouseX - (left + (width / 2));

    // perform resizing
    this.table.resizeColumn(this.id, movement);
  }

}