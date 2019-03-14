import { Component } from '@angular/core';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';
import { playgroundAdapter } from '../../../../../services/playground/adapters/legacy-playground-adapter';

@Component({
    selector: 'uxd-css-buttons-hyperlinks',
    templateUrl: './hyperlinks.component.html'
})
@DocumentationSectionComponent('CssHyperlinksComponent')
export class CssHyperlinksComponent extends BaseDocumentationSection implements IPlaygroundProvider {

    playground: IPlayground = playgroundAdapter({
        html: this.snippets.raw.codepenExampleHtml
    });

    constructor() {
        super(require.context('./snippets/', false, /(html|css|js|ts)$/));
    }

}