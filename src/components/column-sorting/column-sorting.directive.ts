import { Directive, Input, OnDestroy, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';

@Directive({
    selector: '[uxColumnSorting]'
})
export class ColumnSortingDirective implements OnDestroy {

    /** If set to true the column will sort by only this column, removing sorting from all others. */
    @Input() singleSort: boolean;

    /** Provide a custom template for the sort indicator */
    @Input() sortIndicator: TemplateRef<ColumnSortingIndicatorContext>;

    /** Emit the current sort state for all columns within the table */
    events = new Subject<ReadonlyArray<ColumnSortingOrder>>();

    /** Store the current sort state for all columns within the table */
    order: ReadonlyArray<ColumnSortingOrder> = [];

    ngOnDestroy(): void {
        this.events.complete();
    }

    /** Toggle the sorting state of a column */
    toggleColumn(sorting: ColumnSortingOrder): ReadonlyArray<ColumnSortingOrder> {

        // apply sorting based on the single or multiple sort
        this.order = this.singleSort ? this.toggleSingleColumn(sorting) : this.toggleMultipleColumn(sorting);

        // emit the latest order
        this.events.next(this.order);

        return this.order;
    }

    /** Explicitly set the column state */
    setColumnState(key: string, state: ColumnSortingState): void {

        // check if the sorting has actually changed
        if (this.order.find(column => column.key === key && column.state === state)) {
            return;
        }

        // if only one column can be sorted and the current column has a sort direction remove all others
        if (this.singleSort && state !== ColumnSortingState.NoSort) {
            this.order = [];
        } else {
            // remove the item from the state if present
            this.order = this.order.filter(column => column.key !== key);
        }

        // if the column has active sorting then we should add it to the array again
        if (state === ColumnSortingState.Ascending || state === ColumnSortingState.Descending) {
            this.order = [{ key, state }, ...this.order];
        }
    }

    /** Toggle the sorting state of a column when using single select */
    private toggleSingleColumn(sorting: ColumnSortingOrder): ColumnSortingOrder[] {
        return sorting.state === ColumnSortingState.NoSort ? [] : [{ key: sorting.key, state: sorting.state }];
    }

    /** Toggle the sorting state of a column when using multiple select */
    private toggleMultipleColumn(sorting: ColumnSortingOrder): ColumnSortingOrder[] {
        // reorder columns here
        const idx = this.order.findIndex(column => column.key === sorting.key);

        // if wasn't previously selected add to list and it is being sorted
        if (idx === -1 && sorting.state !== ColumnSortingState.NoSort) {
            return [...this.order, { key: sorting.key, state: sorting.state }];
        }

        // if we are sorting it change the sorting order
        if (sorting.state === ColumnSortingState.Ascending || sorting.state === ColumnSortingState.Descending) {
            return [...this.order.filter(_column => _column.key !== sorting.key), { key: sorting.key, state: sorting.state }];
        }

        // Otherwise remove the item
        return this.order.filter(_column => _column.key !== sorting.key);
    }
}

export interface ColumnSortingOrder {
    key: string;
    state: ColumnSortingState;
}

export enum ColumnSortingState {
    Ascending = 'ascending',
    Descending = 'descending',
    NoSort = 'none'
}

export interface ColumnSortingIndicatorContext {
    state: ColumnSortingState;
    order: number;
}