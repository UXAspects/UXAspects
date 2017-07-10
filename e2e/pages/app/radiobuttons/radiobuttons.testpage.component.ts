import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './radiobuttons.testpage.component.html',
})
export class RadioButtonsTestPageComponent {
    selected = 100;
    
    private radioOptions = {
        option1: 100,
        option2: 'string',
        option3: {
            test: 1
        },
        option4: 'Wrap-Text'
    };

    private disabled  = false;
    private simplified  = false;
}

