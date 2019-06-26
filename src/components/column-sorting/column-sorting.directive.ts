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
    events = new Subject<ColumnSortingOrder[]>();

    /** Store the current sort state for all columns within the table */
    order: ColumnSortingOrder[] = [];

    ngOnDestroy(): void {
        this.events.complete();
    }

    /** Toggle the sorting state of a column */
    toggleColumn(sorting: ColumnSortingOrder): ColumnSortingOrder[] {

        // apply sorting based on the single or multiple sort
        this.order = this.singleSort ? this.toggleSingleColumn(sorting) : this.toggleMultipleColumn(sorting);

        // emit the latest order
        this.events.next(this.order);

        return this.order;
    }

    /** Toggle the sorting state of a column when using single select */
    private toggleSingleColumn(sorting: ColumnSortingOrder): ColumnSortingOrder[] {
        return sorting.state === ColumnSortingState.NoSort ? [] : [{ key: sorting.key, state: sorting.state }];
    }

    /** Toggle the sorting state of a column when using multiple select */
    private toggleMultipleColumn(sorting: ColumnSortingOrder): ColumnSortingOrder[] {
        // reorder columns here
        const idx = this.order.findIndex(column => column.key === sorting.key);

        // if wasnt previously selected add to list
        if (idx === -1) {
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