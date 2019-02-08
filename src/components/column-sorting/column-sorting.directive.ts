import { Directive, Input, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Directive({
    selector: '[uxColumnSorting]'
})
export class ColumnSortingDirective implements OnDestroy {

    /** If set to true the column will sort by only this column, removing sorting from all others. */
    @Input() singleSort: boolean;

    events = new Subject<ColumnSortingOrder[]>();
    order: ColumnSortingOrder[] = [];

    ngOnDestroy(): void {
        this.events.complete();
    }

    toggleColumn(sorting: ColumnSortingOrder): ColumnSortingOrder[] {

        // apply sorting based on the single or multiple sort
        this.order = this.singleSort ? this.toggleSingleColumn(sorting) : this.toggleMultipleColumn(sorting);

        // emit the latest order
        this.events.next(this.order);

        return this.order;
    }

    private toggleSingleColumn(sorting: ColumnSortingOrder): ColumnSortingOrder[] {
        return sorting.state === ColumnSortingState.NoSort ? [] : [{ key: sorting.key, state: sorting.state }];
    }

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