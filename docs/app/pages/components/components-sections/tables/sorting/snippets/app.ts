import { Component } from '@angular/core';

@Component({
    selector: 'app',
    templateUrl: './app.component.html'
})
export class AppComponent {
    
    options: string[] = [
        'Date Modified',
        'Name',
        'Author'
    ];

    selected: string = this.options[0];
    descending: boolean = true;

    /**
     * Perform any sorting here 
     */
    sort(option: string): void {
        // store the selected option to displaye in the UI
        this.selected = option;
    }
}