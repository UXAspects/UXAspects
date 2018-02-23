import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { IPlunkProvider } from '../../../../../interfaces/IPlunkProvider';
import { IPlunk } from '../../../../../interfaces/IPlunk';
 
@Component({
    selector: 'uxd-components-color-service',
    templateUrl: './color-service.component.html',
    styleUrls: ['./color-service.component.less']
})
@DocumentationSectionComponent('ComponentsColorServiceComponent')
export class ComponentsColorServiceComponent extends BaseDocumentationSection implements IPlunkProvider {

    focused = false;

    plunk: IPlunk = {
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
 