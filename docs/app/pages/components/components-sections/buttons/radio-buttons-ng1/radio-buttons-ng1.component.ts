import { Component } from '@angular/core';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';
import { playgroundAdapter } from '../../../../../services/playground/adapters/legacy-playground-adapter';

@Component({
    selector: 'uxd-radio-buttons-ng1',
    templateUrl: './radio-buttons-ng1.component.html',
})
@DocumentationSectionComponent('ComponentsRadioButtonsNg1Component')
export class ComponentsRadioButtonsNg1Component extends BaseDocumentationSection implements IPlaygroundProvider {

    playground: IPlayground = playgroundAdapter({
        html: this.snippets.raw.radioButtonsHtml,
        htmlAttributes: {
            'ng-controller': 'RadioButtonsCtrl as vm'
        },
        js: [this.snippets.raw.radioButtonsJs]
    });

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}
