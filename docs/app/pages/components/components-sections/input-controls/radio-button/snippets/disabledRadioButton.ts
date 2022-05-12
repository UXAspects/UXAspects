import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {

    selected = 'option1';

    radioOptions = {
        option1: 'option1',
        option2: 'option2',
        option3: 'option3',
        option4: 'option4',
    };

    disabled = false;

    disable(radio: string): void {
        this.disabled = !this.disabled;

        if (this.selected === radio && this.disabled) {
            this.selected = null;
        }

    }
}