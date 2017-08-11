import { Component } from '@angular/core';

@Component({
    selector: 'toggle-button-app',
    templateUrl: './toggle-button.testpage.component.html'
})
export class ToggleButtonTestPageComponent {
    // Toggle model
    primaryToggleValue: number = 0;
    accentToggleValue: string = 'off';

    // Check model
    primaryCheckValue = {
        bold: false,
        italic: true,
        underline: false
    };
    accentCheckValue = {
        bold: false,
        italic: true,
        underline: false
    };
}
