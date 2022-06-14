import { Component } from '@angular/core';
import { UntypedFormArray, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';

@Component({
    selector: 'uxd-component-list',
    templateUrl: './component-list.component.html'
})
@DocumentationSectionComponent('ComponentsComponentListComponent')
export class ComponentsComponentListComponent extends BaseDocumentationSection implements IPlaygroundProvider {

    playground: IPlayground = {
        files: {
            'app.component.html': this.snippets.raw.appHtml,
            'app.component.ts': this.snippets.raw.appTs,
        },
        modules: [
            {
                imports: ['FocusIfModule'],
                library: '@ux-aspects/ux-aspects'
            }
        ]
    };

    form = new UntypedFormGroup({
        items: new UntypedFormArray([
            new UntypedFormControl(null, [Validators.required])
        ])
    });

    get items(): UntypedFormArray {
        return this.form.get('items') as UntypedFormArray;
    }

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }

    add(): void {
        if (this.form.valid) {
            this.items.push(new UntypedFormControl(null, [Validators.required]));
        }
    }

    remove(index: number): void {
        if (this.items.length > 1) {
            this.items.removeAt(index);
        }
    }
}