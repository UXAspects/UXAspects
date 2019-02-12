import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { ColumnSortingDirective, ColumnSortingOrder, ColumnSortingState } from './column-sorting.directive';

@Component({
    selector: 'ux-column-sorting',
    templateUrl: './column-sorting.component.html',
    exportAs: 'ux-column-sorting'
})
export class ColumnSortingComponent implements OnDestroy {

    /** Defines the sorting order of a column: `NoSort`, `Ascending` or `Descending`. */
    @Input() state: ColumnSortingState;

    /** Defines a unique identifier for the column that can be used when sorting. */
    @Input() key: string;

    /**
     * Changes the state of the sorting on the column between `NoSort`, `Ascending` and `Descending`.
     * This returns an array of objects for each column being sorted containing `key: string` and `state: ColumnSortingState`.
     * State can be used to find the current sorting state of the column eg. `(state === ColumnSortingState.Ascending)`.
     * The `ColumnSortingOrder` interface has been provided for objects in the array.
     */
    @Output() stateChange = new EventEmitter<ColumnSortingState>();

    order: number;
    columnSortingState = ColumnSortingState;

    private _onDestroy = new Subject<void>();

    constructor(private _columnSorter: ColumnSortingDirective) {
        this._columnSorter.events.pipe(takeUntil(this._onDestroy)).subscribe(event => {

            // if we are sorting this column then find the matching data
            const columnIdx = event.findIndex(_column => _column.key === this.key);

            // if we are not sorting this column then mark it as NoSort
            if (columnIdx === -1) {
                this.state = ColumnSortingState.NoSort;
            }

            // only store the number if we have 2 or more columns being sorted
            this.order = event.length < 2 || columnIdx === -1 ? null : columnIdx + 1;

            // Emit the latest change
            this.stateChange.emit(this.state);
        });
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    changeState(): ColumnSortingOrder[] {

        switch (this.state) {

            case ColumnSortingState.Ascending:
                this.state = ColumnSortingState.Descending;
                break;

            case ColumnSortingState.Descending:
                this.state = ColumnSortingState.NoSort;
                break;

            default:
                this.state = ColumnSortingState.Ascending;
        }

        // inform parent
        return this._columnSorter.toggleColumn({ key: this.key, state: this.state });
    }
}