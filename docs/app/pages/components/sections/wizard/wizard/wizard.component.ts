import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlunkProvider } from '../../../../../interfaces/IPlunkProvider';
import { IPlunk } from '../../../../../interfaces/IPlunk';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-components-wizard',
    templateUrl: './wizard.component.html'
})
@DocumentationSectionComponent('ComponentsWizardComponent')
export class ComponentsWizardComponent extends BaseDocumentationSection implements IPlunkProvider {

    orientation: string = 'horizontal';
    steps = ['1. First Step', '2. Second Step', '3. Third Step', '4. Fourth Step'];

    plunk: IPlunk = {
        files: {
            'app.component.html': this.snippets.raw.appHtml,
            'app.component.ts': this.snippets.raw.appTs,
        },
        modules: [
            {
                library: 'ngx-bootstrap/accordion',
                imports: ['AccordionModule'],
                forRoot: true
            },
            {
                library: 'ux-aspects',
                imports: ['RadioButtonModule', 'WizardModule']
            }
        ]
    };

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }

}