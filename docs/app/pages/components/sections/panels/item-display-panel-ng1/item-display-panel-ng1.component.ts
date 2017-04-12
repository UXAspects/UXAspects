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
export class ComponentsItemDisplayPanelNg1Component implements ICodePenProvider {

    private layoutHtml = require('./snippets/layout.html');
    private controllerExampleJs = require('./snippets/controller.example.js');
    private modalFooterHtml = require('./snippets/modalFooter.html');
    private modalDOCHtml = require('./snippets/modalDOC.html');
    private modalPDFHtml = require('./snippets/modalPDF.html');
    private modalPPTHtml = require('./snippets/modalPPT.html');
    private controllerJs = require('./snippets/controller.js');
    private stylesCss = require('./snippets/styles.css');

    public codepen: ICodePen = {
        html: this.layoutHtml,
        htmlAttributes: {
            'ng-controller': 'ItemDisplayPanelDemoCtrl as vm'
        },
        htmlTemplates: [{
            id: 'modalDOC.html',
            content: this.modalDOCHtml
        }, {
            id: 'modalPDF.html',
            content: this.modalPDFHtml
        }, {
            id: 'modalPPT.html',
            content: this.modalPPTHtml
        }, {
            id: 'modalFooter.html',
            content: this.modalFooterHtml
        }],
        css: [this.stylesCss],
        js: [this.controllerJs]
    };
}
