import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-components-detail-row-responsive',
    templateUrl: './detail-row-responsive-ng1.component.html'
})
@DocumentationSectionComponent('ComponentsDetailRowResponsiveNg1Component')
export class ComponentsDetailRowResponsiveNg1Component extends BaseDocumentationSection implements ICodePenProvider {

    public htmlCode = this.snippets.compiled.layoutHtml;
    public jsCode = this.snippets.compiled.controllerJs;
    public cssCode = this.snippets.compiled.stylesCss;

    public codepen: ICodePen = {
        html: this.snippets.examples.codepenHtml,
        htmlAttributes: {
            'ng-controller': 'DetailRowResponsiveTableCtrl as vm'
        },
        js: [this.snippets.examples.codepenJs],
        css: [this.snippets.examples.stylesCss]
    };
    
    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}