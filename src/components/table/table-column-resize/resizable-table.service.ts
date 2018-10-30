import { Injectable, OnDestroy, QueryList } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { ResizableTableColumnComponent } from './resizable-table-column.component';

@Injectable()
export class ResizableTableService implements OnDestroy {

  /** Indicate when the columns are ready */
  isInitialised$ = new BehaviorSubject<boolean>(false);

  /** Determine if we are currently resizing */
  isResizing: boolean = false;

  /** Store the percentage widths of each column */
  columns: ReadonlyArray<number> = [];

  /** Store the current width of the table */
  tableWidth: number = 0;

  /** Emit an event whenever a column is resized */
  onResize$ = new Subject<void>();

  /** Store the QueryList of columns */
  private _columns: QueryList<ResizableTableColumnComponent>;

  /** Cleanup when service is disposed */
  ngOnDestroy(): void {
    this.onResize$.complete();
  }

  /** Store the size of each column */
  setColumns(columns: QueryList<ResizableTableColumnComponent>): void {

    // store the current columns
    this._columns = columns;

    // store the sizes
    this.columns = columns.map(column => (column.getNaturalWidth() / this.tableWidth) * 100);

    // indicate we are now initialised
    if (this.isInitialised$.value === false) {
      this.isInitialised$.next(true);
    }
  }

  /** Update the resizing state */
  setResizing(isResizing: boolean): void {
    this.isResizing = isResizing;
  }

  /** Get the width of a column in a specific unit */
  getColumnWidth(index: number, unit: ColumnUnit, columns: ReadonlyArray<number> = this.columns): number {

    switch (unit) {

      case ColumnUnit.Percentage:
        return columns[index];

      case ColumnUnit.Pixel:
        return (this.tableWidth / 100) * columns[index];
    }

  }

  /** Allow setting the column size in any unit */
  setColumnWidth(index: number, value: number, unit: ColumnUnit, columns: ReadonlyArray<number> = this.columns): ReadonlyArray<number> {

    // create a new array so we keep the instance array immutable
    const sizes = [...columns];

    switch (unit) {

      case ColumnUnit.Percentage:
        sizes[index] = value;
        break;

      case ColumnUnit.Pixel:
        sizes[index] = (value / this.tableWidth) * 100;
        break;
    }

    // update the instance variable
    return sizes;
  }

  /** Resize a column by a specific pixel amount */
  resizeColumn(index: number, delta: number): void {

    // get the sibling column that will also be resized
    const sibling = this.getSiblingColumn(index);

    // if there is no sibling that can be resized then stop here
    if (!sibling) {
      return;
    }

    // create a new array for the sizes
    let columns = [...this.columns] as number[];

    // resize the column to the desired size
    columns = this.setColumnWidth(index, Math.round(this.getColumnWidth(index, ColumnUnit.Pixel) + delta), ColumnUnit.Pixel, columns) as number[];
    columns = this.setColumnWidth(sibling, Math.round(this.getColumnWidth(sibling, ColumnUnit.Pixel) - delta), ColumnUnit.Pixel, columns) as number[];

    // if the move is not possible then stop here
    if (!this.isWidthValid(index, this.getColumnWidth(index, ColumnUnit.Pixel, columns)) || !this.isWidthValid(sibling, this.getColumnWidth(sibling, ColumnUnit.Pixel, columns))) {
      return;
    }

    // check that we add up to exactly 100%
    const total = columns.reduce((count, column) => column + count, 0);

    // if the columns to not add to 100 ensure we make them
    if (total !== 100) {

      // get the column with a variable width
      const target = this.getVariableColumn(100 - total);

      if (target) {
        columns[this._columns.toArray().indexOf(target)] += (100 - total);
      } else {
        columns[index] += (100 - total);
      }
    }

    // store the new sizes
    this.columns = columns;

    // emit the resize event for each column
    this.onResize$.next();
  }

  getVariableColumn(delta: number): ResizableTableColumnComponent | null {

    // get all variable width columns that are not disabled
    const variableColumns = this._columns.filter(column => !column.isFixedWidth && !column.disabled);

    // find one that is greater than its min width by enough
    return variableColumns.reverse().find(column => this.getColumnWidth(column.getCellIndex(), ColumnUnit.Pixel) >= column.minWidth + delta);
  }

  getColumn(index: number): ResizableTableColumnComponent | null {
    return this._columns ? this._columns.toArray()[index] : null;
  }

  getColumnDisabled(index: number): boolean {
    return this.getColumn(index) ? this.getColumn(index).disabled : false;
  }

  /** Determine whether a column is above or below its minimum width */
  private isWidthValid(index: number, width: number): boolean {

    // get the column at a given position
    const column = this.getColumnInstance(index);

    // determine if the specified width is greater than the min width
    return column && width >= column.minWidth;
  }

  /** Get the next column in the sequence of columns */
  private getSiblingColumn(index: number): number | null {

    // find the first sibling that is not disabled
    for (let idx = index + 1; idx < this.columns.length; idx++) {

      const sibling = this.getColumnInstance(idx);

      if (!sibling || !sibling.disabled) {
        return idx;
      }
    }

    return null;
  }

  /** Get the column class from our query list */
  private getColumnInstance(index: number): ResizableTableColumnComponent | null {
    return this._columns ? this._columns.toArray()[index] : null;
  }

}

export enum ColumnUnit {
  Pixel,
  Percentage
}