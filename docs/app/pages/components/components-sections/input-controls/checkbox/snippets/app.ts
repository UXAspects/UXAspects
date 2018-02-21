import { Component } from '@angular/core';

@Component({
    selector: 'app',
    templateUrl: './app.component.html'
})
export class AppComponent {
    checkModel = {
        option1: true,
        option2: false,
        option3: false,
        option4: false
    };

    simplified = false;
    indeterminateValue = -1;
    disableCheck = false;
}