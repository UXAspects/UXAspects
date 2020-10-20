import { Component } from '@angular/core';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';
import { playgroundAdapter } from '../../../../../services/playground/adapters/legacy-playground-adapter';

@Component({
    selector: 'uxd-css-colored-buttons',
    templateUrl: './colored-buttons.component.html'
})
@DocumentationSectionComponent('CssColoredButtonsComponent')
export class CssColoredButtonsComponent extends BaseDocumentationSection implements IPlaygroundProvider {

    playground = () => {
        return playgroundAdapter({
            html: this.snippets.raw.sampleHtml
        });
    }

    constructor() {
        super(require.context('./snippets/', false, /(html|css|js|ts)$/));
    }
}
