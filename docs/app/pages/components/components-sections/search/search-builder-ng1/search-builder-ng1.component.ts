import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';

@Component({
    selector: 'uxd-search-builder-ng1',
    templateUrl: './search-builder-ng1.component.html',
    styleUrls: ['./search-builder-ng1.component.less'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DocumentationSectionComponent('ComponentsSearchBuilderNg1Component')
export class ComponentsSearchBuilderNg1Component extends BaseDocumentationSection {
    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}
