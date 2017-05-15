import { ColumnSortingDirective } from './column-sorting.directive';
import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, Host } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';

@Component({
    selector: 'ux-column-sorting',
    templateUrl: './column-sorting.component.html',
    exportAs: 'ux-column-sorting'
})
export class ColumnSortingComponent {
    
    @Input() state: ColumnSortingState;
    @Input() sortKey: string;
    @Input() orderNumber: number;

    private parent: ColumnSortingDirective;
    columnSortingState = ColumnSortingState;

    initParent(parent: ColumnSortingDirective) {
        this.parent = parent;

        // watch for any events
        this.parent.events.subscribe(event => {

            let idx = event.findIndex(column => column.key === this.sortKey);

            if (event.length > 1 && idx >= 0) {
                this.orderNumber = idx + 1;
            } else {
                this.orderNumber = null;
            }

        });
    }

    changeState() {

        if (this.state === ColumnSortingState.Ascending) {
            this.state = ColumnSortingState.Descending;
        } else if (this.state === ColumnSortingState.Descending) {
            this.state = ColumnSortingState.NoSort;
        }  else {
            this.state = ColumnSortingState.Ascending;
        }

        // inform parent
        return this.parent.toggleColumn(this.sortKey, this.state);

    }
}

export enum ColumnSortingState {
    Ascending,
    Descending,
    NoSort
}