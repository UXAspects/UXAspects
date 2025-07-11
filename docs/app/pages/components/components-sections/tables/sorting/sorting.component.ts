import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AccessibilityModule, IconModule, MenuModule, TabsetModule } from '@ux-aspects/ux-aspects';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { SnippetComponent } from '../../../../../components/snippet/snippet.component';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';

@Component({
  selector: 'uxd-components-sorting',
  templateUrl: './sorting.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MenuModule, IconModule, AccessibilityModule, NgFor, TabsetModule, SnippetComponent],
})
@DocumentationSectionComponent('ComponentsSortingComponent')
export class ComponentsSortingComponent
  extends BaseDocumentationSection
  implements IPlaygroundProvider
{
  options: string[] = ['Date Modified', 'Name', 'Author'];

  selected: string = this.options[0];
  descending: boolean = true;

  playground: IPlayground = {
    files: {
      'app.component.html': this.snippets.raw.appHtml,
      'app.component.ts': this.snippets.raw.appTs,
    },
    modules: [
      {
        imports: ['MenuModule'],
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

  sort(option: string): void {
    // ... perform sorting here ...
    this.selected = option;
  }
}
