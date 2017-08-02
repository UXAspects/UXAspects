import { ColumnSortingDirective, ColumnSortingOrder } from './column-sorting.directive';
import { EventEmitter } from '@angular/core';
export declare class ColumnSortingComponent {
    state: ColumnSortingState;
    key: string;
    orderNumber: number;
    stateChange: EventEmitter<ColumnSortingState>;
    private parent;
    columnSortingState: typeof ColumnSortingState;
    initParent(parent: ColumnSortingDirective): void;
    changeState(): ColumnSortingOrder[];
}
export declare enum ColumnSortingState {
    Ascending = 0,
    Descending = 1,
    NoSort = 2,
}
