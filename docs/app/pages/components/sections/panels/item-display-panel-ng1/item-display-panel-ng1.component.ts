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
        html: this.snippets.raw.layoutHtml,
        htmlAttributes: {
            'ng-controller': 'ItemDisplayPanelDemoCtrl as vm'
        },
        htmlTemplates: [{
            id: 'modalDOC.html',
            content: this.snippets.raw.modalDOCHtml
        }, {
            id: 'modalPDF.html',
            content: this.snippets.raw.modalPDFHtml
        }, {
            id: 'modalPPT.html',
            content: this.snippets.raw.modalPPTHtml
        }, {
            id: 'modalFooter.html',
            content: this.snippets.raw.modalFooterHtml
        }],
        css: [this.snippets.raw.stylesCss],
        js: [this.snippets.raw.controllerJs]
    };

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}
