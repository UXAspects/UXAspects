import { Component } from '@angular/core';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    isFocused: boolean = false;
    hasIndicator: boolean = false;
    mouseFocusIndicator: boolean = false;
    keyboardFocusIndicator: boolean = true;

    get buttonText(): string {
        return (this.isFocused ? 'Focused' : 'Blurred') + ' - ' +
            (this.hasIndicator ? 'With Indicator' : 'No Indicator');
    }
}