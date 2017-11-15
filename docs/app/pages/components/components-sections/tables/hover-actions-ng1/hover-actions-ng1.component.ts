import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-components-hover-actions-ng1',
    templateUrl: './hover-actions-ng1.component.html'
})
@DocumentationSectionComponent('ComponentsHoverActionsNg1Component')
export class ComponentsHoverActionsNg1Component extends BaseDocumentationSection implements ICodePenProvider {
    
    htmlCode = this.snippets.compiled.layoutHtml;
    jsCode = this.snippets.compiled.controllerJs;
    cssCode = this.snippets.compiled.stylesCss;

    codepen: ICodePen = {
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