import { ColumnSortingDirective } from './column-sorting.directive';
import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, Host } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';

@Component({
    selector: 'ux-column-sorting',
    templateUrl: './column-sorting.component.html',
    exportAs: 'ux-column-sorting',
    host: {
        '(click)': 'changeState(sortKey)'
    }
})
export class ColumnSortingComponent {
// export class ColumnSortingComponent implements OnChanges {
    
    @Input() state: ColumnSortingState;
    @Input() sortKey: string;
    @Input() orderNumber: number;
    @Output() stateChange: EventEmitter<ColumnSortingState> = new EventEmitter<ColumnSortingState>();

    private parent: ColumnSortingDirective;

    initParent(parent: ColumnSortingDirective) {
        this.parent = parent;

        // watch for any events
        this.parent.events.subscribe(event => {
            // debugger;

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
        // console.log(this.state);
        this.parent.toggleColumn(this.sortKey, this.state);

    }

    sortNumber: Number;
    columnSortingState = ColumnSortingState;

    // ngOnChanges(changes: SimpleChanges) {
        
    //     if (changes.state && changes.state.currentValue !== changes.state.previousValue) {
    //         this.stateChange.emit(this.state);
    //     }
    // }

    updateState() {
        // if (this.state === ColumnSortingState.Ascending) {
        //     this.state = ColumnSortingState.Descending;
        // } else if (this.state === ColumnSortingState.Descending) {
        //     this.state = ColumnSortingState.NoSort;
        // }  else {
        //     this.state = ColumnSortingState.Ascending;
        // }

        // this.stateChange.emit(this.state);
        
    }

    updateNumber(sortKey: String[]) {
        console.log(this.sortKey);
        console.log(sortKey);
        
    }
}

export enum ColumnSortingState {
    Ascending,
    Descending,
    NoSort
}