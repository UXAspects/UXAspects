import { DatePipe, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  AccessibilityModule,
  AccordionModule,
  CheckboxModule,
  RadioButtonModule,
  SelectionModule,
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
  selector: 'uxd-components-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.less'],
  imports: [
    SelectionModule,
    NgFor,
    CheckboxModule,
    AccessibilityModule,
    AccordionModule,
    RadioButtonModule,
    FormsModule,
    ApiPropertiesComponent,
    ApiPropertyComponent,
    TabsetModule,
    SnippetComponent,
    DatePipe,
  ],
})
@DocumentationSectionComponent('ComponentsSelectionComponent')
export class ComponentsSelectionComponent
  extends BaseDocumentationSection
  implements IPlaygroundProvider
{
  data: TableData[] = [];
  selection: TableData[] = [];
  mode: string = 'simple';

  playground: IPlayground = {
    files: {
      'app.component.html': this.snippets.raw.appHtml,
      'app.component.ts': this.snippets.raw.appTs,
      'app.component.css': this.snippets.raw.appCss,
    },
    modules: [
      {
        imports: ['SelectionModule', 'CheckboxModule', 'RadioButtonModule', 'AccordionModule'],
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

    for (let idx = 0; idx < 8; idx++) {
      this.data.push({
        name: `Document ${idx + 1}`,
        author: chance.name(),
        date: chance.date(),
        selected: false,
      });
    }
  }
}

export interface TableData {
  name: string;
  author: string;
  date: Date;
  selected: boolean;
}
