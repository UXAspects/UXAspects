import { Component } from '@angular/core';

@Component({
  selector: 'radiobuttons-my-app',
  templateUrl: './radiobuttons.testpage.component.html',
})
export class RadioButtonsTestPageComponent {
    selected = 100;
    
    radioOptions = {
        option1: 100,
        option2: 'string',
        option3: {
            test: 1
        },
        option4: 'Wrap-Text'
    };

    disabled  = false;
    simplified  = false;
}

