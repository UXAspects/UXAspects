import { Component } from '@angular/core';
import { ColumnSortingComponent, ColumnSortingOrder, ColumnSortingState } from '@ux-aspects/ux-aspects';

@Component({
    selector: 'app-column-resizing-sorting',
    templateUrl: './column-resizing-sorting.testpage.component.html'
})
export class ColumnResizingSortingTestPageComponent {

    order: ReadonlyArray<ColumnSortingOrder> = [];

    items: ReadonlyArray<ColumnSortingTableData> = [{
        id: 1,
        name: 'Email',
        author: 'Troy Bradley',
        date: '18 Dec 2016'
    }, {
        id: 2,
        name: 'Email',
        author: 'Shawn Carpenter',
        date: '22 Dec 2016'
    }, {
        id: 3,
        name: 'Document',
        author: 'Chad Arnold',
        date: '17 Dec 2016'
    }];

    changeState(title: string, column: ColumnSortingComponent) {
        this.order = column.changeState();
        this.items = this.sort(this.items, this.order);
    }

    sort(array: ReadonlyArray<ColumnSortingTableData>, sorters: ReadonlyArray<ColumnSortingOrder>): ReadonlyArray<ColumnSortingTableData> {

        return [...array].sort((itemOne: ColumnSortingTableData, itemTwo: ColumnSortingTableData) => {

            // iterate through each sorter
            for (const sorter of sorters) {
                const value1 = itemOne[sorter.key];
                const value2 = itemTwo[sorter.key];

                if (value1 === value2) {
                    continue;
                }

                if (sorter.state === ColumnSortingState.Ascending) {
                    return value1 < value2 ? -1 : 1;
                } else {
                    return value1 > value2 ? -1 : 1;
                }
            }

            return itemOne.id < itemTwo.id ? -1 : 1;
        });
    }

}

interface ColumnSortingTableData {
    id: number;
    name: string;
    author: string;
    date: string;
}
