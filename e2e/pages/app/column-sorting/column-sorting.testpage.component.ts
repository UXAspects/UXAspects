import { Component } from '@angular/core';
import { ColumnSortingComponent, ColumnSortingState, ColorService, ColumnSortingOrder } from '../../../../dist/lib/index.js';

@Component({
    selector: 'app',
    templateUrl: './column-sorting.testpage.component.html'
})
export class ColumnSortingTestPageComponent {

    order: ColumnSortingOrder[] = [];

    sortableTable = [{
        id: 1,
        name: 'Document',
        author: 'Victor Bowen',
        date: '18 Dec 2016',
        completed: 97,
        active: true
    }, {
        id: 2,
        name: 'Email',
        author: 'Jeremy Price',
        date: '22 Dec 2016',
        completed: 15,
        active: false
    }, {
        id: 3,
        name: 'Email',
        author: 'Keith Flowers',
        date: '12 Dec 2016',
        completed: 20,
        active: false
    }, {
        id: 4,
        name: 'Email',
        author: 'Ophelia Robertson',
        date: '16 Dec 2016',
        completed: 74,
        active: true
    }, {
        id: 5,
        name: 'Email',
        author: 'Barbara Pratt',
        date: '17 Dec 2016',
        completed: 63,
        active: false
    }, {
        id: 6,
        name: 'Document',
        author: 'Stella Phelps',
        date: '21 Dec 2016',
        completed: 21,
        active: true
    }, {
        id: 7,
        name: 'Document',
        author: 'Chris Black',
        date: '17 Dec 2016',
        completed: 85,
        active: true
    }, {
        id: 8,
        name: 'Document',
        author: 'Barbara Pratt',
        date: '17 Dec 2016',
        completed: 11,
        active: false
    }];

    changeState(columnSortingComponent: ColumnSortingComponent) {
        this.order = columnSortingComponent.changeState();
        this.sortByKey(this.sortableTable, this.order);
    }

    sortByKey(array: TableData[], order: ColumnSortingOrder[]) {

        return array.sort((itemOne: TableData, itemTwo: TableData) => {

            // iterate through each sorter
            for (let sorter of order) {
                let value1 = itemOne[sorter.key];
                let value2 = itemTwo[sorter.key];

                if (sorter.state === ColumnSortingState.Ascending) {
                    if (value1 < value2) {
                        return -1;
                    } else if (value1 > value2) {
                        return 1;
                    }
                } else {
                   if (value1 > value2) {
                        return -1;
                    } else if (value1 < value2) {
                        return 1;
                    } 
                }

            }

            return itemOne.id < itemTwo.id ? -1 : 1;
        });
    }

    sparkTrackColor: string;
    sparkBarColor: string;

    constructor(colorService: ColorService) {
 
        this.sparkTrackColor = colorService.getColor('accent').setAlpha(0.2).toRgba();
        this.sparkBarColor = colorService.getColor('accent').toHex();
    }
}

export interface TableData {
    id: number;
    name: string;
    author: string;
    date: string;
    completed: number;
    active: boolean;
}
