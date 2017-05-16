import { ColumnSortingComponent, ColumnSortingState } from './column-sorting.component';
import { Directive, Host, QueryList, ContentChildren } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Directive({
    selector: '[uxColumnSorting]'
})
export class ColumnSortingDirective {

    @ContentChildren(ColumnSortingComponent) components: QueryList<ColumnSortingComponent>;

    events: Subject<ColumnSortingOrder[]> = new Subject<ColumnSortingOrder[]>();
    order: ColumnSortingOrder[] = [];

    ngAfterViewInit() {
        this.components.forEach(component => component.initParent(this));
    }

    toggleColumn(key: string, state: ColumnSortingState, singleSort: boolean) {

        if (singleSort) {
            if (state === ColumnSortingState.NoSort) {
                this.order = [];
            } else {
                this.order = [{key: key, state: state}];
            }
        } else {
            // reorder columns here
            let idx = this.order.findIndex(column => column.key === key);

            // if wasnt previously selected add to list
            if (idx === -1) {
                this.order.push({ key: key, state: state});
            } else if (state === ColumnSortingState.Ascending || state === ColumnSortingState.Descending) {
                this.order.splice(idx, 1);
                this.order.push({ key: key, state: state});
            } else {
                this.order.splice(idx, 1);
            }
        }

            this.events.next(this.order);
            // return the order
            return this.order;

    }
}

export interface ColumnSortingOrder {
    key: string;
    state: ColumnSortingState; 
}