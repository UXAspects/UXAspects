import { ColumnSortingComponent } from './../../../../../../../src/components/column-sorting/column-sorting.component';
import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { ColumnSortingState } from '../../../../../../../src/index';
import { IPlunk } from '../../../../../interfaces/IPlunk';
import { IPlunkProvider } from '../../../../../interfaces/IPlunkProvider';

@Component({
    selector: 'uxd-components-column-sorting',
    templateUrl: './column-sorting.component.html'
})
@DocumentationSectionComponent('ComponentsColumnSortingComponent')
export class ComponentsColumnSortingComponent extends BaseDocumentationSection implements IPlunkProvider {

    chance = require('chance').Chance();
    order: object[] = [];

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

    sortByKey(array: object[], order: object) {
        return array.sort( function(a: any, b: any) {
            let ascending0 = 0, ascending1 = 0, ascending2 = 0;

            if (order[0] && order[0].state === ColumnSortingState.Descending) {
                ascending0 = 1;
            }
            if (order[1] && order[1].state === ColumnSortingState.Descending) {
                ascending1 = 2; 
            }
            if (order[2] && order[2].state === ColumnSortingState.Descending) {
                ascending2 = 4;
            }

            let sortCase = ascending0 + ascending1 + ascending2;

            let x0 = order[0] ? a[order[0].key] : null;
            let y0 = order[0] ? b[order[0].key] : null;
            let x1 = order[1] ? a[order[1].key] : null;
            let y1 = order[1] ? b[order[1].key] : null;
            let x2 = order[2] ? a[order[2].key] : null;
            let y2 = order[2] ? b[order[2].key] : null;
            
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

    public plunk: IPlunk = {
        files: {
            'app.component.ts': require('./snippets/app.ts'),
            'app.component.html': require('./snippets/app.html')
        },
        mappings: [
            {
                alias: 'chance',
                source: 'npm:chance@1.0.6'
            }
        ],
        modules: [{
            imports: ['ColumnSortingModule', 'SparkModule'],
            library: 'ux-aspects'
        }]
    };

    constructor() {
 
        super(
            null, // require.context('!!prismjs-loader?lang=html!./snippets/', false, /\.html$/),
            null, // require.context('!!prismjs-loader?lang=css!./snippets/', false, /\.css$/),
            null, // require.context('!!prismjs-loader?lang=javascript!./snippets/', false, /\.js$/),
            null, // require.context('!!prismjs-loader?lang=typescript!./snippets/', false, /\.ts$/),
            require.context('./snippets/', false, /\.(html|css|js|ts)$/)
        );
    }
   
}
