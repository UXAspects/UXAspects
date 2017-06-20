import { Component } from '@angular/core';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-components-toggle-buttons-ng1',
    templateUrl: './toggle-buttons-ng1.component.html'
})
@DocumentationSectionComponent('ComponentsToggleButtonsNg1Component')
export class ComponentsToggleButtonsNg1Component extends BaseDocumentationSection implements ICodePenProvider {
    
    
    public codepen = {
        html: this.snippets.examples.toggleButtonsTopHtml + '\n' + this.snippets.examples.toggleButtonsBottomHtml
    };

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}
