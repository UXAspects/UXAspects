import { Component } from '@angular/core';
import { AccessibilityModule, TabsetModule, ToggleSwitchModule } from '@ux-aspects/ux-aspects';
import { ApiPropertiesComponent } from '../../../../../components/api-properties/api-properties.component';
import { ApiPropertyComponent } from '../../../../../components/api-property/api-property.component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { SnippetComponent } from '../../../../../components/snippet/snippet.component';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';

@Component({
  selector: 'uxd-components-toggleswitch',
  templateUrl: './toggleswitch.component.html',
  imports: [
    ToggleSwitchModule,
    AccessibilityModule,
    TabsetModule,
    SnippetComponent,
    ApiPropertiesComponent,
    ApiPropertyComponent,
  ],
})
@DocumentationSectionComponent('ComponentsToggleSwitchComponent')
export class ComponentsToggleSwitchComponent
  extends BaseDocumentationSection
  implements IPlaygroundProvider
{
  toggleSwitches: any;
  toggleSwitchDisable: boolean;

  playground: IPlayground = {
    files: {
      'app.component.ts': this.snippets.raw.appTs,
      'app.component.html': this.snippets.raw.appHtml,
    },
    modules: [
      {
        imports: ['ToggleSwitchModule'],
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

    this.toggleSwitches = {
      option1: true,
      option2: false,
      option3: false,
      option4: false,
    };

    this.toggleSwitchDisable = false;
  }
}
