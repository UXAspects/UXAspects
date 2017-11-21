import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from './../../../../../interfaces/ICodePenProvider';
import { ICodePen } from './../../../../../interfaces/ICodePen';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-css-structure-scroll-to-top-button',
    templateUrl: './scroll-to-top-button.component.html'
})
@DocumentationSectionComponent('CssScrollToTopButtonComponent')
export class CssScrollToTopButtonComponent extends BaseDocumentationSection implements ICodePenProvider {

    codepen: ICodePen = {
        html: this.snippets.raw.codeExampleHtml
    };

    constructor() {
        super(require.context('./snippets/', false, /(html|css|js|ts)$/));
    }

}