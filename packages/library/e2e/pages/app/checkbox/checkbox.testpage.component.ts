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
}

export interface CheckboxValues {
    option1: number | boolean;
    option2: number | boolean;
    option3: number | boolean;
    option4: number | boolean;
}