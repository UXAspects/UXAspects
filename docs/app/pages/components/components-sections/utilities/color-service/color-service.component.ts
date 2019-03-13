import { Component } from '@angular/core';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';

@Component({
    selector: 'uxd-components-color-service',
    templateUrl: './color-service.component.html',
    styleUrls: ['./color-service.component.less']
})
@DocumentationSectionComponent('ComponentsColorServiceComponent')
export class ComponentsColorServiceComponent extends BaseDocumentationSection implements IPlaygroundProvider {

    focused = false;

    playground: IPlayground = {
        files: {
            'app.component.ts': this.snippets.raw.appExampleTs,
            'app.component.html': this.snippets.raw.appHtml,
            'app.component.css': this.snippets.raw.appCss
        },
        modules: [{
            library: 'chart.js'
        }, {
            imports: ['ChartsModule'],
            library: 'ng2-charts'
        }, {
            imports: ['ColorServiceModule', 'SelectModule'],
            library: '@ux-aspects/ux-aspects'
        }]
    };

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}
