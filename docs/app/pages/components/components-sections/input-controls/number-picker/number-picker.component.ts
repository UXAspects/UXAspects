import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IconModule, NumberPickerModule, TabsetModule } from '@ux-aspects/ux-aspects';
import { ApiPropertiesComponent } from '../../../../../components/api-properties/api-properties.component';
import { ApiPropertyComponent } from '../../../../../components/api-property/api-property.component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { SnippetComponent } from '../../../../../components/snippet/snippet.component';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';

@Component({
  selector: 'uxd-components-number-picker',
  templateUrl: './number-picker.component.html',
  imports: [
    NumberPickerModule,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    IconModule,
    ApiPropertiesComponent,
    ApiPropertyComponent,
    TabsetModule,
    SnippetComponent,
  ],
})
@DocumentationSectionComponent('ComponentsNumberPickerComponent')
export class ComponentsNumberPickerComponent
  extends BaseDocumentationSection
  implements IPlaygroundProvider
{
  form: FormGroup;

  playground: IPlayground = {
    files: {
      'app.component.ts': this.snippets.raw.appTs,
      'app.component.html': this.snippets.raw.appHtml,
      'app.component.css': this.snippets.raw.appCss,
    },
    modules: [
      {
        imports: ['NumberPickerModule'],
        library: '@ux-aspects/ux-aspects',
      },
    ],
  };

  constructor(formBuilder: FormBuilder) {
    super(
      import.meta.webpackContext('./snippets/', {
        recursive: false,
        regExp: /\.(html|css|js|ts)$/,
      })
    );

    this.form = formBuilder.group({
      integer: [
        0,
        Validators.compose([Validators.required, Validators.min(-10), Validators.max(10)]),
      ],
      decimal: [
        0,
        Validators.compose([Validators.required, Validators.min(0), Validators.max(10)]),
      ],
    });
  }
}
