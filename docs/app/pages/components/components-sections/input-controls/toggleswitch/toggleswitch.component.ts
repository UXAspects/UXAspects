import { Component } from '@angular/core';
import { IPlunk } from '../../../../../interfaces/IPlunk';
import { IPlunkProvider } from '../../../../../interfaces/IPlunkProvider';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
  selector: 'uxd-components-toggleswitch',
  templateUrl: './toggleswitch.component.html'
})
@DocumentationSectionComponent('ComponentsToggleSwitchComponent')
export class ComponentsToggleSwitchComponent extends BaseDocumentationSection  implements IPlunkProvider {

  toggleSwitches: any;
  toggleSwitchDisable: boolean;

  plunk: IPlunk = {
      files: {
          'app.component.ts': this.snippets.raw.appTs,
          'app.component.html': this.snippets.raw.appHtml
      },
      modules: [{
          imports: ['ToggleSwitchModule'],
          library: '@ux-aspects/ux-aspects'
      }]
  };

  constructor() {

    super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));

    this.toggleSwitches = {
      option1: true,
      option2: false,
      option3: false,
      option4: false
    };

    this.toggleSwitchDisable = false;
  }
}