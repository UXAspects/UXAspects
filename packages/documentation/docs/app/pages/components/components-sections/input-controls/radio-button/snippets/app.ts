import { Component } from '@angular/core';

@Component({
    selector: 'app',
    templateUrl: './app.component.html'
})
export class AppComponent {

    selected = 100;

    radioOptions = {
        option1: 100,
        option2: 'string',
        option3: {
            test: 1
        },
        option4: 'Wrap-Text'
    };

    disabled = false;
    simplified = false;

}