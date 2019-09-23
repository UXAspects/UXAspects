import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';

@Component({
    selector: 'uxd-float-label',
    templateUrl: './float-label.component.html',
})
@DocumentationSectionComponent('ComponentsFloatLabelComponent')
export class ComponentsFloatLabelComponent extends BaseDocumentationSection implements IPlaygroundProvider {

    playground: IPlayground = {
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