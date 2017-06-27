import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { IPlunkProvider } from '../../../../../interfaces/IPlunkProvider';
import { IPlunk } from '../../../../../interfaces/IPlunk';

@Component({
    selector: 'uxd-components-number-picker-ng1',
    templateUrl: './number-picker.component.html'
})
@DocumentationSectionComponent('ComponentsNumberPickerComponent')
export class ComponentsNumberPickerComponent extends BaseDocumentationSection implements IPlunkProvider {

    plunk: IPlunk = {
        files: {
            'app.component.ts': this.snippets.raw.appExampleTs,
            'app.component.html': this.snippets.raw.appHtml,
            'app.component.css': this.snippets.raw.appCss
        },
        modules: [{
            imports: ['NumberPickerModule'],
            library: 'ux-aspects'
        }]
    };

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}