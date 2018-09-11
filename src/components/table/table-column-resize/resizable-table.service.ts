import { Injectable, OnDestroy, QueryList } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Subject } from 'rxjs/Subject';
import { ResizableTableColumnComponent } from './resizable-table-column.component';

@Injectable()
export class ResizableTableService implements OnDestroy {

  /** determine whether or not we are currently sizing */
  resizing: boolean = false;

  /** store the percentage widths of all the columns */
  sizes = new ReplaySubject<Map<ResizableTableColumnComponent, number>>();

  /** store the table elements for use when calculating widths */
  private _table: HTMLTableElement;

  /** store the column classes */
  private _columns: QueryList<ResizableTableColumnComponent>;

  /** store the column sizes as an accessible object */
  private _sizes = new Map<ResizableTableColumnComponent, number>();

  /** An observable to unsubscribe others automatically */
  private _onDestroy = new Subject<void>();

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  /** a setter to define the table element */
  setTable(table: HTMLTableElement): void {
    this._table = table;
  }

  /** a setter to define the query list of columns */
  setColumns(columns: QueryList<ResizableTableColumnComponent>): void {
    // store a reference to the columns
    this._columns = columns;

    // set up the initial colums sizes
    this.setInitialWidths();

    // subscribe to future column changes
    this._columns.changes.pipe(takeUntil(this._onDestroy)).subscribe(() => this.setInitialWidths());
  }

  /** We want to convert all units sizes to pixels to prevent browser jitter */
  startResizing(): void {
    this.resizing = true;

    // convert all current percentages into pixel values
    this._sizes.forEach((value, key) => this._sizes.set(key, (this._table.offsetWidth / 100) * value));

    // emit the latest values
    this.sizes.next(this._sizes);
  }

  /** Restore values back to percentage values */
  endResizing(): void {
    this.resizing = false;

    // convert all values back to percentages
    this._sizes.forEach((value, key) => this._sizes.set(key, (value / this._table.offsetWidth) * 100));

    // emit the latest values
    this.sizes.next(this._sizes);
  }

  /** apply a resize event to a column */
  resizeColumn(column: ResizableTableColumnComponent, value: number): void {

    // get the sibling column that will also be resized
    const sibling = this.getSiblingColumn(column);

    // if there is no sibling that can be resized then stop here
    if (!sibling) {
      return;
    }

    // create a new object for the sizes
    const sizes = new Map(this._sizes);

    // resize the column to the desired size
    this.setColumnWidth(column, this.getColumnWidth(column) + Math.round(value), sizes);
    this.setColumnWidth(sibling, this.getColumnWidth(sibling) - Math.round(value), sizes);

    // if the move is not possible then stop here
    if (!this.isWidthValid(column, this.getColumnWidth(column, sizes)) || !this.isWidthValid(sibling, this.getColumnWidth(sibling, sizes))) {
      return;
    }

    // ensure that the column widths total exactly 100%
    this.verifyColumnWidths(sibling, sizes);

    // store the new sizes
    this._sizes = sizes;

    // emit the latest size values
    this.sizes.next(this._sizes);
  }

  /**
   * Private Methods
   */

  /** initially convert the default pixel widths of each column to percentages */
  private setInitialWidths(): void {
    // get the table width so we don't have to keep accessing the dom
    const width = this._table.offsetWidth;

    // create a new object containing all column widths
    this._sizes = new Map();

    // calculate the percentage size of each column
    this._columns.forEach(column =>
      this.setColumnWidth(column, ((column.getColumnWidth() / width) * 100))
    );

    // emit the latest column sizes
    this.sizes.next(this._sizes);
  }

  /** Get the percentage width of a specific column */
  private getColumnWidth(column: ResizableTableColumnComponent, sizes: Map<ResizableTableColumnComponent, number> = this._sizes): number {
    return sizes.get(column);
  }

  /** Set the percentage width for a specific column */
  private setColumnWidth(column: ResizableTableColumnComponent, width: number, sizes: Map<ResizableTableColumnComponent, number> = this._sizes): void {
    sizes.set(column, width);
  }

  /** Determine whether a column is above or below its minimum width */
  private isWidthValid(column: ResizableTableColumnComponent, width: number): boolean {
    return width >= column.minWidth;
  }

  /** Ensure that the total column widths is exactly 100% */
  private verifyColumnWidths(adjustableColumn: ResizableTableColumnComponent, sizes: Map<ResizableTableColumnComponent, number> = this._sizes): void {

    // get the total widths of all columns combined
    const width = Array.from(sizes.values()).reduce((total, column) => column + total, 0);

    // if the width does not total 100% exactly then adjust the column width
    if (width !== this._table.offsetWidth) {
      this.setColumnWidth(adjustableColumn, this.getColumnWidth(adjustableColumn, sizes) + (this._table.offsetWidth - width), sizes);
    }
  }

  /** Get a column at a given index */
  private getColumnAtIndex(index: number): ResizableTableColumnComponent | undefined {
    return this._columns.toArray()[index];
  }

  /** Get the next column in the sequence of columns */
  private getSiblingColumn(column: ResizableTableColumnComponent): ResizableTableColumnComponent | null {
    // get the index of this column
    const index = this._columns.toArray().indexOf(column);

    // find the first sibling that is not disabled
    for (let idx = index + 1; idx < this._columns.length; idx++) {
      const sibling = this.getColumnAtIndex(idx);

      if (!sibling.disabled) {
        return sibling;
      }
    }

    return null;
  }
}