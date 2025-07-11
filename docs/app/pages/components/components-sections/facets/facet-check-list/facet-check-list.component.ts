import { Component } from '@angular/core';
import { Facet, FacetsModule, TabsetModule } from '@ux-aspects/ux-aspects';
import 'chance';
import { ApiPropertiesComponent } from '../../../../../components/api-properties/api-properties.component';
import { ApiPropertyComponent } from '../../../../../components/api-property/api-property.component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { SnippetComponent } from '../../../../../components/snippet/snippet.component';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';

@Component({
  selector: 'uxd-components-facet-check-list',
  templateUrl: './facet-check-list.component.html',
  imports: [
    FacetsModule,
    ApiPropertiesComponent,
    ApiPropertyComponent,
    TabsetModule,
    SnippetComponent,
  ],
})
@DocumentationSectionComponent('ComponentsFacetCheckListComponent')
export class ComponentsFacetCheckListComponent
  extends BaseDocumentationSection
  implements IPlaygroundProvider
{
  facets: Facet[] = [];

  playground: IPlayground = {
    files: {
      'app.component.ts': this.snippets.raw.appTs,
      'app.component.html': this.snippets.raw.appHtml,
    },
    modules: [
      {
        imports: ['FacetsModule'],
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

    // generate some facets
    for (let idx = 0; idx < 30; idx++) {
      this.facets.push(new Facet(chance.name(), null, chance.integer({ min: 0, max: 100 })));
    }

    // sort the users alphabetically
    this.facets.sort((facetOne, facetTwo) => {
      if (facetOne.title < facetTwo.title) {
        return -1;
      }

      if (facetOne.title > facetTwo.title) {
        return 1;
      }

      return 0;
    });
  }
}
