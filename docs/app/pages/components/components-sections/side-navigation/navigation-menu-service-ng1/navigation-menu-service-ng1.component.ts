import { Component } from '@angular/core';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';
import { playgroundAdapter } from '../../../../../services/playground/adapters/legacy-playground-adapter';


@Component({
    selector: 'uxd-components-side-navigation-navigation-menu-service-ng1',
    templateUrl: './navigation-menu-service-ng1.component.html'
})
@DocumentationSectionComponent('ComponentsNavigationMenuServiceNg1Component')
export class ComponentsNavigationMenuServiceNg1Component extends BaseDocumentationSection implements IPlaygroundProvider {

    playground: IPlayground = playgroundAdapter({
        html: this.snippets.raw.layoutExampleHtml,
        css: [this.snippets.raw.stylesExampleCss],
        js: [this.snippets.raw.controllerJs]
    });

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }

}