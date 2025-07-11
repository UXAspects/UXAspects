import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AsyncPipe, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  AccessibilityModule,
  AccordionModule,
  CheckboxModule,
  InfiniteScrollModule,
  NumberPickerModule,
  TabsetModule,
} from '@ux-aspects/ux-aspects';
import 'chance';
import { BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ApiPropertiesComponent } from '../../../../../components/api-properties/api-properties.component';
import { ApiPropertyComponent } from '../../../../../components/api-property/api-property.component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { SnippetComponent } from '../../../../../components/snippet/snippet.component';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';

const chance = new Chance();

const DEPARTMENTS = [
  'Finance',
  'Operations',
  'Investor Relations',
  'Technical',
  'Auditing',
  'Labs',
];

@Component({
  selector: 'uxd-components-infinite-scroll',
  templateUrl: 'infinite-scroll.component.html',
  styleUrls: ['./infinite-scroll.component.less'],
  imports: [
    FormsModule,
    InfiniteScrollModule,
    NgFor,
    AccessibilityModule,
    AccordionModule,
    CheckboxModule,
    NumberPickerModule,
    ApiPropertiesComponent,
    ApiPropertyComponent,
    SnippetComponent,
    TabsetModule,
    AsyncPipe,
  ],
})
@DocumentationSectionComponent('ComponentsInfiniteScrollComponent')
export class ComponentsInfiniteScrollComponent
  extends BaseDocumentationSection
  implements IPlaygroundProvider
{
  filterText = new BehaviorSubject<string>('');
  debouncedFilterText = this.filterText.pipe(debounceTime(500));
  allEmployees: any[] = [];
  loadedEmployees: any[] = [];
  loadCallback = this.load.bind(this);
  loadOnScroll = true;
  loading = false;
  pageSize = 20;
  totalItems = 111;

  load(pageNum: number, pageSize: number, filter: any): Promise<any[]> {
    this._liveAnnouncer.announce('Loading more items at the end of the list, please wait.');
    const promise = new Promise<any[]>((resolve, reject) => {
      setTimeout(() => {
        const pageStart = pageNum * pageSize;
        const newItems = this.allEmployees
          .filter(e => this.isFilterMatch(e))
          .slice(pageStart, pageStart + pageSize);
        this._liveAnnouncer.announce(`${newItems.length} items loaded at the end of the list.`);
        resolve(newItems);
      }, 2000);
    });

    return promise;
  }

  isFilterMatch(e: any): boolean {
    const normalisedFilter = this.filterText.getValue().toLowerCase();
    return e.name.toLowerCase().indexOf(normalisedFilter) >= 0;
  }

  playground: IPlayground = {
    files: {
      'app.component.ts': this.snippets.raw.appTs,
      'app.component.html': this.snippets.raw.appHtml,
      'app.component.css': this.snippets.raw.appCss,
    },
    modules: [
      {
        imports: [
          'InfiniteScrollModule',
          'CheckboxModule',
          'NumberPickerModule',
          'AccordionModule',
        ],
        library: '@ux-aspects/ux-aspects',
      },
      {
        imports: ['A11yModule'],
        library: '@angular/cdk/a11y',
      },
    ],
  };

  constructor(private readonly _liveAnnouncer: LiveAnnouncer) {
    super(
      import.meta.webpackContext('./snippets/', {
        recursive: false,
        regExp: /\.(html|css|js|ts)$/,
      })
    );

    for (let i = 0; i < this.totalItems; i += 1) {
      const name = chance.name();
      this.allEmployees.push({
        id: i,
        name: name,
        department: chance.pickone(DEPARTMENTS),
        email: name.toLowerCase().replace(' ', '.') + '@business.com',
        position: i,
      });
    }
  }
}
