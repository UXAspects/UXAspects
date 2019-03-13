import { Component } from '@angular/core';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';
import { playgroundAdapter } from '../../../../../services/playground/adapters/legacy-playground-adapter';

@Component({
    selector: 'uxd-single-toggle-button-ng1',
    templateUrl: './single-toggle-button-ng1.component.html',
})
@DocumentationSectionComponent('ComponentsSingleToggleButtonNg1Component')
export class ComponentsSingleToggleButtonNg1Component extends BaseDocumentationSection implements IPlaygroundProvider {

    playground: IPlayground = playgroundAdapter({
        html: this.snippets.raw.singleToggleButtonHtml,
        htmlAttributes: {
            'ng-controller': 'SingleToggleButtonCtrl as vm'
        },
        js: [this.snippets.raw.singleToggleButtonJs]
    });

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}
