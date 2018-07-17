import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component } from '@angular/core';
import 'chance';
import { ColorService, ColumnSortingComponent, ColumnSortingOrder, ColumnSortingState } from '../../../../../../../src/index';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlunk } from '../../../../../interfaces/IPlunk';
import { IPlunkProvider } from '../../../../../interfaces/IPlunkProvider';

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

    plunk: IPlunk = {
        files: {
            'app.component.ts': this.snippets.raw.appTs,
            'app.component.html': this.snippets.raw.appHtml
        },
        modules: [
            {
                imports: ['ColumnSortingModule', 'ColorServiceModule', 'SparkModule'],
                library: '@ux-aspects/ux-aspects'
            },
            {
                imports: ['A11yModule'],
                library: '@angular/cdk/a11y'
            }
        ]
    };

    sparkTrackColor = this._colorService.getColor('accent').setAlpha(0.2).toRgba();
    sparkBarColor = this._colorService.getColor('accent').toHex();

    constructor(private _colorService: ColorService, private _announcer: LiveAnnouncer) {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }

    changeState(title: string, column: ColumnSortingComponent) {
        this.order = column.changeState();
        this.sortByKey(this.sortableTable, this.order);

        // announce the change to any screen reader
        this._announcer.announce(this.getColumnAriaLabel(title, column));
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

    getColumnAriaLabel(title: string, column: ColumnSortingComponent): string {

        switch (column.state) {

            case ColumnSortingState.Ascending:
                return column.order ?
                    `${title}: Ascending sort with priority ${column.order} applied, activate to apply a Descending sort` :
                    `${title}: Ascending sort applied, activate to apply a Descending sort`;

            case ColumnSortingState.Descending:
                return column.order ?
                    `${title}: Descending sort with priority ${column.order} applied, activate to apply no sorting` :
                    `${title}: Descending sort applied, activate to apply no sorting`;

            default:
                return `${title}: No sort applied, activate to apply an Ascending sort`;
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