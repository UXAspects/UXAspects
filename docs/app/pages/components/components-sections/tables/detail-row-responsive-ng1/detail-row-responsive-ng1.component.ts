import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-components-detail-row-responsive',
    templateUrl: './detail-row-responsive-ng1.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DocumentationSectionComponent('ComponentsDetailRowResponsiveNg1Component')
export class ComponentsDetailRowResponsiveNg1Component extends BaseDocumentationSection implements ICodePenProvider {

    htmlCode = this.snippets.compiled.layoutHtml;
    jsCode = this.snippets.compiled.controllerJs;
    cssCode = this.snippets.compiled.stylesCss;

    codepen: ICodePen = {
        html: this.snippets.raw.codepenHtml,
        htmlAttributes: {
            'ng-controller': 'DetailRowResponsiveTableCtrl as vm'
        },
        js: [this.snippets.raw.codepenJs],
        css: [this.snippets.raw.stylesCss]
    };
    
    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}