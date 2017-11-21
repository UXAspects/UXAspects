import { Component, ViewEncapsulation } from '@angular/core';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-contacts-overflow-ng1',
    templateUrl: './contacts-overflow-ng1.component.html',
    styleUrls: ['./contacts-overflow-ng1.component.less'],
    encapsulation: ViewEncapsulation.None
})
@DocumentationSectionComponent('ComponentsContactsOverflowNg1Component')
export class ComponentsContactsOverflowNg1Component extends BaseDocumentationSection implements ICodePenProvider {

    codepen: ICodePen = {
        html: this.snippets.raw.contactsOverflowHtml,
        htmlAttributes: {
            'ng-controller': 'ContactsOverflowDemoCtrl as vm'
        },
        htmlTemplates: [{
            id: 'contacts-overflow-modal.html',
            content: this.snippets.raw.contactsOverflowModalHtml
        }, {
            id: 'contacts-overflow-modal-item.html',
            content: this.snippets.raw.contactsOverflowModalItemHtml
        }],
        css: [this.snippets.raw.contactsOverflowCss],
        js: [this.snippets.raw.contactsOverflowJs, this.snippets.raw.contactsOverflowModalJs]
    };
    
    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}
