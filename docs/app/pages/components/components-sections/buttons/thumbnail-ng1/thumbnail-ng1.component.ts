import { Component, ViewEncapsulation } from '@angular/core';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';
import { playgroundAdapter } from '../../../../../services/playground/adapters/legacy-playground-adapter';

@Component({
    selector: 'uxd-thumbnail-ng1',
    templateUrl: './thumbnail-ng1.component.html',
    styleUrls: ['./thumbnail-ng1.component.less'],
    encapsulation: ViewEncapsulation.None
})
@DocumentationSectionComponent('ComponentsThumbnailNg1Component')
export class ComponentsThumbnailNg1Component extends BaseDocumentationSection implements IPlaygroundProvider {

    playground: IPlayground = playgroundAdapter({
        html: this.snippets.raw.thumbnailHtml,
        htmlAttributes: {
            'ng-controller': 'ThumbnailDemoCtrl as vm'
        },
        css: [this.snippets.raw.thumbnailExampleCss],
        js: [this.snippets.raw.thumbnailExampleJs]
    });

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}
