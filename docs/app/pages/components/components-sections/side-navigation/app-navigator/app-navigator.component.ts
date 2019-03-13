import { Component } from '@angular/core';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';
import { playgroundAdapter } from '../../../../../services/playground/adapters/legacy-playground-adapter';


@Component({
    selector: 'uxd-components-side-navigation-app-navigator',
    templateUrl: './app-navigator.component.html'
})
@DocumentationSectionComponent('ComponentsAppNavigatorComponent')
export class ComponentsAppNavigatorComponent extends BaseDocumentationSection implements IPlaygroundProvider {

    playground: IPlayground = playgroundAdapter({
        html: this.snippets.raw.appExampleHtml,
        htmlTemplates: [{
            id: 'app_navigator_popover.tmpl.html',
            content: this.snippets.raw.popoverHtml,
        }],
        css: [this.snippets.raw.sampleCss]
    });

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }

}