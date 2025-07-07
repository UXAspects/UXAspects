import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  AccessibilityModule,
  FixedHeaderTableModule,
  TabsetModule,
  VirtualScrollModule,
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
  selector: 'uxd-components-virtual-for',
  templateUrl: './virtual-for.component.html',
  styleUrls: ['./virtual-for.component.less'],
  imports: [
    FixedHeaderTableModule,
    VirtualScrollModule,
    AccessibilityModule,
    NgIf,
    RouterLink,
    ApiPropertiesComponent,
    ApiPropertyComponent,
    SnippetComponent,
    TabsetModule,
  ],
})
@DocumentationSectionComponent('ComponentsVirtualForComponent')
export class ComponentsVirtualForComponent
  extends BaseDocumentationSection
  implements IPlaygroundProvider
{
  /** Store the current loading state */
  isLoading: boolean = false;

  /** Store the list of employees */
  employees: ReadonlyArray<Employee> = [];

  playground: IPlayground = {
    files: {
      'app.component.html': this.snippets.raw.appHtml,
      'app.component.ts': this.snippets.raw.appTs,
      'app.component.css': this.snippets.raw.appCss,
    },
    modules: [
      {
        imports: ['VirtualScrollModule', 'FixedHeaderTableModule'],
        library: '@ux-aspects/ux-aspects',
      },
    ],
  };

  /** Store the current page */
  private _page: number = 0;

  constructor() {
    super(
      import.meta.webpackContext('./snippets/', {
        recursive: false,
        regExp: /\.(html|css|js|ts)$/,
      })
    );

    // load the first page
    this.load();
  }

  load(page: number = 0): void {
    // update the loading state
    this.isLoading = true;

    // create some new employees
    const employees: Employee[] = [];

    for (let idx = 1; idx <= 5000; idx++) {
      employees.push({
        id: idx + 5000 * page,
        name: chance.name(),
        email: chance.email(),
        department: chance.pickone([
          'Finance',
          'Operations',
          'Investor Relations',
          'Technical',
          'Auditing',
          'Labs',
        ]),
      });
    }

    // add delay to simulate server loading
    setTimeout(() => {
      this.employees = [...this.employees, ...employees];
      this.isLoading = false;
    }, 1000);
  }

  loadNextPage(): void {
    this.load(++this._page);
  }
}

export interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
}
