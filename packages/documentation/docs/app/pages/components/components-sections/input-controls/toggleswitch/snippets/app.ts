import { Component } from '@angular/core';

@Component({
    selector: 'app',
    templateUrl: './app.component.html'
})
export class AppComponent {
    toggleSwitches: any;
    toggleSwitchDisable: boolean;

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