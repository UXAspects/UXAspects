import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from './../../../../../interfaces/ICodePenProvider';
import { ICodePen } from './../../../../../interfaces/ICodePen';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-css-icons-icon-buttons',
    templateUrl: './icon-buttons.component.html'
})
@DocumentationSectionComponent('CssIconButtonsComponent')
export class CssIconButtonsComponent extends BaseDocumentationSection implements ICodePenProvider {

    public codepen: ICodePen = {
        html: this.snippets.raw.sampleHtml
    };
    
    constructor() {
        super(require.context('./snippets/', false, /(html|css|js|ts)$/));
    }
}