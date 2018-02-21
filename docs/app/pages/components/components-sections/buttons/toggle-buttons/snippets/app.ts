import { Component } from '@angular/core';
@Component({
    selector: 'app',
    templateUrl: './app.component.html'
})
export class AppComponent {
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