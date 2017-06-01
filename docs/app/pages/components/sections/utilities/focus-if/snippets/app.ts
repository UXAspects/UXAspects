import { Component } from '@angular/core';

@Component({
    selector: 'app',
    templateUrl: './src/app.component.html',
    styleUrls: ['./src/app.component.less'],
    host: {
        '(document:click)': 'focused = false'
    }
})
export class AppComponent {

    focused = false;
    
}