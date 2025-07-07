import { DatePipe, NgFor, NgIf, SlicePipe } from '@angular/common';
import { Component, Inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  AccessibilityModule,
  AccordionModule,
  CheckboxModule,
  FixedHeaderTableModule,
  RadioButtonModule,
  ResizableExpandingTableDirective,
  ResizableTableDirective,
  SelectionModule,
  TableModule,
  TabsetModule,
} from '@ux-aspects/ux-aspects';
import { ApiPropertiesComponent } from '../../../../../components/api-properties/api-properties.component';
import { ApiPropertyComponent } from '../../../../../components/api-property/api-property.component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { SnippetComponent } from '../../../../../components/snippet/snippet.component';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';
import { DOCUMENTATION_TOKEN, DocumentationType } from '../../../../../tokens/documentation.token';

@Component({
  selector: 'uxd-components-column-resizing',
  templateUrl: './column-resizing.component.html',
  styleUrls: ['./column-resizing.component.less'],
  imports: [
    AccordionModule,
    NgIf,
    TableModule,
    FixedHeaderTableModule,
    SelectionModule,
    NgFor,
    CheckboxModule,
    FormsModule,
    RadioButtonModule,
    AccessibilityModule,
    RouterLink,
    ApiPropertiesComponent,
    ApiPropertyComponent,
    TabsetModule,
    SnippetComponent,
    SlicePipe,
    DatePipe,
  ],
})
@DocumentationSectionComponent('ComponentsColumnResizingComponent')
export class ComponentsColumnResizingComponent
  extends BaseDocumentationSection
  implements IPlaygroundProvider
{
  type: 'uxResizableTable' | 'uxResizableExpandingTable' = 'uxResizableTable';
  documents: TableDocument[] = [];
  selection: TableDocument[] = [];

  titleWidth: number = 260;
  authorWidth: number = 300;
  dateWidth: number;
  dateWidthExpanding: number = 150;

  uxFixedHeaderComponentRoute: string =
    this._documentationType === DocumentationType.MicroFocus
      ? '/ui-components/tables'
      : 'components/tables';

  @ViewChild(ResizableTableDirective, { static: false }) resizableTable: ResizableTableDirective;
  @ViewChild(ResizableExpandingTableDirective, { static: false })
  resizableExpandingTable: ResizableExpandingTableDirective;

  playground: IPlayground = {
    files: {
      'app.component.html': this.snippets.raw.appHtml,
      'app.component.ts': this.snippets.raw.appTs,
      'app.component.css': this.snippets.raw.appCss,
    },
    modules: [
      {
        imports: [
          'TableModule',
          'CheckboxModule',
          'FixedHeaderTableModule',
          'SelectionModule',
          'AccordionModule',
          'RadioButtonModule',
        ],
        library: '@ux-aspects/ux-aspects',
      },
      {
        imports: ['ButtonsModule'],
        library: 'ngx-bootstrap/buttons',
      },
    ],
  };

  constructor(@Inject(DOCUMENTATION_TOKEN) private readonly _documentationType: DocumentationType) {
    super(
      import.meta.webpackContext('./snippets/', {
        recursive: false,
        regExp: /\.(html|css|js|ts)$/,
      })
    );

    // generate some dummy data
    for (let idx = 0; idx < 15; idx++) {
      this.documents.push({
        selected: false,
        title: `Document ${idx + 1}`,
        author: chance.name(),
        date: chance.date({ year: new Date().getFullYear() }) as Date,
      });
    }
  }

  setToUniform(type: string): void {
    if (type === 'uxResizableTable') {
      this.resizableTable.setUniformWidths();
    } else {
      this.resizableExpandingTable.setUniformWidths();
    }
  }
}

interface TableDocument {
  selected: boolean;
  title: string;
  author: string;
  date: Date;
}
