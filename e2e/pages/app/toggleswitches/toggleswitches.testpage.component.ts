import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './toggleswitches.testpage.component.html',
})
export class ToggleSwitchesTestPageComponent {
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

