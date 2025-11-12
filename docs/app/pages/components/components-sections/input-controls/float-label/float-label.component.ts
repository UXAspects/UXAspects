import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  AccessibilityModule,
  FloatLabelModule,
  IconModule,
  TabsetModule,
} from '@ux-aspects/ux-aspects';
import { ApiPropertiesComponent } from '../../../../../components/api-properties/api-properties.component';
import { ApiPropertyComponent } from '../../../../../components/api-property/api-property.component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { SnippetComponent } from '../../../../../components/snippet/snippet.component';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';

@Component({
  selector: 'uxd-float-label',
  templateUrl: './float-label.component.html',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    FloatLabelModule,
    AccessibilityModule,
    IconModule,
    ApiPropertiesComponent,
    ApiPropertyComponent,
    TabsetModule,
    SnippetComponent,
  ],
})
@DocumentationSectionComponent('ComponentsFloatLabelComponent')
export class ComponentsFloatLabelComponent
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
        imports: ['FloatLabelModule'],
        library: '@ux-aspects/ux-aspects',
      },
    ],
  };

  demoForm: FormGroup;

  get locationValue(): string {
    return this.demoForm.get('location').value;
  }

  set locationValue(value: string) {
    this.demoForm.get('location').setValue(value);
  }

  constructor() {
    const formBuilder = inject(FormBuilder);

    super(
      import.meta.webpackContext('./snippets/', {
        recursive: false,
        regExp: /\.(html|css|js|ts)$/,
      })
    );

    this.demoForm = formBuilder.group({
      username: [''],
      location: [''],
    });
  }
}
