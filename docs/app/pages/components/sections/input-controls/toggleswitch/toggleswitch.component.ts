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

  public toggleSwitches: any;
  public toggleSwitchDisable: boolean;

  public plunk: IPlunk = {
      files: {
          'app.component.ts': require('./snippets/app.ts'),
          'app.component.html': require('./snippets/app.html')
      },
      modules: [{
          imports: ['ToggleSwitchModule'],
          library: 'ux-aspects'
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