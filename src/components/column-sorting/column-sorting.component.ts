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

    @Input() state: ColumnSortingState;
    @Input() key: string;
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
                this.state = ColumnSortingState.None;
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
                this.state = ColumnSortingState.None;
                break;

            default:
                this.state = ColumnSortingState.Ascending;
        }

        // inform parent
        return this._columnSorter.toggleColumn({ key: this.key, state: this.state });
    }
}