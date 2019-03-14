import { Component } from '@angular/core';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';

@Component({
    selector: 'uxd-progress-bar',
    templateUrl: './progress-bar.component.html'
})
@DocumentationSectionComponent('ComponentsProgressBarComponent')
export class ComponentsProgressBarComponent extends BaseDocumentationSection implements IPlaygroundProvider {

    value: number = 15;

    playground: IPlayground = {
        files: {
            'app.component.html': this.snippets.raw.appHtml,
            'app.component.ts': this.snippets.raw.appTs,
        },
        modules: [{
            imports: ['ProgressBarModule'],
            library: '@ux-aspects/ux-aspects'
        }]
    };

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }

    randomize() {
        this.value = Math.floor((Math.random() * 100) + 1);
    }
}
