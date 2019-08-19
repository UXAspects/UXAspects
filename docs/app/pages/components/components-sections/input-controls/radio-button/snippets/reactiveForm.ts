import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'app',
    templateUrl: './app.component.html'
})
export class AppComponent {

    form = new FormGroup({
        option: new FormControl(2),
    });
}