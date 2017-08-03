import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-css-page-header-page-header-example',
    templateUrl: './page-header-example.component.html'
})
@DocumentationSectionComponent('CssPageHeaderExampleComponent')
export class CssPageHeaderExampleComponent extends BaseDocumentationSection implements ICodePenProvider {

    codepen: ICodePen = {
        html: this.snippets.raw.sampleHtml,
        css: [this.snippets.raw.sampleCss],
        js: [this.snippets.raw.sampleJs]
    };

    constructor() {
        super(require.context('./snippets/', false, /(html|css|js|ts)$/));
    }

}