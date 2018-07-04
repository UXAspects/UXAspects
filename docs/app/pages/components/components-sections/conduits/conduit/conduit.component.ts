import { Component } from '@angular/core';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlunk } from '../../../../../interfaces/IPlunk';
import { IPlunkProvider } from '../../../../../interfaces/IPlunkProvider';

@Component({
    selector: 'uxd-conduit',
    templateUrl: './conduit.component.html',
})
@DocumentationSectionComponent('ComponentsConduitComponent')
export class ComponentsConduitComponent extends BaseDocumentationSection implements IPlunkProvider {

    plunk: IPlunk = {
        files: {
            'app.component.html': this.snippets.raw.appHtml,
            'app.component.ts': this.snippets.raw.appTs,
            'search.component.html': this.snippets.raw.searchHtml,
            'search.component.ts': this.snippets.raw.searchTs,
        },
        modules: [
            {
                imports: ['CheckboxModule'],
                library: '@ux-aspects/ux-aspects'
            },
            {
                imports: ['SearchComponent'],
                library: './search.component',
                declaration: true
            }
        ]
    };

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}