import { Component } from '@angular/core';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlunk } from '../../../../../interfaces/IPlunk';
import { IPlunkProvider } from '../../../../../interfaces/IPlunkProvider';

@Component({
    selector: 'uxd-components-buttons-split-button-dropdowns',
    templateUrl: './split-button-dropdowns.component.html'
})
@DocumentationSectionComponent('ComponentsSplitButtonDropdownsComponent')
export class ComponentsSplitButtonDropdownsComponent extends BaseDocumentationSection implements IPlunkProvider {

    plunk: IPlunk = {
        files: {
            'app.component.html': this.snippets.raw.appHtml,
            'app.component.ts': this.snippets.raw.appTs,
        },
        modules: [
            {
                library: 'ngx-bootstrap/dropdown',
                imports: ['BsDropdownModule'],
                providers: ['BsDropdownModule.forRoot()']
            },
            {
                imports: ['MenuNavigationModule'],
                library: '@ux-aspects/ux-aspects'
            }
        ]
    };

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}
