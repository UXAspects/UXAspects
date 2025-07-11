import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AccessibilityModule, TabsetModule, TooltipModule } from '@ux-aspects/ux-aspects';
import { ApiPropertiesComponent } from '../../../../../components/api-properties/api-properties.component';
import { ApiPropertyComponent } from '../../../../../components/api-property/api-property.component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { SnippetComponent } from '../../../../../components/snippet/snippet.component';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';

@Component({
  selector: 'uxd-components-tooltips',
  templateUrl: './tooltips.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AccessibilityModule,
    TooltipModule,
    ApiPropertiesComponent,
    ApiPropertyComponent,
    TabsetModule,
    SnippetComponent,
  ],
})
@DocumentationSectionComponent('ComponentsTooltipsComponent')
export class ComponentsTooltipsComponent
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
        imports: ['TooltipModule'],
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
