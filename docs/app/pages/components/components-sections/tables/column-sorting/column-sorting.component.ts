import { Component } from '@angular/core';
import 'chance';
import { ColorService, ColumnSortingOrder, ColumnSortingState } from '../../../../../../../src/index';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlunk } from '../../../../../interfaces/IPlunk';
import { IPlunkProvider } from '../../../../../interfaces/IPlunkProvider';
import { ColumnSortingComponent } from './../../../../../../../src/components/column-sorting/column-sorting.component';

@Component({
    selector: 'uxd-components-column-sorting',
    templateUrl: './column-sorting.component.html'
})
@DocumentationSectionComponent('ComponentsColumnSortingComponent')
export class ComponentsColumnSortingComponent extends BaseDocumentationSection implements IPlunkProvider {

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

    sortByKey(array: ColumnSortingTableData[], order: ColumnSortingOrder[]) {

        return array.sort((itemOne: ColumnSortingTableData, itemTwo: ColumnSortingTableData) => {

            // iterate through each sorter
            for (const sorter of order) {
                const value1 = itemOne[sorter.key];
                const value2 = itemTwo[sorter.key];

                if (sorter.state === ColumnSortingState.Ascending) {
                    return value1 < value2 ? -1 : 1;
                } else {
                    return value1 > value2 ? -1 : 1;
                }

            }

            return itemOne.id < itemTwo.id ? -1 : 1;
        });
    }

    plunk: IPlunk = {
        files: {
            'app.component.ts': this.snippets.raw.appTs,
            'app.component.html': this.snippets.raw.appHtml
        },
        modules: [{
            imports: ['ColumnSortingModule', 'ColorServiceModule', 'SparkModule'],
            library: '@ux-aspects/ux-aspects'
        }]
    };

    sparkTrackColor = this._colorService.getColor('accent').setAlpha(0.2).toRgba();
    sparkBarColor = this._colorService.getColor('accent').toHex();

    constructor(private _colorService: ColorService) {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }

    getColumnAriaLabel(sorting: ColumnSortingState = ColumnSortingState.None, order: number | null): string {
        switch (sorting) {

            case ColumnSortingState.Ascending:
                return order ?
                    `Ascending sort with priority ${order} applied, activate to apply a Descending sort` :
                    'Ascending sort applied, activate to apply a Descending sort';

            case ColumnSortingState.Descending:
                return order ?
                    `Descending sort with priority ${order} applied, activate to apply no sorting` :
                    'Descending sort applied, activate to apply no sorting';

            case ColumnSortingState.None:
                return 'No sort applied, activate to apply an Ascending sort';
        }
    }
}

interface ColumnSortingTableData {
    id: number;
    name: string;
    author: string;
    date: string;
    completed: number;
    active: boolean;
}