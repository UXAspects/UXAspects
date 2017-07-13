import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
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
    
    form: FormGroup;

    plunk: IPlunk = {
        files: {
            'app.component.ts': this.snippets.raw.appTs,
            'app.component.html': this.snippets.raw.appHtml,
            'app.component.css': this.snippets.raw.appCss
        },
        modules: [{
            imports: ['NumberPickerModule'],
            library: 'ux-aspects'
        }]
    };

    constructor(formBuilder: FormBuilder) {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));

        this.form = formBuilder.group({
            integer: [0, Validators.compose([Validators.required, Validators.min(-10), Validators.max(10)])],
            decimal: [0, Validators.compose([Validators.required, Validators.min(0), Validators.max(10)])]
        });
    }
}