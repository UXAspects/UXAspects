import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PaginationModule, TabsetModule } from '@ux-aspects/ux-aspects';
import { ApiPropertiesComponent } from '../../../../../components/api-properties/api-properties.component';
import { ApiPropertyComponent } from '../../../../../components/api-property/api-property.component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { SnippetComponent } from '../../../../../components/snippet/snippet.component';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';

@Component({
  selector: 'uxd-components-buttons-pagination',
  templateUrl: './pagination.component.html',
  imports: [
    PaginationModule,
    FormsModule,
    ApiPropertiesComponent,
    ApiPropertyComponent,
    TabsetModule,
    SnippetComponent,
  ],
})
@DocumentationSectionComponent('ComponentsPaginationComponent')
export class ComponentsPaginationComponent
  extends BaseDocumentationSection
  implements IPlaygroundProvider
{
  // Pagination
  currentPage: number = 1;
  totalItems: number = 100;
  itemsPerPage: number = 10;
  totalPages: number;
  maxSize: number = 5;

  playground: IPlayground = {
    files: {
      'app.component.html': this.snippets.raw.appHtml,
      'app.component.ts': this.snippets.raw.appTs,
    },
    modules: [
      {
        library: '@ux-aspects/ux-aspects',
        imports: ['PaginationModule'],
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
