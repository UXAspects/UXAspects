import { Component } from '@angular/core';
import {
  AccessibilityModule,
  CheckboxModule,
  Facet,
  FacetsModule,
  TabsetModule,
} from '@ux-aspects/ux-aspects';
import 'chance';
import { ApiPropertiesComponent } from '../../../../../components/api-properties/api-properties.component';
import { ApiPropertyComponent } from '../../../../../components/api-property/api-property.component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { SnippetComponent } from '../../../../../components/snippet/snippet.component';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';

@Component({
  selector: 'uxd-components-facet-container',
  templateUrl: './facet-container.component.html',
  imports: [
    FacetsModule,
    AccessibilityModule,
    CheckboxModule,
    ApiPropertiesComponent,
    ApiPropertyComponent,
    SnippetComponent,
    TabsetModule,
  ],
})
@DocumentationSectionComponent('ComponentsFacetContainerComponent')
export class ComponentsFacetContainerComponent
  extends BaseDocumentationSection
  implements IPlaygroundProvider
{
  facets: Facet[] = [];
  allowReorder = false;

  playground: IPlayground = {
    files: {
      'app.component.ts': this.snippets.raw.appTs,
      'app.component.html': this.snippets.raw.appHtml,
    },
    modules: [
      {
        imports: ['FacetsModule', 'CheckboxModule'],
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

  addFacet() {
    // create a new random facet
    this.facets.push(new Facet(chance.name(), {}, chance.integer({ min: 0, max: 100 })));
  }
}
