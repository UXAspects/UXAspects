import { Component } from '@angular/core';

import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';

@Component({
  selector: 'uxd-components-toggleswitch',
  templateUrl: './toggleswitch.component.html'
})
@DocumentationSectionComponent('ComponentsToggleSwitchComponent')
export class ComponentsToggleSwitchComponent {

  public toggleSwitches: any;
  public toggleSwitchDisable: boolean;

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