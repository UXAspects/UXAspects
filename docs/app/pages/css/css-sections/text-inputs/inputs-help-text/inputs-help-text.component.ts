import { Component } from '@angular/core';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';
import { playgroundAdapter } from '../../../../../services/playground/adapters/legacy-playground-adapter';


@Component({
    selector: 'uxd-css-text-inputs-inputs-help-text',
    templateUrl: './inputs-help-text.component.html'
})
@DocumentationSectionComponent('CssInputsHelpTextComponent')
export class CssInputsHelpTextComponent extends BaseDocumentationSection implements IPlaygroundProvider {

    playground: IPlayground = playgroundAdapter({
        html: this.snippets.raw.codepenExampleHtml
    });

    constructor() {
        super(require.context('./snippets/', false, /(html|css|js|ts)$/));
    }

}