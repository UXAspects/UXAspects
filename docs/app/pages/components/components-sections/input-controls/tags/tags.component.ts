import { Component, inject } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  AccessibilityModule,
  AccordionModule,
  CheckboxModule,
  IconModule,
  NumberPickerModule,
  RadioButtonModule,
  TabsetModule,
  TagInputModule,
  TypeaheadModule,
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
  selector: 'uxd-components-tags',
  templateUrl: 'tags.component.html',
  styleUrls: ['./tags.component.less'],
  imports: [
    FormsModule,
    TagInputModule,
    TypeaheadModule,
    IconModule,
    AccordionModule,
    CheckboxModule,
    NumberPickerModule,
    RadioButtonModule,
    AccessibilityModule,
    RouterLink,
    ApiPropertiesComponent,
    ApiPropertyComponent,
    SnippetComponent,
    TabsetModule,
  ],
})
@DocumentationSectionComponent('ComponentsTagsComponent')
export class ComponentsTagsComponent
  extends BaseDocumentationSection
  implements IPlaygroundProvider
{
  private readonly _documentationType = inject<DocumentationType>(DOCUMENTATION_TOKEN);

  typeaheadDocumentationRoute: string;

  tagInput: FormControl;

  tags = ['Alpha', 'Beta', 'Kappa'];

  allTags = [
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
    'Lambda',
    'Mu',
    'Nu',
    'Xi',
    'Omicron',
    'Pi',
    'Rho',
    'Sigma',
    'Tau',
    'Upsilon',
    'Phi',
    'Chi',
    'Psi',
    'Omega',
  ];

  input: string;

  addOnPaste: boolean = true;
  disabled: boolean = false;
  enforceTagLimits: boolean = false;
  freeInput: boolean = true;
  minTags: number = 1;
  maxTags: number = 10;
  tagPatternRegExp: RegExp;
  ariaLabel: string = 'Tags listbox';
  get tagPattern(): string {
    return this.tagPatternRegExp ? this.tagPatternRegExp.source : '';
  }
  set tagPattern(value: string) {
    if (value) {
      try {
        this.tagPatternRegExp = new RegExp(value);
      } catch (e) {
        this.tagPatternRegExp = null;
      }
    } else {
      this.tagPatternRegExp = null;
    }
  }
  placeholder: string = 'Add a tag';
  tagDelimiters: string = ' ,';
  typeaheadEnabled: boolean = false;
  selectFirst: boolean = true;
  dropDirection: 'up' | 'down' = 'down';
  showTypeaheadOnClick: boolean = false;

  playground: IPlayground = {
    files: {
      'app.component.ts': this.snippets.raw.appTs,
      'app.component.html': this.snippets.raw.appHtml,
      'app.component.css': this.snippets.raw.appCss,
    },
    modules: [
      {
        imports: [
          'TagInputModule',
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


    this.typeaheadDocumentationRoute =
      _documentationType === DocumentationType.MicroFocus
        ? 'ui-components/input-controls'
        : 'components/input-controls';
  }
}
