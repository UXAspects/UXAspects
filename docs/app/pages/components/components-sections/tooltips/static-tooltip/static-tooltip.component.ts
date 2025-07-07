import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AccessibilityModule, PopoverModule, TabsetModule } from '@ux-aspects/ux-aspects';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { SnippetComponent } from '../../../../../components/snippet/snippet.component';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';

@Component({
  selector: 'uxd-components-static-tooltip',
  templateUrl: './static-tooltip.component.html',
  styleUrls: ['./static-tooltip.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AccessibilityModule, PopoverModule, RouterLink, TabsetModule, SnippetComponent],
})
@DocumentationSectionComponent('ComponentsStaticTooltipComponent')
export class ComponentsStaticTooltipComponent
  extends BaseDocumentationSection
  implements IPlaygroundProvider
{
  open: boolean = true;

  playground: IPlayground = {
    files: {
      'app.component.html': this.snippets.raw.appHtml,
      'app.component.ts': this.snippets.raw.appTs,
      'app.component.css': this.snippets.raw.appCss,
    },
    modules: [
      {
        imports: ['PopoverModule'],
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
