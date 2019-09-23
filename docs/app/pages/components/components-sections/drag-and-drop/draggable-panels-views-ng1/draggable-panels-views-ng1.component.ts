import { Component, ViewEncapsulation } from '@angular/core';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';
import { playgroundAdapter } from '../../../../../services/playground/adapters/legacy-playground-adapter';

@Component({
    selector: 'uxd-draggable-panels-views-ng1',
    templateUrl: './draggable-panels-views-ng1.component.html',
    styleUrls: ['./draggable-panels-views-ng1.component.less'],
    encapsulation: ViewEncapsulation.None
})
@DocumentationSectionComponent('ComponentsDraggablePanelsViewsNg1Component')
export class ComponentsDraggablePanelsViewsNg1Component extends BaseDocumentationSection implements IPlaygroundProvider {

    playground: IPlayground = playgroundAdapter({
        html: this.snippets.raw.draggablePanelsViewsHtml,
        htmlAttributes: {
            'ng-controller': 'DraggablePanelsViewsDemoCtrl as vm'
        },
        css: [this.snippets.raw.draggablePanelsViewsCss],
        js: [this.snippets.raw.draggablePanelsViewsJs]
    });

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}
