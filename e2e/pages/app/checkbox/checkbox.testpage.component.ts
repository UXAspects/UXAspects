import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './checkbox.testpage.component.html',
})
export class CheckboxTestPageComponent {
    private checkModel = {
        option1: true,
        option2: false,
        option3: false,
        option4: false
    };

    private simplified = false;
    private indeterminateValue = -1;
    private disableCheck = false;
}

