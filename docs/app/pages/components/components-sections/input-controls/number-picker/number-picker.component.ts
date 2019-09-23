import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';

@Component({
    selector: 'uxd-components-number-picker-ng1',
    templateUrl: './number-picker.component.html'
})
@DocumentationSectionComponent('ComponentsNumberPickerComponent')
export class ComponentsNumberPickerComponent extends BaseDocumentationSection implements IPlaygroundProvider {

    form: FormGroup;

    playground: IPlayground = {
        files: {
            'app.component.ts': this.snippets.raw.appTs,
            'app.component.html': this.snippets.raw.appHtml,
            'app.component.css': this.snippets.raw.appCss
        },
        modules: [{
            imports: ['NumberPickerModule'],
            library: '@ux-aspects/ux-aspects'
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