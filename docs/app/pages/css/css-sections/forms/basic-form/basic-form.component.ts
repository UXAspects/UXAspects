import { Component } from '@angular/core';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';
import { playgroundAdapter } from '../../../../../services/playground/adapters/legacy-playground-adapter';

@Component({
    selector: 'uxd-css-forms-basic-form',
    templateUrl: './basic-form.component.html'
})
@DocumentationSectionComponent('CssBasicFormComponent')
export class CssBasicFormComponent extends BaseDocumentationSection implements IPlaygroundProvider {

    checked: boolean = false;

    playground: IPlayground = playgroundAdapter({
        html: this.snippets.raw.sampleHtml
    });

    constructor() {
        super(require.context('./snippets/', false, /(html|css|js|ts)$/));
    }
}