import { Component } from '@angular/core';
import { Filter, FilterModule, TabsetModule } from '@ux-aspects/ux-aspects';
import { ApiPropertiesComponent } from '../../../../../components/api-properties/api-properties.component';
import { ApiPropertyComponent } from '../../../../../components/api-property/api-property.component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { SnippetComponent } from '../../../../../components/snippet/snippet.component';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';
import { SampleFilterCustomComponent } from './sample/sample-filter.component';

@Component({
  selector: 'uxd-components-custom-filters',
  templateUrl: './custom-filters.component.html',
  imports: [
    ApiPropertiesComponent,
    ApiPropertyComponent,
    FilterModule,
    SampleFilterCustomComponent,
    TabsetModule,
    SnippetComponent,
  ],
})
@DocumentationSectionComponent('ComponentsCustomFiltersComponent')
export class ComponentsCustomFiltersComponent
  extends BaseDocumentationSection
  implements IPlaygroundProvider
{
  statusFilters: Filter[] = [
    {
      group: 'Custom',
      title: 'Status',
      name: 'Status (All)',
      initial: true,
    },
    {
      group: 'Custom',
      title: 'Active',
      name: 'Active',
    },
    {
      group: 'Custom',
      title: 'Inactive',
      name: 'Inactive',
    },
  ];

  playground: IPlayground = {
    files: {
      'app.component.ts': this.snippets.raw.appTs,
      'app.component.html': this.snippets.raw.appHtml,
      'sample-filter.component.html': this.snippets.raw.sampleHtml,
      'sample-filter.component.css': this.snippets.raw.sampleCss,
      'sample-filter.component.ts': this.snippets.raw.sampleTs,
    },
    modules: [
      {
        imports: ['FilterModule', 'RadioButtonModule', 'MenuModule'],
        library: '@ux-aspects/ux-aspects',
      },
      {
        imports: ['SampleFilterCustomComponent'],
        library: './sample-filter.component',
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
