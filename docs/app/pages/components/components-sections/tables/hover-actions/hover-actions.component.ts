import { DatePipe, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import {
  HoverActionModule,
  IconModule,
  SelectionModule,
  SparkModule,
  TabsetModule,
  TooltipModule,
} from '@ux-aspects/ux-aspects';
import 'chance';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { SnippetComponent } from '../../../../../components/snippet/snippet.component';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';

@Component({
  selector: 'uxd-components-hover-actions',
  templateUrl: './hover-actions.component.html',
  styleUrls: ['./hover-actions.component.less'],
  imports: [
    SelectionModule,
    NgFor,
    HoverActionModule,
    SparkModule,
    TooltipModule,
    IconModule,
    TabsetModule,
    SnippetComponent,
    DatePipe,
  ],
})
@DocumentationSectionComponent('ComponentsHoverActionsComponent')
export class ComponentsHoverActionsComponent
  extends BaseDocumentationSection
  implements IPlaygroundProvider
{
  documents: HoverActionDocument[] = [];
  selected: HoverActionDocument[] = [];

  playground: IPlayground = {
    files: {
      'app.component.html': this.snippets.raw.appHtml,
      'app.component.ts': this.snippets.raw.appTs,
      'app.component.css': this.snippets.raw.appCss,
    },
    modules: [
      {
        library: 'chance',
      },
      {
        imports: ['HoverActionModule', 'SelectionModule', 'SparkModule', 'TooltipModule'],
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

    for (let idx = 1; idx < 6; idx++) {
      this.documents.push({
        name: `Document ${idx}`,
        author: chance.name(),
        date: chance.date({ year: 2017 }) as Date,
        complete: chance.floating({ min: 0, max: 100, fixed: 2 }),
      });
    }
  }
}

interface HoverActionDocument {
  name: string;
  author: string;
  date: Date;
  complete: number;
}
