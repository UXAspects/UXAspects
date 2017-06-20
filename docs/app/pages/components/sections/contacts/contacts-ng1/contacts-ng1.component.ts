import { Component, ViewEncapsulation } from '@angular/core';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';

@Component({
    selector: 'uxd-contacts-ng1',
    templateUrl: './contacts-ng1.component.html'
})
@DocumentationSectionComponent('ComponentsContactsNg1Component')
export class ComponentsContactsNg1Component extends BaseDocumentationSection implements ICodePenProvider {
    public codepen: ICodePen = {
        html: this.snippets.examples.contactsHtml,
        htmlAttributes: {
            'ng-controller': 'ContactsDemoCtrl as vm'
        },
        htmlTemplates: [{
            id: 'contacts-popover.html',
            content: this.snippets.examples.contactsPopoverHtml
        }],
        css: [this.snippets.examples.contactsCss],
        js: [this.snippets.examples.contactsJs]
    };

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}
