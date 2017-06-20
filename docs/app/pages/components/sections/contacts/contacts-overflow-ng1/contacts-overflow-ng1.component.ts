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

    public codepen: ICodePen = {
        html: this.snippets.examples.contactsOverflowHtml,
        htmlAttributes: {
            'ng-controller': 'ContactsOverflowDemoCtrl as vm'
        },
        htmlTemplates: [{
            id: 'contacts-overflow-modal.html',
            content: this.snippets.examples.contactsOverflowModalHtml
        }, {
            id: 'contacts-overflow-modal-item.html',
            content: this.snippets.examples.contactsOverflowModalItemHtml
        }],
        css: [this.snippets.examples.contactsOverflowCss],
        js: [this.snippets.examples.contactsOverflowJs, this.snippets.examples.contactsOverflowModalJs]
    };
    
    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}
