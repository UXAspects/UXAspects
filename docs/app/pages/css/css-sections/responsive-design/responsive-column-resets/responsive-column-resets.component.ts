import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from './../../../../../interfaces/ICodePenProvider';
import { ICodePen } from './../../../../../interfaces/ICodePen';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-css-responsive-design-responsive-column-resets',
    templateUrl: './responsive-column-resets.component.html'
})
@DocumentationSectionComponent('CssResponsiveColumnResetsComponent')
export class CssResponsiveColumnResetsComponent extends BaseDocumentationSection implements ICodePenProvider {

    codepen: ICodePen = {
        html: this.snippets.raw.sampleHtml
    };

    constructor() {
        super(require.context('./snippets/', false, /(html|css|js|ts)$/));
    }

}