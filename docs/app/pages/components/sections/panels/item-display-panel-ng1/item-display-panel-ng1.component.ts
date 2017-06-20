import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';

@Component({
    selector: 'uxd-item-display-panel-ng1',
    templateUrl: './item-display-panel-ng1.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DocumentationSectionComponent('ComponentsItemDisplayPanelNg1Component')
export class ComponentsItemDisplayPanelNg1Component extends BaseDocumentationSection implements ICodePenProvider {
    public codepen: ICodePen = {
        html: this.snippets.examples.layoutHtml,
        htmlAttributes: {
            'ng-controller': 'ItemDisplayPanelDemoCtrl as vm'
        },
        htmlTemplates: [{
            id: 'modalDOC.html',
            content: this.snippets.examples.modalDOCHtml
        }, {
            id: 'modalPDF.html',
            content: this.snippets.examples.modalPDFHtml
        }, {
            id: 'modalPPT.html',
            content: this.snippets.examples.modalPPTHtml
        }, {
            id: 'modalFooter.html',
            content: this.snippets.examples.modalFooterHtml
        }],
        css: [this.snippets.examples.stylesCss],
        js: [this.snippets.examples.controllerJs]
    };

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}
