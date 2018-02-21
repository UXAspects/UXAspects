import { Component } from '@angular/core';

@Component({
    selector: 'app',
    templateUrl: './app.component.html'
})
export class AppComponent {

    value: number = 15;

    randomize() {
        this.value = Math.floor((Math.random() * 100) + 1);
    }
}
