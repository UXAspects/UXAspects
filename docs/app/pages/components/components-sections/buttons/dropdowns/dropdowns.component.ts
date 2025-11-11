import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  IconModule,
  MenuModule,
  StringFilterModule,
  TabsetModule,
  ToggleSwitchModule,
} from '@ux-aspects/ux-aspects';
import { ApiPropertiesComponent } from '../../../../../components/api-properties/api-properties.component';
import { ApiPropertyComponent } from '../../../../../components/api-property/api-property.component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { SnippetComponent } from '../../../../../components/snippet/snippet.component';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';

@Component({
  selector: 'uxd-components-buttons-dropdowns',
  templateUrl: './dropdowns.component.html',
  styleUrls: ['./dropdowns.component.less'],
  encapsulation: ViewEncapsulation.None,
  imports: [
    MenuModule,
    IconModule,
    ToggleSwitchModule,
    FormsModule,
    RouterLink,
    ApiPropertiesComponent,
    ApiPropertyComponent,
    TabsetModule,
    SnippetComponent,
    StringFilterModule,
  ],
})
@DocumentationSectionComponent('ComponentsDropdownsComponent')
export class ComponentsDropdownsComponent
  extends BaseDocumentationSection
  implements IPlaygroundProvider
{
  cases: string[] = [
    'Alpha',
    'Beta',
    'Gamma',
    'Delta',
    'Epsilon',
    'Zeta',
    'Eta',
    'Theta',
    'Iota',
    'Kappa',
    'Alpha 2',
    'Alpha 3',
  ];

  caseFilter: string = '';

  toggleSwitchValue: boolean = false;

  playground: IPlayground = {
    files: {
      'app.component.html': this.snippets.raw.appHtml,
      'app.component.css': this.snippets.raw.appCss,
      'app.component.ts': this.snippets.raw.appTs,
    },
    modules: [
      {
        imports: ['StringFilterModule', 'MenuModule', 'ToggleSwitchModule'],
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

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  export(): void {}
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  saveList(): void {}
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  saveQuery(): void {}
}
