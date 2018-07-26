import { Component } from '@angular/core';

@Component({
    selector: 'app',
    templateUrl: 'app.component.html'
})
export class AppComponent {
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
}