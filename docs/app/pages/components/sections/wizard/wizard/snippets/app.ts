import { Component } from '@angular/core';

@Component({
    selector: 'app',
    templateUrl: './src/app.component.html'
})
export class AppComponent {

    orientation: string = 'horizontal';
    steps = ['1. First Step', '2. Second Step', '3. Third Step', '4. Fourth Step'];
}