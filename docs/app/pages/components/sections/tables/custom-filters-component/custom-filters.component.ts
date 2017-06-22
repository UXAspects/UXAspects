import { MAPPINGS } from './../../../../../interfaces/IPlunk';
import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { Filter } from '../../../../../../../src/index';
import { IPlunk } from '../../../../../interfaces/IPlunk';
import { IPlunkProvider } from '../../../../../interfaces/IPlunkProvider';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-components-custom-filters',
    templateUrl: './custom-filters.component.html'
})
@DocumentationSectionComponent('ComponentsCustomFiltersComponent')
export class ComponentsCustomFiltersComponent extends BaseDocumentationSection implements IPlunkProvider {

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

    public plunk: IPlunk = {
        files: {
            'app.component.ts': this.snippets.raw.appTs,
            'app.component.html': this.snippets.raw.appHtml,
            'sample-filter.component.html': this.snippets.raw.sampleHtml,
            'sample-filter.component.css': this.snippets.raw.sampleCss,
            'sample-filter.component.ts': this.snippets.raw.sampleTs
        },
        mappings: [
            MAPPINGS.NgxBootstrap
        ],
        modules: [{
            imports: ['FilterModule', 'RadioButtonModule'],
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

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }

}