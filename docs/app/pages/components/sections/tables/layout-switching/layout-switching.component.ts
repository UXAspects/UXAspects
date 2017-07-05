import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-components-layout-switching',
    templateUrl: './layout-switching.component.html'
})
@DocumentationSectionComponent('ComponentsLayoutSwitchingComponent')
export class ComponentsLayoutSwitchingComponent extends BaseDocumentationSection {
    
    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}