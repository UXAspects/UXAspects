import { Component } from '@angular/core';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlunk } from '../../../../../interfaces/IPlunk';
import { IPlunkProvider } from '../../../../../interfaces/IPlunkProvider';

@Component({
    selector: 'uxd-components-wizard',
    templateUrl: './wizard.component.html'
})
@DocumentationSectionComponent('ComponentsWizardComponent')
export class ComponentsWizardComponent extends BaseDocumentationSection implements IPlunkProvider {

    orientation: string = 'horizontal';

    plunk: IPlunk = {
        files: {
            'app.component.html': this.snippets.raw.appHtml,
            'app.component.ts': this.snippets.raw.appTs,
        },
        modules: [
            {
                library: '@ux-aspects/ux-aspects',
                imports: ['RadioButtonModule', 'WizardModule', 'AccordionModule']
            }
        ]
    };

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }

}