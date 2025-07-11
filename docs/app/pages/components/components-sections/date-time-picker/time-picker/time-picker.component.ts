import { Component } from '@angular/core';
import {
  AccordionModule,
  CheckboxModule,
  NumberPickerModule,
  TabsetModule,
  TimePickerModule,
} from '@ux-aspects/ux-aspects';
import { ApiPropertiesComponent } from '../../../../../components/api-properties/api-properties.component';
import { ApiPropertyComponent } from '../../../../../components/api-property/api-property.component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { SnippetComponent } from '../../../../../components/snippet/snippet.component';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';

@Component({
  selector: 'uxd-time-picker',
  templateUrl: './time-picker.component.html',
  imports: [
    TimePickerModule,
    AccordionModule,
    CheckboxModule,
    NumberPickerModule,
    ApiPropertiesComponent,
    ApiPropertyComponent,
    TabsetModule,
    SnippetComponent,
  ],
})
@DocumentationSectionComponent('ComponentsTimePickerComponent')
export class ComponentsTimePickerComponent
  extends BaseDocumentationSection
  implements IPlaygroundProvider
{
  playground: IPlayground = {
    files: {
      'app.component.html': this.snippets.raw.appHtml,
      'app.component.ts': this.snippets.raw.appTs,
    },
    modules: [
      {
        imports: ['TimePickerModule'],
        library: '@ux-aspects/ux-aspects',
      },
    ],
  };

  value = new Date();
  showMeridian = true;
  showHours = true;
  showMinutes = true;
  showSeconds = false;
  showSpinners = true;
  hourStep = 1;
  minuteStep = 1;
  secondStep = 1;
  disabled = false;

  constructor() {
    super(
      import.meta.webpackContext('./snippets/', {
        recursive: false,
        regExp: /\.(html|css|js|ts)$/,
      })
    );
  }
}
