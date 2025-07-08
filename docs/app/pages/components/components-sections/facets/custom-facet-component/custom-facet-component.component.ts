import { Component } from '@angular/core';
import { FacetsModule, TabsetModule } from '@ux-aspects/ux-aspects';
import 'chance';
import { ApiPropertiesComponent } from '../../../../../components/api-properties/api-properties.component';
import { ApiPropertyComponent } from '../../../../../components/api-property/api-property.component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { SnippetComponent } from '../../../../../components/snippet/snippet.component';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';
import { SampleCustomFacetComponent } from './sample/sample-facet-component.component';

@Component({
  selector: 'uxd-components-custom-facet-component',
  templateUrl: './custom-facet-component.component.html',
  imports: [
    ApiPropertiesComponent,
    ApiPropertyComponent,
    SnippetComponent,
    FacetsModule,
    SampleCustomFacetComponent,
    TabsetModule,
  ],
})
@DocumentationSectionComponent('ComponentsCustomFacetComponent')
export class ComponentsCustomFacetComponent
  extends BaseDocumentationSection
  implements IPlaygroundProvider
{
  playground: IPlayground = {
    files: {
      'app.component.ts': this.snippets.raw.appTs,
      'app.component.html': this.snippets.raw.appHtml,
      'facet-component.component.html': this.snippets.raw.facetComponentHtml,
      'facet-component.component.css': this.snippets.raw.facetComponentCss,
      'facet-component.component.ts': this.snippets.raw.facetComponentTs,
    },
    modules: [
      {
        imports: ['FacetsModule', 'CheckboxModule'],
        library: '@ux-aspects/ux-aspects',
      },
      {
        imports: ['SampleCustomFacetComponent'],
        library: './facet-component.component',
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
