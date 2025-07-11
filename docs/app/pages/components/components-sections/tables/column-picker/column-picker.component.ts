import { Component } from '@angular/core';
import {
  ColumnPickerGroup,
  ColumnPickerGroupItem,
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

@Component({
  selector: 'uxd-components-column-picker',
  templateUrl: './column-picker.component.html',
  styleUrls: ['./column-picker.component.less'],
  imports: [
    TableModule,
    ApiPropertiesComponent,
    ApiPropertyComponent,
    SnippetComponent,
    TabsetModule,
  ],
})
@DocumentationSectionComponent('ComponentsColumnPickerComponent')
export class ComponentsColumnPickerComponent
  extends BaseDocumentationSection
  implements IPlaygroundProvider
{
  /** Store a list of all selected columns */
  selected: ReadonlyArray<string> = ['Type', 'Date', 'Requested by', 'Status', 'Completion'];

  /** Store a list of columns that must be selected */
  locked: ReadonlyArray<string> = ['ID'];

  /** Store a list of columns that are not selected or locked */
  deselected: ReadonlyArray<string | ColumnPickerGroupItem> = [
    { group: 'Metadata', name: 'Author' },
    { group: 'Metadata', name: 'Category' },
    { group: 'Metadata', name: 'Date Created' },
    { group: 'Metadata', name: 'Date Modified' },
    { group: 'Metadata', name: 'Department' },
    'Document ID',
    'Flag',
    'From',
    'Icon',
    'Importance',
    'Location',
    'Location ID',
    'Message',
    { group: 'Metadata', name: 'Organization' },
    'Time',
    'Time Created',
    'Time Modified',
    'Work Completed',
  ];

  groups: ColumnPickerGroup[] = [{ name: 'Metadata', expanded: true }];

  playground: IPlayground = {
    files: {
      'app.component.html': this.snippets.raw.appHtml,
      'app.component.ts': this.snippets.raw.appTs,
      'app.component.css': this.snippets.raw.appCss,
    },
    modules: [
      {
        imports: ['TableModule'],
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
}
