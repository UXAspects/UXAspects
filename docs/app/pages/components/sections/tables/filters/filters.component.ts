import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ColorService } from '../../../../../../../src/index';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-components-filters',
    templateUrl: './filters.component.html'
})
@DocumentationSectionComponent('ComponentsFiltersComponent')
export class ComponentsFiltersComponent extends BaseDocumentationSection {

    activeFilters: string[] = [];

    table = [{
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

    dateFilters = [{
        title: 'Date modified',
        name: 'Date modified (All)',
        initial: true
    }, {
        title: 'Today',
        name: 'Today'
    }, {
        title: 'Last week',
        name: 'Last week'
    }, {
        title: 'Last month',
        name: 'Last month'
    }];

    statusFilters = [{
        title: 'Status',
        name: 'Status (All)',
        initial: true
    }, {
        title: 'Active',
        name: 'Active'
    }, {
        title: 'Inactive',
        name: 'Inactive'
    }];

    sparkTrackColor: string;
    sparkBarColor: string;

    constructor(colorService: ColorService) {
 
        super(
            null, // require.context('!!prismjs-loader?lang=html!./snippets/', false, /\.html$/),
            null, // require.context('!!prismjs-loader?lang=css!./snippets/', false, /\.css$/),
            null, // require.context('!!prismjs-loader?lang=javascript!./snippets/', false, /\.js$/),
            null, // require.context('!!prismjs-loader?lang=typescript!./snippets/', false, /\.ts$/),
            require.context('./snippets/', false, /\.(html|css|js|ts)$/)
        );

        this.sparkTrackColor = colorService.getColor('accent').setAlpha(0.2).toRgba();
        this.sparkBarColor = colorService.getColor('accent').toHex();
    }

}