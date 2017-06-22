import { Component } from '@angular/core';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlunkProvider } from '../../../../../interfaces/IPlunkProvider';
import { IPlunk } from '../../../../../interfaces/IPlunk';

@Component({
    selector: 'uxd-progress-bar',
    templateUrl: './progress-bar.component.html'
})
@DocumentationSectionComponent('ComponentsProgressBarComponent')
export class ComponentsProgressBarComponent extends BaseDocumentationSection implements IPlunkProvider {

    value: number = 15;

    plunk: IPlunk = {
        files: {
            'app.component.html': this.snippets.compiled.appHtml,
            'app.component.ts': this.snippets.compiled.appTs,
        },
        modules: [{
            imports: ['ProgressBarModule'],
            library: 'ux-aspects'
        }]
    };

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }

    randomize() {
        this.value = Math.floor((Math.random() * 100) + 1);
    }
}
