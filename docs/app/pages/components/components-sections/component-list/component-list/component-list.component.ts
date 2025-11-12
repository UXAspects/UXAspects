import { Component } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  AccessibilityModule,
  FocusIfModule,
  IconModule,
  TabsetModule,
} from '@ux-aspects/ux-aspects';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { SnippetComponent } from '../../../../../components/snippet/snippet.component';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';

@Component({
  selector: 'uxd-component-list',
  templateUrl: './component-list.component.html',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    FocusIfModule,
    AccessibilityModule,
    IconModule,
    TabsetModule,
    SnippetComponent,
  ],
})
@DocumentationSectionComponent('ComponentsComponentListComponent')
export class ComponentsComponentListComponent
  extends BaseDocumentationSection
  implements IPlaygroundProvider
{
  playground: IPlayground = {
    files: {
      'app.component.html': this.snippets.raw.appHtml,
      'app.component.ts': this.snippets.raw.appTs,
    },
    modules: [
      {
        imports: ['FocusIfModule'],
        library: '@ux-aspects/ux-aspects',
      },
    ],
  };

  form = new FormGroup({
    items: new FormArray([new FormControl(null, [Validators.required])]),
  });

  get items(): FormArray {
    return this.form.get('items') as FormArray;
  }

  constructor() {
    super(
      import.meta.webpackContext('./snippets/', {
        recursive: false,
        regExp: /\.(html|css|js|ts)$/,
      })
    );
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
