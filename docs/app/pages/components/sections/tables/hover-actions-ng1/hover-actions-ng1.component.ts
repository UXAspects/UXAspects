import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-components-hover-actions',
    templateUrl: './hover-actions-ng1.component.html'
})
@DocumentationSectionComponent('ComponentsHoverActionsNg1Component')
export class ComponentsHoverActionsNg1Component extends BaseDocumentationSection implements ICodePenProvider {
    
    private htmlCode = this.snippets.compiled.layoutHtml;
    private jsCode = this.snippets.compiled.controllerJs;
    private cssCode = this.snippets.compiled.stylesCss;

    public codepen: ICodePen = {
        html: this.snippets.raw.layoutHtml,
        htmlAttributes: {
            'ng-controller': 'HoverActionCtrl'
        },
        js: [this.snippets.raw.controllerJs],
        css: [this.snippets.raw.stylesCss]
    };
    
    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}