import { Injectable, QueryList } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { ResizableTableColumnComponent } from './resizable-table-column.component';

@Injectable()
export class ResizableTableService {
  /** store the percentage widths of all the columns */
  sizes = new ReplaySubject<ColumnWidths>();

  /** store the table elements for use when calculating widths */
  private _table: HTMLTableElement;

  /** store the column classes */
  private _columns: QueryList<ResizableTableColumnComponent>;

  /** store the column sizes as an accessible object */
  private _sizes: ColumnWidths = {};

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
    this._columns.changes.subscribe(() => this.setInitialWidths());
  }

  /** initially convert the default pixel widths of each column to percentages */
  setInitialWidths(): void {
    // get the table width so we don't have to keep accessing the dom
    const width = this._table.offsetWidth;

    // create a new object containing all column widths
    this._sizes = {};

    // calculate the percentage size of each column
    this._columns.forEach(column =>
      this.setColumnWidth(column, (column.getColumnWidth() / width) * 100)
    );

    // emit the latest column sizes
    this.sizes.next(this._sizes);
  }

  /** apply a resize event to a column */
  resizeColumn(id: string, value: number): void {
    // determine the type of transformation required
    const transformation = this.getColumnTransform(value);

    // get the column being resized
    const column = this.getColumn(id);

    // determine what percentage the movement represents
    const percentage = this.getPercentage(value);

    // get the sibling column that will also be resized
    const sibling = this.getSiblingColumn(column, transformation, percentage);

    // if there is no sibling that can be resized then stop here
    if (!sibling) {
      return;
    }

    // create a new object for the sizes
    const sizes = { ...this._sizes };

    // resize the column to the desired size
    this.setColumnWidth(column, transformation === ColumnTransform.Shrink ? this.getColumnWidth(column) - percentage : this.getColumnWidth(column) + percentage, sizes);
    this.setColumnWidth(sibling, transformation === ColumnTransform.Shrink ? this.getColumnWidth(sibling) + percentage : this.getColumnWidth(sibling) - percentage, sizes);

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

  getColumnWidth(column: ResizableTableColumnComponent, sizes: ColumnWidths = this._sizes): number {
    return sizes[column.id];
  }

  setColumnWidth(column: ResizableTableColumnComponent, width: number, sizes: ColumnWidths = this._sizes): void {
    sizes[column.id] = width;
  }

  isWidthValid(column: ResizableTableColumnComponent, width: number): boolean {
    return width >= this.getPercentage(column.minWidth);
  }

  verifyColumnWidths(adjustableColumn: ResizableTableColumnComponent, sizes: ColumnWidths = this._sizes): void {

    // get the total widths of all columns combined
    const width = Object.keys(sizes).reduce((total, column) => sizes[column] + total, 0);

    // if the width does not total 100% exactly then adjust the column width
    if (width !== 100) {
      this.setColumnWidth(adjustableColumn, this.getColumnWidth(adjustableColumn, sizes) + (100 - width));
    }
  }

  /**
   * Private Methods
   */
  private getPercentage(value: number): number {
    return (Math.abs(value) / this._table.offsetWidth) * 100;
  }

  private getColumn(id: string): ResizableTableColumnComponent {
    return this._columns.find(column => column.id === id);
  }

  private getColumnAtIndex(index: number): ResizableTableColumnComponent | undefined {
    return this._columns.toArray()[index];
  }

  private getSiblingColumn(column: ResizableTableColumnComponent, transformation: ColumnTransform, delta: number): ResizableTableColumnComponent | null {
    // get the index of this column
    const index = this._columns.toArray().indexOf(column);

    // if we are performing an expansion retrieve the sibling
    if (transformation === ColumnTransform.Expand) {
      return this.getResizableColumn(column, Direction.Forwards, delta);
    }

    // check if the current column can't be resized
    if (delta > this.getColumnWidth(column) - this.getPercentage(column.minWidth)) {
      return this.getResizableColumn(column, Direction.Backwards, delta);
    }

    return this.getResizableColumn(column, Direction.Forwards, delta);
  }

  private getResizableColumn(column: ResizableTableColumnComponent, direction: Direction, delta: number): ResizableTableColumnComponent | null {
    // get the index of this column
    const index = this._columns.toArray().indexOf(column);

    // get the sibling in that direction
    const sibling = this.getColumnAtIndex(direction === Direction.Forwards ? index + 1 : index - 1);

    // if there are no more siblings then return null
    if (!sibling) {
      return;
    }

    // check if the sibling can be shrunk - if not check the sibling's sibling
    return (delta <= (this.getColumnWidth(sibling) - this.getPercentage(sibling.minWidth))) ? sibling : this.getResizableColumn(sibling, direction, delta);
  }

  private getColumnTransform(value: number): ColumnTransform {
    return value < 0 ? ColumnTransform.Shrink : ColumnTransform.Expand;
  }
}

/** an object type to contain the column widths */
type ColumnWidths = { [key: string]: number };

/** identify the type of movement required */
enum ColumnTransform {
  Shrink,
  Expand
}

enum Direction {
  Forwards,
  Backwards
}
