import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-components-marquee-wizard',
    templateUrl: './marquee-wizard.component.html'
})
@DocumentationSectionComponent('ComponentsMarqueeWizardComponent')
export class ComponentsMarqueeWizardComponent extends BaseDocumentationSection {

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
    
}