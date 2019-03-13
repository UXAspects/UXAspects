import { Component } from '@angular/core';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';
import { playgroundAdapter } from '../../../../../services/playground/adapters/legacy-playground-adapter';


@Component({
    selector: 'uxd-components-side-navigation-navigation',
    templateUrl: './navigation.component.html'
})
@DocumentationSectionComponent('ComponentsNavigationComponent')
export class ComponentsNavigationComponent extends BaseDocumentationSection implements IPlaygroundProvider {

    noteCode = require('!!raw-loader!./snippets/ng-class.html');

    playground: IPlayground = playgroundAdapter({
        html: this.snippets.raw.sampleHtml,
        js: [this.snippets.raw.sampleJs]
    });

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }

}