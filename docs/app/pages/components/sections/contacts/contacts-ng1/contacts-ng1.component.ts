import { Component, ViewEncapsulation } from '@angular/core';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import './wrapper/contacts-wrapper.directive';

@Component({
    selector: 'uxd-contacts-ng1',
    templateUrl: './contacts-ng1.component.html',
    encapsulation: ViewEncapsulation.None
})
@DocumentationSectionComponent('ComponentsContactsNg1Component')
export class ComponentsContactsNg1Component implements ICodePenProvider {
    private htmlCode = require('./snippets/contacts.html');
    private cssCode = require('./snippets/contacts.css');
    private javascriptCode = require('./snippets/contacts.js');
    private popoverHtmlCode = require('./snippets/contacts-popover.html');
    private contactsJavascriptCode = require('./snippets/contacts-contacts.js');
    private labelsJavascriptCode = require('./snippets/contacts-labels.js');
    public codepen: ICodePen = {
        html: this.htmlCode,
        htmlAttributes: {
            'ng-controller': 'ContactsDemoCtrl as vm'
        },
        htmlTemplates: [{
            id: 'contacts-popover.html',
            content: this.popoverHtmlCode
        }],
        css: [this.cssCode],
        js: [this.javascriptCode]
    };
}
