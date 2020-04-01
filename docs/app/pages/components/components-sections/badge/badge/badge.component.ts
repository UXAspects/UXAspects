import { Component } from '@angular/core';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';

@Component({
    selector: 'uxd-components-badge',
    templateUrl: './badge.component.html'
})
@DocumentationSectionComponent('ComponentsBadgeComponent')
export class ComponentsBadgeComponent extends BaseDocumentationSection implements IPlaygroundProvider {

    playground: IPlayground = {
        files: {
            'app.component.html': this.snippets.raw.appHtml,
            'app.component.ts': this.snippets.raw.appTs
        },
        modules: [
            {
                imports: ['BadgeModule'],
                library: '@ux-aspects/ux-aspects'
            },
            {
                imports: ['RouterModule'],
                library: '@angular/router',
                providers: ['RouterModule.forRoot([])']
            }
        ]
    };

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}
