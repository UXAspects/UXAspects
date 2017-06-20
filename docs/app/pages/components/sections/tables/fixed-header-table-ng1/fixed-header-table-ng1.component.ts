import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-components-fixed-header-table',
    templateUrl: './fixed-header-table-ng1.component.html'
})
@DocumentationSectionComponent('ComponentsFixedHeaderTableNg1Component')
export class ComponentsFixedHeaderTableNg1Component extends BaseDocumentationSection implements ICodePenProvider {
    
    private htmlCode = this.snippets.compiled.layoutHtml;
    private jsCode = this.snippets.compiled.controllerJs;

    public codepen: ICodePen = {
        html: this.snippets.examples.layoutHtml,
        htmlAttributes: {
            'ng-controller': 'FixedHeaderCtrl'
        },
        js: [this.snippets.examples.codepenJs]
    };
    
    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}