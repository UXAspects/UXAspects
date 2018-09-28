import { OnDestroy, QueryList } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { ResizableTableColumnComponent } from './resizable-table-column.component';
export declare class ResizableTableService implements OnDestroy {
    /** determine whether or not we are currently sizing */
    resizing: boolean;
    /** store the percentage widths of all the columns */
    sizes: ReplaySubject<Map<ResizableTableColumnComponent, number>>;
    /** store the table elements for use when calculating widths */
    private _table;
    /** store the column classes */
    private _columns;
    /** store the column sizes as an accessible object */
    private _sizes;
    /** An observable to unsubscribe others automatically */
    private _onDestroy;
    ngOnDestroy(): void;
    /** a setter to define the table element */
    setTable(table: HTMLTableElement): void;
    /** a setter to define the query list of columns */
    setColumns(columns: QueryList<ResizableTableColumnComponent>): void;
    /** We want to convert all units sizes to pixels to prevent browser jitter */
    startResizing(): void;
    /** Restore values back to percentage values */
    endResizing(): void;
    /** apply a resize event to a column */
    resizeColumn(column: ResizableTableColumnComponent, value: number): void;
    /**
     * Private Methods
     */
    /** initially convert the default pixel widths of each column to percentages */
    private setInitialWidths();
    /** Get the percentage width of a specific column */
    private getColumnWidth(column, sizes?);
    /** Set the percentage width for a specific column */
    private setColumnWidth(column, width, sizes?);
    /** Determine whether a column is above or below its minimum width */
    private isWidthValid(column, width);
    /** Ensure that the total column widths is exactly 100% */
    private verifyColumnWidths(adjustableColumn, sizes?);
    /** Get a column at a given index */
    private getColumnAtIndex(index);
    /** Get the next column in the sequence of columns */
    private getSiblingColumn(column);
}
