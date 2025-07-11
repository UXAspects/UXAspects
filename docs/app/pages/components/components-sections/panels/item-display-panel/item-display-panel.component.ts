import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, QueryList, ViewChildren } from '@angular/core';
import {
  AccessibilityModule,
  IconModule,
  ItemDisplayPanelModule,
  SparkModule,
  TabbableListItemDirective,
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
  selector: 'uxd-item-display-panel-component',
  templateUrl: './item-display-panel.component.html',
  imports: [
    AccessibilityModule,
    NgFor,
    SparkModule,
    NgIf,
    IconModule,
    ItemDisplayPanelModule,
    ApiPropertiesComponent,
    ApiPropertyComponent,
    TabsetModule,
    SnippetComponent,
    DatePipe,
  ],
})
@DocumentationSectionComponent('ComponentsItemDisplayPanelComponent')
export class ComponentsItemDisplayPanelComponent
  extends BaseDocumentationSection
  implements IPlaygroundProvider
{
  visible: boolean = false;
  selected: DisplayPanelItem;
  items: DisplayPanelItem[] = [];

  get isPreviousEnabled(): boolean {
    return this.items.indexOf(this.selected) > 0;
  }

  get isNextEnabled(): boolean {
    return this.items.indexOf(this.selected) < this.items.length - 1;
  }

  playground: IPlayground = {
    files: {
      'app.component.ts': this.snippets.raw.appTs,
      'app.component.html': this.snippets.raw.appHtml,
      'app.component.css': this.snippets.raw.appCss,
    },
    modules: [
      {
        imports: ['ItemDisplayPanelModule', 'SparkModule'],
        library: '@ux-aspects/ux-aspects',
      },
    ],
  };

  @ViewChildren(TabbableListItemDirective) tabbableItems: QueryList<TabbableListItemDirective>;

  constructor() {
    super(
      import.meta.webpackContext('./snippets/', {
        recursive: false,
        regExp: /\.(html|css|js|ts)$/,
      })
    );

    for (let idx = 1; idx <= 5; idx++) {
      const extension = chance.pickone(['ppt', 'pdf', 'doc']);

      this.items.push({
        author: chance.name(),
        document: `Document ${idx}.${extension}`,
        active: chance.bool(),
        date: chance.date({ year: 2018, string: false }) as Date,
        storage: chance.floating({ min: 10, max: 100, fixed: 2 }),
        panel: {
          header: `Site Detail - UX Aspects (${extension.toUpperCase()})`,
          content: chance.paragraph(),
        },
      });
    }
  }

  previous(): void {
    if (this.isPreviousEnabled) {
      // determine which item should be selected
      const index = this.items.indexOf(this.selected) - 1;

      // select the target item
      this.selected = this.items[index];

      // make the item focusable
      this.tabbableItems.toArray()[index].focus();
    }
  }

  next(): void {
    if (this.isNextEnabled) {
      // determine which item should be selected
      const index = this.items.indexOf(this.selected) + 1;

      // select the target item
      this.selected = this.items[index];

      // make the item focusable
      this.tabbableItems.toArray()[index].focus();
    }
  }
}

interface DisplayPanelItem {
  author: string;
  date: Date;
  document: string;
  storage: number;
  active: boolean;
  panel: Panel;
}

interface Panel {
  header: string;
  content: string;
}
