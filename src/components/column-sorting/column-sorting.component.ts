import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ColumnSortingDirective, ColumnSortingIndicatorContext, ColumnSortingOrder, ColumnSortingState } from './column-sorting.directive';

@Component({
    selector: 'ux-column-sorting',
    templateUrl: './column-sorting.component.html',
    exportAs: 'ux-column-sorting',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColumnSortingComponent implements OnInit, OnChanges, OnDestroy {

    /** Defines the sorting order of a column: `NoSort`, `Ascending` or `Descending`. */
    @Input() state: ColumnSortingState = ColumnSortingState.NoSort;

    /** Defines a unique identifier for the column that can be used when sorting. */
    @Input() key: string;

    /** Store the order of the sorting - used when multiple columns are being sorted at once */
    @Input() order: number;

    /** Determine if a column can have a `NoSort` state */
    @Input() allowNoSort: boolean = true;

    /** Specifies name of the ascending icon */
    @Input() ascendingIcon: string = 'ascend';

    /** Specifies name of the descending icon */
    @Input() descendingIcon: string = 'descend';

    /**
     * Changes the state of the sorting on the column between `NoSort`, `Ascending` and `Descending`.
     * This returns an array of objects for each column being sorted containing `key: string` and `state: ColumnSortingState`.
     * State can be used to find the current sorting state of the column eg. `(state === ColumnSortingState.Ascending)`.
     * The `ColumnSortingOrder` interface has been provided for objects in the array.
     */
    @Output() stateChange = new EventEmitter<ColumnSortingState>();

    /** Emit whenever the order changes */
    @Output() orderChange = new EventEmitter<number>();

    /** Expose the sorting state enum to the view */
    ColumnSortingState = ColumnSortingState;

    /** Access the custom sort indicator if one was provided */
    get _sortIndicator(): TemplateRef<ColumnSortingIndicatorContext> {
        return this._sorter.sortIndicator;
    }

    /** Unsubscribe from all observables on component destroy */
    private _onDestroy$ = new Subject<void>();

    constructor(private readonly _sorter: ColumnSortingDirective,
        private readonly _changeDetector: ChangeDetectorRef) {
    }

    ngOnInit(): void {
        // listen for changes triggered by the directive
        this._sorter.events.pipe(takeUntil(this._onDestroy$))
            .subscribe(columns => this.updateState(columns));
    }

    ngOnChanges(changes: SimpleChanges): void {
        // if the state input is changed then apply the change
        if (changes.state && changes.state.currentValue !== changes.state.previousValue) {
            this._sorter.setColumnState(this.key, this.state);
        }
    }

    ngOnDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }

    /** Toggle the sorting state of a column - this is designed to be programmatically called by the consuming component */
    changeState(): ColumnSortingOrder[] {

        switch (this.state) {

            case ColumnSortingState.Ascending:
                this.state = ColumnSortingState.Descending;
                break;

            case ColumnSortingState.Descending:
                this.state = this.allowNoSort ? ColumnSortingState.NoSort : ColumnSortingState.Ascending;
                break;

            default:
                this.state = ColumnSortingState.Ascending;
        }

        // change detection should be run
        this._changeDetector.markForCheck();

        // inform parent (internally we use a ReadonlyArray but are returning a standard array to prevent breaking changes to the public API)
        return this._sorter.toggleColumn({ key: this.key, state: this.state }) as ColumnSortingOrder[];
    }

    /** Update the state based on column order */
    private updateState(columns: ReadonlyArray<ColumnSortingOrder>): void {
        // if we are sorting this column then find the matching data
        const columnIdx = columns.findIndex(_column => _column.key === this.key);

        // if we are not sorting this column then mark it as NoSort
        if (columnIdx === -1) {
            this.state = ColumnSortingState.NoSort;
        }

        // only store the number if we have 2 or more columns being sorted
        this.order = columns.length < 2 || columnIdx === -1 ? null : columnIdx + 1;

        // emit the latest order value
        if (typeof this.order === 'number') {
            this.orderChange.emit(this.order);
        }

        // change detection should be run
        this._changeDetector.markForCheck();

        // Emit the latest change
        this.stateChange.emit(this.state);
    }
}
