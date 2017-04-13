import { Component } from '@angular/core';
import { IPlunk } from '../../../../../interfaces/IPlunk';
import { IPlunkProvider } from '../../../../../interfaces/IPlunkProvider';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';

@Component({
  selector: 'uxd-components-toggleswitch',
  templateUrl: './toggleswitch.component.html'
})
@DocumentationSectionComponent('ComponentsToggleSwitchComponent')
export class ComponentsToggleSwitchComponent implements IPlunkProvider {

  public toggleSwitches: any;
  public toggleSwitchDisable: boolean;

  public plunk: IPlunk = {
      'app.ts': require('./snippets/app.ts'),
      'app.html': require('./snippets/app.html')
  };

  constructor() {

    this.toggleSwitches = {
      option1: true,
      option2: false,
      option3: false,
      option4: false
    };

    this.toggleSwitchDisable = false;
  }
}