import { Component } from '@angular/core';
import { AccessibilityModule } from '@ux-aspects/ux-aspects';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { SnippetComponent } from '../../../../../components/snippet/snippet.component';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';
import { playgroundAdapter } from '../../../../../services/playground/adapters/legacy-playground-adapter';

@Component({
  selector: 'uxd-css-colored-buttons',
  templateUrl: './colored-buttons.component.html',
  imports: [AccessibilityModule, SnippetComponent],
})
@DocumentationSectionComponent('CssColoredButtonsComponent')
export class CssColoredButtonsComponent
  extends BaseDocumentationSection
  implements IPlaygroundProvider
{
  playground = () => {
    return playgroundAdapter({
      html: this.snippets.raw.sampleHtml,
    });
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
