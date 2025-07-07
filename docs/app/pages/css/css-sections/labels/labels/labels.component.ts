import { Component } from '@angular/core';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { SnippetComponent } from '../../../../../components/snippet/snippet.component';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';
import { playgroundAdapter } from '../../../../../services/playground/adapters/legacy-playground-adapter';

@Component({
  selector: 'uxd-css-labels-labels',
  templateUrl: './labels.component.html',
  imports: [SnippetComponent],
})
@DocumentationSectionComponent('CssLabelsComponent')
export class CssLabelsComponent extends BaseDocumentationSection implements IPlaygroundProvider {
  playground: IPlayground = playgroundAdapter({
    html: this.snippets.raw.codeExampleHtml,
  });

  constructor() {
    super(
      import.meta.webpackContext('./snippets/', {
        recursive: false,
        regExp: /\.(html|css|js|ts)$/,
      })
    );
  }
}
