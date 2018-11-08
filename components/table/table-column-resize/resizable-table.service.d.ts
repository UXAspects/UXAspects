import { OnDestroy, QueryList } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { ResizableTableColumnComponent } from './resizable-table-column.component';
export declare class ResizableTableService implements OnDestroy {
    /** Indicate when the columns are ready */
    isInitialised$: BehaviorSubject<boolean>;
    /** Determine if we are currently resizing */
    isResizing: boolean;
    /** Store the percentage widths of each column */
    columns: ReadonlyArray<number>;
    /** Store the current width of the table */
    tableWidth: number;
    /** Emit an event whenever a column is resized */
    onResize$: Subject<void>;
    /** Store the QueryList of columns */
    private _columns;
    /** Cleanup when service is disposed */
    ngOnDestroy(): void;
    /** Store the size of each column */
    setColumns(columns: QueryList<ResizableTableColumnComponent>): void;
    /** Update the resizing state */
    setResizing(isResizing: boolean): void;
    /** Get the width of a column in a specific unit */
    getColumnWidth(index: number, unit: ColumnUnit, columns?: ReadonlyArray<number>): number;
    /** Allow setting the column size in any unit */
    setColumnWidth(index: number, value: number, unit: ColumnUnit, columns?: ReadonlyArray<number>): ReadonlyArray<number>;
    /** Resize a column by a specific pixel amount */
    resizeColumn(index: number, delta: number, isDragging?: boolean): void;
    getVariableColumn(delta: number): ResizableTableColumnComponent | null;
    getColumn(index: number): ResizableTableColumnComponent | null;
    getColumnDisabled(index: number): boolean;
    /** Determine whether a column is above or below its minimum width */
    private isWidthValid(index, width);
    /** Get the next column in the sequence of columns */
    private getSiblingColumn(index);
    /** Get the column class from our query list */
    private getColumnInstance(index);
}
export declare enum ColumnUnit {
    Pixel = 0,
    Percentage = 1,
}
