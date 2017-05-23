import { ColumnSortingDirective, ColumnSortingOrder } from './column-sorting.directive';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'ux-column-sorting',
    templateUrl: './column-sorting.component.html',
    exportAs: 'ux-column-sorting'
})
export class ColumnSortingComponent {

    @Input() state: ColumnSortingState;
    @Input() key: string;
    @Input() orderNumber: number;
    @Output() stateChange: EventEmitter<ColumnSortingState> = new EventEmitter<ColumnSortingState>();

    private parent: ColumnSortingDirective;
    columnSortingState = ColumnSortingState;

    initParent(parent: ColumnSortingDirective) {
        this.parent = parent;

        // watch for any events
        this.parent.events.subscribe(event => {

            let idx = event.findIndex(column => column.key === this.key);

            if (idx == -1) {
                this.state = ColumnSortingState.NoSort;
            }

            // only store the number if we have 2 or more columns being sorted
            if (event.length > 1) {
                this.orderNumber = idx === -1 ? null : idx + 1;
            } else {
                this.orderNumber = null;
            }

            this.stateChange.emit(this.state);

        });
    }

    changeState(): ColumnSortingOrder[] {

        if (this.state === ColumnSortingState.Ascending) {
            this.state = ColumnSortingState.Descending;
        } else if (this.state === ColumnSortingState.Descending) {
            this.state = ColumnSortingState.NoSort;
        } else {
            this.state = ColumnSortingState.Ascending;
        }

        // inform parent
        return this.parent.toggleColumn(this.key, this.state);

    }
}

export enum ColumnSortingState {
    Ascending,
    Descending,
    NoSort
}