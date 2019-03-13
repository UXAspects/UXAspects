import { Component } from '@angular/core';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';
import { playgroundAdapter } from '../../../../../services/playground/adapters/legacy-playground-adapter';

@Component({
    selector: 'uxmd-icon-buttons',
    templateUrl: 'icon-buttons.component.html'
})
@DocumentationSectionComponent('IconButtonsDocumentationComponent')
export class IconButtonsDocumentationComponent extends BaseDocumentationSection implements IPlaygroundProvider {
    
    playground: IPlayground = playgroundAdapter({
        html: this.snippets.raw.appHtml
    });

    constructor() {
        super(require.context('./snippets/', false, /(html|css|js|ts)$/));
    }
}