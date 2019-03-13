import { Component } from '@angular/core';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';
import { playgroundAdapter } from '../../../../../services/playground/adapters/legacy-playground-adapter';

@Component({
    selector: 'uxd-contacts-ng1',
    templateUrl: './contacts-ng1.component.html'
})
@DocumentationSectionComponent('ComponentsContactsNg1Component')
export class ComponentsContactsNg1Component extends BaseDocumentationSection implements IPlaygroundProvider {

    playground: IPlayground = playgroundAdapter({
        html: this.snippets.raw.contactsHtml,
        htmlAttributes: {
            'ng-controller': 'ContactsDemoCtrl as vm'
        },
        htmlTemplates: [{
            id: 'contacts-popover.html',
            content: this.snippets.raw.contactsPopoverHtml
        }],
        css: [this.snippets.raw.contactsCss],
        js: [this.snippets.raw.contactsJs]
    });

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}
