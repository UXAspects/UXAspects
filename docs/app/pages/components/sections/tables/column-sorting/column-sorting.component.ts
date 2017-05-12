import { ColumnSortingComponent } from './../../../../../../../src/components/column-sorting/column-sorting.component';
import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { ColumnSortingState, ColumnSortingDirective } from '../../../../../../../src/index';

@Component({
    selector: 'uxd-components-column-sorting',
    templateUrl: './column-sorting.component.html'
})
@DocumentationSectionComponent('ComponentsColumnSortingComponent')
export class ComponentsColumnSortingComponent {

    chance = require('chance').Chance();

    sortKey: string[] = [];
    ascending: boolean[] = [];

    authorState: ColumnSortingState = ColumnSortingState.NoSort;
    dateState: ColumnSortingState = ColumnSortingState.NoSort;
    completedState: ColumnSortingState = ColumnSortingState.NoSort;

    order: any[] = [];


    sortableTable = [{
        id: 1,
        name: 'Document',
        author: chance.name(),
        date: '18 Dec 2016',
        complete: 97,
        active: chance.bool()
    }, {
        id: 2,
        name: 'Email',
        author: chance.name(),
        date: '22 Dec 2016',
        complete: 15,
        active: chance.bool()
    }, {
        id: 3,
        name: 'Email',
        author: chance.name(),
        date: '12 Dec 2016',
        complete: 20,
        active: chance.bool()
    }, {
        id: 4,
        name: 'Email',
        author: chance.name(),
        date: '16 Dec 2016',
        complete: 74,
        active: chance.bool()
    }, {
        id: 5,
        name: 'Email',
        author: chance.name(),
        date: '17 Dec 2016',
        complete: 63,
        active: chance.bool()
    }, {
        id: 6,
        name: 'Document',
        author: chance.name(),
        date: '21 Dec 2016',
        complete: 21,
        active: chance.bool()
    }, {
        id: 7,
        name: 'Document',
        author: chance.name(),
        date: '17 Dec 2016',
        complete: 85,
        active: chance.bool()
    }, {
        id: 8,
        name: 'Document',
        author: chance.name(),
        date: '17 Dec 2016',
        complete: 11,
        active: chance.bool()
    }];

    changeState(state: ColumnSortingState): ColumnSortingState {

        switch (state) {
            case ColumnSortingState.NoSort:
                return ColumnSortingState.Ascending;

            case ColumnSortingState.Ascending:
                return ColumnSortingState.Descending;

            case ColumnSortingState.Descending:
                return ColumnSortingState.NoSort;

        }

    }

    // changeState(columnSortingComponent: ColumnSortingComponent, column: string) {
        
        // itterate each sortKey and generate an array
        // for (let idx = 0; idx <= this.sortKey.length; idx++) {

        //     // check if array position is empty or matching
        //     if (this.sortKey[idx] === undefined || this.sortKey[idx] === null) {
        //         this.sortKey.push(column);
        //         this.ascending.push(true);
        //         break;
        //     } else if (this.sortKey[idx] === column) {
        //         this.sortKey.splice(idx, 1);
        //         if (this.ascending[idx] === true) {
        //             this.ascending.splice(idx, 1);
        //             this.ascending.push(false);
        //             this.sortKey.push(column);
        //             break;
        //         } else {
        //             this.ascending.splice(idx, 1);
        //             break;
        //         }
        //     }            
        // }

        // columnSortingComponent.updateState();
        // columnSortingComponent.updateNumber(this.sortKey);
    // }


    getColumnIndex(columnName: string) {
        // find if being sorted
        let index = this.order.findIndex(column => column.name === columnName);

        if (index === -1) {
            return null;
        }

        return index + 1;        
    }

    onChange(columnSortingState: ColumnSortingState, columnName: string) {
        
        // check if the field is currently being sorted
        let index = this.order.findIndex(column => column.name === columnName);

        // if new columns state is NoSort remove from list
        if (columnSortingState === ColumnSortingState.NoSort && index !== -1) {
            this.order.splice(index, 1);
            return;
        }

        // if it wast previously being sorted, push to end of queue
        if (index === -1) {
            this.order.push({ name: columnName });
        } else {
            // otherwise remove and then push to end
            let target = this.order.splice(index, 1);
            this.order.push(target);
        }
        
        
        // this.sortByKey(this.sortableTable, this.sortKey, this.ascending);
        // console.log(this.sortKey);
        // console.log(this.ascending);
    }

    sortByKey(array: any, key: string[], ascending: boolean[]) {
        return array.sort( function(a: any, b: any) {
            let ascending0 = 0, ascending1 = 0, ascending2 = 0;

            if (!ascending[0]) {
                ascending0 = 1;
            }
            if (!ascending[1]) {
                ascending1 = 2; 
            }
            if (!ascending[2]) {
                ascending2 = 4;
            }

            let sortCase = ascending0 + ascending1 + ascending2;

            let x0 = a[key[0]];
            let y0 = b[key[0]];
            let x1 = a[key[1]];
            let y1 = b[key[1]];
            let x2 = a[key[2]];
            let y2 = b[key[2]];
            
            switch (sortCase) {
                case 0:
                    return ((x0 < y0) ? -1 : ((x0 > y0) ? 1 : ((x1 < y1) ? -1 : ((x1 > y1) ? 1 : ((x2 < y2) ? -1 : ((x2 > y2) ? 1 : ((a.id < b.id) ? -1 : 1)))))));
                case 1:
                    return ((x0 < y0) ? 1 : ((x0 > y0) ? -1 : ((x1 < y1) ? -1 : ((x1 > y1) ? 1 : ((x2 < y2) ? -1 : ((x2 > y2) ? 1 : ((a.id < b.id) ? -1 : 1)))))));
                case 2:
                    return ((x0 < y0) ? -1 : ((x0 > y0) ? 1 : ((x1 < y1) ? 1 : ((x1 > y1) ? -1 : ((x2 < y2) ? -1 : ((x2 > y2) ? 1 : ((a.id < b.id) ? -1 : 1)))))));
                case 3:
                    return ((x0 < y0) ? 1 : ((x0 > y0) ? -1 : ((x1 < y1) ? 1 : ((x1 > y1) ? -1 : ((x2 < y2) ? -1 : ((x2 > y2) ? 1 : ((a.id < b.id) ? -1 : 1)))))));
                case 4:
                    return ((x0 < y0) ? -1 : ((x0 > y0) ? 1 : ((x1 < y1) ? -1 : ((x1 > y1) ? 1 : ((x2 < y2) ? 1 : ((x2 > y2) ? -1 : ((a.id < b.id) ? -1 : 1)))))));
                case 5:
                    return ((x0 < y0) ? 1 : ((x0 > y0) ? -1 : ((x1 < y1) ? -1 : ((x1 > y1) ? 1 : ((x2 < y2) ? 1 : ((x2 > y2) ? -1 : ((a.id < b.id) ? -1 : 1)))))));
                case 6:
                    return ((x0 < y0) ? -1 : ((x0 > y0) ? 1 : ((x1 < y1) ? 1 : ((x1 > y1) ? -1 : ((x2 < y2) ? 1 : ((x2 > y2) ? -1 : ((a.id < b.id) ? -1 : 1)))))));
                case 7:
                    return ((x0 < y0) ? 1 : ((x0 > y0) ? -1 : ((x1 < y1) ? 1 : ((x1 > y1) ? -1 : ((x2 < y2) ? 1 : ((x2 > y2) ? -1 : ((a.id < b.id) ? -1 : 1)))))));
            }

        });
    }
   
}
