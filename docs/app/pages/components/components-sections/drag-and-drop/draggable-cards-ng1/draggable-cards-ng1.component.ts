import { Component, ViewEncapsulation } from '@angular/core';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';
import { playgroundAdapter } from '../../../../../services/playground/adapters/legacy-playground-adapter';

@Component({
    selector: 'uxd-draggable-cards-ng1',
    templateUrl: './draggable-cards-ng1.component.html',
    styleUrls: ['./draggable-cards-ng1.component.less'],
    encapsulation: ViewEncapsulation.None
})
@DocumentationSectionComponent('ComponentsDraggableCardsNg1Component')
export class ComponentsDraggableCardsNg1Component extends BaseDocumentationSection implements IPlaygroundProvider {

    playground: IPlayground = playgroundAdapter({
        html: this.snippets.raw.draggableCardsHtml,
        htmlAttributes: {
            'ng-controller': 'DraggableCardsDemoCtrl as vm'
        },
        css: [this.snippets.raw.draggableCardsCss],
        js: [this.snippets.raw.draggableCardsJs]
    });

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}
