import { Component } from '@angular/core';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    host: {
        '(document:click)': 'focused = false'
    }
})
export class AppComponent {

    focused = false;
    
}