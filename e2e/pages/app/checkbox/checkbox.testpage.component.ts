import { Component } from '@angular/core';

@Component({
    selector: 'checkbox-app',
    templateUrl: './checkbox.testpage.component.html',
})
export class CheckboxTestPageComponent {

    checkModel: CheckboxValues = {
        option1: true,
        option2: false,
        option3: false,
        option4: false
    };

    simplified = false;
    indeterminateValue = -1;
    disableCheck = false;

    reset(): void {
        this.checkModel = {
            option1: true,
            option2: false,
            option3: false,
            option4: false
        };

        this.simplified = false;
        this.indeterminateValue = -1;
        this.disableCheck = false;
    }
}

export interface CheckboxValues {
    option1: number | boolean;
    option2: number | boolean;
    option3: number | boolean;
    option4: number | boolean;
}