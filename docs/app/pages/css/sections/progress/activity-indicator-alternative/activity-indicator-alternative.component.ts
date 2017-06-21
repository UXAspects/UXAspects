import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from './../../../../../interfaces/ICodePenProvider';
import { ICodePen } from './../../../../../interfaces/ICodePen';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-css-progress-activity-indicator-alternative',
    templateUrl: './activity-indicator-alternative.component.html'
})
@DocumentationSectionComponent('CssActivityIndicatorAlternativeComponent')
export class CssActivityIndicatorAlternativeComponent extends BaseDocumentationSection implements ICodePenProvider {

    public codepen: ICodePen = {
        html: this.snippets.examples.sampleHtml
    };
    
    constructor() {
        super(require.context('./snippets/', false, /(html|css|js|ts)$/));
    }
}