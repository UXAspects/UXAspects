import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-custom-dropdown-ng1',
    templateUrl: './custom-dropdown-ng1.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DocumentationSectionComponent('ComponentsCustomDropdownNg1Component')
export class ComponentsCustomDropdownNg1Component extends BaseDocumentationSection implements ICodePenProvider {
    
    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }

    public codepen: ICodePen = {
        html: this.snippets.raw.sampleHtml,
        htmlTemplates: [{
            id: 'template.html',
            content: this.snippets.raw.templateHtml
        }],
        css: [this.snippets.raw.sampleCss],
        js: [this.snippets.raw.sampleJs]
    };

}