import { EventEmitter, OnDestroy } from '@angular/core';
import { ColumnSortingDirective, ColumnSortingOrder, ColumnSortingState } from './column-sorting.directive';
export declare class ColumnSortingComponent implements OnDestroy {
    private _columnSorter;
    state: ColumnSortingState;
    key: string;
    stateChange: EventEmitter<ColumnSortingState>;
    order: number;
    columnSortingState: typeof ColumnSortingState;
    private _onDestroy;
    constructor(_columnSorter: ColumnSortingDirective);
    ngOnDestroy(): void;
    changeState(): ColumnSortingOrder[];
}
