import { Injectable, QueryList } from '@angular/core';
import { BaseResizableTableService, ResizableTableType } from '../resizable-table-base.service';
import { ResizableTableColumnComponent } from '../resizable-table-column.component';

@Injectable()
export class ResizableExpandingTableService extends BaseResizableTableService {

    /** Define the type of resizing we should use */
    type: ResizableTableType = ResizableTableType.Expand;

    /** Store the QueryList of columns */
    private _columns: QueryList<ResizableTableColumnComponent>;

    /** Store the size of each column */
    setColumns(columns: QueryList<ResizableTableColumnComponent>): void {

        // store the current columns
        this._columns = columns;

        // store the sizes
        this.columns = columns.map(column => (column.getNaturalWidth() / this.tableWidth) * 100);

        // ensure all the columns fit
        this._columns.forEach((column, idx) => {
            if (!column.disabled) {
                this.columns = this.setColumnWidth(idx, this.columns[idx], ColumnUnit.Percentage, this.columns);
            }
        });

        // indicate we are now initialised
        if (this.isInitialised$.value === false) {
            this.isInitialised$.next(true);
        }
    }

    /** Set all resizable columns to the same width */
    setUniformWidths(): void {

        // set any disabled columns to their specified width
        this.columns = this._columns.map(column => column.disabled ? (column.getNaturalWidth() / this.tableWidth) * 100 : 0);

        // check to see if we've reached 100% of the table width
        const totalWidth = this.columns.reduce((partial, columnWidth) => partial + columnWidth);

        if (totalWidth > 98) {
            // remove overflow
            this.columns = this.ensureNoOverflow(this.columns);
        } else {
            // get the list of resizable columns
            const resizableColumns = this._columns.toArray().filter(column => !column.disabled);

            // work out what we need to add to each column to make up the full width
            const newWidth = (98 - totalWidth) / resizableColumns.length;

            // set the non-disabled columns to the new width
            this.columns = this._columns.map((column, idx) => column.disabled ? this.columns[idx] : newWidth);
        }

        // do the resizing
        this._columns.forEach((column, idx) => {
            if (!column.disabled) {
                this.resizeColumn(idx, 0, false);
            }
        });

    }

    ensureNoOverflow(columns: ReadonlyArray<number>): ReadonlyArray<number> {

        // get the total width
        const total = columns.reduce((width, column) => width + column);

        // if we have no overflow then we don't need to do anything
        if (total <= 100) {
            return columns;
        }

        // if there is overflow identify which columns can be resized
        const variableColumns = this._columns.filter(column => !column.disabled && this.getColumnWidth(column.getCellIndex(), ColumnUnit.Pixel, columns) > column.minWidth);

        // if there are no columns that can be resized then stop here
        if (variableColumns.length === 0) {
            return columns;
        }

        // determine the total width of the variable columns
        const totalWidth = this._columns.reduce((width, column) => width + this.getColumnWidth(column.getCellIndex(), ColumnUnit.Pixel, columns), 0);

        // determine to the width of all the variable columns
        const variableColumnsWidth = variableColumns.reduce((width, column) => width + this.getColumnWidth(column.getCellIndex(), ColumnUnit.Pixel, columns), 0);

        // determine how much the columns are currently too large (ignoring fixed columns)
        const targetWidth = this.tableWidth - (totalWidth - variableColumnsWidth);

        // determine how much we need to reduce a column by
        const difference = variableColumnsWidth - targetWidth;

        // find the column with the largest size
        const target = variableColumns.reduce((widest, column) => {
            const columnWidth = this.getColumnWidth(column.getCellIndex(), ColumnUnit.Pixel, columns);
            const widestWidth = this.getColumnWidth(widest.getCellIndex(), ColumnUnit.Pixel, columns);

            return columnWidth > widestWidth ? column : widest;
        });

        // perform the resize
        columns = this.setColumnWidth(target.getCellIndex(), this.getColumnWidth(target.getCellIndex(), ColumnUnit.Pixel, columns) - difference, ColumnUnit.Pixel, columns);

        // check if we are still over the limit (allow some variance for javascript double precision)
        if (columns.reduce((width, column) => width + column) > 100.01) {
            return this.ensureNoOverflow(columns);
        }

        return columns;
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
    resizeColumn(index: number, delta: number, isDragging: boolean = true): void {

        let columns = [...this.columns] as ReadonlyArray<number>;

        // convert the delta to a percentage value
        const percentageDelta = (delta / this.tableWidth) * 100;

        columns = this.setColumnWidth(index, this.columns[index] + percentageDelta, ColumnUnit.Percentage, this.columns);

        this.columns = columns;

        // emit the resize event for each column
        this.onResize$.next();
    }

    getColumn(index: number): ResizableTableColumnComponent | null {
        return this._columns ? this._columns.toArray()[index] : null;
    }

    getColumnDisabled(index: number): boolean {
        return this.getColumn(index) ? this.getColumn(index).disabled : false;
    }

}

export enum ColumnUnit {
    Pixel,
    Percentage
}