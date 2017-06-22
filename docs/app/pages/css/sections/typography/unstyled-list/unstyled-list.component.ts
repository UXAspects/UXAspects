import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from './../../../../../interfaces/ICodePenProvider';
import { ICodePen } from './../../../../../interfaces/ICodePen';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-css-typography-unstyled-list',
    templateUrl: './unstyled-list.component.html'
})
@DocumentationSectionComponent('CssUnstyledListComponent')
export class CssUnstyledListComponent extends BaseDocumentationSection implements ICodePenProvider {

    public codepen: ICodePen = {
        html: this.snippets.raw.codeExampleHtml
    };

    constructor() {
        super(require.context('./snippets/', false, /(html|css|js|ts)$/));
    }

}