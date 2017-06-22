import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { IPlunkProvider } from '../../../../../interfaces/IPlunkProvider';
import { IPlunk } from '../../../../../interfaces/IPlunk';

@Component({
    selector: 'uxd-components-radio-button',
    templateUrl: './radio-button.component.html'
})
@DocumentationSectionComponent('ComponentsRadioButtonComponent')
export class ComponentsRadioButtonComponent extends BaseDocumentationSection implements IPlunkProvider {

    selected = 100;

    radioOptions = {
        option1: 100,
        option2: 'string',
        option3: {
            test: 1
        },
        option4: 'Wrap-Text'
    };

    disabled = false;
    simplified = false;

    plunk: IPlunk = {
        files: {
            'app.component.html': this.snippets.compiled.appHtml,
            'app.component.ts': this.snippets.compiled.appTs,
        },
        modules: [
            {
               imports: ['RadioButtonModule'],
               library: 'ux-aspects' 
            }
        ]
    };

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }

}