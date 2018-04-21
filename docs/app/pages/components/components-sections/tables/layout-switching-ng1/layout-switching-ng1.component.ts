import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-components-layout-switching-ng1',
    templateUrl: './layout-switching-ng1.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DocumentationSectionComponent('ComponentsLayoutSwitchingNg1Component')
export class ComponentsLayoutSwitchingNg1Component extends BaseDocumentationSection {
    
    htmlCode = this.snippets.compiled.sampleHtml;
    
    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}