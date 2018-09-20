import { Component, ElementRef, HostBinding, Input, OnDestroy } from '@angular/core';
import { distinctUntilChanged, map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { tick } from '../../../common/index';
import { ResizableTableService } from './resizable-table.service';

@Component({
  selector: '[uxResizableTableColumn]',
  templateUrl: './resizable-table-column.component.html',
  host: {
    class: 'ux-resizable-table-column'
  }
})
export class ResizableTableColumnComponent implements OnDestroy {

  @Input() disabled: boolean = false;

  /** The percentage width of the column */
  @HostBinding('style.width') get width(): string {
    return this.table.resizing ? `${this._width}px` : `${this._width}%`;
  }

  get minWidth(): number {
    return this.disabled ? this._elementRef.nativeElement.offsetWidth : parseFloat(getComputedStyle(this._elementRef.nativeElement).minWidth);
  }

  private _width: number;

  /** Ensure observables get destroyed correctly */
  private _onDestroy = new Subject<void>();

  constructor(public table: ResizableTableService, private _elementRef: ElementRef) { }

  getColumnWidth(): number {
    return this._elementRef.nativeElement.offsetWidth;
  }

  ngOnInit(): void {
    this.table.sizes.pipe(
      map(sizes => sizes.get(this)),
      distinctUntilChanged(),
      takeUntil(this._onDestroy),
      tick() // prevents expression has changed error
    ).subscribe((width: number) => this._width = width);
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  dragstart(): void {
    this.table.startResizing();
  }

  drag(event: MouseEvent, handle: HTMLDivElement): void {

    // get the current mouse position
    const mouseX = event.pageX - pageXOffset;

    // position of the drag handle
    const { left, width } = handle.getBoundingClientRect();

    // determine how much the mouse has moved since the last update
    const movement = mouseX - (left + (width / 2));

    // perform resizing
    this.table.resizeColumn(this, movement);
  }

  dragend(): void {
    this.table.endResizing();
  }

}