import { Component } from '@angular/core';
import { Filter } from '@ux-aspects/ux-aspects';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlunk } from '../../../../../interfaces/IPlunk';
import { IPlunkProvider } from '../../../../../interfaces/IPlunkProvider';

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

    plunk: IPlunk = {
        files: {
            'app.component.ts': this.snippets.raw.appTs,
            'app.component.html': this.snippets.raw.appHtml,
            'sample-filter.component.html': this.snippets.raw.sampleHtml,
            'sample-filter.component.css': this.snippets.raw.sampleCss,
            'sample-filter.component.ts': this.snippets.raw.sampleTs
        },
        modules: [{
            imports: ['FilterModule', 'RadioButtonModule', 'MenuNavigationModule'],
            library: '@ux-aspects/ux-aspects'
        }, {
            imports: ['SampleFilterCustomComponent'],
            library: './sample-filter.component',
            declaration: true
        }, {
            imports: ['BsDropdownModule'],
            library: 'ngx-bootstrap/dropdown',
            forRoot: true
        }]
    };

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }

}