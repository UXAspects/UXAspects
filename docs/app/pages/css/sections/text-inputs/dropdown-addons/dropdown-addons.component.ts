import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from './../../../../../interfaces/ICodePenProvider';
import { ICodePen } from './../../../../../interfaces/ICodePen';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-css-text-inputs-dropdown-addons',
    templateUrl: './dropdown-addons.component.html'
})
@DocumentationSectionComponent('CssDropdownAddonsComponent')
export class CssDropdownAddonsComponent extends BaseDocumentationSection implements ICodePenProvider {
    
    public codepen: ICodePen = {
        html: this.snippets.raw.sampleHtml
    };

    clicked(event: MouseEvent) {
        event.preventDefault();
    }

    constructor() {
        super(require.context('./snippets/', false, /(html|css|js|ts)$/));
    }

}