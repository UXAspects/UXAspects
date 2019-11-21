import { Injectable, QueryList } from '@angular/core';
import { ResizableTableColumnComponent } from '../resizable-table-column.component';
import { BaseResizableTableService, ResizableTableType } from '../resizable-table-base.service';

@Injectable()
export class ResizableTableService extends BaseResizableTableService {

    /** Define the type of resizing we should use */
    type: ResizableTableType = ResizableTableType.Standard;

    /** Store the QueryList of columns */
    private _columns: QueryList<ResizableTableColumnComponent>;

    /** Store the size of each column */
    setColumns(columns: QueryList<ResizableTableColumnComponent>): void {

        // store the current columns
        this._columns = columns;

        // store the sizes
        this.columns = columns.map(column => (column.getNaturalWidth() / this.tableWidth) * 100);

        // check if there is any overflow
        this.columns = this.ensureNoOverflow(this.columns);

        // ensure all the columns fit
        this._columns.forEach((column, idx) => {
            if (!column.disabled) {
                this.resizeColumn(idx, 0, false);
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

        if (totalWidth > 100) {
            // remove overflow
            this.columns = this.ensureNoOverflow(this.columns);
        } else {
            // get the list of resizable columns
            const resizableColumns = this._columns.toArray().filter(column => !column.disabled);

            // work out what we need to add to each column to make up the full width
            const newWidth = (100 - totalWidth) / resizableColumns.length;

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

            if (target && !isDragging) {
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