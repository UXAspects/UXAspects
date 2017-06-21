import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from './../../../../../interfaces/ICodePenProvider';
import { ICodePen } from './../../../../../interfaces/ICodePen';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-css-progress-mini-activity-indicator',
    templateUrl: './mini-activity-indicator.component.html'
})
@DocumentationSectionComponent('CssMiniActivityIndicatorComponent')
export class CssMiniActivityIndicatorComponent extends BaseDocumentationSection implements ICodePenProvider {

    public codepen: ICodePen = {
        html: `${this.snippets.examples.sample1Html} ${this.snippets.examples.sample2Html} ${this.snippets.examples.sample3Html} ${this.snippets.examples.sample4Html}`
    };

    constructor() {
        super(require.context('./snippets/', false, /(html|css|js|ts)$/));
    }

}