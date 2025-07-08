import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccessibilityModule } from '@ux-aspects/ux-aspects';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { SnippetComponent } from '../../../../../components/snippet/snippet.component';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';

@Component({
  selector: 'uxd-components-buttons-radio-buttons',
  templateUrl: './radio-buttons.component.html',
  imports: [AccessibilityModule, ButtonsModule, FormsModule, SnippetComponent],
})
@DocumentationSectionComponent('ComponentsRadioButtonsComponent')
export class ComponentsRadioButtonsComponent
  extends BaseDocumentationSection
  implements IPlaygroundProvider
{
  // Radio model
  primaryRadioValue = 'left';
  accentRadioValue = 'left';

  playground: IPlayground = {
    files: {
      'app.component.html': this.snippets.raw.appHtml,
      'app.component.ts': this.snippets.raw.appTs,
    },
    modules: [
      {
        library: 'ngx-bootstrap/buttons',
        imports: ['ButtonsModule'],
        importsWithProviders: ['ButtonsModule.forRoot()'],
      },
    ],
  };

  constructor() {
    super(
      import.meta.webpackContext('./snippets/', {
        recursive: false,
        regExp: /\.(html|css|js|ts)$/,
      })
    );
  }
}
