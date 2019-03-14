import { Component } from '@angular/core';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';
import { playgroundAdapter } from '../../../../../services/playground/adapters/legacy-playground-adapter';

@Component({
    selector: 'uxd-components-flippable-cards-ng1',
    templateUrl: './flippable-cards-ng1.component.html'
})
@DocumentationSectionComponent('ComponentsFlippableCardsNg1Component')
export class ComponentsFlippableCardsNg1Component extends BaseDocumentationSection implements IPlaygroundProvider {

    playground: IPlayground = playgroundAdapter({
        html: this.snippets.raw.appHtml,
        htmlAttributes: {
            'ng-controller': 'FlippableCardCtrl as vm'
        },
        js: [this.snippets.raw.appJs],
        css: [this.snippets.raw.appCss]
    });

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }

}