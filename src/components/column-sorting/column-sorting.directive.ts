import { Subscription } from 'rxjs/Subscription';
import { ColumnSortingComponent, ColumnSortingState } from './column-sorting.component';
import { Directive, Input, Output, ElementRef, Host, ViewChild, QueryList, ViewChildren, ContentChildren } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';

@Directive({
    selector: '[uxColumnSorting]',

})
export class ColumnSortingDirective {
    item: number;

    @ContentChildren(ColumnSortingComponent) components: QueryList<ColumnSortingComponent>;

    events: Subject<any[]> = new Subject<any[]>();

    order: any[] = [];

    ngAfterViewInit() {
        let a = this.components;

        this.components.forEach(component => component.initParent(this));

    }

    toggleColumn(key: string, state: ColumnSortingState) {

        // debugger;
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

        this.events.next(this.order);

    }


}