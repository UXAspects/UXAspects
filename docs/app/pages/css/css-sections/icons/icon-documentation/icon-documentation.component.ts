import { Component } from '@angular/core';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';

@Component({
    selector: 'uxd-css-icons-documentation',
    templateUrl: './icon-documentation.component.html'
})
@DocumentationSectionComponent('CssDocumentationComponent')
export class CssDocumentationComponent extends BaseDocumentationSection implements IPlaygroundProvider {

    playground: IPlayground = {
        files: {
            'app.component.html': this.snippets.raw.sampleHtml,
        },
        modules: [
            {
                imports: ['IconModule'],
                library: '@ux-aspects/ux-aspects'
            }
        ]
    };

    constructor() {
        super(require.context('./snippets/', false, /(html|css|js|ts)$/));
    }

}