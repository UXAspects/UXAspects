import { Component } from '@angular/core';

@Component({
    selector: 'app',
    templateUrl: './src/app.component.html'
})
export class AppComponent {
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