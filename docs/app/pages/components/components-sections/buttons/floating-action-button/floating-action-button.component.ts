import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  AccordionModule,
  FloatingActionButtonsModule,
  IconModule,
  RadioButtonModule,
  TabsetModule,
  TooltipModule,
} from '@ux-aspects/ux-aspects';
import { ApiPropertiesComponent } from '../../../../../components/api-properties/api-properties.component';
import { ApiPropertyComponent } from '../../../../../components/api-property/api-property.component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { SnippetComponent } from '../../../../../components/snippet/snippet.component';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';

@Component({
  selector: 'uxd-floating-action-button',
  templateUrl: './floating-action-button.component.html',
  styleUrls: ['./floating-action-button.component.less'],
  imports: [
    FloatingActionButtonsModule,
    NgClass,
    TooltipModule,
    IconModule,
    AccordionModule,
    RadioButtonModule,
    FormsModule,
    ApiPropertiesComponent,
    ApiPropertyComponent,
    TabsetModule,
    SnippetComponent,
  ],
})
@DocumentationSectionComponent('ComponentsFloatingActionButtonComponent')
export class ComponentsFloatingActionButtonComponent
  extends BaseDocumentationSection
  implements IPlaygroundProvider
{
  playground: IPlayground = {
    files: {
      'app.component.ts': this.snippets.raw.appTs,
      'app.component.html': this.snippets.raw.appHtml,
      'app.component.css': this.snippets.raw.appCss,
    },
    modules: [
      {
        imports: [
          'FloatingActionButtonsModule',
          'RadioButtonModule',
          'TooltipModule',
          'AccordionModule',
        ],
        library: '@ux-aspects/ux-aspects',
      },
    ],
  };

  direction: string = 'right';

  get placement(): string {
    return this.direction === 'top' || this.direction === 'bottom' ? 'right' : 'top';
  }

  constructor() {
    super(
      import.meta.webpackContext('./snippets/', {
        recursive: false,
        regExp: /\.(html|css|js|ts)$/,
      })
    );
  }
}
