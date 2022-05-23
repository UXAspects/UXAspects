import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {

    selected: number | string | object = 100;

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

    toggleDisabled(radio: number | string | object): void {
        this.disabled = !this.disabled;

        if (this.selected === radio && this.disabled) {
            this.selected = undefined;
        }
    }
}
