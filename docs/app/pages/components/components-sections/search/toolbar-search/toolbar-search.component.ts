import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  AccessibilityModule,
  IconModule,
  TabsetModule,
  ToolbarSearchModule,
  TooltipModule,
} from '@ux-aspects/ux-aspects';
import { ApiPropertiesComponent } from '../../../../../components/api-properties/api-properties.component';
import { ApiPropertyComponent } from '../../../../../components/api-property/api-property.component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { SnippetComponent } from '../../../../../components/snippet/snippet.component';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';

@Component({
  selector: 'uxd-toolbar-search',
  templateUrl: 'toolbar-search.component.html',
  styleUrls: ['toolbar-search.component.less'],
  imports: [
    ToolbarSearchModule,
    FormsModule,
    AccessibilityModule,
    TooltipModule,
    IconModule,
    ApiPropertiesComponent,
    ApiPropertyComponent,
    TabsetModule,
    SnippetComponent,
  ],
})
@DocumentationSectionComponent('ComponentsToolbarSearchComponent')
export class ComponentsToolbarSearchComponent
  extends BaseDocumentationSection
  implements IPlaygroundProvider
{
  playground: IPlayground = {
    files: {
      'app.component.ts': this.snippets.raw.appTs,
      'app.component.html': this.snippets.raw.appHtml,
      'app.component.css': this.snippets.raw.appCss,
    },
    modules: [
      {
        imports: ['ToolbarSearchModule', 'TooltipModule'],
        library: '@ux-aspects/ux-aspects',
      },
    ],
  };

  expanded: boolean;
  searchText: string;
  searchedFor: string = '';

  @ViewChild('searchFieldRight', { static: true })
  searchFieldRight: ElementRef;

  constructor() {
    super(
      import.meta.webpackContext('./snippets/', {
        recursive: false,
        regExp: /\.(html|css|js|ts)$/,
      })
    );
  }

  onSearch(searchText: string) {
    // Execute search here
    this.searchedFor = searchText;

    // Close the search field if needed
    this.expanded = false;
  }

  onSearchRight(searchText: string) {
    // Execute search here
    this.searchedFor = searchText;
    this.searchFieldRight.nativeElement.blur();
  }
}
