import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-components-grouping',
    templateUrl: './grouping-ng1.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DocumentationSectionComponent('ComponentsGroupingNg1Component')
export class ComponentsGroupingNg1Component extends BaseDocumentationSection {
    
    idsCode = this.snippets.compiled.idsJs;
    rootCode = this.snippets.compiled.rootJs;
    hierarchyCode = this.snippets.compiled.hierarchyJs;
    
    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }

}