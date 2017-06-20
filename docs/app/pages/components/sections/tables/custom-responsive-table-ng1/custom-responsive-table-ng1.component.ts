import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from './../../../../../interfaces/ICodePenProvider';
import { ICodePen } from './../../../../../interfaces/ICodePen';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-components-custom-reposonsive-table',
    templateUrl: './custom-responsive-table-ng1.component.html'
})
@DocumentationSectionComponent('ComponentsCustomResponsiveTableNg1Component')
export class ComponentsCustomResponsiveTableNg1Component extends BaseDocumentationSection implements ICodePenProvider {

    public codepen: ICodePen = {
        html: this.snippets.examples.sampleHtml,
        htmlAttributes: {
            'ng-controller': 'CustomResponsiveTableCtrl as vm'
        },
        js: [this.snippets.examples.sampleJs],
        css: [this.snippets.examples.sampleCss]
    };
    
    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}