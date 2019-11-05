import { BehaviorSubject, Subject } from 'rxjs';
import { OnDestroy, QueryList } from '@angular/core';
import { ResizableTableColumnComponent } from './resizable-table-column.component';

export abstract class BaseResizableTableService implements OnDestroy {

    abstract type: ResizableTableType;

    /** Emit an event whenever a column is resized */
    onResize$ = new Subject<void>();

    /** Store the current width of the table */
    tableWidth: number = 0;

    /** Determine if we are currently resizing */
    isResizing$ = new BehaviorSubject<boolean>(false);

    /** Indicate when the columns are ready */
    isInitialised$ = new BehaviorSubject<boolean>(false);

    /** Store the percentage widths of each column */
    columns: ReadonlyArray<number> = [];

    abstract resizeColumn(index: number, delta: number, isDragging?: boolean): void;

    abstract setColumns(columns: QueryList<ResizableTableColumnComponent>): void;

    abstract setUniformWidths(): void;

    abstract getColumnDisabled(index: number): boolean;

    /** Cleanup when service is disposed */
    ngOnDestroy(): void {
        this.onResize$.complete();
    }

    /** Update the resizing state */
    setResizing(isResizing: boolean): void {
        this.isResizing$.next(isResizing);
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

}

export enum ColumnUnit {
    Pixel,
    Percentage
}

export enum ResizableTableType {
    Standard,
    Alt
}