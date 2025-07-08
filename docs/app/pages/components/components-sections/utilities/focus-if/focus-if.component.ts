import { Component } from '@angular/core';
import { AccessibilityModule, FocusIfModule, TabsetModule } from '@ux-aspects/ux-aspects';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { SnippetComponent } from '../../../../../components/snippet/snippet.component';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';

@Component({
  selector: 'uxd-components-focus-if',
  templateUrl: './focus-if.component.html',
  styleUrls: ['./focus-if.component.less'],
  imports: [FocusIfModule, AccessibilityModule, TabsetModule, SnippetComponent],
})
@DocumentationSectionComponent('ComponentsFocusIfComponent')
export class ComponentsFocusIfComponent
  extends BaseDocumentationSection
  implements IPlaygroundProvider
{
  focused = false;

  playground: IPlayground = {
    files: {
      'app.component.ts': this.snippets.raw.appTs,
      'app.component.html': this.snippets.raw.appHtml,
      'app.component.css': this.snippets.raw.appCss,
    },
    modules: [
      {
        imports: ['FocusIfModule'],
        library: '@ux-aspects/ux-aspects',
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
