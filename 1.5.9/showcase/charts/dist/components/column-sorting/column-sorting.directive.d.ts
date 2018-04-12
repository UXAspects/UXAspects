import { ColumnSortingComponent, ColumnSortingState } from './column-sorting.component';
import { QueryList } from '@angular/core';
import { Subject } from 'rxjs/Subject';
export declare class ColumnSortingDirective {
    singleSort: boolean;
    components: QueryList<ColumnSortingComponent>;
    events: Subject<ColumnSortingOrder[]>;
    order: ColumnSortingOrder[];
    ngAfterViewInit(): void;
    toggleColumn(key: string, state: ColumnSortingState): ColumnSortingOrder[];
}
export interface ColumnSortingOrder {
    key: string;
    state: ColumnSortingState;
}
