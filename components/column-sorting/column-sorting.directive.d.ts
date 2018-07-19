import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';
export declare class ColumnSortingDirective implements OnDestroy {
    singleSort: boolean;
    events: Subject<ColumnSortingOrder[]>;
    order: ColumnSortingOrder[];
    ngOnDestroy(): void;
    toggleColumn(sorting: ColumnSortingOrder): ColumnSortingOrder[];
    private toggleSingleColumn(sorting);
    private toggleMultipleColumn(sorting);
}
export interface ColumnSortingOrder {
    key: string;
    state: ColumnSortingState;
}
export declare enum ColumnSortingState {
    Ascending = "ascending",
    Descending = "descending",
    NoSort = "none",
}
