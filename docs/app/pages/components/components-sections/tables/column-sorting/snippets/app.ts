import { Component } from '@angular/core';
import { ColumnSortingComponent, ColumnSortingState, ColorService, ColumnSortingOrder } from '@ux-aspects/ux-aspects';
import 'chance';

@Component({
    selector: 'app',
    templateUrl: './src/app.component.html'
})
export class AppComponent {

    order: ColumnSortingOrder[] = [];

    sortableTable = [{
        id: 1,
        name: 'Document',
        author: chance.name(),
        date: '18 Dec 2016',
        completed: 97,
        active: chance.bool()
    }, {
        id: 2,
        name: 'Email',
        author: chance.name(),
        date: '22 Dec 2016',
        completed: 15,
        active: chance.bool()
    }, {
        id: 3,
        name: 'Email',
        author: chance.name(),
        date: '12 Dec 2016',
        completed: 20,
        active: chance.bool()
    }, {
        id: 4,
        name: 'Email',
        author: chance.name(),
        date: '16 Dec 2016',
        completed: 74,
        active: chance.bool()
    }, {
        id: 5,
        name: 'Email',
        author: chance.name(),
        date: '17 Dec 2016',
        completed: 63,
        active: chance.bool()
    }, {
        id: 6,
        name: 'Document',
        author: chance.name(),
        date: '21 Dec 2016',
        completed: 21,
        active: chance.bool()
    }, {
        id: 7,
        name: 'Document',
        author: chance.name(),
        date: '17 Dec 2016',
        completed: 85,
        active: chance.bool()
    }, {
        id: 8,
        name: 'Document',
        author: chance.name(),
        date: '17 Dec 2016',
        completed: 11,
        active: chance.bool()
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
