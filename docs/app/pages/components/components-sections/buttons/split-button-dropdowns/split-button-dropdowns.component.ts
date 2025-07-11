import { Component, Inject } from '@angular/core';
import { AccessibilityModule, IconModule, MenuModule, TabsetModule } from '@ux-aspects/ux-aspects';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { SnippetComponent } from '../../../../../components/snippet/snippet.component';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';
import { DOCUMENTATION_TOKEN, DocumentationType } from '../../../../../tokens/documentation.token';

@Component({
  selector: 'uxd-components-buttons-split-button-dropdowns',
  templateUrl: './split-button-dropdowns.component.html',
  imports: [AccessibilityModule, MenuModule, IconModule, TabsetModule, SnippetComponent],
})
@DocumentationSectionComponent('ComponentsSplitButtonDropdownsComponent')
export class ComponentsSplitButtonDropdownsComponent
  extends BaseDocumentationSection
  implements IPlaygroundProvider
{
  playground: IPlayground = {
    files: {
      'app.component.html':
        this._documentationType === DocumentationType.MicroFocus
          ? this.snippets.raw.appMicrofocusHtml
          : this.snippets.raw.appHtml,
      'app.component.ts': this.snippets.raw.appTs,
    },
    modules: [
      {
        imports: ['MenuModule'],
        library: '@ux-aspects/ux-aspects',
      },
    ],
  };

  toggleIcon = this._documentationType === DocumentationType.MicroFocus ? 'chevron-down' : 'down';

  constructor(@Inject(DOCUMENTATION_TOKEN) private readonly _documentationType: DocumentationType) {
    super(
      import.meta.webpackContext('./snippets/', {
        recursive: false,
        regExp: /\.(html|css|js|ts)$/,
      })
    );

    this.snippets.compiled.appHtml =
      this._documentationType === DocumentationType.MicroFocus
        ? this.snippets.compiled.appMicrofocusHtml
        : this.snippets.compiled.appHtml;
  }
}
