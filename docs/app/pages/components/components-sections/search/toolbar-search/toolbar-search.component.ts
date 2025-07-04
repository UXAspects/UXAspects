import { Component, ElementRef, ViewChild } from '@angular/core';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';

@Component({
  selector: 'uxd-toolbar-search',
  templateUrl: 'toolbar-search.component.html',
  styleUrls: ['toolbar-search.component.less'],
  standalone: false,
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
