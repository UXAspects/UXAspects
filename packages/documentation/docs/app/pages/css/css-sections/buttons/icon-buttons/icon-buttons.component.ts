import { Component, OnInit } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';

@Component({
    selector: 'uxmd-icon-buttons',
    templateUrl: 'icon-buttons.component.html'
})
@DocumentationSectionComponent('IconButtonsDocumentationComponent')
export class IconButtonsDocumentationComponent extends BaseDocumentationSection implements ICodePenProvider {
    
    codepen: ICodePen = {
        html: this.snippets.raw.appHtml
    };

    constructor() {
        super(require.context('./snippets/', false, /(html|css|js|ts)$/));
    }
}