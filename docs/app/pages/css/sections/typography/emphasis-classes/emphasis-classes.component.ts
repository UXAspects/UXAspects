import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from './../../../../../interfaces/ICodePenProvider';
import { ICodePen } from './../../../../../interfaces/ICodePen';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-css-typography-emphasis-classes',
    templateUrl: './emphasis-classes.component.html'
})
@DocumentationSectionComponent('CssEmphasisClassesComponent')
export class CssEmphasisClassesComponent extends BaseDocumentationSection implements ICodePenProvider {

    codepen: ICodePen = {
        html: this.snippets.raw.sampleHtml
    };
    
    constructor() {
        super(require.context('./snippets/', false, /(html|css|js|ts)$/));
    }
}