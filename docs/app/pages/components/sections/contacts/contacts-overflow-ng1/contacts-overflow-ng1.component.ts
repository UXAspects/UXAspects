import { Component, ViewEncapsulation } from '@angular/core';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';

@Component({
    selector: 'uxd-contacts-overflow-ng1',
    templateUrl: './contacts-overflow-ng1.component.html',
    styleUrls: ['./contacts-overflow-ng1.component.less'],
    encapsulation: ViewEncapsulation.None
})
@DocumentationSectionComponent('ComponentsContactsOverflowNg1Component')
export class ComponentsContactsOverflowNg1Component implements ICodePenProvider {
    private htmlCode = require('./snippets/contacts-overflow.html');
    private cssCode = require('./snippets/contacts-overflow.css');
    private javascriptCode = require('./snippets/contacts-overflow.js');
    private modalHtmlCode = require('./snippets/contacts-overflow-modal.html');
    private modalJavascriptCode = require('./snippets/contacts-overflow-modal.js');
    private modalItemHtmlCode = require('./snippets/contacts-overflow-modal-item.html');
    public codepen: ICodePen = {
        html: this.htmlCode,
        htmlAttributes: {
            'ng-controller': 'ContactsOverflowDemoCtrl as vm'
        },
        htmlTemplates: [{
            id: 'contacts-overflow-modal.html',
            content: this.modalHtmlCode
        }, {
            id: 'contacts-overflow-modal-item.html',
            content: this.modalItemHtmlCode
        }],
        css: [this.cssCode],
        js: [this.javascriptCode, this.modalJavascriptCode]
    };
}
