import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';

@Component({
    selector: 'uxd-components-detail-row-header',
    templateUrl: './detail-row-header-ng1.component.html'
})
@DocumentationSectionComponent('ComponentsDetailRowHeaderNg1Component')
export class ComponentsDetailRowHeaderNg1Component implements ICodePenProvider {

    private htmlCode = require('./snippets/layout.html');
    private controllerCode = require('./snippets/controller.js');
    private popoverHtmlCode = require('./snippets/popover.html');
    private popoverControllerCode = require('./snippets/popover.controller.js');
    private styleCode = require('./snippets/styles.css');
    private serviceCode = require('./snippets/service.js');

    public codepen: ICodePen = {
        html: this.htmlCode,
        htmlAttributes: {
            'ng-controller': 'DetailRowResponsiveTableCtrl as vm'
        },
        htmlTemplates: [
            {
                id: 'detailRowHeaderPopover.html',
                content: this.popoverHtmlCode
            }
        ],
        js: [
            this.controllerCode,
            this.popoverControllerCode,
            this.serviceCode
        ],
        css: [
            this.styleCode
        ]
    };
}