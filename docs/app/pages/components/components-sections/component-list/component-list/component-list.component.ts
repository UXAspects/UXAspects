import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlunkProvider } from '../../../../../interfaces/IPlunkProvider';
import { IPlunk } from '../../../../../interfaces/IPlunk';

@Component({
    selector: 'uxd-component-list',
    templateUrl: './component-list.component.html'
})
@DocumentationSectionComponent('ComponentsComponentListComponent')
export class ComponentsComponentListComponent extends BaseDocumentationSection implements IPlunkProvider {

    plunk: IPlunk = {
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

    form = new FormGroup({
        items: new FormArray([
            new FormControl(null, [Validators.required])
        ])
    });

    get items(): FormArray {
        return this.form.get('items') as FormArray;
    }

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }

    add(): void {
        if (this.form.valid) {
            this.items.push(new FormControl(null, [Validators.required]));
        }
    }

    remove(index: number): void {
        if (this.items.length > 1) {
            this.items.removeAt(index);
        }
    }
}