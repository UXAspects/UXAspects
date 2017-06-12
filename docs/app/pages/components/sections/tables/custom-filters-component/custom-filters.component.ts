import { MAPPINGS } from './../../../../../interfaces/IPlunk';
import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { Filter } from '../../../../../../../src/index';
import { IPlunk } from '../../../../../interfaces/IPlunk';
import { IPlunkProvider } from '../../../../../interfaces/IPlunkProvider';

@Component({
    selector: 'uxd-components-custom-filters',
    templateUrl: './custom-filters.component.html'
})
@DocumentationSectionComponent('ComponentsCustomFiltersComponent')
export class ComponentsCustomFiltersComponent implements IPlunkProvider {

    statusFilters: Filter[] = [{
        group: 'custom',
        title: 'Status',
        name: 'Status (All)',
        initial: true
    }, {
        group: 'custom',
        title: 'Active',
        name: 'Active'
    }, {
        group: 'custom',
        title: 'Inactive',
        name: 'Inactive'
    }];

    htmlCode = require('./snippets/app.html');
    tsCode = require('./snippets/app.ts');
    sampleHtml = require('./snippets/sample.html');
    sampleTs = require('./snippets/sample.ts');
    sampleLess = require('./snippets/sample.less');

    public plunk: IPlunk = {
        files: {
            'app.component.ts': this.tsCode,
            'app.component.html': this.htmlCode,
            'sample-filter.component.html': this.sampleHtml,
            'sample-filter.component.css': this.sampleLess,
            'sample-filter.component.ts': this.sampleTs
        },
        mappings: [
            MAPPINGS.NgxBootstrap
        ],
        modules: [{
            imports: ['FiltersModule', 'RadioButtonModule'],
            library: 'ux-aspects'
        }, {
            imports: ['SampleFilterCustomComponent'],
            library: './sample-filter.component',
            declaration: true
        }, {
            imports: ['BsDropdownModule'],
            library: 'ngx-bootstrap',
            forRoot: true
        }]
    };

}