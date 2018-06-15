import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { IPlunkProvider } from '../../../../../interfaces/IPlunkProvider';
import { IPlunk } from '../../../../../interfaces/IPlunk';

@Component({
    selector: 'uxd-float-label',
    templateUrl: './float-label.component.html',
})
@DocumentationSectionComponent('ComponentsFloatLabelComponent')
export class ComponentsFloatLabelComponent extends BaseDocumentationSection implements IPlunkProvider {

    plunk: IPlunk = {
        files: {
            'app.component.html': this.snippets.raw.appHtml,
            'app.component.ts': this.snippets.raw.appTs,
        },
        modules: [
            {
                imports: ['FloatLabelModule'],
                library: '@ux-aspects/ux-aspects'
            },
        ]
    };

    demoForm: FormGroup;

    get locationValue(): string {
        return this.demoForm.get('location').value;
    }

    set locationValue(value: string) {
        this.demoForm.get('location').setValue(value);
    }

    constructor(formBuilder: FormBuilder) {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));

        this.demoForm = formBuilder.group({
            'username': [''],
            'location': ['']
        });
    }
}