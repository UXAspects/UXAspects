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

    codepen: ICodePen = {
        html: `${this.snippets.raw.sample1Html} ${this.snippets.raw.sample2Html} ${this.snippets.raw.sample3Html} ${this.snippets.raw.sample4Html}`
    };

    constructor() {
        super(require.context('./snippets/', false, /(html|css|js|ts)$/));
    }

}