import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  AccordionModule,
  CheckboxModule,
  NumberPickerModule,
  RadioButtonModule,
  TabsetModule,
  TypeaheadKeyService,
  TypeaheadModule,
} from '@ux-aspects/ux-aspects';
import 'chance';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ApiPropertiesComponent } from '../../../../../components/api-properties/api-properties.component';
import { ApiPropertyComponent } from '../../../../../components/api-property/api-property.component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { SnippetComponent } from '../../../../../components/snippet/snippet.component';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';
import { DOCUMENTATION_TOKEN, DocumentationType } from '../../../../../tokens/documentation.token';

@Component({
  selector: 'uxd-components-typeahead',
  templateUrl: 'typeahead.component.html',
  styleUrls: ['./typeahead.component.less'],
  imports: [
    FormsModule,
    TypeaheadModule,
    AccordionModule,
    CheckboxModule,
    NumberPickerModule,
    RadioButtonModule,
    ApiPropertiesComponent,
    ApiPropertyComponent,
    TabsetModule,
    SnippetComponent,
  ],
})
@DocumentationSectionComponent('ComponentsTypeaheadComponent')
export class ComponentsTypeaheadComponent
  extends BaseDocumentationSection
  implements IPlaygroundProvider
{
  private readonly _documentationType = inject<DocumentationType>(DOCUMENTATION_TOKEN);
  typeaheadKeyService = inject<TypeaheadKeyService<string>>(TypeaheadKeyService);

  tagDocumentationRoute: string;
  values: ReadonlyArray<string> = [];

  dropdownOpen: boolean = false;
  selectOnEnter: boolean = true;
  dropDirection: 'auto' | 'up' | 'down' = 'down';
  selectFirst: boolean = true;
  recentOptions: ReadonlyArray<string>;
  recentOptionsMaxCount: number = 5;
  ariaLabel: string = 'Listbox items';

  input: string = '';

  loadOptionsFn = this.loadOptions.bind(this);

  /** Load the options and filter the them */
  loadOptions(pageNum: number, pageSize: number, filter: string): Promise<ReadonlyArray<string>> {
    // get the values for the current page based on the filter text provided
    const values = this.values
      .filter(tag => tag.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
      .slice(pageNum * pageSize, (pageNum + 1) * pageSize);

    // return the values after a delay to simulate server response time
    return of(values).pipe(delay(1000)).toPromise();
  }

  playground: IPlayground = {
    files: {
      'app.component.html': this.snippets.raw.appHtml,
      'app.component.css': this.snippets.raw.appCss,
      'app.component.ts': this.snippets.raw.appTs,
    },
    modules: [
      {
        imports: [
          'TypeaheadModule',
          'CheckboxModule',
          'RadioButtonModule',
          'NumberPickerModule',
          'AccordionModule',
        ],
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
    const _documentationType = this._documentationType;


    /* Adding values to typeahead list */
    for (let index = 0; index < 200; index++) {
      this.values = [...this.values, chance.name()];
    }

    this.tagDocumentationRoute =
      _documentationType === DocumentationType.MicroFocus
        ? 'ui-components/input-controls'
        : 'components/input-controls';
  }
}
