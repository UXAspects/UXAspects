import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-components-detail-row-header',
    templateUrl: './detail-row-header-ng1.component.html'
})
@DocumentationSectionComponent('ComponentsDetailRowHeaderNg1Component')
export class ComponentsDetailRowHeaderNg1Component extends BaseDocumentationSection implements ICodePenProvider {

    private htmlCode = this.snippets.compiled.layoutHtml;
    private controllerCode = this.snippets.compiled.controllerJs;
    private popoverHtmlCode = this.snippets.compiled.popoverHtml;
    private popoverControllerCode = this.snippets.compiled.popoverControllerJs;
    private styleCode = this.snippets.compiled.stylesCss;
    private serviceCode = this.snippets.compiled.serviceJs;

    public codepen: ICodePen = {
        html: this.snippets.examples.layoutHtml,
        htmlAttributes: {
            'ng-controller': 'DetailRowResponsiveTableCtrl as vm'
        },
        htmlTemplates: [
            {
                id: 'detailRowHeaderPopover.html',
                content: this.snippets.examples.popoverHtml
            }
        ],
        js: [
            this.snippets.examples.controllerJs,
            this.snippets.examples.popoverControllerJs,
            this.snippets.examples.serviceJs
        ],
        css: [
            this.snippets.examples.stylesCss
        ]
    };
    
    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}