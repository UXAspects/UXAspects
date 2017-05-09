import { Component } from '@angular/core';
@Component({
    selector: 'app',
    templateUrl: './src/app.component.html'
})
export class AppComponent {
    // Toggle model
    public primaryToggleValue: number = 0;
    public accentToggleValue: string = 'off';

    // Check model
    public primaryCheckValue = {
        bold: false,
        italic: true,
        underline: false
    };
    public accentCheckValue = {
        bold: false,
        italic: true,
        underline: false
    };
}