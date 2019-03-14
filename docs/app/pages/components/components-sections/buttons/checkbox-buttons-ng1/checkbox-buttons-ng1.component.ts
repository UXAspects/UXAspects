import { Component } from '@angular/core';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';
import { playgroundAdapter } from '../../../../../services/playground/adapters/legacy-playground-adapter';

@Component({
    selector: 'uxd-checkbox-buttons-ng1',
    templateUrl: './checkbox-buttons-ng1.component.html',
})
@DocumentationSectionComponent('ComponentsCheckboxButtonsNg1Component')
export class ComponentsCheckboxButtonsNg1Component extends BaseDocumentationSection implements IPlaygroundProvider {

    playground: IPlayground = playgroundAdapter({
        html: this.snippets.raw.checkboxButtonsHtml,
        htmlAttributes: {
            'ng-controller': 'CheckboxButtonsCtrl as vm'
        },
        js: [this.snippets.raw.checkboxButtonsJs]
    });

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}
