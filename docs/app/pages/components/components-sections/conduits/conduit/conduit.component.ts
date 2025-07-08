import { Component } from '@angular/core';
import { TabsetModule } from '@ux-aspects/ux-aspects';
import { ApiPropertiesComponent } from '../../../../../components/api-properties/api-properties.component';
import { ApiPropertyComponent } from '../../../../../components/api-property/api-property.component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { SnippetComponent } from '../../../../../components/snippet/snippet.component';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';
import { ConduitComponentZoneComponent } from './example/component-zone/component-zone.component';

@Component({
  selector: 'uxd-conduit',
  templateUrl: './conduit.component.html',
  imports: [
    ConduitComponentZoneComponent,
    SnippetComponent,
    ApiPropertiesComponent,
    ApiPropertyComponent,
    TabsetModule,
  ],
})
@DocumentationSectionComponent('ComponentsConduitComponent')
export class ComponentsConduitComponent
  extends BaseDocumentationSection
  implements IPlaygroundProvider
{
  playground: IPlayground = {
    files: {
      'app.component.html': this.snippets.raw.appHtml,
      'app.component.ts': this.snippets.raw.appTs,
      'search.component.html': this.snippets.raw.searchHtml,
      'search.component.ts': this.snippets.raw.searchTs,
    },
    modules: [
      {
        imports: ['CheckboxModule'],
        library: '@ux-aspects/ux-aspects',
      },
      {
        imports: ['SearchComponent'],
        library: './search.component',
        declaration: true,
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
